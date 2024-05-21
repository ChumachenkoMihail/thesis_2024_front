import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import React from "react";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";

const TableFssp = ({ data, handleCustomModal }) => {
  const hasPassportData = data?.snils || data?.inn || data?.passport_number;

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица приставы</Title>
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
          </div>
        </div>
      </div>

      {data?.fsspList?.length ? (
        <div className="accordion_table_section">
          <Title Tag="h4">Приставы</Title>

          <div
            className="accordion_content accordion_row expand_cards_row-4"
            style={{ paddingTop: "16px" }}
          >
            {data?.fsspList?.map(({ osp, debt_amount }) => {
              return (
                <Card key={uuid()}>
                  <div className="details_div">
                    <div className="details_label">Пристав Исполнитель</div>
                    <p>{osp || "-"}</p>
                  </div>
                  <div className="details_div">
                    <div className="details_label">Сумма задолженности</div>
                    <p>{debt_amount || "-"}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ) : null}

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
            {data?.passport_number && data?.passport_number !== " " && (
              <div className="details_div">
                <div className="details_label">Паспорт</div>
                <p>{data?.passport_number || "-"}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {data?.address && (
        <Card>
          <div className="details_div">
            <div className="details_label">Адрес</div>
            <p>{data?.address}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TableFssp;
