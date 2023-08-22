import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: "light", //darkmode/lightmode
    user: null, 
    token: null, //auth info
    posts: [], //posts
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //we can think of these as functions that involve modifying state
        //we can call these functions in our components
        setMode: (state) =>  {
            state.mode = state.mode === "light" ? "dark" : "light";
        }, 
        setLogin: (state, action) => {
            // action includes all the arguments we want to pass
            state.user = action.payload.user; 
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user is null");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            //basically looping through all the posts to find the post we want
            const updatedPosts = state.posts.map((post) => {
                if (post._id=== action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;