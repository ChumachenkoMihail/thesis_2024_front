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

const TableNewGosUsers = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица гос. услуги (пользователи)</Title>
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
                    {Array.isArray(data?.email) ? (
                      <div>
                        {data?.email?.map((em) => {
                          return <p>{em || "-"}</p>;
                        })}
                      </div>
                    ) : (
                      <>
                        <p>{data?.email || "-"}</p>
                      </>
                    )}
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
                    {Array.isArray(data?.phone) ? (
                      <div>
                        {data?.phone?.map((ph) => {
                          return <p>{ph || "-"}</p>;
                        })}
                      </div>
                    ) : (
                      <div>
                        <p>{data?.phone || "-"}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </div>

      {(data?.snils || (data?.inn && data?.inn !== " ")) && (
        <div className="accordion_table_section">
          <Title Tag="h4">Паспортные данные</Title>

          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.snils && (
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
        </div>
      )}
    </div>
  );
};

export default TableNewGosUsers;
