import React, { useId } from "react";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { v4 as uuid } from "uuid";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import ExpandCard from "components/app/base/ExpandCard";
import ExpandCards from "components/app/base/ExpandCards";

const TableCdek = ({ data, handleCustomModal }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const cardsCdekId = useId();
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица CDEK</Title>
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
                      Имя
                    </Title>
                    <p>{data?.name || "-"}</p>
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
                      Телефон
                    </Title>
                    <p>{data?.phone || "-"}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <div
        className="accordion_table_expandwrapper"
        style={{
          borderRadius: "16px",
          padding: "24px 16px",
          background: isDarkTheme
            ? "#2C323B"
            : "linear-gradient(180deg, #f6f8fa 0%, rgba(246, 248, 250, 0.5) 100%)",
        }}
      >
        <ExpandCards
          withActions
          headTitle="Количество результатов:"
          titleCount={data?.cdekData?.length}
        >
          {data?.cdekData && (
            <>
              {data?.cdekData?.map(
                ({
                  payerContactPerson,
                  payerCity,
                  payerAddress,
                  payerContragentName,
                  payerEmail,
                  payerName,
                  payerPhone,
                  receiverAddress,
                  receiverCity,
                  receiverContactPerson,
                  receiverContragentName,
                  receiverEmail,
                  receiverName,
                  receiverPhone,
                  senderAddress,
                  senderCity,
                  senderContactPerson,
                  senderContragentName,
                  senderEmail,
                  senderName,
                  senderPhone,
                  contragentName,
                  city,
                  addressString,
                  name,
                  phone,
                  contactPerson,
                  sourceName,
                  email,
                  id,
                }) => {
                  const hasCustomer =
                    contragentName ||
                    contactPerson ||
                    phone ||
                    name ||
                    email ||
                    addressString ||
                    city;
                  const hasReceiver =
                    receiverAddress ||
                    receiverCity ||
                    receiverContactPerson ||
                    receiverContragentName ||
                    receiverEmail ||
                    receiverName ||
                    receiverPhone;
                  const hasSender =
                    senderAddress ||
                    senderCity ||
                    senderContactPerson ||
                    senderContragentName ||
                    senderEmail ||
                    senderName ||
                    senderPhone;
                  const hasPayer =
                    payerName ||
                    payerContactPerson ||
                    payerCity ||
                    payerAddress ||
                    payerContragentName ||
                    payerEmail ||
                    payerPhone;
                  return (
                    <div className="accordion_table_expandcards" key={uuid()}>
                      {hasCustomer && (
                        <ExpandCard
                          id={`table${cardsCdekId}${id}customer`}
                          title="Данные клиента"
                        >
                          {/*first <></> = visible content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Имя</div>
                              <p>{name || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Телефон
                              </div>
                              <p>{phone || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Email</div>
                              <p>{email || "-"}</p>
                            </div>
                          </>
                          {/*second <></> = hide content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Адрес</div>
                              <p>{addressString || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Город</div>
                              <p>{city || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контактное лицо
                              </div>
                              <p>{contactPerson || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контрагент
                              </div>
                              <p>{contragentName || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Источник
                              </div>
                              <p>{sourceName || "-"}</p>
                            </div>
                          </>
                        </ExpandCard>
                      )}
                      {hasPayer && (
                        <ExpandCard
                          id={`table${cardsCdekId}${id}payer`}
                          title="Данные плательщика"
                        >
                          {/*first <></> = visible content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Имя</div>
                              <p>{payerName || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Телефон
                              </div>
                              <p>{payerPhone || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Email</div>
                              <p>{payerEmail || "-"}</p>
                            </div>
                          </>
                          {/*second <></> = hide content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Адрес</div>
                              <p>{payerAddress || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Город</div>
                              <p>{payerCity || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контактное лицо
                              </div>
                              <p>{payerContactPerson || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контрагент
                              </div>
                              <p>{payerContragentName || "-"}</p>
                            </div>
                          </>
                        </ExpandCard>
                      )}
                      {hasReceiver && (
                        <ExpandCard
                          id={`table${cardsCdekId}${id}receiver`}
                          title="Данные получателя"
                        >
                          {/*first <></> = visible content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Имя</div>
                              <p>{receiverName || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Телефон
                              </div>
                              <p>{receiverPhone || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Email</div>
                              <p>{receiverEmail || "-"}</p>
                            </div>
                          </>
                          {/*second <></> = hide content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Адрес</div>
                              <p>{receiverAddress || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Город</div>
                              <p>{receiverCity || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контактное лицо
                              </div>
                              <p>{receiverContactPerson || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контрагент
                              </div>
                              <p>{receiverContragentName || "-"}</p>
                            </div>
                          </>
                        </ExpandCard>
                      )}
                      {hasSender && (
                        <ExpandCard
                          id={`table${cardsCdekId}${id}sender`}
                          title="Данные отправителя"
                        >
                          {/*first <></> = visible content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Имя</div>
                              <p>{senderName || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Телефон
                              </div>
                              <p>{senderPhone || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Email</div>
                              <p>{senderEmail || "-"}</p>
                            </div>
                          </>
                          {/*second <></> = hide content*/}
                          <>
                            <div>
                              <div className="expand_content_title">Адрес</div>
                              <p>{senderAddress || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">Город</div>
                              <p>{senderCity || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контактное лицо
                              </div>
                              <p>{senderContactPerson || "-"}</p>
                            </div>
                            <div>
                              <div className="expand_content_title">
                                Контрагент
                              </div>
                              <p>{senderContragentName || "-"}</p>
                            </div>
                          </>
                        </ExpandCard>
                      )}
                    </div>
                  );
                },
              )}
            </>
          )}
        </ExpandCards>
      </div>
    </div>
  );
};

export default TableCdek;
