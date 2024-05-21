import SearchTable from "../SearchTable";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { v4 as uuid } from "uuid";
import CheckBox from "components/app/input/CheckBox";
import moment from "moment/moment";
import Button from "components/app/use/Button";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Result } from "assets/images/result.svg";
import { ReactComponent as NoResult } from "assets/images/no_result.svg";
import { ReactComponent as Alert } from "assets/images/alert.svg";
import { ReactComponent as Spinner } from "assets/images/spinner.svg";
import { ReactComponent as SearchIco } from "assets/images/search_params.svg";
import { ReactComponent as Edit } from "assets/images/pencil_edit.svg";
import { ReactComponent as Telegram } from "assets/images/telegram.svg";

const HistoryTable = ({
  history,
  showCheckboxes = false,
  updateSearchName,
  showSearchParams,
  showFindSources,
  canDeleteHistory = false,
  selectHistoryByCheck,
  selectedCheckboxes,
  deleteHistoryFromList,
  isGlobalHistory = false,
  isInsightHistory = false,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div>
      <SearchTable>
        <ReactTooltip
          id="history-name-tooltip"
          className={`kermit_tooltip ${isDarkTheme ? "" : "tooltip_light"}`}
          place="right"
        />
        {history?.map(
          ({
            date,
            time,
            status,
            id,
            totalAnkets,
            sources,
            name,
            error,
            searchIn,
            isDeleted,
            data,
          }) => {
            const emptyGlobalHistory =
              status === "completed" && totalAnkets === 0;
            const emptyInUserProfile = !data?.[0]?.sources?.length;
            const emptyInsight = status === "failed";
            const isEmpty = isInsightHistory
              ? emptyInsight
              : isGlobalHistory
              ? emptyGlobalHistory
              : emptyInUserProfile;
            const isFailure = !isInsightHistory && status === "failed";
            return (
              <tr key={uuid()}>
                {showCheckboxes && (
                  <td className="table_cell_check">
                    <div className="table_col">
                      <div className="table_col_check">
                        <CheckBox
                          onChange={(e) => selectHistoryByCheck(e, id)}
                          name={id}
                          checked={selectedCheckboxes?.find((e) => e === id)}
                        />
                      </div>
                    </div>
                  </td>
                )}
                <td className="table_cell_hover">
                  <div className="table_col">
                    <div
                      className="table_col_flex table_col_name"
                      data-tooltip-id="history-name-tooltip"
                      data-tooltip-content={name}
                    >
                      <span className="table_col_label">Имя поиска</span>
                      <div className="table_col_value">
                        {searchIn === "insight" ? (
                          <>
                            {name?.split("|")[1]}
                            <Telegram height="20px" width="20px" />
                          </>
                        ) : (
                          name
                        )}
                      </div>
                    </div>
                    {isGlobalHistory && !isInsightHistory && (
                      <div className="table_col_edit">
                        <div
                          className="table_col_icon"
                          onClick={() =>
                            updateSearchName({
                              historyId: id,
                              name,
                            })
                          }
                        >
                          <Edit />
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="table_cell_date">
                  <div className="table_col">
                    <div className="table_col_flex table_col_date">
                      <span className="table_col_label">Дата поиска</span>
                      <span className="table_col_value">
                        {moment(date || time).format("YYYY-MM-DD, HH:mm")}
                      </span>
                    </div>
                  </div>
                </td>
                {!isGlobalHistory && (
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Cтатус</span>
                        <span
                          className="table_col_value"
                          style={{
                            color: isDeleted ? "red" : "",
                          }}
                        >
                          {isDeleted ? "Удален" : "Активный"}
                        </span>
                      </div>
                    </div>
                  </td>
                )}

                <td className="table_cell_buttons">
                  <div className="table_col_buttons">
                    <Button
                      Icon={SearchIco}
                      mode="tretiary"
                      text="Параметры поиска"
                      func={() => showSearchParams(id, searchIn)}
                    />
                    {isEmpty ? (
                      <Button
                        mode="transparent"
                        style={{
                          width: "190px",
                        }}
                        disabled={isEmpty}
                        fill={isEmpty}
                        text={`Нет результатов`}
                        Icon={NoResult}
                      />
                    ) : (
                      <>
                        {isFailure ? (
                          <Button
                            Icon={Alert}
                            mode="transparent"
                            text={error?.message || "Ошибка поиска"}
                          />
                        ) : (
                          <Button
                            mode="tretiary"
                            style={{
                              pointerEvents:
                                status === "inProcess" ? "none" : "auto",
                            }}
                            func={() =>
                              showFindSources(sources, id, name, searchIn)
                            }
                            Icon={status === "inProcess" ? Spinner : Result}
                            text={`${
                              status === "inProcess"
                                ? "Поиск в процессе"
                                : "Результаты поиска"
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
                        func={() => deleteHistoryFromList(id)}
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
  );
};

export default HistoryTable;
