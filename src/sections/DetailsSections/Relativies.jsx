import ReactDOMServer from "react-dom/server";
import React, { memo, useContext } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ThemeContext } from "store/context/themeContextProvider";
import Card from "components/app/base/Card";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import { ReactComponent as SocialLogo } from "assets/images/social.svg";
import { searchAnkets } from "store/thunks/searchThunks";

const Relativies = ({ data }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const handleNewSearchRelative = (e, obj) => {
    e.preventDefault();
    const current = moment().format("YYYY");
    const check = moment(obj?.dob, "DD/MM/YYYY");
    const dataMonth = check.format("M");
    const dataDay = check.format("D");
    const dataYear = check.format("YYYY");
    const updatesValues = {
      firstName: obj?.firstname,
      lastName: obj?.lastname,
      parentName: obj?.patronymic,
      dateOfBirth: {
        from: {
          year: current < dataYear ? "" : dataYear,
          month: dataMonth,
          day: dataDay,
        },
        to: {
          year: current < dataYear ? "" : dataYear,
          month: dataMonth,
          day: dataDay,
        },
      },
    };
    dispatch(searchAnkets(updatesValues));
  };

  return (
    <>
      <Accordion title="Родственники" Icon={SocialLogo}>
        <div className="accordion_content">
          <ExpandCards>
            <ReactTooltip
              id="relativies-tooltip"
              className={`kermit_tooltip ${isDarkTheme ? "" : "tooltip_light"}`}
              place="right"
            />
            <div className="expand_cards_row expand_cards_row-4">
              {data?.map(({ firstname, lastname, patronymic, dob }) => {
                return (
                  <div
                    key={uuid()}
                    data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                      <div>
                        <p>
                          Клик правой кнопкой мыши начнет новый поиск по
                          пользователю
                        </p>
                        <p>
                          {lastname} {firstname} {patronymic}
                        </p>
                      </div>,
                    )}
                    data-tooltip-id="relativies-tooltip"
                    style={{
                      cursor: "pointer",
                    }}
                    onContextMenu={(e) =>
                      handleNewSearchRelative(e, {
                        dob,
                        firstname,
                        lastname,
                        patronymic,
                      })
                    }
                  >
                    <Card>
                      <div className="details_div">
                        <div className="details_label">ФИО</div>
                        <p>
                          {lastname || "-"} {firstname || "-"}{" "}
                          {patronymic || "-"}
                        </p>
                      </div>
                      <div className="details_div">
                        <div className="details_label">Дата Рождения</div>
                        <p>{dob || "-"}</p>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </ExpandCards>
        </div>
      </Accordion>
    </>
  );
};

export default memo(Relativies);
