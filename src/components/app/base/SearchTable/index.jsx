import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const SearchTable = ({ children }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <table
      className={`search_table ${isDarkTheme ? "" : "search_table_light"}`}
    >
      <tbody>{children}</tbody>
    </table>
  );
};

export default SearchTable;
