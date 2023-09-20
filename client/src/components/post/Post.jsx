import "./post.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { handleTime } from "../../utils/handleTime";
import Like from "../likes/Like";
import ConfirmationCard from "../confirmationCard/ConfirmationCard";

const Post = ({ post, handleDelete }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [confirmation, setConfirmation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCommentsOfPost = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + `/api/comment/post/${post._id}`,
          { withCredentials: true }
        );
        setCommentCount(response.data.allComments.length);
        console.log(commentCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsOfPost();
    console.log("This is the current User: ", currentUser.userId);
  }, [post._id]);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
              <span className="date">{handleTime(post.createdAt)}</span>
            </div>
          </div>
          <div className="dropdown">
            {currentUser.userId === post.userId && (
              <MoreHorizIcon
                onClick={handleDropdown}
                className="optionButton"
              />
            )}

            {isOpen && (
              <div className="dropdown-content">
                <span>
                  <Link
                    to={`/post/${post._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <BorderColorIcon /> Edit
                  </Link>
                </span>
                <span
                  onClick={() => {
                    setConfirmation(true);
                    setIsOpen(false);
                  }}
                >
                  <DeleteOutlineIcon /> Delete
                </span>
              </div>
            )}
          </div>
        </div>
        {confirmation && (
          <div className="wrapper">
            <ConfirmationCard
              onConfirm={handleDelete}
              onCancel={() => setConfirmation(false)}
              text={"delete"}
            />
          </div>
        )}
        <div className="content">
          <p>{post.desc}</p>
          <img src={import.meta.env.VITE_API_ENDPOINT + post.photo} alt="" />
        </div>
        <div className="info">
          <Like
            postId={post._id}
            initialLikesCount={post.likes.length}
            usersWhoLiked={post.likes}
          />
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentCount} Comments
          </div>
        </div>
        {commentOpen && <Comments postId={post._id} />}
      </div>
    </div>
  );
};

export default Post;
