import React, { useContext, useState } from "react";
import axios from "axios";
import "./updateProfile.scss";
import { AuthContext } from "../../context/authContext";

const UpdateProfile = () => {
  const { currentUser, setIsProfileUpdated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: currentUser.email,
    picture: currentUser.picture,
    facebook: currentUser.facebook,
    instagram: currentUser.instagram,
    country: currentUser.country,
    coverPicture: currentUser.coverPicture,
    website: currentUser.website,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_ENDPOINT +
          `/api/users/user/${currentUser.userId}`,
        formData,
        { withCredentials: true }
      );
      console.log("Profile updated successfully!", response.data.user);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setIsProfileUpdated(true);
      window.location.reload();
    }
  };

  return (
    <div className="updateProfileContainer">
      <h1>Update Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="picture">Profile Picture URL</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={formData.picture}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="coverPicture">Cover Picture URL</label>
          <input
            type="text"
            id="coverPicture"
            name="coverPicture"
            value={formData.coverPicture}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="facebook">Facebook Account</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            placeholder="Enter your facebook username"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="instagram">Instagram Account</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            placeholder="Enter your instagram username"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
