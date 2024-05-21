import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import { v4 as uuid } from "uuid";
import React, { useContext, useId } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import ExpandCard from "components/app/base/ExpandCard";
import ExpandCards from "components/app/base/ExpandCards";

const TableAlfa = ({ handleCustomModal, data }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const cardsAlfaBankId = useId();
  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Альфа-банк</Title>
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
                      {Array.isArray(data?.email) ? (
                        <div>
                          {data?.email?.map((em) => {
                            return <p>{em || "-"}</p>;
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
                      <div>
                        {data?.phone?.map((ph) => {
                          return <p>{ph || "-"}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>

      {data?.cards && (
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
          <ExpandCards>
            <>
              {data?.cards?.length ? (
                <div
                  className="expand_cards_row expand_cards_colored_row"
                  style={{ display: "block" }}
                >
                  <Title Tag="h3">Карты</Title>
                  <div className="expand_cards_row expand_cards_row_auto">
                    {data?.cards?.map(
                      ({ account_number, cardnum_ccode, expire_date }, i) => {
                        return (
                          <div
                            key={uuid()}
                            style={{ marginTop: "24px" }}
                            title=""
                          >
                            <ExpandCard
                              withParentActions
                              id={`alfa${i}.${cardsAlfaBankId}alfaCards`}
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
                                    {data?.firstname || "-"}{" "}
                                    {data?.lastname || "-"}{" "}
                                    {data?.patronymic || "-"}
                                  </p>
                                </div>
                                <div>
                                  <div className="expand_content_title">
                                    Дата истечения срока
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
                </div>
              ) : null}
            </>
          </ExpandCards>
        </div>
      )}
    </div>
  );
};

export default TableAlfa;
