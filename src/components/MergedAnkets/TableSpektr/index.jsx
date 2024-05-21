import React, { useId } from "react";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import moment from "moment";
import { v4 as uuid } from "uuid";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";

const TableSpektr = ({ data, handleCustomModal }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const hasName = data?.firstname || data?.patronymic || data?.lastname;
  const hasCarInfo =
    data?.mark ||
    data?.vin ||
    data?.yearOfCreation ||
    data?.engine ||
    data?.body ||
    data?.chassis ||
    data?.comment;
  const cardsSpektrId = useId();

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица SPEKTR</Title>
        <div className="accordion_table_actions">
          <Button
            text="Добавить в кастомную анкету"
            Icon={Custom}
            func={() => handleCustomModal(data)}
          />
        </div>
      </div>

      <div className="accordion_table_body">
        <div className="details_main">
          <div className="details_grid details_grid_big">
            {hasName && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4">ФИО</Title>
                    <p>
                      {data?.lastname} {data?.firstname} {data?.patronymic}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {data?.dob && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4">Дата рождения</Title>
                    <p>
                      {moment(data?.dob).format("YYYY-MM-DD")} -{" "}
                      {moment().diff(`${data?.dob}`, "years")} лет
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {hasCarInfo && (
        <div className="accordion_table_expandwrapper">
          <div className="accordion_table_expandcards">
            <Card>
              <>
                {data?.mark && (
                  <div className="details_div">
                    <div className="details_label">Марка авто</div>
                    <p>{data?.mark}</p>
                  </div>
                )}
                {data?.vin && (
                  <div className="details_div">
                    <div className="details_label">VIN код</div>
                    <p>{data?.vin}</p>
                  </div>
                )}
                {data?.yearOfCreation && (
                  <div className="details_div">
                    <div className="details_label">Год выпуска</div>
                    <p>{data?.yearOfCreation}</p>
                  </div>
                )}
                {data?.engine && (
                  <div className="details_div">
                    <div className="details_label">Номер двигателя</div>
                    <p>{data?.engine}</p>
                  </div>
                )}
                {data?.body && (
                  <div className="details_div">
                    <div className="details_label">Номер кузова</div>
                    <p>{data?.body}</p>
                  </div>
                )}
                {data?.chassis && (
                  <div className="details_div">
                    <div className="details_label">Номер шасси</div>
                    <p>{data?.chassis}</p>
                  </div>
                )}
                {data?.comment && (
                  <div className="details_div">
                    <div className="details_label">Комментарий</div>
                    <p>{data?.comment}</p>
                  </div>
                )}
              </>
            </Card>
          </div>
        </div>
      )}

      {data.accidents ? (
        <div className="spektr_section_content">
          <div className="accordion_table_expandwrapper">
            <div className="expand_cards_container">
              <ExpandCards>
                {data?.accidents.map(
                  ({
                    accidentDate,
                    accidentType,
                    participants,
                    accidentId,
                  }) => {
                    return (
                      <div
                        className="spektr_details"
                        key={uuid()}
                        style={{
                          borderRadius: "16px",
                          padding: "24px 16px",
                          background: isDarkTheme
                            ? "#2C323B"
                            : "linear-gradient(180deg, #f6f8fa 0%, rgba(246, 248, 250, 0.5) 100%)",
                        }}
                      >
                        <div className="details_title">
                          <div className="title_head">
                            <Title Tag="h3">{accidentType} - </Title>
                            <Title Tag="h3" titleType={"title_secondary"}>
                              {moment(accidentDate).format("YYYY-MM-DD")}
                            </Title>
                          </div>
                          {participants && (
                            <p className="spektr_participants">
                              Список участников:
                            </p>
                          )}
                        </div>
                        <div className="expand_cards_row">
                          {participants.map(
                            ({ personInfo, vehicleInfo }, i) => {
                              const uniqid = `table${cardsSpektrId}${i}${accidentId}`;
                              return (
                                <ExpandCard
                                  key={uuid()}
                                  id={uniqid}
                                  title={personInfo.relation}
                                >
                                  <>
                                    {personInfo?.relation && (
                                      <div>
                                        <div className="expand_content_title">
                                          Тип участника
                                        </div>
                                        <p>{personInfo.relation}</p>
                                      </div>
                                    )}
                                    <div>
                                      <div className="expand_content_title">
                                        ФИО
                                      </div>
                                      <p>
                                        {personInfo.surname} {personInfo.name}{" "}
                                        {personInfo.patronymic}
                                      </p>
                                    </div>
                                    {personInfo?.birthDate && (
                                      <div>
                                        <div className="expand_content_title">
                                          День рождения
                                        </div>
                                        <p>
                                          {" "}
                                          {moment(personInfo.birthDate).format(
                                            "YYYY-MM-DD",
                                          )}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                  <>
                                    {vehicleInfo?.make && (
                                      <div>
                                        <div className="expand_content_title">
                                          Автомобиль
                                        </div>
                                        <p>{vehicleInfo.make}</p>
                                      </div>
                                    )}
                                    {vehicleInfo?.plateNumber && (
                                      <div>
                                        <div className="expand_content_title">
                                          Номерной знак
                                        </div>
                                        <p>{vehicleInfo.plateNumber}</p>
                                      </div>
                                    )}
                                    {vehicleInfo?.vin && (
                                      <div>
                                        <div className="expand_content_title">
                                          VIN код
                                        </div>
                                        <p>{vehicleInfo.vin}</p>
                                      </div>
                                    )}
                                  </>
                                </ExpandCard>
                              );
                            },
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </ExpandCards>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TableSpektr;
