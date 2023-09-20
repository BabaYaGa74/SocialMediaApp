import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { handleTime } from "../../utils/handleTime";
import { toast } from "react-toastify";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState({
    comment: "",
    author: currentUser.username,
    postId: postId.toString(),
    userId: currentUser.userId,
    profilePic: currentUser.picture,
  });
  const [editingCommentId, setEditingCommentId] = useState(false);
  const [editedComment, setEditedComment] = useState({
    comment: "",
    author: currentUser.username,
    postId: postId.toString(),
    userId: currentUser.userId,
    profilePic: currentUser.picture,
  });

  const handleCommentCreation = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + "/api/comment/create",
        newComment,
        config
      );
      console.log(response.data.newComment);
      setNewComment(response.data.newComment);
    } catch (error) {
      console.log(error);
    } finally {
      setNewComment({
        comment: "",
        author: currentUser.username,
        postId: postId.toString(),
        userId: currentUser.userId,
        profilePic: currentUser.picture,
      });
    }
  };

  useEffect(() => {
    const fetchCommentsOfPost = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + `/api/comment/post/${postId}`,
          { withCredentials: true }
        );
        setComments(response.data.allComments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsOfPost();
  }, [newComment, postId, editedComment]);

  const handleDelete = async (id) => {
    if (currentUser.userId === newComment.userId) {
      try {
        const response = await axios.delete(
          import.meta.env.VITE_API_ENDPOINT + `/api/comment/delete/${id}`,
          { withCredentials: true }
        );
        console.log("comment deleted Successfully!", response);
        toast.success("Comment Deleted Successfully!");
        const updatedComments = comments.filter(
          (comment) => comment._id !== id
        );
        setComments(updatedComments);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    } else {
      alert("You cannot delete this comment");
    }
  };

  const toggleEdit = (id) => {
    if (editingCommentId === id) {
      setEditingCommentId(null);
    } else {
      setEditingCommentId(id);
    }
  };

  const updateComment = async (commentId) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_ENDPOINT + `/api/comment/update/${commentId}`,
        editedComment,
        { withCredentials: true }
      );
      console.log(response.data);
      setEditedComment(response.data.comment);
      toast.success("Comment has been Edited");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong!");
    } finally {
      setEditedComment({
        comment: "",
        author: currentUser.username,
        postId: postId.toString(),
        userId: currentUser.userId,
        profilePic: currentUser.picture,
      });
      setEditingCommentId(null);
    }
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.picture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={newComment.comment}
          onChange={(e) =>
            setNewComment({ ...newComment, comment: e.target.value || "" })
          }
        />
        <button onClick={handleCommentCreation}>Send</button>
      </div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>
              {comment.author}
              {editingCommentId === comment._id &&
              currentUser.userId === comment.userId ? (
                <div className="edit">
                  <input
                    type="text"
                    placeholder="Edit Comment"
                    value={editedComment.comment}
                    onChange={(e) =>
                      setEditedComment({
                        ...editedComment,
                        comment: e.target.value || "",
                      })
                    }
                  />
                  <SendIcon
                    className="editComment"
                    onClick={() => updateComment(comment._id)}
                  />
                </div>
              ) : (
                <p>{comment.comment}</p>
              )}
            </span>
          </div>
          <span className="date">
            <div className="time">{handleTime(comment.createdAt)} </div>
            {currentUser.userId === comment.userId && (
              <div className="buttons">
                <BorderColorIcon
                  className="editButton"
                  onClick={() => toggleEdit(comment._id)}
                />
                <DeleteForeverIcon
                  className="deleteButton"
                  onClick={() => handleDelete(comment._id)}
                />
              </div>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
