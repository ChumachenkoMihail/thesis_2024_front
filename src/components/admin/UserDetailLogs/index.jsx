import Title from "components/app/use/Title";
import { memo, useContext, useEffect, useState } from "react";
import { ReactComponent as Clear } from "assets/images/clear_input.svg";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import { ReactComponent as SearchIco } from "assets/images/search_params.svg";

import { ThemeContext } from "store/context/themeContextProvider";
import Tabs from "components/admin/Tabs";
import { historySortEnums, userTabLogs } from "libs/Enums";
import "./index.scss";
import Field from "components/app/input/Field";
import ReactSelect from "components/app/input/Select";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "store/usersSlice";
import { getUserLogs } from "store/thunks/usersThunks";
import HistoryTable from "components/app/base/HistoryTable";
import { getHistoryParams } from "store/thunks/historyThunks";
import Modal from "components/app/base/Modal";
import HistorySources from "components/app/modal/HistorySources";
import { accessSearchActions } from "store/accessSearchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { searchActions } from "store/searchSlice";
import EmptyPage from "components/app/base/EmptyPage";
import SearchSirenaParams from "components/app/modal/SearchParams/SearchSirenaParams";
import PaginationTable from "components/app/base/Table/PaginationTable";
import HistoryCsvTable from "components/app/base/HistoryCsvTable";
import { getCsvHistoryParams } from "store/thunks/historyCsvThunks";
import CsvHistoryParams from "components/app/modal/CsvHistoryParams";
import CsvSourcesList from "components/app/modal/CsvSourcesList";
import { historyCsvActions } from "store/historyCsvSlice";
import GeneralLogs from "components/admin/UserDetailLogs/GeneralLogs";
import { useSearchContext } from "../../../store/context/globalSearchContext";
const UserDetailLogs = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    selectedLogSort,
    logsPaginationData,
    selectedLogType,
    logsPage,
    logsLimit,
    logs,
  } = useSelector((state) => state.users);
  const { historyParams } = useSelector((state) => state.history);
  const { historyCsvParams } = useSelector((state) => state.historyCsv);
  const { isDarkTheme } = useContext(ThemeContext);
  const [sources, setSources] = useState(null);
  const [csvSources, setCsvSources] = useState(null);
  const [showSirenaSearchParams, setShowSirenaSearchParams] = useState(false);
  const [showCsvSearchParams, setShowCsvSearchParams] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { showSearch } = useSearchContext();

  const clearState = () => {
    dispatch(accessSearchActions.clearAccessSearchState());
    navigate(location.pathname, {
      replace: true,
      search: "",
      state: undefined,
    });
  };
  const changeOption = (option) => {
    const selected = historySortEnums.find((opt) => opt.value === option);
    dispatch(usersActions.setSort(selected));
  };
  const changeLogType = (type) => {
    dispatch(usersActions.changePage(1));
    dispatch(usersActions.setLogType(type));
    setSearchQuery("");
  };

  const fetchLogs = () => {
    dispatch(
      getUserLogs({
        page: logsPage,
        limit: logsLimit,
        userId: userId,
        orderByTime: selectedLogSort.value,
        type: selectedLogType,
        name: searchQuery,
      }),
    );
  };
  useEffect(() => {
    isFirstRender && fetchLogs();

    let timerId;

    const handleFetchData = () => {
      clearTimeout(timerId);

      if (searchQuery.length > 3 || searchQuery === "") {
        timerId = setTimeout(
          () => {
            fetchLogs();
          },
          searchQuery.length > 3 ? 2000 : 1000,
        );
      }
    };

    // Effect for subsequent updates with a timer
    !isFirstRender && handleFetchData();
    setIsFirstRender(false);
  }, [searchQuery]);

  useEffect(() => {
    fetchLogs();
  }, [logsPage, logsLimit, selectedLogSort, selectedLogType]);
  const handleShowSearchParams = async (id, type) => {
    const getHistoryParamsId = logs?.find((item) => item?.id === id);
    await dispatch(getHistoryParams(getHistoryParamsId?.data?.[0].historyId));
    if (type && type === "sirena_ticket_info") {
      setShowSirenaSearchParams(!showSirenaSearchParams);
    } else {
      showSearch();
    }
  };

  const handleGetHistorySources = (sources, id, name, searchIn) => {
    const getHistorySources = logs?.find((item) => item?.id === id);
    setSources({
      sources: getHistorySources?.data?.[0].sources,
      id,
      name,
      searchIn,
    });
  };

  const handleGetHistoryResults = (sourceId, historyId, sourceName) => {
    const getHistoryId = logs?.find((item) => item?.id === historyId);
    clearState();
    navigate(
      `/search/${getHistoryId?.data?.[0]?.historyId}/${sourceId}/${sourceName}`,
    );
  };
  const handleGetInsigthResult = (sourceNameId, type, sourceName) => {
    dispatch(searchActions.clearAnketData(null));
    navigate(`/search/details/${sourceName}/${type}/${sourceNameId}`);
  };
  const handleHideSearchParams = () => {
    setShowSirenaSearchParams(false);
  };

  const handleChangePage = (page) => {
    dispatch(usersActions.changePage(page));
  };

  function handlePrevPage() {
    dispatch(usersActions.changePage(logsPage - 1));
  }
  function handleNextPage(event) {
    dispatch(usersActions.changePage(event));
  }
  const handleChangeLogsPageSize = (value) => {
    dispatch(usersActions.changeLimit(value));
  };
  const handleShowCsvSearchParams = async (id) => {
    const getCsvHistoryId = logs.find((item) => item.id === id);
    await dispatch(
      getCsvHistoryParams(getCsvHistoryId?.data?.[0]?.bulkSearchHistoryId),
    ).then((data) => {
      data?.payload?.searchParams &&
        setShowCsvSearchParams(!showCsvSearchParams);
    });
  };
  const handleGetHistoryCsvSources = (sources, id, name) => {
    const getCsvHistorySources = logs.find((item) => item.id === id);
    setCsvSources({
      sources: getCsvHistorySources.data?.[0].sources,
      id: getCsvHistorySources.data?.[0].bulkSearchHistoryId,
      name,
    });
  };
  const handleGetHistoryCsvResults = (
    sourceId,
    historyId,
    sourceName,
    paramsId,
  ) => {
    clearState();
    navigate(`/search/${historyId}/${sourceId}/${sourceName}/${paramsId}`);
  };

  const handleGetByName = (e) => {
    const queryStr = e.target.value?.trim();
    setSearchQuery(queryStr);
  };
  return (
    <>
      {csvSources && (
        <Modal
          width="600"
          title="Результаты поиска"
          modalDesc="Выберите базу для отображения результатов"
          Icon={DataBase}
          closeModal={() => setCsvSources(null)}
        >
          <CsvSourcesList
            getResults={handleGetHistoryCsvResults}
            allSource={csvSources}
          />
        </Modal>
      )}
      {showCsvSearchParams && historyCsvParams && (
        <Modal
          width="1308"
          Icon={SearchIco}
          title={`Параметры поиска ${
            historyCsvParams?.searchParams?.name ||
            historyCsvParams?.searchParams?.input?.name
          }`}
          closeModal={() => setShowCsvSearchParams(false)}
        >
          <CsvHistoryParams
            selectedParams={historyCsvParams?.searchParams?.input?.searchFields}
            cancel={() => setShowCsvSearchParams(false)}
          />
        </Modal>
      )}
      {showSirenaSearchParams && (
        <Modal
          width="1308"
          Icon={SearchIco}
          title="Параметры поиска Sirena"
          closeModal={handleHideSearchParams}
        >
          <SearchSirenaParams
            selectedParams={historyParams?.searchParams?.input?.searchFields}
            cancel={handleHideSearchParams}
          />
        </Modal>
      )}
      {sources && (
        <Modal
          title="Выбор базы"
          modalDesc="Выберите базу для отображения результатов"
          closeModal={() => setSources(null)}
          Icon={DataBase}
          width="600"
        >
          <HistorySources
            allSource={sources}
            getResults={handleGetHistoryResults}
            getInsightResult={handleGetInsigthResult}
          />
        </Modal>
      )}
      <div
        className={`kermit_user_logs  ${
          isDarkTheme ? "kermit_user_dark_logs" : ""
        }`}
      >
        <div className="logs_container">
          <div className="logs_head">
            <div className="head_details">
              <div className="head_title">
                <Title Tag="h3">История действий</Title>
              </div>
              <div className="user_tabs_wrapper">
                <Tabs
                  setSelectedTab={changeLogType}
                  selectedTab={selectedLogType}
                  tabList={userTabLogs}
                />
              </div>
            </div>
          </div>
          <div className="logs_details">
            <div className="logs_actions">
              <Field
                name="searchQuery"
                placeholder="Поиск по имени"
                onChange={handleGetByName}
                value={searchQuery}
                Icon={SearchLoop}
              >
                {searchQuery && (
                  <Clear
                    className="clear_field"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </Field>
              <ReactSelect
                options={historySortEnums}
                name="sort_search"
                placeholder={selectedLogSort.label}
                value={selectedLogSort.value}
                onChange={changeOption}
                label=""
                type="sort"
                styleWrapper={{
                  width: "225px",
                }}
              />
            </div>
            {logs?.length ? (
              <>
                {selectedLogType === "search" && (
                  <>
                    <HistoryTable
                      history={logs}
                      showSearchParams={handleShowSearchParams}
                      showFindSources={handleGetHistorySources}
                    />
                  </>
                )}
                {selectedLogType === "bulkSearch" && (
                  <>
                    <HistoryCsvTable
                      history={logs}
                      showSearchParams={handleShowCsvSearchParams}
                      showFindSources={handleGetHistoryCsvSources}
                    />
                  </>
                )}
                {(selectedLogType === "anketDetail" ||
                  selectedLogType === "export" ||
                  selectedLogType === "merge" ||
                  selectedLogType === "api" ||
                  selectedLogType === "admin" ||
                  selectedLogType === "") && (
                  <GeneralLogs
                    showSearchParams={handleShowSearchParams}
                    showFindSources={handleGetHistorySources}
                    showCsvSearchParams={handleShowCsvSearchParams}
                    showFindCsvSources={handleGetHistoryCsvSources}
                    logs={logs}
                  />
                )}
                <div
                  className={`pagination ${
                    isDarkTheme ? "" : "pagination_light"
                  }`}
                >
                  <PaginationTable
                    showLimit={true}
                    changePageSize={handleChangeLogsPageSize}
                    className="pagination-bar"
                    currentPage={logsPaginationData?.pagination?.page}
                    pageSize={logsPaginationData?.pagination?.limit}
                    totalCount={logsPaginationData?.logs?.length}
                    gotoPage={handleChangePage}
                    previousPage={handlePrevPage}
                    nextPage={handleNextPage}
                    totalPageCount={logsPaginationData?.pagination?.totalPages}
                  />
                </div>
              </>
            ) : (
              <>
                <EmptyPage
                  Icon={Empty}
                  title="Нет истории логов по выбранному типу"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UserDetailLogs);
