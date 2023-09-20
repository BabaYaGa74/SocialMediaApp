import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveIcon from "@mui/icons-material/Save";
import "./userPost.scss";
import { Link, useParams } from "react-router-dom";
import { handleTime } from "../../utils/handleTime";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";

const UserPost = () => {
  const { postId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [file, setFile] = useState(null);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + `/api/post/${postId}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setPost(response.data.postDetail);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserPost();
  }, [postId]);

  async function updatePost() {
    const imgConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("img", filename);
      data.append("file", file);

      console.log(data);
      try {
        const imgUpload = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "/",
          data,
          imgConfig
        );
        console.log(imgUpload.data.filePath);
        post.photo = imgUpload.data.filePath;
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Image Uploaded");
      }
    }

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_ENDPOINT + `/api/post/update/${postId}`,
        post,
        { withCredentials: true }
      );
      console.log(response.data);
      setPost(response.data.updatedPost);
      toast.success("Post has been updated!");
      // setPost({ ...post, desc: "" });
    } catch (error) {
      console.log(error.message);
      toast.error("Error occured!");
    } finally {
      setEdited(false);
    }
  }

  return (
    <div className="postSection">
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
              {currentUser.userId === post.userId && edited ? (
                <div className="buttons" onClick={updatePost}>
                  <SaveIcon className="saveIcon" /> <p>Update</p>
                </div>
              ) : (
                <div className="buttons" onClick={() => setEdited(true)}>
                  <BorderColorIcon className="saveIcon" /> <p>Edit</p>
                </div>
              )}
            </div>
          </div>
          <div className="content">
            {edited ? (
              <>
                <input
                  className="textInput"
                  type="text"
                  placeholder="Enter new description"
                  value={post.desc}
                  onChange={(e) => setPost({ ...post, desc: e.target.value })}
                />
                {post.photo !== "" && (
                  <input
                    className="fileInput"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="file"
                  />
                )}
              </>
            ) : (
              <>
                {post.photo === "" && post.desc ? (
                  <p>{post.desc}</p>
                ) : (
                  <>
                    <p>{post.desc}</p>
                    <img
                      src={import.meta.env.VITE_API_ENDPOINT + post.photo}
                      alt=""
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
