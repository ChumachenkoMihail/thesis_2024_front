import React, { useMemo, useContext } from "react";
import { v4 as uuid } from "uuid";
import PaginationTable from "components/app/base/Table/PaginationTable";
import TableControl from "components/app/base/TableControl";
import Modal from "components/app/base/Modal";
import { ReactComponent as DefaultSorted } from "assets/images/sort_table.svg";
import { ReactComponent as AscSorted } from "assets/images/table_sort_asc.svg";
import { ReactComponent as DescSorted } from "assets/images/table_sorted_desc.svg";
import { ReactComponent as TableActions } from "assets/images/table_actions.svg";
import { useTable, usePagination, useSortBy, useRowSelect, useFilters } from "react-table";
import { ThemeContext } from "store/context/themeContextProvider";
import "./index.scss";
import CheckBox from "components/app/input/CheckBox";
import Button from "components/app/use/Button";

const Table = ({
  bulkHtml,
  bulkCustom,
  isCheckedRow = false,
  emptyTrIds,
  manualSort = false,
  onSort,
  sortBy = [],
  setColumnVisibility,
  columnVisibility,
  totalPage,
  limit,
  columns,
  data,
  trFunction,
  showControl,
  setShowControl,
  changeLimit,
  changePage,
  currentPage,
  withPagination = true,
  sourceID = null,
  className = "",
  sourceNameId = null,
}) => {
  const handleCheckboxChange = (columnKey, isChecked) => {
    if (!isChecked) {
      setColumnVisibility((prevState) => [...prevState, columnKey]);
    } else {
      setColumnVisibility((prevState) =>
        prevState.filter((key) => key !== columnKey),
      );
    }
  };
  const emptyColumns = columns?.filter((column) => {
    return data?.every(
      (item) => {}
        // item[column?.accessor] === null ||
        // item[column?.accessor] === "-" ||
        // item[column?.accessor] === " ",
    );
  });
  const filteredColumns = columns?.filter(
    (column) => !emptyColumns?.includes(column),
  );
  const updatedColumns = useMemo(
    () =>
      filteredColumns?.map((column) => {
        const isHidden = columnVisibility?.includes(column?.accessor);
        return {
          ...column,
          hidden: isHidden,
        };
      }),
    [columns, columnVisibility],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setSortBy,
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      autoResetPage: false,
      manualPagination: true,
      columns: updatedColumns,
      manualSortBy: manualSort,
      data,
      initialState: { pageSize: limit, pageIndex: 0, filters: [] },
      pageCount: totalPage,
    },
      useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      isCheckedRow &&
        hooks.visibleColumns.push((columns) => {
          return [
            {
              id: "selection",
              className: "selection_td",
              // Make this column a groupByBoundary. This ensures that groupBy columns
              // are placed after it
              groupByBoundary: true,
              disableSortBy: true,
              disableResizing: true,
              minWidth: 35,
              width: 35,
              maxWidth: 35,
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps }) => {
                const headCheckProps = getToggleAllRowsSelectedProps();
                const handleCheckAll = (e) => {
                  headCheckProps.onChange(e);
                };
                return (
                  <CheckBox
                    onChange={(e) => handleCheckAll(e)}
                    checked={headCheckProps.checked}
                  />
                );
              },
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => {
                const handlePrevent = (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                };
                const handleCheckboxChange = (row) => {
                  row.toggleRowSelected();
                };
                return (
                  <div onClick={(e) => handlePrevent(e)}>
                    <input
                      type="checkbox"
                      name={row.original.id}
                      onChange={() => handleCheckboxChange(row)}
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                    />
                    <CheckBox
                      onChange={() => handleCheckboxChange(row)}
                      checked={row.isSelected}
                      name={row.original.id}
                    />
                  </div>
                );
              },
            },
            ...columns,
          ];
        });
    },
  );
  const { isDarkTheme } = useContext(ThemeContext);
  function handlePageChange(event) {
    const newPageIndex = Number(event) - 1;
    changePage(event);
    gotoPage(newPageIndex);
  }

  function handleNextPage(event) {
    nextPage();
    changePage(event);
  }

  function handlePrevPage() {
    previousPage();
    changePage(currentPage - 1);
  }

  const handleChangePageSize = (value) => {
    changeLimit(value);
    setPageSize(value);
  };
  const showAllColumns = () => {
    setColumnVisibility([]);
    setShowControl(false);
  };

  const handleSort = (column) => {
    setSortBy([{ id: column.id, desc: !column.isSortedDesc }]);
  };

  const handleClickContextMenu = (e, id, sourceId, sourceName) => {
    const source = sourceID || sourceId;
    if (e.button === 2 && source) {
      window.open(
        `/search/details/${id}/${source}/${sourceName || sourceNameId}`,
        "_blank",
      );
    }
  };
  return (
    <div className={`wrap ${isDarkTheme ? "" : "table_wrap_light"}`}>
      {showControl && (
        <Modal
          Icon={TableActions}
          title="Управление таблицей"
          closeModal={setShowControl}
        >
          <TableControl
            cancel={showAllColumns}
            setShowControl={setShowControl}
            columns={filteredColumns?.filter((e) => e.Header)}
            checkboxChange={handleCheckboxChange}
            columnVisibility={columnVisibility}
          />
        </Modal>
      )}
      {selectedFlatRows.length ? (
        <div
          className="wrap_head"
          style={{ margin: "0 0 15px 0", display: "flex", gap: "15px" }}
        >
          <Button
            // disabled={selectedFlatRows?.length > 5}
            func={() =>
              bulkCustom(
                selectedFlatRows?.map((item) => item.original),
                toggleAllRowsSelected,
              )
            }
          >
            Объединить в кастомную анкету
          </Button>
          <Button
            // disabled={selectedFlatRows?.length > 5}
            func={() =>
              bulkHtml(
                selectedFlatRows?.map((item) => item.original),
                toggleAllRowsSelected,
              )
            }
          >
            Объединить в zip (html)
          </Button>
        </div>
      ) : null}
      {!page.length ? (
        <div align="center" className="table_loader">
          {/*<Loader/>*/}
        </div>
      ) : (
        <div className={`table_wrapper ${className} custom_scroll`}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    const isSorted = sortBy?.id === column?.id;
                    const isDesc = sortBy?.desc;
                    const canSort = column?.canSort;
                    return (
                      <th
                        key={uuid()}
                        className={column.isSorted ? "sorted" : ""}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                        onClick={() =>
                          manualSort && canSort
                            ? onSort(column)
                            : canSort
                            ? handleSort(column)
                            : console.log("sort")
                        }
                        style={{
                          display: column.hidden ? "none" : "table-cell",
                          cursor: canSort ? "pointer" : "default",
                        }}
                      >
                        <div className="head-row">
                          <span>{column.render("Header")}</span>
                          {/*<div>{column.canFilter ? column.render('Filter') : null}</div>*/}
                          {console.log(column)}
                          <span>
                            {manualSort ? (
                              <>
                                {column.canSort && (
                                  <>
                                    {isSorted && isDesc ? (
                                      <DescSorted className="desc_sort" />
                                    ) : isSorted && !isDesc ? (
                                      <AscSorted className="asc_sort" />
                                    ) : null}
                                    {/*{isSorted &&*/}
                                    {/*   (isDesc ?  : <AscSorted />)}*/}
                                    {!isSorted && (
                                      <DefaultSorted className="default_sort" />
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {column.canSort && (
                                  <>
                                    {/*{column.isSorted && column.isSortedDesc ? (*/}
                                    {/*  <DescSorted />*/}
                                    {/*) : (*/}
                                    {/*  <AscSorted />*/}
                                    {/*)}*/}
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <DescSorted className="desc_sort" />
                                      ) : (
                                        <AscSorted className="asc_sort" />
                                      )
                                    ) : (
                                      <DefaultSorted className="default_sort" />
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    id={row.id}
                    onClick={(e) => {
                      emptyTrIds?.includes(row?.original?.id)
                        ? console.log("tr")
                        : trFunction(
                            e,
                            row?.original?.id, // required
                            row?.original?.sourceId, // required
                            row?.original?.sourceNameId, // required
                          );
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();

                      emptyTrIds?.includes(row?.original?.id)
                        ? console.log("tr")
                        : handleClickContextMenu(
                            e,
                            row?.original?.id, // required
                            row?.original?.sourceId, // required
                            row?.original?.sourceNameId, // required
                          );
                    }}
                    {...row.getRowProps()}
                    className={`${row.isSelected ? "selected_row" : ""} 
                      ${
                        emptyTrIds?.includes(row?.original?.id)
                          ? "disabled_tr"
                          : ""
                      }
                    `}
                  >
                    {row.cells.map((cell, index) => {
                      const column = cell.column;
                      return (
                        <td
                          {...cell.getCellProps({
                            className: column.className,
                            style: {
                              width: column.width,
                            },
                          })}
                          style={{
                            display: column.hidden ? "none" : "table-cell",
                          }}
                          key={uuid()}
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
      )}
      {page?.length && withPagination ? (
        <div className={`pagination ${isDarkTheme ? "" : "pagination_light"}`}>
          <PaginationTable
            setPageSize={setPageSize}
            className="pagination-bar"
            currentPage={pageIndex + 1}
            pageSize={limit}
            totalCount={data?.length}
            gotoPage={handlePageChange}
            previousPage={handlePrevPage}
            nextPage={handleNextPage}
            totalPageCount={totalPage}
            changePageSize={handleChangePageSize}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
