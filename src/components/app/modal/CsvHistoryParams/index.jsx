import "./index.scss";
import Card from "components/app/base/Card";
import React, { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const CsvHistoryParams = ({ selectedParams }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`csv_params_row ${isDarkTheme ? "csv_params_row-dark" : ""}`}
    >
      {selectedParams?.map(
        ({
          email,
          phone,
          firstName,
          lastName,
          parentName,
          foreignPassport,
          localPassport,
          documentNumber,
          inn,
          snils,
          gender,
          age,
          vin,
          plateNumber,
          militaryInformation,
          job,
          dateOfBirth,
          matchingPercentage,
          totalAnkets,
        }) => {
          return (
            <Card>
              <div
                className="csv_details_div csv_details_row"
                style={{
                  justifyContent: "center",
                }}
              >
                <div className="csv_details_label">Найдено анкет: </div>
                <p className="csv_details_desc"> {totalAnkets || "0"}</p>
              </div>
              {(firstName || lastName || parentName) && (
                <div className="csv_details_div">
                  <div className="csv_details_label">ФИО</div>
                  <p className="csv_details_desc">
                    {lastName || ""} {firstName || ""} {parentName || ""}
                  </p>
                </div>
              )}
              {gender && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Пол</div>
                  {gender && (
                    <p className="csv_details_desc">{gender || "-"}</p>
                  )}
                </div>
              )}
              {email && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Email</div>
                  {email && <p className="csv_details_desc">{email || "-"}</p>}
                </div>
              )}
              {phone && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Телефон</div>
                  {phone && <p className="csv_details_desc">{phone || "-"}</p>}
                </div>
              )}
              {inn && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Іnn</div>
                  {inn && <p className="csv_details_desc">{inn || "-"}</p>}
                </div>
              )}

              {snils && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Страховой номер</div>
                  {snils && <p className="csv_details_desc">{snils || "-"}</p>}
                </div>
              )}
              {foreignPassport && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Загранпаспорт</div>
                  {foreignPassport && (
                    <p className="csv_details_desc">{foreignPassport || "-"}</p>
                  )}
                </div>
              )}
              {documentNumber && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Документ(все)</div>
                  {documentNumber && (
                    <p className="csv_details_desc">{documentNumber || "-"}</p>
                  )}
                </div>
              )}
              {localPassport && (
                <div className="csv_details_div">
                  <div className="csv_details_label">
                    Паспорт РФ Ceрия / Номер
                  </div>
                  {localPassport && (
                    <p className="csv_details_desc">
                      {localPassport?.series || "-"} {" / "}
                      {localPassport?.number || "-"}
                    </p>
                  )}
                </div>
              )}
              {age && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Возраст От - До</div>
                  {age && (
                    <p className="csv_details_desc">
                      {age?.from || "-"} {" - "} {age?.to || "-"}
                    </p>
                  )}
                </div>
              )}
              {dateOfBirth && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Дата рождения</div>
                  <p className="csv_details_desc">
                    {dateOfBirth?.from?.day || "-"}/
                    {dateOfBirth?.from?.month || "-"}/
                    {dateOfBirth?.from?.year || "-"} -{" "}
                    {dateOfBirth?.to.day || "-"}/{dateOfBirth?.to?.month || "-"}
                    /{dateOfBirth?.to?.year || "-"}
                  </p>
                </div>
              )}
              {job && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Место работы</div>
                  {job && (
                    <p className="csv_details_desc">{job?.workPlace || "-"}</p>
                  )}
                </div>
              )}
              {militaryInformation && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Воинская служба</div>
                  {militaryInformation && (
                    <p className="csv_details_desc">
                      {militaryInformation || "-"}
                    </p>
                  )}
                </div>
              )}
              {vin && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Vin код авто</div>
                  {vin && <p className="csv_details_desc">{vin || "-"}</p>}
                </div>
              )}
              {plateNumber && (
                <div className="csv_details_div">
                  <div className="csv_details_label">Номер машины</div>
                  {plateNumber && (
                    <p className="csv_details_desc">{plateNumber || "-"}</p>
                  )}
                </div>
              )}
              {matchingPercentage && (
                <div className="csv_details_div">
                  <div className="csv_details_label">
                    Процент совпадения (от-до)
                  </div>
                  <p className="csv_details_desc">
                    {matchingPercentage.from || ""} {" - "}
                    {matchingPercentage.to || ""}
                  </p>
                </div>
              )}
            </Card>
          );
        },
      )}
    </div>
  );
};

export default CsvHistoryParams;
