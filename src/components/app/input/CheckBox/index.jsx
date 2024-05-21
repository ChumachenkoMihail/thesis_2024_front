import "./index.scss";
import { ReactComponent as Check } from "assets/images/checkbox_check.svg";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const CheckBox = ({
  title,
  name,
  id,
  onChange,
  column,
  checked,
  disabled = false,
  error,
  checkedAll = false,
  highlightQuery = null,
  highlightText = false,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const regex = new RegExp(`(${highlightQuery})`, "gi");
  const parts = title?.split(regex);

  return (
    <div
      className={`kermit_check  
      ${disabled ? "disabled_check" : ""} 
      ${isDarkTheme ? "" : "check_light"} 
      ${checkedAll ? "checked_all" : ""}

        ${error ? "check_error" : ""}`}
    >
      <label htmlFor={id || name}>
        <div
          className={`label_check 
           
            ${checked ? "label_checked" : ""}
            `}
        >
          <input
            className={`${checkedAll && checked ? "input_checked" : ""}`}
            checked={checked}
            type="checkbox"
            value={name}
            id={id || name}
            name={name}
            onChange={onChange}
            {...column}
          />
          <Check />
        </div>
        {highlightText && highlightQuery ? (
          <span>
            {parts?.map((part, index) =>
              part?.toLowerCase() === highlightQuery?.toLowerCase() ? (
                <mark key={index}>{part}</mark>
              ) : (
                part
              ),
            )}
          </span>
        ) : (
          <>
            {title && (
              <span className={`${name === "all" ? "check_title_bold" : ""}`}>
                {title}
              </span>
            )}
          </>
        )}
      </label>
    </div>
  );
};

export default CheckBox;
