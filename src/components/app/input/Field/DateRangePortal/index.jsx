import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import "../index.scss";
import ExampleCustomInput from "components/app/input/Field/CustomInput";
import moment from "moment";
import Button from "components/app/use/Button";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const DateRangePortal = ({
  clear,
  selected,
  error,
  label,
  name,
  onChange,
  placeholder,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const inputRef = useRef(null);

  const handleChange = (dates) => {
    onChange(dates);
    setDateRange(dates);
  };
  const handleClear = () => {
    setDateRange([null, null]);
    clear();
  };
  useEffect(() => {
    if (selected) {
      setDateRange([
        moment(selected?.from).toDate(),
        moment(selected?.to).toDate(),
      ]);
    }
  }, [selected]);
  return (
    <div
      className={`field_wrapper field_date ${
        isDarkTheme ? "" : "field_wrapper_light"
      }`}
    >
      {label && <div className="label">{label}</div>}
      <div className={`field ${error ? "field_error" : ""}`}>
        {error && <p className="error_message">{error}</p>}
        <DatePicker
          // isClearable={true}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="yyyy-MM-dd"
          maxDate={moment().toDate()}
          placeholderText={placeholder}
          selectsRange={true}
          startDate={startDate}
          name={name}
          endDate={endDate}
          onChange={(update) => {
            handleChange(update);
          }}
          withPortal
          customInput={
            <ExampleCustomInput
              isdarktheme={isDarkTheme || null}
              ref={inputRef}
            />
          }
        />
        <Button
          mode="transparent"
          type="button"
          text="Очистить"
          func={handleClear}
        />
      </div>
    </div>
  );
};

export default DateRangePortal;
