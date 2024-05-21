import { useContext } from "react";
import "./index.scss";
import { ThemeContext } from "store/context/themeContextProvider";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { ReactComponent as Checked } from "assets/images/select_check.svg";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";
import { ReactComponent as AngleUp } from "assets/images/angle_up.svg";
import { ReactComponent as Search } from "assets/images/Select/search.svg";
import { ReactComponent as Sort } from "assets/images/sort.svg";
import { ReactComponent as Filter } from "assets/images/filtration.svg";

const { Option } = components;

const animatedComponents = makeAnimated({
  IndicatorSeparator: () => null,
  Option: (props) => {
    if (props.isMulti) {
      return <Option {...props} />;
    }
    return (
      <Option {...props}>
        <span>{props.data.label}</span>
        {props.isSelected && <Checked />}
      </Option>
    );
  },
  DropdownIndicator: (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          {props.selectProps.isSearchable && props.isFocused ? (
            <Search />
          ) : (
            <>{props.selectProps.menuIsOpen ? <AngleUp /> : <AngleDown />}</>
          )}
        </components.DropdownIndicator>
      )
    );
  },
});

const ReactSelect = ({
  label,
  options,
  name,
  value,
  onChange,
  placeholder,
  isSearch = false,
  isClear = false,
  type,
  styleWrapper,
  error,
  menuPlacement = "bottom",
  styleField,
  Icon,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const customStyles = {
    clearIndicator: (provided) => ({
      ...provided,
      position: "absolute",
      left: "0",
      cursor: "pointer",
      svg: {
        width: "20px",
        height: "20px",
        path: {
          fill: isDarkTheme ? "#006EFF" : "#006EFF",
        },
      },
    }),
    menu: (provided) => ({
      ...provided,
      className: "has-scroll-bar",
      // boxShadow: "0px 4px 8px 0px #00000040",
      background: isDarkTheme ? "#1E2329" : "#FFF",
      boxShadow: isDarkTheme
        ? "0px 4px 8px 0px rgba(0, 0, 0, 0.25)"
        : "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
      borderRadius: "8px",
      zIndex: "9",
      "& .kermit-select__option": {
        padding: "8px 14px",
        fontFamily: "Raleway, sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        color: isDarkTheme ? "#D1D5DB" : "#2C323B",
        cursor: "pointer",
        svg: {
          width: "20px",
          height: "20px",
          path: {
            fill: "#006EFF",
          },
        },
      },
      "& .kermit-select__option--is-selected": {
        // background: "#FFFFFF",
        ":hover": {
          // background: "#E6F1FF",
        },
      },
      "& .kermit-select__menu-list": {
        padding: "8px 0",
        borderRadius: "8px",
        maxHeight: "120px",
        // overflow: "hidden",
      },
    }),
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      background: isDarkTheme ? "#1E2329" : "#FFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      ":hover": {
        background: isDarkTheme ? "#3A424D" : "#E6F1FF",
      },
    }),
    // #1E2329
    control: (styles, state) => ({
      ...styles,
      border: `1px solid ${isDarkTheme ? "#4B5563" : "#D1D5DB"} `,
      transition: "all .3s",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "14px",
      boxShadow: `${state.menuIsOpen ? "0 0 0 1px #006EFF" : "none"} `,
      color: `${isDarkTheme ? "#D1D5DB" : "#BAC1CA"}`,
      backgroundColor: `${isDarkTheme ? "#1E2329" : "#FFFFFF"}`,
      fontFamily: "Raleway, sans-serif",
      minHeight: "38px",
      maxHeight: "38px",
      height: "38px",
      minWidth: `${type === "sort" || type === "filter" ? "190px" : "auto"}`,
      padding: `${type === "sort" || type === "filter" ? "0 0 0 18px" : "0"}`,
      flexWrap: `${type === "sort" || type === "filter" ? "nowrap" : "wrap"}`,
      ":hover": {
        border: `1px solid ${
          isDarkTheme && state.menuIsOpen ? "#006EFF" : "#8ABCFF"
        } `,
      },
      "& .kermit-select__single-value": {
        color: `${isDarkTheme ? "#D1D5DB" : "#2C323B"}`,
      },
      "& .kermit-select__value-container": {
        padding: state.hasValue ? "0 0 0 24px" : "0 0 0 16px",
      },
      "& .kermit-select__indicator-separator": {
        display: "none",
      },
      "& .kermit-select__placeholder": {
        fontWeight: "500",
        fontSize: "16px",
        color: `${isDarkTheme ? "#606D7F" : "#BAC1CA"}`,
        fontFamily: "Raleway, sans-serif",
      },
      "& .kermit-select__indicator": {
        svg: {
          width: "20px",
          height: "20px",
          path: {
            fill: "#006EFF",
          },
        },
        padding: `${
          type === "sort" || type === "filter" ? "6px 14px 6px 4px" : "6px 4px"
        }`,
      },
    }),
  };

  return (
    <div
      className={`select_wrapper  ${isDarkTheme ? "" : "select_wrapper_light"}`}
      style={styleWrapper}
    >
      {label && <div className="label">{label}</div>}
      <div className="field" style={{ position: "relative" }}>
        {error && <p className="error_message">{error}</p>}
        {Icon ? (
          <div className="icon_wrapper">
            <Icon />
          </div>
        ) : (
          <></>
        )}
        {type === "filter" ? (
          <div className="icon_wrapper">
            <Filter />
          </div>
        ) : null}
        {type === "sort" ? (
          <div className="icon_wrapper">
            <Sort />
          </div>
        ) : null}
        <Select
          menuPlacement={menuPlacement}
          isSearchable={isSearch}
          isClearable={isClear}
          selectedValue={value}
          onChange={(e) => onChange(e?.value)}
          value={options?.filter(function (option) {
            return option.value === value;
          })}
          styles={{ ...customStyles, ...styleField }}
          placeholder={placeholder}
          // menuIsOpen={true}
          className="kermit-select-container"
          classNamePrefix="kermit-select"
          options={options}
          name={name}
          components={animatedComponents}
        />
      </div>
    </div>
  );
};

export default ReactSelect;
