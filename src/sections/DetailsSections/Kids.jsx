import React, { memo, useId } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import moment from "moment/moment";

const Kids = ({ data }) => {
  const cardKidsId = useId();

  return (
    <Accordion Icon={DataBase} title="Гос услуги(Дети)">
      <ExpandCards withActions>
        <div className="expand_cards_row expand_cards_row-4">
          {data?.map(
            ({ lastname, firstname, patronymic, dob, inn, snils, id }, i) => {
              return (
                <React.Fragment key={uuid()}>
                  <ExpandCard id={`kidsData${i}${cardKidsId}${id}`}>
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
                        <div className="expand_content_title">ИНН</div>
                        <p>{inn || "-"}</p>
                      </div>
                      <div>
                        <div className="expand_content_title">
                          № Соц страхования
                        </div>
                        <p>{snils || "-"}</p>
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

export default memo(Kids);
