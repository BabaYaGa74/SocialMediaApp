import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + "/api/auth/register",
        { username, password, email, name }
      );
      console.log(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setName(response.data.name);
      setError(false);
      navigate("/login");
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Sanjal.</h1>
          <p>
            Step into the world of SocialSanjal - where connections are made and
            stories come to life. Create your account today to join our
            community, share your moments, and stay updated with friends and
            interests. It's quick, easy, and secure. Get started and be part of
            the conversation!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && <h3>User already exists</h3>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
