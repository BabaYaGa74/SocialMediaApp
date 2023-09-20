import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import "./app.css";
import LoadingScreen from "./components/loading/LoadingScreen";
import UserPost from "./pages/userPost/UserPost";
import UpdateProfile from "./pages/updateUser/UpdateProfile";

function App() {
  const { currentUser, loading } = useContext(AuthContext);

  const ProtectedUser = ({ children }) => {
    if (loading) {
      return <LoadingScreen />;
    }

    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedUser>
          <Layout />
        </ProtectedUser>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:userId",
          element: <Profile />,
        },
        {
          path: "/profile/update",
          element: <UpdateProfile />,
        },
        {
          path: "/post/:postId",
          element: <UserPost />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
