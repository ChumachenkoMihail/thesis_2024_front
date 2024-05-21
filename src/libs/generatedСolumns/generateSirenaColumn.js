import { getFirstKeysFromObj } from "libs/helpers";
import moment from "moment/moment";

export const generateSirenaColumn = (data) => {
  const keys = getFirstKeysFromObj(data); // get the all keys
  return keys
    ?.map((key) => {
      // DB SIRENA
      if (key === "lastname") {
        return {
          Header: "ФИО",
          accessor: "lastname",
          disableSortBy: true,
          id: (row) => `${row.firstname} ${row.lastname}`,
          className: "tableColumn",
          Cell: ({ row: { original } }) => {
            return (
              <div className="user_column in_folder_user">
                <p>{original.lastname || "-"}</p>
                <p>
                  {original.firstname || original.first_name || "-"}{" "}
                  {original.patronymic || "-"}
                </p>
              </div>
            );
          },
        };
      }
      if (key === "doc_num") {
        return {
          Header: "Номер документа",
          accessor: "doc_num",
          id: "doc_num",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "doc_type") {
        return {
          Header: "Тип документа",
          accessor: "doc_type",
          id: "doc_type",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "departure_time") {
        return {
          Header: "Дата вылета",
          accessor: "departure_time",
          id: "departure_time",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "booking_time") {
        return {
          Header: "Дата бронирования",
          accessor: "booking_time",
          id: "booking_time",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
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
      if (key === "dob") {
        return {
          Header: "Дата рождения",
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
      if (key === "passDoc") {
        return {
          Header: "Документ",
          accessor: "passDoc",
          id: "passDoc",
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
            return (
              <div className="column_more_less">
                {value?.map((phone, index) => {
                  return (
                    <div key={index} className="user_column">
                      <p className="p-overflow">{phone || "-"}</p>
                    </div>
                  );
                })}
              </div>
            );
          },
        };
      }
      if (key === "phonesArray") {
        return {
          Header: "Телефоны",
          accessor: "phonesArray",
          id: "phonesArray",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            if (value?.length) {
              return (
                <div className="column_more_less">
                  {value?.map((phone, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{phone || "-"}</p>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return "-";
            }
          },
        };
      }
      if (key === "emailArray") {
        return {
          Header: "Email",
          accessor: "emailArray",
          id: "emailArray",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            if (value?.length) {
              return (
                <div
                  className="column_more_less"
                  style={{
                    width: "140px",
                  }}
                >
                  {value?.map((em, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p
                          className="p-overflow"
                          style={{
                            whiteSpace: "normal",
                          }}
                        >
                          {em || "-"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return "-";
            }
          },
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
      if (key === "phones") {
        return {
          Header: "Телефоны",
          accessor: "phones",
          id: "phones",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            if (value?.length) {
              return (
                <div className="">
                  {value?.map((phone, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{phone || "-"}</p>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return "-";
            }
          },
        };
      }
      if (key === "phone") {
        return {
          Header: "Телефоны",
          accessor: "phone",
          id: "phone",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            if (Array.isArray(value)) {
              return (
                <div className="">
                  {value?.map((phone, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p className="p-overflow">{phone || "-"}</p>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return value || "-";
            }
          },
        };
      }
      if (key === "email") {
        return {
          Header: "Email",
          accessor: "email",
          id: "email",
          className: "tableColumn",
          disableSortBy: true,
          width: 200,
          Cell: ({ value }) => {
            if (Array.isArray(value)) {
              return (
                <div
                  className="column_more_less"
                  style={{
                    width: "140px",
                  }}
                >
                  {value?.map((em, index) => {
                    return (
                      <div key={index} className="user_column">
                        <p
                          className="p-overflow"
                          style={{
                            whiteSpace: "normal",
                          }}
                        >
                          {em || "-"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return value || "-";
            }
          },
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
          Header: "Клас обслуживания",
          accessor: "class",
          id: "class",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }

      if (key === "docNum") {
        return {
          Header: "Номер документа",
          accessor: "docNum",
          id: "docNum",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : "-"),
        };
      }
      if (key === "docType") {
        return {
          Header: "Тип документа",
          accessor: "docType",
          id: "docType",
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

      // end DB SIRENA
    })
    .filter(Boolean);
};
