import React, { memo, useState } from "react";
import { v4 as uuid } from "uuid";
import Card from "components/app/base/Card";
import Button from "components/app/use/Button";
import Accordion from "components/app/base/Accordion";
import Modal from "components/app/base/Modal";
import MedTests from "components/app/modal/MedTests";
import { ReactComponent as AnalysisLogo } from "assets/images/sources/Analysis.svg";
import { ReactComponent as File } from "assets/images/file.svg";

const Analysis = ({ data }) => {
  const [testDetails, setTestDetails] = useState(null);

  const handleShowDetailsTest = (test) => {
    setTestDetails(test);
  };

  return (
    <>
      {testDetails && (
        <Modal
          closeModal={() => handleShowDetailsTest(null)}
          title="Полное описание теста"
          Icon={File}
          width="1200"
        >
          <MedTests test={testDetails} />
        </Modal>
      )}
      <Accordion title={"Анализы"} Icon={AnalysisLogo}>
        <div className="accordion_inner">
          <div className="accordion_list">
            {data?.map((item) => {
              return (
                <div key={uuid()} className="accordion_col">
                  <Card>
                    <div className="details_div">
                      <div className="details_label">Пациент</div>
                      <p>{item.fio || "-"}</p>
                    </div>
                    <div className="details_div">
                      <div className="details_label">Название теста</div>
                      <p>{item.tetrusname || "-"}</p>
                    </div>
                    <Button
                      func={() => handleShowDetailsTest(item)}
                      Icon={File}
                      mode="tretiary"
                      text="Полное описание"
                      style={{
                        margin: "16px 0 0 0",
                        width: "100%",
                      }}
                    />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default memo(Analysis);
