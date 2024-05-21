import React, { memo } from "react";
import Accordion from "components/app/base/Accordion";
import Card from "components/app/base/Card";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import { ReactComponent as Location } from "assets/images/location.svg";

const Addresses = ({ data }) => {
  const hasAddress =
    data?.addressRegistrationDateArray ||
    data?.addressInfo ||
    data?.addressArray ||
    data?.actualAddress ||
    data?.latitude ||
    data?.longitude ||
    data?.address ||
    data?.country ||
    data?.addressRegistrationDate ||
    data?.addressString ||
    data?.placeOfBirth ||
    data?.region;

  const hasCoordinates = data?.latitude || data?.longitude;

  return (
    <>
      {hasAddress && (
        <>
          <Accordion title="Адреса" Icon={Location}>
            <div className="accordion_inner">
              <Card>
                <div className="accordion_content accordion_row">
                  {(data?.addressString ||
                    data?.address ||
                    data?.addressInfo ||
                    data?.actualAddress) && (
                    <div className="details_div">
                      <div className="details_label">Адрес</div>
                      {data?.addressString && (
                        <div>
                          {Array.isArray(data?.addressString) ? (
                            <>
                              {data?.addressString.map((item) => {
                                return <p key={uuid()}>{item}</p>;
                              })}
                            </>
                          ) : (
                            <p>{data?.addressString}</p>
                          )}
                        </div>
                      )}
                      {data?.actualAddress && (
                        <div>
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
                      {data?.address && (
                        <div>
                          {Array.isArray(data?.address) ? (
                            <>
                              {data?.address?.map((item) => {
                                return <p key={uuid()}>{item}</p>;
                              })}
                            </>
                          ) : (
                            <p>{data?.address}</p>
                          )}
                        </div>
                      )}
                      {data?.addressInfo && (
                        <div>
                          <p>
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
                    </div>
                  )}
                  {data?.addressRegistrationDate && (
                    <div className="details_div">
                      <div className="details_label">Дата регистрации:</div>
                      <p>
                        {moment(data?.addressRegistrationDate).format(
                          "YYYY-MM-DD",
                        )}
                      </p>
                    </div>
                  )}
                  {data?.country && (
                    <div className="details_div">
                      <div className="details_label">Страна</div>
                      {Array.isArray(data?.country) ? (
                        <>
                          {data?.country.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </>
                      ) : (
                        <p>{data?.country}</p>
                      )}
                    </div>
                  )}
                  {data?.city && (
                    <div className="details_div">
                      <div className="details_label">Город</div>
                      {Array.isArray(data?.city) ? (
                        <>
                          {data?.city.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </>
                      ) : (
                        <p>{data?.city}</p>
                      )}
                    </div>
                  )}
                  {hasCoordinates && (
                    <div className="details_div">
                      <div className="details_label">Широта/Долгота</div>
                      <p>
                        {data.latitude || ""}
                        {" / "}
                        {data.longitude || ""}
                      </p>
                    </div>
                  )}
                  {data?.placeOfBirth && (
                    <>
                      {Array.isArray(data?.placeOfBirth) ? (
                        <div className="details_div">
                          <div className="details_label">Место рождения</div>
                          {data?.placeOfBirth?.map((item) => {
                            return (
                              <p key={uuid()}>
                                {item}
                                {", "}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <>
                          {data?.placeOfBirth && data?.placeOfBirth !== " " && (
                            <div className="details_div">
                              <div className="details_label">
                                Место рождения
                              </div>
                              <p>{data?.placeOfBirth}</p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {data?.region && (
                    <>
                      {Array.isArray(data?.region) ? (
                        <div className="details_div">
                          <div className="details_label">Регион</div>
                          {data?.region?.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      ) : (
                        <>
                          {data?.region && data?.region !== " " && (
                            <div className="details_div">
                              <div className="details_label">Регион</div>
                              <p>{data?.region}</p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </Card>

              {data?.addressArray || data.addressRegistrationDateArray ? (
                <div className="accordion_content accordion_content_nocard accordion_row">
                  {data?.addressArray && (
                    <div className="details_div">
                      <div className="details_label">
                        Адреса из других источников
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
                            <p key={uuid()}>
                              {country} {region && <>{region}.</>}{" "}
                              {province && <>{province}.</>}{" "}
                              {locality && <>{locality}.</>} {town} {address}
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
                  {data.addressRegistrationDateArray && (
                    <div className="details_div">
                      <div className="details_label">
                        Дата регистрации из других источников:
                      </div>
                      <p>
                        {data.addressRegistrationDateArray.map((item) => {
                          return (
                            <React.Fragment key={uuid()}>
                              {moment(item).format("YYYY-MM-DD")},{" "}
                            </React.Fragment>
                          );
                        })}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </Accordion>
        </>
      )}
    </>
  );
};

export default memo(Addresses);
