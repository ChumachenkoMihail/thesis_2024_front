import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const IOSwitch = ({ id, isChecked, label, description, onChange }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const labelId = `label-${id}`;
  const descriptionId = `description-${id}`;

  // const labelBy = labelId + ' ' + descriptionId;

  return (
    <label
      htmlFor={id}
      className={`switch ${isDarkTheme ? "" : "light_switch"}`}
    >
      <input
        id={id}
        type="checkbox"
        // role="switch"
        // data-on={props['data-on']}
        checked={isChecked}
        // data-off={props['data-off']}
        onChange={() => onChange(id)}
        // aria-checked={isChecked}
        // aria-labelledby={labelBy}
      />
      <div className="switch-labels">
        <span id={labelId}>{label}</span>
        {description && <p id={descriptionId}>{description}</p>}
      </div>
    </label>
  );
};

export default IOSwitch;
