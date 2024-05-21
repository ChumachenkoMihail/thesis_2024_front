import React, { memo, useId } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import Title from "components/app/use/Title";
import ExpandCard from "components/app/base/ExpandCard";
import Card from "components/app/base/Card";
import { ReactComponent as AlfaIcon } from "assets/images/sources/alfa.svg";
import moment from "moment/moment";

const Alfa = ({ data }) => {
  const cardsAlfaInfoId = useId();

  return (
    <Accordion Icon={AlfaIcon} title="Альфа-банк">
      <ExpandCards>
        {data?.alfa?.map(
          (
            { phone, cards, email, lastname, firstname, patronymic, dob },
            i,
          ) => {
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
                              { account_number, cardnum_ccode, expire_date },
                              cardIndex,
                            ) => {
                              const alfaId = `alfa${i}.cards${cardsAlfaInfoId}-${cardIndex}`;

                              return (
                                <div key={uuid()}>
                                  <ExpandCard
                                    withParentActions
                                    id={alfaId}
                                    title={""}
                                  >
                                    {/*first <></> = visible content*/}

                                    <>
                                      <div>
                                        <div className="expand_content_title">
                                          Номер карты
                                        </div>
                                        <p>{cardnum_ccode || "-"}</p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Номер счета
                                        </div>
                                        <p>{account_number || "-"}</p>
                                      </div>
                                    </>
                                    {/*second <></> = hide content*/}
                                    <>
                                      <div>
                                        <div className="expand_content_title">
                                          Владелец
                                        </div>
                                        <p>
                                          {lastname} {firstname} {patronymic}
                                        </p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Дата рождения
                                        </div>
                                        <p>
                                          {moment(dob).format("YYYY-MM-DD")}
                                        </p>
                                      </div>
                                      <div>
                                        <div className="expand_content_title">
                                          Дата истечения срока карты
                                        </div>
                                        <p>{expire_date || "-"}</p>
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
          },
        )}
      </ExpandCards>
    </Accordion>
  );
};

export default memo(Alfa);
