import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Wrapper from "layouts/Wrapper";
import {
  deleteInsightHistory,
  getInsightHistory,
} from "store/thunks/historyInsightThunks";
import { historyInsightActions } from "store/historyInsightSlice";
import { historySortEnums } from "libs/Enums";
import { ReactComponent as CheckButton } from "assets/images/check_button.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import HistoryTable from "components/app/base/HistoryTable";
import Modal from "components/app/base/Modal";
import HistorySources from "components/app/modal/HistorySources";
import PaginationTable from "components/app/base/Table/PaginationTable";
import EmptyPage from "components/app/base/EmptyPage";
import Loader from "components/app/use/Loader";
import Title from "components/app/use/Title";
import ReactSelect from "components/app/input/Select";
import ResultCounter from "components/app/use/ResultCounter";
import Button from "components/app/use/Button";
import { useUserCredits } from "apiHooks/useUserCredits";
import { useSearchContext } from "store/context/globalSearchContext";
import { searchActions } from "store/searchSlice";
import { ThemeContext } from "store/context/themeContextProvider";
import { useModal } from "store/context/ModalContext";
import { historyActions } from "store/historySlice";

const InsightHistory = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);

  const [limit] = useState(10);
  const dispatch = useDispatch();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [sources, setSources] = useState(null);
  const { openModal } = useModal();

  const { showSearch } = useSearchContext();

  const {
    insightHistory,
    pagination,
    loading,
    page,
    sortBy,
    selectedCheckboxIds,
  } = useSelector((state) => state.historyInsight);

  const { shouldCallFunctions, canDeleteHistory, userCredits } =
    useUserCredits();

  useEffect(() => {
    dispatch(
      getInsightHistory({
        page: page,
        limit: limit,
        sort: sortBy.value,
      }),
    );
  }, [page, sortBy]);

  const handleChangePage = (page) => {
    dispatch(historyInsightActions.changePage(page));
  };

  function handlePrevPage() {
    dispatch(historyInsightActions.changePage(page - 1));
  }

  function handleNextPage(event) {
    dispatch(historyInsightActions.changePage(event));
  }

  const changeOption = (option) => {
    const selected = historySortEnums.find((opt) => opt.value === option);
    dispatch(historyInsightActions.setHistorySort(selected));
  };

  const handleDeleteHistory = (id) => {
    // setIsFirstRender(true);
    dispatch(historyInsightActions.setCheckboxId([]));
    if (Array.isArray(id)) {
      const deletedList = selectedCheckboxIds.map((item) => ({
        historyId: item,
        page: page,
        limit: limit,
      }));
      openModal(deleteInsightHistory, deletedList, {
        title: "Удаление записей",
        message: `Вы действительно хотите удалить записи(${selectedCheckboxIds?.length})?`,
        type: "delete",
      });
    } else {
      openModal(
        deleteInsightHistory,
        { historyId: id, page: page, limit: limit },
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

  const handleShowCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    dispatch(historyInsightActions.setCheckboxId([]));
  };

  const handleCheckbox = (e, id) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch(
        historyInsightActions.setCheckboxId([
          ...selectedCheckboxIds,
          Number(id),
        ]),
      );
    } else {
      dispatch(
        historyInsightActions.setCheckboxId(
          selectedCheckboxIds.filter((value) => Number(value) !== Number(id)),
        ),
      );
    }
  };
  const handleShowSearchParams = async (id) => {
    const selectedHistory = insightHistory.find(
      (obj) => obj.id === id,
    )?.inputForFront;
    await dispatch(
      historyActions.setHistoryParams({
        searchParams: {
          input: {
            ...selectedHistory,
          },
        },
      }),
    );
    showSearch();
  };

  const handleGetHistorySources = (sources, id, name, searchIn) => {
    if (userCredits.anketDetail !== -1 && !shouldCallFunctions?.anketDetail) {
      return toast.error("Недостаточно кредитов для просмотра анкет", {
        description: "Обратитесь к администратору",
      });
    }
    setSources({ sources, id, name, searchIn });
  };

  const anketsCount = insightHistory
    ?.flatMap((a) => a?.resultForFront)
    .map((b) => b?.totalAnkets);
  const handleGetInsigthResult = (sourceNameId, type, id) => {
    dispatch(searchActions.clearAnketData(null));
    navigate(`/search/details/${id}/${type}/${sourceNameId}`);
  };
  return (
    <>
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
            // getResults={handleGetHistoryResults}
            getInsightResult={handleGetInsigthResult}
          />
        </Modal>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Wrapper className="history_content kermit_box">
          <>
            <div className="wrapper_head">
              <div className="head_vis-l">
                <Title Tag="h2">История Insight</Title>
                {(insightHistory?.length > 0 || anketsCount?.length > 0) && (
                  <div className="head_count_bordered">
                    {insightHistory?.length && (
                      <ResultCounter
                        text="Показано последних результатов:"
                        count={insightHistory?.length}
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
              {insightHistory?.length ? (
                <div className="head_vis-r">
                  <ReactSelect
                    options={historySortEnums}
                    name="sort_search"
                    placeholder={sortBy.label}
                    value={sortBy.value}
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
            {insightHistory?.length ? (
              <>
                <HistoryTable
                  history={insightHistory}
                  showCheckboxes={showCheckboxes}
                  // updateSearchName={handleShowUpdateName}
                  showSearchParams={handleShowSearchParams}
                  showFindSources={handleGetHistorySources}
                  canDeleteHistory={canDeleteHistory}
                  selectHistoryByCheck={handleCheckbox}
                  selectedCheckboxes={selectedCheckboxIds}
                  deleteHistoryFromList={handleDeleteHistory}
                  isGlobalHistory
                  isInsightHistory
                />
                <div
                  className={`pagination ${
                    isDarkTheme ? "" : "pagination_light"
                  }`}
                >
                  <PaginationTable
                    showLimit={false}
                    className="pagination-bar"
                    currentPage={pagination?.currentPage}
                    pageSize={pagination?.limit}
                    totalCount={pagination?.data?.length}
                    gotoPage={handleChangePage}
                    previousPage={handlePrevPage}
                    nextPage={handleNextPage}
                    totalPageCount={pagination?.totalPages}
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
      )}
    </>
  );
};

export default InsightHistory;
