import { useContext } from "react";
import "./index.scss";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as Sun } from "assets/images/ThemeSwitcher/sun.svg";
import { ReactComponent as Moon } from "assets/images/ThemeSwitcher/moon.svg";

const ThemeSwitcher = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const onClickHandler = () => {
    toggleTheme();
  };
  return (
    <button
      className={`toggle ${isDarkTheme ? "dark_toggle" : "light_toggle"}`}
      onClick={onClickHandler}
    >
      {isDarkTheme ? <Moon /> : <Sun />}
      <div
        className="btn"
        style={{
          marginLeft: `${isDarkTheme ? "26px" : "-1px"}`,
        }}
      />
    </button>
  );
};

export default ThemeSwitcher;
