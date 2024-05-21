import moment from "moment";
import { v4 as uuid } from "uuid";
import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import React, { useId } from "react";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";

const TableTutuPassengers = ({ data, handleCustomModal }) => {
  const cardTutuReserveUsersId = useId();

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Tutu пользователи</Title>
        <div className="accordion_table_actions">
          <Button
            text="Добавить в кастомную анкету"
            Icon={Custom}
            func={() => handleCustomModal(data)}
          />
        </div>
      </div>
      <div className="accordion_table_body">
        <div className="details_main">
          <div className="details_grid details_grid_big">
            {(data?.lastname || data?.firstname || data?.patronymic) && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Profile}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      ФИО
                    </Title>
                    <p>
                      {data?.lastname} {data?.firstname} {data?.patronymic}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {data?.dob ? (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Calendar}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Дата рождения
                    </Title>
                    <p>
                      {moment(data?.dob).format("YYYY-MM-DD")} -{" "}
                      {moment().diff(`${data?.dob}`, "years")} лет
                    </p>
                  </div>
                </div>
              </Card>
            ) : null}
          </div>

          {data?.placeOfBirth ? (
            <Card>
              {data?.placeOfBirth && (
                <div className="details_div">
                  <div className="details_label">Место рождения</div>
                  <p>{data?.placeOfBirth}</p>
                </div>
              )}
            </Card>
          ) : null}

          {data?.documents && (
            <div className="accordion_table_section">
              <Title Tag="h4">Документы</Title>

              <div
                className="accordion_content accordion_row expand_cards_row-4"
                style={{ paddingTop: "16px" }}
              >
                {data?.documents?.map(({ dcmType, dcmNumber }) => {
                  return (
                    <Card key={uuid()}>
                      <div className="details_div">
                        <div className="details_label">Номер</div>
                        <p>{dcmNumber || "-"}</p>
                      </div>
                      <div className="details_div">
                        <div className="details_label">Тип</div>
                        <p>{dcmType || "-"}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {data?.tutuReserveUsers?.length ? (
            <div className="accordion_table_section">
              <Title Tag="h4">Бронирования</Title>

              <ExpandCards>
                <div
                  className="accordion_content expand_cards_row expand_cards_row-4"
                  style={{ paddingTop: "16px" }}
                >
                  {data?.tutuReserveUsers?.map(
                    (
                      {
                        lastname,
                        firstname,
                        patronymic,
                        dob,
                        email,
                        phone,
                        reservedFor,
                        id,
                      },
                      i,
                    ) => {
                      return (
                        <React.Fragment key={uuid()}>
                          <ExpandCard
                            title="Билет куплен кем"
                            id={`tutuReserveUsersData${i}${cardTutuReserveUsersId}${id}`}
                          >
                            {/*first <></> = visible content*/}
                            <>
                              <div>
                                <div className="expand_content_title">ФИО</div>
                                <p>
                                  {lastname} {firstname} {patronymic}
                                </p>
                              </div>
                              <div>
                                <div className="expand_content_title">
                                  Дата рождения
                                </div>
                                {(dob && moment(dob).format("YYYY-MM-DD")) ||
                                  "-"}
                              </div>
                            </>

                            {/*second <></> = hide content*/}
                            <>
                              <div>
                                <div className="expand_content_title">
                                  Email
                                </div>
                                <p>{email || "-"}</p>
                              </div>
                              <div>
                                <div className="expand_content_title">
                                  Телефон
                                </div>
                                <p>{phone || "-"}</p>
                              </div>
                              <div>
                                <div className="expand_content_title">
                                  Билет куплен для
                                </div>
                                <p>{reservedFor || "-"}</p>
                              </div>
                            </>
                          </ExpandCard>
                        </React.Fragment>
                      );
                    },
                  )}
                </div>
              </ExpandCards>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TableTutuPassengers;
