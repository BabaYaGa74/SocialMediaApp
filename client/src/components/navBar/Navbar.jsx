import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import ConfirmationCard from "../confirmationCard/ConfirmationCard";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_API_ENDPOINT + "/api/auth/logout",
        null,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const scrollPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocialSanjal</span>
        </Link>
        <HomeOutlinedIcon className="homeButton" onClick={scrollPage} />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} className="whiteThemeButton" />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className="darkThemeButton" />
        )}
      </div>
      <div className="right">
        <ToastContainer autoClose={2000} />
        <button onClick={() => setOpen(true)}>
          <LogoutOutlinedIcon />
        </button>

        <div className="user">
          <Link className="link" to={`/profile/${currentUser.userId}`}>
            <img src={currentUser.picture} alt="UserProfile" />
            <span>{currentUser.uname}</span>
          </Link>
        </div>
      </div>
      {open && (
        <div className="wrapper">
          <ConfirmationCard
            onConfirm={handleLogout}
            onCancel={() => setOpen(false)}
            text={"exit"}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
