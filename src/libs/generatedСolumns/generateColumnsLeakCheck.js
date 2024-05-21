import { getFirstKeysFromObj } from "libs/helpers";
import React from "react";
import { v4 as uuid } from "uuid";
import { ReactComponent as Copy } from "assets/images/copy.svg";

export const generateColumnsLeakCheck = (data, copyFunc) => {
  const keys = getFirstKeysFromObj(data); // get the all keys
  return keys
    ?.map((key) => {
      if (key === "phone") {
        return {
          Header: "Телефон",
          accessor: "phone",
          id: "phone",
          className: "tableColumn",
          width: 204,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div className="td_copy">
                <span
                  style={{
                    width: "170px",
                    wordBreak: "break-all",
                  }}
                >
                  {original.phone || "-"}
                </span>
                {original.phone && copyFunc && (
                  <Copy onClick={() => copyFunc(original.phone, "Телефон")} />
                )}
              </div>
            );
          },
        };
      }
      if (key === "password") {
        return {
          Header: "Пароль",
          accessor: "password",
          id: "password",
          className: "tableColumn",
          width: 204,

          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div className="td_copy">
                <span
                  style={{
                    width: "170px",
                    wordBreak: "break-all",
                  }}
                >
                  {original.password || "-"}
                </span>
                {original.password && copyFunc && (
                  <Copy onClick={() => copyFunc(original.password, "Пароль")} />
                )}
              </div>
            );
          },
        };
      }
      if (key === "userName") {
        return {
          Header: "Имя пользователя",
          accessor: "userName",
          id: "userName",
          className: "tableColumn",

          width: 204,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div className="td_copy">
                <span
                  style={{
                    width: "170px",
                    wordBreak: "break-all",
                  }}
                >
                  {original.userName || "-"}
                </span>
                {original.userName && copyFunc && (
                  <Copy onClick={() => copyFunc(original.userName)} />
                )}
              </div>
            );
          },
        };
      }
      if (key === "username") {
        return {
          Header: "Имя в профиле",
          accessor: "username",
          id: "username",
          className: "tableColumn",

          width: 204,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div className="td_copy">
                <span
                  style={{
                    width: "170px",
                    wordBreak: "break-all",
                  }}
                >
                  {original.username || "-"}
                </span>
                {original.username && copyFunc && (
                  <Copy onClick={() => copyFunc(original.username)} />
                )}
              </div>
            );
          },
        };
      }
      if (key === "profile_name") {
        return {
          Header: "Имя в профиле",
          accessor: "profile_name",
          id: "profile_name",
          className: "tableColumn",

          width: 204,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div className="td_copy">
                <span
                  style={{
                    width: "170px",
                    wordBreak: "break-all",
                  }}
                >
                  {original.username || "-"}
                </span>
                {original.username && copyFunc && (
                  <Copy onClick={() => copyFunc(original.username)} />
                )}
              </div>
            );
          },
        };
      }
      if (key === "email") {
        return {
          Header: "Email",
          accessor: "email",
          id: "email",
          className: "tableColumn",
          width: 204,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div className="td_copy">
                <span
                  style={{
                    width: "170px",
                    wordBreak: "break-all",
                  }}
                >
                  {original.email || "-"}
                </span>
                {original.email && copyFunc && (
                  <Copy onClick={() => copyFunc(original.email)} />
                )}
              </div>
            );
          },
        };
      }
      if (key === "sources") {
        return {
          Header: "Источник взлома",
          accessor: "sources",
          id: "sources",
          className: "tableColumn",
          width: 180,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            // custom cell renderer for the  column
            return (
              <>
                {original.sources.length > 0 ? (
                  <>
                    {original?.sources.map((item) => (
                      <React.Fragment key={uuid()}>{item}, </React.Fragment>
                    ))}
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          },
        };
      }
      if (key === "origin") {
        return {
          Header: "Источники",
          accessor: "origin",
          id: "origin",
          className: "tableColumn",
          width: 180,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            // custom cell renderer for the  column
            return (
              <>
                {original.origin?.length > 0 ? (
                  <>
                    {original?.origin?.map((item) => (
                      <p key={uuid()}>{item}, </p>
                    ))}
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          },
        };
      }

      if (key === "last_breach") {
        return {
          Header: "Дата взлома",
          accessor: "last_breach",
          id: "last_breach",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div
                style={{
                  width: "120px",
                  wordBreak: "break-all",
                }}
              >
                {original.last_breach || "-"}
              </div>
            );
          },
        };
      }
      if (key === "dob") {
        return {
          Header: "Дата рождения",
          accessor: "dob",
          id: "dob",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return (
              <div
                style={{
                  width: "120px",
                  wordBreak: "break-all",
                }}
              >
                {original.dob || "-"}
              </div>
            );
          },
        };
      }
      if (key === "state") {
        return {
          Header: "Cтрана",
          accessor: "state",
          id: "state",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return <div>{original.state || "-"}</div>;
          },
        };
      }
      if (key === "city") {
        return {
          Header: "Город",
          accessor: "city",
          id: "city",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return <div>{original.state || "-"}</div>;
          },
        };
      }
      if (key === "zip") {
        return {
          Header: "Zip code",
          accessor: "zip",
          id: "zip",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return <div>{original.state || "-"}</div>;
          },
        };
      }
      if (key === "ip") {
        return {
          Header: "IP address",
          accessor: "ip",
          id: "ip",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return <div>{original.ip || "-"}</div>;
          },
        };
      }
      if (key === "name") {
        return {
          Header: "ФИО",
          accessor: "name",
          id: "name",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return <div> {original.name || ""}</div>;
          },
        };
      }
      if (key === "address") {
        return {
          Header: "Адрес",
          accessor: "address",
          id: "address",
          className: "tableColumn",
          width: 120,
          disableSortBy: true,
          Cell: ({ row: { original } }) => {
            return <div>{original.state || "-"}</div>;
          },
        };
      }
      if (key === "email_only") {
        return null;
      }
      if (key === "fields") {
        return null;
      } else {
        return {
          Header: key.charAt(0).toUpperCase() + key.slice(1), // capitalize the first letter of the key for the header
          accessor: key,
          id: key,
          disableSortBy: true,
        };
      }
    })
    .filter(Boolean);
};
