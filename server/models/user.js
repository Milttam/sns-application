import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true, //cannot have duplicate emails in DB
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50,
        //usually much more configs for password
    },
    picturePath: {
        type: String,
        required: true,
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;