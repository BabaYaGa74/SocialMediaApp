import axios from "axios";
import "./changePassword.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_ENDPOINT +
          `/api/users/user/pass/${currentUser.userId}`,
        { password: oldPassword, newPassword },
        { withCredentials: true }
      );
      console.log(response.data);
      setMessage("Password successfully changed!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error.message);
      setMessage("Invalid password!");
    }
  };

  return (
    <div className="password-change">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
