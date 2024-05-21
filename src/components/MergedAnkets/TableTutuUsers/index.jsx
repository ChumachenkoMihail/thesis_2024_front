import moment from "moment";
import { v4 as uuid } from "uuid";
import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import React, { useId } from "react";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";

const TableTutuUsers = ({ data, handleCustomModal }) => {
  const cardTutuPassengersId = useId();

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

            {data?.email ? (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Mail}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Электронная почта
                    </Title>
                    <div>{data?.email || "-"}</div>
                  </div>
                </div>
              </Card>
            ) : null}

            {data?.phone ? (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Phone}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Номер телефона
                    </Title>
                    <div>{data?.phone || "-"}</div>
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </div>

      {data?.tutuPassengers?.length ? (
        <div className="accordion_table_section">
          <Title Tag="h4">Пассажиры</Title>

          <ExpandCards withActions>
            <div
              className="accordion_content expand_cards_row expand_cards_row-4"
              style={{ paddingTop: "16px" }}
            >
              {data?.tutuPassengers?.map(
                (
                  {
                    lastname,
                    firstname,
                    patronymic,
                    dob,
                    placeOfBirth,
                    dcmNumber,
                    dcmType,
                    id,
                  },
                  i,
                ) => {
                  return (
                    <React.Fragment key={uuid()}>
                      <ExpandCard
                        id={`tutuPassengersData${i}${cardTutuPassengersId}${id}`}
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
                            <p>{moment(dob).format("YYYY-MM-DD")}</p>
                          </div>
                        </>
                        {/*second <></> = hide content*/}
                        <>
                          <div>
                            <div className="expand_content_title">
                              Место рождения
                            </div>
                            <p>{placeOfBirth || "-"}</p>
                          </div>
                          <div>
                            <div className="expand_content_title">
                              Номер документа
                            </div>
                            <p>{dcmNumber || "-"}</p>
                          </div>
                          <div>
                            <div className="expand_content_title">
                              Тип документа
                            </div>
                            <p>{dcmType || "-"}</p>
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
  );
};

export default TableTutuUsers;
