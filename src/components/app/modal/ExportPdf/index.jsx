import React, { useState } from "react";
import moment from "moment";
import html2pdf from "html2pdf.js";
import { v4 as uuid } from "uuid";
import { ReactComponent as Export } from "assets/images/export_ico.svg";
import Logo from "assets/images/Kermit_ico32.png";
import Watermark from "assets/images/watermark.png";
import { divideArray } from "libs/helpers";
import Button from "components/app/use/Button";
import "./index.scss";
import Loader from "components/app/use/Loader";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { subtractUserCredits } from "store/thunks/usersThunks";
import { useUserCredits } from "apiHooks/useUserCredits";

const ExportPdf = ({ data, close, source, sourceId }) => {
  const dispatch = useDispatch();
  const { shouldCallFunctions } = useUserCredits();
  const [loading, setLoading] = useState(false);
  const generatePDF = () => {
    if (!shouldCallFunctions?.export) {
      return toast.error("Недостаточно кредитов для експорта PDF", {
        description: "Обратитесь к администратору",
      });
    }
    const nameSirenaTrain = data?.sirenaTrainTicketInfo?.find(
      ({ regnum }) => regnum,
    )?.regnum;
    const nameFromOldAuto =
      data?.autoArray?.map(({ plateNumber, id }) => {
        if (plateNumber) {
          return `номер-${plateNumber}`;
        }
        if (!plateNumber) {
          return `id-${id}`;
        }
      }) || [];
    const nameFromAuto =
      data?.newAuto?.map(({ userInfo, autoInfo, owners }) => {
        if (owners && owners?.length) {
          return `${owners[0]?.lastname}-${owners[0]?.firstname}-${owners[0]?.patronymic}`;
        }
        if (userInfo && userInfo?.length) {
          return `${userInfo[0]?.lastname}-${userInfo[0]?.first_name}-${userInfo[0]?.patronymic}`;
        }
        if (autoInfo && autoInfo?.length) {
          return `${
            autoInfo[0]?.vin
              ? `vin-${autoInfo[0]?.vin}`
              : autoInfo[0]?.license_plate
              ? `номер-${autoInfo[0]?.license_plate}`
              : "exportHTML"
          }`;
        }
      }) || [];

    const lastname = data?.lastname || null;
    const firstname = data?.firstname || null;
    const patronymic = data?.patronymic || null;
    const nameStr = `${lastname ?? ""}-${firstname ?? ""}-${patronymic ?? ""}`;
    const name =
      (nameStr !== "--" ? nameStr : null) ||
      data?.fio ||
      data?.name ||
      (data?.phone ? `phone-${data?.phone}` : null) ||
      (data?.email ? `email-${data?.email}` : null) ||
      `sirena-train#${nameSirenaTrain}`;
    const newFileName = name || nameFromAuto[0] || nameFromOldAuto[0];
    setLoading(true);
    const element = document.getElementById("export_anket");
    const fileName = `${newFileName}-${moment
      .utc()
      .local()
      .format("YYYY-MM-DD")}.pdf`;
    const options = {
      margin: 2,
      filename: fileName,
      image: { type: "png", compression: 0.5 },
      html2canvas: { scale: 1 },
      jsPDF: {
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      },
      pagebreak: { mode: ["avoid-all"], before: ".newPage" },
      // pagebreak: { before: ".newPage" },
      // pagebreak: { mode: ["avoid-all"] },
    };
    const watermarkImage = new Image();
    watermarkImage.src = Watermark;

    watermarkImage.onload = () => {
      const watermarkCSS = `url(${watermarkImage.src})`;
      const watermarkElement = document.createElement("div");

      for (let i = 0; i < 50; i++) {
        var backgroundDiv = document.createElement("div");
        backgroundDiv.className = "watermark_inner";
        backgroundDiv.style.backgroundImage = watermarkCSS;
        watermarkElement.appendChild(backgroundDiv);
      }

      watermarkElement.classList.add("watermark");
      element.appendChild(watermarkElement);
      html2pdf().set(options).from(element).save();
      dispatch(
        subtractUserCredits({
          creditsPayload: {
            data: [
              {
                type: "export",
                count: 1,
              },
            ],
          },
          logsPayload: {
            type: "export",
            name: "Експорт PDF",
            data: [
              {
                anketId: Number(data?.id),
                sourceId: Number(sourceId),
                sourceNameId: source,
              },
            ],
          },
        }),
      );
      toast.info("Загрузка началась, ожидайте файл");
      setLoading(false);
      close();
    };
  };
  const [part1, part2] = divideArray(data?.jobHistory);
  const hasSecretData =
    data?.departureRestrictions ||
    data?.diplCountry ||
    data?.diplSecretAccess ||
    data?.diplTopSecretDescription ||
    data?.diplTopSecretInfo ||
    data?.topSecretAccessInfo ||
    data?.secretAccess ||
    data?.diplWorkPlace;
  const hasSocial =
    data?.ip ||
    data?.login ||
    data?.password ||
    data?.sourceName ||
    data?.facebookId ||
    data?.vkId ||
    data?.mailruProfile ||
    data?.getContactTags ||
    data?.relatedPhones ||
    data?.numBusterTags ||
    data?.imsi ||
    data?.serialSim ||
    data?.webLink ||
    data?.family_status ||
    data?.post ||
    data?.osp ||
    data?.debt_amount ||
    data?.linkedinLink;
  const hasAutoPassport = data?.passport || data?.passportAddress;
  const hasPersonalInfo =
    data?.lastname || data?.firstname || data?.patronymic || data?.dob;
  const hasDocuments =
    data.addressRegistrationDate ||
    data.inn ||
    data?.snils ||
    data?.passportNumber ||
    data?.someDocument ||
    data?.documents;
  const hasSpektrPersonInfo =
    (data?.comment ||
      data?.chassis ||
      data?.engine ||
      data?.body ||
      data?.mark ||
      data?.yearOfCreation) &&
    data?.vin &&
    source === "spektr";

  return (
    <>
      {loading && <Loader />}
      <Button Icon={Export} func={generatePDF} text="Скачать как PDF" />
      {data && (
        <div className="export_profile_content" id="export_anket">
          <div className="export_head">
            <img src={Logo} alt="" />
            <div className="head_content">
              <h4>Detective Kermit</h4>
              <p>
                {data?.lastname} {data?.firstname} {data?.patronymic}
              </p>
              {data?.fio ? <p>{data?.fio}</p> : null}
            </div>
          </div>
          <h3>Личные данные</h3>
          <div className="row">
            {data?.photos?.avatars?.length ? (
              <figure className="profile_avatar">
                <img
                  src={`data:image/png;base64, ${data?.photos?.avatars[0]} `}
                  alt=""
                />
              </figure>
            ) : null}
            {hasPersonalInfo && (
              <div className="column">
                {data?.lastname && (
                  <>
                    <h3 className="column_title">Фамилия</h3>
                    <p className="desc">{data.lastname}</p>
                  </>
                )}
                {data?.firstname && (
                  <>
                    <h3 className="column_title">Имя</h3>
                    <p className="desc">{data.firstname}</p>
                  </>
                )}
                {data?.patronymic && data.patronymic !== " " && (
                  <>
                    <h3 className="column_title">Отчество</h3>
                    <p className="desc">{data.patronymic}</p>
                  </>
                )}

                {data?.dob && (
                  <>
                    <h3 className="column_title">Дата рождения</h3>
                    {Array.isArray(data.dob) ? (
                      <>
                        {data?.dob.map((item) => {
                          return (
                            <p className="desc" key={uuid()}>
                              {moment(item.value).format("YYYY-MM-DD")} -{" "}
                              {moment().diff(`${item.value}`, "years")} лет{" "}
                              {item.source ? `(${item.source})` : ""}
                            </p>
                          );
                        })}
                      </>
                    ) : (
                      <p className="desc">
                        {moment(data.dob).format("YYYY-MM-DD")} -{" "}
                        {moment().diff(`${data?.dob}`, "years")} лет
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="column">
              {data?.email && (
                <>
                  <h3 className="column_title">Email</h3>
                  {Array.isArray(data?.email) ? (
                    <>
                      {data?.email?.map((item) => {
                        return (
                          <p key={uuid()} className="desc">
                            {item.value} {item.source ? `(${item.source})` : ""}
                          </p>
                        );
                      })}
                    </>
                  ) : (
                    <p className="desc">{data.email}</p>
                  )}
                </>
              )}
              {data?.nationality && (
                <>
                  <h3 className="column_title">Национальность</h3>
                  {Array.isArray(data?.nationality) ? (
                    <>
                      <p className="desc">
                        {data?.nationality?.map((item) => {
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
                    <p className="desc">{data?.nationality}</p>
                  )}
                </>
              )}
              {data.gender && (
                <>
                  <h3 className="column_title">Пол</h3>
                  {Array.isArray(data.gender) ? (
                    <>
                      <p className="desc">
                        {data.gender.map((item) => {
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
                    <p className="desc">{data.gender}</p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="column  w-100">
              {data?.phone && (
                <>
                  <h3 className="column_title">Телефон</h3>
                  {Array.isArray(data.phone) ? (
                    data?.phone?.map((item) => {
                      return (
                        <p key={uuid()} className="desc">
                          {item.value} {item.source ? `(${item.source})` : ""}
                        </p>
                      );
                    })
                  ) : (
                    <p className="desc">{data?.phone} </p>
                  )}
                </>
              )}
              {data?.phone_home && (
                <>
                  <h3 className="column_title">Домашний телефон</h3>
                  {Array.isArray(data.phone_home) ? (
                    <>
                      <p className="desc">
                        {data?.phone_home?.map((item) => {
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
                    <p className="desc">{data?.phone_home}</p>
                  )}
                </>
              )}
              {data?.work_phone && (
                <>
                  <h3 className="column_title">Рабочий телефон</h3>
                  {Array.isArray(data.work_phone) ? (
                    <>
                      <p className="desc">
                        {data?.work_phone?.map((item) => {
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
                    <p className="desc">{data?.work_phone}</p>
                  )}
                </>
              )}
              {data?.beelinePhones?.length ? (
                <>
                  <h3 className="column_title">Телефоны Билайн</h3>
                  {data?.beelinePhones?.map(({ phone, finRole }) => {
                    return (
                      <p className="desc">
                        {phone} - {finRole}
                      </p>
                    );
                  })}
                </>
              ) : null}
              {data.name && (
                <>
                  <h3 className="column_title">Имя</h3>
                  {Array.isArray(data.name) ? (
                    <>
                      <p className="desc">
                        {data.name.map((item) => {
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
                    <p className="desc">{data.name}</p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="column  w-100">
              {data.placeOfBirth && (
                <>
                  <h3 className="column_title">Место рождения</h3>
                  {Array.isArray(data.placeOfBirth) ? (
                    <>
                      {data.placeOfBirth?.map((item) => {
                        return (
                          <p key={uuid()} className="desc">
                            {item}
                            {", "}
                          </p>
                        );
                      })}
                    </>
                  ) : (
                    <p className="desc">{data.placeOfBirth}</p>
                  )}
                </>
              )}
            </div>
          </div>
          {data.potentialNames && (
            <div>
              <div className="row">
                <div className="column w-100">
                  <h3 className="column_title">ФИО из других источников</h3>
                  {data.potentialNames?.map((item) => {
                    return (
                      <p key={uuid()} className="desc">
                        {item.value} {item.source ? `(${item.source})` : ""}{" "}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {data.addressRegistrationDateArray && (
            <div>
              <div className="row">
                <div className="column w-100">
                  <h3 className="column_title">
                    Дата регистрации с других источников
                  </h3>
                  <p className="desc" key={uuid()}>
                    {data.addressRegistrationDateArray?.map((item) => {
                      return (
                        <React.Fragment key={uuid()}>
                          {moment(item).format("YYYY-MM-DD")},{" "}
                        </React.Fragment>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data?.kids?.length ? (
            <div>
              <h3>Гос услуги(Дети)</h3>
              <div className="row grid_row p-5 bordered grid-row-3 gap-10">
                {data?.kids?.map(
                  ({ lastname, firstname, patronymic, dob, inn, snils }) => {
                    return (
                      <div className="grid-item" key={uuid()}>
                        <div className="bordered">
                          <div>
                            <h3 className="item_card_title">ФИО</h3>
                            {lastname} {firstname} {patronymic}
                          </div>
                          <div>
                            <h3 className="item_card_title">Дата рождения</h3>
                            {moment(dob).format("YYYY-MM-DD")}
                          </div>
                          <div>
                            <h3 className="item_card_title">ИНН</h3>
                            {inn || "-"}
                          </div>
                          <div>
                            <h3 className="item_card_title">
                              № Соц страхования
                            </h3>
                            {snils || "-"}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          ) : null}

          {data?.tutuPassengers?.length ? (
            <div>
              <h3>Tutu пользователи</h3>
              <div className="row grid_row p-5 bordered grid-row-3 gap-10">
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
                      <div className="grid-item" key={uuid()}>
                        <div className="bordered">
                          <div>
                            <h3 className="item_card_title">ФИО</h3>
                            {lastname} {firstname} {patronymic}
                          </div>
                          <div>
                            <h3 className="item_card_title">Дата рождения</h3>
                            {moment(dob).format("YYYY-MM-DD")}
                          </div>
                          <div>
                            <h3 className="item_card_title">Место рождения</h3>
                            {placeOfBirth || "-"}
                          </div>
                          <div>
                            <h3 className="item_card_title">Номер документа</h3>
                            {dcmNumber || "-"}
                          </div>
                          <div>
                            <h3 className="item_card_title">Тип документа</h3>
                            {dcmType || "-"}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          ) : null}

          {data?.tutuReserveUsers?.length ? (
            <div>
              <h3>Tutu пассажиры</h3>
              <div className="row grid_row p-5 bordered grid-row-3 gap-10">
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
                      <div className="grid-item" key={uuid()}>
                        <div className="bordered">
                          <div>
                            <h3 className="item_card_title">ФИО</h3>
                            {lastname} {firstname} {patronymic}
                          </div>
                          <div>
                            <h3 className="item_card_title">Дата рождения</h3>
                            {(dob && moment(dob).format("YYYY-MM-DD")) || "-"}
                          </div>
                          <div>
                            <h3 className="item_card_title">Email</h3>
                            {email || "-"}
                          </div>
                          <div>
                            <h3 className="item_card_title">Телефон</h3>
                            {phone || "-"}
                          </div>
                          <div>
                            <h3 className="item_card_title">
                              Билет куплен для
                            </h3>
                            {reservedFor || "-"}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          ) : null}

          {data?.newAuto && (
            <div>
              <h3>Avtoins</h3>
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
                    <div key={uuid()}>
                      {autoInfo?.length ? (
                        <div>
                          <div
                            className="column_title"
                            style={{ textAlign: "center", margin: "15px 0" }}
                          >
                            Данные о искомом авто
                          </div>
                          <div className="row grid_row">
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
                                  <React.Fragment key={uuid()}>
                                    <div className="column">
                                      {vin && (
                                        <>
                                          <div className="column_title">
                                            VIN код
                                          </div>
                                          <p className="desc">{vin || "-"}</p>
                                        </>
                                      )}
                                      {license_plate && (
                                        <>
                                          <div className="column_title">
                                            Номерное знак
                                          </div>
                                          <p className="desc">
                                            {license_plate || "-"}
                                          </p>
                                        </>
                                      )}
                                      {brand && brand !== "0" ? (
                                        <>
                                          <div className="column_title">
                                            Марка
                                          </div>
                                          <p className="desc">{brand || "-"}</p>
                                        </>
                                      ) : (
                                        <>
                                          <div className="column_title">
                                            Марка
                                          </div>
                                          <p className="desc">
                                            {mark_model_other || "-"}
                                          </p>
                                        </>
                                      )}
                                      {model && (
                                        <>
                                          <div className="column_title">
                                            Модель
                                          </div>
                                          <p className="desc">{model || "-"}</p>
                                        </>
                                      )}
                                      {yearIssue && (
                                        <>
                                          <div className="column_title">
                                            Год выпуска
                                          </div>
                                          <p className="desc">
                                            {yearIssue || "-"}
                                          </p>
                                        </>
                                      )}
                                      {enginePower && (
                                        <>
                                          <div className="column_title">
                                            Мощность двигателя
                                          </div>
                                          <p className="desc">
                                            {enginePower || "-"}
                                          </p>
                                        </>
                                      )}
                                      {chassis_number && (
                                        <>
                                          <div className="column_title">
                                            Номер шасси
                                          </div>
                                          <p className="desc">
                                            {chassis_number || "-"}
                                          </p>
                                        </>
                                      )}
                                      {body_number && (
                                        <>
                                          <div className="column_title">
                                            Номер кузова
                                          </div>
                                          <p className="desc">
                                            {body_number || "-"}
                                          </p>
                                        </>
                                      )}
                                      {veh_doc_date && (
                                        <>
                                          <div className="column_title">
                                            Дата выдачи документа на ТС
                                          </div>
                                          <p className="desc">
                                            {veh_doc_date || "-"}
                                          </p>
                                        </>
                                      )}

                                      <>
                                        <div className="column_title">
                                          Серия\номер документа на ТС
                                        </div>
                                        <p className="desc">
                                          {veh_doc_serial || "-"} \{" "}
                                          {veh_doc_number}
                                        </p>
                                      </>
                                      {is_taxi && (
                                        <>
                                          <div className="column_title">
                                            Использовалась в такси
                                          </div>
                                          <p className="desc">
                                            {is_taxi === "0"
                                              ? "Нет"
                                              : is_taxi === "1"
                                              ? "Да"
                                              : "Нет"}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  </React.Fragment>
                                );
                              },
                            )}
                          </div>
                        </div>
                      ) : null}
                      {owners?.length ? (
                        <div className="column w-100 ">
                          <div
                            className="column_title"
                            style={{ textAlign: "center", margin: "15px 0" }}
                          >
                            Владельцы искомого авто
                          </div>
                          <div className="row row_block gap-10">
                            {owners?.map(
                              ({
                                documents,
                                dob,
                                firstname,
                                lastname,
                                patronymic,
                              }) => {
                                return (
                                  <React.Fragment key={uuid()}>
                                    <div className="column w-100 bordered">
                                      <>
                                        <div className="column_title">ФИО</div>
                                        <p className="desc">
                                          {lastname} {firstname} {patronymic}
                                        </p>
                                      </>
                                      <>
                                        <div className="column_title">
                                          Дата рождения
                                        </div>
                                        <p className="desc">
                                          {moment(dob).format("YYYY-MM-DD") ||
                                            "-"}
                                        </p>
                                      </>
                                      {documents?.length ? (
                                        <>
                                          <div
                                            className=""
                                            style={{ textAlign: "center" }}
                                          >
                                            Документы {lastname} {firstname}{" "}
                                            {patronymic}
                                          </div>
                                          <div className="row grid_row grid-row-3">
                                            {documents?.map(
                                              ({
                                                doc_type,
                                                doc_number,
                                                doc_serial,
                                                date_from,
                                              }) => {
                                                return (
                                                  <div
                                                    className="column w-100"
                                                    key={uuid()}
                                                  >
                                                    <>
                                                      <div className="column_title">
                                                        Тип документа
                                                      </div>
                                                      <p className="desc">
                                                        {doc_type || "-"}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Номер / Серия
                                                      </div>
                                                      <p className="desc">
                                                        {doc_number || "-"} /{" "}
                                                        {doc_serial || "-"}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Дата выдачи
                                                      </div>
                                                      <p className="desc">
                                                        {date_from || "-"}
                                                      </p>
                                                    </>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </React.Fragment>
                                );
                              },
                            )}
                          </div>
                        </div>
                      ) : null}
                      {drivers?.length ? (
                        <div className="column w-100 ">
                          <div
                            className="column_title"
                            style={{ textAlign: "center", margin: "15px 0" }}
                          >
                            Имеют доступ к искомому авто
                          </div>
                          <div className="row row_block gap-10">
                            {drivers?.map(
                              ({
                                documents,
                                dob,
                                firstname,
                                lastname,
                                patronymic,
                              }) => {
                                return (
                                  <React.Fragment key={uuid()}>
                                    <div className="column w-100 bordered">
                                      <>
                                        <div className="column_title">ФИО</div>
                                        <p className="desc">
                                          {lastname} {firstname} {patronymic}
                                        </p>
                                      </>
                                      <>
                                        <div className="column_title">
                                          Дата рождения
                                        </div>
                                        <p className="desc">
                                          {moment(dob).format("YYYY-MM-DD") ||
                                            "-"}
                                        </p>
                                      </>
                                      {documents?.length ? (
                                        <>
                                          <div
                                            className=""
                                            style={{ textAlign: "center" }}
                                          >
                                            Документы {lastname} {firstname}{" "}
                                            {patronymic}
                                          </div>
                                          <div className="row grid_row grid-row-3">
                                            {documents?.map(
                                              ({
                                                doc_type,
                                                doc_number,
                                                doc_serial,
                                                date_from,
                                              }) => {
                                                return (
                                                  <div
                                                    className="column w-100"
                                                    key={uuid()}
                                                  >
                                                    <>
                                                      <div className="column_title">
                                                        Тип документа
                                                      </div>
                                                      <p className="desc">
                                                        {doc_type || "-"}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Номер / Серия
                                                      </div>
                                                      <p className="desc">
                                                        {doc_number || "-"} /{" "}
                                                        {doc_serial || "-"}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Дата выдачи
                                                      </div>
                                                      <p className="desc">
                                                        {date_from || "-"}
                                                      </p>
                                                    </>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </React.Fragment>
                                );
                              },
                            )}
                          </div>
                        </div>
                      ) : null}

                      {userInfo?.length ? (
                        <div className="column w-100">
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "15px 0" }}
                          >
                            Личная информация
                          </div>
                          <div className="row row_block gap-10">
                            {userInfo.map(
                              ({
                                documents,
                                dob,
                                first_name,
                                lastname,
                                patronymic,
                              }) => {
                                return (
                                  <div className="column w-100 bordered">
                                    <>
                                      <div className="column_title">ФИО</div>
                                      <p className="desc">
                                        {lastname} {first_name} {patronymic}
                                      </p>
                                    </>
                                    <>
                                      <div className="column_title">
                                        Дата рождения
                                      </div>
                                      <p className="desc">
                                        {moment(dob).format("YYYY-MM-DD") ||
                                          "-"}
                                      </p>
                                    </>
                                    <div className="row row_block w-100">
                                      {documents?.length ? (
                                        <>
                                          <div
                                            className=""
                                            style={{ textAlign: "center" }}
                                          >
                                            Документы {lastname} {first_name}{" "}
                                            {patronymic}
                                          </div>
                                          <div className="row grid_row grid-row-3">
                                            {documents?.map(
                                              ({
                                                date_from,
                                                doc_number,
                                                doc_serial,
                                                doc_type,
                                              }) => {
                                                return (
                                                  <div className="column">
                                                    <>
                                                      <div className="column_title">
                                                        Тип документа
                                                      </div>
                                                      <p className="desc">
                                                        {doc_type || "-"}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Номер / Серия
                                                      </div>
                                                      <p className="desc">
                                                        {doc_number || "-"} /{" "}
                                                        {doc_serial || "-"}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Дата выдачи
                                                      </div>
                                                      <p className="desc">
                                                        {date_from || "-"}
                                                      </p>
                                                    </>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      ) : null}
                      {carOwners?.length ? (
                        <>
                          <div className="column w-100">
                            <div
                              style={{ textAlign: "center", margin: "15px 0" }}
                            >
                              Является владельцем авто
                            </div>
                            <div className=" row grid_row grid-row-2">
                              {carOwners.map(
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
                                    <div className="column bordered">
                                      {vin && (
                                        <>
                                          <div className="column_title">
                                            VIN код
                                          </div>
                                          <p className="desc">{vin || "-"}</p>
                                        </>
                                      )}
                                      {license_plate && (
                                        <>
                                          <div className="column_title">
                                            Номерное знак
                                          </div>
                                          <p className="desc">
                                            {license_plate || "-"}
                                          </p>
                                        </>
                                      )}
                                      {brand && brand !== "0" ? (
                                        <>
                                          <div className="column_title">
                                            Марка
                                          </div>
                                          <p className="desc">{brand || "-"}</p>
                                        </>
                                      ) : (
                                        <>
                                          <div className="column_title">
                                            Марка
                                          </div>
                                          <p className="desc">
                                            {mark_model_other || "-"}
                                          </p>
                                        </>
                                      )}
                                      {model && (
                                        <>
                                          <div className="column_title">
                                            Модель
                                          </div>
                                          <p className="desc">{model || "-"}</p>
                                        </>
                                      )}
                                      {yearIssue && (
                                        <>
                                          <div className="column_title">
                                            Год выпуска
                                          </div>
                                          <p className="desc">
                                            {yearIssue || "-"}
                                          </p>
                                        </>
                                      )}
                                      {enginePower && (
                                        <>
                                          <div className="column_title">
                                            Мощность двигателя
                                          </div>
                                          <p className="desc">
                                            {enginePower || "-"}
                                          </p>
                                        </>
                                      )}
                                      {chassis_number && (
                                        <>
                                          <div className="column_title">
                                            Номер шасси
                                          </div>
                                          <p className="desc">
                                            {chassis_number || "-"}
                                          </p>
                                        </>
                                      )}
                                      {body_number && (
                                        <>
                                          <div className="column_title">
                                            Номер кузова
                                          </div>
                                          <p className="desc">
                                            {body_number || "-"}
                                          </p>
                                        </>
                                      )}
                                      {veh_doc_date && (
                                        <>
                                          <div className="column_title">
                                            Дата выдачи документа на ТС
                                          </div>
                                          <p className="desc">
                                            {veh_doc_date || "-"}
                                          </p>
                                        </>
                                      )}

                                      <>
                                        <div className="column_title">
                                          Серия\номер документа на ТС
                                        </div>
                                        <p className="desc">
                                          {veh_doc_serial || "-"} \{" "}
                                          {veh_doc_number}
                                        </p>
                                      </>
                                      {is_taxi && (
                                        <>
                                          <div className="column_title">
                                            Использовалась в такси
                                          </div>
                                          <p className="desc">
                                            {is_taxi === "0"
                                              ? "Нет"
                                              : is_taxi === "1"
                                              ? "Да"
                                              : "Нет"}
                                          </p>
                                        </>
                                      )}
                                      {drivers?.length ? (
                                        <>
                                          <div
                                            style={{
                                              textAlign: "center",
                                              margin: "0 0 10px 0",
                                            }}
                                          >
                                            Допущены к управлению:
                                          </div>
                                          <div
                                            className="row grid_row grid-row-1"
                                            style={{ gap: "12px" }}
                                          >
                                            {drivers.map(
                                              ({
                                                dob,
                                                firstname,
                                                lastname,
                                                patronymic,
                                              }) => {
                                                return (
                                                  <div className="column bordered">
                                                    <>
                                                      <div className="column_title">
                                                        ФИО
                                                      </div>
                                                      <p className="desc">
                                                        {lastname} {firstname}{" "}
                                                        {patronymic}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Дата рождения
                                                      </div>
                                                      <p className="desc">
                                                        {moment(dob).format(
                                                          "YYYY-MM-DD",
                                                        ) || "-"}
                                                      </p>
                                                    </>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}
                      {carDrivers?.length ? (
                        <>
                          <div className="column w-100">
                            <div
                              style={{ textAlign: "center", margin: "15px 0" }}
                            >
                              Допущен к управлению
                            </div>
                            <div
                              className="row row_block grid-row-4"
                              // style={{ alignItems: "baseline" }}
                            >
                              {carDrivers.map(
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
                                  carOwners,
                                  veh_doc_serial,
                                  mark_model_other,
                                }) => {
                                  return (
                                    <div className="column bordered w-100">
                                      <div className="row">
                                        <div className="column">
                                          {vin && (
                                            <>
                                              <div className="column_title">
                                                VIN код
                                              </div>
                                              <p className="desc">
                                                {vin || "-"}
                                              </p>
                                            </>
                                          )}
                                          {license_plate && (
                                            <>
                                              <div className="column_title">
                                                Номерное знак
                                              </div>
                                              <p className="desc">
                                                {license_plate || "-"}
                                              </p>
                                            </>
                                          )}
                                          {brand && brand !== "0" ? (
                                            <>
                                              <div className="column_title">
                                                Марка
                                              </div>
                                              <p className="desc">
                                                {brand || "-"}
                                              </p>
                                            </>
                                          ) : null}
                                        </div>
                                        <div className="column">
                                          {chassis_number && (
                                            <>
                                              <div className="column_title">
                                                Номер шасси
                                              </div>
                                              <p className="desc">
                                                {chassis_number || "-"}
                                              </p>
                                            </>
                                          )}
                                          {body_number && (
                                            <>
                                              <div className="column_title">
                                                Номер кузова
                                              </div>
                                              <p className="desc">
                                                {body_number || "-"}
                                              </p>
                                            </>
                                          )}
                                          {veh_doc_date && (
                                            <>
                                              <div className="column_title">
                                                Дата выдачи документа на ТС
                                              </div>
                                              <p className="desc">
                                                {veh_doc_date || "-"}
                                              </p>
                                            </>
                                          )}
                                          {mark_model_other &&
                                          mark_model_other !== "0" ? (
                                            <>
                                              <div className="column_title">
                                                Доп. Марка
                                              </div>
                                              <p className="desc">
                                                {mark_model_other || "-"}
                                              </p>
                                            </>
                                          ) : null}
                                          <>
                                            <div className="column_title">
                                              Серия\номер документа на ТС
                                            </div>
                                            <p className="desc">
                                              {veh_doc_serial || "-"} \{" "}
                                              {veh_doc_number}
                                            </p>
                                          </>
                                        </div>
                                        <div className="column">
                                          {model && (
                                            <>
                                              <div className="column_title">
                                                Модель
                                              </div>
                                              <p className="desc">
                                                {model || "-"}
                                              </p>
                                            </>
                                          )}
                                          {yearIssue && (
                                            <>
                                              <div className="column_title">
                                                Год выпуска
                                              </div>
                                              <p className="desc">
                                                {yearIssue || "-"}
                                              </p>
                                            </>
                                          )}
                                          {enginePower && (
                                            <>
                                              <div className="column_title">
                                                Мощность двигателя
                                              </div>
                                              <p className="desc">
                                                {enginePower || "-"}
                                              </p>
                                            </>
                                          )}
                                          {is_taxi && (
                                            <>
                                              <div className="column_title">
                                                Использовалась в такси
                                              </div>
                                              <p className="desc">
                                                {is_taxi === "0"
                                                  ? "Нет"
                                                  : is_taxi === "1"
                                                  ? "Да"
                                                  : "Нет"}
                                              </p>
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      {carOwners?.length ? (
                                        <>
                                          <div
                                            style={{
                                              textAlign: "center",
                                              margin: "0 0 10px 0",
                                            }}
                                          >
                                            Владельцы:
                                          </div>
                                          <div className="row grid_row grid-row-2">
                                            {carOwners.map(
                                              ({
                                                dob,
                                                firstname,
                                                lastname,
                                                patronymic,
                                              }) => {
                                                return (
                                                  <div className="column bordered">
                                                    <>
                                                      <div className="column_title">
                                                        ФИО
                                                      </div>
                                                      <p className="desc">
                                                        {lastname} {firstname}{" "}
                                                        {patronymic}
                                                      </p>
                                                    </>
                                                    <>
                                                      <div className="column_title">
                                                        Дата рождения
                                                      </div>
                                                      <p className="desc">
                                                        {moment(dob).format(
                                                          "YYYY-MM-DD",
                                                        ) || "-"}
                                                      </p>
                                                    </>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                },
              )}
            </div>
          )}
          {data?.alfa?.length ? (
            <div>
              <h3>Альфа-банк</h3>
              {data?.alfa?.map(
                ({
                  phone,
                  cards,
                  email,
                  lastname,
                  firstname,
                  patronymic,
                  dob,
                }) => {
                  return (
                    <React.Fragment key={uuid()}>
                      {cards?.length ? (
                        <div className="column w-100">
                          <div
                            className="column_title"
                            style={{ textAlign: "center", margin: "15px 0" }}
                          >
                            Карты
                          </div>
                          <div className="row grid_row grid-row-3 gap-10">
                            {cards.map(
                              ({
                                account_number,
                                cardnum_ccode,
                                expire_date,
                              }) => {
                                return (
                                  <React.Fragment key={uuid()}>
                                    <div className="column w-100 bordered">
                                      <>
                                        <div className="column_title">
                                          Владелец
                                        </div>
                                        <p className="desc">
                                          {lastname} {firstname} {patronymic}
                                        </p>
                                      </>
                                      <>
                                        <div className="column_title">
                                          Номер карты
                                        </div>
                                        <p className="desc">{cardnum_ccode}</p>
                                      </>
                                      <>
                                        <div className="column_title">
                                          Номер счета
                                        </div>
                                        <p className="desc">{account_number}</p>
                                      </>
                                      <>
                                        <div className="column_title">
                                          Дата истечения срока
                                        </div>
                                        <p className="desc">{expire_date}</p>
                                      </>
                                    </div>
                                  </React.Fragment>
                                );
                              },
                            )}
                          </div>
                        </div>
                      ) : null}
                      {phone?.length ? (
                        <div className="column w-100">
                          <div
                            className="column_title"
                            style={{ textAlign: "center", margin: "15px 0" }}
                          >
                            Телефоны
                          </div>
                          <div className="row grid_row grid-row-3 gap-10">
                            <div className="column w-100 bordered">
                              <>
                                {phone.map((ph) => {
                                  return (
                                    <p key={uuid()} className="desc">
                                      {ph}
                                    </p>
                                  );
                                })}
                              </>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {email?.length ? (
                        <div className="column w-100">
                          <div
                            className="column_title"
                            style={{ textAlign: "center", margin: "15px 0" }}
                          >
                            Почты
                          </div>
                          <div className="row grid_row grid-row-3 gap-10">
                            <div className="column w-100 bordered">
                              <>
                                {email.map((em) => {
                                  return (
                                    <p key={uuid()} className="desc">
                                      {em}
                                    </p>
                                  );
                                })}
                              </>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                },
              )}
            </div>
          ) : null}

          {hasSpektrPersonInfo && (
            <div>
              <h3>SPEKTR Искомый участник</h3>
              <div className="row">
                {data.mark && (
                  <div className="column">
                    <h3 className="column_title">Автомобиль</h3>
                    <p className="desc">{data.mark}</p>
                  </div>
                )}
                {data.plateNumber && (
                  <div className="column">
                    <h3 className="column_title">Номерной знак</h3>
                    <p className="desc">{data.plateNumber}</p>
                  </div>
                )}
                {data.engine && (
                  <div className="column">
                    <h3 className="column_title">Номер двигателя</h3>
                    <p className="desc">{data.engine}</p>
                  </div>
                )}
                {data.chassis && (
                  <div className="column">
                    <h3 className="column_title">Номер шасси</h3>
                    <p className="desc">{data.chassis}</p>
                  </div>
                )}
                {data.body && (
                  <div className="column">
                    <h3 className="column_title">Номер кузова</h3>
                    <p className="desc">{data.body}</p>
                  </div>
                )}
                {data.yearOfCreation && (
                  <div className="column">
                    <h3 className="column_title">Год выпуска</h3>
                    <p className="desc">{data.yearOfCreation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {data?.accidents?.length && (
            <div>
              <h3>SPEKTR страховые случаи</h3>
              <div>
                {data.accidents.map(
                  ({ accidentDate, accidentType, participants }) => {
                    return (
                      <div key={uuid()}>
                        <h3
                          className="item_column_title"
                          style={{ textAlign: "center" }}
                        >
                          {accidentType} -{" "}
                          {moment(accidentDate).format("YYYY-MM-DD")}
                        </h3>
                        <div className={`row grid_row p-5 bordered grid-row-2`}>
                          {participants.map(({ personInfo, vehicleInfo }) => {
                            return (
                              <div className="grid-item">
                                {personInfo.relation && (
                                  <>
                                    <h3 className="item_column_title">
                                      Тип участника
                                    </h3>
                                    <p className="desc">
                                      {personInfo.relation}
                                    </p>
                                  </>
                                )}
                                <>
                                  <h3 className="item_column_title">ФИО</h3>
                                  <p className="desc">
                                    {personInfo.surname} {personInfo.name}{" "}
                                    {personInfo.patronymic}
                                  </p>
                                </>
                                {personInfo?.birthDate && (
                                  <>
                                    <h3 className="item_column_title">
                                      День рождения
                                    </h3>
                                    <p className="desc">
                                      {moment(personInfo.birthDate).format(
                                        "YYYY-MM-DD",
                                      )}
                                    </p>
                                  </>
                                )}
                                {vehicleInfo?.make && (
                                  <>
                                    <h3 className="item_column_title">
                                      Автомобиль
                                    </h3>
                                    <p className="desc"> {vehicleInfo.make}</p>
                                  </>
                                )}
                                {vehicleInfo?.plateNumber && (
                                  <>
                                    <h3 className="item_column_title">
                                      Номерной знак
                                    </h3>
                                    <p className="desc">
                                      {" "}
                                      {vehicleInfo.plateNumber}
                                    </p>
                                  </>
                                )}
                                {vehicleInfo?.vin && (
                                  <>
                                    <h3 className="item_column_title">
                                      VIN код
                                    </h3>
                                    <p className="desc"> {vehicleInfo.vin}</p>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {data?.sirenaInsuranceInfo && (
            <div>
              <h3>Сирена Страховки</h3>
              <div>
                {data?.sirenaInsuranceInfo.map(
                  ({
                    city_from,
                    city_to,
                    dep_date,
                    docNumber,
                    doctype,
                    firstname,
                    flight,
                    lastname,
                    patronymic,
                    tkt_date,
                    dob,
                  }) => {
                    return (
                      <div key={uuid()}>
                        <div className="row grid_row p-5 bordered grid-row-2">
                          <div className="grid-item">
                            <h3 className="item_column_title">ФИО</h3>
                            <p className="desc">
                              {`${lastname || "-"} ${firstname || "-"} ${
                                patronymic || "-"
                              }`}
                            </p>
                            <h3 className="item_column_title">Дата рождения</h3>
                            <p className="desc">
                              {moment.utc(dob).format("YYYY-MM-DD HH:mm:ss") ||
                                "-"}
                            </p>
                            <h3 className="item_column_title">Город вылета</h3>
                            <p>{city_from || "-"}</p>
                            <h3 className="item_column_title">
                              {" "}
                              Город прилета
                            </h3>
                            <p>{city_to || "-"}</p>
                            <h3 className="item_column_title">
                              Дата бронирования
                            </h3>
                            <p>
                              {moment
                                .utc(tkt_date)
                                .format("YYYY-MM-DD HH:mm:ss") || "-"}
                            </p>
                            <h3 className="item_column_title">Дата вылета</h3>
                            <p>{dep_date}</p>
                            <h3 className="item_column_title">Документ</h3>
                            <p>{docNumber || "-"}</p>
                            <h3 className="item_column_title">Тип документа</h3>
                            <p>{doctype || "-"}</p>
                            <h3 className="item_column_title">
                              Номер самолета
                            </h3>
                            <p>{flight || "-"}</p>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {data?.estates && (
            <div>
              <h3>ЕГРОН</h3>
              <div>
                {data?.estates?.map(
                  ({ address, area, cadNumber, history, price }) => {
                    return (
                      <div key={uuid()}>
                        <div className="row grid_row p-5 bordered grid-row-2">
                          <div className="grid-item">
                            {address && (
                              <>
                                <h3 className="item_column_title">Адрес</h3>
                                <p>{address}</p>
                              </>
                            )}
                            {cadNumber && (
                              <>
                                <h3 className="item_column_title">
                                  {" "}
                                  Кадастровый номер
                                </h3>
                                <p>{cadNumber || "-"}</p>
                              </>
                            )}
                            {area && (
                              <>
                                <h3 className="item_column_title">Площадь</h3>
                                <p>{area || "-"}</p>
                              </>
                            )}
                            {price && (
                              <>
                                <h3 className="item_column_title">Стоимость</h3>
                                <p>{price || "-"} ₽</p>
                              </>
                            )}
                          </div>
                        </div>
                        {history?.length ? (
                          <div>
                            <h3
                              className="item_column_title"
                              style={{ textAlign: "center" }}
                            >
                              {`Действия по объекту: ${cadNumber}`}
                            </h3>
                            <div className="row grid_row p-5 bordered grid-row-3">
                              {history?.map(
                                ({
                                  lastname,
                                  firstname,
                                  patronymic,
                                  dealType,
                                  objectType,
                                  dateFrom,
                                  document_number,
                                  document_series,
                                  status,
                                  snils,
                                  banks,
                                }) => {
                                  return (
                                    <div key={uuid()} className="grid-item">
                                      <h3 className="item_column_title">ФИО</h3>
                                      <p className="desc">
                                        {`${lastname || "-"} ${
                                          firstname || "-"
                                        } ${patronymic || "-"}`}
                                      </p>
                                      {dealType && (
                                        <>
                                          <h3 className="item_column_title">
                                            Тип сделки
                                          </h3>
                                          <p>{dealType || "-"}</p>
                                        </>
                                      )}
                                      {objectType && (
                                        <>
                                          <h3 className="item_column_title">
                                            Тип площади
                                          </h3>
                                          <p>{objectType || "-"}</p>
                                        </>
                                      )}

                                      <h3 className="item_column_title">
                                        Статус сделки
                                      </h3>
                                      <p>{status || "-"}</p>
                                      <h3 className="item_column_title">
                                        Дата сделки
                                      </h3>
                                      <p>
                                        {dateFrom
                                          ? moment
                                              .utc(dateFrom)
                                              .format("YYYY-MM-DD")
                                          : "-"}
                                      </p>
                                      <h3 className="item_column_title">
                                        Документ серия - номер
                                      </h3>
                                      <p>
                                        {document_series || "no data"} -
                                        {document_number || "no data"}
                                      </p>
                                      <h3 className="item_column_title">
                                        № Соц страховки
                                      </h3>
                                      <p>{snils || "no data"}</p>
                                      {banks?.length ? (
                                        <>
                                          <h3 className="item_column_title">
                                            Банк кредитор
                                          </h3>
                                          <p>{banks || "no data"}</p>
                                        </>
                                      ) : null}
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {data?.sirenaTrainTicketInfo && (
            <div>
              <h3>Сирена Поезда</h3>
              <div>
                {data.sirenaTrainTicketInfo.map(
                  ({
                    regnum,
                    lastname,
                    firstname,
                    patronymic,
                    pass_doc,
                    passengers,
                    phone,
                    port_from,
                    port_to,
                    seat,
                    seat_tier,
                    ticket,
                    tkt_date,
                  }) => {
                    return (
                      <div key={uuid()}>
                        <h3
                          className="item_column_title"
                          style={{ textAlign: "center" }}
                        >
                          Номер брони: {regnum}
                        </h3>
                        <div className="row grid_row p-5 bordered grid-row-2">
                          <div className="grid-item">
                            <h3 className="item_column_title">ФИО</h3>
                            <p className="desc">
                              {`${lastname || "-"} ${firstname || "-"} ${
                                patronymic || "-"
                              }`}
                            </p>
                            {phone && (
                              <>
                                <h3 className="item_column_title">Телефон</h3>
                                <p>{phone || ""}</p>
                              </>
                            )}
                            <h3 className="item_column_title">
                              Станция отправления
                            </h3>
                            <p>{port_from || "-"}</p>
                            <h3 className="item_column_title">
                              {" "}
                              Станция прибытия
                            </h3>
                            <p>{port_to || "-"}</p>
                            <h3 className="item_column_title">
                              {" "}
                              Дата бронирования{" "}
                            </h3>
                            <p>
                              {moment
                                .utc(tkt_date)
                                .format("YYYY-MM-DD HH:mm:ss") || "-"}
                            </p>
                            <h3 className="item_column_title">Документ</h3>
                            <p>{pass_doc || "-"}</p>
                            <h3 className="item_column_title">Номер билета</h3>
                            <p>{ticket || "-"}</p>
                            <h3 className="item_column_title">Место</h3>
                            <p>{seat || "-"}</p>
                            <h3 className="item_column_title">Уровень места</h3>
                            <p>{seat_tier || "-"}</p>
                          </div>
                        </div>
                        {passengers?.length ? (
                          <div>
                            <h3
                              className="item_column_title"
                              style={{ textAlign: "center" }}
                            >
                              {`Попутчики по брони: ${regnum}`}
                            </h3>
                            <div className="row grid_row p-5 bordered grid-row-3">
                              {passengers?.map(
                                ({
                                  lastname,
                                  firstname,
                                  patronymic,
                                  pass_doc,
                                  phone,
                                  port_from,
                                  port_to,
                                  seat,
                                  seat_tier,
                                  ticket,
                                  tkt_date,
                                }) => {
                                  return (
                                    <div key={uuid()} className="grid-item">
                                      <h3 className="item_column_title">ФИО</h3>
                                      <p className="desc">
                                        {`${lastname || "-"} ${
                                          firstname || "-"
                                        } ${patronymic || "-"}`}
                                      </p>
                                      {phone && (
                                        <>
                                          <h3 className="item_column_title">
                                            Телефон
                                          </h3>
                                          <p>{phone || ""}</p>
                                        </>
                                      )}
                                      <h3 className="item_column_title">
                                        Станция отправления
                                      </h3>
                                      <p>{port_from || "-"}</p>
                                      <h3 className="item_column_title">
                                        {" "}
                                        Станция прибытия
                                      </h3>
                                      <p>{port_to || "-"}</p>
                                      <h3 className="item_column_title">
                                        Дата бронирования
                                      </h3>
                                      <p>
                                        {moment
                                          .utc(tkt_date)
                                          .format("YYYY-MM-DD HH:mm:ss") || "-"}
                                      </p>
                                      <h3 className="item_column_title">
                                        Документ
                                      </h3>
                                      <p>{pass_doc || "-"}</p>
                                      <h3 className="item_column_title">
                                        Номер билета
                                      </h3>
                                      <p>{ticket || "-"}</p>
                                      <h3 className="item_column_title">
                                        Место
                                      </h3>
                                      <p>{seat || "-"}</p>
                                      <h3 className="item_column_title">
                                        Уровень места
                                      </h3>
                                      <p>{seat_tier || "-"}</p>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {data?.sirenaTicketInfo && (
            <div>
              <h3>Сирена Билеты</h3>
              <div>
                {data?.sirenaTicketInfo.map(
                  ({
                    id,
                    regnum,
                    name,
                    lastname,
                    firstname,
                    patronymic,
                    phone,
                    email,
                    city_from,
                    city_to,
                    first_city,
                    tkt_date,
                    airline_name,
                    farce_calt_vld_url,
                    passDoc,
                    info,
                    relatedTickets,
                  }) => {
                    return (
                      <div key={uuid()}>
                        <h3
                          className="item_column_title"
                          style={{ textAlign: "center" }}
                        >
                          Номер брони: {regnum}
                        </h3>
                        <div className="row grid_row p-5 bordered grid-row-2">
                          <div className="grid-item">
                            <h3 className="item_column_title">ФИО</h3>
                            <p className="desc">
                              {name ||
                                `${lastname || "-"} ${firstname || "-"} ${
                                  patronymic || "-"
                                }`}
                            </p>
                            <h3 className="item_column_title">Телефон</h3>
                            <p className="desc">
                              {phone?.length ? (
                                <>
                                  {phone?.map((ph) => (
                                    <p>{ph || "-"}</p>
                                  ))}
                                </>
                              ) : (
                                "-"
                              )}
                            </p>
                            <h3 className="item_column_title">Email</h3>
                            <p>{email || "-"}</p>
                            <h3 className="item_column_title"> Город вылета</h3>
                            <p>{city_from || "-"}</p>
                            <h3 className="item_column_title">
                              {" "}
                              Город прилета
                            </h3>
                            <p>{city_to || "-"}</p>
                            <h3 className="item_column_title">
                              Дата бронирования
                            </h3>
                            <p>
                              {moment
                                .utc(tkt_date)
                                .format("YYYY-MM-DD HH:mm:ss") || "-"}
                            </p>
                            <h3 className="item_column_title">Город прилета</h3>
                            <p>{city_to || "-"}</p>
                            <h3 className="item_column_title">
                              Город бронирования
                            </h3>
                            <p>{first_city || "-"}</p>
                            <h3 className="item_column_title">Документ</h3>
                            <p>{passDoc || "-"}</p>
                            <h3 className="item_column_title">Авиакомпания</h3>
                            <p>{airline_name || "-"}</p>
                            <h3 className="item_column_title">Инфо</h3>
                            <p>{info || "-"}</p>
                            <h3 className="item_column_title">
                              Доп. инфо о месте вылета
                            </h3>
                            <p>{farce_calt_vld_url || "-"}</p>
                          </div>
                        </div>
                        {relatedTickets && (
                          <div>
                            <h3
                              className="item_column_title"
                              style={{ textAlign: "center" }}
                            >
                              {`Связанные билеты по брони: ${regnum}`}
                            </h3>
                            <div className="row grid_row p-5 bordered grid-row-3">
                              {relatedTickets.map(
                                ({
                                  name,
                                  lastname,
                                  firstname,
                                  patronymic,
                                  phone,
                                  email,
                                  city_from,
                                  city_to,
                                  first_city,
                                  tkt_date,
                                  airline_name,
                                  farce_calt_vld_url,
                                  passDoc,
                                  info,
                                }) => {
                                  return (
                                    <div key={uuid()} className="grid-item">
                                      <div>
                                        <h3 className="item_column_title">
                                          ФИО
                                        </h3>
                                        <p className="desc">
                                          {name ||
                                            `${lastname || "-"} ${
                                              firstname || "-"
                                            } ${patronymic || "-"}`}
                                        </p>
                                      </div>
                                      <h3 className="item_column_title">
                                        Телефон
                                      </h3>
                                      <p className="desc">
                                        {phone?.length ? (
                                          <>
                                            {phone?.map((ph) => (
                                              <p>{ph || "-"}</p>
                                            ))}
                                          </>
                                        ) : (
                                          "-"
                                        )}
                                      </p>
                                      <h3 className="item_column_title">
                                        Email
                                      </h3>
                                      <p>{email || "-"}</p>
                                      <h3 className="item_column_title">
                                        {" "}
                                        Город вылета
                                      </h3>
                                      <p>{city_from || "-"}</p>

                                      <h3 className="item_column_title">
                                        {" "}
                                        Город прилета
                                      </h3>
                                      <p>{city_to || "-"}</p>
                                      <h3 className="item_column_title">
                                        Дата бронирования
                                      </h3>
                                      <p>
                                        {moment
                                          .utc(tkt_date)
                                          .format("YYYY-MM-DD HH:mm:ss") || "-"}
                                      </p>
                                      <h3 className="item_column_title">
                                        Город бронирования
                                      </h3>
                                      <p>{first_city || "-"}</p>
                                      <h3 className="item_column_title">
                                        Документ
                                      </h3>
                                      <p>{passDoc || "-"}</p>
                                      <h3 className="item_column_title">
                                        Авиакомпания
                                      </h3>
                                      <p>{airline_name || "-"}</p>
                                      <h3 className="item_column_title">
                                        Инфо
                                      </h3>
                                      <p>{info || "-"}</p>
                                      <h3 className="item_column_title">
                                        Доп. инфо о месте вылета
                                      </h3>
                                      <p>{farce_calt_vld_url || "-"}</p>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {data?.sirenaPassenger && (
            <div>
              <h3>Сирена Пасажиры</h3>
              <div className={`row grid_row p-5 bordered grid-row-2`}>
                {data.sirenaPassenger.map(
                  ({
                    airline,
                    birthdate,
                    bookingTime,
                    categoryFly,
                    departureTime,
                    destination,
                    docNum,
                    docType,
                    email,
                    flight,
                    phone,
                    lastname,
                    firstname,
                    name,
                    patronymic,
                    pointOfDeparture,
                    ticket,
                    dob,
                    id,
                  }) => {
                    return (
                      <div key={uuid()} className="grid-item">
                        <div>
                          <h3 className="item_column_title">ФИО</h3>
                          <p className="desc">
                            {name || `${lastname} ${firstname} ${patronymic}`}
                          </p>
                        </div>
                        {phone && (
                          <>
                            <h3 className="item_column_title">Телефон</h3>
                            <p className="desc">{phone || "-"}</p>
                          </>
                        )}
                        {email && (
                          <>
                            <h3 className="item_column_title">Email</h3>
                            <p className="desc">{email || "-"}</p>
                          </>
                        )}
                        {dob && (
                          <>
                            <h3 className="item_column_title">Дата рождения</h3>
                            <p className="desc">
                              {dob ? moment(dob).format("YYYY-MM-DD") : "-"}
                            </p>
                          </>
                        )}
                        {pointOfDeparture && (
                          <>
                            <h3 className="item_column_title">Отправление</h3>
                            <p className="desc">{pointOfDeparture || "-"}</p>
                          </>
                        )}
                        {departureTime && (
                          <>
                            <h3 className="item_column_title">Время вылета</h3>
                            <p className="desc">
                              {moment(departureTime).format(
                                "YYYY-MM-DD HH:mm:ss",
                              ) || "-"}
                            </p>
                          </>
                        )}
                        {destination && (
                          <>
                            <h3 className="item_column_title">Прибытие</h3>
                            <p className="desc">{destination || "-"}</p>
                          </>
                        )}
                        {bookingTime && (
                          <>
                            <h3 className="item_column_title">
                              Дата бронирования
                            </h3>
                            <p className="desc">
                              {moment
                                .utc(bookingTime)
                                .format("YYYY-MM-DD HH:mm:ss") || "-"}
                            </p>
                          </>
                        )}
                        {ticket && (
                          <>
                            <h3 className="item_column_title">Номер билета</h3>
                            <p className="desc">{ticket || "-"}</p>
                          </>
                        )}

                        <>
                          <h3 className="item_column_title">
                            Номер документа / Тип документа
                          </h3>
                          <p className="desc">
                            {docNum || "-"} / {docType || "-"}
                          </p>
                        </>
                        {airline && (
                          <>
                            <h3 className="item_column_title">Авиакомпания</h3>
                            <p className="desc">{airline || "-"}</p>
                          </>
                        )}
                        {categoryFly && (
                          <>
                            <h3 className="item_column_title">
                              Клас обслуживания
                            </h3>
                            <p className="desc">{categoryFly || "-"}</p>
                          </>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {data?.cdekData && (
            <div>
              <h3>CDEK</h3>
              <div>
                {data?.cdekData.map(
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
                    id,
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
                      <div
                        key={uuid()}
                        className={`row grid_row p-5 bordered grid-row-2`}
                      >
                        {hasCustomer && (
                          <div className="grid-item ">
                            <h3
                              className="item_column_title"
                              style={{ textAlign: "center" }}
                            >
                              Данные клиента:
                            </h3>
                            {name && (
                              <>
                                <h3 className="item_column_title">Имя</h3>
                                <p className="desc">{name || "-"}</p>
                              </>
                            )}
                            {phone && (
                              <>
                                <h3 className="item_column_title">Телефон</h3>
                                <p className="desc">{phone || "-"}</p>
                              </>
                            )}
                            {email && (
                              <>
                                <h3 className="item_column_title">Email</h3>
                                <p className="desc">{email || "-"}</p>
                              </>
                            )}
                            {addressString && (
                              <>
                                <h3 className="item_column_title">Адрес</h3>
                                <p className="desc">{addressString || "-"}</p>
                              </>
                            )}
                            {city && (
                              <>
                                <h3 className="item_column_title">Город</h3>
                                <p className="desc">{city || "-"}</p>
                              </>
                            )}
                            {contactPerson && (
                              <>
                                <h3 className="item_column_title">
                                  Контактное лицо
                                </h3>
                                <p className="desc">{contactPerson || "-"}</p>
                              </>
                            )}
                            {contragentName && (
                              <>
                                <h3 className="item_column_title">
                                  Контрагент
                                </h3>
                                <p className="desc">{contragentName || "-"}</p>
                              </>
                            )}
                            {sourceName && (
                              <>
                                <h3 className="item_column_title">Источник</h3>
                                <p className="desc">{sourceName || "-"}</p>
                              </>
                            )}
                          </div>
                        )}
                        {hasPayer && (
                          <div className="grid-item ">
                            <h3
                              className="item_column_title"
                              style={{ textAlign: "center" }}
                            >
                              Данные плательщика:
                            </h3>
                            {payerName && (
                              <>
                                <h3 className="item_column_title">Имя</h3>
                                <p className="desc">{payerName || "-"}</p>
                              </>
                            )}
                            {payerPhone && (
                              <>
                                <h3 className="item_column_title">Телефон</h3>
                                <p className="desc">{payerPhone || "-"}</p>
                              </>
                            )}
                            {payerEmail && (
                              <>
                                <h3 className="item_column_title">Email</h3>
                                <p className="desc">{payerEmail || "-"}</p>
                              </>
                            )}
                            {payerAddress && (
                              <>
                                <h3 className="item_column_title">Адрес</h3>
                                <p className="desc">{payerAddress || "-"}</p>
                              </>
                            )}
                            {payerCity && (
                              <>
                                <h3 className="item_column_title">Город</h3>
                                <p className="desc">{payerCity || "-"}</p>
                              </>
                            )}
                            {payerContactPerson && (
                              <>
                                <h3 className="item_column_title">
                                  Контактное лицо
                                </h3>
                                <p className="desc">
                                  {payerContactPerson || "-"}
                                </p>
                              </>
                            )}
                            {payerContragentName && (
                              <>
                                <h3 className="item_column_title">
                                  Контрагент
                                </h3>
                                <p className="desc">
                                  {payerContragentName || "-"}
                                </p>
                              </>
                            )}
                          </div>
                        )}
                        {hasReceiver && (
                          <div className="grid-item ">
                            <h3
                              className="item_column_title"
                              style={{ textAlign: "center" }}
                            >
                              Данные получателя:
                            </h3>
                            {receiverName && (
                              <>
                                <h3 className="item_column_title">Имя</h3>
                                <p className="desc">{receiverName || "-"}</p>
                              </>
                            )}
                            {receiverPhone && (
                              <>
                                <h3 className="item_column_title">Телефон</h3>
                                <p className="desc">{receiverPhone || "-"}</p>
                              </>
                            )}
                            {receiverEmail && (
                              <>
                                <h3 className="item_column_title">Email</h3>
                                <p className="desc">{receiverEmail || "-"}</p>
                              </>
                            )}
                            {receiverAddress && (
                              <>
                                <h3 className="item_column_title">Адрес</h3>
                                <p className="desc">{receiverAddress || "-"}</p>
                              </>
                            )}
                            {receiverCity && (
                              <>
                                <h3 className="item_column_title">Город</h3>
                                <p className="desc">{receiverCity || "-"}</p>
                              </>
                            )}
                            {receiverContactPerson && (
                              <>
                                <h3 className="item_column_title">
                                  Контактное лицо
                                </h3>
                                <p className="desc">
                                  {receiverContactPerson || "-"}
                                </p>
                              </>
                            )}
                            {receiverContragentName && (
                              <>
                                <h3 className="item_column_title">
                                  Контрагент
                                </h3>
                                <p className="desc">
                                  {receiverContragentName || "-"}
                                </p>
                              </>
                            )}
                          </div>
                        )}
                        {hasSender && (
                          <div className="grid-item ">
                            <h3
                              className="item_column_title"
                              style={{ textAlign: "center" }}
                            >
                              Данные отправителя:
                            </h3>
                            {senderName && (
                              <>
                                <h3 className="item_column_title">Имя</h3>
                                <p className="desc">{senderName || "-"}</p>
                              </>
                            )}
                            {senderPhone && (
                              <>
                                <h3 className="item_column_title">Телефон</h3>
                                <p className="desc">{senderPhone || "-"}</p>
                              </>
                            )}
                            {senderEmail && (
                              <>
                                <h3 className="item_column_title">Email</h3>
                                <p className="desc">{senderEmail || "-"}</p>
                              </>
                            )}
                            {senderAddress && (
                              <>
                                <h3 className="item_column_title">Адрес</h3>
                                <p className="desc">{senderAddress || "-"}</p>
                              </>
                            )}
                            {senderCity && (
                              <>
                                <h3 className="item_column_title">Город</h3>
                                <p className="desc">{senderCity || "-"}</p>
                              </>
                            )}
                            {senderContactPerson && (
                              <>
                                <h3 className="item_column_title">
                                  Контактное лицо
                                </h3>
                                <p className="desc">
                                  {senderContactPerson || "-"}
                                </p>
                              </>
                            )}
                            {senderContragentName && (
                              <>
                                <h3 className="item_column_title">
                                  Контрагент
                                </h3>
                                <p className="desc">
                                  {senderContragentName || "-"}
                                </p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {hasDocuments && (
            <div>
              <h3>Документы</h3>
              <div className="row">
                <div className="column">
                  {data.addressRegistrationDate && (
                    <>
                      <h3 className="column_title">Дата регистрации</h3>
                      {Array.isArray(data.addressRegistrationDate) ? (
                        <>
                          <p className="desc">
                            {data.addressRegistrationDate.map((item) => {
                              return (
                                <React.Fragment key={uuid()}>
                                  {moment(item).format("YYYY-MM-DD")}
                                  {", "}
                                </React.Fragment>
                              );
                            })}
                          </p>
                        </>
                      ) : (
                        <p className="desc">
                          {moment(data.addressRegistrationDate).format(
                            "YYYY-MM-DD",
                          )}
                        </p>
                      )}
                    </>
                  )}
                  {data.passportNumber && (
                    <>
                      <h3 className="column_title">Номер паспорта</h3>
                      {Array.isArray(data.passportNumber) ? (
                        <>
                          <p className="desc">
                            {data.passportNumber.map((item) => {
                              return (
                                <React.Fragment key={uuid()}>
                                  {item}
                                </React.Fragment>
                              );
                            })}
                          </p>
                        </>
                      ) : (
                        <p className="desc">{data.passportNumber}</p>
                      )}
                    </>
                  )}
                  {data.inn && (
                    <>
                      <h3 className="column_title">ИНН</h3>
                      {Array.isArray(data.inn) ? (
                        <>
                          <p className="desc">
                            {data.inn.map((item) => {
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
                        <p className="desc">{data.inn}</p>
                      )}
                    </>
                  )}
                </div>
                <div className="column">
                  {data?.snils && (
                    <>
                      <h3 className="column_title">№ Соц страхования</h3>
                      {Array.isArray(data.snils) ? (
                        <>
                          <p className="desc">
                            {data.snils.map((item) => {
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
                        <p className="desc">{data.snils}</p>
                      )}
                    </>
                  )}
                  {data?.someDocument && (
                    <>
                      <h3 className="column_title">Доп. документы</h3>
                      {Array.isArray(data.someDocument) ? (
                        <>
                          {data.someDocument.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </>
                      ) : (
                        <p className="desc">{data.someDocument}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <h3 className="item_column_title" style={{ textAlign: "center" }}>
                Документы
              </h3>
              <div className="row grid_row p-5 bordered grid-row-3 gap-10">
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
                      <div className="grid-item">
                        <div className="bordered">
                          <div>
                            <h4 className="item_card_title">Серия / Номер</h4>
                            <p className="desc">
                              {dcmSerialNo || "-"} / {dcmNumber || "-"}
                            </p>
                          </div>
                          {dcmType && (
                            <div>
                              <h4 className="item_card_title">Тип</h4>
                              <p className="desc">{dcmType || "-"}</p>
                            </div>
                          )}
                          {dcmIssueWhere && (
                            <div>
                              <h4 className="item_card_title">
                                Документ выдан
                              </h4>
                              <p className="desc">{dcmIssueWhere || "-"}</p>
                            </div>
                          )}
                          {dcmDate && (
                            <div>
                              <h4 className="item_card_title">Дата выдачи</h4>
                              <p className="desc">{dcmDate || "-"}</p>
                            </div>
                          )}
                          {dcmExpiryDate && (
                            <div>
                              <h4 className="item_card_title">Срок действия</h4>
                              <p className="desc">{dcmExpiryDate || "-"}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {hasAutoPassport && (
            <div>
              <h3>Паспорт(доп. инф)</h3>
              <div className="row">
                {data?.passport && (
                  <div className="column">
                    <h3 className="column_title">Паспорт</h3>
                    {Array.isArray(data.passport) ? (
                      <>
                        {data.passport.map((item) => {
                          return (
                            <p className="desc" key={uuid()}>
                              {item}
                              {", "}
                            </p>
                          );
                        })}
                      </>
                    ) : (
                      <p className="desc">{data.passport}</p>
                    )}
                  </div>
                )}
                {data?.passportAddress && (
                  <div className="column">
                    <>
                      <h3 className="column_title">Паспорт адрес</h3>
                      {Array.isArray(data.passportAddress) ? (
                        <>
                          {data.passportAddress.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                                {", "}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <p className="desc">{data.passportAddress}</p>
                      )}
                    </>
                  </div>
                )}
              </div>
            </div>
          )}
          {data?.localPassport && (
            <div>
              <h3>Локальные паспорта</h3>
              <div className="row">
                <div className="column">
                  {data?.localPassport?.localPassportSeries && (
                    <>
                      <h3 className="column_title">Серия</h3>
                      <p className="desc">
                        {data.localPassport?.localPassportSeries}
                      </p>
                    </>
                  )}
                  {data.localPassport?.issuedate && (
                    <>
                      <h3 className="column_title">Срок действия</h3>
                      <p className="desc  no-wrap">
                        {data.localPassport?.issuedate}
                        {" - "}
                        {data.localPassport?.localPassportDateOfExpiry ||
                          "No data"}
                      </p>
                    </>
                  )}
                </div>
                <div className="column">
                  {data?.localPassport?.localPassportNumber && (
                    <>
                      <h3 className="column_title">Номер</h3>
                      <p className="desc">
                        {data.localPassport?.localPassportNumber}
                      </p>
                    </>
                  )}
                  {data?.localPassport?.issuedBy && (
                    <>
                      <h3 className="column_title">Выдан</h3>
                      <p className="desc">{data.localPassport.issuedBy}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {data?.leakCheck ? (
            <div>
              <h3>Leak Check</h3>
              {data?.leakCheck.map(({ payload, result }) => {
                return (
                  <>
                    <p className="desc">Параметр:</p>
                    <h3 className="column_title">{payload}</h3>
                    <div className="row grid_row grid-row-3">
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
                          return (
                            <div className="grid-item">
                              <h3 className="column_title">Логин</h3>
                              <p className="desc">{login || "No data"}</p>
                              {ip && (
                                <>
                                  <h3 className="column_title">IP адрес</h3>
                                  <p className="desc">{ip || "No data"}</p>
                                </>
                              )}
                              {zip && (
                                <>
                                  <h3 className="column_title">ZIP code</h3>
                                  <p className="desc">{zip || "No data"}</p>
                                </>
                              )}
                              {address && (
                                <>
                                  <h3 className="column_title">Адрес </h3>
                                  <p className="desc">{address || "No data"}</p>
                                </>
                              )}
                              {dob && (
                                <>
                                  <h3 className="column_title">
                                    Дата рождения
                                  </h3>
                                  <p className="desc">{dob || "No data"}</p>
                                </>
                              )}
                              {profile_name && (
                                <>
                                  <h3 className="column_title">
                                    Имя в профиле
                                  </h3>
                                  <p className="desc">
                                    {profile_name || "No data"}
                                  </p>
                                </>
                              )}
                              {(last_name || first_name) && (
                                <>
                                  <h3 className="column_title">ФИО</h3>
                                  <p className="desc">
                                    {last_name || ""} {first_name || ""}
                                  </p>
                                </>
                              )}
                              {name && (
                                <>
                                  <h3 className="column_title">ФИО</h3>
                                  <p className="desc">{name || "No data"}</p>
                                </>
                              )}
                              {username && (
                                <>
                                  <h3 className="column_title">
                                    Имя в профиле
                                  </h3>
                                  <p className="desc">
                                    {username || "No data"}
                                  </p>
                                </>
                              )}
                              {city && (
                                <>
                                  <h3 className="column_title">Город</h3>
                                  <p className="desc">{city || "No data"}</p>
                                </>
                              )}
                              {state && (
                                <>
                                  <h3 className="column_title">Cтрана</h3>
                                  <p className="desc">{state || "No data"}</p>
                                </>
                              )}
                              {phone && (
                                <>
                                  <h3 className="column_title">Телефон</h3>
                                  <p className="desc">{phone || "No data"}</p>
                                </>
                              )}
                              {password && (
                                <>
                                  <h3 className="column_title">Пароль</h3>
                                  <p className="desc">
                                    {password || "No data"}
                                  </p>
                                </>
                              )}
                              {last_breach && (
                                <>
                                  <h3 className="column_title">Дата взлома</h3>
                                  <p className="desc">{last_breach || "-"}</p>
                                </>
                              )}
                              {sources?.length ? (
                                <>
                                  <h3 className="column_title">
                                    Источник взлома
                                  </h3>
                                  <p className="desc">
                                    {sources.map((item) => (
                                      <React.Fragment>{item}, </React.Fragment>
                                    ))}
                                  </p>
                                </>
                              ) : null}
                              {origin?.length ? (
                                <>
                                  <h3 className="column_title">Источники</h3>
                                  <p className="desc">
                                    {origin.map((item) => (
                                      <p>{item}</p>
                                    ))}
                                  </p>
                                </>
                              ) : null}
                              {userNames?.length ? (
                                <>
                                  <h3
                                    className="column_title"
                                    style={{
                                      textAlign: "center",
                                      margin: "15px 0",
                                    }}
                                  >
                                    Пароли
                                  </h3>
                                  {userNames.map(
                                    ({ email, password, origin }) => {
                                      return (
                                        <>
                                          <p className="desc">
                                            Email - {email || "-"} <br />
                                            Pass - {password || "-"} <br />
                                            Источник - {origin || "Unknown"}
                                            <hr />
                                          </p>
                                        </>
                                      );
                                    },
                                  )}
                                </>
                              ) : null}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          ) : null}

          {data?.localPassportArray ? (
            <div>
              <h3>Локальный паспорт</h3>
              <div className="row grid_row">
                <>
                  {data?.localPassportArray.map(
                    ({
                      localPassportSeries,
                      localPassportNumber,
                      issuedBy,
                      issuedate,
                      localPassportDateOfExpiry,
                    }) => {
                      return (
                        <div className="column" key={uuid()}>
                          <h3 className="column_title">
                            Паспорт РФ серия/номер
                          </h3>
                          <p className="desc">
                            {localPassportSeries || "No data"} |{" "}
                            {localPassportNumber || "No data"}
                          </p>
                          {issuedBy && (
                            <>
                              <h3 className="column_title">Выдан</h3>
                              <p className="desc">{issuedBy}</p>
                            </>
                          )}
                          {issuedate && (
                            <>
                              <h3 className="column_title">
                                Действителен от-до
                              </h3>
                              <p className="desc">
                                {issuedate} -{" "}
                                {localPassportDateOfExpiry || "No data"}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    },
                  )}
                </>
              </div>
            </div>
          ) : null}
          {data?.foreignPassport && (
            <div>
              <h3>Иностранный паспорт</h3>
              <div className="row">
                <div className="column">
                  {data?.foreignPassport?.foreignPassportNumber && (
                    <>
                      <h3 className="column_title">Номер</h3>
                      <p className="desc">
                        {data.foreignPassport?.foreignPassportNumber}
                      </p>
                    </>
                  )}
                  {data.foreignPassport?.dateofissue && (
                    <>
                      <h3 className="column_title">Срок действия</h3>
                      <p className="desc no-wrap">
                        {data.foreignPassport?.dateofissue}
                        {" - "}
                        {data.foreignPassport?.dateOfExpiry || "No data"}
                      </p>
                    </>
                  )}
                </div>
                <div className="column">
                  {data?.foreignPassport?.department && (
                    <>
                      <h3 className="column_title">Отдел выдачи</h3>
                      <p className="desc">{data.foreignPassport.department}</p>
                    </>
                  )}
                  {data?.foreignPassport?.mrz1 && (
                    <>
                      <h3 className="column_title">MRZ1</h3>
                      <p className="desc">{data.foreignPassport.mrz1}</p>
                    </>
                  )}
                  {data?.foreignPassport?.mrz2 && (
                    <>
                      <h3 className="column_title">MRZ2</h3>
                      <p className="desc">{data.foreignPassport.mrz2}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {data.foreignPassportArray ? (
            <div>
              <h3>Иностранные паспорта</h3>
              <div className="row grid_row">
                {data?.foreignPassportArray.map(
                  ({
                    foreignPassportNumber,
                    department,
                    dateofissue,
                    dateOfExpiry,
                    mrz1,
                    mrz2,
                  }) => {
                    return (
                      <div className="column" key={uuid()}>
                        <h3 className="column_title">Загран. паспорт номер</h3>
                        <p className="desc">
                          {foreignPassportNumber || "No data"}
                        </p>
                        {department && (
                          <>
                            <h3 className="column_title">Выдан</h3>
                            <p className="desc">{department}</p>
                          </>
                        )}
                        {dateofissue && (
                          <>
                            <h3 className="column_title">Действителен от-до</h3>
                            <p className="desc">
                              {dateofissue} - {dateOfExpiry || "No data"}
                            </p>
                          </>
                        )}
                        {mrz1 && (
                          <>
                            <h3 className="column_title">MRZ1</h3>
                            <p className="desc">{mrz1}</p>
                          </>
                        )}
                        {mrz2 && (
                          <>
                            <h3 className="column_title">MRZ2</h3>
                            <p className="desc">{mrz2}</p>
                          </>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          ) : null}
          {data?.address ? (
            <div>
              <h3>Адреса</h3>
              <div className="row">
                <div className="column">
                  {Array.isArray(data?.address) ? (
                    <>
                      {data?.address?.map((item) => {
                        return (
                          <p key={uuid()} className="desc">
                            {item}
                          </p>
                        );
                      })}
                    </>
                  ) : (
                    <p className="desc">{data?.address}</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {data?.addressInfo ? (
            <div>
              <h3>Адрес</h3>
              <div className="row">
                <div className="column">
                  {data?.addressInfo?.country && (
                    <>
                      <h3 className="column_title">Страна проживания</h3>
                      <p className="desc">{data?.addressInfo?.country}</p>
                    </>
                  )}
                  {data?.addressInfo?.region && (
                    <>
                      <h3 className="column_title">Регион проживания</h3>
                      <p className="desc">{data?.addressInfo?.region}</p>
                    </>
                  )}
                  {data?.addressInfo?.province && (
                    <>
                      <h3 className="column_title">Провинция проживания</h3>
                      <p className="desc">{data?.addressInfo?.province}</p>
                    </>
                  )}
                  {data?.addressInfo?.locality && (
                    <>
                      <h3 className="column_title">
                        Населенный пункт проживания
                      </h3>
                      <p className="desc">{data?.addressInfo?.locality}</p>
                    </>
                  )}
                  {data?.addressInfo?.postindex && (
                    <>
                      <h3 className="column_title">Индекс</h3>
                      <p className="desc">{data?.addressInfo?.postindex}</p>
                    </>
                  )}
                </div>
                <div className="column">
                  {data?.addressInfo?.town && (
                    <>
                      <h3 className="column_title">Город проживания</h3>
                      <p className="desc">{data?.addressInfo?.town}</p>
                    </>
                  )}
                  {data?.addressInfo?.address && (
                    <>
                      <h3 className="column_title">Адрес проживания</h3>
                      <p className="desc">{data?.addressInfo?.address}</p>
                    </>
                  )}
                  {data?.addressInfo?.street && (
                    <>
                      <h3 className="column_title">Улица</h3>
                      <p className="desc">{data?.addressInfo?.street}</p>
                    </>
                  )}
                  {data?.addressInfo?.house && (
                    <>
                      <h3 className="column_title">Дом</h3>
                      <p className="desc">{data?.addressInfo?.house}</p>
                    </>
                  )}
                  {data?.addressInfo?.housing && (
                    <>
                      <h3 className="column_title">Корпус</h3>
                      <p className="desc">{data?.addressInfo?.housing}</p>
                    </>
                  )}
                  {data?.addressInfo?.flat && (
                    <>
                      <h3 className="column_title">Квартира</h3>
                      <p className="desc">{data?.addressInfo?.flat}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {data.addressArray && (
            <div>
              <h3>Адрес с других источников</h3>
              {data.addressArray.map(
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
                    <div className="row" key={uuid()}>
                      <div className="column">
                        <p className="desc">
                          {country} {region && <>{region}.</>}{" "}
                          {province && <>{province}.</>}{" "}
                          {locality && <>{locality}.</>} {town} {address}
                          {street} {house ? ` Дом ${house},` : ""}{" "}
                          {housing ? ` Корпус ${housing},` : ""}{" "}
                          {flat ? `кв ${flat}` : ""}{" "}
                          {postindex && <>Индекс {postindex}</>}{" "}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          )}
          {hasSecretData && (
            <div>
              <h3 className="column_column_title">Ограничения / Привелегии</h3>
              <div className="row">
                <div className="column">
                  {data.departureRestrictions && (
                    <>
                      <h3 className="column_title">Ограничение на выезд</h3>
                      {Array.isArray(data.departureRestrictions) ? (
                        <>
                          {data?.departureRestrictions.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.departureRestrictions}</p>
                        </>
                      )}
                    </>
                  )}

                  {data?.diplSecretAccess && (
                    <>
                      <h3 className="column_title">Доступ к дип. тайне</h3>
                      {Array.isArray(data.diplSecretAccess) ? (
                        <>
                          {data?.diplSecretAccess.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {data?.diplSecretAccess && (
                            <p className="desc">{data?.diplSecretAccess}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {data?.topSecretAccessInfo && (
                    <>
                      <h3 className="column_title">Доступ к гос.тайне</h3>
                      {Array.isArray(data.topSecretAccessInfo) ? (
                        <>
                          {data?.topSecretAccessInfo.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {data?.topSecretAccessInfo && (
                            <p className="desc">{data?.topSecretAccessInfo}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {data?.diplTopSecretDescription && (
                    <>
                      <h3 className="column_title">
                        Детали секретного доступа
                      </h3>
                      {Array.isArray(data.diplTopSecretDescription) ? (
                        <>
                          {data?.diplTopSecretDescription.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {data?.diplTopSecretDescription && (
                            <p className="desc">
                              {data?.diplTopSecretDescription}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="column">
                  {data?.diplWorkPlace && (
                    <>
                      <h3 className="column_title">Дип. место работы</h3>
                      {Array.isArray(data.diplWorkPlace) ? (
                        <>
                          {data?.diplWorkPlace.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {data?.diplWorkPlace && (
                            <p className="desc">{data?.diplWorkPlace}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {data?.diplCountry && (
                    <>
                      <h3 className="column_title">Страна дип. пребывания</h3>
                      {Array.isArray(data.diplCountry) ? (
                        <>
                          {data?.diplCountry.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {data?.diplCountry && (
                            <p className="desc">{data?.diplCountry}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {data?.diplTopSecretInfo && (
                    <>
                      <h3 className="column_title">
                        Доступ к совершенно секретной информации
                      </h3>
                      {Array.isArray(data.diplTopSecretInfo) ? (
                        <>
                          {data?.diplTopSecretInfo.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {data?.diplTopSecretInfo && (
                            <p className="desc">{data?.diplTopSecretInfo}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {data?.secretAccess && (
                    <>
                      <h3 className="column_title">Секретный доступ</h3>
                      {Array.isArray(data.secretAccess) ? (
                        <>
                          {data?.secretAccess.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {data?.secretAccess && (
                            <p className="desc">{data?.secretAccess}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {hasSocial && (
            <div>
              <h3 className="column_column_title">Соц. данные</h3>
              <div className="row">
                <div className="column">
                  {data?.post && (
                    <>
                      <h3 className="column_title">Должность(почта россии)</h3>
                      {Array.isArray(data?.post) ? (
                        <>
                          {data?.post.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <p className="desc">{data?.post}</p>
                      )}
                    </>
                  )}
                  {data?.family_status && (
                    <>
                      <h3 className="column_title">Семейное положение</h3>
                      {Array.isArray(data?.family_status) ? (
                        <>
                          {data?.family_status.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <p className="desc">{data?.family_status}</p>
                      )}
                    </>
                  )}
                  {data?.imsi && (
                    <>
                      <h3 className="column_title">
                        Идентификационный номер SIM-карты
                      </h3>
                      {Array.isArray(data?.imsi) ? (
                        <>
                          {data?.imsi.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <p className="desc">{data?.imsi}</p>
                      )}
                    </>
                  )}
                  {data?.serialSim && (
                    <>
                      <h3 className="column_title">Серия SIM-карты</h3>
                      {Array.isArray(data?.serialSim) ? (
                        <>
                          {data?.serialSim.map((item) => {
                            return (
                              <p className="desc" key={uuid()}>
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <p className="desc">{data?.serialSim}</p>
                      )}
                    </>
                  )}
                  {data.ip && (
                    <>
                      <h3 className="column_title">Ip адрес</h3>
                      {Array.isArray(data.ip) ? (
                        <>
                          {data?.ip.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.ip}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.login && (
                    <>
                      <h3 className="column_title">Логин</h3>
                      {Array.isArray(data.login) ? (
                        <>
                          {data?.login.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.login}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.osp && (
                    <>
                      <h3 className="column_title">Судебный пристав</h3>
                      {Array.isArray(data.osp) ? (
                        <>
                          {data?.osp.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.osp}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.debt_amount && (
                    <>
                      <h3 className="column_title">Сумма задолженности</h3>
                      {Array.isArray(data.debt_amount) ? (
                        <>
                          {data?.debt_amount.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.debt_amount}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.password && (
                    <>
                      <h3 className="column_title">Пароли</h3>
                      {Array.isArray(data.password) ? (
                        <>
                          {data?.password.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.password}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.webLink && (
                    <>
                      <h3 className="column_title">Веб ссылка</h3>
                      {Array.isArray(data.webLink) ? (
                        <>
                          {data?.webLink.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.webLink}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.sourceName && (
                    <>
                      <h3 className="column_title">Имя источника</h3>
                      {Array.isArray(data.sourceName) ? (
                        <>
                          {data?.sourceName.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                {item}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.sourceName}</p>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="column">
                  {data?.getContactTags && (
                    <>
                      <h3 className="column_title">GetContact Теги</h3>
                      {data?.getContactTags.map((item) => {
                        return (
                          <p className="desc" key={uuid()}>
                            {item}
                          </p>
                        );
                      })}
                    </>
                  )}
                  {data?.relatedPhones && (
                    <>
                      <h3 className="column_title">Похожие телефоны</h3>
                      {data?.relatedPhones.map((item) => {
                        return (
                          <p key={uuid()} className="desc">
                            {item}
                          </p>
                        );
                      })}
                    </>
                  )}
                  {data?.numBusterTags && (
                    <>
                      <h3 className="column_title">NumBuster Теги</h3>
                      {data?.numBusterTags.map((item) => {
                        return (
                          <p className="desc" key={uuid()}>
                            {item}
                          </p>
                        );
                      })}
                    </>
                  )}
                  {data.facebookId && (
                    <>
                      <h3 className="column_title">Facebook ID</h3>
                      {Array.isArray(data.facebookId) ? (
                        <>
                          {data?.facebookId.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
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
                        <>
                          <p className="desc">{data?.facebookId}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.vkId && (
                    <>
                      <h3 className="column_title">Профиль Vk</h3>
                      {Array.isArray(data.vkId) ? (
                        <>
                          {data?.vkId.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                <a
                                  href={`https://vk.com/id${item}`}
                                  target="_blank"
                                >
                                  {item}
                                </a>
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.vkId}</p>
                        </>
                      )}
                    </>
                  )}
                  {data.linkedinLink && (
                    <>
                      <h3 className="column_title">LinkedIn</h3>
                      {Array.isArray(data.linkedinLink) ? (
                        <>
                          {data?.linkedinLink.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
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
                        <>
                          <p className="desc">
                            https://www.linkedin.com/{data?.linkedinLink}
                          </p>
                        </>
                      )}
                    </>
                  )}
                  {data.mailruProfile && (
                    <>
                      <h3 className="column_title">Профиль Mail.ru</h3>
                      {Array.isArray(data.mailruProfile) ? (
                        <>
                          {data?.mailruProfile.map((item) => {
                            return (
                              <p key={uuid()} className="desc">
                                <a href={item} target="_blank">
                                  {item}
                                </a>
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="desc">{data?.mailruProfile}</p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {data?.fsspList ? (
            <div>
              <h3 className="item_column_title" style={{ textAlign: "center" }}>
                Приставы
              </h3>
              <div className="row grid_row p-5 bordered grid-row-3 gap-10">
                {data?.fsspList?.map(({ osp, debt_amount }) => {
                  return (
                    <div className="grid-item" key={uuid()}>
                      <div className="bordered">
                        <div>
                          <h3 className="item_card_title">
                            Пристав исполнитель
                          </h3>
                          <p className="desc">{osp || "-"}</p>
                        </div>
                        <div>
                          <h3 className="item_card_title">
                            Сумма задолженности
                          </h3>
                          <p className="desc">{debt_amount || "-"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {data?.accounts ? (
            <div>
              <h3 className="item_column_title" style={{ textAlign: "center" }}>
                Аккаунты почта банк
              </h3>
              <div className="row grid_row p-5 bordered grid-row-3 gap-10">
                {data?.accounts?.map(({ amountCur, name, amountRub }) => {
                  return (
                    <div className="grid-item" key={uuid()}>
                      <div className="bordered">
                        <div>
                          <h3 className="item_card_title">ФИО</h3>
                          <p className="desc">{name || "-"}</p>
                        </div>
                        <div>
                          <h3 className="item_card_title">
                            Состояние счета ₽ / валюта
                          </h3>
                          <p className="desc">
                            {amountRub || "-"} / {amountCur || "-"}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {data?.relationships && (
            <div>
              <h3 className="item_column_title" style={{ textAlign: "center" }}>
                Родственники
              </h3>
              <div className="row grid_row p-5 bordered grid-row-3 gap-10">
                {data?.relationships?.map((item) => {
                  return (
                    <div className="grid-item">
                      <div className="bordered">
                        <div>
                          <h4 className="item_card_title">ФИО</h4>
                          <p className="desc">
                            {item.lastname} {item.firstname} {item.patronymic}
                          </p>
                        </div>
                        <div>
                          <h4 className="item_card_title">Дата рождения</h4>
                          <p className="desc">{item.dob || "-"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {data?.militaryInfo && (
            <div>
              <h3>Сведения о военной службе</h3>
              <div className="row">
                <div className="column w-100">
                  {data?.militaryInfo && (
                    <>
                      <p className="desc">
                        {data?.militaryInfo?.militaryService}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {data?.insurancePolicies && (
            <div>
              <h3>Данные по авто(new)</h3>
              <div className="row grid_row">
                {data.insurancePolicies.map(
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
                      <div className="column" key={uuid()}>
                        {vin && (
                          <>
                            <h3 className="column_title">VIN код</h3>
                            <p className="desc">{vin}</p>
                          </>
                        )}
                        {licensePlate && (
                          <>
                            <h3 className="column_title">Номерной знак</h3>
                            <p className="desc">{licensePlate}</p>
                          </>
                        )}
                        {brandName && (
                          <>
                            <h3 className="column_title">Марка авто</h3>
                            <p className="desc">{brandName}</p>
                          </>
                        )}
                        {modelCar && (
                          <>
                            <h3 className="column_title">Модель авто</h3>
                            <p className="desc">{modelCar}</p>
                          </>
                        )}
                        {bodyNumber && (
                          <>
                            <h3 className="column_title">Номер кузова</h3>
                            <p className="desc">{bodyNumber}</p>
                          </>
                        )}
                        {chassisNumber && (
                          <>
                            <h3 className="column_title">Номер шасси</h3>
                            <p className="desc">{chassisNumber}</p>
                          </>
                        )}
                        {year_issue && (
                          <>
                            <h3 className="column_title">Год выпуска</h3>
                            <p className="desc">{year_issue}</p>
                          </>
                        )}
                        {enginePower && (
                          <>
                            <h3 className="column_title">К-во лошадиных сил</h3>
                            <p className="desc">{enginePower}</p>
                          </>
                        )}
                        <>
                          <h3 className="column_title">ФИО</h3>
                          <p className="desc">
                            {lastname} {firstname} {patronymic}
                          </p>
                        </>
                        {dob && (
                          <>
                            <h3 className="column_title">Дата рождения</h3>
                            <p className="desc">
                              {moment(dob).format("YYYY-MM-DD")}
                            </p>
                          </>
                        )}
                        {isCarOwner && (
                          <>
                            <h3 className="column_title">
                              Является владельцем ТС
                            </h3>
                            <p className="desc">{isCarOwner}</p>
                          </>
                        )}
                        {vehDocSerial && (
                          <>
                            <h3 className="column_title">
                              Cерия документа на ТС
                            </h3>
                            <p className="desc">{vehDocSerial}</p>
                          </>
                        )}

                        {insCompany && (
                          <>
                            <h3 className="column_title">Страховщик</h3>
                            <p className="desc">{insCompany}</p>
                          </>
                        )}
                        {contractType && (
                          <>
                            <h3 className="column_title">Тип договора</h3>
                            <p className="desc">{contractType}</p>
                          </>
                        )}
                        {isPolicyOwner && (
                          <>
                            <h3 className="column_title">
                              Является владельцем страхового полиса
                            </h3>
                            <p className="desc">{isPolicyOwner}</p>
                          </>
                        )}
                        {(policyCreateDate || policyEndDate) && (
                          <>
                            <h3 className="column_title">
                              Страховой полис дата от/до
                            </h3>
                            <p className="desc">
                              {moment(policyCreateDate).format("YYYY-MM-DD") ||
                                "-"}{" "}
                              /{" "}
                              {moment(policyEndDate).format("YYYY-MM-DD") ||
                                "-"}
                            </p>
                          </>
                        )}
                        {policy_unq_id && (
                          <>
                            <h3 className="column_title">
                              Уникальный номер СП
                            </h3>
                            <p className="desc">{policy_unq_id}</p>
                          </>
                        )}
                        {isDriver && (
                          <>
                            <h3 className="column_title">Водитель</h3>
                            <p className="desc">{isDriver}</p>
                          </>
                        )}
                        {docType && (
                          <>
                            <h3 className="column_title">Тип документа</h3>
                            <p className="desc">{docType}</p>
                          </>
                        )}
                        {(docNumber || docSerial) && (
                          <>
                            <h3 className="column_title">
                              Номер/Серия документа
                            </h3>
                            <p className="desc">
                              {docNumber || "-"} / {docSerial || "-"}
                            </p>
                          </>
                        )}
                        {isRestrict && (
                          <>
                            <h3 className="column_title">Ограничения</h3>
                            <p className="desc">{isRestrict}</p>
                          </>
                        )}
                        {bsoFullNum && (
                          <>
                            <h3 className="column_title">
                              Бланк строгой отчетности
                            </h3>
                            <p className="desc">{bsoFullNum}</p>
                          </>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
          {data.autoArray && (
            <div>
              <h3>Данные по авто</h3>
              <div className="row grid_row">
                {data.autoArray.map(({ phone, plateNumber, id, mark }) => {
                  return (
                    <div className="column" key={uuid()}>
                      {mark && (
                        <>
                          <h3 className="column_title">Марка</h3>
                          <p className="desc">{mark}</p>
                        </>
                      )}
                      {plateNumber && (
                        <>
                          <h3 className="column_title">Номерной знак</h3>
                          <p className="desc">{plateNumber}</p>
                        </>
                      )}
                      {phone && (
                        <>
                          <h3 className="column_title">Телефон</h3>
                          <p className="desc">{phone}</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {part1?.length ? (
            <div>
              <h3>Сведения о работе</h3>
              <div className="row grid_row">
                <div className="column">
                  {part1.map(
                    ({
                      info,
                      organizationAddress,
                      organizationName,
                      fireDate,
                      hireDate,
                    }) => {
                      return (
                        <React.Fragment key={uuid()}>
                          <h3 className="column_title">
                            Место работы {hireDate && hireDate}
                            {" - "}
                            {fireDate && fireDate}
                          </h3>
                          <p className="desc">
                            {info},{organizationAddress},{organizationName}.
                          </p>
                        </React.Fragment>
                      );
                    },
                  )}
                </div>
                {part2?.length && (
                  <div className="column">
                    {part2.map(
                      ({
                        info,
                        organizationAddress,
                        organizationName,
                        fireDate,
                        hireDate,
                      }) => {
                        return (
                          <React.Fragment key={uuid()}>
                            <h3 className="column_title">
                              Место работы {hireDate && hireDate}
                              {" - "}
                              {fireDate && fireDate}
                            </h3>
                            <p className="desc">
                              {info},{organizationAddress},{organizationName}.
                            </p>
                          </React.Fragment>
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
          {data.workPlace && (
            <div>
              <h3>Место работы (база авто)</h3>
              {Array.isArray(data?.workPlace) ? (
                <>
                  {data.workPlace.map((item) => {
                    return (
                      <div className="row" key={uuid()}>
                        <div className="column">
                          <p className="desc">{item}</p>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="row">
                  <div className="column">
                    <p className="desc">{data?.workPlace}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          {data.photos?.displayPhotos || data.photos?.signatures ? (
            <div>
              <h3>Остальные фото</h3>
              <div className="row">
                <div className="all_photos_row">
                  {data.photos?.displayPhotos?.length ? (
                    <>
                      {data.photos?.displayPhotos.map((item) => {
                        return (
                          <figure className="photo_item" key={uuid()}>
                            <img
                              src={`data:image/png;base64, ${item} `}
                              alt=""
                            />
                          </figure>
                        );
                      })}
                      {data.photos?.signatures?.map((item) => {
                        return (
                          <figure className="photo_item" key={uuid()}>
                            <img
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
            </div>
          ) : null}
          {data?.bindedPhotos ? (
            <div>
              <h3>Связанные фото</h3>
              <div className="row">
                <div className="all_photos_row">
                  {data?.bindedPhotos?.map((item) => {
                    return (
                      <figure className="photo_item" key={uuid()}>
                        <img src={`data:image/png;base64, ${item} `} alt="" />
                      </figure>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
          {data.deliveryAvatar ? (
            <div>
              <h3>Фото доставка</h3>
              <div className="row">
                <div className="all_photos_row">
                  {Array.isArray(data?.deliveryAvatar) ? (
                    <>
                      {data?.deliveryAvatar?.map((item) => {
                        return (
                          <figure className="photo_item" key={uuid()}>
                            <img src={item} alt="" />
                          </figure>
                        );
                      })}
                    </>
                  ) : (
                    <figure className="photo_item">
                      <img src={data?.deliveryAvatar} alt="" />
                    </figure>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
      <Button Icon={Export} func={generatePDF} text="Скачать как PDF" />
    </>
  );
};

export default ExportPdf;
