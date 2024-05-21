import React, { memo } from "react";
import Accordion from "components/app/base/Accordion";
import { ReactComponent as FsspLogo } from "assets/images/sources/fssp.svg";
import ExpandCards from "components/app/base/ExpandCards";
import Card from "components/app/base/Card";
import { v4 as uuid } from "uuid";

const Fssp = ({ data }) => {
  return (
    <Accordion title="Приставы" Icon={FsspLogo}>
      <div className="accordion_content">
        <ExpandCards>
          <div className="expand_cards_row expand_cards_row-4">
            {data.map(({ osp, debt_amount }) => {
              return (
                <Card key={uuid()}>
                  <div className="details_div">
                    <div className="details_label">Пристав исполнитель</div>
                    <p>{osp || "-"}</p>
                  </div>
                  <div className="details_div">
                    <div className="details_label">Сумма задолженности</div>
                    <p>{debt_amount || "-"}</p>
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

export default memo(Fssp);
