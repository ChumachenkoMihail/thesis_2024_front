import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import "./index.scss";

const RangeSlider = ({ min, max, value, onChange }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`kermit_range_wrapper ${isDarkTheme ? "" : "range_light"}`}>
      <Slider
        range
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="kermit_range_age"
      />
    </div>
  );
};

export default RangeSlider;
