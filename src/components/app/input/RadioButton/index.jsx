import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const RadioButton = ({ name, id, value, onChange, checked, text }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`kermit_radio ${isDarkTheme ? "" : "radio_light"}`}>
      <label htmlFor={id} className="label_radio">
        <input
          className="input_radio"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <div className="custom_radio"></div>
        <span>{text}</span>
      </label>
    </div>
  );

  // return (
  //   <div
  //     className={`kermit_check
  //     ${disabled ? "disabled_check" : ""}
  //     ${isDarkTheme ? "" : "check_light"}
  //     ${checkedAll ? "checked_all" : ""}

  //       ${error ? "check_error" : ""}`}
  //   >
  //     <label htmlFor={name}>
  //       <div
  //         className={`label_check

  //           ${checked ? "label_checked" : ""}
  //           `}
  //       >
  //         <input
  //           className={`${checkedAll && checked ? "input_checked" : ""}`}
  //           checked={checked}
  //           type="checkbox"
  //           value={name}
  //           id={name}
  //           name={name}
  //           onChange={onChange}
  //           {...column}
  //         />
  //         <Check />
  //       </div>
  //       {highlightText && highlightQuery ? (
  //         <span>
  //           {parts?.map((part, index) =>
  //             part?.toLowerCase() === highlightQuery?.toLowerCase() ? (
  //               <mark key={index}>{part}</mark>
  //             ) : (
  //               part
  //             )
  //           )}
  //         </span>
  //       ) : (
  //         <>{title && <span>{title}</span>}</>
  //       )}
  //     </label>
  //   </div>
  // );
};

export default RadioButton;
