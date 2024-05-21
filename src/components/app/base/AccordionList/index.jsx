import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const AccordionList = ({ children }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`accordion_list_wrap ${
        isDarkTheme ? "" : "accordion_list_light"
      }`}
    >
      {children}
    </div>
  );
};

export default AccordionList;
