import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";
import { ReactComponent as AngleUp } from "assets/images/angle_up.svg";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { carBrands } from "assets/auto_logos/logos";
import React, { useContext, useId, useState } from "react";
import NoImage from "assets/auto_logos/no_logo.png";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import ExpandCard from "components/app/base/ExpandCard";
import ExpandCards from "components/app/base/ExpandCards";
import { ThemeContext } from "store/context/themeContextProvider";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TableNewAuto = ({ data, handleCustomModal, exportXML }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [visibleOwners, setVisibleOwners] = useState([]);
  const cardOwnerId = useId();
  const cardOwnerId2 = useId();
  const cardsAutoInfoId = useId();
  const cardsCarOwnersId = useId();
  const cardsCarDriversId = useId();

  const handleVisibleOwnerById = (id) => {
    setVisibleOwners((prevOpenCards) => ({
      ...prevOpenCards,
      [id]: !prevOpenCards[id],
    }));
  };

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица АВТО(new)</Title>
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
            {(data?.lastname || data?.firstname || data?.patronymic) && (
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
                      {data?.lastname} {data?.firstname} {data?.patronymic}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {data?.dob && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Profile}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Дата рождения
                    </Title>
                    <p>
                      {moment(data?.dob).format("YYYY-MM-DD")} -{" "}
                      {moment().diff(`${data?.dob}`, "years")} лет
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {data?.phone && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4" Icon={Phone}>
                      Телефон
                    </Title>
                    <p>{data?.phone}</p>
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
        <ExpandCards>
          {data ? (
            <>
              {data?.autoInfo?.length ? (
                <div
                  className="expand_cards_row expand_cards_colored_row"
                  style={{ display: "block" }}
                >
                  <Title Tag="h3">Данные об искомом авто</Title>
                  <div className="expand_cards_row expand_cards_row_auto">
                    {data?.autoInfo?.map(
                      (
                        {
                          yearIssue,
                          vin,
                          body_number,
                          brand,
                          chassis_number,
                          enginePower,
                          is_taxi,
                          license_plate,
                          model,
                          veh_doc_date,
                          veh_doc_number,
                          veh_doc_serial,
                          mark_model_other,
                        },
                        i,
                      ) => {
                        const brandLogo = carBrands?.find(
                          ({ name }) => name === brand,
                        )?.logo;
                        return (
                          <div key={uuid()} style={{ marginTop: "24px" }}>
                            <ExpandCard
                              withParentActions
                              id={`newAuto${i}.${cardsAutoInfoId}autoInfo`}
                              title={
                                <img
                                  src={brandLogo || NoImage}
                                  width="26"
                                  height="26"
                                  style={{
                                    borderRadius: "4px",
                                    background: "#FFFFFF",
                                  }}
                                  alt=""
                                />
                              }
                            >
                              {/*first <></> = visible content*/}
                              <>
                                <div>
                                  <div className="expand_content_title">
                                    VIN код
                                  </div>
                                  <p>{vin || "-"}</p>
                                </div>
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "8px",
                                  }}
                                >
                                  <div>
                                    <div className="expand_content_title">
                                      Номерной знак
                                    </div>
                                    <p>{license_plate || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Год выпуска
                                    </div>
                                    <p>{yearIssue || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Марка
                                    </div>
                                    <p>{brand || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Модель
                                    </div>
                                    <p>{model || "-"}</p>
                                  </div>
                                </div>
                              </>
                              {/*second <></> = hide content*/}
                              <>
                                {mark_model_other && (
                                  <div>
                                    <div className="expand_content_title">
                                      Доп. Марка
                                    </div>
                                    <p>{mark_model_other || "-"}</p>
                                  </div>
                                )}
                                <div>
                                  <div className="expand_content_title">
                                    Мощность двигателя
                                  </div>
                                  <p>{enginePower || "-"}</p>
                                </div>
                                <div>
                                  <div className="expand_content_title">
                                    Номер шасси
                                  </div>
                                  <p>{chassis_number || "-"}</p>
                                </div>
                                <div>
                                  <div className="expand_content_title">
                                    Номер кузова
                                  </div>
                                  <p>{body_number || "-"}</p>
                                </div>
                                <div className="expand_content_divider"></div>
                                <div>
                                  <div className="expand_content_title">
                                    Дата выдачи документа на ТС
                                  </div>
                                  <p>{veh_doc_date || "-"}</p>
                                </div>
                                <div>
                                  <div className="expand_content_title">
                                    Серия\номер документа на ТС
                                  </div>
                                  <p>
                                    {veh_doc_serial || "-"} \ {veh_doc_number}
                                  </p>
                                </div>
                                <div className="expand_content_divider"></div>
                                <div>
                                  <div className="expand_content_title">
                                    Использовалась в такси
                                  </div>
                                  <p>
                                    {is_taxi === "0"
                                      ? "Нет"
                                      : is_taxi === "1"
                                      ? "Да"
                                      : "Нет"}
                                  </p>
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

              {data?.owners?.length ? (
                <>
                  <div
                    className="expand_cards_row expand_cards_colored_row"
                    style={{ display: "block" }}
                  >
                    <div>
                      <Title Tag="h3">Владельцы искомого авто</Title>
                      <div
                        className="accordion_list"
                        style={{ marginTop: "24px" }}
                      >
                        <ReactTooltip
                          id="car-owners-tooltip"
                          className={`kermit_tooltip ${
                            isDarkTheme ? "" : "tooltip_light"
                          }`}
                          place="top"
                        />
                        {data?.owners?.map(
                          (
                            { documents, dob, firstname, lastname, patronymic },
                            i,
                          ) => {
                            const id = `newAuto${i}.owner${cardOwnerId2}${i}`;
                            return (
                              <div
                                className="accordion_col accordion_col_auto"
                                key={uuid()}
                              >
                                <Card>
                                  <div
                                    style={{
                                      background: isDarkTheme ? "" : "white",
                                    }}
                                  >
                                    <div className="details_div">
                                      <div className="details_label">ФИО</div>
                                      <p>
                                        {lastname} {firstname} {patronymic}
                                      </p>
                                    </div>
                                    <div className="details_div">
                                      <div className="details_label">
                                        Дата рождения
                                      </div>
                                      <p>
                                        {moment(dob).format("YYYY-MM-DD") ||
                                          "-"}
                                      </p>
                                    </div>
                                    {documents?.length ? (
                                      <>
                                        <div
                                          onClick={() =>
                                            handleVisibleOwnerById(id)
                                          }
                                          className="show_all"
                                        >
                                          {visibleOwners?.[id]
                                            ? "Скрыть"
                                            : "Показать"}{" "}
                                          документы
                                          {visibleOwners?.[id] ? (
                                            <AngleUp />
                                          ) : (
                                            <AngleDown />
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            overflow: "hidden",
                                            height: `${
                                              visibleOwners?.[id]
                                                ? "fit-content"
                                                : "0"
                                            }`,
                                            display: "grid",
                                            gap: "12px",
                                            cursor: "pointer",
                                            marginTop: `${
                                              visibleOwners?.[id] ? "16px" : "0"
                                            }`,
                                          }}
                                        >
                                          {documents?.map(
                                            ({
                                              doc_type,
                                              doc_number,
                                              doc_serial,
                                              date_from,
                                            }) => {
                                              return (
                                                <div
                                                  className="details_documents_container"
                                                  key={uuid()}
                                                  style={{
                                                    background: isDarkTheme
                                                      ? ""
                                                      : "white",
                                                  }}
                                                >
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      Тип документа
                                                    </div>
                                                    <p>{doc_type || "-"}</p>
                                                  </div>
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      Номер / Серия
                                                    </div>
                                                    <p>
                                                      {doc_number || "-"} /{" "}
                                                      {doc_serial || "-"}
                                                    </p>
                                                  </div>
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      Дата выдачи
                                                    </div>
                                                    <p>{date_from || "-"}</p>
                                                  </div>
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      </>
                                    ) : null}
                                  </div>
                                </Card>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {data?.drivers?.length ? (
                <>
                  <div
                    className="expand_cards_row expand_cards_colored_row"
                    style={{ display: "block" }}
                  >
                    <div>
                      <Title Tag="h3">Имеют доступ к искомому авто</Title>
                      <div
                        className="accordion_list"
                        style={{ marginTop: "24px" }}
                      >
                        <ReactTooltip
                          id="driver-tooltip"
                          className={`kermit_tooltip ${
                            isDarkTheme ? "" : "tooltip_light"
                          }`}
                          place="top"
                        />
                        {data?.drivers?.map(
                          (
                            { documents, dob, firstname, lastname, patronymic },
                            i,
                          ) => {
                            const id = `driver${cardOwnerId2}${i + 2}`;
                            return (
                              <div
                                className="accordion_col accordion_col_auto"
                                key={uuid()}
                              >
                                <Card>
                                  <div
                                    style={{
                                      background: isDarkTheme ? "" : "white",
                                    }}
                                  >
                                    <div className="details_div">
                                      <div className="details_label">ФИО</div>
                                      <p>
                                        {lastname} {firstname} {patronymic}
                                      </p>
                                    </div>
                                    <div className="details_div">
                                      <div className="details_label">
                                        Дата рождения
                                      </div>
                                      <p>
                                        {moment(dob).format("YYYY-MM-DD") ||
                                          "-"}
                                      </p>
                                    </div>
                                    {documents?.length ? (
                                      <>
                                        <div
                                          onClick={() =>
                                            handleVisibleOwnerById(id)
                                          }
                                          className="show_all"
                                        >
                                          {visibleOwners?.[id]
                                            ? "Скрыть"
                                            : "Показать"}{" "}
                                          документы
                                          {visibleOwners?.[id] ? (
                                            <AngleUp />
                                          ) : (
                                            <AngleDown />
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            overflow: "hidden",
                                            height: `${
                                              visibleOwners?.[id]
                                                ? "fit-content"
                                                : "0"
                                            }`,
                                            display: "grid",
                                            gap: "12px",
                                            cursor: "pointer",
                                            marginTop: `${
                                              visibleOwners?.[id] ? "16px" : "0"
                                            }`,
                                          }}
                                        >
                                          {documents?.map(
                                            ({
                                              doc_type,
                                              doc_number,
                                              doc_serial,
                                              date_from,
                                            }) => {
                                              return (
                                                <div
                                                  className="details_documents_container"
                                                  key={uuid()}
                                                  style={{
                                                    background: isDarkTheme
                                                      ? ""
                                                      : "white",
                                                  }}
                                                >
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      Тип документа
                                                    </div>
                                                    <p>{doc_type || "-"}</p>
                                                  </div>
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      Номер / Серия
                                                    </div>
                                                    <p>
                                                      {doc_number || "-"} /{" "}
                                                      {doc_serial || "-"}
                                                    </p>
                                                  </div>
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      Дата выдачи
                                                    </div>
                                                    <p>{date_from || "-"}</p>
                                                  </div>
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      </>
                                    ) : null}
                                  </div>
                                </Card>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {data?.userInfo?.length ? (
                <>
                  <div
                    className="expand_cards_row expand_cards_colored_row"
                    style={{ display: "block" }}
                  >
                    <div>
                      <Title Tag="h3">Личные данные</Title>
                      <div
                        className="accordion_list"
                        style={{ marginTop: "24px" }}
                      >
                        {data?.userInfo?.map(
                          (
                            {
                              documents,
                              dob,
                              first_name,
                              lastname,
                              patronymic,
                              id,
                            },
                            i,
                          ) => {
                            const userDocumentId = `newAuto${i}.userInfo${id}.${i}.document`;
                            return (
                              <div className="accordion_col " key={uuid()}>
                                <Card>
                                  <div className="details_div">
                                    <div className="details_label">ФИО</div>
                                    <p>
                                      {lastname} {first_name} {patronymic}
                                    </p>
                                  </div>
                                  <div className="details_div">
                                    <div className="details_label">
                                      Дата рождения
                                    </div>
                                    <p>
                                      {moment(dob).format("YYYY-MM-DD") || "-"}
                                    </p>
                                  </div>
                                  {documents?.length ? (
                                    <>
                                      <div
                                        onClick={() =>
                                          handleVisibleOwnerById(userDocumentId)
                                        }
                                        className="show_all"
                                      >
                                        {visibleOwners?.[userDocumentId]
                                          ? "Скрыть"
                                          : "Показать"}{" "}
                                        Документы
                                        {visibleOwners?.[userDocumentId] ? (
                                          <AngleUp />
                                        ) : (
                                          <AngleDown />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          overflow: "hidden",
                                          height: `${
                                            visibleOwners?.[userDocumentId]
                                              ? "fit-content"
                                              : "0"
                                          }`,
                                          display: "grid",
                                          gap: "12px",
                                          cursor: "pointer",
                                          marginTop: `${
                                            visibleOwners?.[userDocumentId]
                                              ? "16px"
                                              : "0"
                                          }`,
                                        }}
                                      >
                                        <ReactTooltip
                                          id="owner-tooltip"
                                          className={`kermit_tooltip ${
                                            isDarkTheme ? "" : "tooltip_light"
                                          }`}
                                          place="top"
                                        />
                                        {documents?.map(
                                          ({
                                            date_from,
                                            doc_number,
                                            doc_serial,
                                            doc_type,
                                          }) => {
                                            return (
                                              <div
                                                className="details_documents_container"
                                                key={uuid()}
                                              >
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Тип документа
                                                  </div>
                                                  <p>{doc_type || "-"}</p>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Номер / Серия
                                                  </div>
                                                  <p>
                                                    {doc_number || "-"} /{" "}
                                                    {doc_serial || "-"}
                                                  </p>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Дата выдачи
                                                  </div>
                                                  <p>{date_from || "-"}</p>
                                                </div>
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                </Card>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {data?.carOwners?.length ? (
                <>
                  <div
                    className="expand_cards_row expand_cards_colored_row"
                    style={{ display: "block" }}
                  >
                    <Title Tag="h3">Является владельцем авто</Title>
                    <div className="expand_cards_row expand_cards_row_auto">
                      {data?.carOwners?.map(
                        (
                          {
                            yearIssue,
                            vin,
                            body_number,
                            brand,
                            chassis_number,
                            enginePower,
                            is_taxi,
                            license_plate,
                            model,
                            veh_doc_date,
                            veh_doc_number,
                            veh_doc_serial,
                            id,
                            drivers,
                            mark_model_other,
                          },
                          i,
                        ) => {
                          const brandLogo = carBrands?.find(
                            ({ name }) => name === brand,
                          )?.logo;
                          const ownersDriversId = `newAuto${i}.carOwners${cardsCarOwnersId}${id}.drivers`;
                          return (
                            <div key={uuid()} style={{ marginTop: "24px" }}>
                              <ExpandCard
                                withParentActions
                                id={`newAuto${i}.${cardsCarOwnersId}${id}carOwners`}
                                subId={ownersDriversId}
                                subTitleShow="допущеных к управлению"
                                title={
                                  <img
                                    src={brandLogo || NoImage}
                                    width="36"
                                    height="36"
                                    style={{
                                      borderRadius: "4px",
                                      background: "#FFFFFF",
                                    }}
                                    alt=""
                                  />
                                }
                              >
                                {/*first <></> = visible content*/}
                                <>
                                  <div>
                                    <div className="expand_content_title">
                                      VIN код
                                    </div>
                                    <p>{vin || "-"}</p>
                                  </div>
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(2, 1fr)",
                                      gap: "8px",
                                    }}
                                  >
                                    <div>
                                      <div className="expand_content_title">
                                        Номерной знак
                                      </div>
                                      <p>{license_plate || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Год выпуска
                                      </div>
                                      <p>{yearIssue || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Марка
                                      </div>
                                      <p>{brand || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Модель
                                      </div>
                                      <p>{model || "-"}</p>
                                    </div>
                                  </div>
                                </>
                                {/*second <></> = hide content*/}
                                <>
                                  {mark_model_other && (
                                    <div>
                                      <div className="expand_content_title">
                                        Доп. Марка
                                      </div>
                                      <p>{mark_model_other || "-"}</p>
                                    </div>
                                  )}
                                  <div>
                                    <div className="expand_content_title">
                                      Мощность двигателя
                                    </div>
                                    <p>{enginePower || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Номер шасси
                                    </div>
                                    <p>{chassis_number || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Номер кузова
                                    </div>
                                    <p>{body_number || "-"}</p>
                                  </div>
                                  <div className="expand_content_divider"></div>
                                  <div>
                                    <div className="expand_content_title">
                                      Дата выдачи документа на ТС
                                    </div>
                                    <p>{veh_doc_date || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Серия\номер документа на ТС
                                    </div>
                                    <p>
                                      {veh_doc_serial || "-"} \ {veh_doc_number}
                                    </p>
                                  </div>
                                  <div className="expand_content_divider"></div>
                                  <div>
                                    <div className="expand_content_title">
                                      Использовалась в такси
                                    </div>
                                    <p>
                                      {is_taxi === "0"
                                        ? "Нет"
                                        : is_taxi === "1"
                                        ? "Да"
                                        : "Нет"}
                                    </p>
                                  </div>
                                </>
                                {/*third <></> = hide sub content*/}
                                {drivers?.length ? (
                                  <>
                                    <div
                                      style={{
                                        display: "grid",
                                        gap: "16px",
                                        cursor: "pointer",
                                        marginTop: "16px",
                                      }}
                                    >
                                      {drivers?.map(
                                        ({
                                          dob,
                                          firstname,
                                          lastname,
                                          patronymic,
                                        }) => {
                                          return (
                                            <div
                                              className="details_documents_container"
                                              style={{
                                                background: isDarkTheme
                                                  ? ""
                                                  : "white",
                                              }}
                                              key={uuid()}
                                            >
                                              <div className="details_div">
                                                <div className="details_label">
                                                  ФИО
                                                </div>
                                                <p>
                                                  {lastname} {firstname}{" "}
                                                  {patronymic}
                                                </p>
                                              </div>
                                              <div className="details_div">
                                                <div className="details_label">
                                                  Дата рождения
                                                </div>
                                                <p>
                                                  {moment(dob).format(
                                                    "YYYY-MM-DD",
                                                  ) || "-"}
                                                </p>
                                              </div>
                                            </div>
                                          );
                                        },
                                      )}
                                    </div>
                                  </>
                                ) : null}
                              </ExpandCard>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </>
              ) : null}

              {data?.carDrivers?.length ? (
                <>
                  <div
                    className="expand_cards_row expand_cards_colored_row"
                    style={{ display: "block" }}
                  >
                    <Title Tag="h3">Допущен к управлению</Title>
                    <div className="expand_cards_row expand_cards_row_auto">
                      {data?.carDrivers?.map(
                        (
                          {
                            carOwners,
                            yearIssue,
                            vin,
                            body_number,
                            brand,
                            chassis_number,
                            enginePower,
                            is_taxi,
                            license_plate,
                            model,
                            veh_doc_date,
                            veh_doc_number,
                            veh_doc_serial,
                            mark_model_other,
                          },
                          i,
                        ) => {
                          const filteredOwnersById = carOwners?.filter(
                            (obj, index, self) =>
                              index === self.findIndex((o) => o.id === obj.id),
                          );
                          const id = `newAuto${i}.${cardOwnerId}${i}${
                            filteredOwnersById?.find((i) => i.id)?.id
                          }`;
                          const brandLogo = carBrands?.find(
                            ({ name }) => name === brand,
                          )?.logo;
                          return (
                            <div key={uuid()} style={{ marginTop: "24px" }}>
                              <ExpandCard
                                withParentActions
                                id={`newAuto${i}.${cardsCarDriversId}${id}.carDrivers`}
                                subId={id}
                                subTitleShow="владельцев"
                                title={
                                  <img
                                    src={brandLogo || NoImage}
                                    width="36"
                                    height="36"
                                    style={{
                                      borderRadius: "4px",
                                      background: "#FFFFFF",
                                    }}
                                    alt=""
                                  />
                                }
                              >
                                {/*first <></> = visible content*/}
                                <>
                                  <div>
                                    <div className="expand_content_title">
                                      VIN код
                                    </div>
                                    <p>{vin || "-"}</p>
                                  </div>
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(2, 1fr)",
                                      gap: "8px",
                                    }}
                                  >
                                    <div>
                                      <div className="expand_content_title">
                                        Номерной знак
                                      </div>
                                      <p>{license_plate || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Год выпуска
                                      </div>
                                      <p>{yearIssue || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Марка
                                      </div>
                                      <p>{brand || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Модель
                                      </div>
                                      <p>{model || "-"}</p>
                                    </div>
                                  </div>
                                </>
                                {/*second <></> = hide content*/}
                                <>
                                  {mark_model_other && (
                                    <div>
                                      <div className="expand_content_title">
                                        Доп. Марка
                                      </div>
                                      <p>{mark_model_other || "-"}</p>
                                    </div>
                                  )}
                                  <div>
                                    <div className="expand_content_title">
                                      Мощность двигателя
                                    </div>
                                    <p>{enginePower || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Номер шасси
                                    </div>
                                    <p>{chassis_number || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Номер кузова
                                    </div>
                                    <p>{body_number || "-"}</p>
                                  </div>
                                  <div className="expand_content_divider"></div>
                                  <div>
                                    <div className="expand_content_title">
                                      Дата выдачи документа на ТС
                                    </div>
                                    <p>{veh_doc_date || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Серия\номер документа на ТС
                                    </div>
                                    <p>
                                      {veh_doc_serial || "-"} \ {veh_doc_number}
                                    </p>
                                  </div>
                                  <div className="expand_content_divider"></div>
                                  <div>
                                    <div className="expand_content_title">
                                      Использовалась в такси
                                    </div>
                                    <p>
                                      {is_taxi === "0"
                                        ? "Нет"
                                        : is_taxi === "1"
                                        ? "Да"
                                        : "Нет"}
                                    </p>
                                  </div>
                                </>
                                {/*third <></> = hide sub content*/}
                                {filteredOwnersById?.length ? (
                                  <>
                                    <div
                                      style={{
                                        display: "grid",
                                        gap: "16px",
                                        cursor: "pointer",
                                        marginTop: "16px",
                                      }}
                                    >
                                      {filteredOwnersById?.map(
                                        ({
                                          dob,
                                          firstname,
                                          lastname,
                                          patronymic,
                                        }) => {
                                          return (
                                            <div
                                              className="details_documents_container"
                                              style={{
                                                background: isDarkTheme
                                                  ? ""
                                                  : "white",
                                              }}
                                              key={uuid()}
                                            >
                                              <div className="details_div">
                                                <div className="details_label">
                                                  ФИО
                                                </div>
                                                <p>
                                                  {lastname} {firstname}{" "}
                                                  {patronymic}
                                                </p>
                                              </div>
                                              <div className="details_div">
                                                <div className="details_label">
                                                  Дата рождения
                                                </div>
                                                <p>
                                                  {moment(dob).format(
                                                    "YYYY-MM-DD",
                                                  ) || "-"}
                                                </p>
                                              </div>
                                            </div>
                                          );
                                        },
                                      )}
                                    </div>
                                  </>
                                ) : null}
                              </ExpandCard>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </ExpandCards>
      </div>
    </div>
  );
};

export default TableNewAuto;
