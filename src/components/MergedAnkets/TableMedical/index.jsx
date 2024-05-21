import Button from "components/app/use/Button";
import { ReactComponent as Custom } from "assets/images/custom_anketIco.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import IconTitle from "components/app/use/Title/IconTitle";
import { ReactComponent as Gender } from "assets/images/gender.svg";

const TableMedical = ({ handleCustomModal, data }) => {
  const hasSocialData =
    data?.insuranceNumber ||
    data?.insuranceCompany ||
    data?.passportNumber ||
    data?.passportIssuedBy ||
    data?.actualAddress ||
    data?.sourceName;

  return (
    <div className="accordion_table" style={{ margin: "0 0 10px 0" }}>
      <div className="accordion_table_head">
        <Title Tag="h3">Таблица Медицина</Title>
        <div className="accordion_table_actions">
          <Button
            text="Добавить в кастомную анкету"
            Icon={Custom}
            func={() => handleCustomModal(data)}
          />
        </div>
      </div>

      <div className="accordion_table_body">
        <div className="details_aside_row">
          {data?.gender && (
            <div className="details_div">
              <div className="details_label">Пол</div>
              <div className="details_div details_div-row">
                <IconTitle Icon={Gender} />
                <p>{data?.gender}</p>
              </div>
            </div>
          )}
        </div>

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

      {hasSocialData && (
        <div className="accordion_table_section">
          <Title Tag="h4">Соц. данные</Title>

          <div
            className="accordion_content accordion_row"
            style={{ paddingTop: "16px" }}
          >
            {data?.insuranceNumber && (
              <div className="details_div social_details_div">
                <div className="details_label">Номер страховки</div>
                <p>{data?.insuranceNumber}</p>
              </div>
            )}
            {data?.insuranceCompany && (
              <div className="details_div social_details_div">
                <div className="details_label">Страховая компания</div>
                <p>{data?.insuranceCompany}</p>
              </div>
            )}
            {data?.passportNumber && (
              <div className="details_div social_details_div">
                <div className="details_label">Номер паспорта</div>
                <p>{data?.passportNumber}</p>
              </div>
            )}
            {data?.passportIssuedBy && (
              <div className="details_div social_details_div">
                <div className="details_label">Кем выдан паспорт</div>
                <p>{data?.passportIssuedBy}</p>
              </div>
            )}
            {data?.actualAddress && (
              <div className="details_div social_details_div">
                <div className="details_label">Актуальный адрес</div>
                <p>{data?.actualAddress}</p>
              </div>
            )}
            {data?.sourceName && (
              <div className="details_div social_details_div">
                <div className="details_label">Имя источника</div>
                <p>{data?.sourceName}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMedical;
