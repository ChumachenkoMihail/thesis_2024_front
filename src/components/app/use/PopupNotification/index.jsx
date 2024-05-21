import "./index.scss";
import React, { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { Toaster } from "sonner";

const PopupNotification = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <Toaster
      expand={false}
      visibleToasts={4}
      position="top-right"
      className={`kermit_toast ${isDarkTheme ? "" : "toast_light"}`}
      closeButton
      duration={5000}
    />
  );
};

export default PopupNotification;
