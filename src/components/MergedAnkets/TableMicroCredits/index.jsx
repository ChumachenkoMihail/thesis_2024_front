import Title from "components/app/use/Title";
import Button from "components/app/use/Button";
import Card from "components/app/base/Card";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";

import moment from "moment/moment";
import { v4 as uuid } from "uuid";
import React from "react";

const TableMicroCredits = ({ handleCustomModal, data }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Микро кредиты</Title>
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
                    <div>
                      <p>{data?.email}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}

            {data?.phone || data.phone_home || data.work_phone ? (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    {data?.phone && (
                      <>
                        <Title
                          Tag="h4"
                          Icon={Phone}
                          IconWidth="20px"
                          IconHeight="20px"
                        >
                          Номер телефона
                        </Title>
                        <div>
                          <p>{data?.phone}</p>
                        </div>
                      </>
                    )}
                    {data.phone_home && (
                      <>
                        <Title
                          Tag="h4"
                          Icon={Phone}
                          IconWidth="20px"
                          IconHeight="20px"
                        >
                          Домашний телефон
                        </Title>
                        <div>
                          <p>{data?.phone_home}</p>
                        </div>
                      </>
                    )}
                    {data.work_phone && (
                      <>
                        <Title
                          Tag="h4"
                          Icon={Phone}
                          IconWidth="20px"
                          IconHeight="20px"
                        >
                          Рабочий телефон
                        </Title>
                        <div>
                          <p>{data?.work_phone}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
      {data?.address ? (
        <Card>
          <div className="details_div">
            <div className="details_label">Адрес</div>
            {data?.address?.map((item) => {
              return (
                <p key={uuid()}>
                  {item || "-"}
                  {", "}
                </p>
              );
            })}
          </div>
        </Card>
      ) : null}
      <div className="accordion_table_section">
        <Title Tag="h4">Соц. данные</Title>
        <div
          className="accordion_content accordion_row"
          style={{ paddingTop: "16px" }}
        >
          {data?.family_status && (
            <div className="details_div social_details_div">
              <div className="details_label">Семейное положение</div>
              <p>{data?.family_status}</p>
            </div>
          )}
          {data?.placeOfBirth && (
            <div className="details_div social_details_div">
              <div className="details_label">Место рождения</div>
              <p>{data?.placeOfBirth}</p>
            </div>
          )}
          {data?.credit_amount && (
            <div className="details_div social_details_div">
              <div className="details_label">Сумма кредита</div>
              <p>{data?.credit_amount}</p>
            </div>
          )}
        </div>
      </div>
      {data?.localPassport && (
        <div className="accordion_table_section">
          <Title Tag="h4">Паспорт</Title>
          <div style={{ paddingTop: "16px" }}>
            <div className="accordion_list">
              <div className="accordion_col">
                <Card>
                  <div className="accordion_col_header">
                    <div>
                      <div className="accordion_col_title">
                        Паспорт РФ серия/номер
                      </div>
                      <p>
                        {data?.localPassport?.localPassportSeries || "No data"}{" "}
                        |{" "}
                        {data?.localPassport?.localPassportNumber || "No data"}
                      </p>
                    </div>
                  </div>
                  {data?.localPassport?.issuedBy && (
                    <div className="accordion_col_body">
                      <div className="details_div">
                        <div className="details_label">Выдан</div>
                        <p className="details_desc">
                          {data?.localPassport?.issuedBy}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
      {data?.jobHistory && (
        <div className="accordion_table_section">
          <Title Tag="h4">Работа</Title>
          <div className="details_table">
            {data?.jobHistory?.map(
              ({ info, organizationAddress, organizationName }) => {
                return (
                  <div className="details_table_row" key={uuid()}>
                    <div className="details_table_cell">
                      {organizationName ? (
                        <p className="details_table_title">
                          <>
                            {organizationName}
                            <br />
                          </>
                        </p>
                      ) : null}
                      <p className="details_table_title">
                        {organizationAddress}
                      </p>
                      <p className="details_table_text">{info}</p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMicroCredits;
