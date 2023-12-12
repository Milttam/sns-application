import Post from '../models/post.js';
import User from '../models/user.js';

/** CREATE */
export const createPost = async (req, res) => {
    try {
        //all what the front end will send us
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: description,
            userPicturePath: user.picturePath,
            picturePath: picturePath,
            likes: {},
            comments: []
        });
        //save post to MongoDB
        await newPost.save();

        //get all of the posts from DB to return back to the front end so feed updates
        const posts = await Post.find();

        res.status(201).json(posts);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
};

/** READ */
export const getFeedPosts = async (req, res) => {
    //usually much more complicated with AI algos
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
export const getUserPosts = async (req, res) => {
    //usually much more complicated with AI algos
    try {
        const {userId} = req.params
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

/** UPDATE */
export const likePost = async (req, res) => {
    try {
        //grab the post id from params 
        const {id} = req.params
        //user id will be in the request body. the front end will send it this way
        const {userId} = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId) //checks if the userId exists aka post has been liked by userID

        //performs reverse operation depending on if person already liked post
        if (isLiked) {
            post.likes.delete(userId)
        } else{
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {likes: post.likes}, //updates likes attribute
            {new: true} //makes new instance of updatedPost 
        )

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}