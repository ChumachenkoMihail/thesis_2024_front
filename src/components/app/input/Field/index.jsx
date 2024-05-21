import { useContext } from "react";
import "./index.scss";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ThemeContext } from "store/context/themeContextProvider";

const Field = ({
  onBlur,
  showError = true,
  min = null,
  autoComplete = "off",
  inputMode = "",
  required = false,
  placeholder,
  label,
  name,
  id,
  type = "text",
  value,
  onChange,
  className,
  error,
  children,
  Icon,
  disabled,
  fieldWrapperStyle,
  mode,
 multiple,
    style
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`field_wrapper 
        ${isDarkTheme ? "" : "field_wrapper_light"}
        ${className ? className : ""}
        `}
      style = {style? style : null}
    >
      {label && <div className="label">{label}</div>}
      <div
        className={`field ${error ? "field_error" : ""}`}
        style={{
          height: type === "textArea" ? "fit-content" : "",
          ...fieldWrapperStyle
        }}
      >
        <>
          {error && showError && <p className="error_message">{error}</p>}

          {type === "textArea" ? (
            <>
              <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={id}
                required={required}
                disabled={disabled}
              />
            </>
          ) : (
            <>
              {type === "tel" ? (
                <PhoneInput
                  disableDropdown={true}
                  placeholder={placeholder}
                  value={value}
                  onChange={(phone) => onChange(phone)}
                />
              ) : (
                <>
                  {Icon && <Icon className={mode} />}
                  <input
                    onBlur={onBlur}
                    value={value || ""}
                    onChange={onChange}
                    inputMode={inputMode}
                    placeholder={placeholder}
                    name={name}
                    autoComplete={autoComplete}
                    min={min}
                    id={id}
                    type={type === 'file' ? 'text' : type}
                    required={required}
                    disabled={disabled}
                    multiple={multiple}
                  />
                  {type === "file" ? (
                      <input type='file' style={{opacity: 0, width: '100%', height: '100%', position: 'absolute'}} onChange={onChange} multiple='multiple'/>
                      ): null}
                </>
              )}
            </>
          )}
          {children ? <>{children}</> : null}
        </>
      </div>
    </div>
  );
};

export default Field;
