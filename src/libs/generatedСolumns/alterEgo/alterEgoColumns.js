import ReactDOMServer from "react-dom/server";
import { Tooltip as ReactTooltip } from "react-tooltip";
import NoImage from "assets/images/no_image.jpg";

export const convertNumber = (number) => {
  if (number !== 100 && number % 1 !== 0) {
    return number.toFixed(2);
  }
  return number?.toString(); // Return the number as a string if it does not meet the condition
};

export const alterEgoColumns = [
  {
    Header: "ID",
    accessor: "found_anket_id",
    disableSortBy: true,
    id: "found_anket_id",
    Cell: ({ cell: { value } }) => (value ? value : "-"),
  },
  {
    Header: "Фото",
    accessor: "found_photo",
    disableSortBy: true,
    id: "found_photo",
    Cell: ({ row: { original } }) => {
      const tooltipId = `my-tooltip-data-origin-${original.found_anket_id}`;
      return (
        <>
          <ReactTooltip
            id={tooltipId}
            className="kermit_image_tooltip"
            place="right"
          />
          <div className="table_image">
            <div className="user_image">
              {original.found_photo ? (
                <img
                  src={`data:image/png;base64,${original.found_photo}`}
                  alt=""
                  data-tooltip-id={tooltipId}
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <img
                      src={`data:image/png;base64,${original.found_photo}`}
                      alt="Your Image"
                    />,
                  )}
                />
              ) : (
                <img src={NoImage} alt="" />
              )}
            </div>
          </div>
        </>
      );
    },
  },
  {
    Header: "Процент схожести фото",
    accessor: "face_similarity",
    disableSortBy: true,
    id: "face_similarity",
    Cell: ({ cell: { value } }) => (value ? `${convertNumber(value)}%` : "-"),
  },
  {
    Header: "ФИО",
    id: "found_fullname",
    Cell: ({ row: { original } }) => (
      <>
        {original.found_lastname || "-"} {original.found_firstname || "-"}{" "}
        {original.found_patronymic || "-"}
      </>
    ),
  },
  {
    Header: "Процент схожести по фамилии",
    accessor: "lastname_similarity",
    disableSortBy: true,
    id: "lastname_similarity",
    Cell: ({ cell: { value } }) => (value ? `${value}%` : "-"),
  },
  {
    Header: "Процент схожести по имени",
    accessor: "firstname_similarity",
    disableSortBy: true,
    id: "firstname_similarity",
    Cell: ({ cell: { value } }) => (value ? `${value}%` : "-"),
  },
  {
    Header: "Процент схожести по отчеству",
    accessor: "patronymic_similarity",
    disableSortBy: true,
    id: "patronymic_similarity",
    Cell: ({ cell: { value } }) => (value ? `${value}%` : "-"),
  },
  {
    Header: "Год рождения",
    accessor: "found_yearofbirth",
    disableSortBy: true,
    id: "found_yearofbirth",
    Cell: ({ cell: { value } }) => (value ? value : "-"),
  },
  {
    Header: "Разница в возрасте (лет)",
    accessor: "age_diff",
    disableSortBy: true,
    id: "age_diff",
    Cell: ({ cell: { value } }) => (value ? value : "-"),
  },
  {
    Header: "Пол",
    accessor: "found_gender",
    disableSortBy: true,
    id: "found_gender",
    Cell: ({ cell: { value }, column: { originData } }) => (
      <span className={value !== originData.origin_gender ? "danger_text" : ""}>
        {value}
      </span>
    ),
  },
];
