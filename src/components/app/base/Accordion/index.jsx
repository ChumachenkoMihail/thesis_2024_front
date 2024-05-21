import { useState, useContext } from "react";
import "./index.scss";
import Title from "components/app/use/Title";
import { ReactComponent as ChevronDown } from "assets/images/chevron_down.svg";
import { ReactComponent as ChevronUp } from "assets/images/chevron_up.svg";
import { ThemeContext } from "store/context/themeContextProvider";
const Accordion = ({
  title,
  children,
  iconStyle = "",
  Icon,
  titleTag = "h3",
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = () => {
    setOpenSection(!openSection);
  };

  return (
    <div className={`kermit_accordion ${isDarkTheme ? "" : "accordion_light"}`}>
      <div
        className={`accordion_head ${openSection ? "accordion_open" : ""}`}
        onClick={() => toggleSection()}
      >
        <div className="accordion_title">
          {Icon && <Icon className={iconStyle} />}
          {title && (
            <Title Tag={titleTag}>
              <strong>{title}</strong>
            </Title>
          )}
        </div>
        {openSection ? (
          <span className="accordion_chevron">
            <ChevronUp />
          </span>
        ) : (
          <span className="accordion_chevron">
            <ChevronDown />
          </span>
        )}
      </div>
      {openSection && (
        <div className={`accordion_body ${openSection ? "body_open" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
