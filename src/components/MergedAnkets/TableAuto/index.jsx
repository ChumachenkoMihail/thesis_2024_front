import React from "react";
import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import { ReactComponent as Phone } from "assets/images/phone.svg";

const TableAuto = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Парковки</Title>
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
      </div>
      <div className="accordion_table_expandwrapper">
        <div className="accordion_table_expandcards">
          <Card>
            {data?.plateNumber && (
              <div className="details_div">
                <div className="details_label">Номерной знак</div>
                <p>{data?.plateNumber}</p>
              </div>
            )}
            {data?.phone && (
              <div className="details_div">
                <div className="details_label">Телефон</div>
                <p>{data?.phone}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TableAuto;
