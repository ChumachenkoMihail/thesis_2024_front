import { useState, useContext } from "react";
import "./index.scss";
import { ThemeContext } from "store/context/themeContextProvider";
import Button from "components/app/use/Button";
const AccordionListItem = ({
  children,
  buttonText = "Все фото",
  buttonIcon,
}) => {
  const [openSection, setOpenSection] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const toggleSection = () => {
    setOpenSection(!openSection);
  };
  return (
    <div
      className={`accordion_list_item ${
        isDarkTheme ? "" : "accordion_item_light"
      }`}
    >
      <div
        className={`accordion_item_head ${openSection ? "item_open" : ""}`}
        onClick={() => toggleSection()}
      >
        {children[0]}
        {children[1] && (
          <Button
            style={{ width: "160px" }}
            mode="tretiary"
            Icon={buttonIcon ? buttonIcon : null}
            text={!openSection ? buttonText : "Скрыть"}
          />
        )}
      </div>
      <div
        className={`accordion_item_content ${
          openSection ? "item_content_open" : ""
        }`}
        style={{ margin: openSection ? "24px 0 0 0" : "0" }}
      >
        {children[1]}
      </div>
    </div>
  );
};

export default AccordionListItem;
