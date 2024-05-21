import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const List = ({ children, bordered = true }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <ul
      className={`list_wrapper ${isDarkTheme ? "" : "list_wrapper_light"} ${
        bordered ? "list_wrapper_bordered" : ""
      }`}
    >
      {children}
    </ul>
  );
};

export default List;
