import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";


const Button = ({
  mode = "primary",
  children,
  iconStyle = "",
  style,
  text,
  type = "button",
  Icon,
  func,
  className = "",
  disabled = false,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <button
      style={style}
      className={`kermit_btn ${
        isDarkTheme ? "" : "btn_light"
      } ${mode} ${className}`}
      type={type}
      onClick={func}
      disabled={disabled}
    >
      <span className={`btn_text`}>
        {Icon && <Icon className={iconStyle} />}
        {text ? text : ""}
        {children && <span>{children}</span>}
      </span>
    </button>
  );
};

export default Button;
