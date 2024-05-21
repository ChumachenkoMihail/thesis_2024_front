import { useState, useContext } from "react";
import "./index.scss";
import { useOutsideClick } from "libs/hooks/useOutsideClick";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";
import { ThemeContext } from "store/context/themeContextProvider";
const DropDown = ({
  title,
  children,
  iconStyle = "",
  Icon,
  clear = false,
  placement = "bottom",
    angleDown = true
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [openDropDown, setOpenDropDown] = useState(false);
  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  const closeDropDown = () => {
    setOpenDropDown(false);
  };

  const ref = useOutsideClick(closeDropDown);

  return (
    <div ref={ref}>
      <div
        className={`kermit_dropdown ${isDarkTheme ? "" : "dropdown_light"} ${
          clear ? "dropdown_clear" : ""
        }`}
      >
        <div
          className={`dropdown_button ${openDropDown ? "dropdown_open" : ""}`}
          onClick={() => toggleDropDown()}
        >
          {Icon && <Icon className={iconStyle} />}
          {title && <span>{title}</span>}
          {angleDown && <AngleDown />}
        </div>
        {openDropDown && (
          <div className={`dropdown_select ${placement}`} onClick={closeDropDown}>
            <div>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
