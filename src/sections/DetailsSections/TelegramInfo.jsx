import React, { memo, useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import Accordion from "components/app/base/Accordion";
import { ReactComponent as Telegram } from "assets/images/telegram.svg";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";

import { generateTelegramColumn } from "libs/generatedСolumns/generateTelegramColumn";
import ExpandCards from "components/app/base/ExpandCards";
import Card from "components/app/base/Card";
import TagLink from "components/app/use/TagLink";
import Title from "components/app/use/Title";
import Button from "components/app/use/Button";
import HtmlExportTable from "components/app/base/Table/HtmlExportTable";
import { searchAnkets } from "store/thunks/searchThunks";
import { insightSearch } from "store/thunks/outsideApiThunks";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { searchActions } from "../../store/searchSlice";

const TelegramInfo = ({ data }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const handleSearchByPhoneHome = async (value) => {
    await dispatch(
      searchAnkets({
        matchingPercentage: {
          from: 90,
          to: 100,
        },
        phone: value,
      }),
    );
  };
  const updateSearchTelegram = async (insightInput, type, id) => {
    dispatch(searchActions.setLoading(true));
    await dispatch(
      insightSearch({
        insightInput: insightInput,
        id: id,
        inputType: type,
        requestType: "update",
        createHistoryRecord: false,
      }),
    );
    dispatch(searchActions.setLoading(false));
  };
  return (
    <>
      <Accordion title="Telegram" Icon={Telegram}>
        <div
          style={{
            display: "grid",
            gap: "32px",
          }}
        >
          {data?.map((item) => {
            const getTelegramInterestsColumn =
              generateTelegramColumn(item?.interests) || [];
            const unitedCategories = item?.interests
              ?.flatMap((cat) => cat?.cs)
              .filter(Boolean);
            const getTelegramCategoriesColumn =
              generateTelegramColumn(unitedCategories) || [];
            const unitedTags = unitedCategories
              ?.flatMap((t) => t?.ts)
              .filter(Boolean);
            const getTelegramTagsColumn =
              generateTelegramColumn(unitedTags).sort((a, b) => {
                if (a.accessor === "t" && b.accessor !== "t") {
                  return -1; // "t" comes first
                } else if (a.accessor !== "t" && b.accessor === "t") {
                  return 1; // "t" comes first
                } else {
                  return 0; // no change in order for other elements
                }
              }) || [];

            const telegramProfiles = item?.profiles?.split("\n");

            const regex =
              /(?:@(\w+)? \/ )?(.+?) \| (\d{4}-\d{2}-\d{2} \d{2}:\d{2})/g;
            const matches = item?.groups?.matchAll(regex);

            const groupArray = matches
              ? Array.from(matches, (match) => {
                  const [, nickName, groupName, date] = match;
                  return { nickName, groupName, date };
                })
              : null;
            return (
              <div>
                {item?.input && (
                  <Title Tag="h4" style={{ margin: "0 0 10px 0" }}>
                    Параметр поиска:
                    <span style={{ color: "#006eff" }}>{item.input}</span>
                  </Title>
                )}
                {item?.resultFromHistory ? (
                  <div className="wrapper_head accordion_wrapper_head">
                    {item?.timestamp ? (
                      <Title Tag="h4">
                        Дата запроса:
                        <span style={{ color: "#006eff" }}>
                          {moment(item.timestamp).format(
                            "YYYY-MM-DD HH:mm:ss",
                          ) || "-"}
                        </span>
                      </Title>
                    ) : null}
                    <Button
                      func={() =>
                        updateSearchTelegram(
                          item.input,
                          item?.inputType,
                          item.id,
                        )
                      }
                      text="Обновить"
                      mode="tretiary"
                    />
                  </div>
                ) : null}

                <ExpandCards>
                  <div
                    style={{
                      display: "grid",
                      gap: "15px",
                    }}
                  >
                    <div className="expand_cards_row expand_cards_row-2">
                      {groupArray?.length ? (
                        <Card>
                          <div className="details_div">
                            <div className="details_label">Группы</div>
                            {groupArray?.map(
                              ({ date, nickName, groupName }) => {
                                return (
                                  <p
                                    style={{
                                      marginBottom: "2px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                    key={uuid()}
                                  >
                                    {nickName ? (
                                      <TagLink
                                        href={`https://t.me/joinchat/${nickName}`}
                                        target="_blank"
                                      >
                                        {groupName || nickName}
                                      </TagLink>
                                    ) : (
                                      <>
                                        <p>{groupName}</p>
                                      </>
                                    )}
                                    <span style={{ marginLeft: "10px" }}>
                                      Добавл. {date || "-"}
                                    </span>
                                  </p>
                                );
                              },
                            )}
                          </div>
                        </Card>
                      ) : null}

                      {telegramProfiles?.length ? (
                        <Card>
                          <div className="details_div">
                            <div className="details_label">Профили</div>
                            {telegramProfiles?.map((profile) => {
                              const profileData = profile?.split("|");
                              const profileName = [
                                profileData?.[0]?.trim(),
                                profileData?.[1]?.trim(),
                              ].join(" ");
                              const profileNickName = profileData?.[2];
                              const profileDate =
                                profileData?.[profileData?.length - 1]?.trim();
                              return (
                                <p
                                  style={{
                                    marginBottom: "2px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                  key={uuid()}
                                >
                                  <span>
                                    {profileName || "-"} -
                                    {profileNickName || "-"}
                                  </span>
                                  <span style={{ marginLeft: "10px" }}>
                                    Изм. {profileDate || "-"}
                                  </span>
                                </p>
                              );
                            })}
                          </div>
                        </Card>
                      ) : null}
                    </div>
                    {item?.phones?.length ? (
                      <div className="expand_cards_row">
                        <ReactTooltip
                          id="tg_search_tooltip"
                          className={`kermit_tooltip ${
                            isDarkTheme ? "" : "tooltip_light"
                          }`}
                        />
                        <Card>
                          <div className="details_div">
                            <div className="details_label">Телефоны</div>
                            {item?.phones?.map((phone) => {
                              return (
                                <div
                                  key={uuid()}
                                  className="details_desc"
                                  style={{ margin: "0 0 5px 0" }}
                                >
                                  {phone || "-"}
                                  <div
                                    onClick={() =>
                                      handleSearchByPhoneHome(phone)
                                    }
                                    className="phone_tg_action"
                                    data-tooltip-id="tg_search_tooltip"
                                    data-tooltip-content="Запустить основной поиск по этому телефону"
                                    data-tooltip-place="top"
                                  >
                                    <SearchLoop width="15px" height="15px" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      </div>
                    ) : null}
                  </div>
                </ExpandCards>
                <div>
                  {item?.interests?.length ? (
                    <div
                      style={{
                        display: "grid",
                        gap: "15px",
                        marginTop: "24px",
                      }}
                    >
                      <Title Tag="h4">Интересы</Title>
                      <HtmlExportTable
                        isDarkTheme={isDarkTheme}
                        data={item?.interests}
                        columns={getTelegramInterestsColumn}
                        size="small"
                      />
                    </div>
                  ) : null}
                  {unitedCategories?.length ? (
                    <div
                      style={{
                        display: "grid",
                        gap: "15px",
                        marginTop: "24px",
                      }}
                    >
                      <Title Tag="h4">Категории</Title>
                      <HtmlExportTable
                        isDarkTheme={isDarkTheme}
                        data={unitedCategories}
                        columns={getTelegramCategoriesColumn}
                        size="small"
                      />
                    </div>
                  ) : null}
                  {unitedTags?.length ? (
                    <div
                      style={{
                        display: "grid",
                        gap: "15px",
                        marginTop: "24px",
                      }}
                    >
                      <Title Tag="h4">Теги</Title>
                      <HtmlExportTable
                        isDarkTheme={isDarkTheme}
                        data={unitedTags}
                        columns={getTelegramTagsColumn}
                        size="small"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </Accordion>
    </>
  );
};

export default memo(TelegramInfo);
