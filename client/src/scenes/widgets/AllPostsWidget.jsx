import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {setPosts} from "state"
import PostWidget from "./PostWidget";

const AllPostsWidget = ({userId, isProfile}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.user.token);

  // Using dispatch below will only update the posts in the store, so posts 
  // will refer to the same object in memory.

  // posts of friends of logged on user
  const getPosts = async () => {
    const res = await fetch(`https://localhost/3001/posts/`,{
      method: "GET",
      headers: {
        Authorization: `Bearer: ${token}`,
        "Content-Type": "application/json",}
      }) // no body
    const data = await res.json()
    dispatch(setPosts({posts: data}))
  }

  // posts of user
  const getUserPosts = async () => {
    const res = await fetch(`https://localhost/3001/${userId}/posts/`,{
      method: "GET",
      headers: {
        Authorization: `Bearer: ${token}`,
        "Content-Type": "application/json",}
      }) // no body
    const data = await res.json()
    dispatch(setPosts({posts: data}))
  }

  // set posts to local store depending on if we are profile or feed page
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }) // no dependencies

  return (
    <>
      {
        posts.map(
          (posta) => (
            <PostWidget post = {posta}/>
          )
        )
      }
    </>
  )
}

export default AllPostsWidget;