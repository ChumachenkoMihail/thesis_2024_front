import React, {useContext} from "react";
import { useTable, useFilters, useSortBy } from 'react-table';
import { ReactComponent as AscSorted } from "assets/images/table_sort_asc.svg";
import { ReactComponent as DescSorted } from "assets/images/table_sorted_desc.svg";
import { ReactComponent as DefaultSorted } from "assets/images/sort_table.svg";
import {ThemeContext} from "../../store/context/themeContextProvider";
import "./index.scss";
import {useNavigate} from "react-router-dom";
import Button from "../app/use/Button";
import { ReactComponent as Trash } from "assets/images/trash.svg";



function matchSorterFn(){

}
const DataTable = (props) => {
    // MEMOS
    const navigate = useNavigate()
    const data = React.useMemo(() => props.data, [props.data]);
    const columns = React.useMemo(() => props.columns, [props.columns]);
    const defaultColumn = React.useMemo(
        () => ({
            Filter: ''
}),
    []
);
    const { isDarkTheme } = useContext(ThemeContext);


    function goToDetails(bugId){
        navigate(`/bug-details/${bugId}`)
    }
    const filterTypes = React.useMemo(
        () => ({
            rankedMatchSorter: matchSorterFn
        }),
        []
    );
    // CONFIGURE useTable
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes
        },
        useFilters,
        useSortBy // Add useSortBy hook
    );
    // RENDERING
    return (
        <div className={`wrap ${isDarkTheme ? "" : "table_wrap_light"}`}>

            <div className={`table_wrapper ${props.className} custom_scroll`}>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup) => (
                <>
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th

                            {...column.getHeaderProps(column.getSortByToggleProps())}>
                            <div className="head-row">

                            {column.render('Header')}
                            {/* Render the columns filter UI */}
                            {/* Add sort indicators */}
                            <span>
                  {column.canSort && (
                      <>
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
                </span>
                            </div>

                        </th>
                    ))}
                </tr>
                    <tr {...headerGroup.getHeaderGroupProps()} >
                        {headerGroup.headers.map((column) => (
                            <th>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                </>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} onClick={(e)=> {
                        if (e.target?.tagName !== 'BUTTON' && e.target?.tagName !== 'path'&& e.target?.tagName !== 'svg'){
                            goToDetails(row.original.id)
                        }
                    }}>
                        {row.cells.map((cell) => {
                            return <td style={{padding: '15px'}} {...cell.getCellProps()}>{cell.render('Cell')}
                            </td>;
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
export default DataTable;