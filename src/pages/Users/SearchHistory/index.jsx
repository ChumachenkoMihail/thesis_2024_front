import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as SearchIco } from "assets/images/search_params.svg";
import { ReactComponent as Edit } from "assets/images/pencil_edit.svg";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import { ReactComponent as CheckButton } from "assets/images/check_button.svg";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as Clear } from "assets/images/clear_input.svg";

import Modal from "components/app/base/Modal";
import Title from "components/app/use/Title";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "components/app/input/Select";
import {
  deleteHistory,
  getHistoryParams,
  getHistoryRequests,
} from "store/thunks/historyThunks";
import Loader from "components/app/use/Loader";
import { historyActions } from "store/historySlice";
import Wrapper from "layouts/Wrapper";
import Button from "components/app/use/Button";
import HistorySources from "components/app/modal/HistorySources";
import EditCreateSearchName from "components/app/modal/EditCreateSearchName";
import { ThemeContext } from "store/context/themeContextProvider";
import PaginationTable from "components/app/base/Table/PaginationTable";
import "./index.scss";
import { accessSearchActions } from "store/accessSearchSlice";
import GetContactHistoryModal from "components/app/modal/GetContactHistoryModal";
import EmptyPage from "components/app/base/EmptyPage";
import ResultCounter from "components/app/use/ResultCounter";
import { useModal } from "store/context/ModalContext";
import Field from "components/app/input/Field";
import { historySortEnums } from "libs/Enums";
import SearchSirenaParams from "components/app/modal/SearchParams/SearchSirenaParams";
import { searchActions } from "store/searchSlice";
import { useUserCredits } from "apiHooks/useUserCredits";
import { toast } from "sonner";
import HistoryTable from "components/app/base/HistoryTable";
import { useSearchContext } from "../../../store/context/globalSearchContext";

const SearchHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { shouldCallFunctions, canDeleteHistory, userCredits } =
    useUserCredits();
  const { showSearch } = useSearchContext();
  const { openModal } = useModal();
  const { isDarkTheme } = useContext(ThemeContext);
  const [limit] = useState(10);
  const {
    historyPaginationData,
    historyData,
    historyParams,
    loading,
    getContactData,
    selectedCheckboxIds,
    historySort,
    historyPage,
  } = useSelector((state) => state.history);
  const [showSirenaSearchParams, setShowSirenaSearchParams] = useState(false);
  const [sources, setSources] = useState(null);
  const [updateSearchName, setUpdateSearchName] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [getContactModalData, setGetContactModalData] = useState(null);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const clearState = () => {
    dispatch(accessSearchActions.clearAccessSearchState());
    navigate(location.pathname, {
      replace: true,
      search: "",
      state: undefined,
    });
  };
  const handleShowUpdateName = (values) => {
    setUpdateSearchName(values);
  };
  const handleCloseUpdateName = () => {
    setUpdateSearchName(null);
  };
  const handleShowSearchParams = async (id, type) => {
    await dispatch(getHistoryParams(id));
    if (type && type === "sirena_ticket_info") {
      setShowSirenaSearchParams(!showSirenaSearchParams);
    } else {
      showSearch();
    }
  };
  const handleHideSearchParams = () => {
    setShowSirenaSearchParams(false);
  };

  const handleDeleteHistory = (id) => {
    setIsFirstRender(true);
    dispatch(historyActions.setCheckboxId([]));
    if (Array.isArray(id)) {
      const deletedList = selectedCheckboxIds.map((item) => ({
        historyId: item,
        page: historyPage,
        limit: limit,
        sortByDate: historySort.value,
        name: searchQuery,
      }));
      openModal(deleteHistory, deletedList, {
        title: "Удаление записей",
        message: `Вы действительно хотите удалить записи(${selectedCheckboxIds?.length})?`,
        type: "delete",
      });
    } else {
      openModal(
        deleteHistory,
        {
          historyId: id,
          page: historyPage,
          limit: limit,
          sortByDate: historySort.value,
          name: searchQuery,
        },
        {
          title: "Удаление записи",
          message: "Вы действительно хотите удалить запись?",
          type: "delete",
        },
      );
    }
  };
  const handleDeleteCheckedHistory = () => {
    if (selectedCheckboxIds?.length === 1) {
      handleDeleteHistory(selectedCheckboxIds[0]);
    } else {
      handleDeleteHistory(selectedCheckboxIds);
    }
  };
  const handleGetHistorySources = (sources, id, name, searchIn) => {
    if (userCredits.anketDetail !== -1 && !shouldCallFunctions?.anketDetail) {
      return toast.error("Недостаточно кредитов для просмотра анкет", {
        description: "Обратитесь к администратору",
      });
    }
    setSources({ sources, id, name, searchIn });
  };
  const handleGetHistoryResults = (sourceId, historyId, sourceName) => {
    clearState();
    navigate(`/search/${historyId}/${sourceId}/${sourceName}`);
  };
  const handleGetInsigthResult = (sourceNameId, type, sourceName) => {
    dispatch(searchActions.clearAnketData(null));
    navigate(`/search/details/${sourceName}/${type}/${sourceNameId}`);
  };

  const handleCloseHistorySources = () => {
    setSources(null);
  };
  const fetchData = () => {
    dispatch(
      getHistoryRequests({
        limit,
        page: historyPage,
        sort: historySort.value,
        name: searchQuery,
      }),
    );
  };
  useEffect(() => {
    fetchData(); // Call the function immediately on the initial render

    let timerId;

    const handleFetchData = () => {
      clearTimeout(timerId);

      if (searchQuery.length > 3 || searchQuery === "") {
        timerId = setTimeout(
          () => {
            fetchData();
          },
          searchQuery.length > 3 ? 2000 : 1000,
        );
      }
    };

    // Effect for subsequent updates with a timer
    !isFirstRender && handleFetchData();
    setIsFirstRender(false);

    // Cleanup function to cancel the previous timer
    return () => {
      clearTimeout(timerId);
    };
  }, [historyPage, historySort, searchQuery]);

  const handleGetByName = (e) => {
    const queryStr = e.target.value?.trim();
    setSearchQuery(queryStr);
    dispatch(historyActions.changePage(1));
  };

  const inProcessItem = historyData?.find(
    (item) => item.status === "inProcess",
  );

  // const inProcessGetContact = getContactData?.find(
  //   (item) => item.status === "inProcess",
  // );

  useEffect(() => {
    // Call the function every 6 seconds
    const interval = setInterval(() => {
      setIsFirstRender(false);
      inProcessItem &&
        dispatch(
          getHistoryRequests({
            limit,
            page: historyPage,
            sort: historySort.value,
          }),
        );
    }, 6000);

    // Call the function every 1 minutes
    // const interval2 = setInterval(() => {
    //   setIsFirstRender(false);
    //   inProcessGetContact && dispatch(getHistoryGetContact());
    // }, 60000);

    return () => {
      clearInterval(interval);
      // clearInterval(interval2);
    };
  }, [historyData, getContactData]);

  const handleChangePage = (page) => {
    dispatch(historyActions.changePage(page));
  };

  function handlePrevPage() {
    dispatch(historyActions.changePage(historyPage - 1));
  }
  function handleNextPage(event) {
    dispatch(historyActions.changePage(event));
  }

  const handleShowCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    dispatch(historyActions.setCheckboxId([]));
  };
  const handleCheckbox = (e, id) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch(
        historyActions.setCheckboxId([...selectedCheckboxIds, Number(id)]),
      );
    } else {
      dispatch(
        historyActions.setCheckboxId(
          selectedCheckboxIds.filter((value) => Number(value) !== Number(id)),
        ),
      );
    }
  };
  const anketsCount = historyData?.map((a) => a.totalAnkets);
  const changeOption = (option) => {
    const selected = historySortEnums.find((opt) => opt.value === option);
    dispatch(historyActions.setHistorySort(selected));
  };
  return (
    <>
      {loading && isFirstRender && <Loader />}
      {getContactModalData && (
        <Modal
          Icon={SearchIco}
          title={`Результаты поиска GetContact`}
          subTitle={`Поиск выполнен по номеру: ${getContactModalData.input[0]}`}
          closeModal={() => setGetContactModalData(null)}
          width="1000"
        >
          <GetContactHistoryModal data={getContactModalData} />
        </Modal>
      )}
      {updateSearchName && (
        <Modal
          Icon={Edit}
          title="Название поиска"
          closeModal={handleCloseUpdateName}
        >
          <EditCreateSearchName
            defaultData={updateSearchName}
            cancel={handleCloseUpdateName}
          />
        </Modal>
      )}
      {sources && (
        <Modal
          title="Выбор базы"
          modalDesc="Выберите базу для отображения результатов"
          closeModal={handleCloseHistorySources}
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
      <Wrapper className="history_content kermit_box">
        <>
          <div className="wrapper_head">
            <div className="head_vis-l">
              <Title Tag="h2">История поиска</Title>
              {(historyData?.length > 0 || anketsCount?.length > 0) && (
                <div className="head_count_bordered">
                  {historyData?.length && (
                    <ResultCounter
                      text="Показано последних результатов:"
                      count={historyData?.length}
                    />
                  )}

                  {anketsCount?.length && (
                    <ResultCounter
                      text="Анкет найдено:"
                      count={anketsCount?.reduce((a, b) => a + b)}
                    />
                  )}
                </div>
              )}
            </div>
            {historyData?.length ? (
              <div className="head_vis-r">
                <ReactSelect
                  options={historySortEnums}
                  name="sort_search"
                  placeholder={historySort.label}
                  value={historySort.value}
                  onChange={changeOption}
                  label=""
                  type="sort"
                  styleWrapper={{
                    width: "225px",
                  }}
                />
                {canDeleteHistory && (
                  <>
                    <Button
                      func={handleShowCheckboxes}
                      text={
                        showCheckboxes && selectedCheckboxIds?.length
                          ? "Снять выделение"
                          : "Выделение"
                      }
                      mode="tretiary"
                      Icon={CheckButton}
                      className={
                        showCheckboxes && selectedCheckboxIds?.length
                          ? "btn_active"
                          : ""
                      }
                    />
                    {selectedCheckboxIds?.length ? (
                      <Button
                        mode="tretiary"
                        func={handleDeleteCheckedHistory}
                        Icon={Trash}
                        style={{
                          padding: "10px",
                        }}
                      />
                    ) : null}
                  </>
                )}
              </div>
            ) : null}
          </div>
          <div className="history_search_action">
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
          </div>
          {historyData?.length ? (
            <>
              <HistoryTable
                history={historyData}
                showCheckboxes={showCheckboxes}
                updateSearchName={handleShowUpdateName}
                showSearchParams={handleShowSearchParams}
                showFindSources={handleGetHistorySources}
                canDeleteHistory={canDeleteHistory}
                selectHistoryByCheck={handleCheckbox}
                selectedCheckboxes={selectedCheckboxIds}
                deleteHistoryFromList={handleDeleteHistory}
                isGlobalHistory
              />
              <div
                className={`pagination ${
                  isDarkTheme ? "" : "pagination_light"
                }`}
              >
                <PaginationTable
                  showLimit={false}
                  className="pagination-bar"
                  currentPage={historyPaginationData?.currentPage}
                  pageSize={historyPaginationData?.limit}
                  totalCount={historyPaginationData?.data?.length}
                  gotoPage={handleChangePage}
                  previousPage={handlePrevPage}
                  nextPage={handleNextPage}
                  totalPageCount={historyPaginationData?.totalPages}
                />
              </div>
            </>
          ) : (
            <EmptyPage
              Icon={Empty}
              title="Нет данных для отображения Начните новый поиск"
            />
          )}
        </>
      </Wrapper>
      {/*{getContactData && (*/}
      {/*  <Wrapper className="history_content">*/}
      {/*    <>*/}
      {/*      <div className="wrapper_head">*/}
      {/*        <div className="head_title">*/}
      {/*          <h3>История GetContact</h3>*/}
      {/*          <p>{getContactData?.length || "0"} последних результатов </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <List>*/}
      {/*        <ReactTooltip*/}
      {/*          id="my-tooltip"*/}
      {/*          className={`kermit_tooltip ${*/}
      {/*            isDarkTheme ? "" : "tooltip_light"*/}
      {/*          }`}*/}
      {/*          place="right"*/}
      {/*        />*/}
      {/*        <ul className="column_list">*/}
      {/*          {getContactData?.map(({ time, status, input, output }) => {*/}
      {/*            const isEmpty =*/}
      {/*              status === "completed" && output?.length === 0;*/}
      {/*            return (*/}
      {/*              <li key={uuid()}>*/}
      {/*                <div*/}
      {/*                  className="list_item_name"*/}
      {/*                  style={{*/}
      {/*                    display: "block",*/}
      {/*                    maxWidth: "120px",*/}
      {/*                    overflow: "hidden",*/}
      {/*                    textOverflow: "ellipsis",*/}
      {/*                    whiteSpace: "nowrap",*/}
      {/*                  }}*/}
      {/*                  data-tooltip-id="my-tooltip"*/}
      {/*                  data-tooltip-content={input[0]}*/}
      {/*                >*/}
      {/*                  {input[0]}*/}
      {/*                </div>*/}
      {/*                <Button*/}
      {/*                  disabled*/}
      {/*                  fill*/}
      {/*                  text={moment(time).format("YYYY-MM-DD HH:mm")}*/}
      {/*                />*/}
      {/*                {isEmpty ? (*/}
      {/*                  <Button*/}
      {/*                    style={{*/}
      {/*                      width: "225px",*/}
      {/*                    }}*/}
      {/*                    disabled={isEmpty}*/}
      {/*                    fill={isEmpty}*/}
      {/*                    className="kermit_red_btn"*/}
      {/*                    text={`Поиск не дал результатов`}*/}
      {/*                  />*/}
      {/*                ) : (*/}
      {/*                  <>*/}
      {/*                    <Button*/}
      {/*                      func={() =>*/}
      {/*                        setGetContactModalData({ output, input })*/}
      {/*                      }*/}
      {/*                      disabled={status === "inProcess"}*/}
      {/*                      style={{ width: "225px" }}*/}
      {/*                      Icon={status === "inProcess" ? null : Result}*/}
      {/*                      text={`${*/}
      {/*                        status === "inProcess"*/}
      {/*                          ? ""*/}
      {/*                          : "Показать результаты поиска"*/}
      {/*                      } `}*/}
      {/*                    >*/}
      {/*                      {status === "inProcess" ? <ButtonLoader /> : null}*/}
      {/*                    </Button>*/}
      {/*                  </>*/}
      {/*                )}*/}
      {/*              </li>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </ul>*/}
      {/*      </List>*/}
      {/*    </>*/}
      {/*  </Wrapper>*/}
      {/*)}*/}
    </>
  );
};

export default SearchHistory;
