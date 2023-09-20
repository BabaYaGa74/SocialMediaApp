import "./share.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Share = ({ addNewPost }) => {
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [postData, setPostData] = useState({
    desc: "",
    username: currentUser.username,
    userId: currentUser.userId || currentUser._id,
    profilePic: currentUser.picture,
    photo: "",
  });

  const handleShare = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const imgConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    console.log(image);
    if (image) {
      const data = new FormData();
      const filename = image.name;
      data.append("img", filename);
      console.log(data);
      data.append("file", image);

      console.log(data);
      try {
        const imgUpload = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "/",
          data,
          imgConfig
        );
        console.log(imgUpload.data.filePath);
        postData.photo = imgUpload.data.filePath;
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Uploaded");
      }
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + "/api/post/create",
        postData,
        config
      );
      addNewPost(response.data.newPost);
      console.log(response.data);
      toast.success("Post Uploaded Successfully!");

      setPostData({
        desc: "",
        username: currentUser.username,
        userId: currentUser.userId || currentUser._id,
        profilePic: currentUser.picture,
      });
    } catch (error) {
      console.log("Error:", error);
      console.log("Error Message:", error.message);
      if (error.response) {
        console.log("Error Response:", error.response.data);
      }
      toast.error("Upload failed!");
    } finally {
      setImage(null);
    }
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.picture} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.username}?`}
            value={postData.desc}
            onChange={(e) =>
              setPostData({ ...postData, desc: e.target.value || "" })
            }
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  console.log("Setting Image", e.target.files[0]);
                  setImage(e.target.files[0]);
                } else {
                  console.log("No file chosen");
                }
              }}
              type="file"
              id="image"
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <div className="item">
                <AddAPhotoIcon />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
