import React, { memo, useId } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import { ReactComponent as Tutu } from "assets/images/sources/tutu.svg";
import moment from "moment/moment";

const TutuPassengers = ({ data }) => {
  const cardTutuPassengersId = useId();

  return (
    <Accordion Icon={Tutu} title="Tutu пользователи">
      <ExpandCards withActions>
        <div className="expand_cards_row expand_cards_row-4">
          {data?.map(
            (
              {
                lastname,
                firstname,
                patronymic,
                dob,
                placeOfBirth,
                dcmNumber,
                dcmType,
                id,
              },
              i,
            ) => {
              return (
                <React.Fragment key={uuid()}>
                  <ExpandCard
                    id={`tutuPassengersData${i}${cardTutuPassengersId}${id}`}
                  >
                    {/*first <></> = visible content*/}
                    <>
                      <div>
                        <div className="expand_content_title">ФИО</div>
                        <p>
                          {lastname} {firstname} {patronymic}
                        </p>
                      </div>
                      <div>
                        <div className="expand_content_title">
                          Дата рождения
                        </div>
                        <p>{moment(dob).format("YYYY-MM-DD")}</p>
                      </div>
                    </>

                    {/*second <></> = hide content*/}
                    <>
                      <div>
                        <div className="expand_content_title">
                          Место рождения
                        </div>
                        <p>{placeOfBirth || "-"}</p>
                      </div>
                      <div>
                        <div className="expand_content_title">
                          Номер документа
                        </div>
                        <p>{dcmNumber || "-"}</p>
                      </div>
                      <div>
                        <div className="expand_content_title">
                          Тип документа
                        </div>
                        <p>{dcmType || "-"}</p>
                      </div>
                    </>
                  </ExpandCard>
                </React.Fragment>
              );
            },
          )}
        </div>
      </ExpandCards>
    </Accordion>
  );
};

export default memo(TutuPassengers);
