import { DOTS, usePagination } from "libs/hooks/usePagination";
import { v4 as uuid } from "uuid";
import { pageSizeEnums } from "libs/Enums";
import { ReactComponent as Arrow } from "assets/images/pagination_arrow.svg";
import ReactSelect from "components/app/input/Select";
const PaginationTable = ({
  showLimit = true,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,

  gotoPage,
  previousPage,
  nextPage,
  totalPageCount,
  setPageSize,
  changePageSize,
  limitMenuPlacement,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPageCount,
  });
  let lastPage = totalPageCount;
  return (
    <>
      {showLimit && (
        <div className="page_size_wrapper">
          Показывать по
          <ReactSelect
            menuPlacement={limitMenuPlacement}
            options={pageSizeEnums}
            placeholder={pageSize}
            name="page_size"
            value={pageSize}
            onChange={changePageSize}
            label=""
          />
          на странице
        </div>
      )}
      <ul className={`pagination-container ${className ? className : ""}`}>
        <li
          className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={previousPage}
        >
          <Arrow />
        </li>
        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li key={uuid()} className="pagination-item dots">
                &#8230;
              </li>
            );
          }
          return (
            <li
              key={uuid()}
              className={`pagination-item ${
                pageNumber === currentPage ? "selected" : ""
              }`}
              onClick={() => gotoPage(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={`pagination-item ${
            currentPage === lastPage ? "disabled" : ""
          }`}
          onClick={() => nextPage(currentPage + 1)}
        >
          <Arrow />
        </li>
      </ul>
    </>
  );
};

export default PaginationTable;
