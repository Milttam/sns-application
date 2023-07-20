import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        //get token from header of request (we will send requests with frontend with format later)
        let token = req.header("Authorization")

        //if no token, return error
        if (!token) return res.status(403).json({message: "Invalid Authentication"});

        if (token.startsWith("Bearer ")) {
            // Remove Bearer from string (this will be set on the front end)
            token = token.slice(7, token.length).trimLeft();
        }

        //verify token with the secret string
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified
        next();
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}