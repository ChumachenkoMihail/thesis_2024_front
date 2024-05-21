import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import {
  getApiCallRequests,
  getApiCallRecording,
  deleteApiCall,
} from "store/thunks/apiCallThunk";
import { apiCallActions } from "store/apiCallSlice";
import { useModal } from "store/context/ModalContext";
import { ThemeContext } from "store/context/themeContextProvider";
import Wrapper from "layouts/Wrapper";
import Title from "components/app/use/Title";
import Button from "components/app/use/Button";
import ResultCounter from "components/app/use/ResultCounter";
import Loader from "components/app/use/Loader";
import Modal from "components/app/base/Modal";
import CheckBox from "components/app/input/CheckBox";
import SearchTable from "components/app/base/SearchTable";
import EmptyPage from "components/app/base/EmptyPage";
import PaginationTable from "components/app/base/Table/PaginationTable";
import { ReactComponent as CheckButton } from "assets/images/check_button.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";
import { ReactComponent as NoResult } from "assets/images/no_result.svg";
import { ReactComponent as Result } from "assets/images/result.svg";
import { ReactComponent as Alert } from "assets/images/alert.svg";
import { ReactComponent as Spinner } from "assets/images/spinner.svg";
import ApiCallInfo from "components/app/modal/ApiCallInfo";
import { useUserCredits } from "apiHooks/useUserCredits";
import { callApiEnums } from "../../../libs/Enums";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";

