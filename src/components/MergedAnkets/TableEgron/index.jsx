import Title from "../../app/use/Title";
import Button from "../../app/use/Button";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import Card from "../../app/base/Card";
import moment from "moment";
import { v4 as uuid } from "uuid";
import React from "react";
import TableFront from "../../app/base/Table/TableFront";
import { EgronColumns } from "../../../libs/generatedСolumns/egron";
import Accordion from "../../app/base/Accordion";
const TableEgron = ({ data, handleCustomModal }) => {
  const hasPassportData = data?.snils || data?.documents || data?.nationality;
  const hasAddress = data?.address || data?.region;

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица ЕГРОН</Title>
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
        </div>
      </div>
      {hasAddress && (
        <Card>
          {data?.address && (
            <div className="details_div">
              <div className="details_label">Адрес</div>
              <p>{data?.address || "-"}</p>
            </div>
          )}

          <div className="details_div">
            <div className="details_label">Регион</div>
            {data?.region && <p>{data?.region || "-"}</p>}
          </div>
        </Card>
      )}
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
            {data?.nationality && (
              <div className="details_div">
                <div className="details_label">
                  Национальность | Гражданство
                </div>
                <p>{data?.nationality}</p>
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
                {data?.documents?.map(
                  ({ dcmSerialNo, dcmNumber, dcmIssueWhere }) => {
                    return (
                      <Card key={uuid()}>
                        {dcmSerialNo ? (
                          <div className="details_div">
                            <div className="details_label">Серия \ Номер</div>
                            <p>
                              {dcmSerialNo || "-"} \ {dcmNumber || "-"}
                            </p>
                          </div>
                        ) : (
                          <div className="details_div">
                            <div className="details_label">Номер</div>
                            <p>{dcmNumber || "-"}</p>
                          </div>
                        )}
                        {dcmIssueWhere && (
                          <div className="details_div">
                            <div className="details_label">Документ выдан</div>
                            <p>{dcmIssueWhere || "-"}</p>
                          </div>
                        )}
                      </Card>
                    );
                  },
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {data.estates &&
        data.estates.map(({ cadNumber, area, address, history, price }) => {
          return (
            <Accordion title={`Действия по объекту: ${cadNumber}`} key={uuid()}>
              <div style={{ padding: "0 0 15px 0" }}>
                {area && (
                  <div className="details_div">
                    <div className="details_label">Площадь</div>
                    <p>{area}</p>
                  </div>
                )}
                {address && (
                  <div className="details_div">
                    <div className="details_label">Адрес</div>
                    <p>{address}</p>
                  </div>
                )}
                {price && (
                  <div className="details_div">
                    <div className="details_label">Стоимость</div>
                    <p>{price} ₽</p>
                  </div>
                )}
              </div>
              {history?.length ? (
                <TableFront data={history} columns={EgronColumns} />
              ) : null}
            </Accordion>
          );
        })}
    </div>
  );
};

export default TableEgron;
