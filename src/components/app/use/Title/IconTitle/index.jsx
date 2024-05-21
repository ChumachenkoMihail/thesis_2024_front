import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const IconTitle = ({ Icon, iconStyle, iconStyleWrapper, IconHeight, IconWidth }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`title_icon_wrapper ${isDarkTheme ? "" : "title_icon_light"} ${iconStyleWrapper}`}
    >
      <Icon className={iconStyle} style={{ height: IconHeight, width: IconWidth }} />
    </div>
  );
};
export default IconTitle;
