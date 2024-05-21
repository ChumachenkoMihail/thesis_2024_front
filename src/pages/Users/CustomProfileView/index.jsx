import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import Wrapper from "layouts/Wrapper";
import Button from "components/app/use/Button";
import Title from "components/app/use/Title";
import Card from "components/app/base/Card";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import Modal from "components/app/base/Modal";
import ModalSlider from "components/app/base/ModalSlider";
import Loader from "components/app/use/Loader";
import IconTitle from "components/app/use/Title/IconTitle";
import Accordion from "components/app/base/Accordion";
import ResultCounter from "components/app/use/ResultCounter";
import TagLink from "components/app/use/TagLink";
import { ReactComponent as Tutu } from "assets/images/sources/tutu.svg";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import { ReactComponent as AlfaIcon } from "assets/images/sources/alfa.svg";
import { ReactComponent as Gender } from "assets/images/gender.svg";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as ArrowCurved } from "assets/images/arrow_back_curved.svg";
import { ReactComponent as Edit } from "assets/images/pencil_edit.svg";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as UserPhoto } from "assets/images/user_photo.svg";
import { ReactComponent as NoPhoto } from "assets/images/no_photo.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as Location } from "assets/images/location.svg";
import { ReactComponent as Cdek } from "assets/images/sources/cdek.svg";
import { ReactComponent as Passport } from "assets/images/passport.svg";
import { ReactComponent as Spektr } from "assets/images/spektr.svg";
import { ReactComponent as Job } from "assets/images/job.svg";
import { ReactComponent as Military } from "assets/images/military.svg";
import { ReactComponent as Key } from "assets/images/key.svg";
import { ReactComponent as Car } from "assets/images/car.svg";
import { ReactComponent as Social } from "assets/images/social.svg";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";
import { ReactComponent as AngleUp } from "assets/images/angle_up.svg";
import { ReactComponent as Sirena } from "assets/images/sources/Database_Avia.svg";
import { ReactComponent as SirenaTrain } from "assets/images/sources/sirena_train.svg";
import { ReactComponent as SirenaInsurance } from "assets/images/sources/insurance.svg";
import { ReactComponent as EgronImage } from "assets/images/sources/egron.svg";
import { ReactComponent as MTS } from "assets/images/sources/mts.svg";

import { getAnketById } from "store/thunks/customProfileThunks";
import { EgronColumns } from "libs/generatedСolumns/egron";
import TableFront from "components/app/base/Table/TableFront";
import "pages/Users/SearchDetails/index.scss";

