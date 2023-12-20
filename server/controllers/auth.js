import brcpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/** Register */
export const register = async (req, res) => {
    //basically creating an API call to resiter user

    try {
        //get all the data from the req body
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        //use salt to hash password
        //salt is a random string that is added to the password top improve hash
        const salt = await brcpyt.genSalt(10);
        const passwordHash = await brcpyt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 100) + 1,
            impressions: Math.floor(Math.random() * 100) + 1,
        });
        //save document to DB
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //201: successfully created user
        //sending back the saved user so the front end can recive it. 
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

/** Logging */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({email: email}); //find user from DB
        if (!user) return res.status(400).json({message: "User not found"});

        //check if password is correct
        const isMatch = await brcpyt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});

        //create token with info and secret
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET);
        //delete password from user object
        delete user.password;

        //send back user and token
        res.status(200).json({token, user});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}