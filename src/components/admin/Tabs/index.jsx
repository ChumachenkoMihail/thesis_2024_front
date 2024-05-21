import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const Tabs = ({ tabList, setSelectedTab, selectedTab }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const handleChangeTab = (value) => {
    setSelectedTab(value);
  };
  return (
    <ul
      className={`kermit_tabs_row ${isDarkTheme ? "kermit_tabs_row_dark" : ""}`}
    >
      {tabList.map(({ tabTitle, tabValue }) => {
        return (
          <li
            className={`tab_item ${
              selectedTab === tabValue ? "selected_tab" : ""
            }`}
            onClick={() => handleChangeTab(tabValue)}
          >
            {tabTitle}
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
