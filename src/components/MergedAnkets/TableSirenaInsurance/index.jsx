import Title from "components/app/use/Title";
import React, { useContext } from "react";
import { createColumns } from "libs/generatedСolumns/generateColumnWithSort";
import HtmlExportTable from "components/app/base/Table/HtmlExportTable";
import { ThemeContext } from "../../../store/context/themeContextProvider";

const TableSirenaInsurance = ({ data }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const getInsureColumn = createColumns([data]) || [];
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Сирена Страховки</Title>
      </div>
      <div className="accordion_table_body">
        <HtmlExportTable
          isDarkTheme={isDarkTheme}
          size="small"
          data={[data]}
          columns={getInsureColumn}
        />
      </div>
    </div>
  );
};

export default TableSirenaInsurance;
