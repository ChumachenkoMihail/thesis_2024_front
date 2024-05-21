import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import React from "react";
import { v4 as uuid } from "uuid";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";

const findInMailRu = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Mail.ru</Title>
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
            {data?.email && (
              <>
                <Card key={uuid()}>
                  <div className="details_card_content">
                    <div className="details_card_header">
                      <Title
                        Tag="h4"
                        Icon={Mail}
                        IconWidth="20px"
                        IconHeight="20px"
                      >
                        Почты
                      </Title>
                      <p>{data?.email || "-"}</p>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {data?.phone && (
              <>
                <Card key={uuid()}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default findInMailRu;
