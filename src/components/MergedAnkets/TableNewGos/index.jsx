import moment from "moment";
import { v4 as uuid } from "uuid";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import Button from "components/app/use/Button";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import ExpandCards from "components/app/base/ExpandCards";

const TableNewGos = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица гос. услуги</Title>
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

            {data?.email?.length ? (
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
                      {data?.email?.map((item) => {
                        return <p key={uuid()}>{item || "-"}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}

            {data?.phone?.length ? (
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
                    <div>
                      {data?.phone?.map((item) => {
                        return <p key={uuid()}>{item || "-"}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </div>

      {data?.documents?.length ? (
        <div className="accordion_table_section">
          <Title Tag="h4">Документы</Title>

          <div
            className="accordion_content accordion_row expand_cards_row-4"
            style={{ paddingTop: "16px" }}
          >
            {data?.documents?.map(({ dcmSerialNo, dcmNumber }) => {
              return (
                <Card key={uuid()}>
                  <div className="details_div">
                    <div className="details_label">Серия</div>
                    <p>{dcmSerialNo || "-"}</p>
                  </div>
                  <div className="details_div">
                    <div className="details_label">Номер</div>
                    <p>{dcmNumber || "-"}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ) : null}

      {data?.address?.length ? (
        <Card>
          {data?.address && (
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
          )}
        </Card>
      ) : null}

      {(data?.snils || (data?.inn && data?.inn !== " ")) && (
        <div className="accordion_table_section">
          <Title Tag="h4">Паспортные данные</Title>

          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.snils?.length ? (
              <div className="details_div">
                <div className="details_label">№ Соц страхования</div>
                {data?.snils?.map((item) => {
                  return <p key={uuid()}>{item || "-"}</p>;
                })}
              </div>
            ) : null}
            {data?.inn && data?.inn !== " " && (
              <div className="details_div">
                <div className="details_label">ИНН</div>
                <p>{data?.inn || "-"}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {data?.kids?.length ? (
        <div className="accordion_table_section">
          <Title Tag="h4">Гос услуги(Дети)</Title>

          <ExpandCards>
            <div
              className="accordion_content expand_cards_row expand_cards_row-4"
              style={{ paddingTop: "16px" }}
            >
              {data?.kids?.map(
                ({ lastname, firstname, patronymic, inn, snils, dob }) => {
                  return (
                    <Card>
                      <div className="details_div">
                        <div className="details_label">ФИО</div>
                        <p>
                          {lastname} {firstname} {patronymic}
                        </p>
                      </div>
                      <div className="details_div">
                        <div className="details_label">Дата рождения</div>
                        <p>
                          {dob} - {moment().diff(`${dob}`, "years")} лет
                        </p>
                      </div>
                      <div className="details_div">
                        <div className="details_label">ИНН</div>
                        <p>{inn || "-"}</p>
                      </div>
                      <div className="details_div">
                        <div className="details_label">№ Соц страхования</div>
                        <p>{snils || "-"}</p>
                      </div>
                    </Card>
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

export default TableNewGos;
