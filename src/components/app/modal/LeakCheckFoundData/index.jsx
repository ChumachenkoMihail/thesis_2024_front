import React from "react";
import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import AccordionList from "components/app/base/AccordionList";
import AccordionListItem from "components/app/base/AccordionList/AccordionListItem";
import { v4 as uuid } from "uuid";
import Button from "components/app/use/Button";
import { leakCheck } from "store/thunks/outsideApiThunks";
import { useDispatch } from "react-redux";
import { generateColumnsLeakCheck } from "libs/generatedСolumns/generateColumnsLeakCheck";
import { ReactComponent as Search } from "assets/images/search_2.svg";
import { ReactComponent as SearchResult } from "assets/images/search_show_result.svg";
import TableFront from "components/app/base/Table/TableFront";
import Title from "components/app/use/Title";
import { copyToTextClipboard } from "libs/clipboardCopy";

const LeakCheckFoundData = ({ data }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const handleLeakCheck = (obj) => {
    dispatch(leakCheck(obj));
  };
  return (
    <div
      className={`leak_check_items_list ${
        isDarkTheme ? "" : "leak_check_items_list-light"
      }`}
    >
      <>
        {data?.map(({ payload, result }) => {
          return (
            <div className="leak_check-item">
              <div className="item_head">
                <Title Tag="h4" titleType="title_secondary">
                  Параметр:
                </Title>
                <Title Tag="h4">{payload}</Title>
              </div>

              {result.length ? (
                <AccordionList>
                  {result?.map(
                    ({
                      last_breach,
                      login,
                      password,
                      sources,
                      phone,
                      city,
                      ip,
                      userNames,
                      username,
                      profile_name,
                      origin,
                      dob,
                      address,
                      zip,
                      last_name,
                      first_name,
                      state,
                      name,
                    }) => {
                      const hasDropValues =
                        userNames?.length ||
                        city ||
                        phone ||
                        ip ||
                        username ||
                        origin ||
                        dob ||
                        zip ||
                        profile_name ||
                        state ||
                        first_name ||
                        last_name ||
                        name ||
                        address ||
                        sources;
                      const userNamesColumns = generateColumnsLeakCheck(
                        userNames || [],
                        copyToTextClipboard,
                      );
                      return (
                        <AccordionListItem
                          buttonIcon={SearchResult}
                          buttonText="Все данные"
                          key={uuid()}
                        >
                          <div className="leak_check_row">
                            <div className="leak_check_head_title">
                              <p>Логин</p>
                              <span>{login || "-"}</span>
                            </div>
                            <div className="leak_check_head_title">
                              <p>Пароль</p>
                              <span>{password || "-"}</span>
                            </div>

                            {password && (
                              <Button
                                Icon={Search}
                                mode="tretiary"
                                func={() =>
                                  handleLeakCheck({
                                    type: "PASSWORD",
                                    value: password,
                                  })
                                }
                                text="Поиск по паролю"
                              />
                            )}
                          </div>
                          {hasDropValues && (
                            <>
                              <div className="leak_check_row border-row">
                                {last_breach && (
                                  <div className="leak_check_head_title">
                                    <p>Дата взлома:</p>
                                    <span>{last_breach || "-"}</span>
                                  </div>
                                )}
                                {sources?.length ? (
                                  <div className="leak_check_head_title">
                                    <p>Источник взлома:</p>
                                    <span>
                                      {sources.map((item) => (
                                        <React.Fragment key={uuid()}>
                                          {item}
                                        </React.Fragment>
                                      ))}
                                    </span>
                                  </div>
                                ) : null}
                                {city && (
                                  <div className="leak_check_head_title">
                                    <p>Город:</p>
                                    <span>{city}</span>
                                  </div>
                                )}
                                {ip && (
                                  <div className="leak_check_head_title">
                                    <p>IP адрес:</p>
                                    <span>{ip}</span>
                                  </div>
                                )}
                                {(last_name || first_name) && (
                                  <div className="leak_check_head_title">
                                    <p> ФИО:</p>
                                    <span>
                                      {last_name || ""} {first_name || ""}
                                    </span>
                                  </div>
                                )}
                                {name && (
                                  <div className="leak_check_head_title">
                                    <p> ФИО:</p>
                                    <span>{name || ""}</span>
                                  </div>
                                )}
                                {username && (
                                  <div className="leak_check_head_title">
                                    <p>Имя в профиле:</p>
                                    <span>{username}</span>
                                  </div>
                                )}
                                {phone && (
                                  <div className="leak_check_head_title">
                                    <p>Телефон:</p>
                                    <span>{phone}</span>
                                  </div>
                                )}
                                {profile_name && (
                                  <div className="leak_check_head_title">
                                    <p>Имя в профиле:</p>
                                    <span>{profile_name}</span>
                                  </div>
                                )}
                                {dob && (
                                  <div className="leak_check_head_title">
                                    <p>Дата рождения:</p>
                                    <span>{dob}</span>
                                  </div>
                                )}
                                {address && (
                                  <div className="leak_check_head_title">
                                    <p>Адрес:</p>
                                    <span>{address}</span>
                                  </div>
                                )}
                                {zip && (
                                  <div className="leak_check_head_title">
                                    <p>ZIP code:</p>
                                    <span>{zip}</span>
                                  </div>
                                )}
                                {state && (
                                  <div className="leak_check_head_title">
                                    <p>Cтрана:</p>
                                    <span>{state}</span>
                                  </div>
                                )}
                                {origin?.length ? (
                                  <div className="leak_check_head_title">
                                    <p>Источники:</p>
                                    {origin.map((i) => {
                                      return (
                                        <React.Fragment key={i}>
                                          <span>{i}</span> <br />
                                        </React.Fragment>
                                      );
                                    })}
                                  </div>
                                ) : null}
                              </div>
                              <div className="leak_check_row row_column">
                                {userNames ? (
                                  <div className="row_table">
                                    <Title Tag="h3">Пароли пользователей</Title>
                                    <TableFront
                                      data={userNames}
                                      columns={userNamesColumns}
                                    />
                                  </div>
                                ) : null}

                                {/*{phones ? (*/}
                                {/*  <div className="row_table">*/}
                                {/*    <Title Tag="h3">Телефоны</Title>*/}
                                {/*    <TableFront*/}
                                {/*      data={phones}*/}
                                {/*      columns={phonesColumns}*/}
                                {/*    />*/}
                                {/*  </div>*/}
                                {/*) : null}*/}
                                {/*{emails ? (*/}
                                {/*  <div className="row_table">*/}
                                {/*    <Title Tag="h3">Почты</Title>*/}
                                {/*    <TableFront*/}
                                {/*      data={emails}*/}
                                {/*      columns={emailColumns}*/}
                                {/*    />*/}
                                {/*  </div>*/}
                                {/*) : null}*/}
                              </div>
                            </>
                          )}
                        </AccordionListItem>
                      );
                    },
                  )}
                </AccordionList>
              ) : null}
            </div>
          );
        })}
      </>
    </div>
  );
};

export default LeakCheckFoundData;
