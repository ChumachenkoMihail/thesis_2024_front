import "./index.scss";
import React, { useContext, useEffect } from "react";
import { ReactComponent as ExpandUp } from "assets/images/expand-up.svg";
import { ReactComponent as ExpandDown } from "assets/images/expand_down.svg";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";
import { ReactComponent as AngleUp } from "assets/images/angle_up.svg";
import { ExpandCardContext } from "store/context/expandCardContext";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "components/app/use/Title";

/**
 * ExpandCard
 * @param children
 * @param title  show title or Icon
 * @param Icon show title or Icon
 * @param id required
 * @param subTitleShow required if we have children[2]
 * @param subId required if we have children[2]
 */
const ExpandCard = ({
  children,
  title,
  Icon,
  id,
  subId,
  subTitleShow,
  TitleNode,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    allCardsId,
    handleCollapseCard,
    handleGetAllCardIds,
    handleVisibleSubItemCard,
  } = useContext(ExpandCardContext);
  useEffect(() => {
    // need to get all id and subId to one object with state: false
    handleGetAllCardIds(id);
    handleGetAllCardIds(subId);
  }, []);
  const toggleCardOpen = (cardId) => {
    handleCollapseCard(cardId);
  };

  return (
    <div
      className={`expand_card_wrapper ${
        isDarkTheme ? "" : "expand_card_light"
      }`}
    >
      <div className="expand_card_head">
        {TitleNode ? TitleNode : null}
        {title && !TitleNode && <Title Tag="h4">{title}</Title>}
        {Icon && <Icon />}
        <div className="card_action" onClick={() => toggleCardOpen(id)}>
          {allCardsId?.[id] ? <ExpandUp /> : <ExpandDown />}
        </div>
      </div>
      <div className="expand_content_visible">{children[0]}</div>
      <div
        className={`expand_content_hide ${
          allCardsId?.[id] ? "content_visible" : ""
        }`}
      >
        {children[1]}
        {children[2] ? (
          <>
            <div
              onClick={() => handleVisibleSubItemCard(subId)}
              className="show_all"
            >
              {allCardsId?.[subId] ? "Скрыть" : "Показать"} {subTitleShow}
              {allCardsId?.[subId] ? <AngleUp /> : <AngleDown />}
            </div>
            {allCardsId?.[subId] ? <>{children[2]}</> : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ExpandCard;
