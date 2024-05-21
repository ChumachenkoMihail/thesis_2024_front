import "./index.scss";
import ExpandCards from "components/app/base/ExpandCards";
import { v4 as uuid } from "uuid";
import ExpandCard from "components/app/base/ExpandCard";
import moment from "moment/moment";
import React, { useContext, useId } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "components/app/use/Title";

const SpektrAccidents = ({ accidents }) => {
  const cardsSpektrId = useId();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`spektr_section_content ${isDarkTheme ? "" : "spektr_light"}`}
    >
      <ExpandCards>
        {accidents.map(
          ({ accidentDate, accidentType, participants, accidentId }, i) => {
            return (
              <div key={uuid()} className="spektr_details">
                <div className="details_title">
                  <div className="title_head">
                    <Title Tag="h3">{accidentType} - </Title>
                    <Title Tag="h3" titleType={"title_secondary"}>
                      {moment(accidentDate).format("YYYY-MM-DD")}
                    </Title>
                  </div>
                  <p>Список участников:</p>
                </div>
                <div className="expand_cards_row">
                  {participants.map(({ personInfo, vehicleInfo }, index) => {
                    const uniqid = `spektrData.${i}.participants.${index}${cardsSpektrId}.view`;
                    return (
                      <ExpandCard
                        id={uniqid}
                        title={personInfo.relation}
                        key={uuid()}
                      >
                        <>
                          <div>
                            <div className="expand_content_title">ФИО</div>
                            <p>
                              {personInfo?.surname} {personInfo?.name}{" "}
                              {personInfo?.patronymic}
                            </p>
                          </div>
                          <div>
                            <div className="expand_content_title">
                              День рождения
                            </div>
                            <p>
                              {moment(personInfo.birthDate).format(
                                "YYYY-MM-DD",
                              )}
                            </p>
                          </div>
                        </>
                        <>
                          <div>
                            <div className="expand_content_title">
                              Автомобиль
                            </div>
                            <p> {vehicleInfo.make || "-"}</p>
                          </div>
                          <div>
                            <div className="expand_content_title">
                              Номерной знак
                            </div>
                            <p> {vehicleInfo.plateNumber || "-"}</p>
                          </div>
                          <div>
                            <div className="expand_content_title">VIN код</div>
                            <p> {vehicleInfo.vin || "-"}</p>
                          </div>
                        </>
                      </ExpandCard>
                    );
                  })}
                </div>
              </div>
            );
          },
        )}
      </ExpandCards>
    </div>
  );
};

export default SpektrAccidents;
