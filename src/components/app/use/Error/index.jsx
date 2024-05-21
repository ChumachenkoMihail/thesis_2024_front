import { ReactComponent as Alert } from "assets/images/alert.svg";
import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const Error = ({ message }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`kermit_error ${isDarkTheme ? "" : "error_light"}`}>
      <Alert />
      <span>{message}</span>
    </div>
  );
};

export default Error;
