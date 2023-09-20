import { useContext, useEffect, useState } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { toast } from "react-toastify";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [stories, setStories] = useState([]);
  const [viewedStory, setViewedStory] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [newStory, setNewStory] = useState({
    content: "",
    username: currentUser.username,
    userId: currentUser.userId,
  });

  const handleStory = async (e) => {
    e.preventDefault();
    const Config = {
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
        const storyUpload = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "/",
          data,
          Config
        );
        console.log(storyUpload.data.filePath);
        newStory.content = storyUpload.data.filePath;
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Uploaded");
      }
    }

    try {
      if (newStory.content === "")
        return toast.warning("Please attach an image to add");
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + "/story/create",
        newStory,
        { withCredentials: true }
      );
      console.log(response.data);
      setStories((prevStories) => [...prevStories, newStory]);
      toast("Story added!");
      setNewStory({
        content: "",
        username: currentUser.username,
        userId: currentUser.userId,
      });
    } catch (error) {
      console.log("Error:", error);
      console.log("Error Message:", error.message);
      if (error.response) {
        console.log("Error Response:", error.response.data);
      }
      toast.error("Error occurred!");
    } finally {
      setFile(null);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + "/story/all"
        );
        console.log(response.data);
        setStories(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchStories();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API_ENDPOINT + `/story/${id}`
      );
      console.log(response.data);
      const updatedStories = stories.filter((story) => story._id != id);
      setStories(updatedStories);
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Error occured, Please refresh");
    }
  }

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.picture} alt="" />
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          id="file"
          style={{ display: "none" }}
        />
        <label htmlFor="file">
          <div className="item">
            <p>+</p>
          </div>
        </label>
        <button onClick={handleStory}>Add to story</button>
      </div>

      <>
        {storyIndex > 0 && (
          <motion.div className="arrowContainer">
            <ArrowBackIcon
              className="arrowButtons"
              onClick={() => setStoryIndex(storyIndex - 4)}
            />
          </motion.div>
        )}
      </>

      {stories.slice(storyIndex, storyIndex + 4).map((story) => (
        <motion.div
          className="story"
          key={story._id}
          onClick={() => setViewedStory(story)}
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <img
            src={import.meta.env.VITE_API_ENDPOINT + story.content}
            alt="stories"
          />
          <div className="displayUsername">
            <span>{story.username}</span>
          </div>
        </motion.div>
      ))}

      {stories.length > storyIndex + 4 && (
        <motion.div className="arrowContainer">
          <ArrowForwardIcon
            className="arrowButtons"
            onClick={() => setStoryIndex(storyIndex + 4)}
          />
        </motion.div>
      )}

      {viewedStory && (
        <div onClick={() => setViewedStory(null)}>
          <div className="storyViewer">
            <img
              src={import.meta.env.VITE_API_ENDPOINT + viewedStory.content}
              alt="viewed story"
            />
            <div className="displayUsername">
              <span>{viewedStory.username}</span>
            </div>
            {viewedStory.userId === currentUser.userId && (
              <DeleteOutlineIcon
                className="deleteButton"
                onClick={() => handleDelete(viewedStory._id)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
