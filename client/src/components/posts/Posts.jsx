import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Share from "../share/Share";
import { toast } from "react-toastify";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    getAllPosts();
    console.log(currentUser);
  }, [currentUser]);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_ENDPOINT + "/api/post/",
        {
          withCredentials: true,
        }
      );
      setPosts(response.data.allPosts);
      console.log(response.data.allPosts);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (deletedPost) => {
    try {
      if (currentUser.userId === deletedPost.userId) {
        console.log(currentUser.userId);
        const response = await axios.delete(
          import.meta.env.VITE_API_ENDPOINT +
            `/api/post/delete/${deletedPost._id}`,
          { withCredentials: true }
        );
        console.log(response.data);
        const updatedPosts = posts.filter(
          (post) => post._id !== deletedPost._id
        );
        setPosts(updatedPosts);
        toast.success("Post has been deleted!");
      } else {
        alert("you cannot delete this post!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot delete this post");
    }
  };

  return (
    <>
      <Share addNewPost={addNewPost} />
      <div className="posts">
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </>
  );
};

export default Posts;
