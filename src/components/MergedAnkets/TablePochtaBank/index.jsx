import moment from "moment/moment";
import { v4 as uuid } from "uuid";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import Card from "components/app/base/Card";
import Title from "components/app/use/Title";
import Button from "components/app/use/Button";
import ExpandCards from "components/app/base/ExpandCards";

const TablePochtaBank = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Почта банк</Title>
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
                      Электронная почта
                    </Title>
                    <p>{data?.email || "-"}</p>
                  </div>
                </div>
              </Card>
            )}
            {(data?.phone || data.phone_home) && (
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
                    <p>{data?.phone_home || "-"}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      {(data?.address || data?.placeOfBirth) && (
        <Card>
          {data?.address && (
            <div className="details_div">
              <div className="details_label">Адрес</div>
              {data?.address?.map((ad) => {
                return <p key={uuid()}>{ad}</p>;
              })}
            </div>
          )}
          {data?.placeOfBirth && (
            <div className="details_div">
              <div className="details_label">Место рождения</div>
              <p>{data?.placeOfBirth || "-"}</p>
            </div>
          )}
        </Card>
      )}
      {data?.accounts && (
        <div className="accordion_table_section">
          <Title Tag="h4">Аккаунты почта банк</Title>
          <ExpandCards>
            <div
              className="accordion_content expand_cards_row expand_cards_row-4"
              style={{ paddingTop: "16px" }}
            >
              {data?.accounts?.map(({ amountCur, name, amountRub }) => {
                return (
                  <Card key={uuid()}>
                    <div className="details_div">
                      <div className="details_label">ФИО</div>
                      <p>{name}</p>
                    </div>
                    <div className="details_div">
                      <div className="details_label">
                        Состояние счета ₽ / валюта
                      </div>
                      <p>
                        {amountRub || "-"} / {amountCur || "-"}{" "}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </ExpandCards>
        </div>
      )}
      {data?.documents ? (
        <ExpandCards>
          <Title style={{ marginBottom: "12px" }} Tag="h3">
            Документы
          </Title>
          <div className="expand_cards_row expand_cards_row-4">
            {data?.documents?.map(
              ({
                dcmSerialNo,
                dcmNumber,
                dcmIssueWhere,
                dcmExpiryDate,
                dcmDate,
                dcmType,
              }) => {
                return (
                  <Card key={uuid()}>
                    <div className="details_div">
                      <div className="details_label">Серия \ Номер</div>
                      <p>
                        {dcmSerialNo || "-"} \ {dcmNumber || "-"}
                      </p>
                    </div>
                    {dcmType && (
                      <div className="details_div">
                        <div className="details_label">Тип</div>
                        <p>{dcmType || "-"}</p>
                      </div>
                    )}
                    {dcmIssueWhere && (
                      <div className="details_div">
                        <div className="details_label">Документ выдан</div>
                        <p>{dcmIssueWhere || "-"}</p>
                      </div>
                    )}
                    {dcmDate && (
                      <div className="details_div">
                        <div className="details_label">Дата выдачи</div>
                        <p>{dcmDate || "-"}</p>
                      </div>
                    )}
                    {dcmExpiryDate && (
                      <div className="details_div">
                        <div className="details_label">Срока действия</div>
                        <p>{dcmExpiryDate || "-"}</p>
                      </div>
                    )}
                  </Card>
                );
              },
            )}
          </div>
        </ExpandCards>
      ) : null}
    </div>
  );
};

export default TablePochtaBank;
