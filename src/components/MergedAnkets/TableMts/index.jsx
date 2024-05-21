import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import React from "react";

const TableMts = ({ handleCustomModal, data }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица MTS</Title>
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
    </div>
  );
};

export default TableMts;
