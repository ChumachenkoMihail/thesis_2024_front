import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import Card from "components/app/base/Card";
import Title from "components/app/use/Title";
import Button from "components/app/use/Button";
import { v4 as uuid } from "uuid";

const TableAvito = ({ data, handleCustomModal }) => {
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Avito</Title>
        <Button
          text="Добавить в кастомную анкету"
          Icon={Custom}
          func={() => handleCustomModal(data)}
        />
      </div>
      <div className="accordion_table_body">
        <div className="details_main">
          <div className="details_grid details_grid_big">
            {data?.email?.length ? (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4" Icon={Mail}>
                      Электронная почта
                    </Title>
                    {Array.isArray(data?.email) ? (
                      <div>
                        {data?.email?.map((em) => {
                          return <p key={uuid()}>{em || "-"}</p>;
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
                    <Title Tag="h4" Icon={Phone}>
                      Номер телефона
                    </Title>
                    {Array.isArray(data?.phone) ? (
                      <div>
                        {data?.phone?.map((ph) => {
                          return <p key={uuid()}>{ph || "-"}</p>;
                        })}
                      </div>
                    ) : (
                      <>
                        <p>{data?.phone || "-"}</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAvito;
