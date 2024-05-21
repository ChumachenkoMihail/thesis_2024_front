import Wrapper from "layouts/Wrapper";
import Title from "components/app/use/Title";
import ResultCounter from "components/app/use/ResultCounter";
import ReactSelect from "components/app/input/Select";
import { historySortEnums } from "libs/Enums";
import Button from "components/app/use/Button";
import { useContext, useEffect, useState } from "react";
import {
  deleteHistoryCsv,
  getCsvHistoryParams,
  getCsvHistoryRequests,
} from "store/thunks/historyCsvThunks";
import { useDispatch, useSelector } from "react-redux";
import { historyCsvActions } from "store/historyCsvSlice";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import { ReactComponent as Clear } from "assets/images/clear_input.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as CheckButton } from "assets/images/check_button.svg";
import { ReactComponent as SearchIco } from "assets/images/search_params.svg";
import { ReactComponent as Edit } from "assets/images/pencil_edit.svg";
import { useModal } from "store/context/ModalContext";
import Field from "components/app/input/Field";
import EmptyPage from "components/app/base/EmptyPage";
import { ThemeContext } from "store/context/themeContextProvider";
import Loader from "components/app/use/Loader";
import Modal from "components/app/base/Modal";
import CsvSourcesList from "components/app/modal/CsvSourcesList";
import { historyActions } from "store/historySlice";
import { accessSearchActions } from "store/accessSearchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationTable from "components/app/base/Table/PaginationTable";
import CsvConfirmationModal from "components/app/modal/CsvConfirmationModal";
import CsvHistoryParams from "components/app/modal/CsvHistoryParams";
import { useUserCredits } from "apiHooks/useUserCredits";
import { toast } from "sonner";
import HistoryCsvTable from "components/app/base/HistoryCsvTable";

const CsvHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);
  const { openModal } = useModal();
  const [limit] = useState(10);
  const { shouldCallFunctions, canDeleteHistory, userCredits } =
    useUserCredits();
  const {
    loading,
    historyData,
    historyPage,
    selectedCheckboxIds,
    historySort,
    historyCsvPaginationData,
    historyCsvParams,
  } = useSelector((state) => state.historyCsv);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [updateSearchName, setUpdateSearchName] = useState(null);
  const [showSearchParams, setShowSearchParams] = useState(false);
  const [sources, setSources] = useState(null);
  const fetchData = () => {
    dispatch(
      getCsvHistoryRequests({
        limit: limit,
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
  const inProcessItem = historyData?.find(
    (item) => item.status === "inProcess",
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstRender(false);
      inProcessItem && fetchData();
    }, 6000);
    return () => {
      clearInterval(interval);
      // clearInterval(interval2);
    };
  }, [historyData]);
  const changeOption = (option) => {
    const selected = historySortEnums.find((opt) => opt.value === option);
    dispatch(historyCsvActions.setCsvHistorySort(selected));
  };

  const handleShowCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    dispatch(historyCsvActions.setCheckboxId([]));
  };
  const handleCheckbox = (e, id) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch(
        historyCsvActions.setCheckboxId([...selectedCheckboxIds, Number(id)]),
      );
    } else {
      dispatch(
        historyCsvActions.setCheckboxId(
          selectedCheckboxIds.filter((value) => Number(value) !== Number(id)),
        ),
      );
    }
  };
  const handleDeleteHistory = (id) => {
    setIsFirstRender(true);
    dispatch(historyCsvActions.setCheckboxId([]));
    openModal(
      deleteHistoryCsv,
      { historyId: id, page: historyPage, limit: limit },
      {
        title: "Удаление записи",
        message: "Вы действительно хотите удалить запись?",
        type: "delete",
      },
    );
  };
  const handleDeleteCheckedHistory = () => {
    if (selectedCheckboxIds?.length === 1) {
      handleDeleteHistory(selectedCheckboxIds[0]);
    } else {
      const deletedList = selectedCheckboxIds.map((item) => ({
        historyId: item,
        page: historyPage,
        limit: limit,
      }));
      openModal(deleteHistoryCsv, deletedList, {
        title: "Удаление записей",
        message: `Вы действительно хотите удалить записи(${selectedCheckboxIds?.length})?`,
        type: "delete",
      });
    }
  };
  const handleGetByName = (e) => {
    const queryStr = e.target.value?.trim();
    setSearchQuery(queryStr);
  };

  const anketsCount = historyData?.flatMap((a) =>
    a?.sources?.flatMap((b) => b?.result?.map((c) => c?.totalAnkets)),
  );
  const handleGetHistorySources = (sources, id, name) => {
    if (userCredits.anketDetail !== -1 && !shouldCallFunctions?.anketDetail) {
      return toast.error("Недостаточно кредитов для просмотра анкет", {
        description: "Обратитесь к администратору",
      });
    }
    setSources({ sources, id, name });
  };
  const handleCloseHistorySources = () => {
    setSources(null);
  };
  const clearState = () => {
    dispatch(accessSearchActions.clearAccessSearchState());
    navigate(location.pathname, {
      replace: true,
      search: "",
      state: undefined,
    });
  };
  const handleGetHistoryResults = (
    sourceId,
    historyId,
    sourceName,
    paramsId,
  ) => {
    clearState();
    navigate(`/search/${historyId}/${sourceId}/${sourceName}/${paramsId}`);
  };
  const handleChangePage = (page) => {
    dispatch(historyCsvActions.setHistoryPage(page));
  };

  function handlePrevPage() {
    dispatch(historyCsvActions.setHistoryPage(historyPage - 1));
  }
  function handleNextPage(event) {
    dispatch(historyCsvActions.setHistoryPage(event));
  }

  const handleShowUpdateName = (values) => {
    setUpdateSearchName(values);
  };
  const handleCloseUpdateName = () => {
    setUpdateSearchName(null);
  };

  const handleShowSearchParams = async (id) => {
    await dispatch(getCsvHistoryParams(id)).then((data) => {
      data?.payload?.searchParams && setShowSearchParams(!showSearchParams);
    });
  };
  const handleHideSearchParams = () => {
    setShowSearchParams(false);
  };
  return (
    <>
      {loading && isFirstRender && <Loader />}
      {showSearchParams && historyCsvParams && (
        <Modal
          width="1308"
          Icon={SearchIco}
          title={`Параметры поиска ${
            historyCsvParams?.searchParams?.name ||
            historyCsvParams?.searchParams?.input?.name
          }`}
          closeModal={handleHideSearchParams}
        >
          <CsvHistoryParams
            selectedParams={historyCsvParams?.searchParams?.input?.searchFields}
            cancel={handleHideSearchParams}
          />
        </Modal>
      )}
      {updateSearchName && (
        <Modal
          Icon={Edit}
          closeModal={handleCloseUpdateName}
          title="Название поиска"
        >
          <CsvConfirmationModal
            defaultData={updateSearchName}
            cancel={handleCloseUpdateName}
          />
        </Modal>
      )}

      {sources && (
        <Modal
          width="600"
          title="Результаты поиска"
          modalDesc="Выберите базу для отображения результатов"
          Icon={DataBase}
          closeModal={handleCloseHistorySources}
        >
          <CsvSourcesList
            getResults={handleGetHistoryResults}
            allSource={sources}
          />
        </Modal>
      )}
      <Wrapper className="history_content kermit_box">
        <>
          <div className="wrapper_head">
            <div className="head_vis-l">
              <Title Tag="h2">История CSV поисков</Title>
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
              <HistoryCsvTable
                history={historyData}
                showCheckboxes={showCheckboxes}
                selectedHistory={selectedCheckboxIds}
                selectHistoryByCheck={handleCheckbox}
                canDeleteHistory={canDeleteHistory}
                deleteHistoryFromList={handleDeleteHistory}
                updateSearchName={handleShowUpdateName}
                showSearchParams={handleShowSearchParams}
                showFindSources={handleGetHistorySources}
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
                  currentPage={historyCsvPaginationData?.currentPage}
                  pageSize={historyCsvPaginationData?.limit}
                  totalCount={historyCsvPaginationData?.data?.length}
                  gotoPage={handleChangePage}
                  previousPage={handlePrevPage}
                  nextPage={handleNextPage}
                  totalPageCount={historyCsvPaginationData?.totalPages}
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
    </>
  );
};

export default CsvHistory;
