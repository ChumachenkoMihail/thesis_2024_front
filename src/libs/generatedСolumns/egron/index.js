import moment from "moment/moment";

export const EgronColumns = [
  {
    Header: "ФИО",
    id: "lastname",
    accessor: "lastname",
    disableSortBy: true,
    Cell: ({ row: { original } }) => {
      return (
        <span>
          {original.lastname || "-"} {original.firstname || "-"}{" "}
          {original.patronymic || "-"}
        </span>
      );
    },
  },

  {
    Header: "Дата рождения",
    id: "dob",
    accessor: "dob",
    disableSortBy: true,
    Cell: ({ cell: { value } }) =>
      value ? `${value ? moment(value).format("YYYY-MM-DD") : "no date"}` : "-",
  },
  {
    Header: "№ Соц страхования",
    accessor: "snils",
    disableSortBy: true,
    id: "snils",
    Cell: ({ cell: { value } }) => (value ? `${value}` : "-"),
  },
  {
    Header: "Серия документа",
    accessor: "document_series",
    disableSortBy: true,
    id: "document_series",
    Cell: ({ cell: { value } }) => (value ? `${value}` : "-"),
  },
  {
    Header: "Номер документа",
    accessor: "document_number",
    disableSortBy: true,
    id: "document_number",
    Cell: ({ cell: { value } }) => (value ? `${value}` : "-"),
  },
  {
    Header: "Тип сделки",
    accessor: "dealType",
    disableSortBy: true,
    id: "dealType",
    Cell: ({ cell: { value } }) => (value ? value : "-"),
  },

  {
    Header: "Дата сделки",
    accessor: "dateFrom",
    disableSortBy: true,
    id: "dateFrom",
    Cell: ({ cell: { value } }) =>
      value ? `${value ? moment(value).format("YYYY-MM-DD") : "no date"}` : "-",
  },
  {
    Header: "Тип площади",
    accessor: "objectType",
    disableSortBy: true,
    id: "objectType",
    Cell: ({ cell: { value } }) => (value ? `${value}` : "-"),
  },
  {
    Header: "Площадь по сделке",
    accessor: "area",
    disableSortBy: true,
    id: "area",
    Cell: ({ cell: { value } }) => (value ? `${value}` : "-"),
  },
  {
    Header: "Статус",
    accessor: "status",
    disableSortBy: true,
    id: "status",
    Cell: ({ cell: { value } }) => (value ? `${value}` : "-"),
  },
  {
    Header: "Банк кредитор",
    accessor: "banks",
    disableSortBy: true,
    id: "banks",
    Cell: ({ cell: { value } }) => (value ? `${value}` : "-"),
  },
];
