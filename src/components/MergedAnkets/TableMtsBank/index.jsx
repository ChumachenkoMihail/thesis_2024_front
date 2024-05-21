import React, { useId } from "react";
import Title from "../../app/use/Title";
import Button from "../../app/use/Button";
import Card from "../../app/base/Card";
import { v4 as uuid } from "uuid";
import ExpandCards from "../../app/base/ExpandCards";
import ExpandCard from "../../app/base/ExpandCard";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";

const TableMtsBank = ({ handleCustomModal, data }) => {
  const cardsMtsInfoId = useId();

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица MTC-банк</Title>
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
                      <div>{data?.phone}</div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
      {data.inn && (
        <div className="accordion_table_section">
          <Title Tag="h4">Паспортные данные</Title>
          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.inn && data?.inn !== " " && (
              <div className="details_div">
                <div className="details_label">ИНН</div>
                <p>{data?.inn || "-"}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {data?.country && (
        <Card>
          <div className="details_div">
            <div className="details_label">Адрес</div>
            {data?.country && <p>{data?.country || "-"}</p>}
          </div>
        </Card>
      )}
      {data?.mtsBank && (
        <ExpandCards>
          {data?.mtsBank?.map(({ phone, cards, email }, i) => {
            return (
              <React.Fragment key={uuid()}>
                {!cards?.length && !phone?.length && !email?.length ? null : (
                  <div
                    className="expand_cards_row expand_cards_colored_row"
                    style={{ display: "block" }}
                  >
                    {cards?.length ? (
                      <>
                        <Title style={{ marginBottom: "12px" }} Tag="h3">
                          Карты
                        </Title>
                        <div className="expand_cards_row">
                          {cards?.map(
                            (
                              { cardNumber, expiryDate, issueDate, cardType },
                              cardIndex,
                            ) => {
                              const mtsBankId = `mtsBank${i}.cards${cardsMtsInfoId}-${cardIndex}`;

                              return (
                                <div key={uuid()}>
                                  <ExpandCard
                                    withParentActions
                                    id={mtsBankId}
                                    title={""}
                                  >
                                    {/*first <></> = visible content*/}
                                    <>
                                      <div>
                                        <div className="expand_content_title">
                                          Тип карты
                                        </div>
                                        <p>{cardType || "-"}</p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Номер
                                        </div>
                                        <p>{cardNumber || "-"}</p>
                                      </div>
                                    </>
                                    {/*second <></> = hide content*/}
                                    <>
                                      <div>
                                        <div className="expand_content_title">
                                          Дата выдачи
                                        </div>
                                        <p>{issueDate || "-"}</p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Дата истечения срока
                                        </div>
                                        <p>{expiryDate || "-"}</p>
                                      </div>
                                    </>
                                  </ExpandCard>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </>
                    ) : null}
                    <>
                      {phone?.length ? (
                        <>
                          <Title style={{ marginBottom: "12px" }} Tag="h3">
                            Телефоны
                          </Title>
                          <div className="expand_cards_row">
                            <Card>
                              <div>
                                {phone?.map((ph) => {
                                  return (
                                    <div className="details_div" key={uuid()}>
                                      <p>{ph}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </Card>
                          </div>
                        </>
                      ) : null}

                      {email?.length ? (
                        <>
                          <Title style={{ marginBottom: "12px" }} Tag="h3">
                            Почты
                          </Title>
                          <div className="expand_cards_row">
                            <Card>
                              <div>
                                {email.map((em) => {
                                  return (
                                    <div className="details_div" key={uuid()}>
                                      <p>{em}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </Card>
                          </div>
                        </>
                      ) : null}
                    </>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </ExpandCards>
      )}
    </div>
  );
};

export default TableMtsBank;
