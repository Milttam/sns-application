import {
  ChatBubbleOutlineOutlined, 
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = 
  (post) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state => state.token))
    const loggedInUserId = useSelector((state => state.user._id))
    // Check if the post is liked by the logged in user
    const isLiked = Boolean(post.likes[loggedInUserId])
    const likeCount = Object.keys(post.likes).length
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const handleLike = async () => {
      const res = await fetch('http://localhost:3001/posts/' + post._id + '/like', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" //defines the type of the response
        },
        body: JSON.stringify({ userId: loggedInUserId}),
      });
      const updatedPost = await res.json();
      dispatch(setPost({ post: updatedPost}))
      // dispatch updates the global store with updated post
    }

    return (
      <WidgetWrapper m="2rem 0">
        {/* <Friend
          friendId={post.postUserId}
          name={post.name}
          subtitle={post.location}
          userPicturePath={post.userPicturePath}
        /> */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {post.description}
        </Typography>
        {post.picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${post.picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={handleLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{post.comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {post.comments.map((comment, i) => (
              <Box key={`${post.name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  }

export default PostWidget;