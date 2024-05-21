import moment from "moment";
import { v4 as uuid } from "uuid";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import Button from "components/app/use/Button";
import Title from "components/app/use/Title";
import IconTitle from "components/app/use/Title/IconTitle";
import Card from "components/app/base/Card";
import { ReactComponent as UserPhoto } from "assets/images/user_photo.svg";
import { ReactComponent as NoPhoto } from "assets/images/no_photo.svg";
import { ReactComponent as Gender } from "assets/images/gender.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";

const TableAnket = ({ data, handleCustomModal, handleVisibleALl }) => {
  const hasSecret =
    data?.departureRestrictions ||
    data?.diplCountry ||
    data?.diplSecretAccess ||
    data?.diplTopSecretDescription ||
    data?.diplTopSecretInfo ||
    data?.topSecretAccessInfo ||
    data?.secretAccess ||
    data?.diplWorkPlace;

  return (
    <div className="accordion_table " style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Анкет</Title>
        <div className="accordion_table_actions">
          <Button
            text="Добавить в кастомную анкету"
            Icon={Custom}
            func={() => handleCustomModal(data)}
          />
        </div>
      </div>
      <div className="accordion_table_body">
        {(data?.photos || data?.photos?.signatures?.length || data?.gender) && (
          <div className="details_aside_row">
            {data?.photos && (
              <>
                <div className="photo_view">
                  {data?.photos?.avatars?.length ? (
                    <img
                      src={`data:image/png;base64, ${data.photos?.avatars[0]} `}
                      alt=""
                    />
                  ) : (
                    <div className="no_photo_wrapper">
                      <NoPhoto />
                    </div>
                  )}
                </div>
                {data?.photos?.displayPhotos?.length ? (
                  <Button
                    text={`Все фото (${data.photos?.displayPhotos?.length})`}
                    className="view_all_photo"
                    func={() => handleVisibleALl(data.photos?.displayPhotos)}
                    Icon={UserPhoto}
                  />
                ) : null}
              </>
            )}
            {data?.gender && (
              <div className="details_div">
                <div className="details_label">Пол</div>
                <div className="details_div details_div-row">
                  <IconTitle Icon={Gender} />
                  <p className="details_desc">{data?.gender}</p>
                </div>
              </div>
            )}
            {data?.photos?.signatures?.length ? (
              <div className="details_div">
                <div className="details_label">Подпись</div>
                <p>
                  <img
                    style={{
                      width: "200px",
                      height: "65px",
                      borderRadius: "8px",
                      border: "1px solid rgb(209, 213, 219)",
                    }}
                    src={`data:image/png;base64,${data?.photos?.signatures[0]}`}
                    alt=""
                  />
                </p>
              </div>
            ) : null}
          </div>
        )}
        <div className="details_main">
          <div className="details_grid details_grid_big">
            {(data?.lastname || data?.firstname || data?.patronymic) && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Profile}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      ФИО
                    </Title>
                    <p>
                      {data?.lastname} {data?.firstname} {data?.patronymic}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {data?.dob ? (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Calendar}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Дата рождения
                    </Title>
                    <p>
                      {moment(data?.dob).format("YYYY-MM-DD")} -{" "}
                      {moment().diff(`${data?.dob}`, "years")} лет
                    </p>
                  </div>
                </div>
              </Card>
            ) : null}

            {data?.email && data?.email !== " " && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Mail}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Электронная почта
                    </Title>
                    <p>{data?.email || "-"}</p>
                  </div>
                </div>
              </Card>
            )}

            {data?.phone && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title
                      Tag="h4"
                      Icon={Phone}
                      IconWidth="20px"
                      IconHeight="20px"
                    >
                      Номер телефона
                    </Title>
                    <p>{data?.phone || "-"}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {data?.addressInfo && (
        <Card>
          <div className="details_div">
            <div className="details_label">Адрес</div>
            <p className="details_desc">
              {data?.addressInfo?.country}{" "}
              {data?.addressInfo?.region && <>{data?.addressInfo?.region}.</>}{" "}
              {data?.addressInfo?.province && (
                <>{data?.addressInfo?.province}.</>
              )}{" "}
              {data?.addressInfo?.locality && (
                <>{data?.addressInfo?.locality}.</>
              )}{" "}
              {data?.addressInfo?.town} {data?.addressInfo?.address}
              {data?.addressInfo?.street}{" "}
              {data?.addressInfo?.house
                ? ` Дом ${data?.addressInfo?.house},`
                : ""}{" "}
              {data?.addressInfo?.housing
                ? ` Корпус ${data?.addressInfo?.housing},`
                : ""}{" "}
              {data?.addressInfo?.flat ? `кв ${data?.addressInfo?.flat}` : ""}{" "}
              {data?.addressInfo?.postindex && (
                <>Индекс {data?.addressInfo?.postindex}</>
              )}{" "}
            </p>
            <p className="details_desc">
              {data?.addressRegistrationDate && (
                <>
                  Дата регистрации:{" "}
                  {moment(data?.addressRegistrationDate).format("YYYY-MM-DD")}
                </>
              )}
            </p>
          </div>
        </Card>
      )}

      {(data?.foreignPassport || data?.localPassport) && (
        <div className="accordion_table_section">
          <Title Tag="h4">Паспорта</Title>
          <div style={{ paddingTop: "16px" }}>
            <div className="accordion_list">
              {data?.localPassport ? (
                <div className="accordion_col">
                  <Card>
                    <div className="accordion_col_header">
                      <div>
                        <div className="accordion_col_title">
                          Паспорт РФ серия/номер
                        </div>
                        <p>
                          {data?.localPassport?.localPassportSeries ||
                            "No data"}{" "}
                          |{" "}
                          {data?.localPassport?.localPassportNumber ||
                            "No data"}
                        </p>
                      </div>
                    </div>
                    <div className="accordion_col_body">
                      {data?.localPassport?.issuedBy && (
                        <div className="details_div">
                          <div className="details_label">Выдан</div>
                          <p className="details_desc">
                            {data?.localPassport?.issuedBy}
                          </p>
                        </div>
                      )}
                      {data?.localPassport?.issuedate && (
                        <div className="details_div">
                          <div className="details_label">
                            Действителен от-до
                          </div>
                          <p className="details_desc">
                            {data?.localPassport?.issuedate} -{" "}
                            {data?.localPassport?.localPassportDateOfExpiry ||
                              "No data"}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ) : null}

              {data?.foreignPassport ? (
                <div className="accordion_col">
                  <Card>
                    <div className="accordion_col_header">
                      <div>
                        <div className="accordion_col_title">
                          Загран. паспорт номер
                        </div>
                        <p>
                          {data?.foreignPassport?.foreignPassportNumber ||
                            "No data"}
                        </p>
                      </div>
                    </div>
                    <div className="accordion_col_body">
                      {data?.foreignPassport?.department && (
                        <div className="details_div">
                          <div className="details_label">Кем выдан</div>
                          <p>{data?.foreignPassport?.department}</p>
                        </div>
                      )}
                      {(data?.foreignPassport?.dateofissue ||
                        data?.foreignPassport?.dateOfExpiry) && (
                        <div className="details_div">
                          <div className="details_label">
                            Действителен от-до
                          </div>
                          <p>
                            {data?.foreignPassport?.dateofissue || "No data"} -{" "}
                            {data?.foreignPassport?.dateOfExpiry || "No data"}
                          </p>
                        </div>
                      )}
                      {data?.foreignPassport?.mrz1 && (
                        <div className="details_div">
                          <div className="details_label">Загран MRZ1</div>
                          <p>{data?.foreignPassport?.mrz1}</p>
                        </div>
                      )}
                      {data?.foreignPassport?.mrz2 && (
                        <div className="details_div">
                          <div className="details_label">Загран MRZ2</div>
                          <p>{data?.foreignPassport?.mrz2}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {((data?.nationality && data?.nationality !== " ") ||
        (data?.snils && data?.snils !== " ") ||
        (data?.inn && data?.inn !== " ")) && (
        <div className="accordion_table_section">
          <Title Tag="h4">Паспортные данные</Title>

          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.inn && data?.inn !== " " && (
              <div className="details_div">
                <div className="details_label">ИНН</div>
                <p className="details_desc">{data?.inn}</p>
              </div>
            )}
            {data?.nationality && (
              <div className="details_div">
                <div className="details_label">Национальность</div>
                <p>{data?.nationality}</p>
              </div>
            )}
            {data?.snils && data?.snils !== " " && (
              <div className="details_div">
                <div className="details_label">№ Соц страхования</div>
                <p>{data?.snils}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {data?.jobHistory && (
        <div className="accordion_table_section">
          <Title Tag="h4">Работа</Title>
          <div className="details_table">
            {data?.jobHistory?.map(
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
      )}

      {hasSecret && (
        <div className="accordion_table_section">
          <Title Tag="h4">Ограничения / Привелегии</Title>

          <div style={{ paddingTop: "16px" }}>
            {data?.departureRestrictions && (
              <div className="details_div">
                <div className="details_label">Ограничение на выезд</div>
                <p>{data?.departureRestrictions}</p>
              </div>
            )}
            {data?.diplCountry && (
              <div className="details_div">
                <div className="details_label">Страна дип. пребывания</div>
                <p>{data?.diplCountry}</p>
              </div>
            )}
            {data?.diplSecretAccess && (
              <div className="details_div">
                <div className="details_label">Доступ к дип. тайне</div>
                <p>{data?.diplSecretAccess}</p>
              </div>
            )}
            {data?.diplTopSecretDescription && (
              <div className="details_div">
                <div className="details_label">Детали секретного доступа</div>
                <p>{data?.diplTopSecretDescription}</p>
              </div>
            )}
            {data?.diplTopSecretInfo && (
              <div className="details_div">
                <div className="details_label">
                  Доступ к совершенно секретной информации
                </div>
                <p>{data?.diplTopSecretInfo}</p>
              </div>
            )}
            {data?.topSecretAccessInfo && (
              <div className="details_div">
                <div className="details_label">Доступ к гос.тайне</div>
                <p>{data?.topSecretAccessInfo}</p>
              </div>
            )}
            {data?.secretAccess && (
              <div className="details_div">
                <div className="details_label">Секретный доступ</div>
                <p>{data?.secretAccess}</p>
              </div>
            )}
            {data?.diplWorkPlace && (
              <div className="details_div">
                <div className="details_label">Дип. место работы</div>
                <p>{data?.diplWorkPlace}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {data?.militaryInfo?.militaryService && (
        <div className="accordion_table_section">
          <Title Tag="h4">Воинская служба</Title>

          <div style={{ paddingTop: "16px" }}>
            <div className="details_div">
              <div className="details_label">Место прохождения службы</div>
              <p>{data?.militaryInfo?.militaryService}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableAnket;
