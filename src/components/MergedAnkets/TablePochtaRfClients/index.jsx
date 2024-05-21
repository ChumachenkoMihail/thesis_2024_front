import React from "react";
import Title from "../../app/use/Title";
import Button from "../../app/use/Button";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import Card from "../../app/base/Card";
import moment from "moment/moment";

function TablePochtaRfClients({ handleCustomModal, data }) {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Почта россии клиенты</Title>
        <div className="accordion_table_actions">
          <Button
            text="Добавить в кастомную анкету"
            Icon={Custom}
            func={() => handleCustomModal(data)}
          />
        </div>
      </div>
      <div className="accordion_table_body">
        <div className="details_grid details_grid_big">
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
          {data?.email && data?.email !== " " && (
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
                  <p>{data?.email || "-"}</p>
                </div>
              </div>
            </Card>
          )}

          {data?.phone && (
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
                  <p>{data?.phone || "-"}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
      {data?.address ? (
        <Card>
          <div className="details_div">
            <div className="details_label">Адрес</div>
            <p>{data?.address}</p>
          </div>
        </Card>
      ) : null}
    </div>
  );
}

export default TablePochtaRfClients;
