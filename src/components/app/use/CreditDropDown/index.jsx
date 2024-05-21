import DropDown from "../DropDown";
import "./index.scss";
import CheckBox from "components/app/input/CheckBox";
import React, { useContext, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ThemeContext } from "store/context/themeContextProvider";
import ReactDOMServer from "react-dom/server";
import { creditsNameEnum } from "libs/Enums";

const creditOnTop = localStorage.getItem("creditTop");
const CreditDropDown = ({ credits, rightTitle = "Баланс" }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [creditTopLevel, setCreditTopLevel] = useState(creditOnTop || "search");

  const actionStyle = {
    justifyContent: "space-between",
    fontSize: "16px",
  };
  const handleChangeCreditView = (e) => {
    localStorage.setItem("creditTop", e.target.value);
    setCreditTopLevel(e.target.value);
  };
  const credit =
    credits[creditTopLevel]?.toString() || credits.search?.toString();

  return (
    <div className="user_credit_drop">
      <ReactTooltip
        id="credit-tooltip"
        className={`kermit_tooltip ${isDarkTheme ? "" : "tooltip_light"}`}
        place="top"
      />
      {rightTitle || ""}
      <DropDown
        clear
        title={credit?.toString() === "-1" ? "∞" : credit?.toString()}
      >
        {credits?.search?.toString() && (
          <div className="head_actions_item" style={actionStyle}>
            {creditsNameEnum.search}
            <div
              className="credit_count"
              data-tooltip-id="credit-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                <div>
                  <p>
                    Вы можете выбрать основным кредит Поиск анкет который будет
                    отображаться на верхнем уровне приложения
                  </p>
                </div>,
              )}
            >
              {credits.search.toString() === "-1"
                ? "∞"
                : credits.search.toString()}
              <CheckBox
                checked={creditTopLevel === "search"}
                onChange={handleChangeCreditView}
                name="search"
              />
            </div>
          </div>
        )}
        {credits?.anketDetail?.toString() && (
          <div className="head_actions_item" style={actionStyle}>
            {creditsNameEnum.anketDetail}
            <div
              className="credit_count"
              data-tooltip-id="credit-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                <div>
                  <p>
                    Вы можете выбрать основным кредит просмотра анкеты который
                    будет отображаться на верхнем уровне приложения
                  </p>
                </div>,
              )}
            >
              {credits.anketDetail.toString() === "-1"
                ? "∞"
                : credits.anketDetail.toString()}
              <CheckBox
                checked={creditTopLevel === "anketDetail"}
                onChange={handleChangeCreditView}
                name="anketDetail"
              />
            </div>
          </div>
        )}
        {credits?.merge?.toString() && (
          <div className="head_actions_item" style={actionStyle}>
            {creditsNameEnum.merge}
            <div
              className="credit_count"
              data-tooltip-id="credit-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                <div>
                  <p>
                    Вы можете выбрать основным кредит Мерджа анкет который будет
                    отображаться на верхнем уровне приложения
                  </p>
                </div>,
              )}
            >
              {credits.merge.toString() === "-1"
                ? "∞"
                : credits.merge.toString()}
              <CheckBox
                checked={creditTopLevel === "merge"}
                onChange={handleChangeCreditView}
                name="merge"
              />
            </div>
          </div>
        )}
        {credits?.api?.toString() && (
          <div className="head_actions_item" style={actionStyle}>
            {creditsNameEnum.api}
            <div
              className="credit_count"
              data-tooltip-id="credit-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                <div>
                  <p>
                    Вы можете выбрать основным кредит API который будет
                    отображаться на верхнем уровне приложения
                  </p>
                </div>,
              )}
            >
              {credits.api.toString() === "-1" ? "∞" : credits.api.toString()}
              <CheckBox
                checked={creditTopLevel === "api"}
                onChange={handleChangeCreditView}
                name="api"
              />
            </div>
          </div>
        )}
        {credits?.export?.toString() && (
          <div className="head_actions_item" style={actionStyle}>
            {creditsNameEnum.export}
            <div
              className="credit_count"
              data-tooltip-id="credit-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                <div>
                  <p>
                    Вы можете выбрать основным кредит експорта который будет
                    отображаться на верхнем уровне приложения
                  </p>
                </div>,
              )}
            >
              {credits.export.toString() === "-1"
                ? "∞"
                : credits.export.toString()}
              <CheckBox
                checked={creditTopLevel === "export"}
                onChange={handleChangeCreditView}
                name="export"
              />
            </div>
          </div>
        )}
      </DropDown>
    </div>
  );
};

export default CreditDropDown;
