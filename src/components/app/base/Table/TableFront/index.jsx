import React, { useContext, useEffect } from "react";
import "../index.scss";
import { useTable, usePagination } from "react-table";
import { ThemeContext } from "store/context/themeContextProvider";
import PaginationTable from "components/app/base/Table/PaginationTable";
/**
 * TableFront
 *
 * @param data (array  > required)
 * @param columns (array  > required) (generate with custom function)
 */

const TableFront = ({ data, columns, rowFunction }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination, // This enables pagination
  );

  useEffect(() => {
    const emptyColumns = columns
      ?.filter((column) => {
        return page?.every(
          (item) =>
            item?.values[column?.accessor] === null ||
            item?.values[column?.accessor] === "-" ||
            item?.values[column?.accessor] === "-" ||
            !item?.values[column?.accessor],
        );
      })
      .map(({ accessor }) => accessor);
    setHiddenColumns(emptyColumns);
  }, [columns, page]);
  function handleNextPage(event) {
    nextPage();
  }

  function handlePrevPage() {
    previousPage();
  }

  const handleChangePageSize = (value) => {
    setPageSize(value);
  };

  function handleChangePage(page) {
    gotoPage(page - 1);
  }

  return (
    <div className={`wrap ${isDarkTheme ? "" : "table_wrap_light"}`}>
      <div className="table_wrapper">
        <table className="hover_off" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th {...column.getHeaderProps()}>
                      <div className="head-row">{column.render("Header")}</div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onContextMenu={
                    rowFunction
                      ? (e) => {
                          e.preventDefault();
                          rowFunction(row);
                        }
                      : null
                  }
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{
                          background: row.original.isActualOwner // only for EGRON
                            ? `${
                                isDarkTheme
                                  ? "rgb(40 116 40)"
                                  : "rgb(230 252 230)"
                              }`
                            : "",
                        }}
                        {...cell.getCellProps()}
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
      {page?.length ? (
        <div className={`pagination ${isDarkTheme ? "" : "pagination_light"}`}>
          <PaginationTable
            setPageSize={setPageSize}
            className="pagination-bar"
            currentPage={pageIndex + 1}
            pageSize={pageSize}
            totalCount={data?.length}
            gotoPage={handleChangePage}
            previousPage={handlePrevPage}
            nextPage={handleNextPage}
            totalPageCount={Math.ceil(data?.length / pageSize)}
            changePageSize={handleChangePageSize}
            limitMenuPlacement="top"
          />
        </div>
      ) : null}
    </div>
  );
};

export default TableFront;
