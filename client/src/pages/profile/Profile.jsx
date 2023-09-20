import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyIcon from "@mui/icons-material/Key";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Post from "../../components/post/Post";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import UserFollowInfo from "../../components/userFollowInfo/UserFollowInfo";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import ChangePassword from "../../components/changePassword/ChangePassword";
import ConfirmationCard from "../../components/confirmationCard/ConfirmationCard";
import {
  fetchUser,
  fetchUsersPost,
  deleteUser,
  deletePost,
} from "../../services/apiServices";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [followinfo, setFollowInfo] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [passwordChange, setPasswordChange] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const changePasswordRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUser(userId);
        setUser(userData);

        const userPostData = await fetchUsersPost(userId);
        setPosts(userPostData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleDelete = async (deletedPost) => {
    try {
      const updatedPosts = await deletePost(deletedPost);
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateButton = (e) => {
    e.preventDefault();
    navigate("/profile/update");
  };

  async function handleDeleteUser() {
    try {
      await deleteUser(currentUser.userId);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + `/api/user/follow`,
        { userIdToFollow: userId },
        { withCredentials: true }
      );
      console.log(response.data);
      setIsFollowing(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + `/api/user/unfollow`,
        { userIdToUnfollow: userId },
        { withCredentials: true }
      );
      console.log(response.data);
      setIsFollowing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFollowers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_ENDPOINT + `/api/user/followers/${userId}`,
        { withCredentials: true }
      );
      const fetchedFollowers = response.data.followers;
      const fetchedFollowing = response.data.following;
      setFollowers(fetchedFollowers);
      setFollowing(fetchedFollowing);

      const currentlyFollowing = fetchedFollowers.includes(currentUser.userId);
      setIsFollowing(currentlyFollowing);
    } catch (error) {
      console.log(error.message);
    } finally {
      if (checkUser()) {
        console.log("The User already follows");
      } else {
        console.log("The user doesn't follow");
      }
    }
  };

  const getFollowersDetails = async (e) => {
    e.preventDefault();
    setFollowInfo(!followinfo);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + "/api/user/followers/detail",
        { followersIds: followers, followingIds: following }
      );
      console.log(response.data);
      setFollowersData(response.data.followersData);
      setFollowingData(response.data.followingData);
    } catch (error) {
      console.log(error.message);
    }
  };

  function checkUser() {
    return followers.includes(currentUser.userId);
  }

  const handleOutsideClick = (e) => {
    if (
      changePasswordRef.current &&
      !changePasswordRef.current.contains(e.target)
    ) {
      setPasswordChange(false);
      console.log("Changed");
    }
  };

  useEffect(() => {
    if (passwordChange) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [passwordChange]);

  useEffect(() => {
    getFollowers();
  }, [userId]);

  return (
    <div className="profile">
      <div className="images">
        <img src={user.coverPicture} alt="Cover picture" className="cover" />
        <img src={user.picture} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a
              href={`https://www.facebook.com/` + user.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a
              href={`https://www.instagram.com/` + user.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon fontSize="large" />
            </a>
          </div>

          <div className="center">
            <span>{user.username}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user.country}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.website}</span>
              </div>
            </div>
            {currentUser.userId === userId ? (
              <button onClick={updateButton}>Update</button>
            ) : isFollowing ? (
              <button onClick={handleUnfollow} className="unfollow">
                Unfollow
              </button>
            ) : (
              <button onClick={handleFollow}>Follow</button>
            )}
          </div>
          <div className="right">
            <div className="options">
              <PeopleOutlineIcon onClick={getFollowersDetails} />
              <MoreVertIcon onClick={() => setIsOpen(!isOpen)} />
              {isOpen && currentUser.userId === userId && (
                <div className="dropdown-content">
                  <span onClick={() => setPasswordChange(true)}>
                    <KeyIcon /> Change Password
                    {passwordChange && (
                      <div className="Wrapper" onClick={handleOutsideClick}>
                        <div ref={changePasswordRef}>
                          <ChangePassword />
                        </div>
                      </div>
                    )}
                  </span>
                  <span onClick={() => setConfirmation(true)}>
                    <DeleteOutlineIcon /> Delete Account
                  </span>
                </div>
              )}
              {confirmation && (
                <div className="deleteWrapper">
                  <ConfirmationCard
                    onConfirm={handleDeleteUser}
                    onCancel={() => setConfirmation(false)}
                    text={"delete"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {followinfo && (
        <UserFollowInfo followers={followersData} following={followingData} />
      )}
      <div className="posts">
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
