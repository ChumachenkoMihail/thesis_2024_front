import { memo } from "react";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import Card from "components/app/base/Card";
import SpektrAccidents from "./SpektrAccidents";
import { ReactComponent as SpektrLogo } from "assets/images/spektr.svg";

const Spektr = ({ data, source }) => {
  const hasSpektrPersonInfo =
    (data?.comment ||
      data?.chassis ||
      data?.engine ||
      data?.body ||
      data?.mark ||
      data?.yearOfCreation) &&
    data?.vin &&
    source === "spektr";
  const hasSpektrData = hasSpektrPersonInfo || data?.accidents?.length;
  return (
    <>
      {hasSpektrData && (
        <Accordion title="SPEKTR" Icon={SpektrLogo}>
          <>
            {hasSpektrPersonInfo && (
              <ExpandCards>
                <div className="expand_cards_row">
                  <Card>
                    <>
                      <div className="details_div">
                        <div className="details_label">Тип участника</div>
                        <p>Искомый участник</p>
                      </div>
                      {data?.mark && (
                        <div className="details_div">
                          <div className="details_label">Марка</div>
                          <p> {data?.mark}</p>
                        </div>
                      )}
                      {data?.plateNumber && (
                        <div className="details_div">
                          <div className="details_label">Номерной знак</div>
                          <p> {data?.plateNumber}</p>
                        </div>
                      )}
                      {data?.vin && (
                        <div className="details_div">
                          <div className="details_label">VIN код</div>
                          <p> {data?.vin}</p>
                        </div>
                      )}
                      {data?.yearOfCreation && (
                        <div className="details_div">
                          <div className="details_label">Год выпуска</div>
                          <p> {data?.yearOfCreation}</p>
                        </div>
                      )}
                      {data?.body && (
                        <div className="details_div">
                          <div className="details_label">Номер кузова</div>
                          <p> {data?.body}</p>
                        </div>
                      )}
                      {data?.engine && (
                        <div className="details_div">
                          <div className="details_label">Номер двигателя</div>
                          <p> {data?.engine}</p>
                        </div>
                      )}
                      {data?.chassis && (
                        <div className="details_div">
                          <div className="details_label">Номер шасси</div>
                          <p> {data?.chassis}</p>
                        </div>
                      )}
                      {data?.comment && (
                        <div className="details_div">
                          <div className="details_label">Комментарий</div>
                          <p> {data?.comment}</p>
                        </div>
                      )}
                    </>
                  </Card>
                </div>
              </ExpandCards>
            )}

            {data?.accidents?.length ? (
              <SpektrAccidents accidents={data?.accidents} />
            ) : null}
          </>
        </Accordion>
      )}
    </>
  );
};

export default memo(Spektr);
