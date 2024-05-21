import "./index.scss";
import React, { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
// import Logo from "assets/images/Kermit_ico32.png";
import Logo from "assets/images/logo222.png";
import { NavLink } from "react-router-dom";

const LogoWrapper = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`logo_wrapper ${isDarkTheme ? "" : "logo_wrapper_light"}`}>
      <NavLink to="/search">
        <img src={Logo} alt="" />
      </NavLink>
    </div>
  );
};

export default LogoWrapper;
