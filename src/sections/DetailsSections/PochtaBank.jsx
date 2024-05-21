import Accordion from "components/app/base/Accordion";
import React from "react";
import ExpandCards from "components/app/base/ExpandCards";
import Card from "components/app/base/Card";
import { v4 as uuid } from "uuid";
import { ReactComponent as SocialLogo } from "assets/images/social.svg";

const PochtaBank = ({ data }) => {
  return (
    <Accordion title="Аккаунты почта банк" Icon={SocialLogo}>
      <div className="accordion_content">
        <ExpandCards>
          <div className="expand_cards_row expand_cards_row-4">
            {data.map(({ amountCur, name, amountRub }) => {
              return (
                <Card key={uuid()}>
                  <div className="details_div">
                    <div className="details_label">ФИО</div>
                    <p>{name || "-"}</p>
                  </div>
                  <div className="details_div">
                    <div className="details_label">
                      Состояние счета ₽ / валюта
                    </div>
                    <p>
                      {amountRub || "-"} / {amountCur || "-"}{" "}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </ExpandCards>
      </div>
    </Accordion>
  );
};

export default PochtaBank;
