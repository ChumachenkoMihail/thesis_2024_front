import React, { memo } from "react";
import Accordion from "components/app/base/Accordion";
import { v4 as uuid } from "uuid";
import { ReactComponent as Job } from "assets/images/job.svg";

const Jobs = ({ data }) => {
  return (
    <>
      <Accordion title="Работа" Icon={Job}>
        <div className="accordion_inner">
          <div className="accordion_content accordion_column">
            <div className="details_table">
              {data?.map(
                ({
                  info,
                  organizationAddress,
                  organizationName,
                  hireDate,
                  fireDate,
                }) => {
                  return (
                    <div className="details_table_row" key={uuid()}>
                      <div className="details_table_cell">
                        {organizationName ? (
                          <p className="details_table_title">
                            <>
                              {organizationName}
                              <br />
                            </>
                          </p>
                        ) : null}
                        <p className="details_table_title">
                          {organizationAddress}
                        </p>
                        <p className="details_table_text">{info}</p>
                      </div>
                      <div className="details_table_cell">
                        <div className="details_table_label">Период работы</div>
                        <p className="details_table_title">
                          {hireDate} - {fireDate}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default memo(Jobs);
