import SearchTable from "components/app/base/SearchTable";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as Result } from "assets/images/result.svg";
import { ReactComponent as SearchIco } from "assets/images/search_params.svg";

import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Button from "components/app/use/Button";
import ReactDOMServer from "react-dom/server";

const GeneralLogs = ({
  logs,
  showSearchParams,
  showFindSources,
  showCsvSearchParams,
  showFindCsvSources,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div>
      <ReactTooltip
        id="history-name-tooltip"
        className={`kermit_tooltip ${isDarkTheme ? "" : "tooltip_light"}`}
        place="top"
      />
      <ReactTooltip
        id="my-tooltip-data-html"
        className="kermit_image_tooltip"
        place="right"
        style={{ width: "350px", height: "300px" }}
      />
      <SearchTable>
        {logs.map(
          ({ data, name, date, type, status, searchIn, id, isDeleted }) => {
            if (type === "search") {
              return (
                <tr key={uuid()}>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Дата поиска</span>
                        <span className="table_col_value">
                          {moment.utc(date).format("YYYY-MM-DD, HH:mm")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date" width="350">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Тип действия</span>
                        <span
                          className="table_col_value"
                          style={{
                            width: "350px",
                            whiteSpace: "break-spaces",

                            display: "block",
                          }}
                          data-tooltip-id="history-name-tooltip"
                          data-tooltip-content={name}
                        >
                          Поиск - ( {name} )
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex">
                        <span className="table_col_label">Статус поиска</span>
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
                  <td className="table_cell_buttons" width="280px">
                    <div className="table_col_buttons">
                      <Button
                        Icon={SearchIco}
                        mode="tretiary"
                        text="Параметры"
                        func={() => showSearchParams(id, searchIn)}
                      />
                      <Button
                        mode="tretiary"
                        style={{
                          pointerEvents:
                            status === "inProcess" ? "none" : "auto",
                        }}
                        func={() => showFindSources(null, id, name, searchIn)}
                        Icon={Result}
                        text={`Результаты`}
                      />
                    </div>
                  </td>
                </tr>
              );
            }
            if (type === "api") {
              return (
                <tr key={uuid()}>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Дата поиска</span>
                        <span className="table_col_value">
                          {moment.utc(date).format("YYYY-MM-DD, HH:mm")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">API</span>
                        <span
                          className="table_col_value"
                          data-tooltip-id="history-name-tooltip"
                          data-tooltip-content={name}
                        >
                          {name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date">
                    {data?.inputPhoto ? (
                      <div className="table_col">
                        <div className="table_col_flex table_col_date">
                          <span className="table_col_label">Фото</span>
                          <span className="table_col_value">
                            <img
                              width={50}
                              height={40}
                              style={{
                                objectFit: "contain",
                              }}
                              data-tooltip-id="my-tooltip-data-html"
                              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                <img
                                  src={`data:image/png;base64,${data.inputPhoto}`}
                                  alt="Your Image"
                                />,
                              )}
                              src={`data:image/png;base64,${data.inputPhoto}`}
                            />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="table_cell_buttons"></td>
                </tr>
              );
            }
            if (type === "admin") {
              return (
                <tr key={uuid()}>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Дата поиска</span>
                        <span className="table_col_value">
                          {moment.utc(date).format("YYYY-MM-DD, HH:mm")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Аdmin</span>
                        <span
                          className="table_col_value"
                          data-tooltip-id="history-name-tooltip"
                          data-tooltip-content={name}
                          style={{
                            width: "350px",
                            display: "block",
                            whiteSpace: "break-spaces",
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date"></td>
                  <td className="table_cell_buttons"></td>
                </tr>
              );
            }
            if (type === "bulkSearch") {
              return (
                <tr>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Дата поиска</span>
                        <span className="table_col_value">
                          {moment.utc(date).format("YYYY-MM-DD, HH:mm")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Тип действия</span>
                        <span
                          className="table_col_value"
                          style={{
                            width: "350px",
                            display: "block",
                            whiteSpace: "break-spaces",
                          }}
                          data-tooltip-id="history-name-tooltip"
                          data-tooltip-content={"CSV поиск"}
                        >
                          CSV поиск
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date"></td>
                  <td className="table_cell_buttons">
                    <div
                      className="table_col"
                      style={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <div className="table_col_buttons">
                        <Button
                          Icon={SearchIco}
                          mode="tretiary"
                          text="Параметры CSV"
                          func={() => showCsvSearchParams(id, searchIn)}
                        />
                        <Button
                          mode="tretiary"
                          style={{
                            pointerEvents:
                              status === "inProcess" ? "none" : "auto",
                          }}
                          func={() =>
                            showFindCsvSources(null, id, name, searchIn)
                          }
                          Icon={Result}
                          text={`Результаты CSV`}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={uuid()}>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Дата поиска</span>
                        <span className="table_col_value">
                          {moment.utc(date).format("YYYY-MM-DD, HH:mm")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date">
                    <div className="table_col">
                      <div className="table_col_flex table_col_date">
                        <span className="table_col_label">Тип действия</span>
                        <span
                          className="table_col_value"
                          style={{
                            width: "350px",
                            whiteSpace: "break-spaces",
                            display: "block",
                          }}
                          data-tooltip-id="history-name-tooltip"
                          data-tooltip-content={name}
                        >
                          {name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="table_cell_date">
                    {data && (
                      <div className="table_col">
                        <div className="table_col_flex table_col_date">
                          <span className="table_col_label">Анкеты</span>
                          {data.map(({ anketId, sourceId, sourceNameId }) => {
                            return (
                              <div
                                className="table_col_value"
                                style={{
                                  textDecoration: "underline",
                                }}
                              >
                                <Link
                                  to={`/search/details/${anketId}/${sourceId}/${sourceNameId}`}
                                >
                                  Анкета - {sourceNameId?.toUpperCase() || ""}/
                                  {anketId}/{sourceId}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="table_cell_buttons"></td>
                </tr>
              );
            }
          },
        )}
      </SearchTable>
    </div>
  );
};

export default GeneralLogs;
