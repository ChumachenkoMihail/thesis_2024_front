import React, { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import HtmlExportTable from "components/app/base/Table/HtmlExportTable";
import { v4 as uuid } from "uuid";
import { alterEgoColumns } from "libs/generatedСolumns/alterEgo/alterEgoColumns";

const AlterEgoList = ({ ankets }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const allAlteregos = ankets?.result?.mergerdResults?.flatMap(
    (item) => item?.alteregos,
  );

  return (
    <div>
        <div
            key={uuid()}
            style={{
                padding: "20px",
                display: "grid",
                gap: "15px",
                background: isDarkTheme ? "#3a424d" : "#e6f1ff",
                borderRadius: "12px",
                overflowY: "scroll",
            }}
        >
            <HtmlExportTable
                isDarkTheme={isDarkTheme}
                data={allAlteregos}
                columns={alterEgoColumns.map((column) => ({
                    ...column,
                    originData: allAlteregos,
                }))}
                onRowClick={(rowData) =>
                    window.open(
                        `/search/details/${rowData.found_anket_id}/${ankets?.sourceId}/${ankets?.sourceNameId}`,
                        "_blank",
                    )
                }
                size="small"
            />
        </div>
    </div>
  );
};

export default AlterEgoList;
