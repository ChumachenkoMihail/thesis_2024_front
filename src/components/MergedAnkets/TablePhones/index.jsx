import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import moment from "moment";
import React from "react";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import { v4 as uuid } from "uuid";

const TablePhones = ({ data, handleCustomModal }) => {
  const hasName = data?.firstname || data?.patronymic || data?.lastname;
  const hasSocialData =
    data?.numBusterTags ||
    data?.getContactTags ||
    data?.sourceName ||
    data?.serialSim ||
    data?.imsi;

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица GetContact-Numbuster</Title>
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
            {hasName && (
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

            {data?.dob && (
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
            )}

            {data?.email && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Mail}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Email
                    </Title>
                    <p>{data?.email || "-"}</p>
                  </div>
                </div>
              </Card>
            )}

            {data?.name && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4">Имя/Название</Title>
                    <p>{data?.name || "-"}</p>
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
                      Телефон
                    </Title>
                    <p>{data?.phone || "-"}</p>
                  </div>
                </div>
              </Card>
            )}

            {data?.relatedPhones && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4">Похожие телефоны</Title>
                    {data?.relatedPhones.map((item) => {
                      return <p key={uuid()}>{item}</p>;
                    })}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {data?.address && (
        <Card>
          <div className="details_div">
            <div className="details_label">Адрес</div>
            <p>{data?.address}</p>
          </div>
        </Card>
      )}

      {hasSocialData && (
        <div className="accordion_table_section">
          <Title Tag="h4">Соц. данные</Title>

          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "12px" }}
          >
            {data?.numBusterTags && (
              <div className="details_div social_details_div">
                <div className="details_label">NumBuster Теги</div>
                {data?.numBusterTags.map((item) => {
                  return <p key={uuid()}>{item}</p>;
                })}
              </div>
            )}
            {data?.getContactTags && (
              <div className="details_div social_details_div">
                <div className="details_label">GetContact Теги</div>
                {data?.getContactTags.map((item) => {
                  return <p key={uuid()}>{item}</p>;
                })}
              </div>
            )}
            {data?.sourceName && (
              <div className="details_div social_details_div">
                <div className="details_label">Имя источника</div>
                <p>{data?.sourceName}</p>
              </div>
            )}
            {data?.serialSim && (
              <div className="details_div social_details_div">
                <div className="details_label">Серия SIM-карты</div>
                <p>{data?.serialSim}</p>
              </div>
            )}
            {data?.imsi && (
              <div className="details_div social_details_div">
                <div className="details_label">
                  Идентификационный номер SIM-карты
                </div>
                <p>{data?.imsi}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {data?.documents && (
        <div className="accordion_table_section">
          <Title Tag="h4">Документы</Title>

          <div className="accordion_content" style={{ paddingTop: "16px" }}>
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
  );
};

export default TablePhones;
