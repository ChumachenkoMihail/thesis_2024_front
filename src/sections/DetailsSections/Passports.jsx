import React, { memo } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "components/app/base/Accordion";
import ExpandCards from "components/app/base/ExpandCards";
import Card from "components/app/base/Card";
import { ReactComponent as Passport } from "assets/images/passport.svg";
import { ReactComponent as ForeignPassport } from "assets/images/foreign_passport.svg";
import { ReactComponent as LocalPassport } from "assets/images/local_passport.svg";
import Title from "components/app/use/Title";

const Passports = ({ data }) => {
  const hasPassportData =
    data?.snils ||
    data?.someDocument ||
    data?.inn ||
    data?.passportIssuedBy ||
    data?.passportNumber ||
    data?.nationality ||
    data?.passport_number;
  const hasPassportAvto = data?.passport || data?.passportAddress;

  return (
    <>
      {(hasPassportData || hasPassportAvto || data?.documents) && (
        <Accordion title="Паспортные данные" Icon={Passport}>
          <div className="accordion_inner">
            <div className="accordion_gap">
              <div className="accordion_content accordion_row">
                {hasPassportData && (
                  <>
                    {Array.isArray(data?.inn) ? (
                      <div className="details_div">
                        <div className="details_label">ИНН</div>
                        <p>
                          {data?.inn.map((item) => {
                            return (
                              <React.Fragment key={uuid()}>
                                {item}
                                {", "}
                              </React.Fragment>
                            );
                          })}
                        </p>
                      </div>
                    ) : (
                      <>
                        {data?.inn && data?.inn !== " " && (
                          <div className="details_div">
                            <div className="details_label">ИНН</div>
                            <p>{data?.inn}</p>
                          </div>
                        )}
                      </>
                    )}
                    {Array.isArray(data?.nationality) ? (
                      <div className="details_div">
                        <div className="details_label">
                          Национальность | Гражданство
                        </div>
                        <p>
                          {data?.nationality.map((item) => {
                            return (
                              <React.Fragment key={uuid()}>
                                {item}
                                {", "}
                              </React.Fragment>
                            );
                          })}
                        </p>
                      </div>
                    ) : (
                      <>
                        {data?.nationality && (
                          <div className="details_div">
                            <div className="details_label">
                              Национальность | Гражданство
                            </div>
                            <p>{data?.nationality}</p>
                          </div>
                        )}
                      </>
                    )}
                    {Array.isArray(data?.passportIssuedBy) ? (
                      <div className="details_div">
                        <div className="details_label">Паспорт выдан</div>
                        <>
                          {data?.passportIssuedBy.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </>
                      </div>
                    ) : (
                      <>
                        {data?.passportIssuedBy &&
                          data?.passportIssuedBy !== "" && (
                            <div className="details_div">
                              <div className="details_label">Паспорт выдан</div>
                              <p>{data?.passportIssuedBy}</p>
                            </div>
                          )}
                      </>
                    )}
                    {Array.isArray(data?.passportNumber) ? (
                      <div className="details_div">
                        <div className="details_label">Номер паспорта</div>
                        <>
                          {data?.passportNumber.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </>
                      </div>
                    ) : (
                      <>
                        {data?.passportNumber &&
                          data?.passportNumber !== "" && (
                            <div className="details_div">
                              <div className="details_label">
                                Номер паспорта
                              </div>
                              <p>{data?.passportNumber}</p>
                            </div>
                          )}
                      </>
                    )}
                    {Array.isArray(data?.passport_number) ? (
                      <div className="details_div">
                        <div className="details_label">Номер паспорта</div>
                        <>
                          {data?.passport_number.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </>
                      </div>
                    ) : (
                      <>
                        {data?.passport_number &&
                          data?.passport_number !== "" && (
                            <div className="details_div">
                              <div className="details_label">
                                Номер паспорта
                              </div>
                              <p>{data?.passport_number}</p>
                            </div>
                          )}
                      </>
                    )}
                    {data?.someDocument && (
                      <div className="details_div">
                        <div className="details_label">Доп. документ</div>
                        {Array.isArray(data.someDocument) ? (
                          <>
                            <p>
                              {data?.someDocument?.map((item) => {
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
                          <>
                            <p>{data?.someDocument}</p>
                          </>
                        )}
                      </div>
                    )}

                    {Array.isArray(data?.snils) ? (
                      <>
                        <div className="details_div">
                          <div className="details_label">№ Соц страхования</div>
                          <p>
                            {data?.snils.map((item) => {
                              return (
                                <React.Fragment key={uuid()}>
                                  {item}
                                  {", "}
                                </React.Fragment>
                              );
                            })}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {data?.snils && data?.snils !== " " && (
                          <div className="details_div">
                            <div className="details_label">
                              № Соц страхования
                            </div>
                            <p>{data?.snils}</p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {hasPassportAvto && (
                  <>
                    {Array.isArray(data?.passport) ? (
                      <div className="details_div">
                        <div className="details_label">Паспорт</div>
                        <>
                          {data?.passport.map((item) => {
                            return (
                              <p key={uuid()}>
                                {item}
                                {", "}
                              </p>
                            );
                          })}
                        </>
                      </div>
                    ) : (
                      <>
                        {data?.passport && data?.passport !== " " && (
                          <div className="details_div">
                            <div className="details_label">Паспорт</div>
                            <p>{data?.passport}</p>
                          </div>
                        )}
                      </>
                    )}

                    {Array.isArray(data?.passportAddress) ? (
                      <div className="details_div">
                        <div className="details_label">Паспорт адрес</div>
                        <>
                          {data?.passportAddress.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </>
                      </div>
                    ) : (
                      <>
                        {data?.passportAddress &&
                          data?.passportAddress !== "" && (
                            <div className="details_div">
                              <div className="details_label">Паспорт адрес</div>
                              <p>{data?.passportAddress}</p>
                            </div>
                          )}
                      </>
                    )}
                  </>
                )}
              </div>

              {data?.documents ? (
                <ExpandCards>
                  <Title style={{ marginBottom: "12px" }} Tag="h3">
                    Документы
                  </Title>
                  <div className="expand_cards_row expand_cards_row-4">
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
                          <Card key={uuid()}>
                            {dcmSerialNo ? (
                              <div className="details_div">
                                <div className="details_label">
                                  Серия \ Номер
                                </div>
                                <p>
                                  {dcmSerialNo || "-"} \ {dcmNumber || "-"}
                                </p>
                              </div>
                            ) : (
                              <div className="details_div">
                                <div className="details_label">Номер</div>
                                <p>{dcmNumber || "-"}</p>
                              </div>
                            )}
                            {dcmType && (
                              <div className="details_div">
                                <div className="details_label">Тип</div>
                                <p>{dcmType || "-"}</p>
                              </div>
                            )}
                            {dcmIssueWhere && (
                              <div className="details_div">
                                <div className="details_label">
                                  Документ выдан
                                </div>
                                <p>{dcmIssueWhere || "-"}</p>
                              </div>
                            )}
                            {dcmDate && (
                              <div className="details_div">
                                <div className="details_label">Дата выдачи</div>
                                <p>{dcmDate || "-"}</p>
                              </div>
                            )}
                            {dcmExpiryDate && (
                              <div className="details_div">
                                <div className="details_label">
                                  Срок действия
                                </div>
                                <p>{dcmExpiryDate || "-"}</p>
                              </div>
                            )}
                          </Card>
                        );
                      },
                    )}
                  </div>
                </ExpandCards>
              ) : null}
            </div>
          </div>
        </Accordion>
      )}
      {data?.localPassport ? (
        <Accordion title="Паспорта РФ" Icon={LocalPassport}>
          <div className="accordion_inner">
            <div className="accordion_list">
              <div key={uuid()} className="accordion_col">
                <Card>
                  <div className="accordion_col_header">
                    <div>
                      <div className="accordion_col_title">
                        Паспорт РФ серия|номер
                      </div>
                      <p>
                        {data?.localPassport?.localPassportSeries || "No data"}{" "}
                        |{" "}
                        {data?.localPassport?.localPassportNumber || "No data"}
                      </p>
                    </div>
                  </div>
                  <div className="accordion_col_body">
                    {data?.localPassport?.issuedBy && (
                      <div className="details_div">
                        <div className="details_label">Выдан</div>
                        <p>{data?.localPassport?.issuedBy || "-"}</p>
                      </div>
                    )}
                    {data?.localPassport?.issuedate ||
                    data?.localPassport?.localPassportDateOfExpiry ? (
                      <div className="details_div">
                        <div className="details_label">Действителен от-до</div>
                        <p>
                          {data?.localPassport?.issuedate} -{" "}
                          {data?.localPassport?.localPassportDateOfExpiry ||
                            "No data"}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Accordion>
      ) : null}

      {data?.foreignPassport ? (
        <Accordion title="Загран паспорта" Icon={ForeignPassport}>
          <div className="accordion_inner">
            <div className="accordion_list">
              <div className="accordion_col">
                <Card>
                  <div className="accordion_col_header">
                    <div>
                      <div className="accordion_col_title">Номер</div>
                      <p>
                        {data?.foreignPassport?.foreignPassportNumber ||
                          "No data"}
                      </p>
                    </div>
                  </div>
                  <div className="accordion_col_body">
                    <div className="details_div">
                      <div className="details_label">Кем выдан</div>
                      <p>{data?.foreignPassport?.department || "No data"}</p>
                    </div>
                    <div className="details_div">
                      <div className="details_label">Действителен от-до</div>
                      <p>
                        {data?.foreignPassport?.dateofissue || "No data"} -{" "}
                        {data?.foreignPassport?.dateOfExpiry || "No data"}
                      </p>
                    </div>
                    <div className="details_div">
                      <div className="details_label">Загран MRZ1</div>
                      <p>{data?.foreignPassport?.mrz1 || "-"}</p>
                    </div>

                    <div className="details_div">
                      <div className="details_label">Загран MRZ2</div>
                      <p>{data?.foreignPassport?.mrz2 || "-"}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Accordion>
      ) : null}

      {data?.localPassportArray ? (
        <Accordion title="Паспорта РФ" Icon={LocalPassport}>
          <div className="accordion_inner">
            <div className="accordion_list">
              {data?.localPassportArray.map(
                ({
                  localPassportSeries,
                  localPassportNumber,
                  issuedBy,
                  issuedate,
                  localPassportDateOfExpiry,
                }) => {
                  return (
                    <div key={uuid()} className="accordion_col">
                      <Card>
                        <div className="accordion_col_header">
                          <div>
                            <div className="accordion_col_title">
                              Cерия/номер
                            </div>
                            <p>
                              {localPassportSeries || "No data"} |{" "}
                              {localPassportNumber || "No data"}
                            </p>
                          </div>
                        </div>
                        <div className="accordion_col_body">
                          {issuedBy && (
                            <div className="details_div">
                              <div className="details_label">Выдан</div>
                              <p>{issuedBy}</p>
                            </div>
                          )}
                          {issuedate || localPassportDateOfExpiry ? (
                            <div className="details_div">
                              <div className="details_label">
                                Действителен от-до
                              </div>
                              <p>
                                {issuedate || "No data"} -{" "}
                                {localPassportDateOfExpiry || "No data"}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </Card>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </Accordion>
      ) : null}

      {data?.foreignPassportArray ? (
        <Accordion title="Загран паспорта" Icon={ForeignPassport}>
          <div className="accordion_inner">
            <div className="accordion_list">
              {data?.foreignPassportArray && (
                <>
                  {data?.foreignPassportArray.map(
                    ({
                      mrz2,
                      dateofissue,
                      mrz1,
                      dateOfExpiry,
                      foreignPassportNumber,
                      department,
                    }) => {
                      return (
                        <div className="accordion_col" key={uuid()}>
                          <Card>
                            <div className="accordion_col_header">
                              <div>
                                <div className="accordion_col_title">
                                  Загран. паспорт номер
                                </div>
                                <p>{foreignPassportNumber || "No data"}</p>
                              </div>
                            </div>
                            <div className="accordion_col_body">
                              {department && (
                                <div className="details_div">
                                  <div className="details_label">Кем выдан</div>
                                  <p>{department}</p>
                                </div>
                              )}
                              <div className="details_div">
                                <div className="details_label">
                                  Действителен от-до
                                </div>
                                <p>
                                  {dateofissue || "No data"}{" "}
                                  {dateOfExpiry ? `- ${dateOfExpiry}` : null}
                                </p>
                              </div>
                              {mrz1 && (
                                <div className="details_div">
                                  <div className="details_label">
                                    Загран MRZ1
                                  </div>
                                  <p>{mrz1}</p>
                                </div>
                              )}

                              {mrz2 && (
                                <div className="details_div">
                                  <div className="details_label">
                                    Загран MRZ2
                                  </div>
                                  <p>{mrz2}</p>
                                </div>
                              )}
                            </div>
                          </Card>
                        </div>
                      );
                    },
                  )}
                </>
              )}
            </div>
          </div>
        </Accordion>
      ) : null}
    </>
  );
};

export default memo(Passports);
