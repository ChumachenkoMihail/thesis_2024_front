import Accordion from "components/app/base/Accordion";
import { ReactComponent as EgronImage } from "assets/images/sources/egron.svg";
import React from "react";

import Card from "components/app/base/Card";
import EgronDeal from "./EgronDeal";
import { v4 as uuid } from "uuid";

const Egron = ({ data }) => {
  return (
    <Accordion title="ЕГРОН" Icon={EgronImage}>
      <div className="accordion_inner">
        <div className="accordion_gap">
          <div className="accordion_content">
            {data.map(
              ({
                cadNumber,
                area,
                history,
                lastname,
                patronymic,
                firstname,
                address,
                price,
              }) => {
                const objectType = history?.find(
                  (item) => item.objectType,
                )?.objectType;
                return (
                  <React.Fragment key={uuid()}>
                    <Card>
                      <div className="details_div">
                        <div className="details_label">Кадастровый номер</div>
                        <p>{cadNumber}</p>
                      </div>
                      <div className="details_div">
                        <div className="details_label">Площадь</div>
                        <p>{area}</p>
                      </div>
                      {objectType && (
                        <div className="details_div">
                          <div className="details_label">Тип площади</div>
                          <p>{objectType}</p>
                        </div>
                      )}
                      {price && (
                        <div className="details_div">
                          <div className="details_label">Стоимость</div>
                          <p>{price} ₽</p>
                        </div>
                      )}
                      <div className="details_div">
                        <div className="details_label">Адрес</div>
                        <p>{address}</p>
                      </div>
                      {(lastname || firstname || patronymic) && (
                        <div className="details_div">
                          <div className="details_label">
                            Информация о пользователе
                          </div>
                          <p>
                            {lastname} {firstname} {patronymic}
                          </p>
                        </div>
                      )}
                    </Card>

                    {history?.length > 0 ? (
                      <Accordion title="Действия по объекту" titleTag="h4">
                        <EgronDeal data={history} />
                      </Accordion>
                    ) : null}
                  </React.Fragment>
                );
              },
            )}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Egron;
