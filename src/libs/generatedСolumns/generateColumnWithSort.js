import { useState } from "react";
import NoImage from "assets/images/no_image.jpg";
import moment from "moment";
import Button from "components/app/use/Button";
import { ReactComponent as Cancel } from "assets/images/cancel.svg";
import { ReactComponent as Edit } from "assets/images/pencil_edit.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Check } from "assets/images/user_checked.svg";
import { getFirstKeysFromObj } from "libs/helpers";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import { ReactComponent as MoreLess } from "assets/images/more_less_icon.svg";
export const createColumns = (data, removeAction = null, editAction = null) => {
  const keys = getFirstKeysFromObj(data); // get the all keys
  return keys
    ?.map((key) => {
      /// custom profiles
      if (key === "logo") {
        return {
          Header: "Фото",
          accessor: "logo",
          id: "logo",
          disableSortBy: true,
          className: "table_image",
          width: 50,
          Cell: ({ row: { original } }) => {
            // custom cell renderer for the  column
            return (
              <>
                <ReactTooltip
                  id="my-tooltip-data-html"
                  className="kermit_image_tooltip"
                  place="right"
                />
                <div className="user_image">
                  {original.logo ? (
                    <img
                      src={`data:image/png;base64,${original.logo}`}
                      alt=""
                      data-tooltip-id="my-tooltip-data-html"
                      data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                        <img
                          src={`data:image/png;base64,${original.logo}`}
                          alt="Your Image"
                        />,
                      )}
                    />
                  ) : (
                    <img src={NoImage} alt="" />
                  )}
                </div>
              </>
            );
          },
        };
      }
      if (key === "name") {
        return {
          Header: "Название",
          accessor: key,
          id: key,
          className: "tableColumn",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "createdAt") {
        return {
          Header: "Дата создания",
          accessor: "createdAt",
          id: "createdAt",
          className: "tableColumn",
          Cell: ({ cell: { value } }) =>
            value ? moment(value).format("YYYY-MM-DD") : "-",
        };
      }
      if (key === "updatedAt") {
        return {
          Header: "Последнее изменение",
          accessor: "updatedAt",
          id: "updatedAt",
          className: "tableColumn",
          Cell: ({ cell: { value } }) =>
            value ? moment(value).format("YYYY-MM-DD") : "-",
        };
      }
      if (key === "id" && removeAction && editAction) {
        return {
          Header: " ",
          disableSortBy: true,
          id: "action",
          accessor: "action",
          width: 50,
          className: "table_action action_edit",
          Cell: ({ row: { original } }) => {
            return (
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                <Button
                  style={{
                    padding: "10px",
                  }}
                  mode="tretiary"
                  Icon={
                    Object.keys(original?.data)?.length === 0 ? Cancel : Edit
                  }
                  disabled={Object.keys(original?.data)?.length === 0}
                  func={(e) => editAction(e, original.id)}
                />

                <Button
                  style={{
                    padding: "10px",
                  }}
                  mode="tretiary"
                  Icon={Trash}
                  func={(e) => removeAction(e, original.id)}
                />
              </div>
            );
          },
        };
      }
      /// end custom profiles

      if (key === "lastname") {
        return {
          Header: "ФИО",
          accessor: "lastname",
          id: (row) => `${row.firstname} ${row.lastname}`,
          className: "tableColumn",
          Cell: ({ row: { original } }) => {
            return (
              <div className="user_column in_folder_user">
                <p>
                  {original?.folders?.length ? <Check /> : null}
                  {original.lastname || "-"}
                </p>
                <p>
                  {original.firstname || original.first_name || "-"}{" "}
                  {original.patronymic || "-"}
                </p>
              </div>
            );
          },
        };
      }
      if (key === "bookmarkId") {
        return {
          Header: " ",
          disableSortBy: true,
          accessor: "action",
          className: "table_action action_remove",
          width: 50,
          Cell: ({ row: { original } }) => {
            return (
              <div>
                <Button
                  style={{
                    padding: "10px",
                  }}
                  mode={"tretiary"}
                  Icon={Trash}
                  func={(e) => removeAction(e, original.id)}
                />
              </div>
            );
          },
          // accessor: (originalRow, rowIndex) => (
          //     <div>
          //         <Button
          //             Icon={Trash}
          //             func={() => removeAction()}
          //         />
          //     </div>
          // ),
          id: "action",
        };
      }
      if (key === "removeID") {
        return {
          Header: " ",
          disableSortBy: true,
          accessor: "action",
          className: "table_action action_remove",
          width: 50,
          Cell: ({ row: { original } }) => {
            return (
              <div>
                <Button
                  style={{
                    padding: "10px",
                  }}
                  mode={"tretiary"}
                  Icon={Trash}
                  func={(e) => removeAction(e, original.id)}
                />
              </div>
            );
          },
          // accessor: (originalRow, rowIndex) => (
          //     <div>
          //         <Button
          //             Icon={Trash}
          //             func={() => removeAction()}
          //         />
          //     </div>
          // ),
          id: "action",
        };
      }
      if (key === "dob") {
        return {
          Header: "Возраст",
          accessor: "dob",
          id: "dob",
          className: "tableColumn",
          Cell: ({ row: { original } }) => {
            const age = original.dob
              ? moment().diff(`${original.dob}`, "years")
              : null;
            return (
              <div className="user_column">
                <p>
                  {original.dob
                    ? moment(original.dob).format("YYYY-MM-DD")
                    : "-"}
                </p>
                {age && <p>{age || "-"} лет</p>}
              </div>
            );
          },
        };
      }
      if (key === "phone") {
        return {
          Header: "Телефоны",
          accessor: "phone",
          id: "phone",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "phoneHome") {
        return {
          Header: "Домашний телефон",
          accessor: "phoneHome",
          id: "phoneHome",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "registryAddress") {
        return {
          Header: "Адрес регистрации",
          accessor: "registryAddress",
          id: "registryAddress",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "birthPlace" || key === "birthplace") {
        return {
          Header: "Место рождения",
          accessor: "birthPlace",
          id: "birthPlace",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "dopAddress") {
        return null;
      }
      if (key === "workAddress") {
        return null;
      }
      if (key === "email") {
        return {
          Header: "Электронные почты",
          accessor: "email",
          id: "email",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value && value !== " " ? value : "-"),
        };
      }
      if (key === "emails") {
        return {
          Header: "Электронные почты",
          accessor: "emails",
          className: "tableColumn",

          id: "emails",
          disableSortBy: true,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };

            return (
              <div className="column_more_less">
                {value
                  ?.slice(0, showAll ? value?.length : 1)
                  ?.map((tag, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{tag || "-"}</p>
                      </div>
                    );
                  })}
                {value?.length > 1 && (
                  <div
                    className={`more_less_btn ${showAll ? "opened" : ""}`}
                    onClick={(e) => handleClick(e)}
                  >
                    {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                  </div>
                )}
              </div>
            );
          },
        };
      }

      if (key === "localPassport") {
        return {
          Header: "Паспорт РФ",
          accessor: "localPassport",
          id: "localPassport",
          className: "tableColumn",
          Cell: ({ row: { original } }) => {
            return (
              <div className="user_column">
                <p>
                  {original?.localPassport?.localPassportSeries
                    ? `${original?.localPassport?.localPassportSeries} |`
                    : ""}
                  {original?.localPassport?.localPassportNumber
                    ? ` ${original?.localPassport?.localPassportNumber} `
                    : ""}
                </p>
                <p>
                  {original?.localPassport?.issuedate || "no data"} -{" "}
                  {original?.localPassport?.localPassportDateOfExpiry ||
                    "no data"}
                </p>
              </div>
            );
          },
        };
      }
      if (key === "foreignPassport") {
        return {
          Header: "Загран. паспорт",
          accessor: "foreignPassport",
          id: "foreignPassport",
          className: "tableColumn",
          Cell: ({ row: { original } }) => {
            return (
              <div className="user_column">
                <p>{original.foreignPassport?.foreignPassportNumber || "-"}</p>
                <p>
                  {original?.foreignPassport?.dateofissue} -{" "}
                  {original?.foreignpassport?.dateOfExpiry || "no data"}
                </p>
              </div>
            );
          },
        };
      }
      if (key === "passport_number") {
        return {
          Header: "Номер паспорта",
          accessor: "passport_number",
          id: "passport_number",
          disableSortBy: true,

          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "passport_series") {
        return {
          Header: "Серия паспорта",
          accessor: "passport_series",
          id: "passport_series",
          disableSortBy: true,

          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "debt_amount") {
        return {
          Header: "Сумма задолженности",
          accessor: "debt_amount",
          id: "debt_amount",
          disableSortBy: true,

          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "inn") {
        return {
          Header: "ИНН",
          accessor: "inn",
          id: "inn",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "osp") {
        return {
          Header: "Пристав Исполнитель",
          accessor: "osp",
          id: "osp",
          disableSortBy: true,

          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "snils_numbers") {
        return {
          Header: "№ Соц страховки",
          accessor: "snils_numbers",
          id: "snils_numbers",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };
            if (value?.length && value[0] !== null) {
              return (
                <div className="column_more_less" style={{ width: "180px" }}>
                  {value
                    ?.slice(0, showAll ? value?.length : 1)
                    ?.map((phone, index) => {
                      return (
                        <div key={index} className="user_column">
                          <p className="p-overflow">{phone || "-"}</p>
                        </div>
                      );
                    })}
                  {value?.length > 1 && (
                    <>
                      <div
                        className={`more_less_btn ${showAll ? "opened" : ""}`}
                        onClick={(e) => handleClick(e)}
                      >
                        {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return "-";
            }
          },
        };
      }
      if (key === "addresses") {
        return {
          Header: "Адреса",
          accessor: "addresses",
          id: "addresses",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };
            if (value?.length && value[0] !== null) {
              return (
                <div className="column_more_less" style={{ width: "180px" }}>
                  {value
                    ?.slice(0, showAll ? value?.length : 1)
                    ?.map((phone, index) => {
                      return (
                        <div key={index} className="user_column">
                          <p className="p-overflow">{phone || "-"}</p>
                        </div>
                      );
                    })}
                  {value?.length > 1 && (
                    <>
                      <div
                        className={`more_less_btn ${showAll ? "opened" : ""}`}
                        onClick={(e) => handleClick(e)}
                      >
                        {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return "-";
            }
          },
        };
      }

      if (key === "gender") {
        return {
          Header: "Пол",
          accessor: "gender",
          id: "gender",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "imsi") {
        return {
          Header: "IMSI",
          accessor: "imsi",
          id: "imsi",
          disableSortBy: true,

          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "serialSim") {
        return {
          Header: "Серия сим карты",
          accessor: "serialSim",
          id: "serialSim",
          disableSortBy: true,

          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "jobHistory") {
        return {
          Header: "Информация о работе",
          accessor: "jobHistory",
          id: "jobHistory",
          className: "tableColumn",
          disableSortBy: true,

          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };
            const isEmpty = value
              ? Object.values(value[0]).every((x) => x === null || x === "")
              : false;
            return (
              <div className="column_more_less">
                {value
                  ?.slice(0, showAll ? value?.length : 1)
                  ?.map((place, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{place?.info || "-"}</p>
                        <p>
                          {place?.hireDate || "-"} - {place?.fireDate || "-"}
                        </p>
                      </div>
                    );
                  })}
                {value?.length > 1 && !isEmpty && (
                  <>
                    <div
                      className={`more_less_btn ${showAll ? "opened" : ""}`}
                      onClick={(e) => handleClick(e)}
                    >
                      {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                    </div>
                  </>
                )}
              </div>
            );
          },
        };
      }
      if (key === "relationships") {
        return {
          Header: "Родственники",
          accessor: "relationships",
          id: "relationships",
          className: "tableColumn",
          disableSortBy: true,

          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };

            return (
              <div className="column_more_less">
                {value
                  ?.slice(0, showAll ? value?.length : 1)
                  ?.map((person, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">
                          {person?.firstname || "-"} {person?.lastname || "-"}{" "}
                          {person?.patronymic || "-"}
                        </p>
                        <p>{person?.dob || "-"}</p>
                      </div>
                    );
                  })}
                {value?.length > 1 && (
                  <>
                    <div
                      className={`more_less_btn ${showAll ? "opened" : ""}`}
                      onClick={(e) => handleClick(e)}
                    >
                      {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                    </div>
                  </>
                )}
              </div>
            );
          },
        };
      }

      if (key === "numBusterTags") {
        return {
          Header: "NumBuster Теги",
          accessor: "numBusterTags",
          id: "numBusterTags",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };
            const isEmpty = value
              ? Object.values(value[0]).every((x) => x === null || x === "")
              : false;
            return (
              <div className="column_more_less">
                {value
                  ?.slice(0, showAll ? value?.length : 1)
                  ?.map((tag, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{tag || "-"}</p>
                      </div>
                    );
                  })}
                {value?.length > 1 && !isEmpty && (
                  <>
                    <div
                      className={`more_less_btn ${showAll ? "opened" : ""}`}
                      onClick={(e) => handleClick(e)}
                    >
                      {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                    </div>
                  </>
                )}
              </div>
            );
          },
        };
      }
      if (key === "relatedPhones") {
        return {
          Header: "Похожие телефоны",
          accessor: "relatedPhones",
          id: "relatedPhones",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };
            const isEmpty = value
              ? Object.values(value[0]).every((x) => x === null || x === "")
              : false;
            return (
              <div className="column_more_less">
                {value
                  ?.slice(0, showAll ? value?.length : 1)
                  ?.map((phone, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{phone || "-"}</p>
                      </div>
                    );
                  })}
                {value?.length > 1 && !isEmpty && (
                  <>
                    <div
                      className={`more_less_btn ${showAll ? "opened" : ""}`}
                      onClick={(e) => handleClick(e)}
                    >
                      {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                    </div>
                  </>
                )}
              </div>
            );
          },
        };
      }
      if (key === "getContactTags") {
        return {
          Header: "GetContact Теги",
          accessor: "getContactTags",
          id: "getContactTags",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };

            const isEmpty = value
              ? Object.values(value).every((x) => x === null || x === "")
              : false;
            const replaceEmptyStr = value?.filter((item) => item !== "");
            return (
              <div className="column_more_less">
                {replaceEmptyStr
                  ?.slice(0, showAll ? value?.length : 1)
                  ?.map((tag, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{tag || "-"}</p>
                      </div>
                    );
                  })}
                {replaceEmptyStr?.length > 1 && !isEmpty && (
                  <>
                    <div
                      className={`more_less_btn ${showAll ? "opened" : ""}`}
                      onClick={(e) => handleClick(e)}
                    >
                      {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                    </div>
                  </>
                )}
              </div>
            );
          },
        };
      }
      if (key === "militaryInfo") {
        return {
          Header: "Военные сведения",
          accessor: "militaryInfo",
          disableSortBy: true,
          id: "militaryInfo",
          Cell: ({ row: { original } }) => {
            return (
              <p className="w-200">
                {original.militaryInfo?.militaryService || "-"}
              </p>
            );
          },
        };
      }
      if (key === "matching") {
        return {
          Header: "%",
          accessor: "matching",
          id: "matching",
          width: 50,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "snils") {
        return {
          Header: "№ Соц страховки",
          accessor: "snils",
          id: "snils",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      // DB SPEKTR
      if (key === "body") {
        return {
          Header: "Номер кузова",
          accessor: "body",
          disableSortBy: true,
          id: "body",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "mark") {
        return {
          Header: "Марка авто",
          accessor: "mark",
          id: "mark",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "yearOfCreation") {
        return {
          Header: "Год выпуска ",
          accessor: "yearOfCreation",
          id: "yearOfCreation",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "year") {
        return {
          Header: "Год выпуска",
          accessor: "year",
          id: "year",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "engine") {
        return {
          Header: "Номер двигателя",
          accessor: "engine",
          id: "engine",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "chassis") {
        return {
          Header: "Шасси",
          accessor: "chassis",
          id: "chassis",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      // end DB SPEKTR
      // DB SIRENA

      if (key === "departure_time") {
        return {
          Header: "Дата вылета",
          accessor: "departure_time",
          id: "departure_time",
          disableSortBy: true,
          Cell: ({ cell: { value } }) =>
            value ? moment.utc(value).format("YYYY-MM-DD HH:mm:ss") : "-",
        };
      }
      if (key === "booking_time") {
        return {
          Header: "Дата бронирования",
          accessor: "booking_time",
          id: "booking_time",
          disableSortBy: true,
          Cell: ({ cell: { value } }) =>
            value ? moment.utc(value).format("YYYY-MM-DD HH:mm:ss") : "-",
        };
      }
      if (key === "departure_point") {
        return {
          Header: "Отправление",
          accessor: "departure_point",
          id: "departure_point",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "airline") {
        return {
          Header: "Авиакомпания",
          accessor: "airline",
          id: "airline",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "arrival_point") {
        return {
          Header: "Место прибытия",
          accessor: "arrival_point",
          id: "arrival_point",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "airline") {
        return {
          Header: "Авиакомпания",
          accessor: "airline",
          id: "airline",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "airline_name") {
        return {
          Header: "Авиакомпания",
          accessor: "airline_name",
          id: "airline_name",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "ticket") {
        return {
          Header: "Номер билета",
          accessor: "ticket",
          id: "ticket",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "destination") {
        return {
          Header: "Прибытие",
          accessor: "destination",
          id: "destination",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "city_to") {
        return {
          Header: "Прибытие",
          accessor: "city_to",
          id: "city_to",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "first_city") {
        return {
          Header: "Город бронирования",
          accessor: "first_city",
          id: "first_city",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "pul") {
        return null;
      }
      if (key === "ppr") {
        return null;
      }
      if (key === "regnum") {
        return {
          Header: "№ брони",
          accessor: "regnum",
          id: "regnum",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "passDoc" || key === "pass_doc") {
        return {
          Header: "Документ",
          accessor: key,
          id: key,
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "pointOfDeparture") {
        return {
          Header: "Отправление",
          accessor: "pointOfDeparture",
          id: "pointOfDeparture",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "farce_calt_vld_url") {
        return {
          Header: "Доп. инфо",
          accessor: "farce_calt_vld_url",
          id: "farce_calt_vld_url",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "city_from") {
        return {
          Header: "Отправление",
          accessor: "city_from",
          id: "city_from",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "flight") {
        return {
          Header: "Номер самолета",
          accessor: "flight",
          id: "flight",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "bookingTime") {
        return {
          Header: "Дата бронирования",
          accessor: "bookingTime",
          id: "bookingTime",
          disableSortBy: true,
          Cell: ({ cell: { value } }) =>
            value ? moment.utc(value).format("YYYY-MM-DD HH:mm:ss") : "-",
        };
      }
      if (key === "arrivalCountry") {
        return {
          Header: "Страна прибытия",
          accessor: "arrivalCountry",
          id: "arrivalCountry",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "departureCountry") {
        return {
          Header: "Страна отправления",
          accessor: "departureCountry",
          id: "departureCountry",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "tkt_date") {
        return {
          Header: "Дата бронирования",
          accessor: "tkt_date",
          id: "tkt_date",
          disableSortBy: true,
          Cell: ({ cell: { value } }) =>
            value ? moment.utc(value).format("YYYY-MM-DD HH:mm:ss") : "-",
        };
      }
      if (key === "cards") {
        return null;
      }
      if (key === "contacts") {
        return {
          Header: "Контакты",
          accessor: "contacts",
          id: "contacts",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };

            if (value?.length) {
              const isEmpty = value
                ? Object.values(value[0])?.every((x) => x === null || x === "")
                : false;
              return (
                <div className="column_more_less">
                  {value
                    ?.slice(0, showAll ? value?.length : 1)
                    ?.map((phone, index) => {
                      return (
                        <div key={index} className="user_column">
                          <p className="p-overflow">{phone || "-"}</p>
                        </div>
                      );
                    })}
                  {value?.length > 1 && !isEmpty && (
                    <>
                      <div
                        className={`more_less_btn ${showAll ? "opened" : ""}`}
                        onClick={(e) => handleClick(e)}
                      >
                        {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return "-";
            }
          },
        };
      }
      if (key === "kids") {
        return {
          Header: "Дети",
          accessor: "kids",
          id: "kids",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };
            if (value?.length && value[0] !== null) {
              return (
                <div className="column_more_less" style={{ width: "180px" }}>
                  {value
                    ?.slice(0, showAll ? value?.length : 1)
                    ?.map((kid, index) => {
                      return (
                        <div key={index} className="user_column">
                          <p className="p-overflow">
                            {kid?.lastname || "-"} {kid?.firstname || "-"}
                          </p>
                        </div>
                      );
                    })}
                  {value?.length > 1 && (
                    <>
                      <div
                        className={`more_less_btn ${showAll ? "opened" : ""}`}
                        onClick={(e) => handleClick(e)}
                      >
                        {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return "-";
            }
          },
        };
      }
      if (key === "passengers") {
        return null;
      }
      if (key === "phones") {
        return {
          Header: "Телефоны",
          accessor: "phones",
          id: "phones",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };

            if (value?.length) {
              return (
                <div
                  className="column_more_less"
                  style={{
                    width: "200px",
                  }}
                >
                  {value
                    ?.slice(0, showAll ? value?.length : 1)
                    ?.map((phone, index) => {
                      return (
                        <>
                          {typeof phone === "object" && phone !== null ? (
                            <div key={index} className="user_column">
                              <p className="p-overflow">{phone.phone || "-"}</p>
                            </div>
                          ) : (
                            <div key={index} className="user_column">
                              <p className="p-overflow">{phone || "-"}</p>
                            </div>
                          )}
                        </>
                      );
                    })}
                  {value?.length > 1 && (
                    <>
                      <div
                        className={`more_less_btn ${showAll ? "opened" : ""}`}
                        onClick={(e) => handleClick(e)}
                      >
                        {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return "-";
            }
          },
        };
      }

      if (key === "seat_tier") {
        return {
          Header: "Уровень места",
          accessor: "seat_tier",
          id: "seat_tier",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "port_from") {
        return {
          Header: "Станция отправления",
          accessor: "port_from",
          id: "port_from",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "port_to") {
        return {
          Header: "Станция прибытия",
          accessor: "port_to",
          id: "port_to",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "seat") {
        return {
          Header: "Место",
          accessor: "seat",
          id: "seat",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "departureTime") {
        return {
          Header: "Время вылета",
          accessor: "departureTime",
          id: "departureTime",
          disableSortBy: true,
          Cell: ({ cell: { value } }) =>
            value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "-",
        };
      }
      if (key === "class") {
        return {
          Header: "Класс обслуживания",
          accessor: "class",
          id: "class",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "region") {
        return {
          Header: "Регион",
          accessor: "region",
          id: "region",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "cadNumber") {
        return {
          Header: "Кадастровый номер",
          accessor: "cadNumber",
          id: "cadNumber",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (
        key === "docNum" ||
        key === "document_number" ||
        key === "doc_num" ||
        key === "document_num" ||
        key === "docNumber" ||
        key === "doc_no"
      ) {
        return {
          Header: "Номер документа",
          accessor: key,
          id: key,
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (
        key === "docType" ||
        key === "doc_type" ||
        key === "doctype" ||
        key === "document_type"
      ) {
        return {
          Header: "Тип документа",
          accessor: key,
          id: key,
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "document_ser" || key === "document_series") {
        return {
          Header: "Серия документа",
          accessor: key,
          id: key,
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "document_issuer") {
        return null;
      }
      if (key === "citizenship") {
        return {
          Header: "Национальность",
          accessor: "citizenship",
          id: "citizenship",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "birthdate") {
        return {
          Header: "Возраст",
          accessor: "birthdate",
          id: "birthdate",
          className: "tableColumn",
          Cell: ({ row: { original } }) => {
            const age = original.birthdate
              ? moment().diff(`${original.birthdate}`, "years")
              : null;
            return (
              <div className="user_column">
                <p>
                  {original.birthdate
                    ? moment(original.birthdate).format("YYYY-MM-DD")
                    : "-"}
                </p>
                {age && <p>{age || "-"} лет</p>}
              </div>
            );
          },
        };
      }
      if (key === "birthPlace") {
        return {
          Header: "Место рождения",
          accessor: "birthPlace",
          id: "birthPlace",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "birth_place") {
        return {
          Header: "Место рождения",
          accessor: "birth_place",
          id: "birth_place",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "series_code") {
        return {
          Header: "Серия документа",
          accessor: "series_code",
          id: "series_code",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      // end DB SIRENA
      // DB SDEK
      if (key === "city") {
        return {
          Header: "Город",
          accessor: "city",
          disableSortBy: true,

          id: "city",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "categoryFly") {
        return {
          Header: "Клас обслуживания",
          accessor: "categoryFly",
          disableSortBy: true,

          id: "categoryFly",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "senderAddress") {
        return null;
      }
      if (key === "senderCity") {
        return null;
      }
      if (key === "senderContactPerson") {
        return null;
      }
      if (key === "senderEmail") {
        return null;
      }
      if (key === "senderPhone") {
        return null;
      }
      if (key === "senderName") {
        return null;
      }
      if (key === "senderContragentName") {
        return null;
      }
      if (key === "receiverAddress") {
        return null;
      }
      if (key === "receiverCity") {
        return null;
      }
      if (key === "receiverContactPerson") {
        return null;
      }
      if (key === "receiverContragentName") {
        return null;
      }
      if (key === "receiverEmail") {
        return {
          Header: "Email получателя",
          accessor: "receiverEmail",
          disableSortBy: true,

          id: "receiverEmail",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "receiverPhone") {
        return {
          Header: "Телефон получателя",
          accessor: "receiverPhone",
          disableSortBy: true,
          id: "receiverPhone",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "receiverName") {
        return null;
      }
      if (key === "contactPerson") {
        return {
          Header: "Контактное лицо",
          accessor: "contactPerson",
          disableSortBy: true,

          id: "contactPerson",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "name") {
        return {
          Header: "Имя",
          accessor: "name",
          disableSortBy: true,

          id: "name",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "payerAddress") {
        return null;
      }
      if (key === "payerCity") {
        return null;
      }
      if (key === "payerContactPerson") {
        return null;
      }
      if (key === "payerContragentName") {
        return null;
      }
      if (key === "payerName") {
        return {
          Header: "Имя  плательщика",
          accessor: "payerName",
          disableSortBy: true,

          id: "payerName",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "payerEmail") {
        return {
          Header: "Email  плательщика",
          accessor: "payerEmail",
          disableSortBy: true,

          id: "payerEmail",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "payerPhone") {
        return null;
      }
      if (key === "contragentName") {
        return {
          Header: "Имя контрагента",
          accessor: "contragentName",
          disableSortBy: true,

          id: "contragentName",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "addressString") {
        return {
          Header: "Адрес",
          accessor: "addressString",
          disableSortBy: true,

          id: "addressString",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      // end DB SDEK
      /// BD Delivery
      if (key === "address") {
        return {
          Header: "Адрес",
          accessor: "address",
          disableSortBy: true,
          className: "tableColumn",

          id: "address",
          // Cell: ({ cell: { value } }) => (value ? value : "-"),
          Cell: ({ value }) => {
            const [showAll, setShowAll] = useState(false);
            const handleClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowAll(!showAll);
            };
            return (
              <>
                {Array.isArray(value) ? (
                  <div className="column_more_less">
                    {value
                      ?.slice(0, showAll ? value?.length : 1)
                      ?.map((addr, index) => {
                        return (
                          <div key={index} className="user_column">
                            <p className="p-overflow">{addr || "-"} </p>
                          </div>
                        );
                      })}
                    {value?.length > 1 && (
                      <>
                        <div
                          className={`more_less_btn ${showAll ? "opened" : ""}`}
                          onClick={(e) => handleClick(e)}
                        >
                          {showAll ? "Скрыть" : "Показать все"} <MoreLess />
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  value
                )}
              </>
            );
          },
        };
      }

      if (key === "ip") {
        return {
          Header: "IP адрес",
          accessor: "ip",
          disableSortBy: true,

          id: "ip",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }

      if (key === "deliveryAvatar") {
        return {
          Header: "Фото",
          accessor: "deliveryAvatar",
          id: "deliveryAvatar",
          disableSortBy: true,
          className: "table_image",
          width: 50,
          Cell: ({ row: { original } }) => {
            // custom cell renderer for the  column
            return (
              <>
                <ReactTooltip
                  id="my-tooltip-data-html"
                  className="kermit_image_tooltip"
                  place="right"
                />
                <div className="user_image">
                  {original.deliveryAvatar ? (
                    <img
                      src={`${original.deliveryAvatar}`}
                      alt=""
                      data-tooltip-id="my-tooltip-data-html"
                      data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                        <img
                          src={`${original.deliveryAvatar}`}
                          alt="Your Image"
                        />,
                      )}
                    />
                  ) : (
                    <img src={NoImage} alt="" />
                  )}
                </div>
              </>
            );
          },
        };
      }
      ///END  BD Delivery
      //// BD AUTO
      if (key === "yearIssue") {
        return {
          Header: "Год выпуска машины",
          accessor: "yearIssue",
          disableSortBy: true,
          id: "yearIssue",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "body_number") {
        return {
          Header: "Номер кузова",
          accessor: "body_number",
          disableSortBy: true,
          id: "body_number",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "brand") {
        return {
          Header: "Марка машины",
          accessor: "brand",
          disableSortBy: true,
          id: "brand",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "veh_doc_number") {
        return {
          Header: "Номер документа на ТС",
          accessor: "veh_doc_number",
          disableSortBy: true,
          id: "veh_doc_number",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "veh_doc_date") {
        return null;
      }
      if (key === "veh_doc_serial") {
        return {
          Header: "Cерия документа на ТС",
          accessor: "veh_doc_serial",
          disableSortBy: true,
          id: "veh_doc_serial",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "is_taxi") {
        return {
          Header: "Использовалась в такси",
          accessor: "is_taxi",
          disableSortBy: true,
          id: "is_taxi",
          Cell: ({ row: { original } }) => {
            // custom cell renderer for the  column
            return (
              <div className="user_image">
                {original.is_taxi ? (
                  <>{original?.is_taxi === "0" ? "Нет" : "Да" || "-"}</>
                ) : (
                  "нет"
                )}
              </div>
            );
          },
        };
      }
      if (key === "model") {
        return {
          Header: "Модель авто",
          accessor: "model",
          disableSortBy: true,
          id: "model",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "license_plate") {
        return {
          Header: "Номерной знак",
          accessor: "license_plate",
          id: "license_plate",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "enginePower") {
        return {
          Header: "Мощность двигателя",
          accessor: "enginePower",
          disableSortBy: true,
          id: "enginePower",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "chassis_number") {
        return {
          Header: "Номер шасси",
          accessor: "chassis_number",
          disableSortBy: true,
          id: "chassis_number",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "vin") {
        return {
          Header: "VIN код",
          accessor: "vin",
          id: "vin",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "techPassportNumber") {
        return {
          Header: "Номер тех. паспорта",
          accessor: "techPassportNumber",
          id: "techPassportNumber",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "sts") {
        return {
          Header: "Свидетельство рег. ТС",
          accessor: "sts",
          id: "sts",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "plateNumber") {
        return {
          Header: "Номерной знак",
          accessor: "plateNumber",
          id: "plateNumber",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "oldPlateNumber") {
        return {
          Header: "Старый номерной знак",
          accessor: "oldPlateNumber",
          id: "oldPlateNumber",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "carColor") {
        return {
          Header: "Цвет машины",
          accessor: "carColor",
          id: "carColor",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "bodyNumber") {
        return {
          Header: "Номер кузова",
          accessor: "bodyNumber",
          id: "bodyNumber",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "markCar") {
        return {
          Header: "Марка машины",
          accessor: "markCar",
          id: "markCar",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "fio") {
        return {
          Header: "Имя | название",
          accessor: "fio",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "modelCar") {
        return {
          Header: "Модель авто",
          accessor: "modelCar",
          id: "modelCar",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "model") {
        return {
          Header: "Модель авто",
          accessor: "model",
          id: "model",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "yearCar") {
        return {
          Header: "Год выпуска машины",
          accessor: "yearCar",
          id: "yearCar",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "engineNumber") {
        return {
          Header: "Номер двигателя",
          accessor: "engineNumber",
          id: "engineNumber",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "chassisNumber" && key !== " ") {
        return {
          Header: "Номер шасси",
          accessor: "chassisNumber",
          id: "chassisNumber",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      // medicine
      if (key === "insuranceCompany") {
        return {
          Header: "Страховая компания",
          accessor: "insuranceCompany",
          disableSortBy: true,
          id: "insuranceCompany",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "insuranceNumber") {
        return {
          Header: "Номер страховки",
          accessor: "insuranceNumber",
          disableSortBy: true,
          id: "insuranceNumber",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "passportNumber") {
        return {
          Header: "Номер паспорта",
          accessor: "passportNumber",
          disableSortBy: true,
          id: "passportNumber",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "actualAddress" || key === "actual_address") {
        return {
          Header: "Актуальный адрес",
          accessor: "actualAddress",
          disableSortBy: true,
          id: "actualAddress",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      } else if (key === "dep_date") {
        return {
          Header: "Дата отправки",
          accessor: "dep_date",
          disableSortBy: true,
          id: "dep_date",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      } else if (key === "country") {
        return {
          Header: "Страна",
          accessor: "country",
          disableSortBy: true,
          id: "country",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      } else if (key === "post") {
        return {
          Header: "Должность",
          accessor: "post",
          disableSortBy: true,
          id: "post",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      } else if (key === "full_name") {
        return {
          Header: "Имя",
          accessor: "full_name",
          disableSortBy: true,
          id: "full_name",
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      } else if (key === "is_phone_actual") {
        return null;
      } else if (key === "passportIssuedBy") {
        return null;
      }
      // end medicine
      else if (key === "facebookId") {
        return null;
      } else if (key === "login") {
        return null;
      } else if (key === "password") {
        return null;
      } else if (key === "latitude") {
        return null;
      } else if (key === "longitude") {
        return null;
      } else if (key === "documentType") {
        return null; // skip the enterpriseAddress column
      } else if (key === "sourceName") {
        return null;
      } else if (key === "webLink") {
        return null;
      } else if (key === "mailruProfile") {
        return null;
      } else if (key === "linkedinLink") {
        return null;
      } else if (key === "someDocument") {
        return null;
      } else if (key === "owner") {
        return null;
      } else if (key === "passport") {
        return null;
      } else if (key === "policyNumber") {
        return null;
      } else if (key === "placeOfBirth") {
        return null;
      } else if (key === "documentTypeNumber") {
        return null;
      } else if (key === "enterpriseAddress") {
        return null;
      } else if (key === "gibddName") {
        return null;
      } else if (key === "info") {
        return null;
      } else if (key === "enterpriseInn") {
        return null; // skip the enterpriseInn column
      } else if (key === "enterpriseName") {
        return null; // skip the enterpriseName column
      } else if (key === "insurer") {
        return null; // skip the insurer column
      } else if (key === "insurerName") {
        return null; // skip the insurerName column
      } else if (key === "kbm") {
        return null; // skip the kbm column
      } else if (key === "mreoState") {
        return null; // skip the mreoState column
      } else if (key === "passportAddress") {
        return null; // skip the passportAddress column
      } else if (key === "ptsNumber") {
        return null; // skip the ptsNumber column
      } else if (key === "workPlace") {
        return null; // skip the workPlace column
      }
      //// END BD AUTO
      else if (key === "patronymic") {
        return null; // skip the patronymic column
      } else if (key === "firstname") {
        return null; // skip the firstname column
      } else if (key === "anketId") {
        return null; // skip the anketId column
      } else if (key === "addressInfo") {
        return null; // skip the addressinfo column
      } else if (key === "officerName") {
        return null; // skip the officername column
      } else if (key === "nationality") {
        return null; // skip the nationality column
      } else if (key === "addressRegistrationDate") {
        return null; // skip the addressregistrationdate column
      } else if (key === "data") {
        return null; // skip the data column
      } else if (key === "id") {
        return null; // skip the id column
      } else if (key === "folders") {
        return null; // skip the folders column
      } else if (key === "sourceId") {
        return null; // skip the folders column
      } else if (key === "departureRestrictions") {
        return null; // skip the departureRestrictions column
      } else if (key === "diplCountry") {
        return null; // skip the diplCountry column
      } else if (key === "diplSecretAccess") {
        return null; // skip the diplSecretAccess column
      } else if (key === "diplTopSecretDescription") {
        return null; // skip the diplTopSecretDescription column
      } else if (key === "diplTopSecretInfo") {
        return null; // skip the diplTopSecretInfo column
      } else if (key === "diplWorkPlace") {
        return null; // skip the diplWorkPlace column
      } else if (key === "topSecretAccessInfo") {
        return null; // skip the topSecretAccessInfo column
      } else if (key === "secretAccess") {
        return null; // skip the secretAccess column
      } else if (key === "accidentId") {
        return null; // skip the accidentId column
      } else if (key === "comment") {
        return null; // skip the accidentId column
      } else if (key === "photos") {
        return null; // skip the photos column
      } else if (key === "carDrivers") {
        return null; // skip the carDrivers column
      } else if (key === "carOwners") {
        return null; // skip the carDrivers column
      } else if (key === "userInfo") {
        return null;
      } else if (key === "autoInfo") {
        return null;
      } else if (key === "owners") {
        return null;
      } else if (key === "drivers") {
        return null;
      } else if (key === "sourceNameId") {
        return null;
      } else if (key === "first_name") {
        return null;
      } else if (key === "documents") {
        return null;
      } else if (key === "user") {
        return null;
      } else if (key === "work_position") {
        return null;
      } else if (key === "work_phone") {
        return null;
      } else if (key === "work_experience") {
        return null;
      } else if (key === "work_address") {
        return null;
      } else if (key === "registration_address") {
        return null;
      } else if (key === "postal_code") {
        return null;
      } else if (key === "home_phone") {
        return null;
      } else if (key === "family_status") {
        return null;
      } else if (key === "credit_amount") {
        return null;
      } else if (key === "credit_duration") {
        return null;
      } else if (key === "passport_issued_by") {
        return null;
      } else if (key === "passport_issued_date") {
        return null;
      } else if (key === "pass_name") {
        return null;
      } else if (key === "pass_surname") {
        return null;
      } else if (key === "dep_time") {
        return null;
      } else if (key === "source_name") {
        return null;
      } else if (key === "polis_num") {
        return null;
      } else if (key === "polis_ser") {
        return null;
      } else {
        return {
          Header: key.charAt(0).toUpperCase() + key.slice(1), // capitalize the first letter of the key for the header
          accessor: key,
          id: key,
        };
      }
    })
    .filter(Boolean);
};
