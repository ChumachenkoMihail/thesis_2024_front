import React, { memo, useCallback, useContext, useId, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import ReactDOMServer from "react-dom/server";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import Title from "components/app/use/Title";
import ExpandCard from "components/app/base/ExpandCard";
import NoImage from "assets/auto_logos/no_logo.png";
import { carBrands } from "assets/auto_logos/logos";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Card from "components/app/base/Card";
import moment from "moment/moment";
import { searchAnkets } from "store/thunks/searchThunks";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";
import { ReactComponent as AngleUp } from "assets/images/angle_up.svg";
import { ReactComponent as Car } from "assets/images/car.svg";
import { ThemeContext } from "store/context/themeContextProvider";

const Auto = ({ data, searchByOwner }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const cardsAutoInfoId = useId();
  const cardOwnerId = useId();
  const cardOwnerId2 = useId();
  const cardsCarOwnersId = useId();
  const cardsCarDriversId = useId();
  const carOwnerDocumentId = useId();
  const [visibleOwners, setVisibleOwners] = useState([]);

  const handleVisibleOwnerById = useCallback(
    (id) => {
      setVisibleOwners((prevOpenCards) => ({
        ...prevOpenCards,
        [id]: !prevOpenCards[id],
      }));
    },
    [visibleOwners],
  );
  const handleNewSearchByOwner = (e, obj) => {
    e.preventDefault();
    const current = moment().format("YYYY");
    const check = moment(obj?.dob, "YYYY/MM/DD");
    const month = check.format("M");
    const day = check.format("D");
    const year = check.format("YYYY");
    const updatesValues = {
      firstName: obj?.firstname,
      lastName: obj?.lastname,
      parentName: obj?.patronymic,
      dateOfBirth: {
        from: {
          year: current < year ? "" : year,
          month: month,
          day: day,
        },
        to: {
          year: current < year ? "" : year,
          month: month,
          day: day,
        },
      },
    };
    dispatch(searchAnkets(updatesValues));
  };

  return (
    <Accordion title="Данные по авто(new)" Icon={Car}>
      <>
        <ExpandCards>
          {data.map(
            (
              { userInfo, carDrivers, carOwners, autoInfo, drivers, owners },
              i,
            ) => {
              return (
                <React.Fragment key={uuid()}>
                  {autoInfo?.length ? (
                    <div
                      className="expand_cards_row expand_cards_colored_row"
                      style={{ display: "block" }}
                    >
                      <Title Tag="h3">Данные об искомом авто</Title>
                      <div className="expand_cards_row expand_cards_row_auto">
                        {autoInfo?.map(
                          ({
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
                            id,
                          }) => {
                            const brandLogo = carBrands?.find(
                              ({ name }) => name === brand,
                            )?.logo;
                            return (
                              <div key={uuid()} style={{ marginTop: "24px" }}>
                                <ExpandCard
                                  withParentActions
                                  id={`newAuto${i}.${cardsAutoInfoId}${id}autoInfo`}
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
                                        {veh_doc_serial || "-"} \{" "}
                                        {veh_doc_number}
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

                  {owners?.length ? (
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
                            {owners?.map(
                              (
                                {
                                  documents,
                                  dob,
                                  firstname,
                                  lastname,
                                  patronymic,
                                  id,
                                },
                                ownerIndex,
                              ) => {
                                const ownerId = `newAuto${i}.owner${cardOwnerId2}${ownerIndex}`;
                                const documentIndex = documents?.map(
                                  (_, docIndex) => docIndex,
                                );
                                const docID = `${ownerId}.documents[${documentIndex[ownerIndex]}]-${id}`;

                                return (
                                  <div
                                    className="accordion_col accordion_col_auto"
                                    key={uuid()}
                                  >
                                    <Card>
                                      <div
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                          <div>
                                            <p>
                                              Клик правой кнопкой мыши начнет
                                              новый поиск по пользователю
                                            </p>
                                            <p>
                                              {lastname} {firstname}{" "}
                                              {patronymic}
                                            </p>
                                          </div>,
                                        )}
                                        data-tooltip-id="car-owners-tooltip"
                                        style={{
                                          cursor: "pointer",
                                          background: isDarkTheme
                                            ? ""
                                            : "white",
                                        }}
                                        onContextMenu={(e) =>
                                          handleNewSearchByOwner(e, {
                                            dob,
                                            firstname,
                                            lastname,
                                            patronymic,
                                          })
                                        }
                                      >
                                        <div className="details_div">
                                          <div className="details_label">
                                            ФИО
                                          </div>
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
                                                handleVisibleOwnerById(docID)
                                              }
                                              className="show_all"
                                            >
                                              {visibleOwners?.[docID]
                                                ? "Скрыть"
                                                : "Показать"}{" "}
                                              документы
                                              {visibleOwners?.[docID] ? (
                                                <AngleUp />
                                              ) : (
                                                <AngleDown />
                                              )}
                                            </div>
                                            <div
                                              style={{
                                                overflow: "hidden",
                                                height: `${
                                                  visibleOwners?.[docID]
                                                    ? "fit-content"
                                                    : "0"
                                                }`,
                                                display: "grid",
                                                gap: "12px",
                                                cursor: "pointer",
                                                marginTop: `${
                                                  visibleOwners?.[docID]
                                                    ? "16px"
                                                    : "0"
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
                                                        <p>
                                                          {date_from || "-"}
                                                        </p>
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

                  {drivers?.length ? (
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
                            {drivers?.map(
                              (
                                {
                                  documents,
                                  dob,
                                  firstname,
                                  lastname,
                                  patronymic,
                                  id,
                                },
                                driverIndex,
                              ) => {
                                const driverId = `driver${cardOwnerId2}${
                                  driverIndex + 2
                                }`;
                                const documentIndex = documents?.map(
                                  (_, docIndex) => docIndex,
                                );
                                const driverDocID = `${driverId}.documents[${documentIndex[driverIndex]}]${id}`;
                                return (
                                  <div
                                    className="accordion_col accordion_col_auto"
                                    key={uuid()}
                                  >
                                    <Card>
                                      <div
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                          <div>
                                            <p>
                                              Клик правой кнопкой мыши начнет
                                              новый поиск по пользователю
                                            </p>
                                            <p>
                                              {lastname} {firstname}{" "}
                                              {patronymic}
                                            </p>
                                          </div>,
                                        )}
                                        data-tooltip-id="driver-tooltip"
                                        style={{
                                          cursor: "pointer",
                                          background: isDarkTheme
                                            ? ""
                                            : "white",
                                        }}
                                        onContextMenu={(e) =>
                                          handleNewSearchByOwner(e, {
                                            dob,
                                            firstname,
                                            lastname,
                                            patronymic,
                                          })
                                        }
                                      >
                                        <div className="details_div">
                                          <div className="details_label">
                                            ФИО
                                          </div>
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
                                                handleVisibleOwnerById(
                                                  driverDocID,
                                                )
                                              }
                                              className="show_all"
                                            >
                                              {visibleOwners?.[driverDocID]
                                                ? "Скрыть"
                                                : "Показать"}{" "}
                                              документы
                                              {visibleOwners?.[driverDocID] ? (
                                                <AngleUp />
                                              ) : (
                                                <AngleDown />
                                              )}
                                            </div>
                                            <div
                                              style={{
                                                overflow: "hidden",
                                                height: `${
                                                  visibleOwners?.[driverDocID]
                                                    ? "fit-content"
                                                    : "0"
                                                }`,
                                                display: "grid",
                                                gap: "12px",
                                                marginTop: `${
                                                  visibleOwners?.[driverDocID]
                                                    ? "16px"
                                                    : "0"
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
                                                        <p>
                                                          {date_from || "-"}
                                                        </p>
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

                  {userInfo?.length ? (
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
                            {userInfo?.map(
                              (
                                {
                                  documents,
                                  dob,
                                  first_name,
                                  lastname,
                                  patronymic,
                                  userID: id,
                                },
                                userIndex,
                              ) => {
                                const userId = `newAuto${i}.userInfo${userIndex}.${i}`;

                                const documentIndex = documents?.map(
                                  (_, docIndex) => docIndex,
                                );
                                const userDocID = `${userId}.documents[${documentIndex[userIndex]}]`;
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
                                          {moment(dob).format("YYYY-MM-DD") ||
                                            "-"}
                                        </p>
                                      </div>
                                      {documents?.length ? (
                                        <>
                                          <div
                                            onClick={() =>
                                              handleVisibleOwnerById(userDocID)
                                            }
                                            className="show_all"
                                          >
                                            {visibleOwners?.[userDocID]
                                              ? "Скрыть"
                                              : "Показать"}{" "}
                                            Документы
                                            {visibleOwners?.[userDocID] ? (
                                              <AngleUp />
                                            ) : (
                                              <AngleDown />
                                            )}
                                          </div>
                                          <div
                                            style={{
                                              overflow: "hidden",
                                              height: `${
                                                visibleOwners?.[userDocID]
                                                  ? "fit-content"
                                                  : "0"
                                              }`,
                                              display: "grid",
                                              gap: "12px",
                                              cursor: "pointer",
                                              marginTop: `${
                                                visibleOwners?.[userDocID]
                                                  ? "16px"
                                                  : "0"
                                              }`,
                                            }}
                                          >
                                            <ReactTooltip
                                              id="owner-tooltip"
                                              className={`kermit_tooltip ${
                                                isDarkTheme
                                                  ? ""
                                                  : "tooltip_light"
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

                  {carOwners?.length ? (
                    <>
                      <div
                        className="expand_cards_row expand_cards_colored_row"
                        style={{ display: "block" }}
                      >
                        <Title Tag="h3">Является владельцем авто</Title>
                        <div className="expand_cards_row expand_cards_row_auto">
                          {carOwners.map(
                            ({
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
                            }) => {
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
                                          {veh_doc_serial || "-"} \{" "}
                                          {veh_doc_number}
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
                                          <ReactTooltip
                                            id="owner-tooltip"
                                            className={`kermit_tooltip ${
                                              isDarkTheme ? "" : "tooltip_light"
                                            }`}
                                            place="top"
                                          />
                                          {drivers?.map(
                                            ({
                                              dob,
                                              firstname,
                                              lastname,
                                              patronymic,
                                            }) => {
                                              return (
                                                <div
                                                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                                    <div>
                                                      <p>
                                                        Клик правой кнопкой мыши
                                                        начнет новый поиск по
                                                        пользователю
                                                      </p>
                                                      <p>
                                                        {lastname} {firstname}{" "}
                                                        {patronymic}
                                                      </p>
                                                    </div>,
                                                  )}
                                                  data-tooltip-id="owner-tooltip"
                                                  // data-tooltip-content={`Клик правой кнопкой мыши начнет новый поиск по  пользователю ${lastname} ${firstname} ${patronymic}`}
                                                  onContextMenu={(e) =>
                                                    handleNewSearchByOwner(e, {
                                                      dob,
                                                      firstname,
                                                      lastname,
                                                      patronymic,
                                                    })
                                                  }
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

                  {carDrivers?.length ? (
                    <>
                      <div
                        className="expand_cards_row expand_cards_colored_row"
                        style={{ display: "block" }}
                      >
                        <Title Tag="h3">Допущен к управлению</Title>
                        <div className="expand_cards_row expand_cards_row_auto">
                          {carDrivers?.map(
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
                                  index ===
                                  self.findIndex((o) => o.id === obj.id),
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
                                          {veh_doc_serial || "-"} \{" "}
                                          {veh_doc_number}
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
                                          <ReactTooltip
                                            id="owner-tooltip"
                                            className={`kermit_tooltip ${
                                              isDarkTheme ? "" : "tooltip_light"
                                            }`}
                                            place="top"
                                          />
                                          {filteredOwnersById?.map(
                                            ({
                                              dob,
                                              firstname,
                                              lastname,
                                              patronymic,
                                            }) => {
                                              return (
                                                <div
                                                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                                    <div>
                                                      <p>
                                                        Клик правой кнопкой мыши
                                                        начнет новый поиск по
                                                        пользователю
                                                      </p>
                                                      <p>
                                                        {lastname} {firstname}{" "}
                                                        {patronymic}
                                                      </p>
                                                    </div>,
                                                  )}
                                                  data-tooltip-id="owner-tooltip"
                                                  // data-tooltip-content={`Клик правой кнопкой мыши начнет новый поиск по  пользователю ${lastname} ${firstname} ${patronymic}`}
                                                  onContextMenu={(e) =>
                                                    handleNewSearchByOwner(e, {
                                                      dob,
                                                      firstname,
                                                      lastname,
                                                      patronymic,
                                                    })
                                                  }
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
                </React.Fragment>
              );
            },
          )}
        </ExpandCards>
      </>
    </Accordion>
  );
};

export default memo(Auto);
