import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import React from "react";

const TablePromed = ({ handleCustomModal, data }) => {
  const hasPassportData =
    (data?.snils && data?.snils !== " ") ||
    (data?.inn && data?.inn !== " ") ||
    data?.documents;

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Промед</Title>
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
                    {data?.lastname || "-"} {data?.firstname || "-"}{" "}
                    {data?.patronymic || "-"}
                  </p>
                </div>
              </div>
            </Card>

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

            {data?.phone && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {hasPassportData && (
        <div className="accordion_table_section">
          <Title Tag="h4">Паспортные данные</Title>
          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.snils && data?.snils !== " " && (
              <div className="details_div">
                <div className="details_label">№ Соц страхования</div>
                <p>{data?.snils || "-"}</p>
              </div>
            )}
            {data?.inn && data?.inn !== " " && (
              <div className="details_div">
                <div className="details_label">ИНН</div>
                <p>{data?.inn || "-"}</p>
              </div>
            )}
          </div>
          {data?.documents && (
            <div style={{ paddingTop: "16px" }}>
              <Title Tag="h4">Документ</Title>

              <div
                className="accordion_content accordion_row expand_cards_row-4"
                style={{ paddingTop: "16px" }}
              >
                {data?.documents?.map(({ dcmSerialNo, dcmNumber }) => {
                  return (
                    <Card key={uuid()}>
                      <div className="details_div">
                        <div className="details_label">Номер / Серия</div>
                        <p>
                          {dcmNumber || "-"} / {dcmSerialNo || "-"}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {(data?.polis_ser || data?.polis_num) && (
        <div className="accordion_table_section">
          <Title Tag="h4">Соц. данные</Title>

          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.polis_ser && (
              <div className="details_div social_details_div">
                <div className="details_label">Серия полиса</div>
                <p>{data?.polis_ser}</p>
              </div>
            )}
            {data?.polis_num && (
              <div className="details_div social_details_div">
                <div className="details_label">Номер полиса</div>
                <p>{data?.polis_num}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePromed;
