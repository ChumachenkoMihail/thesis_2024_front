import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import React from "react";
import { v4 as uuid } from "uuid";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";

const TableMvd = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица МВД</Title>
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
          </div>
        </div>
      </div>

      {data?.documents && (
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

      {data?.address || data?.placeOfBirth ? (
        <Card>
          {data?.address && (
            <div className="details_div">
              <div className="details_label">Адрес</div>
              {Array.isArray(data.address) ? (
                <>
                  {data.address?.map((item) => (
                    <p key={uuid()}>{item}</p>
                  ))}
                </>
              ) : (
                <p>{data?.address}</p>
              )}
            </div>
          )}
          {data?.placeOfBirth && (
            <div className="details_div">
              <div className="details_label">Место рождения</div>
              <p>{data?.placeOfBirth}</p>
            </div>
          )}
        </Card>
      ) : null}
    </div>
  );
};

export default TableMvd;
