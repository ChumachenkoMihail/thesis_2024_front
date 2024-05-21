import React, { memo, useContext, useId } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import { ReactComponent as Tutu } from "assets/images/sources/tutu.svg";
import moment from "moment/moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ThemeContext } from "store/context/themeContextProvider";
import ReactDOMServer from "react-dom/server";
import { searchAnkets } from "store/thunks/searchThunks";
import { useDispatch } from "react-redux";

const TutuReserveUsers = ({ data }) => {
  const cardTutuReserveUsersId = useId();
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const handleNewSearchByReserveUser = (e, obj) => {
    e.preventDefault();
    const current = moment().format("YYYY");
    const check = obj?.dob ? moment(obj?.dob, "YYYY/MM/DD") : null;
    const month = check ? check.format("M") : "";
    const day = check ? check.format("D") : "";
    const year = check ? check.format("YYYY") : "";
    const updatesValues = {
      phone: obj.phone,
      email: obj.email,
      firstName: obj?.firstname || "",
      lastName: obj?.lastname || "",
      parentName: obj?.patronymic || "",
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
    <Accordion Icon={Tutu} title="Tutu пассажиры">
      <ExpandCards withActions>
        <div className="expand_cards_row expand_cards_row-4">
          <ReactTooltip
            id="reservation-tooltip"
            className={`kermit_tooltip ${isDarkTheme ? "" : "tooltip_light"}`}
            place="right"
          />
          {data?.map(
            (
              {
                lastname,
                firstname,
                patronymic,
                dob,
                email,
                phone,
                reservedFor,
                id,
              },
              i,
            ) => {
              return (
                <div
                  key={uuid()}
                  onContextMenu={(e) =>
                    handleNewSearchByReserveUser(e, {
                      dob,
                      firstname,
                      lastname,
                      phone,
                      email,
                      patronymic,
                    })
                  }
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <div>
                      <p>
                        Клик правой кнопкой мыши начнет новый поиск по
                        пользователю
                      </p>
                      <p>
                        {lastname} {firstname} {patronymic}
                      </p>
                      <p>{email}</p>
                      <p>{phone}</p>
                    </div>,
                  )}
                  data-tooltip-id="reservation-tooltip"
                >
                  <ExpandCard
                    title="Билет куплен кем"
                    id={`tutuReserveUsersData${i}${cardTutuReserveUsersId}${id}`}
                  >
                    {/*first <></> = visible content*/}
                    <>
                      <div>
                        <div className="expand_content_title">ФИО</div>
                        <p>
                          {lastname} {firstname} {patronymic}
                        </p>
                      </div>
                      <div>
                        <div className="expand_content_title">Email</div>
                        <p>{email || "-"}</p>
                      </div>
                      <div>
                        <div className="expand_content_title">Телефон</div>
                        <p>{phone || "-"}</p>
                      </div>
                    </>

                    {/*second <></> = hide content*/}
                    <>
                      <div>
                        <div className="expand_content_title">
                          Дата рождения
                        </div>
                        <p>
                          {(dob && moment(dob).format("YYYY-MM-DD")) || "-"}
                        </p>
                      </div>

                      <div>
                        <div className="expand_content_title">
                          Билет куплен для
                        </div>
                        <p>{reservedFor || "-"}</p>
                      </div>
                    </>
                  </ExpandCard>
                </div>
              );
            },
          )}
        </div>
      </ExpandCards>
    </Accordion>
  );
};

export default memo(TutuReserveUsers);
