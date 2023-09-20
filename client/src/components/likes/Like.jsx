import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { AuthContext } from "../../context/authContext";

const Like = ({ postId, initialLikesCount, usersWhoLiked }) => {
  const { currentUser } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = async () => {
    try {
      setHasLiked(true);
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + `/api/likes/${postId}/like`,
        {},
        {
          withCredentials: true,
        }
      );
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      setHasLiked(false);
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + `/api/likes/${postId}/unlike`,
        {},
        {
          withCredentials: true,
        }
      );
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error("Failed to unlike post:", error);
    }
  };

  function checkUser() {
    return usersWhoLiked.includes(currentUser.userId);
  }

  useEffect(() => {
    setHasLiked(checkUser());
  }, []);

  return (
    <div className="item">
      {hasLiked ? (
        <FavoriteOutlinedIcon onClick={handleUnlike} />
      ) : (
        <FavoriteBorderOutlinedIcon onClick={handleLike} />
      )}
      {likesCount} Likes
    </div>
  );
};

export default Like;
