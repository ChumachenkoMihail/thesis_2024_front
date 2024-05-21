import React, { memo, useId } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import Title from "components/app/use/Title";
import ExpandCard from "components/app/base/ExpandCard";
import Card from "components/app/base/Card";
import { ReactComponent as MTS } from "assets/images/sources/mts.svg";

const MtsBank = ({ data }) => {
  const cardsMtsInfoId = useId();

  return (
    <Accordion Icon={MTS} title="MTC-банк">
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
    </Accordion>
  );
};

export default memo(MtsBank);
