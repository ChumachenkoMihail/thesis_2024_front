import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import React from "react";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Email } from "assets/images/mail.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";

const TableDeliveryClub = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Delivery Club</Title>
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
            {data?.name && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Profile}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Имя/Название
                    </Title>
                    <p>{data?.name}</p>
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
                      Icon={Email}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Электронная почта
                    </Title>
                    <p>{data?.email}</p>
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
                    <p>{data?.phone}</p>
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
            {data?.address}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TableDeliveryClub;