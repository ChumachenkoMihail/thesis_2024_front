import React, { useState, useMemo, useContext } from "react";
import Button from "components/app/use/Button";
import "./index.scss";
import { ExpandCardContext } from "store/context/expandCardContext";
import { ReactComponent as ExpandUp } from "assets/images/expand-up.svg";
import { ReactComponent as ExpandDown } from "assets/images/expand_down.svg";
import { ThemeContext } from "store/context/themeContextProvider";

const ExpandCards = ({
  children,
  headTitle,
  titleCount,
  withActions = false,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [openAll, setOpenAll] = useState(false);
  const [allCardsId, setAllCardsId] = useState({});

  const handleExpandAll = () => {
    /// all card to true
    setAllCardsId(
      Object.keys(allCardsId).reduce((result, key) => {
        result[key] = true;
        return result;
      }, {}),
    );
  };
  const handleCollapseCard = (cardId) => {
    // change object state by id
    setAllCardsId((prevOpenCards) => ({
      ...prevOpenCards,
      [cardId]: !prevOpenCards[cardId],
    }));
  };

  const handleGetAllCardIds = (cardId) => {
    // get list all ids from cards
    setAllCardsId((prevOpenCards) => ({
      ...prevOpenCards,
      [cardId]: false,
    }));
  };
  const handleVisibleSubItemCard = (cardId) => {
    // change object state by id
    setAllCardsId((prevOpenCards) => ({
      ...prevOpenCards,
      [cardId]: !prevOpenCards[cardId],
    }));
  };
  const handleCollapseAll = () => {
    /// all card to false
    setAllCardsId(
      Object.keys(allCardsId).reduce((result, key) => {
        result[key] = false;
        return result;
      }, {}),
    );
  };
  const value = useMemo(() => {
    return {
      openAll,
      setOpenAll,
      handleExpandAll,
      handleCollapseAll,
      handleGetAllCardIds,
      handleCollapseCard,
      handleVisibleSubItemCard,
      allCardsId,
    };
  }, [openAll, allCardsId]);

  return (
    <div
      className={`expand_cards_container ${
        isDarkTheme ? "" : "expand_cards_light"
      }`}
    >
      {withActions && (
        <div className="expand_cards_head">
          <h3>
            {headTitle}
            <span>{titleCount}</span>
          </h3>
          <div className="head_actions">
            <Button
              func={handleExpandAll}
              text="Развернуть все"
              mode="tretiary"
              Icon={ExpandDown}
            />
            <Button
              func={handleCollapseAll}
              text="Свернуть все"
              mode="tretiary"
              Icon={ExpandUp}
            />
          </div>
        </div>
      )}
      <ExpandCardContext.Provider value={value}>
        {children}
      </ExpandCardContext.Provider>
    </div>
  );
};

export default ExpandCards;
