import React, { useContext, useId } from "react";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { ThemeContext } from "store/context/themeContextProvider";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import Title from "components/app/use/Title";

const TableSirenaTrains = ({ data }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const cardsSirenaTrains = useId();

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Сирена Поезда</Title>
      </div>
      <div
        className="accordion_table_expandwrapper"
        style={{
          borderRadius: "16px",
          padding: "24px 16px",
          background: isDarkTheme
            ? "#2C323B"
            : "linear-gradient(180deg, #f6f8fa 0%, rgba(246, 248, 250, 0.5) 100%)",
        }}
      >
        <ExpandCards>
          <div className="accordion_table">
            {data?.map(
              (
                {
                  ticket,
                  regnum,
                  lastname,
                  firstname,
                  patronymic,
                  phone,
                  port_from,
                  port_to,
                  tkt_date,
                  pass_doc,
                  seat,
                  seat_tier,
                  passengers,
                },
                trainIndex,
              ) => {
                const trainId = `${cardsSirenaTrains}.sirenaTrain${trainIndex}`;

                return (
                  <>
                    <div className="expand_cards_row expand_cards_colored_row">
                      <div
                        style={{
                          gridTemplateColumns:
                            "repeat(2, minmax(495px, 500px))",
                        }}
                      >
                        <ExpandCard
                          key={uuid()}
                          id={`${cardsSirenaTrains}.sirenaTrain[${trainIndex}]`}
                          title={`Номер брони: ${regnum}`}
                          subId={trainId}
                          subTitleShow="дополнительные данные"
                        >
                          <>
                            <div>
                              <div className="expand_content_title">ФИО</div>
                              <p>
                                {`${lastname || "-"} ${firstname || "-"} ${
                                  patronymic || "-"
                                }`}
                              </p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Телефон
                              </div>
                              {phone || "-"}
                            </div>
                          </>
                          <>
                            <div>
                              <div className="expand_content_title">
                                Номер билета
                              </div>
                              <p>{ticket || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Станция отправления
                              </div>
                              <p>{port_from || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Дата отправления
                              </div>
                              <p>
                                {moment
                                  .utc(tkt_date)
                                  .format("YYYY-MM-DD HH:mm:ss") || "-"}
                              </p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Станция прибытия
                              </div>
                              <p>{port_to || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Документ
                              </div>
                              <p>{pass_doc || "-"}</p>
                            </div>
                          </>
                          <>
                            <div className="details_div">
                              <div className="details_label">Место</div>
                              <p>{seat || "-"}</p>
                            </div>
                            <div className="details_div">
                              <div className="details_label">Уровень места</div>
                              <p>{seat_tier || "-"}</p>
                            </div>
                          </>
                        </ExpandCard>
                      </div>
                    </div>

                    {passengers ? (
                      <>
                        <ExpandCards>
                          <Title Tag="h3">{`Попутчики: ${regnum}`}</Title>
                          <div
                            className="expand_cards_row expand_cards_colored_row"
                            style={{ margin: "15px 0 0 0" }}
                          >
                            {passengers?.map(
                              (
                                {
                                  firstname,
                                  patronymic,
                                  phone,
                                  ticket,
                                  port_from,
                                  port_to,
                                  pass_doc,
                                  tkt_date,
                                  seat,
                                  seat_tier,
                                },
                                passengerTrainIndex,
                              ) => {
                                const passengerTrainId = `${cardsSirenaTrains}.passengers${passengerTrainIndex}`;

                                return (
                                  <ExpandCard
                                    key={uuid()}
                                    id={`${cardsSirenaTrains}.passengers[${passengerTrainIndex}]`}
                                    subId={passengerTrainId}
                                    subTitleShow="дополнительные данные"
                                  >
                                    <>
                                      <div>
                                        <div className="expand_content_title">
                                          ФИО
                                        </div>
                                        <p>{`${lastname || "-"} ${
                                          firstname || "-"
                                        } ${patronymic || "-"}`}</p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Телефон
                                        </div>
                                        {phone || "-"}
                                      </div>
                                    </>
                                    <>
                                      <div>
                                        <div className="expand_content_title">
                                          Номер билета
                                        </div>
                                        <p>{ticket || "-"}</p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Станция отправления
                                        </div>
                                        <p>{port_from || "-"}</p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Дата отправления
                                        </div>
                                        <p>
                                          {moment
                                            .utc(tkt_date)
                                            .format("YYYY-MM-DD HH:mm:ss") ||
                                            "-"}
                                        </p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Станция прибытия
                                        </div>
                                        <p>{port_to || "-"}</p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Документ
                                        </div>
                                        <p>{pass_doc || "-"}</p>
                                      </div>
                                    </>
                                    <>
                                      <div className="details_div">
                                        <div className="details_label">
                                          Место
                                        </div>
                                        <p>{seat || "-"}</p>
                                      </div>
                                      <div className="details_div">
                                        <div className="details_label">
                                          Уровень места
                                        </div>
                                        <p>{seat_tier || "-"}</p>
                                      </div>
                                    </>
                                  </ExpandCard>
                                );
                              },
                            )}
                          </div>
                        </ExpandCards>
                      </>
                    ) : null}
                  </>
                );
              },
            )}
          </div>
        </ExpandCards>
      </div>
    </div>
  );
};

export default TableSirenaTrains;