const CustomProfileView = () => {
  const { id } = useParams();
  const cardsCdekId = useId();
  const cardsSpektrId = useId();
  const navigate = useNavigate();
  const autoId = useId();
  const cardsAutoInfoId = useId();
  const cardsCarOwnersId = useId();
  const cardsCarDriversId = useId();
  const cardsSirenaPassanger = useId();
  const cardsSirenaTicketTrain = useId();
  const cardsSirenaInsuranceInfo = useId();
  const cardKidsId = useId();
  const cardTutuPassengersId = useId();
  const cardTutuReserveUsersId = useId();

  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const { customAnketData, customAnketDetails, loading } = useSelector(
    (state) => state.custom,
  );
  const [visibleAll, setVisibleAll] = useState(false);
  const [visiblePhotoData, setVesiblePhotoData] = useState(null);
  const [visibleOwners, setVisibleOwners] = useState([]);

  const handleVisibleALl = (data) => {
    setVesiblePhotoData(data);
    setVisibleAll(!visibleAll);
  };

  const handleVisibleOwnerById = (id) => {
    setVisibleOwners((prevOpenCards) => ({
      ...prevOpenCards,
      [id]: !prevOpenCards[id],
    }));
  };

  useEffect(() => {
    dispatch(getAnketById(id));
  }, [dispatch, id]);

  const hasPassportFromAvto =
    customAnketData?.passportAddress || customAnketData?.passport;
  const hasPassportData =
    customAnketData?.foreignPassport ||
    customAnketData?.localPassport ||
    customAnketData?.inn ||
    customAnketData?.passportIssuedBy ||
    customAnketData?.passportNumber ||
    customAnketData?.nationality ||
    customAnketData?.snils;

  const hasPassPortMerge =
    customAnketData?.localPassportArray ||
    customAnketData?.foreignPassportArray;
  const hasAddress =
    customAnketData?.userAddress ||
    customAnketData?.addressArray ||
    customAnketData?.addressRegistrationDate ||
    customAnketData?.address ||
    customAnketData?.addressRegistrationDateArray ||
    customAnketData?.placeOfBirth;
  const hasRegistrationDatesAndCoordinates =
    customAnketData?.latitude ||
    customAnketData?.coordinatesArray ||
    customAnketData?.longitude ||
    customAnketData?.addressRegistrationDateArray;
  const hasSocial =
    customAnketData?.ip ||
    customAnketData?.login ||
    customAnketData?.imsi ||
    customAnketData?.password ||
    customAnketData?.sourceName ||
    customAnketData?.facebookId ||
    customAnketData?.vkId ||
    customAnketData?.getContactTags ||
    customAnketData?.relatedPhones ||
    customAnketData?.serialSim ||
    customAnketData?.numBusterTags ||
    customAnketData?.mailruProfile ||
    customAnketData?.insuranceCompany ||
    customAnketData?.insuranceNumber ||
    customAnketData?.webLink ||
    customAnketData?.someDocument ||
    customAnketData?.linkedinLink;
  const hasSpektrPersonInfo =
    customAnketData?.yearOfCreation ||
    customAnketData?.vin ||
    customAnketData?.mark ||
    customAnketData?.plateNumber;
  const hasSecretData =
    customAnketData?.departureRestrictions ||
    customAnketData?.secretAccess ||
    customAnketData?.topSecretAccessInfo ||
    customAnketData?.diplWorkPlace ||
    customAnketData?.diplSecretAccess ||
    customAnketData?.diplCountry ||
    customAnketData?.diplTopSecretInfo ||
    customAnketData?.diplTopSecretDescription;

  return (
    <>
      {loading && <Loader />}
      {customAnketData && (
        <>
          {visibleAll && (
            <Modal
              width="1000"
              closeModal={() => handleVisibleALl(null)}
              title="Все фото"
            >
              <ModalSlider
                allPhotos={visiblePhotoData?.photos}
                isDarkTheme={isDarkTheme}
              />
            </Modal>
          )}
          <Wrapper
            className={`custom_profile_details kermit_details ${
              isDarkTheme ? "" : "details_light"
            }`}
          >
            <div className="details_container">
              <div className="wrapper_head">
                <div className="head_details">
                  <Button
                    text=" "
                    Icon={ArrowCurved}
                    func={() => navigate(-1)}
                  />
                  <div className="head_title custom_head_title">
                    <Title Tag="h3">{customAnketDetails?.name}</Title>
                    <div className="custom_edit_date">
                      <ResultCounter
                        text="Дата создания: "
                        count={moment(customAnketDetails?.createdAt).format(
                          "YYYY-MM-DD",
                        )}
                      />
                      <ResultCounter
                        text="Дата изменения: "
                        count={moment(customAnketDetails?.updatedAt).format(
                          "YYYY-MM-DD",
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="head_actions">
                  <NavLink
                    to={`/custom-profile/${id}/edit`}
                    className="kermit_btn primary"
                  >
                    <span className="btn_text">
                      <Edit />
                      Редактировать анкету
                    </span>
                  </NavLink>
                </div>
              </div>

              <div className="details_anket">
                {customAnketData && (
                  <>
                    <div className="details_aside">
                      {customAnketData?.photos && (
                        <div className="details_aside_row">
                          <div className="photo_view">
                            {customAnketData?.avatar ? (
                              <img
                                src={`data:image/png;base64, ${customAnketData?.avatar} `}
                                alt=""
                              />
                            ) : (
                              <div className="no_photo_wrapper">
                                <NoPhoto />
                              </div>
                            )}
                          </div>
                          {customAnketData?.photos?.length ? (
                            <Button
                              text={`Все фото (${
                                customAnketData?.photos.filter(
                                  (item) => item !== "",
                                )?.length
                              })`}
                              className="view_all_photo"
                              func={() =>
                                handleVisibleALl({
                                  photos: customAnketData?.photos,
                                  name: "photos",
                                })
                              }
                              Icon={UserPhoto}
                            />
                          ) : null}
                        </div>
                      )}
                      {customAnketData?.deliveryAvatar && (
                        <div className="details_aside_row">
                          <div className="photo_view">
                            {customAnketData?.deliveryAvatar ? (
                              <img
                                src={customAnketData?.deliveryAvatar[0]}
                                alt=""
                              />
                            ) : (
                              <div className="no_photo_wrapper">
                                <NoPhoto />
                              </div>
                            )}
                          </div>
                          {customAnketData?.deliveryAvatar?.length > 1 ? (
                            <Button
                              text={`Доставка (${
                                customAnketData?.deliveryAvatar.filter(
                                  (item) => item !== "",
                                )?.length
                              })`}
                              className="view_all_photo"
                              func={() =>
                                handleVisibleALl({
                                  photos: customAnketData?.deliveryAvatar,
                                  name: "deliveryAvatar",
                                })
                              }
                              Icon={UserPhoto}
                            />
                          ) : null}
                        </div>
                      )}

                      <div className="detail_aside_content">
                        <div className="details_aside_row">
                          {customAnketData?.gender && (
                            <div className="details_div">
                              <div className="details_label">Пол</div>
                              <div className="details_div details_div-row">
                                <IconTitle Icon={Gender} />
                                <p style={{ width: "calc(100% - 56px)" }}>
                                  {customAnketData?.gender?.map((item) => {
                                    return (
                                      <React.Fragment key={uuid()}>
                                        {item}
                                        {", "}
                                      </React.Fragment>
                                    );
                                  })}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="details_main">
                      <div className="details_grid details_grid_big">
                        {(customAnketData?.userName ||
                          customAnketData?.potentialNames ||
                          customAnketData?.name ||
                          customAnketData.fio) && (
                          <Card type="big">
                            <div className="details_card_content">
                              {customAnketData?.userName ? (
                                <div className="details_card_header">
                                  <Title
                                    Tag="h3"
                                    Icon={Profile}
                                    IconWidth="20px"
                                    IconHeight="20px"
                                  >
                                    ФИО
                                  </Title>
                                  {customAnketData?.userName?.map((item) => (
                                    <p key={uuid()}>{item}</p>
                                  ))}
                                </div>
                              ) : null}
                              {(customAnketData?.potentialNames ||
                                customAnketData?.name ||
                                customAnketData.fio) && (
                                <div className="details_card_body">
                                  {customAnketData?.potentialNames && (
                                    <>
                                      <div className="details_card_label">
                                        ФИО из других баз
                                      </div>
                                      {customAnketData?.potentialNames?.map(
                                        (item) => (
                                          <p key={uuid()}>{item}</p>
                                        ),
                                      )}
                                    </>
                                  )}
                                  {customAnketData?.name && (
                                    <>
                                      <div className="details_card_label">
                                        Имя/Название
                                      </div>
                                      {customAnketData?.name?.map((item) => (
                                        <p key={uuid()}>{item}</p>
                                      ))}
                                    </>
                                  )}
                                  {customAnketData?.fio && (
                                    <>
                                      <div className="details_card_label">
                                        Имя/Название
                                      </div>
                                      {customAnketData?.fio?.map((item) => (
                                        <p key={uuid()}>{item}</p>
                                      ))}
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </Card>
                        )}

                        {customAnketData?.dob && (
                          <Card type="big">
                            <div className="details_card_content details_card_nobody">
                              <div className="details_card_header">
                                <Title
                                  Tag="h3"
                                  Icon={Calendar}
                                  IconWidth="20px"
                                  IconHeight="20px"
                                >
                                  Дата рождения
                                </Title>
                              </div>
                              {customAnketData?.dob?.map((item) => {
                                return (
                                  <p key={uuid()}>
                                    {item} - {moment().diff(`${item}`, "years")}{" "}
                                    лет
                                  </p>
                                );
                              })}
                            </div>
                          </Card>
                        )}
                      </div>

                      <div className="details_grid details_grid_big">
                        {customAnketData?.email && (
                          <Card type="big">
                            <div className="details_card_content details_card_nobody">
                              <div className="details_card_header">
                                <Title
                                  Tag="h3"
                                  Icon={Mail}
                                  IconWidth="20px"
                                  IconHeight="20px"
                                >
                                  Электронная почта
                                </Title>
                              </div>
                              {customAnketData?.email?.map((item) => (
                                <p key={uuid()}>{item}</p>
                              ))}
                            </div>
                          </Card>
                        )}

                        {customAnketData?.phone && (
                          <Card type="big">
                            <div className="details_card_content details_card_nobody card_phone">
                              <div className="details_card_header">
                                <Title
                                  Tag="h3"
                                  Icon={Phone}
                                  IconWidth="20px"
                                  IconHeight="20px"
                                >
                                  Номер телефона
                                </Title>
                              </div>
                              {customAnketData?.phone?.map((item) => {
                                return (
                                  <p key={uuid()} className="phone_action">
                                    {item}
                                  </p>
                                );
                              })}
                            </div>
                          </Card>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {customAnketData && (
              <div className="details_accordions">
                {hasAddress && (
                  <Accordion title="Адреса" Icon={Location}>
                    <div className="accordion_inner">
                      {customAnketData.userAddress ||
                      customAnketData?.addressRegistrationDate ||
                      customAnketData?.placeOfBirth ? (
                        <Card>
                          <div className="accordion_content accordion_row">
                            {customAnketData.userAddress && (
                              <div className="details_div">
                                <div className="details_label">Адрес</div>

                                {customAnketData?.userAddress?.map((item) => {
                                  return (
                                    <>
                                      <p key={uuid()}>{item}</p>
                                    </>
                                  );
                                })}
                              </div>
                            )}
                            {customAnketData?.addressRegistrationDate && (
                              <div className="details_div">
                                <div className="details_label">
                                  Дата регистрации:
                                </div>
                                {customAnketData?.addressRegistrationDate?.map(
                                  (item) => {
                                    return (
                                      <p key={uuid()}>
                                        {moment(item).format("YYYY-MM-DD")}
                                      </p>
                                    );
                                  },
                                )}
                              </div>
                            )}
                            {customAnketData?.placeOfBirth && (
                              <div className="details_div">
                                <div className="details_label">
                                  Место рождения
                                </div>
                                {customAnketData?.placeOfBirth?.map((item) => {
                                  return <p key={uuid()}>{item}</p>;
                                })}
                              </div>
                            )}
                          </div>
                        </Card>
                      ) : null}

                      {(customAnketData?.address ||
                        customAnketData.addressArray ||
                        hasRegistrationDatesAndCoordinates) && (
                        <div className="accordion_content accordion_content_nocard accordion_row">
                          {customAnketData?.address && (
                            <div className="details_div">
                              <div className="details_label">Адреса</div>
                              {customAnketData?.address?.map((item) => {
                                return <p key={uuid()}>{item}</p>;
                              })}
                            </div>
                          )}
                          {customAnketData.addressArray && (
                            <div className="details_div">
                              <div className="details_label">
                                Адреса с других источников
                              </div>
                              {customAnketData?.addressArray?.map((item) => {
                                return (
                                  <>
                                    <p key={uuid()}>{item}.</p>
                                  </>
                                );
                              })}
                            </div>
                          )}
                          {hasRegistrationDatesAndCoordinates && (
                            <>
                              {customAnketData?.addressRegistrationDateArray && (
                                <div className="details_div">
                                  <div className="details_label">
                                    Дата регистрации с других источников:
                                  </div>
                                  <p>
                                    {customAnketData?.addressRegistrationDateArray?.map(
                                      (item) => {
                                        return (
                                          <React.Fragment key={uuid()}>
                                            {moment(item).format("YYYY-MM-DD")}{" "}
                                            ,{" "}
                                          </React.Fragment>
                                        );
                                      },
                                    )}
                                  </p>
                                </div>
                              )}
                              {customAnketData?.latitude && (
                                <div className="details_div">
                                  <div className="details_label">Широта</div>
                                  <p>
                                    {customAnketData?.latitude?.map((item) => {
                                      return (
                                        <React.Fragment key={uuid()}>
                                          [ {item} ]{" "}
                                        </React.Fragment>
                                      );
                                    })}
                                  </p>
                                </div>
                              )}
                              {customAnketData?.longitude && (
                                <div className="details_div">
                                  <div className="details_label">Долгота</div>
                                  <p>
                                    {customAnketData?.longitude?.map((item) => {
                                      return (
                                        <React.Fragment key={uuid()}>
                                          [ {item} ]{" "}
                                        </React.Fragment>
                                      );
                                    })}
                                  </p>
                                </div>
                              )}
                              {customAnketData?.coordinatesArray && (
                                <>
                                  {customAnketData?.coordinatesArray?.map(
                                    (item, index) => {
                                      return (
                                        <div className="details_div">
                                          <div className="details_label">
                                            Координаты с других анкет
                                            Широта/Долгота
                                          </div>
                                          <p>
                                            {item.latitude || "No data"} /{" "}
                                            {item.longitude || "No data"}
                                          </p>
                                        </div>
                                      );
                                    },
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </Accordion>
                )}

                {hasSocial && (
                  <Accordion title="Соц. данные" Icon={Social}>
                    <div className="accordion_content accordion_row">
                      {customAnketData?.sourceName && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Имя источника</div>
                          <p>
                            {customAnketData?.sourceName.map((item) => {
                              return (
                                <React.Fragment key={uuid()}>
                                  {item}
                                  {", "}
                                </React.Fragment>
                              );
                            })}
                          </p>
                        </div>
                      )}
                      {customAnketData?.relatedPhones && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Похожие телефоны</div>
                          {customAnketData?.relatedPhones.map((item) => {
                            return (
                              <p key={uuid()}>
                                {item}
                                {", "}
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {customAnketData?.imsi && (
                        <div className="details_div social_details_div">
                          <div className="details_label">
                            Идентификационный номер SIM-карты
                          </div>
                          {customAnketData?.imsi.map((item) => {
                            return (
                              <p key={uuid()}>
                                {item}
                                {", "}
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {customAnketData?.serialSim && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Серия SIM-карты</div>
                          {customAnketData?.serialSim.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.ip && (
                        <div className="details_div social_details_div">
                          <div className="details_label">IP адрес</div>
                          {customAnketData?.ip.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.linkedinLink && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Профиль LinkedIn</div>
                          {customAnketData?.linkedinLink.map((item) => {
                            return (
                              <p key={uuid()}>
                                <TagLink
                                  href={`https://www.linkedin.com/${item}`}
                                  target="_blank"
                                >
                                  {item}
                                </TagLink>
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {customAnketData?.webLink && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Веб ссылка</div>
                          {customAnketData?.webLink.map((item) => {
                            return (
                              <p key={uuid()}>
                                <TagLink href={item} target="_blank">
                                  {item}
                                </TagLink>
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {customAnketData?.someDocument && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Доп. документ</div>
                          {customAnketData?.someDocument.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.login && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Логин</div>
                          {customAnketData?.login.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.getContactTags && (
                        <div className="details_div social_details_div">
                          <div className="details_label">GetContact Теги</div>
                          {customAnketData?.getContactTags.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.numBusterTags && (
                        <div className="details_div social_details_div">
                          <div className="details_label">NumBuster Теги</div>
                          {customAnketData?.numBusterTags.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.password && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Пароль</div>
                          {customAnketData?.password.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.facebookId && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Профиль Facebook</div>
                          {customAnketData?.facebookId.map((item) => {
                            return (
                              <p key={uuid()}>
                                <TagLink
                                  href={`https://www.facebook.com/${item}`}
                                  target="_blank"
                                >
                                  {item}
                                </TagLink>
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {customAnketData?.vkId && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Профиль Vkontakte</div>
                          {customAnketData?.vkId.map((item) => {
                            return (
                              <p key={uuid()}>
                                <TagLink
                                  href={`https://vk.com/id${item}`}
                                  target="_blank"
                                >
                                  {item}
                                </TagLink>
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {customAnketData?.mailruProfile && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Профиль Mail.ru</div>
                          {customAnketData?.mailruProfile?.map((item) => {
                            return (
                              <p key={uuid()}>
                                <TagLink href={item} target="_blank">
                                  {item}
                                </TagLink>
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {customAnketData?.insuranceCompany && (
                        <div className="details_div social_details_div">
                          <div className="details_label">
                            Страховая компания
                          </div>
                          {customAnketData?.insuranceCompany?.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.insuranceNumber && (
                        <div className="details_div social_details_div">
                          <div className="details_label">Номер страховки</div>
                          {customAnketData?.insuranceNumber?.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                    </div>
                  </Accordion>
                )}

                {(hasPassportData ||
                  hasPassportFromAvto ||
                  customAnketData?.documents) && (
                  <Accordion title="Паспортные данные" Icon={Passport}>
                    <div className="accordion_inner">
                      <div className="accordion_gap">
                        <div className="accordion_content accordion_row">
                          {customAnketData?.inn &&
                            customAnketData?.inn !== " " && (
                              <div className="details_div">
                                <div className="details_label">ИНН</div>
                                {customAnketData?.inn?.map((item) => (
                                  <p key={uuid()}>{item}</p>
                                ))}
                              </div>
                            )}
                          {customAnketData?.nationality && (
                            <div className="details_div">
                              <div className="details_label">
                                Национальность
                              </div>
                              {customAnketData?.nationality?.map((item) => (
                                <p key={uuid()}>{item}</p>
                              ))}
                            </div>
                          )}
                          {customAnketData?.snils &&
                            customAnketData?.snils !== " " && (
                              <div className="details_div">
                                <div className="details_label">
                                  № Соц страхования
                                </div>
                                {customAnketData?.snils?.map((item) => (
                                  <p key={uuid()}>{item}</p>
                                ))}
                              </div>
                            )}
                          {customAnketData?.passportIssuedBy && (
                            <div className="details_div">
                              <div className="details_label">
                                Кем выдан паспорт
                              </div>
                              {customAnketData?.passportIssuedBy?.map(
                                (item) => (
                                  <p key={uuid()}>{item}</p>
                                ),
                              )}
                            </div>
                          )}
                          {customAnketData?.passportNumber && (
                            <div className="details_div">
                              <div className="details_label">
                                Номер паспорта
                              </div>
                              {customAnketData?.passportNumber?.map((item) => (
                                <p key={uuid()}>{item}</p>
                              ))}
                            </div>
                          )}
                          {customAnketData?.passportAddress && (
                            <div className="details_div">
                              <div className="details_label">Паспорт адрес</div>
                              {customAnketData?.passportAddress?.map((item) => (
                                <p key={uuid()}>{item}</p>
                              ))}
                            </div>
                          )}
                          {customAnketData?.passport && (
                            <div className="details_div">
                              <div className="details_label">Паспорт</div>
                              {customAnketData?.passport?.map((item) => (
                                <p key={uuid()}>{item}</p>
                              ))}
                            </div>
                          )}
                        </div>

                        {customAnketData?.documents ? (
                          <ExpandCards>
                            <Title style={{ marginBottom: "12px" }} Tag="h3">
                              Документы
                            </Title>
                            <div className="expand_cards_row expand_cards_row-4">
                              {customAnketData?.documents?.map(
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
                                            {dcmSerialNo || "-"} \{" "}
                                            {dcmNumber || "-"}
                                          </p>
                                        </div>
                                      ) : (
                                        <div className="details_div">
                                          <div className="details_label">
                                            Номер
                                          </div>
                                          <p>{dcmNumber || "-"}</p>
                                        </div>
                                      )}
                                      {dcmType && (
                                        <div className="details_div">
                                          <div className="details_label">
                                            Тип
                                          </div>
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
                                          <div className="details_label">
                                            Дата выдачи
                                          </div>
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

                {customAnketData?.workPlace && (
                  <Accordion title="Место работы (база авто)" Icon={Job}>
                    <div className="accordion_content accordion_column">
                      {customAnketData?.workPlace && (
                        <div className="details_div">
                          <div className="details_label">Место работы</div>
                          {customAnketData?.workPlace?.map((item) => (
                            <p key={uuid()}>{item}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </Accordion>
                )}

                {hasSecretData && (
                  <Accordion title="Ограничения / Привелегии" Icon={Key}>
                    <div className="accordion_content accordion_column">
                      {customAnketData?.departureRestrictions && (
                        <div className="details_div">
                          <div className="details_label">
                            Ограничение на выезд
                          </div>
                          {customAnketData?.departureRestrictions.map(
                            (item) => {
                              return <p key={uuid()}>{item}</p>;
                            },
                          )}
                        </div>
                      )}
                      {customAnketData?.secretAccess && (
                        <div className="details_div">
                          <div className="details_label">Секретный доступ</div>
                          {customAnketData?.secretAccess.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.topSecretAccessInfo && (
                        <div className="details_div">
                          <div className="details_label">
                            Доступ к гос.тайне
                          </div>
                          {customAnketData?.topSecretAccessInfo.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.diplWorkPlace && (
                        <div className="details_div">
                          <div className="details_label">Дип. место работы</div>
                          {customAnketData?.diplWorkPlace.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.diplSecretAccess && (
                        <div className="details_div">
                          <div className="details_label">
                            Доступ к дип. тайне
                          </div>
                          {customAnketData?.diplSecretAccess.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.diplCountry && (
                        <div className="details_div">
                          <div className="details_label">
                            Страна дип. пребывания
                          </div>
                          {customAnketData?.diplCountry.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.diplTopSecretInfo && (
                        <div className="details_div">
                          <div className="details_label">
                            Доступ к с.с информации
                          </div>
                          {customAnketData?.diplTopSecretInfo.map((item) => {
                            return <p key={uuid()}>{item}</p>;
                          })}
                        </div>
                      )}
                      {customAnketData?.diplTopSecretDescription && (
                        <div className="details_div">
                          <div className="details_label">
                            Описание к дип. тайне
                          </div>
                          {customAnketData?.diplTopSecretDescription.map(
                            (item) => {
                              return <p key={uuid()}>{item}</p>;
                            },
                          )}
                        </div>
                      )}
                    </div>
                  </Accordion>
                )}
                {customAnketData?.accounts?.length ? (
                  <Accordion title="Данные почта банк" Icon={Social}>
                    <div className="accordion_inner">
                      <div className="accordion_list">
                        {customAnketData?.accounts?.map(
                          ({ amountCur, name, amountRub }) => {
                            return (
                              <div className="accordion_col">
                                <Card>
                                  <div className="accordion_col_header">
                                    <div>
                                      <Title Tag="h4">{name || "-"}</Title>
                                    </div>
                                  </div>
                                  <div className="accordion_col_body">
                                    <div className="details_div">
                                      <div className="details_label">
                                        Состояние счета ₽ / валюта
                                      </div>
                                      <p>
                                        {amountRub || "-"} / {amountCur || "-"}{" "}
                                      </p>
                                    </div>
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
                {hasPassPortMerge && (
                  <Accordion title="Паспорта" Icon={Passport}>
                    <div className="accordion_inner">
                      <div className="accordion_list">
                        {customAnketData?.localPassportArray && (
                          <>
                            {customAnketData?.localPassportArray?.map(
                              (item, index) => {
                                return (
                                  <div className="accordion_col">
                                    <Card>
                                      <div className="accordion_col_header">
                                        <div>
                                          <Title Tag="h4">Паспорт РФ</Title>
                                        </div>
                                      </div>
                                      <div className="accordion_col_body">
                                        <div className="details_div">
                                          <div className="details_label">
                                            Паспорт РФ серия/номер
                                          </div>
                                          <p>
                                            {item.localPassportSeries ||
                                              "No data"}{" "}
                                            |{" "}
                                            {item.localPassportNumber ||
                                              "No data"}
                                          </p>
                                        </div>
                                        <div className="details_div">
                                          <div className="details_label">
                                            Выдан
                                          </div>
                                          <p>{item?.issuedBy || "-"}</p>
                                        </div>
                                        <div className="details_div">
                                          <div className="details_label">
                                            Действителен от-до
                                          </div>
                                          <p>
                                            {item?.issuedate || "No data"} -{" "}
                                            {item?.localPassportDateOfExpiry ||
                                              "No data"}
                                          </p>
                                        </div>
                                      </div>
                                    </Card>
                                  </div>
                                );
                              },
                            )}
                          </>
                        )}

                        {customAnketData?.foreignPassportArray && (
                          <>
                            {customAnketData?.foreignPassportArray?.map(
                              (item, index) => {
                                return (
                                  <div className="accordion_col">
                                    <Card>
                                      <div className="accordion_col_header">
                                        <div>
                                          <Title Tag="h4">
                                            Загран. паспорт
                                          </Title>
                                        </div>
                                      </div>
                                      <div className="accordion_col_body">
                                        <div className="details_div">
                                          <div className="details_label">
                                            Загран. паспорт номер
                                          </div>
                                          <p>
                                            {item?.foreignPassportNumber || "-"}
                                          </p>
                                        </div>
                                        <div className="details_div">
                                          <div className="details_label">
                                            Кем выдан
                                          </div>
                                          <p>{item?.department || "-"}</p>
                                        </div>
                                        <div className="details_div">
                                          <div className="details_label">
                                            Действителен от-до
                                          </div>
                                          <p>
                                            {item.dateofissue || "No data"} -{" "}
                                            {item.dateOfExpiry || "No data"}
                                          </p>
                                        </div>
                                        <div className="details_div">
                                          <div className="details_label">
                                            Загран MRZ1
                                          </div>
                                          <p>{item.mrz1 || "-"}</p>
                                        </div>
                                        <div className="details_div">
                                          <div className="details_label">
                                            Загран MRZ2
                                          </div>
                                          <p>{item.mrz2 || "-"}</p>
                                        </div>
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
                )}

                {customAnketData?.jobHistory && (
                  <Accordion title="Работа" Icon={Job}>
                    <div className="accordion_inner">
                      <div className="accordion_content accordion_column">
                        <div className="details_table">
                          {customAnketData.jobHistory?.map((job) => {
                            return (
                              <div className="details_table_row" key={uuid()}>
                                <>
                                  <div className="details_table_cell">
                                    <p className="details_table_title">
                                      {job.organizationName}
                                    </p>
                                    <p className="details_table_title">
                                      {job?.organizationAddress}
                                    </p>
                                    <p className="details_table_text">
                                      {job?.info}
                                    </p>
                                  </div>
                                  <div className="details_table_cell">
                                    <div className="details_table_label">
                                      Период работы
                                    </div>
                                    <p className="details_table_title">
                                      {job.hireDate}{" "}
                                      {job.fireDate ? `- ${job.fireDate}` : ""}
                                    </p>
                                  </div>
                                </>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Accordion>
                )}

                {customAnketData?.cdekData && (
                  <Accordion title="CDEK" Icon={Cdek}>
                    <>
                      <ExpandCards
                        withActions
                        headTitle="Количество результатов:"
                        titleCount={customAnketData?.cdekData.length}
                      >
                        {customAnketData?.cdekData.map((item, index) => {
                          const hasCustomer =
                            item?.contragentName ||
                            item?.contactPerson ||
                            item?.phone ||
                            item?.name ||
                            item?.email ||
                            item?.addressString ||
                            item?.city ||
                            item?.sourceName;
                          const hasReceiver =
                            item?.receiverAddress ||
                            item?.receiverCity ||
                            item?.receiverContactPerson ||
                            item?.receiverContragentName ||
                            item?.receiverEmail ||
                            item?.receiverName ||
                            item?.receiverPhone;
                          const hasSender =
                            item?.senderAddress ||
                            item?.senderCity ||
                            item?.senderContactPerson ||
                            item?.senderContragentName ||
                            item?.senderEmail ||
                            item?.senderName ||
                            item?.senderPhone;
                          const hasPayer =
                            item?.payerName ||
                            item?.payerContactPerson ||
                            item?.payerCity ||
                            item?.payerAddress ||
                            item?.payerContragentName ||
                            item?.payerEmail ||
                            item?.payerPhone;
                          const quantity =
                            +Boolean(hasPayer) +
                            +Boolean(hasCustomer) +
                            +Boolean(hasReceiver) +
                            +Boolean(hasSender);
                          return (
                            <div
                              className="expand_cards_row expand_cards_colored_row"
                              key={uuid()}
                            >
                              {hasCustomer && (
                                <ExpandCard
                                  id={`cdekData${index}.custom${cardsCdekId}${item?.id}customer.view`}
                                  title="Данные клиента"
                                >
                                  {/*first <></> = visible content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Имя
                                      </div>
                                      <p>{item.name || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      <p>{item.phone || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Email
                                      </div>
                                      <p>{item.email || "-"}</p>
                                    </div>
                                  </>
                                  {/*second <></> = hide content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Адрес
                                      </div>
                                      <p>{item.addressString || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Город
                                      </div>
                                      <p>{item.city || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контактное лицо
                                      </div>
                                      <p>{item.contactPerson || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контрагент
                                      </div>
                                      <p>{item.contragentName || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Источник
                                      </div>
                                      <p>{item.sourceName || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              )}
                              {hasPayer && (
                                <ExpandCard
                                  id={`cdekData${index}.custom${cardsCdekId}${item?.id}payer.view`}
                                  title="Данные плательщика"
                                >
                                  {/*first <></> = visible content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Имя
                                      </div>
                                      <p>{item.payerName || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      <p>{item.payerPhone || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Email
                                      </div>
                                      <p>{item.payerEmail || "-"}</p>
                                    </div>
                                  </>
                                  {/*second <></> = hide content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Адрес
                                      </div>
                                      <p>{item.payerAddress || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Город
                                      </div>
                                      <p>{item.payerCity || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контактное лицо
                                      </div>
                                      <p>{item.payerContactPerson || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контрагент
                                      </div>
                                      <p>{item.payerContragentName || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              )}
                              {hasSender && (
                                <ExpandCard
                                  id={`cdekData${index}.custom${cardsCdekId}${item?.id}sender.view`}
                                  title="Данные отправителя"
                                >
                                  {/*first <></> = visible content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Имя
                                      </div>
                                      <p>{item.senderName || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      <p>{item.senderPhone || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Email
                                      </div>
                                      <p>{item.senderEmail || "-"}</p>
                                    </div>
                                  </>
                                  {/*second <></> = hide content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Адрес
                                      </div>
                                      <p>{item.senderAddress || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Город
                                      </div>
                                      <p>{item.senderCity || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контактное лицо
                                      </div>
                                      <p>{item.senderContactPerson || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контрагент
                                      </div>
                                      <p>{item.senderContragentName || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              )}
                              {hasReceiver && (
                                <ExpandCard
                                  id={`cdekData${index}.custom${cardsCdekId}${item?.id}receiver.view`}
                                  title="Данные получателя"
                                >
                                  {/*first <></> = visible content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Имя
                                      </div>
                                      <p>{item.receiverName || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      <p>{item.receiverPhone || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Email
                                      </div>
                                      <p>{item.receiverEmail || "-"}</p>
                                    </div>
                                  </>
                                  {/*second <></> = hide content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Адрес
                                      </div>
                                      <p>{item.receiverAddress || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Город
                                      </div>
                                      <p>{item.receiverCity || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контактное лицо
                                      </div>
                                      <p>{item.receiverContactPerson || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Контрагент
                                      </div>
                                      <p>
                                        {item.receiverContragentName || "-"}
                                      </p>
                                    </div>
                                  </>
                                </ExpandCard>
                              )}
                            </div>
                          );
                        })}
                      </ExpandCards>
                    </>
                  </Accordion>
                )}
                {customAnketData.autoArray && (
                  <Accordion title="Парковки" Icon={Car}>
                    <>
                      <ExpandCards>
                        <div className="expand_cards_row expand_cards_row-4">
                          {customAnketData?.autoArray?.map(
                            ({ phone, plateNumber, id, mark }) => {
                              return (
                                <Card key={uuid()}>
                                  {mark && (
                                    <div className="details_div">
                                      <div className="details_label">Марка</div>
                                      <p>{mark}</p>
                                    </div>
                                  )}
                                  {plateNumber && (
                                    <div className="details_div">
                                      <div className="details_label">
                                        Номерной знак
                                      </div>
                                      <p>{plateNumber}</p>
                                    </div>
                                  )}

                                  {phone && (
                                    <div className="details_div">
                                      <div className="details_label">
                                        Телефон
                                      </div>
                                      <p>{phone}</p>
                                    </div>
                                  )}
                                </Card>
                              );
                            },
                          )}
                        </div>
                      </ExpandCards>
                    </>
                  </Accordion>
                )}
                {customAnketData.sirenaTrainTicketInfo ? (
                  <Accordion title="Сирена Поезда" Icon={SirenaTrain}>
                    <ExpandCards
                      headTitle="Количество результатов:"
                      titleCount={
                        customAnketData?.sirenaTrainTicketInfo?.length
                      }
                      withActions
                    >
                      {customAnketData.sirenaTrainTicketInfo?.map(
                        (
                          {
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
                          },
                          trainTicketIndex,
                        ) => {
                          const ticketId = `custom.view.${cardsSirenaTicketTrain}.sirenaTrainTicketInfo${trainTicketIndex}.ticket-${
                            ticket || trainTicketIndex
                          }`;

                          return (
                            <React.Fragment key={uuid()}>
                              <div
                                className="expand_cards_row"
                                style={{
                                  gridTemplateColumns:
                                    "repeat(2, minmax(250px, 500px))",
                                  margin: "16px 0",
                                }}
                              >
                                <ExpandCard
                                  id={`${cardsSirenaTicketTrain}.sirenaTrainTicketInfo${trainTicketIndex}-ticket-${ticket}`}
                                  title={`${port_from} - ${port_to} `}
                                  subId={ticketId}
                                  subTitleShow="дополнительные данные"
                                >
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Номер брони
                                      </div>
                                      <p>{regnum || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        ФИО
                                      </div>
                                      <p>
                                        {`${lastname || "-"} ${
                                          firstname || "-"
                                        } ${patronymic || "-"}`}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      {phone || "-"}
                                    </div>
                                  </>
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Дата бронирования
                                      </div>

                                      <p>
                                        {moment
                                          .utc(tkt_date)
                                          .format("YYYY-MM-DD HH:mm:ss") || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Документ
                                      </div>
                                      <p>{pass_doc || "-"}</p>
                                    </div>
                                  </>
                                  <>
                                    <div className="details_div">
                                      <div className="details_label">Место</div>
                                      <p>{seat || "-"}</p>
                                    </div>
                                    <div className="details_div">
                                      <div className="details_label">
                                        Позиция места
                                      </div>
                                      <p>{seat_tier || "-"}</p>
                                    </div>
                                    <div className="details_div">
                                      <div className="details_label">
                                        Номер билета
                                      </div>
                                      <p>{ticket || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              </div>
                              {passengers && (
                                <>
                                  <ExpandCards
                                    withActions
                                    headTitle="Попутчики  по брони:"
                                    titleCount={regnum}
                                  >
                                    <div className="expand_cards_row expand_cards_colored_row">
                                      {passengers.map(
                                        (
                                          {
                                            regnum,
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
                                          },
                                          passengerTicketIndex,
                                        ) => {
                                          const passengerTicketId = `custom.view.${cardsSirenaTicketTrain}.sirenaTrainTicketInfo${trainTicketIndex}.passengerTicket-${
                                            ticket || passengerTicketIndex
                                          }`;
                                          return (
                                            <ExpandCard
                                              id={`passengers-${cardsSirenaTicketTrain}.sirenaTrainTicketInfo${passengerTicketIndex}-passengerTicket-${ticket}`}
                                              title={`${port_from} - ${port_to} `}
                                              subId={passengerTicketId}
                                              subTitleShow="дополнительные данные"
                                            >
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер брони
                                                  </div>
                                                  <p>{regnum || "-"}</p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    ФИО
                                                  </div>
                                                  <p>
                                                    {`${lastname || "-"} ${
                                                      firstname || "-"
                                                    } ${patronymic || "-"}`}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Телефон
                                                  </div>
                                                  {phone || "-"}
                                                </div>
                                              </>
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата бронирования
                                                  </div>

                                                  <p>
                                                    {moment
                                                      .utc(tkt_date)
                                                      .format(
                                                        "YYYY-MM-DD HH:mm:ss",
                                                      ) || "-"}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Документ
                                                  </div>
                                                  <p>{pass_doc || "-"}</p>
                                                </div>
                                              </>
                                              <>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Место
                                                  </div>
                                                  <p>{seat || "-"}</p>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Позиция места
                                                  </div>
                                                  <p>{seat_tier || "-"}</p>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Номер билета
                                                  </div>
                                                  <p>{ticket || "-"}</p>
                                                </div>
                                              </>
                                            </ExpandCard>
                                          );
                                        },
                                      )}
                                    </div>
                                  </ExpandCards>
                                </>
                              )}
                            </React.Fragment>
                          );
                        },
                      )}
                    </ExpandCards>
                  </Accordion>
                ) : null}
                {customAnketData.sirenaInsuranceInfo ? (
                  <Accordion title="Сирена Страховки" Icon={SirenaInsurance}>
                    <ExpandCards
                      headTitle="Количество результатов:"
                      titleCount={customAnketData?.sirenaInsuranceInfo?.length}
                      withActions
                    >
                      <div
                        className="expand_cards_row"
                        style={{
                          gridTemplateColumns:
                            "repeat(2, minmax(250px, 500px))",
                          margin: "16px 0",
                        }}
                      >
                        {customAnketData.sirenaInsuranceInfo?.map(
                          (
                            {
                              lastname,
                              firstname,
                              patronymic,
                              doctype,
                              docNumber,
                              flight,
                              city_from,
                              city_to,
                              tkt_date,
                              dep_date,
                            },
                            insuranceIndex,
                          ) => {
                            const insuranceId = `custom.view.${cardsSirenaInsuranceInfo}.sirenaInsuranceInfo${insuranceIndex}.ticket-${
                              id || insuranceIndex
                            }`;

                            return (
                              <ExpandCard
                                key={uuid()}
                                id={`${cardsSirenaInsuranceInfo}.sirenaInsuranceInfo${insuranceIndex}-ticket-${id}`}
                                title={`${city_from} - ${city_to} `}
                                subId={insuranceId}
                                subTitleShow="дополнительные данные"
                              >
                                <>
                                  <div>
                                    <div className="expand_content_title">
                                      ФИО
                                    </div>
                                    <p>
                                      {`${lastname || "-"} ${
                                        firstname || "-"
                                      } ${patronymic || "-"}`}
                                    </p>
                                  </div>
                                </>
                                <>
                                  <div>
                                    <div className="expand_content_title">
                                      Дата бронирования
                                    </div>
                                    <p>
                                      {moment
                                        .utc(tkt_date)
                                        .format("YYYY-MM-DD HH:mm:ss") || "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Дата отправления
                                    </div>
                                    <p>{dep_date || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Номер документа / Тип документа
                                    </div>
                                    <p>
                                      {docNumber || "-"} / {doctype || "-"}
                                    </p>
                                  </div>
                                </>
                                <>
                                  <div className="details_div">
                                    <div className="details_label">
                                      Номер самолета
                                    </div>
                                    <p>{flight || "-"}</p>
                                  </div>
                                </>
                              </ExpandCard>
                            );
                          },
                        )}
                      </div>
                    </ExpandCards>
                  </Accordion>
                ) : null}
                {customAnketData?.sirenaTicketInfo ? (
                  <Accordion title="Сирена Билеты" Icon={Sirena}>
                    <ExpandCards
                      headTitle="Количество результатов:"
                      titleCount={customAnketData?.sirenaTicketInfo?.length}
                    >
                      {customAnketData?.sirenaTicketInfo?.map(
                        (
                          {
                            id,
                            regnum,
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
                          },
                          ticketIndex,
                        ) => {
                          const ticketId = `custom.view.${cardsSirenaPassanger}.sirenaTicketInfo${ticketIndex}.ticket${id}`;

                          return (
                            <React.Fragment key={uuid()}>
                              <div
                                className="expand_cards_row"
                                style={{
                                  gridTemplateColumns:
                                    "repeat(2, minmax(250px, 500px))",
                                }}
                              >
                                <ExpandCard
                                  key={uuid()}
                                  id={`${cardsSirenaPassanger}.sirenaTicketInfo${ticketIndex}`}
                                  title={`${city_from} - ${city_to} `}
                                  subId={ticketId}
                                  subTitleShow="дополнительные данные"
                                >
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        ФИО
                                      </div>
                                      <p>
                                        {`${lastname || "-"} ${
                                          firstname || "-"
                                        } ${patronymic || "-"}`}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      {phone?.length ? (
                                        <>
                                          {phone?.map((ph) => (
                                            <p>{ph || "-"}</p>
                                          ))}
                                        </>
                                      ) : (
                                        "-"
                                      )}
                                    </div>
                                  </>
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Номер брони
                                      </div>
                                      <p>{regnum || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Дата бронирования
                                      </div>

                                      <p>
                                        {moment
                                          .utc(tkt_date)
                                          .format("YYYY-MM-DD HH:mm:ss") || "-"}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Город бронирования
                                      </div>
                                      <p>{first_city || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Документ
                                      </div>
                                      <p>{passDoc || "-"}</p>
                                    </div>
                                  </>
                                  <>
                                    <div className="details_div">
                                      <div className="details_label">
                                        Авиакомпания
                                      </div>
                                      <p>{airline_name || "-"}</p>
                                    </div>
                                    <div className="details_div">
                                      <div className="details_label">Инфо</div>
                                      <p>{info || "-"}</p>
                                    </div>
                                    <div className="details_div">
                                      <div className="details_label">
                                        Доп. инфо о месте вылета
                                      </div>
                                      <p>{farce_calt_vld_url || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              </div>
                              {relatedTickets && (
                                <>
                                  <ExpandCards>
                                    <Title Tag="h3">{`Связанные билеты по брони: ${regnum}`}</Title>

                                    <div className="expand_cards_row expand_cards_colored_row">
                                      {relatedTickets.map(
                                        (
                                          {
                                            id,
                                            regnum,
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
                                          },
                                          relatedTicketIndex,
                                        ) => {
                                          const relatedTicketId = `custom.view${cardsSirenaPassanger}.relatedTickets${relatedTicketIndex}.ticket${id}`;

                                          return (
                                            <ExpandCard
                                              key={uuid()}
                                              id={`${cardsSirenaPassanger}.relatedTickets[${relatedTicketIndex}].ticket`}
                                              subId={relatedTicketId}
                                              title={`${city_from} - ${city_to} `}
                                              subTitleShow="дополнительные данные"
                                            >
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    ФИО
                                                  </div>
                                                  <p>
                                                    {`${lastname || "-"} ${
                                                      firstname || "-"
                                                    } ${patronymic || "-"}`}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Телефон
                                                  </div>
                                                  {phone?.length ? (
                                                    <>
                                                      {phone?.map((ph) => (
                                                        <p>{ph || "-"}</p>
                                                      ))}
                                                    </>
                                                  ) : (
                                                    "-"
                                                  )}
                                                </div>
                                                {email && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Телефон
                                                    </div>
                                                    {Array.isArray(email) ? (
                                                      <>
                                                        {email?.map((em) => (
                                                          <p>{em || "-"}</p>
                                                        ))}
                                                      </>
                                                    ) : (
                                                      <>
                                                        <p>{email || "-"}</p>
                                                      </>
                                                    )}
                                                  </div>
                                                )}
                                              </>
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Город вылета
                                                  </div>
                                                  <p>{city_from || "-"}</p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата бронирования
                                                  </div>

                                                  <p>
                                                    {moment
                                                      .utc(tkt_date)
                                                      .format(
                                                        "YYYY-MM-DD HH:mm:ss",
                                                      ) || "-"}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер брони
                                                  </div>
                                                  <p>{regnum || "-"}</p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Документ
                                                  </div>
                                                  <p>{passDoc || "-"}</p>
                                                </div>
                                              </>
                                              <>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Авиакомпания
                                                  </div>
                                                  <p>{airline_name || "-"}</p>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Инфо
                                                  </div>
                                                  <p>{info || "-"}</p>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Доп. инфо о месте вылета
                                                  </div>
                                                  <p>
                                                    {farce_calt_vld_url || "-"}
                                                  </p>
                                                </div>
                                              </>
                                            </ExpandCard>
                                          );
                                        },
                                      )}
                                    </div>
                                  </ExpandCards>
                                </>
                              )}
                            </React.Fragment>
                          );
                        },
                      )}
                    </ExpandCards>
                  </Accordion>
                ) : null}
                {customAnketData.sirenaPassenger ? (
                  <Accordion title="Сирена Пасажиры" Icon={Sirena}>
                    <ExpandCards
                      withActions
                      headTitle="Количество результатов:"
                      titleCount={customAnketData?.sirenaPassenger.length}
                    >
                      <div className="expand_cards_row expand_cards_colored_row">
                        <ReactTooltip
                          id="points-tooltip"
                          className={`kermit_tooltip ${
                            isDarkTheme ? "" : "tooltip_light"
                          }`}
                          place="top"
                        />
                        {customAnketData?.sirenaPassenger.map(
                          (
                            {
                              airline,
                              birthdate,
                              bookingTime,
                              categoryFly,
                              departureTime,
                              destination,
                              docNum,
                              docType,
                              passengerEmail,
                              flight,
                              passengerPhone,
                              lastname,
                              firstname,
                              patronymic,
                              pointOfDeparture,
                              arrivalCountry,
                              departureCountry,
                              ticket,
                              dob,
                              id,
                            },
                            i,
                          ) => {
                            const passengerId = `custom.${cardsSirenaPassanger}.sirenaPassengers${i}.sirenaPassenger${id}`;

                            return (
                              <ExpandCard
                                key={uuid()}
                                id={`custom.${cardsSirenaPassanger}.sirenaPassengers${i}`}
                                TitleNode={
                                  <>
                                    <Title Tag="h4">
                                      <span
                                        data-tooltip-id="points-tooltip"
                                        style={{
                                          position: "relative",
                                          cursor: "help",
                                        }}
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                          <div>{departureCountry || "--"}</div>,
                                        )}
                                      >
                                        {pointOfDeparture || "--"}
                                        {pointOfDeparture && (
                                          <span
                                            style={{
                                              color: "#006eff",
                                              fontSize: "12px",
                                              position: "absolute",
                                              top: "-7px",
                                              right: "-7px",
                                            }}
                                          >
                                            ?
                                          </span>
                                        )}
                                      </span>
                                      -
                                      <span
                                        data-tooltip-id="points-tooltip"
                                        style={{
                                          position: "relative",
                                          cursor: "help",
                                        }}
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                                          <div>{arrivalCountry || "--"}</div>,
                                        )}
                                      >
                                        {destination || "--"}
                                        {destination && (
                                          <span
                                            style={{
                                              color: "#006eff",
                                              fontSize: "12px",
                                              position: "absolute",
                                              top: "-7px",
                                              right: "-7px",
                                            }}
                                          >
                                            ?
                                          </span>
                                        )}
                                      </span>
                                    </Title>
                                  </>
                                }
                                subId={passengerId}
                                subTitleShow="дополнительные данные"
                              >
                                <>
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        ФИО
                                      </div>
                                      <p>
                                        {`${lastname || "-"} ${
                                          firstname || "-"
                                        } ${patronymic || "-"}`}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      <p>{passengerPhone || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Email
                                      </div>
                                      <p>{passengerEmail || "-"}</p>
                                    </div>
                                  </>
                                </>
                                <>
                                  <div>
                                    <div className="expand_content_title">
                                      Дата рождения
                                    </div>
                                    <p>
                                      {dob
                                        ? moment(dob).format("YYYY-MM-DD")
                                        : "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Номер рейса
                                    </div>
                                    <p>{flight || "-"}</p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Время вылета
                                    </div>
                                    <p>
                                      {moment(departureTime).format(
                                        "YYYY-MM-DD HH:mm:ss",
                                      ) || "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Дата бронирования
                                    </div>
                                    <p>
                                      {moment(bookingTime).format(
                                        "YYYY-MM-DD HH:mm:ss",
                                      ) || "-"}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="expand_content_title">
                                      Номер билета
                                    </div>
                                    <p>{ticket || "-"}</p>
                                  </div>

                                  <div>
                                    <div className="expand_content_title">
                                      Номер документа / Тип документа
                                    </div>
                                    <p>
                                      {docNum || "-"} / {docType || "-"}
                                    </p>
                                  </div>
                                </>
                                <>
                                  <div
                                    style={{
                                      display: "grid",
                                      gap: "8px",
                                      marginTop: "16px",
                                    }}
                                  >
                                    <div className="details_div">
                                      <div className="details_label">
                                        Авиакомпания
                                      </div>
                                      <p>{airline || "-"}</p>
                                    </div>
                                    <div className="details_div">
                                      <div className="details_label">
                                        Клас обслуживания
                                      </div>
                                      <p>{categoryFly || "-"}</p>
                                    </div>
                                  </div>
                                </>
                              </ExpandCard>
                            );
                          },
                        )}
                      </div>
                    </ExpandCards>
                  </Accordion>
                ) : null}
                {(hasSpektrPersonInfo || customAnketData?.accidents) && (
                  <Accordion title="SPEKTR" Icon={Spektr}>
                    <>
                      {hasSpektrPersonInfo && (
                        <ExpandCards>
                          <div className="expand_cards_row">
                            <Card>
                              <>
                                <div className="details_div">
                                  <div className="details_label">
                                    Тип участника
                                  </div>
                                  <p>Искомый участник</p>
                                </div>
                                {customAnketData.vin && (
                                  <div className="details_div">
                                    <div className="details_label">VIN код</div>
                                    {customAnketData?.vin?.map(
                                      (item, index) => {
                                        return <p>{item || "-"}</p>;
                                      },
                                    )}
                                  </div>
                                )}
                                {customAnketData.body && (
                                  <div className="details_div">
                                    <div className="details_label">
                                      Номер кузова
                                    </div>
                                    {customAnketData?.body?.map(
                                      (item, index) => {
                                        return <p>{item || "-"}</p>;
                                      },
                                    )}
                                  </div>
                                )}
                                {customAnketData.chassis && (
                                  <div className="details_div">
                                    <div className="details_label">
                                      Номер шасси
                                    </div>
                                    {customAnketData?.chassis?.map(
                                      (item, index) => {
                                        return <p>{item || "-"}</p>;
                                      },
                                    )}
                                  </div>
                                )}
                                {customAnketData.engine && (
                                  <div className="details_div">
                                    <div className="details_label">
                                      Номер двигателя
                                    </div>
                                    {customAnketData?.engine?.map(
                                      (item, index) => {
                                        return <p>{item || "-"}</p>;
                                      },
                                    )}
                                  </div>
                                )}
                                {customAnketData.mark && (
                                  <div className="details_div">
                                    <div className="details_label">
                                      Автомобиль
                                    </div>
                                    {customAnketData?.mark?.map(
                                      (item, index) => {
                                        return <p>{item || "-"}</p>;
                                      },
                                    )}
                                  </div>
                                )}
                                {customAnketData.plateNumber && (
                                  <div className="details_div">
                                    <div className="details_label">
                                      Номерной знак
                                    </div>
                                    {customAnketData?.plateNumber?.map(
                                      (item, index) => {
                                        return <p>{item || "-"}</p>;
                                      },
                                    )}
                                  </div>
                                )}
                                {customAnketData.yearOfCreation && (
                                  <div className="details_div">
                                    <div className="details_label">
                                      Год выпуска
                                    </div>
                                    {customAnketData?.yearOfCreation?.map(
                                      (item, index) => {
                                        return (
                                          <>
                                            <p>{item || "-"}</p>
                                          </>
                                        );
                                      },
                                    )}
                                  </div>
                                )}
                                {customAnketData.comment && (
                                  <div className="details_div">
                                    <div className="details_label">
                                      Комментарий
                                    </div>
                                    {customAnketData?.comment?.map(
                                      (item, index) => {
                                        return <p>{item || "-"}</p>;
                                      },
                                    )}
                                  </div>
                                )}
                              </>
                            </Card>
                          </div>
                        </ExpandCards>
                      )}

                      {customAnketData?.accidents ? (
                        <div className="spektr_section_content">
                          <ExpandCards>
                            {customAnketData?.accidents?.map(
                              (accident, index) => {
                                return (
                                  <div className="spektr_details" key={uuid()}>
                                    <div className="details_title">
                                      <div className="title_head">
                                        <Title Tag="h3">
                                          {accident?.accidentType} -{" "}
                                        </Title>
                                        <Title
                                          Tag="h3"
                                          titleType={"title_secondary"}
                                        >
                                          {moment(accident.accidentDate).format(
                                            "YYYY-MM-DD",
                                          )}
                                        </Title>
                                      </div>
                                      {accident?.participants && (
                                        <p className="spektr_participants">
                                          Список участников:
                                        </p>
                                      )}
                                    </div>
                                    <div className="expand_cards_row">
                                      {accident?.participants?.map(
                                        (participant, participantIndex) => {
                                          const uniqid = `accidents.${index}.participants${participantIndex}.${cardsSpektrId}.view`;
                                          return (
                                            <ExpandCard
                                              id={uniqid}
                                              title={
                                                participant.personInfo.relation
                                              }
                                            >
                                              <>
                                                {participant.personInfo
                                                  .relation && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Тип участника
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.personInfo
                                                          .relation
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                                {participant.personInfo
                                                  .surname && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Фамилия
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.personInfo
                                                          .surname
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                                {participant.personInfo
                                                  .name && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Имя
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.personInfo
                                                          .name
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                                {participant.personInfo
                                                  .patronymic && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Отчество
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.personInfo
                                                          .patronymic
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                                {participant.personInfo
                                                  .birthDate && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Дата рождения
                                                    </div>
                                                    <p>
                                                      {moment(
                                                        participant.personInfo
                                                          .birthDate,
                                                      ).format("YYYY-MM-DD")}
                                                    </p>
                                                  </div>
                                                )}
                                              </>
                                              <>
                                                {participant.vehicleInfo
                                                  ?.vin && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      VIN код
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.vehicleInfo
                                                          ?.vin
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                                {participant.vehicleInfo
                                                  ?.make && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Автомобиль
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.vehicleInfo
                                                          ?.make
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                                {participant.vehicleInfo
                                                  ?.plateNumber && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Номерной знак
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.vehicleInfo
                                                          ?.plateNumber
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                                {participant.vehicleInfo
                                                  ?.year && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Год выпуска
                                                    </div>
                                                    <p>
                                                      {
                                                        participant.vehicleInfo
                                                          ?.year
                                                      }
                                                    </p>
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
                      ) : null}
                    </>
                  </Accordion>
                )}

                {customAnketData?.jobArray && (
                  <Accordion
                    title="Место работы с других источников"
                    Icon={Job}
                  >
                    <div className="accordion_content accordion_column">
                      <div className="details_table">
                        {customAnketData.jobArray?.map((job) => {
                          return (
                            <div className="details_table_row" key={uuid()}>
                              <>
                                <div className="details_table_cell">
                                  <p className="details_table_title">
                                    {job.organizationName}
                                  </p>
                                  <p className="details_table_title">
                                    {job.organizationAddress}
                                  </p>
                                  <p className="details_table_text">
                                    {job.info}
                                  </p>
                                </div>
                                <div className="details_table_cell">
                                  <div className="details_table_label">
                                    Период работы
                                  </div>
                                  <p className="details_table_title">
                                    {job.hireDate}{" "}
                                    {job.fireDate ? `- ${job.fireDate}` : ""}
                                  </p>
                                </div>
                              </>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Accordion>
                )}

                {customAnketData?.estates && (
                  <Accordion title="ЕГРОН" Icon={EgronImage}>
                    <div className="accordion_inner">
                      <div className="accordion_gap">
                        <div className="accordion_content">
                          {customAnketData?.estates?.map((item) => {
                            const objectType = item.history.find(
                              (element) => element.objectType,
                            )?.objectType;

                            return (
                              <>
                                <Card key={uuid()}>
                                  {item.cadNumber && (
                                    <div className="details_div">
                                      <div className="details_label">
                                        Кадастровый номер
                                      </div>
                                      <p>{item.cadNumber}</p>
                                    </div>
                                  )}
                                  {item.area && (
                                    <div className="details_div">
                                      <div className="details_label">
                                        Площадь
                                      </div>
                                      <p>{item.area}</p>
                                    </div>
                                  )}
                                  {objectType && (
                                    <div className="details_div">
                                      <div className="details_label">
                                        Тип площади
                                      </div>
                                      <p>{objectType}</p>
                                    </div>
                                  )}
                                  {item.address && (
                                    <div className="details_div">
                                      <div className="details_label">Адрес</div>
                                      <p>{item.address}</p>
                                    </div>
                                  )}
                                  {item.price && (
                                    <div className="details_div">
                                      <div className="details_label">
                                        Стоимость ₽
                                      </div>
                                      <p>{item.price}</p>
                                    </div>
                                  )}
                                </Card>

                                {item.history.length > 0 ? (
                                  <Accordion
                                    title="Действия по объекту"
                                    titleTag="h4"
                                  >
                                    {item.history.length > 10 ? (
                                      <TableFront
                                        data={item.history}
                                        columns={EgronColumns}
                                      />
                                    ) : (
                                      <ExpandCards
                                        withActions
                                        headTitle="К-во действий по объекту:"
                                        titleCount={item.history?.length}
                                      >
                                        <div className="accordion_content expand_cards_row expand_cards_row-4">
                                          {item.history.map((element) => {
                                            return (
                                              <ExpandCard
                                                key={uuid()}
                                                id={element.id}
                                              >
                                                {/*first <></> = visible content*/}
                                                <>
                                                  {(element.lastname ||
                                                    element.firstname ||
                                                    element.patronymic) && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        ФИО
                                                      </div>
                                                      <p>
                                                        {element.lastname}{" "}
                                                        {element.firstname}{" "}
                                                        {element.patronymic}
                                                      </p>
                                                    </div>
                                                  )}
                                                  {element.dateFrom && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Дата сделки
                                                      </div>
                                                      <p>
                                                        {moment(
                                                          element.dateFrom,
                                                        ).format("YYYY-MM-DD")}
                                                      </p>
                                                    </div>
                                                  )}
                                                  {element.dealType && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Тип сделки
                                                      </div>
                                                      <p>{element.dealType}</p>
                                                    </div>
                                                  )}
                                                  {element.status && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Статус
                                                      </div>
                                                      <p>{element.status}</p>
                                                    </div>
                                                  )}
                                                </>
                                                {/*second <></> = hide content*/}
                                                <>
                                                  {element.snils && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        № Соц страхования
                                                      </div>
                                                      <p>{element.snils}</p>
                                                    </div>
                                                  )}
                                                  {(element.document_series ||
                                                    element.document_number) && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Серия-номер Документа
                                                      </div>
                                                      <p>
                                                        {element.document_series ||
                                                          "no data"}{" "}
                                                        -{" "}
                                                        {element.document_number ||
                                                          "no data"}
                                                      </p>
                                                    </div>
                                                  )}
                                                </>
                                              </ExpandCard>
                                            );
                                          })}
                                        </div>
                                      </ExpandCards>
                                    )}
                                  </Accordion>
                                ) : null}
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Accordion>
                )}

                {customAnketData?.insurancePolicies && (
                  <Accordion title="Данные по авто(new)" Icon={Car}>
                    <div className="accordion_content accordion_column">
                      {customAnketData?.insurancePolicies?.map((item) => {
                        return (
                          <div className="flex_details details_bg">
                            {item.vin && (
                              <>
                                <div className="item_title">VIN код</div>
                                <p>{item.vin || "-"}</p>
                              </>
                            )}
                            {item?.licensePlate && (
                              <>
                                <div className="item_title">Номерной знак</div>
                                <p>{item?.licensePlate || "-"}</p>
                              </>
                            )}
                            {item?.brandName && (
                              <>
                                <div className="item_title">Марка авто</div>
                                <p>{item?.brandName || "-"}</p>
                              </>
                            )}
                            {item?.modelCar && (
                              <>
                                <div className="item_title">Модель авто</div>
                                <p>{item?.modelCar || "-"}</p>
                              </>
                            )}

                            {item?.chassisNumber && (
                              <>
                                <div className="item_title">Номер шасси</div>
                                <p>{item?.chassisNumber || "-"}</p>
                              </>
                            )}
                            {item?.bodyNumber && (
                              <>
                                <div className="item_title">Номер кузова</div>
                                <p>{item?.bodyNumber || "-"}</p>
                              </>
                            )}
                            {item?.year_issue && (
                              <>
                                <div className="item_title">Год выпуска</div>
                                <p>{item?.year_issue || "-"}</p>
                              </>
                            )}
                            {item?.enginePower && (
                              <>
                                <div className="item_title">
                                  К-во лошадиных сил
                                </div>
                                <p>{item?.enginePower || "-"}</p>
                              </>
                            )}
                            {item?.vehDocSerial && (
                              <>
                                <div className="item_title">
                                  Cерия документа на ТС
                                </div>
                                <p>{item?.vehDocSerial || "-"}</p>
                              </>
                            )}
                            {item?.docType && (
                              <>
                                <div className="item_title">Тип документа</div>
                                <p>{item?.docType || "-"}</p>
                              </>
                            )}
                            {item?.docNumber && (
                              <>
                                <div className="item_title">
                                  Номер документа
                                </div>
                                <p>{item?.docNumber || "-"}</p>
                              </>
                            )}
                            {item?.docSerial && (
                              <>
                                <div className="item_title">
                                  Серия документа
                                </div>
                                <p>{item?.docSerial || "-"}</p>
                              </>
                            )}
                            {item?.policy_unq_id && (
                              <>
                                <div className="item_title">
                                  Уникальный номер СП
                                </div>
                                <p>{item?.policy_unq_id || "-"}</p>
                              </>
                            )}
                            {item?.insCompany && (
                              <>
                                <div className="item_title">Страховщик</div>
                                <p>{item?.insCompany || "-"}</p>
                              </>
                            )}
                            {item?.isPolicyOwner && (
                              <>
                                <div className="item_title">
                                  Является владельцем страхового полиса
                                </div>
                                <p>{item?.isPolicyOwner || "-"}</p>
                              </>
                            )}
                            {item?.policyCreateDate && (
                              <>
                                <div className="item_title">
                                  Страховой полис дата от
                                </div>
                                <p>
                                  {moment(item.policyCreateDate).format(
                                    "YYYY-MM-DD",
                                  ) || "-"}
                                </p>
                              </>
                            )}
                            {item?.policyEndDate && (
                              <>
                                <div className="item_title">
                                  Страховой полис дата до
                                </div>
                                <p>
                                  {moment(item?.policyEndDate).format(
                                    "YYYY-MM-DD",
                                  ) || "-"}
                                </p>
                              </>
                            )}
                            {item?.isCarOwner && (
                              <>
                                <div className="item_title">
                                  Является владельцем авто
                                </div>
                                <p>{item?.isCarOwner || "-"}</p>
                              </>
                            )}
                            {item?.isDriver && (
                              <>
                                <div className="item_title">Водитель</div>
                                <p>{item?.isDriver || "-"}</p>
                              </>
                            )}
                            {item?.contractType && (
                              <>
                                <div className="item_title">Тип договора</div>
                                <p>{item?.contractType || "-"}</p>
                              </>
                            )}
                            {item?.isCarOwner && (
                              <>
                                <div className="item_title">
                                  Является владельцем авто
                                </div>
                                <p>{item?.isCarOwner || "-"}</p>
                              </>
                            )}
                            {item?.bsoFullNum && (
                              <>
                                <div className="item_title">
                                  Бланк строгой отчетности
                                </div>
                                <p>{item?.bsoFullNum || "-"}</p>
                              </>
                            )}
                            {item?.isRestrict && (
                              <>
                                <div className="item_title">Ограничения</div>
                                <p>{item?.isRestrict || "-"}</p>
                              </>
                            )}
                            {item?.lastname && (
                              <>
                                <div className="item_title">Фамилия</div>
                                <p>{item?.lastname || "-"}</p>
                              </>
                            )}
                            {item?.firstname && (
                              <>
                                <div className="item_title">Имя</div>
                                <p>{item?.firstname || "-"}</p>
                              </>
                            )}
                            {item?.patronymic && (
                              <>
                                <div className="item_title">Отчество</div>
                                <p>{item?.patronymic || "-"}</p>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </Accordion>
                )}
                {customAnketData?.mtsBank && (
                  <Accordion title="MTC-банк" Icon={MTS}>
                    <ExpandCards>
                      {customAnketData?.mtsBank?.map(
                        ({ cards, email, phone }, mtsIndex) => {
                          return (
                            <div
                              className="expand_cards_row"
                              style={{ display: "block" }}
                            >
                              {cards?.length ? (
                                <>
                                  <Title
                                    style={{ marginBottom: "12px" }}
                                    Tag="h3"
                                  >
                                    Карты
                                  </Title>
                                  <div className="expand_cards_row">
                                    {cards.map(
                                      (
                                        {
                                          cardNumber,
                                          expiryDate,
                                          issueDate,
                                          cardType,
                                        },
                                        cardIndex,
                                      ) => {
                                        const mtsId = `mts${mtsIndex}.cards-${cardIndex}`;
                                        return (
                                          <div key={uuid()}>
                                            <ExpandCard
                                              withParentActions
                                              id={mtsId}
                                              title={""}
                                            >
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Тип карты
                                                  </div>
                                                  <p>{cardType || "-"}</p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер карты
                                                  </div>
                                                  <p>{cardNumber || "-"}</p>
                                                </div>
                                              </>
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата выдачи
                                                  </div>
                                                  <p>{issueDate || "-"}</p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата истечения срока
                                                  </div>
                                                  <p>{expiryDate || "-"}</p>
                                                </div>
                                              </>
                                            </ExpandCard>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </>
                              ) : null}
                              {phone?.length ? (
                                <div className="expand_cards_row">
                                  <Card>
                                    <div className="details_div" key={uuid()}>
                                      <div className="details_label">
                                        Телефоны
                                      </div>
                                      {phone.map((ph) => {
                                        return <p>{ph || "-"}</p>;
                                      })}
                                    </div>
                                  </Card>
                                </div>
                              ) : null}
                              {email?.length ? (
                                <div className="expand_cards_row">
                                  <Card>
                                    <div className="details_div">
                                      <div className="details_label">Почты</div>
                                      {email.map((em) => {
                                        return <p key={uuid()}>{em || "-"}</p>;
                                      })}
                                    </div>
                                  </Card>
                                </div>
                              ) : null}
                            </div>
                          );
                        },
                      )}
                    </ExpandCards>
                  </Accordion>
                )}
                {customAnketData?.alfa && (
                  <Accordion title="Альфа-банк" Icon={AlfaIcon}>
                    <ExpandCards>
                      {customAnketData?.alfa?.map(
                        (
                          {
                            cards,
                            email,
                            phone,
                            dob,
                            lastname,
                            patronymic,
                            firstname,
                          },
                          alfaIndex,
                        ) => {
                          return (
                            <div
                              className="expand_cards_row"
                              style={{ display: "block" }}
                            >
                              {cards.length ? (
                                <>
                                  <Title
                                    style={{ marginBottom: "12px" }}
                                    Tag="h3"
                                  >
                                    Карты
                                  </Title>
                                  <div className="expand_cards_row">
                                    {cards.map(
                                      (
                                        {
                                          account_number,
                                          cardnum_ccode,
                                          expire_date,
                                        },
                                        cardIndex,
                                      ) => {
                                        const alfaId = `alfa${alfaIndex}.cards-${cardIndex}`;
                                        return (
                                          <div key={uuid()}>
                                            <ExpandCard
                                              withParentActions
                                              id={alfaId}
                                              title={""}
                                            >
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер карты
                                                  </div>
                                                  <p>{cardnum_ccode || "-"}</p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер счета
                                                  </div>
                                                  <p>{account_number || "-"}</p>
                                                </div>
                                              </>
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Владелец
                                                  </div>
                                                  <p>
                                                    {lastname} {firstname}{" "}
                                                    {patronymic}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата рождения
                                                  </div>
                                                  <p>
                                                    {moment(dob).format(
                                                      "YYYY-MM-DD",
                                                    )}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата истечения срока карты
                                                  </div>
                                                  <p>{expire_date || "-"}</p>
                                                </div>
                                              </>
                                            </ExpandCard>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </>
                              ) : null}
                              {phone.length ? (
                                <div className="expand_cards_row">
                                  <Card>
                                    <div className="details_div" key={uuid()}>
                                      <div className="details_label">
                                        Телефоны
                                      </div>
                                      {phone.map((ph) => {
                                        return <p>{ph || "-"}</p>;
                                      })}
                                    </div>
                                  </Card>
                                </div>
                              ) : null}
                              {email.length ? (
                                <div className="expand_cards_row">
                                  <Card>
                                    <div className="details_div">
                                      <div className="details_label">Почты</div>
                                      {email.map((em) => {
                                        return <p key={uuid()}>{em || "-"}</p>;
                                      })}
                                    </div>
                                  </Card>
                                </div>
                              ) : null}
                            </div>
                          );
                        },
                      )}
                    </ExpandCards>
                  </Accordion>
                )}
                {customAnketData?.kids?.length ? (
                  <Accordion Icon={DataBase} title="Дети">
                    <ExpandCards withActions>
                      <div className="expand_cards_row expand_cards_row-4">
                        {customAnketData?.kids?.map(
                          (
                            {
                              lastname,
                              firstname,
                              patronymic,
                              dob,
                              inn,
                              snils,
                              id,
                            },
                            i,
                          ) => {
                            return (
                              <React.Fragment key={uuid()}>
                                <ExpandCard
                                  id={`kidsData${i}${cardKidsId}${id}`}
                                >
                                  {/*first <></> = visible content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        ФИО
                                      </div>
                                      <p>
                                        {lastname} {firstname} {patronymic}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Дата рождения
                                      </div>
                                      <p>{moment(dob).format("YYYY-MM-DD")}</p>
                                    </div>
                                  </>

                                  {/*second <></> = hide content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        ИНН
                                      </div>
                                      <p>{inn || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        № Соц страхования
                                      </div>
                                      <p>{snils || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              </React.Fragment>
                            );
                          },
                        )}
                      </div>
                    </ExpandCards>
                  </Accordion>
                ) : null}
                {customAnketData?.tutuPassengers?.length ? (
                  <Accordion Icon={Tutu} title="Tutu пользователи">
                    <ExpandCards withActions>
                      <div className="expand_cards_row expand_cards_row-4">
                        {customAnketData?.tutuPassengers?.map(
                          (
                            {
                              lastname,
                              firstname,
                              patronymic,
                              dob,
                              placeOfBirth,
                              dcmNumber,
                              dcmType,
                              id,
                            },
                            i,
                          ) => {
                            return (
                              <React.Fragment key={uuid()}>
                                <ExpandCard
                                  id={`tutuPassengersData${i}${cardTutuPassengersId}${id}`}
                                >
                                  {/*first <></> = visible content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        ФИО
                                      </div>
                                      <p>
                                        {lastname} {firstname} {patronymic}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Дата рождения
                                      </div>
                                      <p>{moment(dob).format("YYYY-MM-DD")}</p>
                                    </div>
                                  </>

                                  {/*second <></> = hide content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Место рождения
                                      </div>
                                      <p>{placeOfBirth || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Номер документа
                                      </div>
                                      <p>{dcmNumber || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Тип документа
                                      </div>
                                      <p>{dcmType || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              </React.Fragment>
                            );
                          },
                        )}
                      </div>
                    </ExpandCards>
                  </Accordion>
                ) : null}
                {customAnketData?.tutuReserveUsers?.length ? (
                  <Accordion Icon={Tutu} title="Tutu пассажиры">
                    <ExpandCards withActions>
                      <div className="expand_cards_row expand_cards_row-4">
                        {customAnketData?.tutuReserveUsers?.map(
                          (
                            {
                              lastname,
                              firstname,
                              patronymic,
                              dob,
                              email,
                              phone,
                              reservedFor,
                              id,
                            },
                            i,
                          ) => {
                            return (
                              <React.Fragment key={uuid()}>
                                <ExpandCard
                                  title="Билет куплен кем"
                                  id={`tutuReserveUsersData${i}${cardTutuReserveUsersId}${id}`}
                                >
                                  {/*first <></> = visible content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        ФИО
                                      </div>
                                      <p>
                                        {lastname} {firstname} {patronymic}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Дата рождения
                                      </div>
                                      <p>
                                        {(dob &&
                                          moment(dob).format("YYYY-MM-DD")) ||
                                          "-"}
                                      </p>
                                    </div>
                                  </>

                                  {/*second <></> = hide content*/}
                                  <>
                                    <div>
                                      <div className="expand_content_title">
                                        Email
                                      </div>
                                      <p>{email || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Телефон
                                      </div>
                                      <p>{phone || "-"}</p>
                                    </div>
                                    <div>
                                      <div className="expand_content_title">
                                        Билет куплен для
                                      </div>
                                      <p>{reservedFor || "-"}</p>
                                    </div>
                                  </>
                                </ExpandCard>
                              </React.Fragment>
                            );
                          },
                        )}
                      </div>
                    </ExpandCards>
                  </Accordion>
                ) : null}
                {customAnketData.newAuto && (
                  <Accordion title="Данные по авто(new)" Icon={Car}>
                    <>
                      <ExpandCards>
                        {customAnketData.newAuto?.map(
                          (
                            {
                              userInfo,
                              carDrivers,
                              carOwners,
                              autoInfo,
                              drivers,
                              owners,
                            },
                            i,
                          ) => {
                            return (
                              <>
                                {autoInfo?.length ? (
                                  <div
                                    className="expand_cards_row expand_cards_colored_row"
                                    style={{ display: "block" }}
                                  >
                                    <Title Tag="h3">
                                      Данные об искомом авто
                                    </Title>
                                    <div className="expand_cards_row">
                                      {autoInfo.map((item, index) => {
                                        return (
                                          <div
                                            style={{
                                              marginTop: "24px",
                                            }}
                                          >
                                            <ExpandCard
                                              id={`${cardsAutoInfoId}${id}autoinfo`}
                                            >
                                              {/*first <></> = visible content*/}
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    VIN код
                                                  </div>
                                                  <p>{item.vin || "-"}</p>
                                                </div>
                                                <div
                                                  style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                      "repeat(2, 1fr)",
                                                    gap: "8px",
                                                  }}
                                                >
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Номерной знак
                                                    </div>
                                                    <p>
                                                      {item.license_plate ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Год выпуска
                                                    </div>
                                                    <p>
                                                      {item.yearIssue || "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Марка
                                                    </div>
                                                    <p>{item.brand || "-"}</p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Модель
                                                    </div>
                                                    <p>{item.model || "-"}</p>
                                                  </div>
                                                </div>
                                              </>
                                              {/*second <></> = hide content*/}
                                              <>
                                                {item.mark_model_other && (
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Доп. Марка
                                                    </div>
                                                    <p>
                                                      {item.mark_model_other ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                )}
                                                <div>
                                                  <div className="expand_content_title">
                                                    Мощность двигателя
                                                  </div>
                                                  <p>
                                                    {item.enginePower || "-"}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер шасси
                                                  </div>
                                                  <p>
                                                    {item.chassis_number || "-"}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер кузова
                                                  </div>
                                                  <p>
                                                    {item.body_number || "-"}
                                                  </p>
                                                </div>
                                                <div className="expand_content_divider"></div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата выдачи документа на ТС
                                                  </div>
                                                  <p>
                                                    {item.veh_doc_date || "-"}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Серия документа на ТС
                                                  </div>
                                                  <p>
                                                    {item.veh_doc_serial || "-"}
                                                  </p>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер документа на ТС
                                                  </div>
                                                  <p>
                                                    {item.veh_doc_number || "-"}
                                                  </p>
                                                </div>
                                                <div className="expand_content_divider"></div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Использовалась в такси
                                                  </div>
                                                  <p>
                                                    {item?.is_taxi === "0"
                                                      ? "Нет"
                                                      : item?.is_taxi === "1"
                                                      ? "Да"
                                                      : "Нет"}
                                                  </p>
                                                </div>
                                              </>
                                            </ExpandCard>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ) : null}

                                {owners?.length ? (
                                  <>
                                    <div
                                      className="expand_cards_row expand_cards_colored_row"
                                      style={{ display: "block" }}
                                    >
                                      <div>
                                        <Title Tag="h3">
                                          Владельцы искомого авто
                                        </Title>
                                        <div
                                          className="accordion_list"
                                          style={{ marginTop: "24px" }}
                                        >
                                          {owners?.map((item, index) => {
                                            const id = `owner${autoId}${index}`;
                                            return (
                                              <div className="accordion_col accordion_col_auto">
                                                <Card>
                                                  <div>
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        ФИО
                                                      </div>
                                                      <p>
                                                        {item?.lastname}{" "}
                                                        {item?.firstname}{" "}
                                                        {item?.patronymic}
                                                      </p>
                                                    </div>
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Дата рождения
                                                      </div>
                                                      <p>
                                                        {item?.dob
                                                          ? moment(
                                                              item?.dob,
                                                            ).format(
                                                              "YYYY-MM-DD",
                                                            )
                                                          : "-"}
                                                      </p>
                                                    </div>
                                                    {item?.documents?.length ? (
                                                      <>
                                                        <div
                                                          onClick={() =>
                                                            handleVisibleOwnerById(
                                                              id,
                                                            )
                                                          }
                                                          className="show_all"
                                                        >
                                                          {visibleOwners?.[id]
                                                            ? "Скрыть"
                                                            : "Показать"}{" "}
                                                          документы
                                                          {visibleOwners?.[
                                                            id
                                                          ] ? (
                                                            <AngleUp />
                                                          ) : (
                                                            <AngleDown />
                                                          )}
                                                        </div>
                                                        <div
                                                          style={{
                                                            overflow: "hidden",
                                                            height: `${
                                                              visibleOwners?.[
                                                                id
                                                              ]
                                                                ? "fit-content"
                                                                : "0"
                                                            }`,
                                                            display: "grid",
                                                            gap: "12px",
                                                            marginTop: `${
                                                              visibleOwners?.[
                                                                id
                                                              ]
                                                                ? "16px"
                                                                : "0"
                                                            }`,
                                                          }}
                                                        >
                                                          {item?.documents?.map(
                                                            (
                                                              item,
                                                              docIndex,
                                                            ) => {
                                                              return (
                                                                <div
                                                                  className="details_documents_container"
                                                                  style={{
                                                                    background:
                                                                      isDarkTheme
                                                                        ? ""
                                                                        : "white",
                                                                  }}
                                                                >
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Тип
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.doc_type ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Серия
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.doc_serial ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Номер
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.doc_number ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Дата
                                                                      выдачи
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.date_from ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                              );
                                                            },
                                                          )}
                                                        </div>
                                                      </>
                                                    ) : null}
                                                  </div>
                                                </Card>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                {drivers?.length ? (
                                  <>
                                    <div
                                      className="expand_cards_row expand_cards_colored_row"
                                      style={{ display: "block" }}
                                    >
                                      <div>
                                        <Title Tag="h3">
                                          Имеют доступ к искомому авто
                                        </Title>
                                        <div
                                          className="accordion_list"
                                          style={{ marginTop: "24px" }}
                                        >
                                          {drivers.map((item, index) => {
                                            const id = `driver${autoId}${index}`;
                                            return (
                                              <div className="accordion_col accordion_col_auto">
                                                <Card>
                                                  <div>
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        ФИО
                                                      </div>
                                                      <p>
                                                        {item?.lastname}{" "}
                                                        {item?.firstname}{" "}
                                                        {item?.patronymic}
                                                      </p>
                                                    </div>
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Дата рождения
                                                      </div>
                                                      <p>
                                                        {item?.dob
                                                          ? moment(
                                                              item?.dob,
                                                            ).format(
                                                              "YYYY-MM-DD",
                                                            )
                                                          : "-"}
                                                      </p>
                                                    </div>
                                                    {item?.documents?.length ? (
                                                      <>
                                                        <div
                                                          onClick={() =>
                                                            handleVisibleOwnerById(
                                                              id,
                                                            )
                                                          }
                                                          className="show_all"
                                                        >
                                                          {visibleOwners?.[id]
                                                            ? "Скрыть"
                                                            : "Показать"}{" "}
                                                          документы
                                                          {visibleOwners?.[
                                                            id
                                                          ] ? (
                                                            <AngleUp />
                                                          ) : (
                                                            <AngleDown />
                                                          )}
                                                        </div>
                                                        <div
                                                          style={{
                                                            overflow: "hidden",
                                                            height: `${
                                                              visibleOwners?.[
                                                                id
                                                              ]
                                                                ? "fit-content"
                                                                : "0"
                                                            }`,
                                                            display: "grid",
                                                            gap: "12px",
                                                            marginTop: `${
                                                              visibleOwners?.[
                                                                id
                                                              ]
                                                                ? "16px"
                                                                : "0"
                                                            }`,
                                                          }}
                                                        >
                                                          {item?.documents?.map(
                                                            (
                                                              item,
                                                              docIndex,
                                                            ) => {
                                                              return (
                                                                <div
                                                                  className="details_documents_container"
                                                                  style={{
                                                                    background:
                                                                      isDarkTheme
                                                                        ? ""
                                                                        : "white",
                                                                  }}
                                                                >
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Тип
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.doc_type ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Серия
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.doc_serial ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Номер
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.doc_number ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Дата
                                                                      выдачи
                                                                      документа
                                                                    </div>
                                                                    <p>
                                                                      {item?.date_from ||
                                                                        "-"}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                              );
                                                            },
                                                          )}
                                                        </div>
                                                      </>
                                                    ) : null}
                                                  </div>
                                                </Card>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                {userInfo?.length ? (
                                  <>
                                    <div
                                      className="expand_cards_row expand_cards_colored_row"
                                      style={{ display: "block" }}
                                    >
                                      <div>
                                        <Title Tag="h3">Личные данные</Title>
                                        <div
                                          className="accordion_list"
                                          style={{ marginTop: "24px" }}
                                        >
                                          {userInfo.map((item, index) => {
                                            const id = `userInfo${autoId}${index}`;
                                            return (
                                              <div className="accordion_col">
                                                <Card>
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      ФИО
                                                    </div>
                                                    <p>
                                                      {item?.lastname}{" "}
                                                      {item?.first_name}{" "}
                                                      {item?.patronymic}
                                                    </p>
                                                  </div>
                                                  <div className="details_div">
                                                    <div className="details_label">
                                                      Дата рождения
                                                    </div>
                                                    <p>
                                                      {item?.dob
                                                        ? moment(
                                                            item?.dob,
                                                          ).format("YYYY-MM-DD")
                                                        : "-"}
                                                    </p>
                                                  </div>
                                                  {item?.documents?.length ? (
                                                    <>
                                                      <div
                                                        onClick={() =>
                                                          handleVisibleOwnerById(
                                                            id,
                                                          )
                                                        }
                                                        className="show_all"
                                                      >
                                                        {visibleOwners?.[id]
                                                          ? "Скрыть"
                                                          : "Показать"}{" "}
                                                        Документы
                                                        {visibleOwners?.[id] ? (
                                                          <AngleUp />
                                                        ) : (
                                                          <AngleDown />
                                                        )}
                                                      </div>
                                                      <div
                                                        style={{
                                                          overflow: "hidden",
                                                          height: `${
                                                            visibleOwners?.[id]
                                                              ? "fit-content"
                                                              : "0"
                                                          }`,
                                                          display: "grid",
                                                          gap: "12px",
                                                          marginTop: `${
                                                            visibleOwners?.[id]
                                                              ? "16px"
                                                              : "0"
                                                          }`,
                                                        }}
                                                      >
                                                        {item?.documents?.map(
                                                          (item, docIndex) => {
                                                            return (
                                                              <div className="details_documents_container">
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    Тип
                                                                    документа
                                                                  </div>
                                                                  <p>
                                                                    {item?.doc_type ||
                                                                      "-"}
                                                                  </p>
                                                                </div>
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    Серия
                                                                    документа
                                                                  </div>
                                                                  <p>
                                                                    {item?.doc_serial ||
                                                                      "-"}
                                                                  </p>
                                                                </div>
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    Номер
                                                                    документа
                                                                  </div>
                                                                  <p>
                                                                    {item?.doc_number ||
                                                                      "-"}
                                                                  </p>
                                                                </div>
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    Дата выдачи
                                                                    документа
                                                                  </div>
                                                                  <p>
                                                                    {item?.date_from ||
                                                                      "-"}
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </>
                                                  ) : null}
                                                </Card>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                {carOwners?.length ? (
                                  <>
                                    <div
                                      className="expand_cards_row expand_cards_colored_row"
                                      style={{ display: "block" }}
                                    >
                                      <Title Tag="h3">
                                        Является владельцем авто
                                      </Title>
                                      <div className="expand_cards_row">
                                        {carOwners.map((item, index) => {
                                          const subOwnersId = `newAuto.${i}owner${index}.driver.view`;
                                          return (
                                            <div
                                              style={{
                                                marginTop: "24px",
                                              }}
                                            >
                                              <ExpandCard
                                                subId={subOwnersId}
                                                subTitleShow="допущеных к управлению"
                                                id={`newAuto.${i}${cardsCarOwnersId}${index}.carOwners.view`}
                                              >
                                                {/*first <></> = visible content*/}
                                                <>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      VIN код
                                                    </div>
                                                    <p>{item.vin || "-"}</p>
                                                  </div>
                                                  <div
                                                    style={{
                                                      display: "grid",
                                                      gridTemplateColumns:
                                                        "repeat(2, 1fr)",
                                                      gap: "8px",
                                                    }}
                                                  >
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Номерной знак
                                                      </div>
                                                      <p>
                                                        {item.license_plate ||
                                                          "-"}
                                                      </p>
                                                    </div>
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Год выпуска
                                                      </div>
                                                      <p>
                                                        {item.yearIssue || "-"}
                                                      </p>
                                                    </div>
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Марка
                                                      </div>
                                                      <p>{item.brand || "-"}</p>
                                                    </div>
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Модель
                                                      </div>
                                                      <p>{item.model || "-"}</p>
                                                    </div>
                                                  </div>
                                                </>
                                                {/*second <></> = hide content*/}
                                                <>
                                                  {item.mark_model_other && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Доп. Марка
                                                      </div>
                                                      <p>
                                                        {item.mark_model_other ||
                                                          "-"}
                                                      </p>
                                                    </div>
                                                  )}
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Мощность двигателя
                                                    </div>
                                                    <p>
                                                      {item.enginePower || "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Номер кузова
                                                    </div>
                                                    <p>
                                                      {item.body_number || "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Дата выдачи документа на
                                                      ТС
                                                    </div>
                                                    <p>
                                                      {item.veh_doc_number ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Серия документа на ТС
                                                    </div>
                                                    <p>
                                                      {item.veh_doc_serial ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Номер документа на ТС
                                                    </div>
                                                    <p>
                                                      {item.veh_doc_number ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Использовалась в такси
                                                    </div>
                                                    <p>
                                                      {item?.is_taxi === "0"
                                                        ? "Нет"
                                                        : item?.is_taxi === "1"
                                                        ? "Да"
                                                        : "Нет"}
                                                    </p>
                                                  </div>
                                                </>
                                                {/*third <></> = hide sub content*/}
                                                <>
                                                  {item.drivers?.length ? (
                                                    <>
                                                      <div
                                                        style={{
                                                          display: "grid",
                                                          gap: "16px",
                                                          cursor: "pointer",
                                                          marginTop: "16px",
                                                        }}
                                                      >
                                                        {item.drivers
                                                          ?.filter(Boolean)
                                                          ?.map(
                                                            ({
                                                              dob,
                                                              firstname,
                                                              lastname,
                                                              patronymic,
                                                            }) => {
                                                              return (
                                                                <div
                                                                  className="details_documents_container"
                                                                  style={{
                                                                    background:
                                                                      isDarkTheme
                                                                        ? ""
                                                                        : "white",
                                                                  }}
                                                                >
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      ФИО
                                                                    </div>
                                                                    <p>
                                                                      {lastname}{" "}
                                                                      {
                                                                        firstname
                                                                      }{" "}
                                                                      {
                                                                        patronymic
                                                                      }
                                                                    </p>
                                                                  </div>
                                                                  <div className="details_div">
                                                                    <div className="details_label">
                                                                      Дата
                                                                      рождения
                                                                    </div>
                                                                    <p>
                                                                      {moment(
                                                                        dob,
                                                                      ).format(
                                                                        "YYYY-MM-DD",
                                                                      ) || "-"}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                              );
                                                            },
                                                          )}
                                                      </div>
                                                    </>
                                                  ) : null}
                                                </>
                                              </ExpandCard>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                {carDrivers?.length ? (
                                  <>
                                    <div
                                      className="expand_cards_row expand_cards_colored_row"
                                      style={{ display: "block" }}
                                    >
                                      <Title Tag="h3">
                                        Допущен к управлению
                                      </Title>
                                      <div className="expand_cards_row">
                                        {carDrivers.map((item, index) => {
                                          const carDriversId = `newAuto.${i}carDrivers${autoId}${index}.view`;
                                          return (
                                            <div
                                              style={{
                                                marginTop: "24px",
                                              }}
                                            >
                                              <ExpandCard
                                                subId={carDriversId}
                                                id={`${cardsCarDriversId}${carDriversId}carDrivers`}
                                                subTitleShow="владельцев"
                                              >
                                                {/*first <></> = visible content*/}
                                                <>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      VIN код
                                                    </div>
                                                    <p>{item.vin || "-"}</p>
                                                  </div>
                                                  <div
                                                    style={{
                                                      display: "grid",
                                                      gridTemplateColumns:
                                                        "repeat(2, 1fr)",
                                                      gap: "8px",
                                                    }}
                                                  >
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Номерной знак
                                                      </div>
                                                      <p>
                                                        {item.license_plate ||
                                                          "-"}
                                                      </p>
                                                    </div>
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Год выпуска
                                                      </div>
                                                      <p>
                                                        {item.yearIssue || "-"}
                                                      </p>
                                                    </div>
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Марка
                                                      </div>
                                                      <p>{item.brand || "-"}</p>
                                                    </div>
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Модель
                                                      </div>
                                                      <p>{item.model || "-"}</p>
                                                    </div>
                                                  </div>
                                                </>
                                                {/*second <></> = hide content*/}
                                                <>
                                                  {item.mark_model_other && (
                                                    <div>
                                                      <div className="expand_content_title">
                                                        Доп. Марка
                                                      </div>
                                                      <p>
                                                        {item.mark_model_other ||
                                                          "-"}
                                                      </p>
                                                    </div>
                                                  )}
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Мощность двигателя
                                                    </div>
                                                    <p>
                                                      {item.enginePower || "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Номер кузова
                                                    </div>
                                                    <p>
                                                      {item.body_number || "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Дата выдачи документа на
                                                      ТС
                                                    </div>
                                                    <p>
                                                      {item.veh_doc_number ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Серия документа на ТС
                                                    </div>
                                                    <p>
                                                      {item.veh_doc_serial ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Номер документа на ТС
                                                    </div>
                                                    <p>
                                                      {item.veh_doc_number ||
                                                        "-"}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <div className="expand_content_title">
                                                      Использовалась в такси
                                                    </div>
                                                    <p>
                                                      {item?.is_taxi === "0"
                                                        ? "Нет"
                                                        : item?.is_taxi === "1"
                                                        ? "Да"
                                                        : "Нет"}
                                                    </p>
                                                  </div>
                                                </>
                                                {/*Third <></>  hide sub content*/}
                                                <>
                                                  {item?.carOwners?.length ? (
                                                    <>
                                                      <div
                                                        style={{
                                                          display: "grid",
                                                          gap: "16px",
                                                          marginTop: "16px",
                                                        }}
                                                      >
                                                        {item?.carOwners.map(
                                                          (item) => {
                                                            return (
                                                              <div
                                                                className="details_documents_container"
                                                                style={{
                                                                  background:
                                                                    isDarkTheme
                                                                      ? ""
                                                                      : "white",
                                                                }}
                                                              >
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    ФИО
                                                                  </div>
                                                                  <p>
                                                                    {
                                                                      item?.lastname
                                                                    }{" "}
                                                                    {
                                                                      item?.firstname
                                                                    }{" "}
                                                                    {
                                                                      item?.patronymic
                                                                    }
                                                                  </p>
                                                                </div>
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    Дата
                                                                    рождения
                                                                  </div>
                                                                  <p>
                                                                    {item?.dob
                                                                      ? moment(
                                                                          item?.dob,
                                                                        ).format(
                                                                          "YYYY-MM-DD",
                                                                        )
                                                                      : null}
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </>
                                                  ) : null}
                                                </>
                                              </ExpandCard>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </>
                                ) : null}
                              </>
                            );
                          },
                        )}
                      </ExpandCards>
                    </>
                  </Accordion>
                )}

                {customAnketData?.militaryInfo && (
                  <Accordion title="Воинская служба" Icon={Military}>
                    <div className="accordion_content accordion_column">
                      <div className="details_div">
                        <div className="details_label">
                          Место прохождения службы
                        </div>
                        {customAnketData?.militaryInfo.map((item) => {
                          return (
                            <p className="mb-10" key={uuid()}>
                              {item?.militaryService}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </Accordion>
                )}

                {customAnketData?.relationships && (
                  <Accordion title="Родственники" Icon={Social}>
                    <div className="accordion_content">
                      <ExpandCards>
                        <div className="expand_cards_row expand_cards_row-4">
                          {customAnketData?.relationships?.map(
                            ({ firstname, lastname, patronymic, dob }) => {
                              return (
                                <Card key={uuid()}>
                                  <div className="details_div">
                                    <div className="details_label">ФИО</div>
                                    <p>
                                      {lastname || "-"} {firstname || "-"}{" "}
                                      {patronymic || "-"}
                                    </p>
                                  </div>
                                  <div className="details_div">
                                    <div className="details_label">
                                      Дата Рождения
                                    </div>
                                    <p>{dob || "-"}</p>
                                  </div>
                                </Card>
                              );
                            },
                          )}
                        </div>
                      </ExpandCards>
                    </div>
                  </Accordion>
                )}

                {customAnketData?.fsspList && (
                  <Accordion title="Приставы" Icon={Social}>
                    <div className="accordion_content">
                      <ExpandCards>
                        <div className="expand_cards_row expand_cards_row-4">
                          {customAnketData?.fsspList?.map(
                            ({ osp, debt_amount }) => {
                              return (
                                <Card key={uuid()}>
                                  <div className="details_div">
                                    <div className="details_label">
                                      Пристав Исполнитель
                                    </div>
                                    <p>{osp || "-"}</p>
                                  </div>
                                  <div className="details_div">
                                    <div className="details_label">
                                      Сумма задолженности
                                    </div>
                                    <p>{debt_amount || "-"}</p>
                                  </div>
                                </Card>
                              );
                            },
                          )}
                        </div>
                      </ExpandCards>
                    </div>
                  </Accordion>
                )}
              </div>
            )}
          </Wrapper>
        </>
      )}
    </>
  );
};

export default CustomProfileView;