const CallHistory = () => {
  const dispatch = useDispatch();
  const { canDeleteHistory } = useUserCredits();
  const { isDarkTheme } = useContext(ThemeContext);
  const { openModal } = useModal();
  const [limit] = useState(10);
  const {
    loading,
    historyData,
    historyPage,
    selectedCheckboxIds,
    historyCallPaginationData,
    callRecordingData,
  } = useSelector((state) => state.apiCall);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [recording, setRecording] = useState({
    show: false,
    name: "",
  });
  const openRecordingModal = async (historyId, name) => {
    const result = await dispatch(getApiCallRecording(historyId));
    if (result.payload) {
      setRecording({
        show: true,
        name: name,
      });
    }
  };
  const closeRecordingModal = () => {
    setRecording({});
  };

  const fetchData = () => {
    dispatch(
      getApiCallRequests({
        limit: limit,
        page: historyPage,
      }),
    );
  };
  useEffect(() => {
    fetchData();
  }, [historyPage]);
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
    };
  }, [historyData]);

  const handleShowCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    dispatch(apiCallActions.setCheckboxId([]));
  };

  const handleCheckbox = (e, id) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch(
        apiCallActions.setCheckboxId([...selectedCheckboxIds, Number(id)]),
      );
    } else {
      dispatch(
        apiCallActions.setCheckboxId(
          selectedCheckboxIds.filter((value) => Number(value) !== Number(id)),
        ),
      );
    }
  };

  const handleDeleteHistory = (id) => {
    setIsFirstRender(true);
    dispatch(apiCallActions.setCheckboxId([]));
    openModal(
      deleteApiCall,
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
      openModal(deleteApiCall, deletedList, {
        title: "Удаление записей",
        message: `Вы действительно хотите удалить записи(${selectedCheckboxIds?.length})?`,
        type: "delete",
      });
    }
  };

  const handleChangePage = (page) => {
    dispatch(apiCallActions.setHistoryPage(page));
  };

  function handlePrevPage() {
    dispatch(apiCallActions.setHistoryPage(historyPage - 1));
  }
  function handleNextPage(event) {
    dispatch(apiCallActions.setHistoryPage(event));
  }

  return (
    <>
      {loading && isFirstRender && <Loader />}

      {recording?.show && (
        <Modal
          width="600"
          title="Запись звонка"
          closeModal={closeRecordingModal}
        >
          <ApiCallInfo
            downloadName={recording?.name}
            data={callRecordingData}
          />
        </Modal>
      )}
      <Wrapper className="history_content kermit_box">
        <>
          <div className="wrapper_head">
            <div className="head_vis-l">
              <Title Tag="h2">История звонков</Title>
              {historyData?.length > 0 && (
                <div className="head_count_bordered">
                  <ResultCounter
                    text="Показано последних результатов:"
                    count={historyData?.length}
                  />
                </div>
              )}
            </div>
            {historyData?.length ? (
              <div className="head_vis-r">
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

          {historyData?.length ? (
            <>
              <div>
                <ReactTooltip
                  id="status-text"
                  className={`kermit_tooltip ${
                    isDarkTheme ? "" : "tooltip_light"
                  }`}
                  place="left"
                />
                <SearchTable>
                  {historyData?.map(
                    ({
                      time,
                      status,
                      id,
                      phone,
                      callDuration,
                      callSize,
                      error,
                    }) => {
                      const isEmpty = status === "completed" && !callDuration;
                      const isFailure =
                        status !== "in_process" && status !== "compl_finished";
                      return (
                        <tr key={uuid()}>
                          {showCheckboxes && (
                            <td className="table_cell_check">
                              <div className="table_col">
                                <div className="table_col_check">
                                  <CheckBox
                                    onChange={(e) => handleCheckbox(e, id)}
                                    name={id}
                                    checked={selectedCheckboxIds?.find(
                                      (e) => e === id,
                                    )}
                                  />
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="table_cell_hover">
                            <div className="table_col">
                              <div className="table_col_flex table_col_name">
                                <span className="table_col_label">
                                  Номер телефона
                                </span>
                                <div className="table_col_value">{phone}</div>
                              </div>
                            </div>
                          </td>

                          <td
                            className="table_cell_date"
                            style={{ width: "186px" }}
                          >
                            <div className="table_col">
                              <div className="table_col_flex table_col_date">
                                <span className="table_col_label">
                                  Продолжительность
                                </span>
                                <span className="table_col_value">
                                  {callDuration?.toString()
                                    ? `${callDuration} секунд`
                                    : "-"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="table_cell_date">
                            <div className="table_col">
                              <div className="table_col_flex table_col_date">
                                <span className="table_col_label">
                                  Размер файла
                                </span>
                                <span className="table_col_value">
                                  {callSize ? `${callSize} Kb` : "-"}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="table_cell_date">
                            <div className="table_col">
                              <div className="table_col_flex table_col_date">
                                <span className="table_col_label">
                                  Дата записи
                                </span>
                                <span className="table_col_value">
                                  {moment(time).format("YYYY-MM-DD, HH:mm")}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="table_cell_buttons">
                            <div className="table_col_buttons">
                              {isEmpty ? (
                                <Button
                                  mode="transparent"
                                  disabled={isEmpty}
                                  fill={isEmpty}
                                  text="Нет результата"
                                  Icon={NoResult}
                                />
                              ) : (
                                <>
                                  {isFailure ? (
                                    <Button
                                      Icon={Alert}
                                      mode="transparent"
                                      text="Не дозвонились"
                                    >
                                      <span
                                        data-tooltip-id="status-text"
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                          <div>{callApiEnums[status]}</div>,
                                        )}
                                        style={{
                                          color: "red",
                                          fontSize: "18px",
                                          cursor: "help",
                                        }}
                                      >
                                        ?
                                      </span>
                                    </Button>
                                  ) : (
                                    <Button
                                      mode="tretiary"
                                      style={{
                                        pointerEvents:
                                          status === "in_process"
                                            ? "none"
                                            : "auto",
                                      }}
                                      func={() => openRecordingModal(id, phone)}
                                      Icon={
                                        status === "in_process"
                                          ? Spinner
                                          : Result
                                      }
                                      text={`${
                                        status === "in_process"
                                          ? "Звонок в  процессе"
                                          : "Результаты записи"
                                      } `}
                                    />
                                  )}
                                </>
                              )}
                              {canDeleteHistory && (
                                <Button
                                  style={{
                                    padding: "10px 8px",
                                  }}
                                  mode="tretiary"
                                  Icon={Trash}
                                  func={() => handleDeleteHistory(id)}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </SearchTable>
              </div>
              <div
                className={`pagination ${
                  isDarkTheme ? "" : "pagination_light"
                }`}
              >
                <PaginationTable
                  showLimit={false}
                  className="pagination-bar"
                  currentPage={historyCallPaginationData?.currentPage}
                  pageSize={historyCallPaginationData?.limit}
                  totalCount={historyCallPaginationData?.data?.length}
                  gotoPage={handleChangePage}
                  previousPage={handlePrevPage}
                  nextPage={handleNextPage}
                  totalPageCount={historyCallPaginationData?.totalPages}
                />
              </div>
            </>
          ) : (
            <EmptyPage
              Icon={Empty}
              title="Нет данных для отображения. Сделайте новую запись звонка"
            />
          )}
        </>
      </Wrapper>
    </>
  );
};

export default CallHistory;
