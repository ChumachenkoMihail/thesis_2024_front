import Logo from "assets/images/Kermit_ico32.png";
import React from "react";
import { v4 as uuid } from "uuid";
import moment from "moment";
import HtmlExportTable from "components/app/base/Table/HtmlExportTable";
import { generateSirenaColumn } from "libs/generatedСolumns/generateSirenaColumn";
import { generateTelegramColumn } from "libs/generatedСolumns/generateTelegramColumn";
import { createColumns } from "libs/generatedСolumns/generateColumnWithSort";
import { EgronColumns } from "../../../../libs/generatedСolumns/egron";
import { generateColumnsLeakCheck } from "../../../../libs/generatedСolumns/generateColumnsLeakCheck";
import { copyToTextClipboard } from "../../../../libs/clipboardCopy";

const ExportHtml = ({ data }) => {
  const titleGray600 = {
    fontWeight: "600",
    lineHeight: "24px",
    textAlign: "left",
    color: "#2C323B",
  };
  const titleGray700 = {
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "27px",
    textAlign: "left",
    color: "#2C323B",
  };
  const column24 = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const hasSecretData =
    data?.departureRestrictions ||
    data?.diplCountry ||
    data?.diplSecretAccess ||
    data?.diplTopSecretDescription ||
    data?.diplTopSecretInfo ||
    data?.topSecretAccessInfo ||
    data?.secretAccess ||
    data?.diplWorkPlace;
  const hasPhotos =
    data?.photos?.displayPhotos ||
    data?.photos?.signatures ||
    data?.bindedPhotos;
  const hasPassport = data?.foreignPassportArray || data?.foreignPassport;
  const hasLocalPassport = data?.localPassport || data?.localPassportArray;
  const hasPersonalInfo =
    data?.photos?.avatars ||
    data?.placeOfBirth ||
    data?.gender ||
    data?.photos?.signatures ||
    data?.photos?.avatars;
  const hasSocial =
    data?.ip ||
    data?.login ||
    data?.password ||
    data?.numBusterTags ||
    data?.insuranceCompany ||
    data?.insuranceNumber ||
    data?.getContactTags ||
    data?.serialSim ||
    data?.imsi ||
    data?.sourceName ||
    data?.facebookId ||
    data?.mailruProfile ||
    data?.webLink ||
    data?.vkId ||
    data?.family_status ||
    data?.post ||
    data?.linkedinLink ||
    data?.credit_amount ||
    data?.osp ||
    data?.debt_amount;
  const hasNames =
    data?.lastname || data?.firstname || data?.patronymic || data?.fio;
  const hasDopPassportData =
    data?.passportAddress ||
    data?.passport ||
    data?.someDocument ||
    data?.nationality ||
    data?.passportIssuedBy ||
    data?.passportNumber ||
    data?.documents ||
    data?.snils ||
    (data?.inn && data?.inn !== " ");
  const hasAddress =
    data?.actualAddress ||
    data?.addressInfo ||
    data?.addressArray ||
    data?.latitude ||
    data?.longitude ||
    data?.address ||
    data?.addressRegistrationDate ||
    data?.addressRegistrationDateArray;
  const hasEmail = data?.email && data?.email !== " ";
  const hasInn = data?.inn && data?.inn !== " ";
  const hasPhones =
    data?.relatedPhones ||
    data?.phone ||
    data?.phone_home ||
    data?.beelinePhones;
  const hasSpektr =
    data?.comment ||
    data?.body ||
    data?.chassis ||
    data?.accidents ||
    data?.vin ||
    data?.plateNumber ||
    data?.mark ||
    data?.yearOfCreation ||
    data?.engine;
  const hasSpektrTopBlock =
    data?.comment ||
    data?.body ||
    data?.chassis ||
    data?.vin ||
    data?.plateNumber ||
    data?.mark ||
    data?.yearOfCreation ||
    data?.engine;
  // const hasRelativies =
  //   data?.firstname;
  const generatedColumns = generateSirenaColumn(data?.passengers) || [];
  const passengersFlightName = data?.passengers?.find(
    (item) => item.departure_point && item.arrival_point,
  );
  return (
    <div className="kermit_html">
      <div className="html_inner">
        <div
          className="html_container"
          style={{
            maxWidth: "1344px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <header className="html_header">
            {passengersFlightName && (
              <h3>
                {`Рейс ${passengersFlightName?.departure_point} - ${passengersFlightName?.arrival_point}`}
              </h3>
            )}
            <h3
              className="main_title"
              style={{
                fontWeight: "700",
                color: "#69788C",
              }}
            >
              {data?.lastname} {data?.firstname} {data?.patronymic}
            </h3>

            <div
              className="logo"
              style={{
                color: "#69788C",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img width="32px" height="32px" src={Logo} alt="" />
              Detective Kermit
            </div>
          </header>
          <div className="html_content">
            {data?.passengers && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  {`Все пассажиры`}
                </summary>
                <div className="accordion_body">
                  <div className="table_box">
                    <HtmlExportTable
                      data={data?.passengers}
                      columns={generatedColumns}
                      size="small"
                    />
                  </div>
                </div>
              </details>
            )}
          </div>
          <div className="html_content">
            {!data?.passengers ? (
              <div className="content_section">
                <div className="content_head_info">Личная информация</div>
                <div className="personal_info_row personal_info_main">
                  {hasPersonalInfo && (
                    <div className="row_item">
                      {data?.photos?.avatars?.length ? (
                        <figure className="profile_avatar">
                          <img
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "100%",
                            }}
                            src={`data:image/png;base64, ${data?.photos?.avatars[0]} `}
                            alt=""
                          />
                        </figure>
                      ) : null}
                      <div className="column-gap-24" style={column24}>
                        {data?.photos?.signatures?.length ? (
                          <div>
                            <div className="title_bold_700">Подпись</div>
                            <img
                              style={{
                                width: "200px",
                                height: "65px",
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                              }}
                              src={`data:image/png;base64,${data?.photos?.signatures[0]}`}
                              alt=""
                            />
                          </div>
                        ) : null}
                        {data?.gender && (
                          <div>
                            <div className="title_bold_700">Пол</div>
                            {Array.isArray(data?.gender) ? (
                              <>
                                <p className="desc">
                                  {data?.gender.map((item) => {
                                    return (
                                      <React.Fragment key={uuid()}>
                                        {item}
                                        {", "}
                                      </React.Fragment>
                                    );
                                  })}
                                </p>
                              </>
                            ) : (
                              <p className="desc" style={titleGray700}>
                                {data.gender}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="row_item">
                    <div className="info_container">
                      <div className="info_card">
                        {hasNames && (
                          <>
                            <div className="title_bold_700">ФИО</div>
                            <p className="desc" style={titleGray600}>
                              {data?.lastname} {data?.firstname}{" "}
                              {data?.patronymic}
                            </p>
                          </>
                        )}
                        {data?.name && (
                          <>
                            <div className="title_bold_700">Имя</div>
                            <p className="desc" style={titleGray600}>
                              {data?.name}
                            </p>
                          </>
                        )}
                        {data?.potentialNames && (
                          <div className="info_sources">
                            <div className="title_blue_600">
                              ФИО из других источников
                            </div>
                            {data.potentialNames?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item.value}{" "}
                                  {item?.dob
                                    ? `(${moment(item.dob).format(
                                        "YYYY-MM-DD",
                                      )})`
                                    : ""}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {data?.dob && (
                        <div className="info_card">
                          <div className="title_bold_700">Дата рождения</div>
                          {Array.isArray(data.dob) ? (
                            <>
                              {data?.dob.map((item) => {
                                return (
                                  <p className="title_gray_500" key={uuid()}>
                                    {moment(item.value).format("YYYY-MM-DD")} -{" "}
                                    {moment().diff(`${item.value}`, "years")}{" "}
                                    лет ({item.source})
                                  </p>
                                );
                              })}
                            </>
                          ) : (
                            <p className="title_gray_500">
                              {moment(data.dob).format("YYYY-MM-DD")} -{" "}
                              {moment().diff(`${data?.dob}`, "years")} лет
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="hr24"></div>
                    <div
                      className="info_card_conainer"
                      style={{
                        gridTemplateRows: " auto 2fr 0px",
                        gridTemplateColumns: "repeat(2, minmax(200px, 600px))",
                        gridAutoRows: "1fr",
                        columnGap: "24px",
                      }}
                    >
                      {hasEmail && (
                        <div className="info_card">
                          <div className="title_bold_700">
                            Электронная почта
                          </div>
                          {Array.isArray(data?.email) ? (
                            <>
                              {data?.email.map((item) => {
                                return (
                                  <p className="title_gray_500" key={uuid()}>
                                    {item.value}{" "}
                                    {item.source ? `(${item.source})` : ""}
                                  </p>
                                );
                              })}
                            </>
                          ) : (
                            <p className="title_gray_500">{data.email}</p>
                          )}
                        </div>
                      )}

                      {hasPhones && (
                        <div className="info_card">
                          {data.phone && (
                            <>
                              <div className="title_bold_700">
                                Номер телефона
                              </div>
                              {Array.isArray(data.phone) ? (
                                <>
                                  {data?.phone.map((item) => {
                                    return (
                                      <p
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        {item.value}{" "}
                                        {item?.source
                                          ? `(${item?.source})`
                                          : ""}
                                      </p>
                                    );
                                  })}
                                </>
                              ) : (
                                <p className="title_gray_500">{data.phone}</p>
                              )}
                            </>
                          )}
                          {data.beelinePhones?.length ? (
                            <>
                              <div className="title_bold_700">
                                Телефоны Билайн
                              </div>
                              {data.beelinePhones?.map(({ phone, finRole }) => {
                                return (
                                  <p className="title_gray_500">
                                    {phone} - {finRole}
                                  </p>
                                );
                              })}
                            </>
                          ) : null}
                          {data.phone_home && (
                            <>
                              <div className="title_bold_700">
                                Домашний телефон
                              </div>
                              {Array.isArray(data.phone_home) ? (
                                <>
                                  {data?.phone_home.map((item) => {
                                    return (
                                      <p
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        {item}
                                      </p>
                                    );
                                  })}
                                </>
                              ) : (
                                <p className="title_gray_500">
                                  {data.phone_home}
                                </p>
                              )}
                            </>
                          )}
                          {data.work_phone && (
                            <>
                              <div className="title_bold_700">
                                Рабочий телефон
                              </div>
                              {Array.isArray(data.work_phone) ? (
                                <>
                                  {data?.work_phone.map((item) => {
                                    return (
                                      <p
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        {item}
                                      </p>
                                    );
                                  })}
                                </>
                              ) : (
                                <p className="title_gray_500">
                                  {data.work_phone}
                                </p>
                              )}
                            </>
                          )}
                          {data?.relatedPhones && (
                            <>
                              <div className="title_bold_700">
                                Похожие телефоны
                              </div>
                              <>
                                {data?.relatedPhones?.map((item) => {
                                  return (
                                    <p className="title_gray_500" key={uuid()}>
                                      {item}
                                    </p>
                                  );
                                })}
                              </>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {data.estates && (
              <details>
                <summary className="content_head accordion-head">ЕГРОН</summary>
                <div className="accordion_body">
                  {data.estates.map(
                    ({ history, address, area, cadNumber, price }) => {
                      return (
                        <>
                          <div className="accordion_grid">
                            <div className="bordered">
                              {cadNumber && (
                                <div>
                                  <div className="title_blue_600">
                                    Кадастровый номер
                                  </div>
                                  <p className="title_gray_500">{cadNumber}</p>
                                </div>
                              )}
                              {area && (
                                <div>
                                  <div className="title_blue_600">Площадь</div>
                                  <p className="title_gray_500">
                                    {area || "No data"}
                                  </p>
                                </div>
                              )}

                              {address && (
                                <div>
                                  <div className="title_blue_600">Адрес</div>
                                  <p className="title_gray_500">
                                    {address || "No data"}
                                  </p>
                                </div>
                              )}
                              {price && (
                                <div>
                                  <div className="title_blue_600">
                                    Стоимость
                                  </div>
                                  <p className="title_gray_500">
                                    {price || "No data"} ₽
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          {history?.length ? (
                            <div
                              className="table_box"
                              style={{
                                margin: "15px 0 15px 0",
                              }}
                            >
                              <div className="table_title">
                                Действия по объекту - {cadNumber}
                              </div>
                              <HtmlExportTable
                                size="small"
                                data={history}
                                columns={EgronColumns}
                              />
                            </div>
                          ) : null}
                        </>
                      );
                    },
                  )}
                </div>
              </details>
            )}
            {data?.sirenaInsuranceInfo && (
              <details>
                <summary className="content_head accordion-head">
                  Сирена страховки
                </summary>
                <div className="accordion_body">
                  {data?.sirenaInsuranceInfo.map((ins) => {
                    const getInsureColumn = createColumns([ins]) || [];
                    return (
                      <div
                        className="table_box"
                        style={{
                          margin: "0 0 15px 0",
                        }}
                      >
                        <HtmlExportTable
                          size="small"
                          data={[ins]}
                          columns={getInsureColumn}
                        />
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
            {data?.sirenaTrainTicketInfo && (
              <details>
                <summary className="content_head accordion-head">
                  Сирена поезда
                </summary>
                <div className="accordion_body">
                  {data.sirenaTrainTicketInfo?.map((ticket) => {
                    const getTicketColumn = createColumns([ticket]) || [];
                    const getPassengersTickets =
                      createColumns(ticket.passengers) || [];
                    return (
                      <div
                        className="table_box"
                        style={{
                          margin: "0 0 15px 0",
                        }}
                      >
                        <div className="table_title">
                          № брони: {ticket.regnum}
                        </div>
                        <HtmlExportTable
                          size="small"
                          data={[ticket]}
                          columns={getTicketColumn}
                        />
                        {ticket.passengers?.length && getPassengersTickets ? (
                          <div className="table_sub">
                            <div className="table_title">
                              Попутчики: {ticket.regnum}
                            </div>
                            <HtmlExportTable
                              size="small"
                              data={ticket.passengers}
                              columns={getPassengersTickets}
                            />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
            {data?.sirenaTicketInfo && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Сирена билеты
                </summary>
                <div className="accordion_body">
                  {data?.sirenaTicketInfo?.map((item) => {
                    const relatedTicketsColumns =
                      generateSirenaColumn(item?.relatedTickets) || [];
                    const getTicketColumn = generateSirenaColumn([item]) || [];
                    return (
                      <div
                        className="table_box"
                        style={{
                          margin: "0 0 15px 0",
                        }}
                      >
                        <div className="table_title">
                          № брони: {item.regnum}
                        </div>
                        <HtmlExportTable
                          size="small"
                          data={[item]}
                          columns={getTicketColumn}
                        />
                        {relatedTicketsColumns &&
                          item?.relatedTickets?.length && (
                            <div className="table_sub">
                              <div className="table_title">
                                Связанные билеты: {item.regnum}
                              </div>
                              <HtmlExportTable
                                size="small"
                                data={item.relatedTickets}
                                columns={relatedTicketsColumns}
                              />
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
            {data?.sirenaPassenger && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Сирена Пасажиры
                </summary>
                <div className="accordion_body">
                  {data?.sirenaPassenger?.map((item) => {
                    const passengerColumns = generateSirenaColumn([item]) || [];

                    return (
                      <div
                        className="table_box"
                        style={{
                          margin: "0 0 15px 0",
                        }}
                      >
                        <div className="table_title">
                          Рейс:{" "}
                          {`${item?.pointOfDeparture} - ${item?.destination} `}
                        </div>
                        <HtmlExportTable
                          data={[item]}
                          columns={passengerColumns}
                          size="small"
                        />
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
            {hasAddress && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Адреса
                </summary>
                <div className="accordion_body">
                  <div className="personal_info_row">
                    <div className="row_item">
                      <div className="address_col">
                        {data?.addressInfo || data?.addressRegistrationDate ? (
                          <div className="address_grid">
                            {data?.addressInfo && (
                              <div>
                                <div className="title_bold_700">Адрес</div>
                                <p className="title_gray_500">
                                  {data?.addressInfo?.country}{" "}
                                  {data?.addressInfo?.region && (
                                    <>{data?.addressInfo?.region}.</>
                                  )}{" "}
                                  {data?.addressInfo?.province && (
                                    <>{data?.addressInfo?.province}.</>
                                  )}{" "}
                                  {data?.addressInfo?.locality && (
                                    <>{data?.addressInfo?.locality}.</>
                                  )}{" "}
                                  {data?.addressInfo?.town}{" "}
                                  {data?.addressInfo?.address}
                                  {data?.addressInfo?.street}{" "}
                                  {data?.addressInfo?.house
                                    ? ` Дом ${data?.addressInfo?.house},`
                                    : ""}{" "}
                                  {data?.addressInfo?.housing
                                    ? ` Корпус ${data?.addressInfo?.housing},`
                                    : ""}{" "}
                                  {data?.addressInfo?.flat
                                    ? `кв ${data?.addressInfo?.flat}`
                                    : ""}{" "}
                                  {data?.addressInfo?.postindex && (
                                    <>Индекс {data?.addressInfo?.postindex}</>
                                  )}{" "}
                                </p>
                              </div>
                            )}
                            {data?.addressRegistrationDate && (
                              <div>
                                <div className="title_bold_700">
                                  Дата регистрации
                                </div>
                                {Array.isArray(
                                  data?.addressRegistrationDate,
                                ) ? (
                                  <>
                                    {data?.addressRegistrationDate.map(
                                      (item) => {
                                        return (
                                          <p
                                            className="title_gray_500"
                                            key={uuid()}
                                          >
                                            {moment(item).format("YYYY-MM-DD")}
                                            {", "}
                                          </p>
                                        );
                                      },
                                    )}
                                  </>
                                ) : (
                                  <p className="title_gray_500">
                                    {moment(
                                      data.addressRegistrationDate,
                                    ).format("YYYY-MM-DD")}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        ) : null}
                        <div className="address_div">
                          {data?.address && (
                            <div>
                              <div className="title_blue_600">Адрес</div>
                              {Array.isArray(data?.address) ? (
                                <>
                                  {data?.address.map((item) => {
                                    return <p key={uuid()}>{item}</p>;
                                  })}
                                </>
                              ) : (
                                <p>{data?.address}</p>
                              )}
                            </div>
                          )}
                          {data?.actualAddress && (
                            <div>
                              <div className="title_blue_600">
                                Адрес (Медицина)
                              </div>
                              {Array.isArray(data?.actualAddress) ? (
                                <>
                                  {data?.actualAddress.map((item) => {
                                    return <p key={uuid()}>{item}</p>;
                                  })}
                                </>
                              ) : (
                                <p>{data?.actualAddress}</p>
                              )}
                            </div>
                          )}
                          {data?.addressArray && (
                            <div className="address_list">
                              <div className="title_blue_600">
                                Адрес с других источников
                              </div>
                              {data?.addressArray.map(
                                ({
                                  town,
                                  housing,
                                  flat,
                                  postindex,
                                  region,
                                  address,
                                  street,
                                  house,
                                  country,
                                  province,
                                  locality,
                                }) => {
                                  return (
                                    <p className="title_gray_500" key={uuid()}>
                                      {country} {region && <>{region}.</>}{" "}
                                      {province && <>{province}.</>}{" "}
                                      {locality && <>{locality}.</>} {town}{" "}
                                      {address}
                                      {street} {house ? ` Дом ${house},` : ""}{" "}
                                      {housing ? ` Корпус ${housing},` : ""}{" "}
                                      {flat ? `кв ${flat}` : ""}{" "}
                                      {postindex && <>Индекс {postindex}</>}{" "}
                                    </p>
                                  );
                                },
                              )}
                            </div>
                          )}
                          {data?.addressRegistrationDateArray && (
                            <div>
                              <div className="title_blue_600">
                                Дата регистрации с других источников
                              </div>
                              {Array.isArray(
                                data?.addressRegistrationDateArray,
                              ) ? (
                                <>
                                  {data?.addressRegistrationDateArray.map(
                                    (item) => {
                                      return (
                                        <p
                                          className="title_gray_500"
                                          key={uuid()}
                                        >
                                          {moment(item).format("YYYY-MM-DD")}
                                        </p>
                                      );
                                    },
                                  )}
                                </>
                              ) : (
                                <p className="title_gray_500">
                                  {moment(data.addressRegistrationDate).format(
                                    "YYYY-MM-DD",
                                  )}
                                </p>
                              )}
                            </div>
                          )}
                          {data?.placeOfBirth && (
                            <div>
                              <div className="title_blue_600">
                                Место рождения
                              </div>
                              {Array.isArray(data?.placeOfBirth) ? (
                                <>
                                  {data?.placeOfBirth.map((item) => {
                                    return (
                                      <p
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        {item}
                                        {", "}
                                      </p>
                                    );
                                  })}
                                </>
                              ) : (
                                <p className="title_gray_500">
                                  {data.placeOfBirth}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            )}
            {hasDopPassportData && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Паспортные данные
                </summary>
                <div className="accordion_body">
                  <div className="passports_grid">
                    {hasInn && (
                      <div className="row_item">
                        <div className="title_blue_600">ИНН</div>
                        {Array.isArray(data?.inn) ? (
                          <>
                            {data.inn.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">{data.inn}</p>
                        )}
                      </div>
                    )}

                    {data?.snils && (
                      <div className="row_item">
                        <div className="title_blue_600">№ Соц страхования</div>
                        {Array.isArray(data.snils) ? (
                          <>
                            {data.snils.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">{data.snils}</p>
                        )}
                      </div>
                    )}

                    {data?.nationality && (
                      <div className="row_item">
                        <div className="title_blue_600">Национальность</div>
                        {Array.isArray(data.nationality) ? (
                          <>
                            {data.nationality.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">{data.nationality}</p>
                        )}
                      </div>
                    )}
                    {data?.someDocument && (
                      <div className="row_item">
                        <div className="title_blue_600">Доп. документы</div>
                        {Array.isArray(data.someDocument) ? (
                          <>
                            {data.someDocument.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">{data.someDocument}</p>
                        )}
                      </div>
                    )}
                    {data?.passport && (
                      <div className="row_item">
                        <div className="title_blue_600">Доп. паспорт</div>
                        {Array.isArray(data.passport) ? (
                          <>
                            {data.passport.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">{data.passport}</p>
                        )}
                      </div>
                    )}
                    {data?.passportAddress && (
                      <div className="row_item">
                        <div className="title_blue_600">
                          Паспорт адрес(база авто)
                        </div>
                        {Array.isArray(data.passportAddress) ? (
                          <>
                            {data.passportAddress.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">
                            {data.passportAddress}
                          </p>
                        )}
                      </div>
                    )}
                    {data?.passportNumber && (
                      <div className="row_item">
                        <div className="title_blue_600">Номер паспорта</div>
                        {Array.isArray(data.passportNumber) ? (
                          <>
                            {data.passportNumber.map((item) => {
                              return (
                                <p
                                  className="title_gray_500 title_fs_18"
                                  key={uuid()}
                                >
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">
                            {data.passportNumber}
                          </p>
                        )}
                      </div>
                    )}
                    {data?.passportIssuedBy && (
                      <div className="row_item">
                        <div className="title_blue_600">Кем выдан паспорт</div>
                        {Array.isArray(data.passportIssuedBy) ? (
                          <>
                            {data.passportIssuedBy.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">
                            {data.passportIssuedBy}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  {data?.documents ? (
                    <div>
                      <div className="table_title">Документы</div>
                      <div className="cdek_grid">
                        {data?.documents?.map(
                          ({
                            dcmSerialNo,
                            dcmNumber,
                            dcmIssueWhere,
                            dcmExpiryDate,
                            dcmDate,
                            dcmType,
                          }) => {
                            return (
                              <div className="bordered" key={uuid()}>
                                <div className="details_div">
                                  <div className="title_blue_600">
                                    Серия/Номер
                                  </div>
                                  <p className="title_gray_500">
                                    {dcmSerialNo || "-"} / {dcmNumber || "-"}
                                  </p>
                                </div>
                                {dcmType && (
                                  <div className="details_div">
                                    <div className="title_blue_600">Тип</div>
                                    <p className="title_gray_500">
                                      {dcmType || "-"}
                                    </p>
                                  </div>
                                )}
                                {dcmIssueWhere && (
                                  <div className="details_div">
                                    <div className="title_blue_600">
                                      Документ выдан
                                    </div>
                                    <p className="title_gray_500">
                                      {dcmIssueWhere || "-"}
                                    </p>
                                  </div>
                                )}
                                {dcmDate && (
                                  <div className="details_div">
                                    <div className="title_blue_600">
                                      Дата выдачи
                                    </div>
                                    <p className="title_gray_500">
                                      {dcmDate || "-"}
                                    </p>
                                  </div>
                                )}
                                {dcmExpiryDate && (
                                  <div className="details_div">
                                    <div className="title_blue_600">
                                      Срок действия
                                    </div>
                                    <p className="title_gray_500">
                                      {dcmExpiryDate || "-"}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </details>
            )}

            {hasPassport && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Загран паспорта
                </summary>
                <div className="accordion_body">
                  <div className="accordion_grid">
                    {data?.foreignPassport && (
                      <div className="bordered">
                        {data?.foreignPassport?.foreignPassportNumber && (
                          <div>
                            <div className="title_bold_700">Номер паспорта</div>
                            <p className="title_gray_500 title_fs_18">
                              {data?.foreignPassport?.foreignPassportNumber ||
                                "No data"}
                            </p>
                          </div>
                        )}
                        {data?.foreignPassport?.department && (
                          <div>
                            <div className="title_blue_600">Кем выдан</div>
                            <p className="title_gray_500">
                              {data?.foreignPassport?.department}
                            </p>
                          </div>
                        )}
                        <div>
                          <div className="title_blue_600">
                            Действителен от-до
                          </div>
                          <p className="title_gray_500">
                            {data?.foreignPassport?.dateofissue || "No data"}{" "}
                            {data?.foreignPassport?.dateOfExpiry
                              ? `- ${data?.foreignPassport?.dateOfExpiry}`
                              : null}
                          </p>
                        </div>
                        {data?.foreignPassport?.mrz1 && (
                          <div>
                            <div className="title_blue_600">Загран MRZ1</div>
                            <p className="title_gray_500">
                              {data?.foreignPassport?.mrz1}
                            </p>
                          </div>
                        )}
                        {data?.foreignPassport?.mrz2 && (
                          <div>
                            <div className="title_blue_600">Загран MRZ2</div>
                            <p className="title_gray_500">
                              {data?.foreignPassport?.mrz2}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {data?.foreignPassportArray ? (
                      <>
                        {data.foreignPassportArray.map(
                          ({
                            mrz2,
                            dateofissue,
                            mrz1,
                            dateOfExpiry,
                            foreignPassportNumber,
                            department,
                          }) => {
                            return (
                              <div className="bordered" key={uuid()}>
                                {foreignPassportNumber && (
                                  <div>
                                    <div className="title_blue_600">
                                      Номер паспорта
                                    </div>
                                    <p className="title_gray_500 title_fs_18">
                                      {foreignPassportNumber || "No data"}
                                    </p>
                                  </div>
                                )}
                                {department && (
                                  <div>
                                    <div className="title_blue_600">
                                      Кем выдан
                                    </div>
                                    <p className="title_gray_500">
                                      {department}
                                    </p>
                                  </div>
                                )}
                                <div>
                                  <div className="title_blue_600">
                                    Действителен от-до
                                  </div>
                                  <p className="title_gray_500">
                                    {dateofissue || "No data"}{" "}
                                    {dateOfExpiry ? `- ${dateOfExpiry}` : null}
                                  </p>
                                </div>
                                {mrz1 && (
                                  <div>
                                    <div className="title_blue_600">
                                      Загран MRZ1
                                    </div>
                                    <p className="title_gray_500">{mrz1}</p>
                                  </div>
                                )}
                                {mrz2 && (
                                  <div>
                                    <div className="title_blue_600">
                                      Загран MRZ2
                                    </div>
                                    <p className="title_gray_500">{mrz2}</p>
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </details>
            )}
            {data?.fsspList ? (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Приставы
                </summary>
                <div className="accordion_body">
                  <div className="pochta_grid">
                    {data?.fsspList?.map(({ osp, debt_amount }) => {
                      return (
                        <div className="bordered" key={uuid()}>
                          <div className="title_blue_600">
                            Пристав исполнитель
                            <p className="title_gray_500">{osp || "-"}</p>
                          </div>
                          <div className="title_blue_600">
                            Сумма задолженности
                            <p className="title_gray_500">
                              {debt_amount || "-"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </details>
            ) : null}
            {data?.accounts?.length ? (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Аккаунты почта банк
                </summary>
                <div className="accordion_body">
                  <div className="pochta_grid">
                    {data?.accounts?.map(({ amountCur, name, amountRub }) => {
                      return (
                        <div className="bordered" key={uuid()}>
                          <div className="title_blue_600">
                            ФИО
                            <p className="title_gray_500">{name || "-"}</p>
                          </div>
                          <div className="title_blue_600">
                            Состояние счета ₽ / валюта
                            <p className="title_gray_500">
                              {amountRub || "-"} / {amountCur || "-"}{" "}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </details>
            ) : null}
            {data?.newAuto && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Avtoins
                </summary>
                <div className="accordion_body">
                  <div className="avtoins_grid">
                    {data?.newAuto.map(
                      ({
                        userInfo,
                        carDrivers,
                        carOwners,
                        autoInfo,
                        drivers,
                        owners,
                      }) => {
                        return (
                          <div className="auto_grid">
                            <>
                              {autoInfo?.map(
                                ({
                                  yearIssue,
                                  vin,
                                  body_number,
                                  brand,
                                  chassis_number,
                                  enginePower,
                                  is_taxi,
                                  license_plate,
                                  model,
                                  veh_doc_date,
                                  veh_doc_number,
                                  veh_doc_serial,
                                  mark_model_other,
                                }) => {
                                  return (
                                    <div className="bordered" key={uuid()}>
                                      <div
                                        className="title_bold_700"
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        Искомое авто
                                      </div>
                                      {vin && (
                                        <div>
                                          <div className="title_blue_600">
                                            VIN код
                                          </div>
                                          <p className="title_gray_500">
                                            {vin || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {license_plate && (
                                        <div>
                                          <div className="title_blue_600">
                                            Номерное знак
                                          </div>
                                          <p className="title_gray_500">
                                            {license_plate || "-"}
                                          </p>
                                        </div>
                                      )}

                                      {brand && brand !== "0" ? (
                                        <div>
                                          <div className="title_blue_600">
                                            Марка
                                          </div>
                                          <p className="title_gray_500">
                                            {brand || "-"}
                                          </p>
                                        </div>
                                      ) : null}
                                      {mark_model_other &&
                                      mark_model_other !== "0" ? (
                                        <div>
                                          <div className="title_blue_600">
                                            Марка
                                          </div>
                                          <p className="title_gray_500">
                                            {mark_model_other || "-"}
                                          </p>
                                        </div>
                                      ) : null}
                                      {model && (
                                        <div>
                                          <div className="title_blue_600">
                                            Модель
                                          </div>
                                          <p className="title_gray_500">
                                            {model || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {yearIssue && (
                                        <div>
                                          <div className="title_blue_600">
                                            Год выпуска
                                          </div>
                                          <p className="title_gray_500">
                                            {yearIssue || "-"}
                                          </p>
                                        </div>
                                      )}
                                      <details className="details_more_accordion">
                                        <summary className="details_more"></summary>
                                        <div className="details_expand">
                                          {enginePower && (
                                            <div>
                                              <div className="title_blue_600">
                                                Мощность двигателя
                                              </div>
                                              <p className="title_gray_500">
                                                {enginePower || "-"}
                                              </p>
                                            </div>
                                          )}
                                          {chassis_number && (
                                            <div>
                                              <div className="title_blue_600">
                                                Номер шасси
                                              </div>
                                              <p className="title_gray_500">
                                                {chassis_number || "-"}
                                              </p>
                                            </div>
                                          )}
                                          {body_number && (
                                            <div>
                                              <div className="title_blue_600">
                                                Номер кузова
                                              </div>
                                              <p className="title_gray_500">
                                                {body_number || "-"}
                                              </p>
                                            </div>
                                          )}
                                          {veh_doc_date && (
                                            <div>
                                              <div className="title_blue_600">
                                                Дата выдачи документа на ТС
                                              </div>
                                              <p className="title_gray_500">
                                                {veh_doc_date || "-"}
                                              </p>
                                            </div>
                                          )}
                                          <div>
                                            <div className="title_blue_600">
                                              Серия\номер документа на ТС
                                            </div>
                                            <p className="title_gray_500">
                                              {veh_doc_serial || "-"} \{" "}
                                              {veh_doc_number}
                                            </p>
                                          </div>
                                          {is_taxi && (
                                            <div>
                                              <div className="title_blue_600">
                                                Использовалась в такси
                                              </div>
                                              <p className="title_gray_500">
                                                {is_taxi === "0"
                                                  ? "Нет"
                                                  : is_taxi === "1"
                                                  ? "Да"
                                                  : "Нет"}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </details>
                                    </div>
                                  );
                                },
                              )}
                            </>
                            <>
                              {owners?.map(
                                ({
                                  documents,
                                  dob,
                                  firstname,
                                  lastname,
                                  patronymic,
                                }) => {
                                  return (
                                    <div className="bordered" key={uuid()}>
                                      <div
                                        className="title_bold_700"
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        Владелeц искомого авто
                                      </div>
                                      <div>
                                        <div className="title_blue_600">
                                          ФИО
                                        </div>
                                        <p className="title_gray_500">
                                          {lastname} {firstname} {patronymic}
                                        </p>
                                      </div>
                                      <div>
                                        <div className="title_blue_600">
                                          Дата рождения
                                        </div>
                                        <p className="title_gray_500">
                                          {moment(dob).format("YYYY-MM-DD") ||
                                            "-"}
                                        </p>
                                      </div>
                                      {documents?.length ? (
                                        <details className="details_more_accordion_docs">
                                          <summary className="details_more_docs"></summary>
                                          <div className="details_expand documents_expand">
                                            {documents?.map(
                                              ({
                                                date_from,
                                                doc_number,
                                                doc_serial,
                                                doc_type,
                                              }) => {
                                                return (
                                                  <div
                                                    key={uuid()}
                                                    className="documents_grid"
                                                  >
                                                    <div>
                                                      <div className="title_blue_600">
                                                        Тип документа
                                                      </div>
                                                      <p className="title_gray_500">
                                                        {doc_type || "-"}
                                                      </p>
                                                    </div>
                                                    <div>
                                                      <div className="title_blue_600">
                                                        Номер / Серия
                                                      </div>
                                                      <p className="title_gray_500">
                                                        {doc_number || "-"} /{" "}
                                                        {doc_serial || "-"}
                                                      </p>
                                                    </div>
                                                    <div>
                                                      <div className="title_blue_600">
                                                        Дата выдачи
                                                      </div>
                                                      <p className="title_gray_500">
                                                        {date_from || "-"}
                                                      </p>
                                                    </div>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </details>
                                      ) : null}
                                    </div>
                                  );
                                },
                              )}
                            </>
                            <>
                              {drivers?.map(
                                ({
                                  documents,
                                  dob,
                                  firstname,
                                  lastname,
                                  patronymic,
                                }) => {
                                  return (
                                    <>
                                      <div className="bordered" key={uuid()}>
                                        <div
                                          className="title_bold_700"
                                          style={{
                                            textAlign: "center",
                                          }}
                                        >
                                          Имеeт доступ к авто
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            ФИО
                                          </div>
                                          <p className="title_gray_500">
                                            {lastname} {firstname} {patronymic}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Дата рождения
                                          </div>
                                          <p className="title_gray_500">
                                            {moment(dob).format("YYYY-MM-DD") ||
                                              "-"}
                                          </p>
                                        </div>
                                        {documents?.length ? (
                                          <details className="details_more_accordion_docs">
                                            <summary className="details_more_docs"></summary>
                                            <div className="details_expand documents_expand">
                                              {documents?.map(
                                                ({
                                                  date_from,
                                                  doc_number,
                                                  doc_serial,
                                                  doc_type,
                                                }) => {
                                                  return (
                                                    <div
                                                      key={uuid()}
                                                      className="documents_grid"
                                                    >
                                                      <div>
                                                        <div className="title_blue_600">
                                                          Тип документа
                                                        </div>
                                                        <p className="title_gray_500">
                                                          {doc_type || "-"}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <div className="title_blue_600">
                                                          Номер / Серия
                                                        </div>
                                                        <p className="title_gray_500">
                                                          {doc_number || "-"} /{" "}
                                                          {doc_serial || "-"}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <div className="title_blue_600">
                                                          Дата выдачи
                                                        </div>
                                                        <p className="title_gray_500">
                                                          {date_from || "-"}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  );
                                                },
                                              )}
                                            </div>
                                          </details>
                                        ) : null}
                                      </div>
                                    </>
                                  );
                                },
                              )}
                            </>
                            <>
                              {userInfo?.map(
                                ({
                                  documents,
                                  dob,
                                  first_name,
                                  lastname,
                                  patronymic,
                                }) => {
                                  return (
                                    <React.Fragment key={uuid()}>
                                      <div className="bordered">
                                        <div
                                          className="title_bold_700"
                                          style={{
                                            textAlign: "center",
                                          }}
                                        >
                                          Личные данные
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            ФИО
                                          </div>
                                          <p className="title_gray_500">
                                            {lastname} {first_name} {patronymic}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Дата рождения
                                          </div>
                                          <p className="title_gray_500">
                                            {moment(dob).format("YYYY-MM-DD") ||
                                              "-"}
                                          </p>
                                        </div>
                                      </div>
                                      {documents?.length ? (
                                        <>
                                          {documents?.map(
                                            ({
                                              date_from,
                                              doc_number,
                                              doc_serial,
                                              doc_type,
                                            }) => {
                                              return (
                                                <div
                                                  className="bordered"
                                                  key={uuid()}
                                                >
                                                  <div
                                                    className="title_bold_700"
                                                    style={{
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    Документ владельца
                                                  </div>
                                                  <div>
                                                    <div className="title_blue_600">
                                                      Тип документа
                                                    </div>
                                                    <p className="title_gray_500">
                                                      {doc_type || "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="title_blue_600">
                                                      Номер / Серия
                                                    </div>
                                                    <p className="title_gray_500">
                                                      {doc_number || "-"} /{" "}
                                                      {doc_serial || "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="title_blue_600">
                                                      Дата выдачи
                                                    </div>
                                                    <p className="title_gray_500">
                                                      {date_from || "-"}
                                                    </p>
                                                  </div>
                                                </div>
                                              );
                                            },
                                          )}
                                        </>
                                      ) : null}
                                    </React.Fragment>
                                  );
                                },
                              )}
                            </>
                            <>
                              {carOwners?.map(
                                ({
                                  yearIssue,
                                  vin,
                                  body_number,
                                  brand,
                                  chassis_number,
                                  enginePower,
                                  is_taxi,
                                  license_plate,
                                  model,
                                  veh_doc_date,
                                  veh_doc_number,
                                  veh_doc_serial,
                                  mark_model_other,
                                  drivers,
                                }) => {
                                  return (
                                    <div className="bordered" key={uuid()}>
                                      <div
                                        className="title_bold_700"
                                        style={{ textAlign: "center" }}
                                      >
                                        Является владельцем
                                      </div>
                                      {vin && (
                                        <div>
                                          <div className="title_blue_600">
                                            VIN код
                                          </div>
                                          <p className="title_gray_500">
                                            {vin || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {license_plate && (
                                        <div>
                                          <div className="title_blue_600">
                                            Номерное знак
                                          </div>
                                          <p className="title_gray_500">
                                            {license_plate || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {brand && brand !== "0" ? (
                                        <div>
                                          <div className="title_blue_600">
                                            Марка
                                          </div>
                                          <p className="title_gray_500">
                                            {brand || "-"}
                                          </p>
                                        </div>
                                      ) : null}
                                      {mark_model_other &&
                                      mark_model_other !== "0" ? (
                                        <div>
                                          <div className="title_blue_600">
                                            Марка
                                          </div>
                                          <p className="title_gray_500">
                                            {mark_model_other || "-"}
                                          </p>
                                        </div>
                                      ) : null}
                                      {model && (
                                        <div>
                                          <div className="title_blue_600">
                                            Модель
                                          </div>
                                          <p className="title_gray_500">
                                            {model || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {yearIssue && (
                                        <div>
                                          <div className="title_blue_600">
                                            Год выпуска
                                          </div>
                                          <p className="title_gray_500">
                                            {yearIssue || "-"}
                                          </p>
                                        </div>
                                      )}
                                      <details className="details_more_accordion">
                                        <summary className="details_more"></summary>
                                        <div className="details_expand">
                                          {enginePower && (
                                            <div>
                                              <div className="title_blue_600">
                                                Мощность двигателя
                                              </div>
                                              <p className="title_gray_500">
                                                {enginePower || "-"}
                                              </p>
                                            </div>
                                          )}

                                          {chassis_number && (
                                            <div>
                                              <div className="title_blue_600">
                                                Номер шасси
                                              </div>
                                              <p className="title_gray_500">
                                                {chassis_number || "-"}
                                              </p>
                                            </div>
                                          )}
                                          {body_number && (
                                            <div>
                                              <div className="title_blue_600">
                                                Номер кузова
                                              </div>
                                              <p className="title_gray_500">
                                                {body_number || "-"}
                                              </p>
                                            </div>
                                          )}
                                          {veh_doc_date && (
                                            <div>
                                              <div className="title_blue_600">
                                                Дата выдачи документа на ТС
                                              </div>
                                              <p className="title_gray_500">
                                                {veh_doc_date || "-"}
                                              </p>
                                            </div>
                                          )}
                                          <div>
                                            <div className="title_blue_600">
                                              Серия\номер документа на ТС
                                            </div>
                                            <p className="title_gray_500">
                                              {veh_doc_serial || "-"} \{" "}
                                              {veh_doc_number}
                                            </p>
                                          </div>
                                          {is_taxi && (
                                            <div>
                                              <div className="title_blue_600">
                                                Использовалась в такси
                                              </div>
                                              <p className="title_gray_500">
                                                {is_taxi === "0"
                                                  ? "Нет"
                                                  : is_taxi === "1"
                                                  ? "Да"
                                                  : "-"}
                                              </p>
                                            </div>
                                          )}
                                          {drivers?.length ? (
                                            <>
                                              <div className="title_blue_600">
                                                Допущены к управлению:
                                              </div>
                                              {drivers?.map(
                                                ({
                                                  dob,
                                                  firstname,
                                                  lastname,
                                                  patronymic,
                                                }) => {
                                                  return (
                                                    <div
                                                      key={uuid()}
                                                      style={{
                                                        borderBottom:
                                                          "1px solid #E6F1FF",
                                                        padding: "6px 0",
                                                      }}
                                                    >
                                                      <div>
                                                        <div className="title_blue_600">
                                                          ФИО
                                                        </div>
                                                        <p className="title_gray_500">
                                                          {lastname} {firstname}{" "}
                                                          {patronymic}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <div className="title_blue_600">
                                                          Дата рождения
                                                        </div>
                                                        <p className="title_gray_500">
                                                          {moment(dob).format(
                                                            "YYYY-MM-DD",
                                                          ) || "-"}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  );
                                                },
                                              )}
                                            </>
                                          ) : null}
                                        </div>
                                      </details>
                                    </div>
                                  );
                                },
                              )}
                            </>
                            <>
                              {carDrivers?.map(
                                ({
                                  carOwners,
                                  yearIssue,
                                  vin,
                                  body_number,
                                  brand,
                                  chassis_number,
                                  enginePower,
                                  is_taxi,
                                  license_plate,
                                  model,
                                  veh_doc_date,
                                  veh_doc_number,
                                  veh_doc_serial,
                                  mark_model_other,
                                }) => {
                                  return (
                                    <div className="bordered" key={uuid()}>
                                      <div
                                        className="title_bold_700"
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        Допущен к управлению
                                      </div>
                                      {vin && (
                                        <div>
                                          <div className="title_blue_600">
                                            VIN код
                                          </div>
                                          <p className="title_gray_500">
                                            {vin || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {license_plate && (
                                        <div>
                                          <div className="title_blue_600">
                                            Номерное знак
                                          </div>
                                          <p className="title_gray_500">
                                            {license_plate || "-"}
                                          </p>
                                        </div>
                                      )}

                                      {brand && brand !== "0" ? (
                                        <div>
                                          <div className="title_blue_600">
                                            Марка
                                          </div>
                                          <p className="title_gray_500">
                                            {brand || "-"}
                                          </p>
                                        </div>
                                      ) : (
                                        <div>
                                          <div className="title_blue_600">
                                            Марка
                                          </div>
                                          <p className="title_gray_500">
                                            {mark_model_other || "-"}
                                          </p>
                                        </div>
                                      )}
                                      <div>
                                        <div className="title_blue_600">
                                          Модель
                                        </div>
                                        <p className="title_gray_500">
                                          {model || "-"}
                                        </p>
                                      </div>
                                      {yearIssue && (
                                        <div>
                                          <div className="title_blue_600">
                                            Год выпуска
                                          </div>
                                          <p className="title_gray_500">
                                            {yearIssue || "-"}
                                          </p>
                                        </div>
                                      )}
                                      <details className="details_more_accordion">
                                        <summary className="details_more"></summary>
                                        <div className="details_expand">
                                          {enginePower && (
                                            <div>
                                              <div className="title_blue_600">
                                                Мощность двигателя
                                              </div>
                                              <p className="title_gray_500">
                                                {enginePower || "-"}
                                              </p>
                                            </div>
                                          )}

                                          {chassis_number && (
                                            <div>
                                              <div className="title_blue_600">
                                                Номер шасси
                                              </div>
                                              <p className="title_gray_500">
                                                {chassis_number || "-"}
                                              </p>
                                            </div>
                                          )}
                                          {body_number && (
                                            <div>
                                              <div className="title_blue_600">
                                                Номер кузова
                                              </div>
                                              <p className="title_gray_500">
                                                {body_number || "-"}
                                              </p>
                                            </div>
                                          )}
                                          {veh_doc_date && (
                                            <div>
                                              <div className="title_blue_600">
                                                Дата выдачи документа на ТС
                                              </div>
                                              <p className="title_gray_500">
                                                {veh_doc_date || "-"}
                                              </p>
                                            </div>
                                          )}

                                          <div>
                                            <div className="title_blue_600">
                                              Серия\номер документа на ТС
                                            </div>
                                            <p className="title_gray_500">
                                              {veh_doc_serial || "-"} \{" "}
                                              {veh_doc_number}
                                            </p>
                                          </div>
                                          {is_taxi && (
                                            <div>
                                              <div className="title_blue_600">
                                                Использовалась в такси
                                              </div>
                                              <p className="title_gray_500">
                                                {is_taxi === "0"
                                                  ? "Нет"
                                                  : is_taxi === "1"
                                                  ? "Да"
                                                  : "Нет"}
                                              </p>
                                            </div>
                                          )}
                                          {carOwners?.length ? (
                                            <>
                                              <div className="title_bold_700">
                                                Владельцы:
                                              </div>
                                              {carOwners?.map(
                                                ({
                                                  dob,
                                                  firstname,
                                                  lastname,
                                                  patronymic,
                                                }) => {
                                                  return (
                                                    <div
                                                      key={uuid()}
                                                      style={{
                                                        borderBottom:
                                                          "2px solid #E6F1FF",
                                                        padding: "6px 0",
                                                      }}
                                                    >
                                                      <div>
                                                        <div className="title_blue_600">
                                                          ФИО
                                                        </div>
                                                        <p className="title_gray_500">
                                                          {lastname} {firstname}{" "}
                                                          {patronymic}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <div className="title_blue_600">
                                                          Дата рождения
                                                        </div>
                                                        <p className="title_gray_500">
                                                          {moment(dob).format(
                                                            "YYYY-MM-DD",
                                                          ) || "-"}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  );
                                                },
                                              )}
                                            </>
                                          ) : null}
                                        </div>
                                      </details>
                                    </div>
                                  );
                                },
                              )}
                            </>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </details>
            )}
            {data?.kids?.length ? (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">Дети</summary>
                <div className="accordion_body">
                  <div className="pochta_grid">
                    {data?.kids?.map(
                      ({
                        lastname,
                        firstname,
                        patronymic,
                        dob,
                        inn,
                        snils,
                      }) => {
                        return (
                          <div className="bordered" key={uuid()}>
                            <div className="title_blue_600">
                              ФИО
                              <p className="title_gray_500">
                                {lastname} {firstname} {patronymic}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              Дата рождения
                              <p className="title_gray_500">
                                {moment(dob).format("YYYY-MM-DD")}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              ИНН
                              <p className="title_gray_500">{inn || "-"}</p>
                            </div>
                            <div className="title_blue_600">
                              № Соц страхования
                              <p className="title_gray_500">{snils || "-"}</p>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </details>
            ) : null}
            {data?.tutuPassengers?.length ? (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Tutu пользователи
                </summary>
                <div className="accordion_body">
                  <div className="pochta_grid">
                    {data?.tutuPassengers?.map(
                      ({
                        lastname,
                        firstname,
                        patronymic,
                        dob,
                        placeOfBirth,
                        dcmNumber,
                        dcmType,
                      }) => {
                        return (
                          <div className="bordered" key={uuid()}>
                            <div className="title_blue_600">
                              ФИО
                              <p className="title_gray_500">
                                {lastname} {firstname} {patronymic}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              Дата рождения
                              <p className="title_gray_500">
                                {moment(dob).format("YYYY-MM-DD")}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              Место рождения
                              <p className="title_gray_500">
                                {placeOfBirth || "-"}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              Номер документа
                              <p className="title_gray_500">
                                {dcmNumber || "-"}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              Тип документа
                              <p className="title_gray_500">{dcmType || "-"}</p>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </details>
            ) : null}
            {data?.tutuReserveUsers?.length ? (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Tutu пассажиры
                </summary>
                <div className="accordion_body">
                  <div className="pochta_grid">
                    {data?.tutuReserveUsers?.map(
                      ({
                        lastname,
                        firstname,
                        patronymic,
                        dob,
                        email,
                        phone,
                        reservedFor,
                      }) => {
                        return (
                          <div className="bordered" key={uuid()}>
                            <div className="title_blue_600">
                              ФИО
                              <p className="title_gray_500">
                                {lastname} {firstname} {patronymic}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              Дата рождения
                              <p className="title_gray_500">
                                {(dob && moment(dob).format("YYYY-MM-DD")) ||
                                  "-"}
                              </p>
                            </div>
                            <div className="title_blue_600">
                              Email
                              <p className="title_gray_500">{email || "-"}</p>
                            </div>
                            <div className="title_blue_600">
                              Телефон
                              <p className="title_gray_500">{phone || "-"}</p>
                            </div>
                            <div className="title_blue_600">
                              Билет куплен для
                              <p className="title_gray_500">
                                {reservedFor || "-"}
                              </p>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </details>
            ) : null}
            {data?.cdekData && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">CDEK</summary>
                <div className="accordion_body">
                  <div className="cdek_container">
                    {data?.cdekData ? (
                      <>
                        {data.cdekData.map(
                          ({
                            payerContactPerson,
                            payerCity,
                            payerAddress,
                            payerContragentName,
                            payerEmail,
                            payerName,
                            payerPhone,
                            receiverAddress,
                            receiverCity,
                            receiverContactPerson,
                            receiverContragentName,
                            receiverEmail,
                            receiverName,
                            receiverPhone,
                            senderAddress,
                            senderCity,
                            senderContactPerson,
                            senderContragentName,
                            senderEmail,
                            senderName,
                            senderPhone,
                            contragentName,
                            city,
                            addressString,
                            name,
                            phone,
                            contactPerson,
                            sourceName,
                            email,
                          }) => {
                            const hasCustomer =
                              contragentName ||
                              contactPerson ||
                              phone ||
                              name ||
                              email ||
                              addressString ||
                              city;
                            const hasReceiver =
                              receiverAddress ||
                              receiverCity ||
                              receiverContactPerson ||
                              receiverContragentName ||
                              receiverEmail ||
                              receiverName ||
                              receiverPhone;
                            const hasSender =
                              senderAddress ||
                              senderCity ||
                              senderContactPerson ||
                              senderContragentName ||
                              senderEmail ||
                              senderName ||
                              senderPhone;
                            const hasPayer =
                              payerName ||
                              payerContactPerson ||
                              payerCity ||
                              payerAddress ||
                              payerContragentName ||
                              payerEmail ||
                              payerPhone;

                            return (
                              <div className="cdek_grid" key={uuid()}>
                                {hasCustomer && (
                                  <div
                                    className="bordered"
                                    style={{ gap: "4px" }}
                                  >
                                    <div
                                      style={{
                                        paddingBottom: "16px",
                                        borderBottom: "2px solid #E6F1FF",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <div
                                        className="html_title"
                                        style={{
                                          ...titleGray600,
                                          fontSize: "18px",
                                          fontWeight: "700",
                                        }}
                                      >
                                        Данные клиента:
                                      </div>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">Имя</div>
                                      <p className="title_gray_500">
                                        {name || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Телефон
                                      </div>
                                      <p className="title_gray_500">
                                        {phone || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Email
                                      </div>
                                      <p className="title_gray_500">
                                        {email || "-"}
                                      </p>
                                    </div>
                                    <details className="details_more_accordion">
                                      <summary className="details_more"></summary>
                                      <div className="details_expand">
                                        <div>
                                          <div className="title_blue_600">
                                            Адрес
                                          </div>
                                          <p className="title_gray_500">
                                            {addressString || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Город
                                          </div>
                                          <p className="title_gray_500">
                                            {city || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контактное лицо
                                          </div>
                                          <p className="title_gray_500">
                                            {contactPerson || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контрагент
                                          </div>
                                          <p className="title_gray_500">
                                            {contragentName || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Источник
                                          </div>
                                          <p className="title_gray_500">
                                            {sourceName || "-"}
                                          </p>
                                        </div>
                                      </div>
                                    </details>
                                  </div>
                                )}
                                {hasPayer && (
                                  <div
                                    className="bordered"
                                    style={{ gap: "4px" }}
                                  >
                                    <div
                                      style={{
                                        paddingBottom: "16px",
                                        borderBottom: "2px solid #E6F1FF",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <div
                                        className="html_title"
                                        style={{
                                          ...titleGray600,
                                          fontSize: "18px",
                                          fontWeight: "700",
                                        }}
                                      >
                                        Данные плательщика:
                                      </div>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">Имя</div>
                                      <p className="title_gray_500">
                                        {payerName || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Телефон
                                      </div>
                                      <p className="title_gray_500">
                                        {payerPhone || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Email
                                      </div>
                                      <p className="title_gray_500">
                                        {payerEmail || "-"}
                                      </p>
                                    </div>
                                    <details className="details_more_accordion">
                                      <summary className="details_more"></summary>
                                      <div className="details_expand">
                                        <div>
                                          <div className="title_blue_600">
                                            Адрес
                                          </div>
                                          <p className="title_gray_500">
                                            {payerAddress || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Город
                                          </div>
                                          <p className="title_gray_500">
                                            {payerCity || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контактное лицо
                                          </div>
                                          <p className="title_gray_500">
                                            {payerContactPerson || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контрагент
                                          </div>
                                          <p className="title_gray_500">
                                            {payerContragentName || "-"}
                                          </p>
                                        </div>
                                      </div>
                                    </details>
                                  </div>
                                )}
                                {hasReceiver && (
                                  <div
                                    className="bordered"
                                    style={{ gap: "4px" }}
                                  >
                                    <div
                                      style={{
                                        paddingBottom: "16px",
                                        borderBottom: "2px solid #E6F1FF",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <div
                                        className="html_title"
                                        style={{
                                          ...titleGray600,
                                          fontSize: "18px",
                                          fontWeight: "700",
                                        }}
                                      >
                                        Данные получателя:
                                      </div>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">Имя</div>
                                      <p className="title_gray_500">
                                        {receiverName || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Телефон
                                      </div>
                                      <p className="title_gray_500">
                                        {receiverPhone || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Email
                                      </div>
                                      <p className="title_gray_500">
                                        {receiverEmail || "-"}
                                      </p>
                                    </div>
                                    <details className="details_more_accordion">
                                      <summary className="details_more"></summary>
                                      <div className="details_expand">
                                        <div>
                                          <div className="title_blue_600">
                                            Адрес
                                          </div>
                                          <p className="title_gray_500">
                                            {receiverAddress || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Город
                                          </div>
                                          <p className="title_gray_500">
                                            {receiverCity || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контактное лицо
                                          </div>
                                          <p className="title_gray_500">
                                            {receiverContactPerson || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контрагент
                                          </div>
                                          <p className="title_gray_500">
                                            {receiverContragentName || "-"}
                                          </p>
                                        </div>
                                      </div>
                                    </details>
                                  </div>
                                )}
                                {hasSender && (
                                  <div
                                    className="bordered"
                                    style={{ gap: "4px" }}
                                  >
                                    <div
                                      style={{
                                        paddingBottom: "16px",
                                        borderBottom: "2px solid #E6F1FF",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <div
                                        className="html_title"
                                        style={{
                                          ...titleGray600,
                                          fontSize: "18px",
                                          fontWeight: "700",
                                        }}
                                      >
                                        Данные отправителя:
                                      </div>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">Имя</div>
                                      <p className="title_gray_500">
                                        {senderName || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Телефон
                                      </div>
                                      <p className="title_gray_500">
                                        {senderPhone || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Email
                                      </div>
                                      <p className="title_gray_500">
                                        {senderEmail || "-"}
                                      </p>
                                    </div>
                                    <details className="details_more_accordion">
                                      <summary className="details_more"></summary>
                                      <div className="details_expand">
                                        <div>
                                          <div className="title_blue_600">
                                            Адрес
                                          </div>
                                          <p className="title_gray_500">
                                            {senderAddress || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Город
                                          </div>
                                          <p className="title_gray_500">
                                            {senderCity || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контактное лицо
                                          </div>
                                          <p className="title_gray_500">
                                            {senderContactPerson || "-"}
                                          </p>
                                        </div>
                                        <div>
                                          <div className="title_blue_600">
                                            Контрагент
                                          </div>
                                          <p className="title_gray_500">
                                            {senderContragentName || "-"}
                                          </p>
                                        </div>
                                      </div>
                                    </details>
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </details>
            )}
            {data?.leakCheck ? (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Leak Check
                </summary>
                <div className="accordion_body">
                  <div
                    style={{
                      display: "grid",
                      gap: "16px",
                    }}
                  >
                    {data?.leakCheck?.map(({ payload, result }) => {
                      return (
                        <div
                          style={{
                            display: "grid",
                            gap: "16px",
                            margin: "16px 0 0 0",
                          }}
                        >
                          <div className="title_blue_600">
                            Параметр:
                            <p className="title_gray_500">{payload}</p>
                          </div>

                          <div
                            style={{
                              display: "grid",
                              gap: "10px",
                            }}
                          >
                            {result?.map(
                              ({
                                last_breach,
                                login,
                                password,
                                sources,
                                phone,
                                city,
                                ip,
                                userNames,
                                username,
                                profile_name,
                                origin,
                                dob,
                                address,
                                zip,
                                last_name,
                                first_name,
                                state,
                                name,
                              }) => {
                                const userNamesColumns =
                                  generateColumnsLeakCheck(userNames || []);
                                return (
                                  <div
                                    key={uuid()}
                                    className="bordered"
                                    style={{
                                      display: "grid",
                                      gap: "10px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        gridTemplateColumns:
                                          "repeat(4, minmax(100px, 50%))",
                                        gridAutoRows: "1fr",
                                        display: "grid",
                                        columnGap: "24px",
                                        rowGap: "24px",
                                        alignItems: "baseline",
                                      }}
                                    >
                                      {login && (
                                        <div className="title_blue_600">
                                          Логин
                                          <p className="title_gray_500">
                                            {login || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {password && (
                                        <div className="title_blue_600">
                                          Пароль
                                          <p className="title_gray_500">
                                            {password || "-"}
                                          </p>
                                        </div>
                                      )}
                                      {last_breach && (
                                        <div>
                                          <div className="title_blue_600">
                                            Дата взлома
                                          </div>
                                          <p className="title_gray_500">
                                            {last_breach}
                                          </p>
                                        </div>
                                      )}
                                      {(last_name || first_name) && (
                                        <div>
                                          <div className="title_blue_600">
                                            ФИО
                                          </div>
                                          <p className="title_gray_500">
                                            {last_name || ""} {first_name || ""}
                                          </p>
                                        </div>
                                      )}
                                      {sources?.length ? (
                                        <div>
                                          <div className="title_blue_600">
                                            Источник взлома
                                          </div>
                                          <p className="title_gray_500">
                                            {sources?.map((item) => (
                                              <React.Fragment key={uuid()}>
                                                {item},{" "}
                                              </React.Fragment>
                                            ))}
                                          </p>
                                        </div>
                                      ) : null}
                                      {phone && (
                                        <div>
                                          <div className="title_blue_600">
                                            Телефон
                                          </div>
                                          <p className="title_gray_500">
                                            {phone}
                                          </p>
                                        </div>
                                      )}
                                      {city && (
                                        <div>
                                          <div className="title_blue_600">
                                            Город
                                          </div>
                                          <p className="title_gray_500">
                                            {city}
                                          </p>
                                        </div>
                                      )}
                                      {ip && (
                                        <div>
                                          <div className="title_blue_600">
                                            IP адрес:
                                          </div>
                                          <p className="title_gray_500">{ip}</p>
                                        </div>
                                      )}
                                      {name && (
                                        <div>
                                          <div className="title_blue_600">
                                            ФИО:
                                          </div>
                                          <p className="title_gray_500">
                                            {name}
                                          </p>
                                        </div>
                                      )}
                                      {username && (
                                        <div>
                                          <div className="title_blue_600">
                                            Имя в профиле:
                                          </div>
                                          <p className="title_gray_500">
                                            {username}
                                          </p>
                                        </div>
                                      )}
                                      {profile_name && (
                                        <div>
                                          <div className="title_blue_600">
                                            Имя в профиле:
                                          </div>
                                          <p className="title_gray_500">
                                            {profile_name}
                                          </p>
                                        </div>
                                      )}
                                      {dob && (
                                        <div>
                                          <div className="title_blue_600">
                                            Дата рождения:
                                          </div>
                                          <p className="title_gray_500">
                                            {dob}
                                          </p>
                                        </div>
                                      )}
                                      {address && (
                                        <div>
                                          <div className="title_blue_600">
                                            Адрес:
                                          </div>
                                          <p className="title_gray_500">
                                            {address}
                                          </p>
                                        </div>
                                      )}
                                      {state && (
                                        <div>
                                          <div className="title_blue_600">
                                            Cтрана:
                                          </div>
                                          <p className="title_gray_500">
                                            {state}
                                          </p>
                                        </div>
                                      )}
                                      {zip && (
                                        <div>
                                          <div className="title_blue_600">
                                            ZIP code:
                                          </div>
                                          <p className="title_gray_500">
                                            {zip}
                                          </p>
                                        </div>
                                      )}
                                      {origin?.length ? (
                                        <div>
                                          <div className="title_blue_600">
                                            <p>Источники:</p>
                                          </div>
                                          {origin.map((i) => {
                                            return (
                                              <p
                                                key={i}
                                                className="title_gray_500"
                                              >
                                                {i}
                                              </p>
                                            );
                                          })}
                                        </div>
                                      ) : null}
                                    </div>
                                    <HtmlExportTable
                                      data={userNames}
                                      columns={userNamesColumns}
                                      size="small"
                                    />
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </details>
            ) : null}
            {hasLocalPassport && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Паспорта РФ
                </summary>
                <div className="accordion_body">
                  <div className="accordion_grid">
                    {data?.localPassport && (
                      <div className="bordered">
                        <div
                          style={{
                            display: "flex",
                            gap: "24px",
                          }}
                        >
                          <div className="title_bold_800_column">
                            Серия
                            <p className="title_gray_500 title_fs_18">
                              {data?.localPassport?.localPassportSeries || "-"}
                            </p>
                          </div>
                          <div className="title_bold_800_column">
                            Номер
                            <p className="title_gray_500 title_fs_18">
                              {data?.localPassport?.localPassportNumber || "-"}
                            </p>
                          </div>
                        </div>
                        {data?.localPassport?.issuedBy && (
                          <div>
                            <div className="title_blue_600">Выдан</div>
                            <p className="title_gray_500">
                              {data?.localPassport?.issuedBy}
                            </p>
                          </div>
                        )}
                        <div>
                          <div className="title_blue_600">
                            Действителен от-до
                          </div>
                          <p className="title_gray_500">
                            {data?.localPassport?.issuedate || "No data"}{" "}
                            {data?.localPassport?.localPassportDateOfExpiry
                              ? `- ${data?.localPassport?.localPassportDateOfExpiry}`
                              : null}
                          </p>
                        </div>
                      </div>
                    )}
                    {data?.localPassportArray ? (
                      <>
                        {data.localPassportArray.map(
                          ({
                            localPassportSeries,
                            localPassportNumber,
                            issuedBy,
                            issuedate,
                            localPassportDateOfExpiry,
                          }) => {
                            return (
                              <div className="bordered" key={uuid()}>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "24px",
                                  }}
                                >
                                  <div className="title_bold_800_column">
                                    Серия
                                    <p className="title_gray_500 title_fs_18">
                                      {localPassportSeries || "-"}
                                    </p>
                                  </div>
                                  <div className="title_bold_800_column">
                                    Номер
                                    <p className="title_gray_500 title_fs_18">
                                      {localPassportNumber || "-"}
                                    </p>
                                  </div>
                                </div>
                                {issuedBy && (
                                  <div>
                                    <div className="title_blue_600">Выдан</div>
                                    <p className="title_gray_500">{issuedBy}</p>
                                  </div>
                                )}
                                <div>
                                  <div className="title_blue_600">
                                    Действителен от-до
                                  </div>
                                  <p className="title_gray_500">
                                    {issuedate || "No data"}
                                    {" - "}
                                    {localPassportDateOfExpiry || "No data"}
                                  </p>
                                </div>
                              </div>
                            );
                          },
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </details>
            )}
            {hasSpektr && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  SPEKTR
                </summary>
                <div className="accordion_body">
                  {hasSpektrTopBlock ? (
                    <div className="spektr_top">
                      {data?.vin && (
                        <div className="row_item">
                          <div className="title_blue_600">VIN код</div>
                          <p className="title_gray_500">{data.vin}</p>
                        </div>
                      )}
                      {data?.plateNumber && (
                        <div className="row_item">
                          <div className="title_blue_600">Номерной знак</div>
                          <p className="title_gray_500">{data.plateNumber}</p>
                        </div>
                      )}
                      {data?.mark && (
                        <div className="row_item">
                          <div className="title_blue_600">Марка авто</div>
                          <p className="title_gray_500">{data.mark}</p>
                        </div>
                      )}
                      {data?.yearOfCreation && (
                        <div className="row_item">
                          <div className="title_blue_600">Год выпуска</div>
                          <p className="title_gray_500">
                            {data.yearOfCreation}
                          </p>
                        </div>
                      )}
                      {data?.engine && (
                        <div className="row_item">
                          <div className="title_blue_600">Номер двигателя</div>
                          <p className="title_gray_500">{data.engine}</p>
                        </div>
                      )}
                      {data?.chassis && (
                        <div className="row_item">
                          <div className="title_blue_600">Номер шасси</div>
                          <p className="title_gray_500">{data.chassis}</p>
                        </div>
                      )}
                      {data?.body && (
                        <div className="row_item">
                          <div className="title_blue_600">Номер кузова</div>
                          <p className="title_gray_500">{data.body}</p>
                        </div>
                      )}
                      {data?.comment && (
                        <div className="row_item">
                          <div className="title_blue_600">Комментарий</div>
                          <p className="title_gray_500">{data.comment}</p>
                        </div>
                      )}
                    </div>
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      gap: "24px",
                    }}
                  >
                    {data?.accidents?.map(
                      ({ accidentType, accidentDate, participants }) => {
                        return (
                          <div key={uuid()}>
                            <div
                              className="title_black_700"
                              style={{
                                whiteSpace: "nowrap",
                                alignItems: "center",
                              }}
                            >
                              <span>{accidentType} -</span>
                              <span className="title_light_gray_700">
                                {moment(accidentDate).format("YYYY-MM-DD")}
                              </span>
                            </div>
                            <div className="spektr_title">
                              Список участников
                            </div>
                            {participants?.length && (
                              <div className="spektr_list">
                                {participants.map(
                                  ({ personInfo, vehicleInfo }) => {
                                    return (
                                      <div className="bordered spektr_grid">
                                        {personInfo?.relation && (
                                          <div
                                            style={{
                                              paddingBottom: "16px",
                                              borderBottom: "2px solid #E6F1FF",
                                              marginBottom: "8px",
                                            }}
                                          >
                                            <p
                                              style={titleGray600}
                                              className="desc"
                                            >
                                              {personInfo.relation || "-"}
                                            </p>
                                          </div>
                                        )}
                                        {personInfo?.birthDate && (
                                          <div>
                                            <div className="title_blue_600">
                                              День рождения
                                            </div>
                                            <p className="title_gray_500">
                                              {moment(
                                                personInfo.birthDate,
                                              ).format("YYYY-MM-DD")}
                                            </p>
                                          </div>
                                        )}
                                        <div>
                                          <div className="title_blue_600">
                                            ФИО
                                          </div>
                                          <p className="title_gray_500">
                                            {personInfo.surname}{" "}
                                            {personInfo.name}{" "}
                                            {personInfo.patronymic}
                                          </p>
                                        </div>
                                        {vehicleInfo?.make ||
                                        vehicleInfo?.plateNumber ||
                                        vehicleInfo?.vin ||
                                        vehicleInfo?.year ? (
                                          <details
                                            className="details_more_accordion"
                                            style={{ paddingTop: "8px" }}
                                          >
                                            <summary className="details_more"></summary>
                                            <div className="details_expand">
                                              {vehicleInfo?.make && (
                                                <div>
                                                  <div className="title_blue_600">
                                                    Автомобиль
                                                  </div>
                                                  <p className="title_gray_500">
                                                    {vehicleInfo?.make || "-"}
                                                  </p>
                                                </div>
                                              )}
                                              {vehicleInfo?.plateNumber && (
                                                <div>
                                                  <div className="title_blue_600">
                                                    Номерной знак
                                                  </div>
                                                  <p className="title_gray_500">
                                                    {vehicleInfo?.plateNumber ||
                                                      "-"}
                                                  </p>
                                                </div>
                                              )}
                                              {vehicleInfo?.vin && (
                                                <div>
                                                  <div className="title_blue_600">
                                                    VIN код
                                                  </div>
                                                  <p className="title_gray_500">
                                                    {vehicleInfo?.vin || "-"}
                                                  </p>
                                                </div>
                                              )}
                                              {vehicleInfo?.year && (
                                                <div>
                                                  <div className="title_blue_600">
                                                    Год выпуска
                                                  </div>
                                                  <p className="title_gray_500">
                                                    {vehicleInfo?.year || "-"}
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          </details>
                                        ) : null}
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </details>
            )}
            {data?.insurancePolicies?.length && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Данные по авто(новая авто база)
                </summary>
                <div className="accordion_body">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      columnGap: "24px",
                      rowGap: "24px",
                    }}
                  >
                    {data?.insurancePolicies?.map(
                      ({
                        year_issue,
                        vin,
                        vehDocSerial,
                        policy_unq_id,
                        policyCreateDate,
                        policyEndDate,
                        brandName,
                        modelCar,
                        patronymic,
                        insCompany,
                        isCarOwner,
                        lastname,
                        isRestrict,
                        licensePlate,
                        isDriver,
                        isPolicyOwner,
                        bodyNumber,
                        bsoFullNum,
                        chassisNumber,
                        contractType,
                        dob,
                        docNumber,
                        docSerial,
                        docType,
                        firstname,
                        enginePower,
                      }) => {
                        return (
                          <div className="bordered newauto_grid" key={uuid()}>
                            <div className="title_bold_700">
                              VIN код
                              <p style={titleGray600} className="desc">
                                {vin || "-"}
                              </p>
                            </div>
                            <div
                              style={{
                                gridTemplateColumns:
                                  "repeat(2, minmax(200px, 50%))",
                                display: "grid",
                              }}
                            >
                              <div className="title_blue_600">
                                Марка
                                <p className="title_gray_500">
                                  {brandName || "-"}
                                </p>
                              </div>
                              <div className="title_blue_600">
                                Модель
                                <p className="title_gray_500">
                                  {modelCar || "-"}
                                </p>
                              </div>
                            </div>
                            <div
                              style={{
                                gridTemplateColumns:
                                  "repeat(2, minmax(200px, 50%))",
                                display: "grid",
                              }}
                            >
                              <div className="title_blue_600">
                                Год выпуска
                                <p className="title_gray_500">
                                  {year_issue || "-"}
                                </p>
                              </div>
                            </div>
                            {licensePlate && (
                              <div className="title_blue_600">
                                Номерной знак
                                <p className="title_gray_500">
                                  {licensePlate || "-"}
                                </p>
                              </div>
                            )}
                            {enginePower && (
                              <div className="title_blue_600">
                                К-во лошадиных сил
                                <p className="title_gray_500">
                                  {enginePower || "-"}
                                </p>
                              </div>
                            )}
                            <div className="title_blue_600">
                              ФИО
                              <p className="title_gray_500">
                                {lastname} {firstname} {patronymic}
                              </p>
                            </div>
                            {dob && (
                              <div className="title_blue_600">
                                Дата рождения
                                <p className="title_gray_500">
                                  {moment(dob).format("YYYY-MM-DD") || "-"}
                                </p>
                              </div>
                            )}
                            {bodyNumber && (
                              <div className="title_blue_600">
                                Номер кузова
                                <p className="title_gray_500">
                                  {bodyNumber || "-"}
                                </p>
                              </div>
                            )}
                            {chassisNumber && (
                              <div className="title_blue_600">
                                Номер шасси
                                <p className="title_gray_500">
                                  {chassisNumber || "-"}
                                </p>
                              </div>
                            )}
                            {vehDocSerial && (
                              <div className="title_blue_600">
                                Cерия документа на ТС
                                <p className="title_gray_500">
                                  {vehDocSerial || "-"}
                                </p>
                              </div>
                            )}
                            {isCarOwner && (
                              <div className="title_blue_600">
                                Является владельцем ТС
                                <p className="title_gray_500">
                                  {isCarOwner || "-"}
                                </p>
                              </div>
                            )}
                            {insCompany && (
                              <div className="title_blue_600">
                                Страховщик
                                <p className="title_gray_500">
                                  {insCompany || "-"}
                                </p>
                              </div>
                            )}
                            <div className="title_blue_600">
                              Страховой полис дата от/до
                              <p className="title_gray_500">
                                {moment(policyCreateDate).format(
                                  "YYYY-MM-DD",
                                ) || "-"}{" "}
                                /{" "}
                                {moment(policyEndDate).format("YYYY-MM-DD") ||
                                  "-"}
                              </p>
                            </div>
                            {policy_unq_id && (
                              <div className="title_blue_600">
                                Уникальный номер СП
                                <p className="title_gray_500">
                                  {policy_unq_id || "-"}
                                </p>
                              </div>
                            )}
                            {contractType && (
                              <div className="title_blue_600">
                                Тип договора
                                <p className="title_gray_500">
                                  {contractType || "-"}
                                </p>
                              </div>
                            )}
                            {isPolicyOwner && (
                              <div className="title_blue_600">
                                Является владельцем страхового полиса
                                <p className="title_gray_500">
                                  {isPolicyOwner || "-"}
                                </p>
                              </div>
                            )}
                            {isDriver && (
                              <div className="title_blue_600">
                                Водитель
                                <p className="title_gray_500">
                                  {isDriver || "-"}
                                </p>
                              </div>
                            )}
                            {docType && (
                              <div className="title_blue_600">
                                Тип документа
                                <p className="title_gray_500">
                                  {docType || "-"}
                                </p>
                              </div>
                            )}
                            {bsoFullNum && (
                              <div className="title_blue_600">
                                Бланк строгой отчетности
                                <p className="title_gray_500">
                                  {bsoFullNum || "-"}
                                </p>
                              </div>
                            )}
                            {isRestrict && (
                              <div className="title_blue_600">
                                Ограничения
                                <p className="title_gray_500">
                                  {isRestrict || "-"}
                                </p>
                              </div>
                            )}
                            {(docNumber || docSerial) && (
                              <div className="title_blue_600">
                                Номер/Серия документа
                                <p className="title_gray_500">
                                  {docNumber || "-"} / {docSerial || "-"}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </details>
            )}
            {data?.autoArray?.length && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Парковки
                </summary>
                <div className="accordion_body">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      columnGap: "24px",
                      rowGap: "24px",
                    }}
                  >
                    {data?.autoArray?.map(
                      ({ phone, plateNumber, id, mark }) => {
                        return (
                          <div className="bordered parking_grid" key={uuid()}>
                            {mark && (
                              <div className="title_blue_600">
                                Марка
                                <p className="title_gray_500">{mark || "-"}</p>
                              </div>
                            )}
                            {plateNumber && (
                              <div className="title_blue_600">
                                Номерной знак
                                <p className="title_gray_500">
                                  {plateNumber || "-"}
                                </p>
                              </div>
                            )}
                            {phone && (
                              <div className="title_blue_600">
                                Телефон
                                <p className="title_gray_500">{phone || "-"}</p>
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </details>
            )}
            {data?.jobHistory && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Работа
                </summary>
                <div className="accordion_body">
                  {data?.jobHistory.map(
                    ({
                      info,
                      organizationAddress,
                      organizationName,
                      hireDate,
                      fireDate,
                    }) => {
                      return (
                        <div key={uuid()} className="job-item-row">
                          <div>
                            <p className="title_gray_500">
                              {organizationAddress} <br />
                              <span className="work_info">{info}</span>
                              {organizationName} <br />
                            </p>
                          </div>
                          <div>
                            <div className="title_blue_600 work_title">
                              Период работы
                              <p className="title_gray_500">
                                {hireDate} - {fireDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </details>
            )}
            {hasSecretData && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Ограничения/Привелегии
                </summary>
                <div className="accordion_body">
                  <div className="secret_grid">
                    {data?.departureRestrictions && (
                      <div>
                        <div className="title_blue_600">
                          Ограничение на выезд
                        </div>
                        {Array.isArray(data?.departureRestrictions) ? (
                          <>
                            {data?.departureRestrictions?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {data?.departureRestrictions &&
                              data?.departureRestrictions !== " " && (
                                <p className="title_gray_500">
                                  {data?.departureRestrictions}
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    )}
                    {data?.diplCountry && (
                      <div>
                        <div className="title_blue_600">
                          Страна дип. пребывания
                        </div>
                        {Array.isArray(data?.diplCountry) ? (
                          <>
                            {data?.diplCountry?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {data?.diplCountry && data?.diplCountry !== " " && (
                              <p className="title_gray_500">
                                {data?.diplCountry}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {data?.diplSecretAccess && (
                      <div>
                        <div className="title_blue_600">
                          Доступ к дип. тайне
                        </div>
                        {Array.isArray(data?.diplSecretAccess) ? (
                          <>
                            {data?.diplSecretAccess?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {data?.diplSecretAccess &&
                              data?.diplSecretAccess !== " " && (
                                <p className="title_gray_500">
                                  {data?.diplSecretAccess}
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    )}
                    {data?.diplTopSecretDescription && (
                      <div>
                        <div className="title_blue_600">
                          Детали секретного доступа
                        </div>
                        {Array.isArray(data?.diplTopSecretDescription) ? (
                          <>
                            {data?.diplTopSecretDescription?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {data?.diplTopSecretDescription &&
                              data?.diplTopSecretDescription !== " " && (
                                <p className="title_gray_500">
                                  {data?.diplTopSecretDescription}
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    )}
                    {data?.diplTopSecretInfo && (
                      <div>
                        <div className="title_blue_600">
                          Доступ к совершенно секретной информации
                        </div>
                        {Array.isArray(data?.diplTopSecretInfo) ? (
                          <>
                            {data?.diplTopSecretInfo?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {data?.diplTopSecretInfo &&
                              data?.diplTopSecretInfo !== " " && (
                                <p className="title_gray_500">
                                  {data?.diplTopSecretInfo}
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    )}
                    {data?.diplWorkPlace && (
                      <div>
                        <div className="title_blue_600">Дип. место работы</div>
                        {Array.isArray(data?.diplTopSecretInfo) ? (
                          <>
                            {data?.diplWorkPlace?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {data?.diplWorkPlace &&
                              data?.diplWorkPlace !== " " && (
                                <p className="title_gray_500">
                                  {data?.diplWorkPlace}
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    )}
                    {data?.secretAccess && (
                      <div>
                        <div className="title_blue_600">Секретный доступ</div>
                        {Array.isArray(data?.secretAccess) ? (
                          <>
                            {data?.secretAccess?.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {data?.secretAccess &&
                              data?.secretAccess !== " " && (
                                <p className="title_gray_500">
                                  {data?.secretAccess}
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    )}
                    {data?.topSecretAccessInfo && (
                      <div>
                        <div className="title_blue_600">Доступ к гос.тайне</div>
                        {Array.isArray(data?.topSecretAccessInfo) ? (
                          <>
                            <p>
                              {data?.topSecretAccessInfo?.map((item) => {
                                return (
                                  <p className="title_gray_500" key={uuid()}>
                                    {item}
                                  </p>
                                );
                              })}
                            </p>
                          </>
                        ) : (
                          <>
                            {data?.topSecretAccessInfo &&
                              data?.topSecretAccessInfo !== " " && (
                                <p className="title_gray_500">
                                  {data?.topSecretAccessInfo}
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </details>
            )}
            {hasSocial && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Соц. данные
                </summary>
                <div className="accordion_body">
                  <div className="social_grid">
                    {data?.ip && (
                      <div>
                        <div className="title_blue_600">IP aдрес</div>
                        {Array.isArray(data?.ip) ? (
                          <>
                            {data?.ip.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.ip}</p>
                        )}
                      </div>
                    )}
                    {data?.credit_amount && (
                      <div>
                        <div className="title_blue_600">Cума кредита</div>
                        {Array.isArray(data?.credit_amount) ? (
                          <>
                            {data?.credit_amount.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.credit_amount}</p>
                        )}
                      </div>
                    )}
                    {data?.family_status && (
                      <div>
                        <div className="title_blue_600">Семейное положение</div>
                        {Array.isArray(data?.family_status) ? (
                          <>
                            {data?.family_status.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.family_status}</p>
                        )}
                      </div>
                    )}
                    {data?.post && (
                      <div>
                        <div className="title_blue_600">
                          Должность(почта россии)
                        </div>
                        {Array.isArray(data?.post) ? (
                          <>
                            {data?.post.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.post}</p>
                        )}
                      </div>
                    )}
                    {data?.login && (
                      <div>
                        <div className="title_blue_600">Логин</div>
                        {Array.isArray(data?.login) ? (
                          <>
                            {data?.login.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.login}</p>
                        )}
                      </div>
                    )}
                    {data?.osp && (
                      <div className="row_item">
                        <div className="title_blue_600">
                          Пристав Исполнитель
                        </div>
                        {Array.isArray(data.osp) ? (
                          <>
                            {data.osp.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">{data.osp}</p>
                        )}
                      </div>
                    )}
                    {data?.debt_amount && (
                      <div className="row_item">
                        <div className="title_blue_600">
                          Сумма задолженности
                        </div>
                        {Array.isArray(data.debt_amount) ? (
                          <>
                            {data.debt_amount.map((item) => {
                              return (
                                <p className="title_gray_500" key={uuid()}>
                                  {item}
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p className="title_gray_500">{data.debt_amount}</p>
                        )}
                      </div>
                    )}
                    {data?.password && (
                      <div>
                        <div className="title_blue_600">Пароли</div>
                        {Array.isArray(data?.password) ? (
                          <>
                            {data?.password.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.password}</p>
                        )}
                      </div>
                    )}
                    {data?.sourceName && (
                      <div>
                        <div className="title_blue_600">Имя источника</div>
                        {Array.isArray(data?.sourceName) ? (
                          <>
                            {data?.sourceName.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.sourceName}</p>
                        )}
                      </div>
                    )}
                    {data?.facebookId && (
                      <div>
                        <div className="html_title">Профиль Facebook</div>
                        {Array.isArray(data?.facebookId) ? (
                          <>
                            {data?.facebookId.map((item) => {
                              return (
                                <p key={uuid()}>
                                  <a
                                    href={`https://www.facebook.com/${item}`}
                                    target="_blank"
                                  >
                                    {item}
                                  </a>
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p>
                            <a
                              href={`https://www.facebook.com/${data?.facebookId}`}
                              target="_blank"
                            >
                              {data?.facebookId}
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                    {data?.vkId && (
                      <div>
                        <div className="html_title">Профиль Vk</div>
                        {Array.isArray(data?.vkId) ? (
                          <>
                            {data?.vkId.map((item) => {
                              return (
                                <p key={uuid()}>
                                  <a
                                    href={`https://vk.com/id${item}`}
                                    target="_blank"
                                  >
                                    https://vk.com/id{item}
                                  </a>
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p>
                            <a
                              href={`https://vk.com/id${data?.vkId}`}
                              target="_blank"
                            >
                              https://vk.com/id{data?.vkId}
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                    {data?.mailruProfile && (
                      <div>
                        <div className="title_blue_600">Профиль Mail.ru</div>
                        {Array.isArray(data?.mailruProfile) ? (
                          <>
                            {data?.mailruProfile.map((item) => {
                              return (
                                <p key={uuid()}>
                                  <a href={item} target="_blank">
                                    {item}
                                  </a>
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p>
                            {" "}
                            <a href={data?.mailruProfile} target="_blank">
                              {data?.mailruProfile}
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                    {data?.webLink && (
                      <div>
                        <div className="title_blue_600">Веб ссылка</div>
                        {Array.isArray(data?.webLink) ? (
                          <>
                            {data?.webLink.map((item) => {
                              return (
                                <p key={uuid()}>
                                  <a href={item} target="_blank">
                                    {item}
                                  </a>
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p>
                            {" "}
                            <a href={data?.webLink} target="_blank">
                              {data?.webLink}
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                    {data?.linkedinLink && (
                      <div>
                        <div className="title_blue_600">Профиль LinkedIn</div>
                        {Array.isArray(data?.linkedinLink) ? (
                          <>
                            {data?.linkedinLink.map((item) => {
                              return (
                                <p key={uuid()}>
                                  <a
                                    href={`https://www.linkedin.com/${item}`}
                                    target="_blank"
                                  >
                                    {item}
                                  </a>
                                </p>
                              );
                            })}
                          </>
                        ) : (
                          <p>
                            {" "}
                            <a
                              href={`https://www.linkedin.com/${data?.linkedinLink}`}
                              target="_blank"
                            >
                              {data?.linkedinLink}
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                    {data?.serialSim && (
                      <div>
                        <div className="title_blue_600">Серия SIM-карты</div>
                        {Array.isArray(data?.serialSim) ? (
                          <>
                            {data?.serialSim.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.serialSim}</p>
                        )}
                      </div>
                    )}
                    {data?.imsi && (
                      <div>
                        <div className="title_blue_600">
                          Идентификационный номер SIM-карты
                        </div>
                        {Array.isArray(data?.imsi) ? (
                          <>
                            {data?.imsi.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.imsi}</p>
                        )}
                      </div>
                    )}
                    {data?.insuranceCompany && (
                      <div>
                        <div className="title_blue_600">Страховая компания</div>
                        {Array.isArray(data?.insuranceCompany) ? (
                          <>
                            {data?.insuranceCompany.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.insuranceCompany}</p>
                        )}
                      </div>
                    )}
                    {data?.insuranceNumber && (
                      <div>
                        <div className="title_blue_600">Номер страховки</div>
                        {Array.isArray(data?.insuranceNumber) ? (
                          <>
                            {data?.insuranceNumber.map((item) => {
                              return <p key={uuid()}>{item}</p>;
                            })}
                          </>
                        ) : (
                          <p>{data?.insuranceNumber}</p>
                        )}
                      </div>
                    )}
                    {data?.getContactTags && (
                      <div>
                        <div className="title_blue_600">GetContact Теги</div>
                        {data?.getContactTags?.map((item) => {
                          return <p key={uuid()}>{item}</p>;
                        })}
                      </div>
                    )}
                    {data?.numBusterTags && (
                      <div>
                        <div className="title_blue_600">NumBuster Теги</div>
                        {data?.numBusterTags?.map((item) => {
                          return <p key={uuid()}>{item}</p>;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </details>
            )}
            {data?.militaryInfo && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Воинская служба
                </summary>
                <div className="accordion_body">
                  <div className="title_blue_600">Инфо. о воинской службе</div>
                  <p>{data?.militaryInfo?.militaryService}</p>
                </div>
              </details>
            )}
            {data?.mtsBank && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  MТС-банк
                </summary>
                <div className="accordion_body">
                  {data?.mtsBank?.map(({ phone, cards, email }) => {
                    return (
                      <React.Fragment key={uuid()}>
                        {!cards?.length &&
                        !phone?.length &&
                        !email?.length ? null : (
                          <div
                            style={{
                              display: "grid",
                              gap: "15px",
                              justifyContent: "start",
                              borderRadius: "12px",
                              padding: "8px",
                              border: "4px solid #e6f1ff",
                              margin: "0 0 15px 0",
                            }}
                          >
                            <>
                              {cards?.map((card) => {
                                return (
                                  <div className="bordered">
                                    <div>
                                      <div className="title_blue_600">
                                        Номер карты
                                      </div>
                                      <p className="title_gray_500">
                                        {card.cardNumber || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Тип карты
                                      </div>
                                      <p className="title_gray_500">
                                        {card.cardType || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Дата выдачи
                                      </div>
                                      <p className="title_gray_500">
                                        {card.issueDate || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="title_blue_600">
                                        Дата истечения срока карты
                                      </div>
                                      <p className="title_gray_500">
                                        {card.expiryDate || "-"}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                              {phone?.length ? (
                                <div className="bordered">
                                  <div>
                                    <div className="title_blue_600">
                                      Телефоны
                                    </div>
                                    {phone?.map((ph) => (
                                      <p
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        {ph || "-"}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              ) : null}
                              {email?.length ? (
                                <div className="bordered">
                                  <div>
                                    <div className="title_blue_600">Почты</div>
                                    {email?.map((em) => (
                                      <p
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        {em || "-"}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              ) : null}
                            </>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </details>
            )}
            {data?.alfa && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Альфа-банк
                </summary>
                <div className="accordion_body">
                  {data?.alfa?.map(
                    ({
                      phone,
                      cards,
                      fio,
                      email,
                      lastname,
                      firstname,
                      patronymic,
                      dob,
                    }) => {
                      return (
                        <React.Fragment key={uuid()}>
                          {!cards?.length &&
                          !phone?.length &&
                          !email?.length ? null : (
                            <div
                              // className="alfa_grid"
                              style={{
                                display: "grid",
                                gap: "15px",
                                justifyContent: "start",
                                borderRadius: "12px",
                                padding: "8px",
                                border: "4px solid #e6f1ff",
                                margin: "0 0 15px 0",
                              }}
                            >
                              <>
                                {cards?.map((card) => {
                                  return (
                                    <div className="bordered">
                                      <div>
                                        <div className="title_blue_600">
                                          Номер карты
                                        </div>
                                        <p className="title_gray_500">
                                          {card.cardnum_ccode || "-"}
                                        </p>
                                      </div>
                                      <div>
                                        <div className="title_blue_600">
                                          Номер счета
                                        </div>
                                        <p className="title_gray_500">
                                          {card.account_number || "-"}
                                        </p>
                                      </div>
                                      {(lastname ||
                                        firstname ||
                                        patronymic) && (
                                        <div>
                                          <div className="title_blue_600">
                                            Владелец
                                          </div>
                                          <p className="title_gray_500">
                                            {lastname} {firstname} {patronymic}
                                          </p>
                                        </div>
                                      )}
                                      {dob && (
                                        <div>
                                          <div className="title_blue_600">
                                            Дата рождения
                                          </div>
                                          <p className="title_gray_500">
                                            {moment(dob).format("YYYY-MM-DD")}
                                          </p>
                                        </div>
                                      )}
                                      <div>
                                        <div className="title_blue_600">
                                          Дата истечения срока карты
                                        </div>
                                        <p className="title_gray_500">
                                          {card.expire_date || "-"}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                                {phone?.length ? (
                                  <div className="bordered">
                                    <div>
                                      <div className="title_blue_600">
                                        Телефоны
                                      </div>
                                      {phone?.map((ph) => (
                                        <p
                                          className="title_gray_500"
                                          key={uuid()}
                                        >
                                          {ph || "-"}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                ) : null}
                                {email?.length ? (
                                  <div className="bordered">
                                    <div>
                                      <div className="title_blue_600">
                                        Почты
                                      </div>
                                      {email?.map((em) => (
                                        <p
                                          className="title_gray_500"
                                          key={uuid()}
                                        >
                                          {em || "-"}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    },
                  )}
                </div>
              </details>
            )}
            {data?.relationships && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Родственники
                </summary>
                <div className="accordion_body">
                  <div className="cdek_grid" key={uuid()}>
                    {data?.relationships?.map((item) => {
                      return (
                        <>
                          <div className="bordered">
                            <div>
                              <div className="title_blue_600">
                                Дата рождения
                              </div>
                              <p className="title_gray_500">
                                {item.lastname} {item.firstname}{" "}
                                {item.patronymic}
                              </p>
                            </div>
                            <div>
                              <div className="title_blue_600">
                                Дата рождения
                              </div>
                              <p className="title_gray_500">
                                {item.dob || "-"}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </details>
            )}
            {data?.telegramData && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Telegram
                </summary>
                <div className="accordion_body">
                  {data?.telegramData?.map((item) => {
                    const getTelegramInterestsColumn =
                      generateTelegramColumn(item?.interests) || [];
                    const unitedCategories = item?.interests
                      ?.flatMap((cat) => cat?.cs)
                      .filter(Boolean);
                    const getTelegramCategoriesColumn =
                      generateTelegramColumn(unitedCategories) || [];
                    const unitedTags = unitedCategories
                      ?.flatMap((t) => t?.ts)
                      .filter(Boolean);
                    const getTelegramTagsColumn =
                      generateTelegramColumn(unitedTags).sort((a, b) => {
                        if (a.accessor === "t" && b.accessor !== "t") {
                          return -1; // "t" comes first
                        } else if (a.accessor !== "t" && b.accessor === "t") {
                          return 1; // "t" comes first
                        } else {
                          return 0; // no change in order for other elements
                        }
                      }) || [];

                    const telegramProfiles = item?.profiles?.split("\n");
                    const regex =
                      /(?:@(\w+)? \/ )?(.+?) \| (\d{4}-\d{2}-\d{2} \d{2}:\d{2})/g;

                    const matches = item?.groups?.matchAll(regex);

                    const groupArray = matches
                      ? Array.from(matches, (match) => {
                          const [, nickName, groupName, date] = match;
                          return { nickName, groupName, date };
                        })
                      : null;
                    return (
                      <div>
                        {item?.resultFromHistory ? (
                          <div style={{ margin: "16px 0" }}>
                            {item?.timestamp ? (
                              <div>
                                Дата запроса:{" "}
                                <span style={{ color: "#006eff" }}>
                                  {moment(item?.timestamp).format(
                                    "YYYY-MM-DD HH:mm:ss",
                                  ) || "-"}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                        {item?.input && (
                          <div style={{ marginBottom: "16px" }}>
                            <div>
                              Параметр поиска:{" "}
                              <span style={{ color: "#006eff" }}>
                                {item.input}
                              </span>
                            </div>
                          </div>
                        )}

                        <div
                          style={{
                            display: "grid",
                            gap: "15px",
                          }}
                        >
                          <div className="accordion_grid">
                            {groupArray?.length ? (
                              <div className="bordered">
                                <div className="details_div">
                                  <div className="title_blue_600">Группы</div>
                                  {groupArray?.map(
                                    ({ date, nickName, groupName }) => {
                                      return (
                                        <p
                                          style={{
                                            marginBottom: "2px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                          className="title_gray_500"
                                          key={uuid()}
                                        >
                                          {nickName ? (
                                            <a
                                              href={`https://t.me/joinchat/${nickName}`}
                                              target="_blank"
                                            >
                                              {groupName || nickName}
                                            </a>
                                          ) : (
                                            <a>{groupName}</a>
                                          )}

                                          <span style={{ marginLeft: "10px" }}>
                                            Добавл. {date || "-"}
                                          </span>
                                        </p>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            ) : null}

                            {telegramProfiles?.length ? (
                              <div className="bordered">
                                <div className="details_div">
                                  <div className="title_blue_600">Профили</div>
                                  {telegramProfiles?.map((profile) => {
                                    const profileData = profile.split("|");
                                    const profileName = [
                                      profileData[0].trim(),
                                      profileData[1].trim(),
                                    ].join(" ");
                                    const profileNickName = profileData?.[2];

                                    const profileDate =
                                      profileData[
                                        profileData.length - 1
                                      ]?.trim();
                                    return (
                                      <p
                                        style={{
                                          marginBottom: "2px",
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        <span>
                                          {profileName || "-"} -
                                          {profileNickName || "-"}
                                        </span>
                                        <span style={{ marginLeft: "10px" }}>
                                          Изм. {profileDate || "-"}
                                        </span>
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <div className="alfa_grid">
                            {item?.phones?.length ? (
                              <div className="bordered">
                                <div className="details_div">
                                  <div className="title_blue_600">Телефоны</div>
                                  {item?.phones?.map((phone) => {
                                    return (
                                      <p
                                        className="title_gray_500"
                                        key={uuid()}
                                      >
                                        {phone || "-"}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div>
                          {item?.interests ? (
                            <div
                              style={{
                                display: "grid",
                                gap: "15px",
                                marginTop: "24px",
                              }}
                              className="table_box"
                            >
                              <div className="table_title">Интересы</div>
                              <HtmlExportTable
                                data={item?.interests}
                                columns={getTelegramInterestsColumn}
                                size="small"
                              />
                            </div>
                          ) : null}
                          {unitedCategories ? (
                            <div
                              style={{
                                display: "grid",
                                gap: "15px",
                                marginTop: "24px",
                              }}
                              className="table_box"
                            >
                              <div className="table_title">Категории</div>
                              <HtmlExportTable
                                data={unitedCategories}
                                columns={getTelegramCategoriesColumn}
                                size="small"
                              />
                            </div>
                          ) : null}
                          {unitedTags?.length ? (
                            <div
                              style={{
                                display: "grid",
                                gap: "15px",
                                marginTop: "24px",
                              }}
                              className="table_box"
                            >
                              <div className="table_title">Теги</div>
                              <HtmlExportTable
                                data={unitedTags}
                                columns={getTelegramTagsColumn}
                                size="small"
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
            {hasPhotos && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">Фото</summary>
                <div className="accordion_body">
                  <div className="photos_row">
                    {data?.bindedPhotos?.length ? (
                      <>
                        {data?.bindedPhotos?.map((item) => {
                          return (
                            <figure
                              style={{
                                borderRadius: "16px",
                                width: "200px",
                                height: "200px",
                              }}
                              className="photo_item"
                              key={uuid()}
                            >
                              <img
                                src={`data:image/png;base64, ${item} `}
                                alt=""
                                style={{
                                  objectFit: "contain",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </figure>
                          );
                        })}
                      </>
                    ) : null}
                    {data?.photos?.displayPhotos?.length ? (
                      <>
                        {data?.photos?.displayPhotos.map((item) => {
                          return (
                            <figure
                              style={{
                                borderRadius: "16px",
                                width: "200px",
                                height: "200px",
                              }}
                              className="photo_item"
                              key={uuid()}
                            >
                              <img
                                src={`data:image/png;base64, ${item} `}
                                alt=""
                                style={{
                                  objectFit: "contain",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </figure>
                          );
                        })}
                      </>
                    ) : null}
                    {data.photos?.signatures?.length ? (
                      <>
                        {data.photos?.signatures?.map((item) => {
                          return (
                            <figure
                              style={{
                                border: "1px solid rgb(0, 46, 107)",
                                width: "200px",
                                height: "200px",
                              }}
                              className="photo_item"
                              key={uuid()}
                            >
                              <img
                                style={{
                                  objectFit: "contain",
                                  width: "100%",
                                  height: "100%",
                                }}
                                src={`data:image/png;base64, ${item} `}
                                alt=""
                              />
                            </figure>
                          );
                        })}
                      </>
                    ) : null}
                    {data.photos?.avatars?.length ? (
                      <>
                        {data.photos?.avatars?.map((item) => {
                          return (
                            <figure
                              style={{
                                border: "1px solid rgb(0, 46, 107)",
                                width: "200px",
                                height: "200px",
                              }}
                              className="photo_item"
                              key={uuid()}
                            >
                              <img
                                style={{
                                  objectFit: "contain",
                                  width: "100%",
                                  height: "100%",
                                }}
                                src={`data:image/png;base64, ${item} `}
                                alt=""
                              />
                            </figure>
                          );
                        })}
                      </>
                    ) : null}
                  </div>
                </div>
              </details>
            )}
            {data?.deliveryAvatar && (
              <details className="content_section content-accordion">
                <summary className="content_head accordion-head">
                  Фото (Доставка)
                </summary>
                <div className="accordion_body">
                  <div className="photos_row">
                    {Array.isArray(data?.deliveryAvatar) ? (
                      <>
                        {data?.deliveryAvatar?.map((item) => {
                          return (
                            <figure
                              style={{
                                borderRadius: "16px",
                                width: "200px",
                                height: "200px",
                              }}
                              className="photo_item"
                              key={uuid()}
                            >
                              <img
                                style={{
                                  objectFit: "contain",
                                  width: "100%",
                                  height: "100%",
                                }}
                                src={item}
                                alt=""
                              />
                            </figure>
                          );
                        })}
                      </>
                    ) : (
                      <figure
                        style={{
                          borderRadius: "16px",
                          width: "200px",
                          height: "200px",
                        }}
                        className="photo_item"
                      >
                        <img
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          }}
                          src={data?.deliveryAvatar}
                          alt=""
                        />
                      </figure>
                    )}
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportHtml;
