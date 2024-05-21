import "./index.scss";
import { useContext, useState } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";

import { useOutsideClick } from "../../../../libs/hooks/useOutsideClick";

const SelectSources = ({ options, sourceName, changeSourceNameOption }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setIsOpen(false);
    changeSourceNameOption(option);
  };
  const ref = useOutsideClick(() => setIsOpen(false));
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
      className={`select_sources ${isDarkTheme ? "" : "select_sources_light"} ${
        isOpen ? "is_open" : ""
      }`}
    >
      <div className="selected_source_option">
        <div className="option_r">
          <DataBase />
          <div className="selected_option_name">{sourceName}</div>
        </div>
        <AngleDown />
      </div>

      {isOpen && (
        <div className="source_options">
          {options?.map((option) => (
            <div
              key={option.sourceName}
              className="option"
              onClick={() => handleSelect(option)}
            >
              {option.sourceName} <span>({option.totalAnkets})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectSources;
