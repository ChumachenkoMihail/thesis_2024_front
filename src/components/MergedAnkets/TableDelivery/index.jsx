import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import React from "react";
import moment from "moment";
import { ReactComponent as NoPhoto } from "assets/images/no_photo.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import TagLink from "components/app/use/TagLink";
import Card from "components/app/base/Card";

const TableDelivery = ({ data, handleCustomModal }) => {
  const hasCoordinates = data?.latitude || data?.longitude;
  const showAddress = data?.address || hasCoordinates;
  const hasSocialData =
    data?.ip ||
    data?.login ||
    data?.password ||
    data?.sourceName ||
    data?.facebookId ||
    data?.mailruProfile ||
    data?.webLink ||
    data?.linkedinLink;

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Доставки</Title>
        <div className="accordion_table_actions">
          <Button
            text="Добавить в кастомную анкету"
            Icon={Custom}
            func={() => handleCustomModal(data)}
          />
        </div>
      </div>
      <div className="accordion_table_body">
        {data?.deliveryAvatar && (
          <div className="details_aside_row">
            <div className="photo_view">
              {data?.deliveryAvatar ? (
                <img src={data.deliveryAvatar} alt="" />
              ) : (
                <div className="no_photo_wrapper">
                  <NoPhoto />
                </div>
              )}
            </div>
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

            {data?.dob && (
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
            )}

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

            {data?.someDocument && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4">Доп. документ</Title>
                    <p>{data?.someDocument || "-"}</p>
                  </div>
                </div>
              </Card>
            )}

            {data?.snils && data?.snils !== " " && (
              <Card type="big">
                <div className="details_card_content">
                  <div className="details_card_header">
                    <Title Tag="h4">№ Соц страхования</Title>
                    <p>{data?.snils || "-"}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {showAddress && (
        <Card>
          <div className="details_div">
            <div className="details_label">Адрес</div>
            {data?.address && <p>{data?.address || "-"}</p>}
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
          </div>
        </Card>
      )}

      {hasSocialData && (
        <div className="accordion_table_section">
          <Title Tag="h4">Соц. данные</Title>

          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.ip && (
              <div className="details_div social_details_div">
                <div className="details_label">IP aдрес</div>
                <p>{data?.ip}</p>
              </div>
            )}
            {data?.login && (
              <div className="details_div social_details_div">
                <div className="details_label">Логин</div>
                <p>{data?.login}</p>
              </div>
            )}
            {data?.password && (
              <div className="details_div social_details_div">
                <div className="details_label">Пароль</div>
                <p>{data?.password}</p>
              </div>
            )}
            {data?.sourceName && (
              <div className="details_div social_details_div">
                <div className="details_label">Имя источника</div>
                <p>{data?.sourceName}</p>
              </div>
            )}
            {data?.facebookId && (
              <div className="details_div social_details_div">
                <div className="details_label">Профиль Facebook </div>
                <p>
                  <a
                    href={`https://www.facebook.com/${data?.facebookId}`}
                    target="_blank"
                  >
                    {data?.facebookId}
                  </a>
                </p>
              </div>
            )}
            {data?.mailruProfile && (
              <div className="details_div social_details_div">
                <div className="details_label">Профиль Mail.ru</div>
                <p>
                  {" "}
                  <TagLink href={data?.mailruProfile} target="_blank">
                    {data?.mailruProfile}
                  </TagLink>
                </p>
              </div>
            )}
            {data?.webLink && (
              <div className="details_div social_details_div">
                <div className="details_label">Веб ссылка</div>
                <p>
                  <TagLink href={data?.webLink} target="_blank">
                    {data?.webLink}
                  </TagLink>
                </p>
              </div>
            )}
            {data?.linkedinLink && (
              <div className="details_div social_details_div">
                <div className="details_label">Профиль LinkedIn</div>
                <p>
                  <a
                    href={`https://www.linkedin.com/${data?.linkedinLink}`}
                    target="_blank"
                  >
                    {data?.linkedinLink}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableDelivery;
