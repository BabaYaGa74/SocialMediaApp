import React, { useContext } from "react";
import NavBar from "./components/navBar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import "./style.scss";
import Footer from "./components/footer/Footer";

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`theme-${darkMode ? "dark" : "light"}`}
      style={{ margin: 0, padding: 0 }}
    >
      <NavBar />
      <div style={{ display: "flex" }}>
        {/* <LeftBar /> */}
        <div style={{ flex: 7 }}>
          <Outlet />
        </div>
        {/* <RightBar /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
