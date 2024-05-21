import { getFirstKeysFromObj } from "libs/helpers";

export const generateTelegramColumn = (data) => {
  const keys = getFirstKeysFromObj(data); // get the all keys
  return keys
    ?.map((key) => {
      // DB Telegram
      if (key === "t") {
        return {
          Header: "Теги",
          accessor: "t",
          id: "t",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => {
            return <>{value ? value : 0}</>;
          },
        };
      }
      if (key === "b") {
        return {
          Header: "Категория",
          accessor: "b",
          id: "b",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : 0),
        };
      }
      if (key === "c") {
        return {
          Header: "Категория",
          accessor: "c",
          id: "c",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => {
            return <>{value ? value : "-"}</>;
          },
        };
      }
      if (key === "i") {
        return {
          Header: "Продолжительность интереса",
          accessor: "i",
          id: "i",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : 0),
        };
      }
      if (key === "ia") {
        return {
          Header: "Продолжительность активного интереса",
          accessor: "ia",
          id: "ia",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : 0),
        };
      }
      if (key === "p") {
        return {
          Header: "Сила интереса",
          accessor: "p",
          id: "p",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : 0),
        };
      }
      if (key === "pa") {
        return {
          Header: "Сила активного интереса",
          accessor: "pa",
          id: "pa",
          disableSortBy: true,
          Cell: ({ cell: { value } }) => (value ? value : 0),
        };
      }
      if (key === "ts") {
        return null;
      }
      // end DB Telegram
    })
    .filter(Boolean);
};
