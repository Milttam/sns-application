import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import NavBar from 'scenes/navbar';
/** Import widgets */
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("min-width: 1000px")
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <NavBar />
            <Box
                width = "100%"
                p = "3rem 6%"
                display = {isNonMobileScreens ? "flex" : "block"}
                gap = "1rem"
                justifyContent="space-between"
            >   
                <Box flexBasis = {isNonMobileScreens ? "25%" : undefined}>   
                    <UserWidget userId = {_id} picturePath = {picturePath} />
                </Box>
                <Box flexBasis = {isNonMobileScreens ? "40%" : undefined}>   
                    <MyPostWidget picturePath={picturePath}/>
                    <PostsWidget userId = {_id}/>
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis = {isNonMobileScreens ? "25%" : undefined}>   
                        <AdvertWidget />
                        <Box m = "2rem 0"/>
                        <FriendListWidget userId = {_id}/>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;