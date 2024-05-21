import HtmlExportTable from "../../app/base/Table/HtmlExportTable";
import { generateSirenaColumn } from "../../../libs/generatedСolumns/generateSirenaColumn";
import { useContext } from "react";
import { ThemeContext } from "../../../store/context/themeContextProvider";

const TableSirenaTickets = ({ data }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const columns = generateSirenaColumn(data) || [];

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div
        className="accordion_table_body custom_scroll "
        style={{ overflowX: "scroll" }}
      >
        <HtmlExportTable
          isDarkTheme={isDarkTheme}
          size="small"
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default TableSirenaTickets;
