import HtmlExportTable from "../../app/base/Table/HtmlExportTable";
import { createColumns } from "../../../libs/generatedСolumns/generateColumnWithSort";
import { useContext } from "react";
import { ThemeContext } from "../../../store/context/themeContextProvider";

const TableSirenaPassenger = ({ data }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const columns = createColumns(data?.sirenaPassenger) || [];
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div
        className="accordion_table_body custom_scroll "
        style={{ overflowX: "scroll" }}
      >
        <HtmlExportTable
          size="small"
          data={data?.sirenaPassenger}
          columns={columns}
          isDarkTheme={isDarkTheme}
        />
      </div>
    </div>
  );
};

export default TableSirenaPassenger;
