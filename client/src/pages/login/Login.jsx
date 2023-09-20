import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    await login(credentials);
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Welcome back to SocialSanjal! Dive right back into your personalized
            feed of stories, connections, and memories. Enter your credentials,
            and let's continue the journey together. Secure, swift, and just a
            click away.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
