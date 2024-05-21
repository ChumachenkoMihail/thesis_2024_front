import React, { memo } from "react";
import Accordion from "components/app/base/Accordion";
import { ReactComponent as Military } from "assets/images/military.svg";

const MilitaryInfo = ({ data }) => {
  return (
    <>
      <Accordion title="Воинская служба" Icon={Military}>
        <div className="accordion_content accordion_column">
          <div className="details_div">
            <div className="details_label">Место прохождения службы</div>
            <p>{data}</p>
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default memo(MilitaryInfo);
