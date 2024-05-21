import React, { useEffect, useState, useMemo, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/app/use/Button";
import Title from "components/app/use/Title";
import Table from "components/app/base/Table";
import Modal from "components/app/base/Modal";
import EmptyPage from "components/app/base/EmptyPage";
import SelectSources from "components/app/use/SelectSources";
import ResultCounter from "components/app/use/ResultCounter";
import DropDown from "components/app/use/DropDown";
import SearchSirenaParams from "components/app/modal/SearchParams/SearchSirenaParams";
import EditCreateSearchName from "components/app/modal/EditCreateSearchName";
import Loader from "components/app/use/Loader";
import Wrapper from "layouts/Wrapper";
import { ReactComponent as Params } from "assets/images/search_params.svg";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as TableActions } from "assets/images/table_actions.svg";
import { ReactComponent as Save } from "assets/images/save_icon.svg";
import { ReactComponent as Actions } from "assets/images/actions.svg";
import {
  getHistoryParams,
  getHistoryResults,
  searchBySecretAccess,
} from "store/thunks/historyThunks";
import { searchActions } from "store/searchSlice";
import { historyActions } from "store/historySlice";
import { createColumnsCustomSort } from "libs/generatedСolumns/generateColumnWithoutSort";
import { useSearchFunctions } from "apiHooks/searchHooks/useSearchFunctions";
import { getCsvHistoryResults } from "store/thunks/historyCsvThunks";
import { useUserCredits } from "apiHooks/useUserCredits";
import { toast } from "sonner";
import "./index.scss";
import { useSearchContext } from "../../../store/context/globalSearchContext";
import PaginationTable from "../../../components/app/base/Table/PaginationTable";
import { ThemeContext } from "../../../store/context/themeContextProvider";

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { sourceId, paramsCsvId, historyId, sourceName } = useParams();
  const { shouldCallFunctions } = useUserCredits();
  const { showSearch } = useSearchContext();
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    loading,
    historyResults,
    historyParams,
    historySources,
    selectedSort,
  } = useSelector((state) => state.history);
  const { loading: searchLoading } = useSelector((state) => state.search);
  const { selectedSearchData } = useSelector((state) => state.access_search);
  const accessSourceNameId = location.state?.accessSourceNameId;
  const secretSearchParam =
    location?.state?.secretSearchParam || selectedSearchData?.secretSearchParam; // get from state or location (if page change, redux state is clear)
  const secretSearchArray =
    location?.state?.searchArray || selectedSearchData?.searchArray; // get from state or location (if page change, redux state is clear)
  const [showControl, setShowControl] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState([]);
  const [showSearchSirenaParams, setShowSearchSirenaParams] = useState(false);
  const [saveSearch, setSaveSearch] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { handleBulkHtml, handleBulkCustomCreate } = useSearchFunctions(
    sourceId,
    location,
    sourceName,
  );
  useEffect(() => {
    if (paramsCsvId) {
      dispatch(
        getCsvHistoryResults({
          historyId: historyId,
          limit,
          page,
          sourceID: sourceId,
          sort: selectedSort?.id,
          sortValue: selectedSort?.desc ? "DESC" : "ASC",
          paramsId: paramsCsvId,
        }),
      );
    }
    if (historyId && !paramsCsvId) {
      dispatch(
        getHistoryResults({
          historyId: historyId,
          limit,
          page,
          sourceID: sourceId,
          sort: selectedSort?.id,
          sortValue: selectedSort?.desc ? "DESC" : "ASC",
        }),
      );
    }
  }, [limit, page, selectedSort, dispatch, location.pathname]);
  useEffect(() => {
    secretSearchParam &&
      dispatch(
        searchBySecretAccess({
          limit: limit,
          page: page,
          [secretSearchParam]: secretSearchArray,
        }),
      );
  }, [limit, page]);

  const handleCloseSearch = () => {
    setSaveSearch(null);
  };
  const handleDetailsUser = (e, id) => {
    if (!shouldCallFunctions?.anketDetail) {
      return toast.error("Недостаточно кредитов для просмотра анкет", {
        description: "Обратитесь к администратору",
      });
    } else {
      dispatch(searchActions.clearAnketData(null));
      navigate(
        `/search/details/${id}/${historyResults.sourceId || sourceId}/${
          secretSearchParam ? accessSourceNameId : historyResults?.sourceNameId
        }`,
      );
    }
  };

  const handleShowSearchParams = async () => {
    await dispatch(getHistoryParams(historyId));
    showSearch();
  };

  const handleShowNewSearch = (type) => {
    dispatch(historyActions.clearHistoryParams(null));

    if (type === "sirena") {
      setShowSearchSirenaParams(!showSearchSirenaParams);
    } else {
      showSearch();
    }
  };

  const handleShowSirenaSearch = () => {
    dispatch(historyActions.clearHistoryParams(null));
    setShowSearchSirenaParams(!showSearchSirenaParams);
  };

  const handleChangePageLimit = (value) => {
    setPage(1);
    setLimit(value);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };
  function handlePrevPage() {
    setPage(page - 1);
  }
  function handleNextPage(event) {
    setPage(page + 1);
  }
  const handleSort = (column) => {
    const isSortedDesc = selectedSort?.desc;
    dispatch(
      historyActions.setSelectedSort({ id: column.id, desc: !isSortedDesc }),
    );
  };

  const columns =
    historyResults?.searchResults &&
    createColumnsCustomSort(historyResults?.searchResults);

  const updatedArray = useMemo(
    () =>
      [columns?.find((item) => item.className === "table_image")]
        .concat(columns?.filter((item) => item.className !== "table_image"))
        .filter(Boolean),
    [columns],
  );
  const handleChangeSourceNameOption = (option) => {
    dispatch(historyActions.setSelectedSort({}));
    navigate(
      `/search/${historyId}/${option.sourceId}/${option.sourceNameId}${
        paramsCsvId ? `/${paramsCsvId}` : ""
      }`,
    );
  };
  return (
    <>
      {showSearchSirenaParams && (
        <Modal
          closeModal={handleShowSirenaSearch}
          width="1360"
          Icon={Params}
          title="Параметры поиска Sirena"
        >
          <SearchSirenaParams
            selectedParams={historyParams?.searchParams?.input?.searchFields}
            cancel={handleShowSirenaSearch}
          />
        </Modal>
      )}
      {saveSearch && (
        <Modal
          Icon={Save}
          title="Cохранить поиск"
          closeModal={handleCloseSearch}
        >
          <EditCreateSearchName
            defaultData={{
              name: historyResults?.historyName,
              historyId: historyResults?.historyId,
            }}
            cancel={handleCloseSearch}
            sourceID={historyResults.sourceId}
          />
        </Modal>
      )}
      {loading || searchLoading ? (
        <Loader />
      ) : (
        <Wrapper className="kermit_search kermit_box">
          <div className="wrapper_head">
            <div className="head_vis-l">
              <Title Tag="h2">Поиск по анкетам</Title>
              <div className="head_tags-row">
                {historyResults?.sourceName && (
                  <SelectSources
                    options={historySources}
                    sourceName={historyResults?.sourceName}
                    changeSourceNameOption={handleChangeSourceNameOption}
                  />
                )}
                {historyResults?.searchResults && (
                  <div className="head_count_bordered">
                    <ResultCounter
                      text="Результат поиска:"
                      count={historyResults?.totalAnkets}
                    >
                      анкет
                    </ResultCounter>
                  </div>
                )}
              </div>
            </div>
            {historyResults?.searchResults && (
              <div className="head_vis-r">
                <DropDown title="Действия" Icon={Actions}>
                  {!secretSearchParam && (
                    <div
                      className="head_actions_item"
                      onClick={() => handleShowSearchParams()}
                    >
                      <Params />
                      <span>Параметры поиска</span>
                    </div>
                  )}
                  <div
                    className="head_actions_item"
                    onClick={() => setShowControl(!showControl)}
                  >
                    <TableActions />
                    <span>Управление таблицей</span>
                  </div>
                  {!secretSearchParam && (
                    <div
                      className="head_actions_item"
                      onClick={() => setSaveSearch(!saveSearch)}
                    >
                      <Save />
                      <span>Сохранить поиск</span>
                    </div>
                  )}
                </DropDown>
                <Button
                  Icon={SearchLoop}
                  mode="secondary"
                  text="Поиск Sirena"
                  func={() => handleShowNewSearch("sirena")}
                />
                <Button
                  Icon={SearchLoop}
                  mode="primary"
                  text="Новый поиск"
                  func={handleShowNewSearch}
                />
              </div>
            )}
          </div>
          <div>
            {historyResults && updatedArray ? (
              <>
                <Table
                  bulkHtml={handleBulkHtml}
                  bulkCustom={handleBulkCustomCreate}
                  isCheckedRow
                  setColumnVisibility={setColumnVisibility}
                  columnVisibility={columnVisibility}
                  showControl={showControl}
                  setShowControl={setShowControl}
                  data={historyResults?.searchResults}
                  columns={updatedArray}
                  trFunction={handleDetailsUser}
                  // changeLimit={handleChangePageLimit}
                  manualSort={!secretSearchParam}
                  sortBy={selectedSort}
                  onSort={handleSort}
                  emptyTrIds={[]}
                  sourceID={sourceId}
                  sourceNameId={historyResults?.sourceNameId}
                  withPagination={false}
                />
                <div
                  className={`pagination ${
                    isDarkTheme ? "" : "pagination_light"
                  }`}
                >
                  <PaginationTable
                    showLimit={true}
                    changePageSize={handleChangePageLimit}
                    className="pagination-bar"
                    currentPage={+historyResults?.page}
                    pageSize={historyResults?.limit}
                    totalCount={historyResults?.searchResults?.length}
                    gotoPage={handleChangePage}
                    previousPage={handlePrevPage}
                    nextPage={handleNextPage}
                    totalPageCount={+historyResults?.totalPages}
                  />
                </div>
              </>
            ) : (
              <EmptyPage title="Нет данных для отображения">
                <>
                  <Button
                    Icon={SearchLoop}
                    mode="secondary"
                    text="Поиск Sirena"
                    func={() => handleShowNewSearch("sirena")}
                  />
                  <Button
                    Icon={SearchLoop}
                    mode="primary"
                    text="Новый поиск"
                    func={handleShowNewSearch}
                  />
                </>
              </EmptyPage>
            )}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Search;
