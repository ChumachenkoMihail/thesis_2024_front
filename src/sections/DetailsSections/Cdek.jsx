import React, { memo, useId } from "react";
import { ReactComponent as CdekLogo } from "assets/images/sources/cdek.svg";
import ExpandCards from "components/app/base/ExpandCards";
import { v4 as uuid } from "uuid";
import ExpandCard from "components/app/base/ExpandCard";
import Accordion from "components/app/base/Accordion";

const Cdek = ({ data }) => {
  const cardsCdekId = useId();
  return (
    <Accordion title="CDEK" Icon={CdekLogo}>
      <>
        <ExpandCards
          withActions
          headTitle="Количество результатов:"
          titleCount={data?.length}
        >
          {data?.map(
            (
              {
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
              },
              i,
            ) => {
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
                <div
                  className="expand_cards_row expand_cards_colored_row"
                  key={uuid()}
                >
                  {hasCustomer && (
                    <ExpandCard
                      id={`cdekData${i}${cardsCdekId}${id}customer`}
                      title="Данные клиента"
                    >
                      {/*first <></> = visible content*/}
                      <>
                        <div>
                          <div className="expand_content_title">Имя</div>
                          <p>{name || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">Телефон</div>
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
                          <div className="expand_content_title">Контрагент</div>
                          <p>{contragentName || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">Источник</div>
                          <p>{sourceName || "-"}</p>
                        </div>
                      </>
                    </ExpandCard>
                  )}
                  {hasPayer && (
                    <ExpandCard
                      id={`cdekData${i}${cardsCdekId}${id}payer`}
                      title="Данные плательщика"
                    >
                      {/*first <></> = visible content*/}
                      <>
                        <div>
                          <div className="expand_content_title">Имя</div>
                          <p>{payerName || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">Телефон</div>
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
                          <div className="expand_content_title">Контрагент</div>
                          <p>{payerContragentName || "-"}</p>
                        </div>
                      </>
                    </ExpandCard>
                  )}
                  {hasReceiver && (
                    <ExpandCard
                      id={`cdekData${i}${cardsCdekId}${id}receiver`}
                      title="Данные получателя"
                    >
                      {/*first <></> = visible content*/}
                      <>
                        <div>
                          <div className="expand_content_title">Имя</div>
                          <p>{receiverName || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">Телефон</div>
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
                          <div className="expand_content_title">Контрагент</div>
                          <p>{receiverContragentName || "-"}</p>
                        </div>
                      </>
                    </ExpandCard>
                  )}
                  {hasSender && (
                    <ExpandCard
                      id={`cdekData${i}${cardsCdekId}${id}sender`}
                      title="Данные отправителя"
                    >
                      <>
                        <div>
                          <div className="expand_content_title">Имя</div>
                          <p>{senderName || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">Телефон</div>
                          <p>{senderPhone || "-"}</p>
                        </div>
                        <div>
                          <div className="expand_content_title">Email</div>
                          <p>{senderEmail || "-"}</p>
                        </div>
                      </>
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
                          <div className="expand_content_title">Контрагент</div>
                          <p>{senderContragentName || "-"}</p>
                        </div>
                      </>
                    </ExpandCard>
                  )}
                </div>
              );
            },
          )}
        </ExpandCards>
      </>
    </Accordion>
  );
};

export default memo(Cdek);
