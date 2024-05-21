import React, { memo } from "react";
import Accordion from "components/app/base/Accordion";
import { v4 as uuid } from "uuid";
import { ReactComponent as Job } from "assets/images/job.svg";

const WorkPlace = ({ data }) => {
  return (
    <>
      <Accordion title="Место работы (база авто)" Icon={Job}>
        <div className="accordion_content accordion_column">
          {Array.isArray(data) ? (
            <>
              {data?.map((item) => {
                return (
                  <div className="details_div" key={uuid()}>
                    <div className="details_label">Место работы</div>
                    <p>{item}</p>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="details_div">
              <div className="details_label">Место работы</div>
              <p>{data}</p>
            </div>
          )}
        </div>
      </Accordion>
    </>
  );
};

export default memo(WorkPlace);
