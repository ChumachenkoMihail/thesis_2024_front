import ReactDOMServer from "react-dom/server";
import { Tooltip as ReactTooltip } from "react-tooltip";
import NoImage from "assets/images/no_image.jpg";

export const originAlterEgoColumns = [
  {
    Header: "ID",
    accessor: "origin_anket_id",
    disableSortBy: true,
    id: "origin_anket_id",
    Cell: ({ cell: { value } }) => (value ? value : "-"),
  },
  {
    Header: "Фото",
    accessor: "origin_photo",
    disableSortBy: true,
    id: "origin_photo",
    Cell: ({ row: { original } }) => {
      const tooltipId = `my-tooltip-data-origin-${original.origin_anket_id}`;
      return (
        <>
          <ReactTooltip
            id={tooltipId}
            className="kermit_image_tooltip"
            place="right"
          />
          <div className="table_image">
            <div className="user_image">
              {original.origin_photo ? (
                <img
                  src={`data:image/png;base64,${original.origin_photo}`}
                  alt=""
                  data-tooltip-id={tooltipId}
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <img
                      src={`data:image/png;base64,${original.origin_photo}`}
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
    Header: "ФИО",
    id: "origin_fullname",
    Cell: ({ row: { original } }) => (
      <>
        {original.origin_lastname || "-"} {original.origin_firstname || "-"} {original.origin_patronymic || "-"}
      </>
    ),
  },
  {
    Header: "Год рождения",
    accessor: "origin_yearofbirth",
    disableSortBy: true,
    id: "origin_yearofbirth",
    Cell: ({ cell: { value } }) => (value ? value : "-"),
  },
  {
    Header: "Пол",
    accessor: "origin_gender",
    disableSortBy: true,
    id: "origin_gender",
    Cell: ({ cell: { value } }) => (value ? value : "-"),
  },
];
