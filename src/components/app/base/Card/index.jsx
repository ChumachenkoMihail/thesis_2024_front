import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const Card = ({ type = "small", children }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`card ${isDarkTheme ? "" : "card_light"} ${
        type === "big" && "card_big"}`}
    >
      {children}
    </div>
  );
};

export default Card;
