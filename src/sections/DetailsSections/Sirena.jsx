import React, { memo, useContext, useEffect, useId } from "react";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import Button from "components/app/use/Button";
import Title from "components/app/use/Title";
import HtmlExportTable from "components/app/base/Table/HtmlExportTable";
import { ReactComponent as Sirenalogo } from "assets/images/sources/Database_Avia.svg";
import { ReactComponent as SirenaTrain } from "assets/images/sources/sirena_train.svg";
import { ReactComponent as SirenaInsurance } from "assets/images/sources/insurance.svg";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import { generateSirenaColumn } from "libs/generatedСolumns/generateSirenaColumn";
import { getTickets } from "store/thunks/searchThunks";
import { useDispatch } from "react-redux";
import { ThemeContext } from "store/context/themeContextProvider";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import { createColumns } from "libs/generatedСolumns/generateColumnWithSort";

const Sirena = ({
  dataPassenger,
  dataTrainTickets,
  dataInsurance,
  dataTickets,
  getAllPassengers,
  allTicketsIds,
}) => {
  const cardsSirenaPassanger = useId();
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);

  const handleGetTickets = (anketId) => {
    dispatch(getTickets(anketId));
  };
  useEffect(() => {
    allTicketsIds && handleGetTickets({ ticketIds: allTicketsIds });
  }, [allTicketsIds]);

  const ticketsWithRelated =
    dataTickets?.filter((ticket) => ticket?.relatedTickets) || [];
  const ticketsWithoutRelated =
    dataTickets?.filter((ticket) => !ticket?.relatedTickets) || [];
  const getTicketColumnNonRelated =
    generateSirenaColumn(ticketsWithoutRelated) || [];
  return (
    <>
      {dataInsurance && (
        <Accordion title="Сирена страховки" Icon={SirenaInsurance}>
          <div className="sirena_tickets_details">
            <Title Tag="h2">
              Общее количество билетов:
              <span>{dataInsurance?.length} </span>
            </Title>
            {dataInsurance.map((insuranceTicket) => {
              const getTicketColumn = createColumns([insuranceTicket]) || [];
              return (
                <div
                  key={uuid()}
                  style={{
                    padding: "20px",
                    background: isDarkTheme ? "#3a424d" : "#e6f1ff",
                    borderRadius: "12px",
                    overflowY: "scroll",
                  }}
                >
                  <HtmlExportTable
                    isDarkTheme={isDarkTheme}
                    data={[insuranceTicket]}
                    columns={getTicketColumn}
                    size="small"
                  />
                </div>
              );
            })}
          </div>
        </Accordion>
      )}
      {dataTrainTickets && (
        <Accordion title="Сирена Поезда" Icon={SirenaTrain}>
          <div className="sirena_tickets_details">
            <Title Tag="h2">
              Общее количество билетов:
              <span>{dataTrainTickets?.length} </span>
            </Title>
            {dataTrainTickets.map((ticket) => {
              const getTicketColumn = createColumns([ticket]) || [];
              const getPassengersTickets =
                createColumns(ticket.passengers) || [];
              return (
                <div
                  key={uuid()}
                  style={{
                    padding: "20px",
                    display: "grid",
                    gap: "15px",
                    background: isDarkTheme ? "#3a424d" : "#e6f1ff",
                    borderRadius: "12px",
                    overflowY: "scroll",
                  }}
                >
                  <Title Tag="h3">
                    {`${ticket?.port_from || "no data"} - ${
                      ticket?.port_to || "no data"
                    }`}
                  </Title>
                  <HtmlExportTable
                    isDarkTheme={isDarkTheme}
                    data={[ticket]}
                    columns={getTicketColumn}
                    size="small"
                  />
                  {ticket.passengers?.length && getPassengersTickets ? (
                    <div
                      className={`table_sub ${
                        isDarkTheme ? "table_sub_dark" : ""
                      }`}
                    >
                      <Title Tag="h3">
                        Попутчики:{" "}
                        {`${ticket?.port_from || "no data"} - ${
                          ticket?.port_to || "no data"
                        }`}
                      </Title>
                      <HtmlExportTable
                        isDarkTheme={isDarkTheme}
                        data={ticket.passengers}
                        columns={getPassengersTickets}
                        size="small"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Accordion>
      )}
      {dataPassenger ? (
        <Accordion title="Сирена Пасажиры" Icon={Sirenalogo}>
          <ExpandCards
            withActions
            headTitle="Количество результатов:"
            titleCount={dataPassenger?.length}
          >
            <div className="expand_cards_row expand_cards_colored_row">
              <ReactTooltip
                id="points-tooltip"
                className={`kermit_tooltip ${
                  isDarkTheme ? "" : "tooltip_light"
                }`}
                place="top"
              />
              {dataPassenger?.map(
                (
                  {
                    airline,
                    birthdate,
                    bookingTime,
                    categoryFly,
                    departureTime,
                    destination,
                    docNum,
                    docType,
                    passengerEmail,
                    flight,
                    passengerPhone,
                    lastname,
                    firstname,
                    patronymic,
                    pointOfDeparture,
                    ticket,
                    dob,
                    id,
                    arrivalCountry,
                    departureCountry,
                  },
                  i,
                ) => {
                  const passengerId = `${cardsSirenaPassanger}.sirenaPassengers${i}.sirenaPassenger${id}`;

                  return (
                    <ExpandCard
                      key={uuid()}
                      id={`${cardsSirenaPassanger}.sirenaPassengers${i}`}
                      TitleNode={
                        <>
                          <Title Tag="h4">
                            <span
                              data-tooltip-id="points-tooltip"
                              style={{
                                position: "relative",
                                cursor: "help",
                              }}
                              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                <div>{departureCountry || "--"}</div>,
                              )}
                            >
                              {pointOfDeparture || "--"}
                              {pointOfDeparture && (
                                <span
                                  style={{
                                    color: "#006eff",
                                    fontSize: "12px",
                                    position: "absolute",
                                    top: "-7px",
                                    right: "-7px",
                                  }}
                                >
                                  ?
                                </span>
                              )}
                            </span>
                            -
                            <span
                              data-tooltip-id="points-tooltip"
                              style={{
                                position: "relative",
                                cursor: "help",
                              }}
                              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                <div>{arrivalCountry || "--"}</div>,
                              )}
                            >
                              {destination || "--"}
                              {destination && (
                                <span
                                  style={{
                                    color: "#006eff",
                                    fontSize: "12px",
                                    position: "absolute",
                                    top: "-7px",
                                    right: "-7px",
                                  }}
                                >
                                  ?
                                </span>
                              )}
                            </span>
                          </Title>
                        </>
                      }
                      subId={passengerId}
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
                          <div className="expand_content_title">Телефон</div>
                          <p>{passengerPhone || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">Email</div>
                          <p>{passengerEmail || "-"}</p>
                        </div>
                      </>
                      <>
                        <div>
                          <div className="expand_content_title">
                            Дата рождения
                          </div>
                          <p>{dob ? moment(dob).format("YYYY-MM-DD") : "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">
                            Время вылета
                          </div>
                          <p>
                            {moment(departureTime).format(
                              "YYYY-MM-DD HH:mm:ss",
                            ) || "-"}
                          </p>
                        </div>
                        <div>
                          <div className="expand_content_title">
                            Дата бронирования
                          </div>
                          <p>
                            {moment
                              .utc(bookingTime)
                              .format("YYYY-MM-DD HH:mm:ss") || "-"}
                          </p>
                        </div>
                        <div>
                          <div className="expand_content_title">
                            Номер билета
                          </div>
                          <p>{ticket || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">
                            Номер рейса
                          </div>
                          <p>{flight || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">
                            Номер документа / Тип документа
                          </div>
                          <p>
                            {docNum || "-"} / {docType || "-"}
                          </p>
                        </div>
                      </>
                      <>
                        <div
                          style={{
                            display: "grid",
                            gap: "8px",
                            marginTop: "16px",
                          }}
                        >
                          <div className="details_div">
                            <div className="details_label">Авиакомпания</div>
                            <p>{airline || "-"}</p>
                          </div>
                          <div className="details_div">
                            <div className="details_label">
                              Клас обслуживания
                            </div>
                            <p>{categoryFly || "-"}</p>
                          </div>
                          <Button
                            mode="secondary"
                            text={`Cписок всех пасажиров рейса ${flight}`}
                            func={() =>
                              getAllPassengers(
                                id,
                                `Пасажиры-рейса-(№${flight})`,
                              )
                            }
                          />
                        </div>
                      </>
                    </ExpandCard>
                  );
                },
              )}
            </div>
          </ExpandCards>
        </Accordion>
      ) : null}
      {ticketsWithoutRelated?.length || ticketsWithRelated?.length ? (
        <Accordion title="Сирена Билеты" Icon={Sirenalogo}>
          {ticketsWithRelated?.length ? (
            <div className="sirena_tickets_details">
              <Title Tag="h2">
                Общее количество билетов:
                <span>{dataTickets?.length} </span>
              </Title>
              <Title Tag="h2">
                Билеты со связанными:
                <span>{ticketsWithRelated?.length} </span>
              </Title>
              {ticketsWithRelated?.map((item) => {
                const relatedTicketsColumns =
                  generateSirenaColumn(item?.relatedTickets) || [];
                const getTicketColumn = generateSirenaColumn([item]) || [];
                return (
                  <div
                    key={uuid()}
                    style={{
                      padding: "20px",
                      display: "grid",
                      gap: "15px",
                      background: isDarkTheme ? "#3a424d" : "#e6f1ff",
                      borderRadius: "12px",
                      overflowY: "scroll",
                    }}
                  >
                    <Title Tag="h3">
                      {`${item?.city_from} - ${item?.city_to}`}
                    </Title>
                    <HtmlExportTable
                      isDarkTheme={isDarkTheme}
                      data={[item]}
                      columns={getTicketColumn}
                      size="small"
                    />
                    {relatedTicketsColumns && item?.relatedTickets?.length ? (
                      <div
                        className={`table_sub ${
                          isDarkTheme ? "table_sub_dark" : ""
                        }`}
                        style={{
                          display: "grid",
                          gap: "15px",
                        }}
                      >
                        <Title Tag="h3">
                          Связанные билеты:{" "}
                          {`${item?.city_from} - ${item?.city_to}`}
                        </Title>
                        <HtmlExportTable
                          isDarkTheme={isDarkTheme}
                          data={item.relatedTickets}
                          columns={relatedTicketsColumns}
                          size="small"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
          {ticketsWithoutRelated?.length ? (
            <div
              className="sirena_tickets_details"
              style={{
                margin: "15px 0 0 0",
              }}
            >
              <Title Tag="h2">
                Билеты без связанных:
                <span>{ticketsWithoutRelated?.length} </span>
              </Title>
              <HtmlExportTable
                isDarkTheme={isDarkTheme}
                data={ticketsWithoutRelated}
                columns={getTicketColumnNonRelated}
                size="small"
              />
            </div>
          ) : null}
        </Accordion>
      ) : null}
    </>
  );
};

export default memo(Sirena);
