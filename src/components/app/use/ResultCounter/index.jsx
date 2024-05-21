import { useContext } from "react";
import "./index.scss";
import { ThemeContext } from "store/context/themeContextProvider";

const ResultCounter = ({ text, count, children, bordered = false, countStyle = null }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`result_counter  ${isDarkTheme ? "" : "result_counter-light"} ${bordered ? 'counter_bordered': ''}`}
    >
      {text}{" "}
      <span style={countStyle}>
        {count} {children}
      </span>
    </div>
  );
};

export default ResultCounter;
