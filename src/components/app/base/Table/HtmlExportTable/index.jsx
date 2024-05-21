import React, { useEffect } from "react";
import "../index.scss";
import "./index.scss";
import { useTable } from "react-table";
import { v4 as uuid } from "uuid";
/**
 * HtmlExportTable
 *
 * @param data (array  > required)
 * @param columns (array  > required) (generate with custom function)
 */
const HtmlExportTable = ({ data, columns, isDarkTheme, size, onRowClick }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setHiddenColumns,
  } = useTable({
    columns,
    data,

    initialState: { pageSize: data?.length },
  });

  useEffect(() => {
    const emptyColumns = columns
      ?.filter((column) => {
        return data?.every(
          (item) =>
            item[column?.accessor] === null ||
            item[column?.accessor] === "-" ||
            !item[column?.accessor] ||
            item[column?.accessor] === " ",
        );
      })
      ?.map(({ accessor }) => accessor);
    setHiddenColumns(emptyColumns);
  }, [columns]);

  return (
    <div
      className={`wrap table_wrap_light ${isDarkTheme ? "html_wrap_dark" : ""}`}
    >
      <div className="table_wrapper">
        <table className="html_table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={uuid()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th {...column.getHeaderProps()}>
                      <div
                        className="head-row"
                        style={{
                          fontSize: size === "small" ? "11px" : "",
                          lineHeight: size === "small" ? "15px" : "",
                        }}
                      >
                        {column.render("Header")}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows?.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={uuid()}
                        {...cell.getCellProps()}
                        style={{
                          fontSize: size === "small" ? "11px" : "",
                          lineHeight: size === "small" ? "15px" : "",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HtmlExportTable;
