import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

/** Friend compoenent will show friend image, name
 *  It will allow to add/remove friend and view friend profile
 */

const Friend = ({ friendId, name, subtitle, userPicturePath}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currUserId} = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);
  const currUserFriends = useSelector((state) => state.friends);

  const { palette } = useTheme();
  const light = palette.primary.light;
  const dark = palette.primary.dark;
  const main = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const isFriend = currUserFriends.includes(friendId);

  const updateFriend = async () => {
    const res = await fetch(`http://localhost:3001/users/${currUserId}/${friendId}`, {
      method: "PATCH", 
      headers : {
        Authorization: `Bearer: ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(setFriends({friends: data}));
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => updateFriend()}
        sx={{ backgroundColor: light, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: dark }} />
        ) : (
          <PersonAddOutlined sx={{ color: dark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;