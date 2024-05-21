import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const TagLink = ({ children, href = "", text, target }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <a
      className={`tag_link ${isDarkTheme ? "" : "tag_link_light"}`}
      href={href}
      target={target}
    >
      {children}
    </a>
  );
};

export default TagLink;
