import { memo } from "react";
import { v4 as uuid } from "uuid";
import ExpandCards from "components/app/base/ExpandCards";
import Card from "components/app/base/Card";
import Accordion from "components/app/base/Accordion";
import { ReactComponent as Car } from "assets/images/car.svg";

const Parkings = ({ data }) => {
  return (
    <Accordion title="Парковки" Icon={Car}>
      <>
        <ExpandCards>
          <div className="expand_cards_row expand_cards_row-4">
            {data?.map(({ phone, plateNumber, mark }) => {
              return (
                <Card key={uuid()}>
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "8px",
                      }}
                    >
                      {mark && (
                        <div className="details_div">
                          <div className="details_label">Марка</div>
                          <p>{mark || "-"}</p>
                        </div>
                      )}
                      <div className="details_div">
                        <div className="details_label">Номерной знак</div>
                        <p>{plateNumber || "-"}</p>
                      </div>
                    </div>
                    <div className="details_div">
                      <div className="details_label">Телефон</div>
                      <p>{phone || "-"}</p>
                    </div>
                  </>
                </Card>
              );
            })}
          </div>
        </ExpandCards>
      </>
    </Accordion>
  );
};

export default memo(Parkings);
