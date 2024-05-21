import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field as FormikField, Formik, FieldArray } from "formik";
import moment from "moment";
import Wrapper from "layouts/Wrapper";
import Button from "components/app/use/Button";
import Title from "components/app/use/Title";
import Modal from "components/app/base/Modal";
import ModalSlider from "components/app/base/ModalSlider";
import Field from "components/app/input/Field";
import Loader from "components/app/use/Loader";
import Card from "components/app/base/Card";
import ExpandCards from "components/app/base/ExpandCards";
import ExpandCard from "components/app/base/ExpandCard";
import Accordion from "components/app/base/Accordion";
import ResultCounter from "components/app/use/ResultCounter";
import { ReactComponent as Phone } from "assets/images/phone.svg";
import { ReactComponent as Mail } from "assets/images/mail.svg";
import { ReactComponent as Calendar } from "assets/images/calendar.svg";
import { ReactComponent as ArrowCurved } from "assets/images/arrow_back_curved.svg";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as UserPhoto } from "assets/images/user_photo.svg";
import { ReactComponent as NoPhoto } from "assets/images/no_photo.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as Location } from "assets/images/location.svg";
import { ReactComponent as Cdek } from "assets/images/sources/cdek.svg";
import { ReactComponent as Passport } from "assets/images/passport.svg";
import { ReactComponent as Spektr } from "assets/images/spektr.svg";
import { ReactComponent as Job } from "assets/images/job.svg";
import { ReactComponent as Military } from "assets/images/military.svg";
import { ReactComponent as Save } from "assets/images/save_icon.svg";
import { ReactComponent as Cancel } from "assets/images/cancel.svg";
import { ReactComponent as Key } from "assets/images/key.svg";
import { ReactComponent as Car } from "assets/images/car.svg";
import { ReactComponent as Social } from "assets/images/social.svg";
import { ReactComponent as AngleDown } from "assets/images/angle_down.svg";
import { ReactComponent as AngleUp } from "assets/images/angle_up.svg";
import { ReactComponent as DataBase } from "assets/images/database.svg";
import { ReactComponent as Tutu } from "assets/images/sources/tutu.svg";
import { ReactComponent as AlfaIcon } from "assets/images/sources/alfa.svg";
import { ReactComponent as Sirena } from "assets/images/sources/Database_Avia.svg";
import { ReactComponent as SirenaTrain } from "assets/images/sources/sirena_train.svg";
import { ReactComponent as SirenaInsurance } from "assets/images/sources/insurance.svg";
import { ReactComponent as EgronImage } from "assets/images/sources/egron.svg";
import { ReactComponent as MTS } from "assets/images/sources/mts.svg";

import { removeEmptyKeys, removeEmptyValues } from "libs/parseApi";
import {
  getAnketById,
  updateAnketData,
} from "store/thunks/customProfileThunks";
import "pages/Users/SearchDetails/index.scss";
import { useModal } from "store/context/ModalContext";

const MyInput = ({ field, form, functionRemove, ...props }) => {
  return (
    <Field className="" {...field} {...form} {...props}>
      {functionRemove && (
        <Button
          mode="transparent"
          fill
          Icon={Trash}
          func={functionRemove}
          style={{ padding: "0 0 0 32px" }}
        />
      )}
    </Field>
  );
};
const CustomProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const cardsSpektrId = useId();
  const cardsCdekId = useId();
  const cardsAutoInfoId = useId();
  const autoId = useId();
  const cardsCarOwnersId = useId();
  const cardsCarDriversId = useId();
  const cardsSirenaPassanger = useId();
  const cardsSirenaTrain = useId();
  const cardsSirenaInsuranceInfo = useId();
  const cardKidsId = useId();
  const cardTutuPassengersId = useId();
  const cardTutuReserveUsersId = useId();
  const { isDarkTheme } = useContext(ThemeContext);
  const { customAnketData, customAnketDetails, loading } = useSelector(
    (state) => state.custom,
  );
  const [visibleAll, setVisibleAll] = useState(false);
  const [editable, setEditable] = useState(false);
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

  function removeEmptyArraysAndObjects(obj) {
    if (Array.isArray(obj)) {
      const newArray = [];
      for (const item of obj) {
        if (item !== null && item !== undefined) {
          const newItem = removeEmptyArraysAndObjects(item);
          if (newItem !== null) {
            newArray.push(newItem);
          }
        }
      }
      return newArray.length > 0 ? newArray : null; // Remove empty arrays
    } else if (typeof obj === "object" && obj !== null) {
      const newObj = {};
      let hasProperties = false;
      for (const key in obj) {
        const newValue = removeEmptyArraysAndObjects(obj[key]);
        if (newValue !== null) {
          newObj[key] = newValue;
          hasProperties = true;
        }
      }
      return hasProperties ? newObj : null; // Remove objects with no properties
    }
    return obj;
  }

  return (
    <>
      {loading && <Loader />}
      {customAnketData && (
        <Formik
          initialValues={customAnketData}
          onSubmit={async (values) => {
            const emptyKeys = removeEmptyKeys(values);
            const clearedObject = removeEmptyValues(emptyKeys);
            const removeEmptyArr = removeEmptyArraysAndObjects(clearedObject);
            await dispatch(
              updateAnketData({
                id,
                data: removeEmptyArr,
                name: values.anketName || customAnketDetails?.name,
              }),
            );
            navigate(`/custom-profile/${id}`);
          }}
          enableReinitialize={true}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(props) => {
            const {
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              dirty, //check if do some change in inputs
            } = props;
            const hasPassportFromAvto =
              values?.passportAddress || values.passport;
            const hasPassportData =
              values?.foreignPassport ||
              values?.localPassport ||
              values?.inn ||
              values?.passportIssuedBy ||
              values?.passportNumber ||
              values?.nationality ||
              values?.snils;

            const hasPassPortMerge =
              values?.localPassportArray || values?.foreignPassportArray;
            const hasAddress =
              values.userAddress ||
              values.addressArray ||
              values?.addressRegistrationDate ||
              values?.address ||
              values?.addressRegistrationDateArray ||
              values?.placeOfBirth;
            const hasRegistrationDatesAndCoordinates =
              values?.addressRegistrationDate ||
              values?.latitude ||
              values?.coordinatesArray ||
              values?.longitude ||
              values?.addressRegistrationDateArray;
            const hasSocial =
              values?.ip ||
              values?.login ||
              values?.imsi ||
              values?.password ||
              values?.sourceName ||
              values?.facebookId ||
              values?.vkId ||
              values?.getContactTags ||
              values?.relatedPhones ||
              values?.serialSim ||
              values?.numBusterTags ||
              values?.mailruProfile ||
              values?.insuranceCompany ||
              values?.insuranceNumber ||
              values?.webLink ||
              values?.someDocument ||
              values?.linkedinLink;
            const hasSpektrPersonInfo =
              values.yearOfCreation ||
              values.vin ||
              values.mark ||
              values.plateNumber;
            const hasSecretData =
              values?.departureRestrictions ||
              values?.secretAccess ||
              values?.topSecretAccessInfo ||
              values?.diplWorkPlace ||
              values?.diplSecretAccess ||
              values?.diplCountry ||
              values?.diplTopSecretInfo ||
              values?.diplTopSecretDescription;
            function removeByIndex(arr, index) {
              if (index < arr?.length) {
                const updatedArray = [...arr];
                updatedArray.splice(index, 1, " ");
                return updatedArray;
              }
              return arr;
            }
            const handleEditPhoto = (i) => {
              setFieldValue(`${visiblePhotoData?.name}.[${i}]`, "");
              const updateState = removeByIndex(visiblePhotoData.photos, i);
              setVesiblePhotoData((prevState) => ({
                ...prevState,
                photos: updateState,
              }));
            };
            const handleSaveChanges = () => {
              if (dirty) {
                openModal(
                  handleSubmit,
                  {},
                  {
                    title: "Сохранение изменений",
                    message: "Вы действительно хотите coхранить изменения?",
                    type: "saveEdit",
                  },
                );
              }
            };
            const handleCancelEdit = () => {
              if (dirty) {
                openModal(navigate, `/custom-profile/${id}`, {
                  title: "Отмена редактирования",
                  message:
                    "Вы действительно хотите отменить редактирование без сохранения изменений?",
                  type: "cancelEdit",
                });
              } else {
                navigate(`/custom-profile/${id}`);
              }
            };

            return (
              <>
                {visibleAll && (
                  <Modal
                    width="1000"
                    closeModal={() => handleVisibleALl(null)}
                    title="Все фото"
                  >
                    <ModalSlider
                      isEdit
                      allPhotos={visiblePhotoData?.photos}
                      isDarkTheme={isDarkTheme}
                      funcEdit={(i) => handleEditPhoto(i)}
                    />
                  </Modal>
                )}
                <Wrapper
                  className={`custom_profile_details kermit_details is_edit_view ${
                    isDarkTheme ? "" : "details_light"
                  }`}
                >
                  {customAnketData && (
                    <form className="details_form">
                      <div className="details_container">
                        <div className="wrapper_head">
                          <div className="head_details">
                            <Button
                              text=" "
                              Icon={ArrowCurved}
                              func={() => navigate(-1)}
                            />
                            <div className="head_title custom_head_title">
                              <div className="editable_custom_name">
                                <Field
                                  id="anketName"
                                  name={`anketName`}
                                  value={values?.anketName}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="custom_edit_date">
                                <ResultCounter
                                  text="Дата создания: "
                                  count={moment(
                                    customAnketDetails?.createdAt,
                                  ).format("YYYY-MM-DD")}
                                  countStyle={{ color: "#2C323B" }}
                                />
                                <ResultCounter
                                  text="Дата изменения: "
                                  count={moment(
                                    customAnketDetails?.updatedAt,
                                  ).format("YYYY-MM-DD")}
                                  countStyle={{ color: "#2C323B" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="head_actions">
                            <Button
                              func={handleCancelEdit}
                              type="button"
                              text="Отменить редактирование"
                              mode="secondary"
                              Icon={Cancel}
                            />
                            {dirty && (
                              <Button
                                func={handleSaveChanges}
                                type="button"
                                text="Сохранить изменения"
                                Icon={Save}
                              />
                            )}
                          </div>
                        </div>

                        <div className="details_anket">
                          <>
                            <div className="details_aside">
                              {values?.photos && (
                                <div className="details_aside_row">
                                  <div className="photo_view">
                                    {values?.avatar ? (
                                      <img
                                        src={`data:image/png;base64, ${values?.avatar} `}
                                        alt=""
                                      />
                                    ) : (
                                      <div className="no_photo_wrapper">
                                        <NoPhoto />
                                      </div>
                                    )}
                                    <Button
                                      className="edit_avatar"
                                      Icon={Trash}
                                      func={() => setFieldValue("avatar", null)}
                                    />
                                  </div>
                                  {values?.photos?.length ? (
                                    <Button
                                      text={`Все фото (${
                                        values?.photos.filter(
                                          (item) => item !== "",
                                        )?.length
                                      })`}
                                      className="view_all_photo"
                                      func={() =>
                                        handleVisibleALl({
                                          photos: values?.photos,
                                          name: "photos",
                                        })
                                      }
                                      Icon={UserPhoto}
                                    />
                                  ) : null}
                                </div>
                              )}
                              {values?.deliveryAvatar && (
                                <div className="details_aside_row">
                                  <div className="photo_view">
                                    {values?.deliveryAvatar ? (
                                      <img
                                        src={values?.deliveryAvatar[0]}
                                        alt=""
                                      />
                                    ) : (
                                      <div className="no_photo_wrapper">
                                        <NoPhoto />
                                      </div>
                                    )}
                                  </div>
                                  {values?.deliveryAvatar?.length > 1 ? (
                                    <Button
                                      text={`Доставка (${
                                        values?.deliveryAvatar.filter(
                                          (item) => item !== "",
                                        )?.length
                                      })`}
                                      className="view_all_photo"
                                      func={() =>
                                        handleVisibleALl({
                                          photos: values?.deliveryAvatar,
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
                                  {values?.gender && (
                                    <div className="details_div">
                                      <div className="details_label">Пол</div>
                                      <div className="details_div details_div-row">
                                        <div className="custom_fieldset">
                                          {values?.gender?.map(
                                            (item, index) => {
                                              return (
                                                <FieldArray name={`gender`}>
                                                  {({ remove }) => (
                                                    <FormikField
                                                      id="gender"
                                                      name={`gender[${index}]`}
                                                      component={MyInput}
                                                      functionRemove={() =>
                                                        remove(index)
                                                      }
                                                    />
                                                  )}
                                                </FieldArray>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="details_main">
                              <div className="details_grid details_grid_big">
                                {(values?.userName ||
                                  values?.potentialNames ||
                                  values?.name) && (
                                  <Card type="big">
                                    <div className="details_card_content">
                                      <div className="details_card_header">
                                        <Title
                                          Tag="h3"
                                          Icon={Profile}
                                          IconWidth="20px"
                                          IconHeight="20px"
                                        >
                                          ФИО
                                        </Title>
                                        <div className="custom_fieldset">
                                          {values?.userName?.map(
                                            (item, index) => {
                                              return (
                                                <FieldArray name="userName">
                                                  {({ remove }) => (
                                                    <FormikField
                                                      id="userName"
                                                      name={`userName[${index}]`}
                                                      component={MyInput}
                                                      functionRemove={() =>
                                                        remove(index)
                                                      }
                                                    />
                                                  )}
                                                </FieldArray>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                      {(values?.potentialNames ||
                                        values?.name) && (
                                        <div className="details_card_body">
                                          {values?.potentialNames && (
                                            <>
                                              <div
                                                className="details_card_label"
                                                style={{ marginBottom: "8px" }}
                                              >
                                                ФИО из других баз
                                              </div>
                                              <div className="custom_fieldset">
                                                {values?.potentialNames?.map(
                                                  (item, index) => {
                                                    return (
                                                      <FieldArray name="potentialNames">
                                                        {({ remove }) => (
                                                          <FormikField
                                                            id="potentialNames"
                                                            name={`potentialNames[${index}]`}
                                                            component={MyInput}
                                                            functionRemove={() =>
                                                              remove(index)
                                                            }
                                                          />
                                                        )}
                                                      </FieldArray>
                                                    );
                                                  },
                                                )}
                                              </div>
                                            </>
                                          )}
                                          {values?.name && (
                                            <>
                                              {values?.name?.map(
                                                (item, index) => {
                                                  return (
                                                    <FieldArray name="name">
                                                      {({ remove }) => (
                                                        <FormikField
                                                          id="name"
                                                          name={`name[${index}]`}
                                                          component={MyInput}
                                                          functionRemove={() =>
                                                            remove(index)
                                                          }
                                                        />
                                                      )}
                                                    </FieldArray>
                                                  );
                                                },
                                              )}
                                            </>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </Card>
                                )}

                                {values?.dob && (
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
                                        <div className="custom_fieldset">
                                          {values?.dob?.map((_, index) => {
                                            return (
                                              <FieldArray name={`dob`}>
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="dob"
                                                    name={`dob[${index}]`}
                                                    component={MyInput}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                )}
                              </div>

                              <div className="details_grid details_grid_big">
                                {values?.email && (
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
                                        <div className="custom_fieldset">
                                          {values?.email?.map((_, index) => {
                                            return (
                                              <FieldArray name={`email`}>
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="email"
                                                    name={`email[${index}]`}
                                                    component={MyInput}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                )}

                                {values?.phone && (
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
                                        <div className="custom_fieldset">
                                          {values?.phone?.map((_, index) => {
                                            return (
                                              <FieldArray name={`phone`}>
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="phone"
                                                    name={`phone[${index}]`}
                                                    component={MyInput}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                )}
                              </div>
                            </div>
                          </>
                        </div>
                      </div>

                      <div className="details_accordions">
                        {hasAddress && (
                          <Accordion title="Адреса" Icon={Location}>
                            <div className="accordion_inner">
                              {values.userAddress ||
                              values?.addressRegistrationDate ||
                              values?.placeOfBirth ? (
                                <Card>
                                  <div className="accordion_content accordion_column">
                                    {values.userAddress && (
                                      <div className="details_div custom_details_div">
                                        <div className="details_label">
                                          Адрес
                                        </div>
                                        <div className="custom_fieldset">
                                          {values.userAddress?.map(
                                            (_, index) => {
                                              return (
                                                <div className="edit_field">
                                                  <FieldArray
                                                    name={`userAddress`}
                                                  >
                                                    {({ remove }) => (
                                                      <>
                                                        <FormikField
                                                          id="userAddress"
                                                          name={`userAddress[${index}]`}
                                                          functionRemove={() =>
                                                            remove(index)
                                                          }
                                                          component={MyInput}
                                                        />
                                                      </>
                                                    )}
                                                  </FieldArray>
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    {values?.addressRegistrationDate ? (
                                      <div className="details_div custom_details_div">
                                        <div className="details_label">
                                          Дата регистрации:
                                        </div>
                                        <div className="custom_fieldset">
                                          {values?.addressRegistrationDate?.map(
                                            (item, index) => {
                                              return (
                                                <div className="edit_field">
                                                  <FieldArray
                                                    name={`addressRegistrationDate`}
                                                  >
                                                    {({ remove }) => (
                                                      <FormikField
                                                        id="addressRegistrationDate"
                                                        name={`addressRegistrationDate[${index}]`}
                                                        component={MyInput}
                                                        functionRemove={() =>
                                                          remove(index)
                                                        }
                                                      />
                                                    )}
                                                  </FieldArray>
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    ) : null}
                                    {values?.placeOfBirth && (
                                      <div className="details_div custom_details_div">
                                        <div className="details_label">
                                          Место рождения
                                        </div>
                                        <div className="custom_fieldset">
                                          {values?.placeOfBirth?.map(
                                            (_, index) => {
                                              return (
                                                <div className="edit_area">
                                                  <FormikField
                                                    id="placeOfBirth"
                                                    name={`placeOfBirth[${index}]`}
                                                    type="textArea"
                                                    component={MyInput}
                                                  />
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </Card>
                              ) : null}

                              {(values?.address ||
                                values.addressArray ||
                                hasRegistrationDatesAndCoordinates) && (
                                <div className="accordion_content accordion_content_nocard accordion_column">
                                  {values?.address && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        Адреса
                                      </div>
                                      <div className="custom_fieldset">
                                        {values.address?.map((_, index) => {
                                          return (
                                            <div className="edit_field">
                                              <FieldArray name={`address`}>
                                                {({ remove }) => (
                                                  <>
                                                    <FormikField
                                                      id="address"
                                                      name={`address[${index}]`}
                                                      functionRemove={() =>
                                                        remove(index)
                                                      }
                                                      component={MyInput}
                                                    />
                                                  </>
                                                )}
                                              </FieldArray>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                  {values.addressArray && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        Адреса с других источников
                                      </div>
                                      <div className="custom_fieldset">
                                        {values.addressArray?.map(
                                          (_, index) => {
                                            return (
                                              <div className="edit_field">
                                                <FieldArray
                                                  name={`addressArray`}
                                                >
                                                  {({ remove }) => (
                                                    <>
                                                      <FormikField
                                                        id="addressArray"
                                                        name={`addressArray[${index}]`}
                                                        functionRemove={() =>
                                                          remove(index)
                                                        }
                                                        component={MyInput}
                                                      />
                                                    </>
                                                  )}
                                                </FieldArray>
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {hasRegistrationDatesAndCoordinates && (
                                    <>
                                      {values?.addressRegistrationDateArray && (
                                        <div className="details_div custom_details_div">
                                          <div className="details_label">
                                            Дата регистрации с других
                                            источников:
                                          </div>
                                          <div className="custom_fieldset">
                                            {values?.addressRegistrationDateArray?.map(
                                              (_, index) => {
                                                return (
                                                  <div className="edit_field">
                                                    <FieldArray
                                                      name={`addressRegistrationDateArray`}
                                                    >
                                                      {({ remove }) => (
                                                        <FormikField
                                                          id="addressRegistrationDateArray"
                                                          name={`addressRegistrationDateArray[${index}]`}
                                                          component={MyInput}
                                                          functionRemove={() =>
                                                            remove(index)
                                                          }
                                                        />
                                                      )}
                                                    </FieldArray>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      {values?.latitude && (
                                        <div className="details_div custom_details_div">
                                          <div className="details_label">
                                            Широта
                                          </div>
                                          <div className="custom_fieldset">
                                            {values?.latitude?.map(
                                              (_, index) => {
                                                return (
                                                  <div className="edit_field">
                                                    <FieldArray
                                                      name={`latitude`}
                                                    >
                                                      {({ remove }) => (
                                                        <FormikField
                                                          id="latitude"
                                                          name={`latitude[${index}]`}
                                                          component={MyInput}
                                                          functionRemove={() =>
                                                            remove(index)
                                                          }
                                                        />
                                                      )}
                                                    </FieldArray>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      {values?.longitude && (
                                        <div className="details_div custom_details_div">
                                          <div className="details_label">
                                            Долгота
                                          </div>
                                          <div className="custom_fieldset">
                                            {values?.longitude?.map(
                                              (_, index) => {
                                                return (
                                                  <div className="edit_field">
                                                    <FieldArray
                                                      name={`longitude`}
                                                    >
                                                      {({ remove }) => (
                                                        <FormikField
                                                          id="longitude"
                                                          name={`longitude[${index}]`}
                                                          component={MyInput}
                                                          functionRemove={() =>
                                                            remove(index)
                                                          }
                                                        />
                                                      )}
                                                    </FieldArray>
                                                  </div>
                                                );
                                              },
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      {values?.coordinatesArray && (
                                        <div className="details_div custom_details_div">
                                          {values?.coordinatesArray?.map(
                                            (item, index) => {
                                              return (
                                                <FieldArray name="coordinatesArray">
                                                  <>
                                                    <div className="details_label">
                                                      Координаты с других анкет
                                                      Широта/Долгота
                                                    </div>
                                                    <div className="custom_fieldset">
                                                      <div className="edit_field">
                                                        <>
                                                          <FormikField
                                                            id="coordinatesArray.latitude"
                                                            name={`coordinatesArray[${index}].latitude`}
                                                            component={MyInput}
                                                          />
                                                          <FormikField
                                                            id="coordinatesArray.longitude"
                                                            name={`coordinatesArray[${index}].longitude`}
                                                            component={MyInput}
                                                          />
                                                        </>
                                                      </div>
                                                    </div>
                                                  </>
                                                </FieldArray>
                                              );
                                            },
                                          )}
                                        </div>
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
                              {values?.sourceName && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Имя источника
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.sourceName?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="sourceName">
                                            {({ remove }) => (
                                              <FormikField
                                                id="sourceName"
                                                name={`sourceName[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.relatedPhones && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Похожие телефоны
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.relatedPhones?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="relatedPhones">
                                            {({ remove }) => (
                                              <FormikField
                                                id="relatedPhones"
                                                name={`relatedPhones[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.imsi && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Идентификационный номер SIM-карты
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.imsi?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="imsi">
                                            {({ remove }) => (
                                              <FormikField
                                                id="imsi"
                                                name={`imsi[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.serialSim && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Серия SIM-карты
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.serialSim?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="serialSim">
                                            {({ remove }) => (
                                              <FormikField
                                                id="serialSim"
                                                name={`serialSim[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.ip && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">IP адрес</div>
                                  <div className="custom_fieldset">
                                    {values.ip?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="ip">
                                            {({ remove }) => (
                                              <FormikField
                                                id="ip"
                                                name={`ip[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.linkedinLink && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Профиль LinkedIn
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.linkedinLink?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="linkedinLink">
                                            {({ remove }) => (
                                              <FormikField
                                                id="linkedinLink"
                                                name={`linkedinLink[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.webLink && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Веб ссылка
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.webLink?.map((_, index) => {
                                      return (
                                        <div className="edit_row row_full mb-5">
                                          <FieldArray name="webLink">
                                            {({ remove }) => (
                                              <FormikField
                                                id="webLink"
                                                name={`webLink[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.someDocument && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Доп. документ
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.someDocument?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="someDocument">
                                            {({ remove }) => (
                                              <FormikField
                                                id="someDocument"
                                                name={`someDocument[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.login && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">Логин</div>
                                  <div className="custom_fieldset">
                                    {values.login?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="login">
                                            {({ remove }) => (
                                              <FormikField
                                                id="login"
                                                name={`login[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.getContactTags && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    GetContact Теги
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.getContactTags?.map((_, index) => {
                                      return (
                                        <div className="edit_filed">
                                          <FieldArray name="getContactTags">
                                            {({ remove }) => (
                                              <FormikField
                                                id="getContactTags"
                                                name={`getContactTags[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}{" "}
                              {values?.numBusterTags && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    NumBuster Теги
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.numBusterTags?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="numBusterTags">
                                            {({ remove }) => (
                                              <FormikField
                                                id="numBusterTags"
                                                name={`numBusterTags[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.password && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">Пароль</div>
                                  <div className="custom_fieldset">
                                    {values.password?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="password">
                                            {({ remove }) => (
                                              <FormikField
                                                id="password"
                                                name={`password[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.facebookId && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Профиль Facebook
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.facebookId?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="facebookId">
                                            {({ remove }) => (
                                              <FormikField
                                                id="facebookId"
                                                name={`facebookId[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.vkId && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Профиль Vkontakte
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.vkId?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="vkId">
                                            {({ remove }) => (
                                              <FormikField
                                                id="vkId"
                                                name={`vkId[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.mailruProfile && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Профиль Mail.ru
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.mailruProfile?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="mailruProfile">
                                            {({ remove }) => (
                                              <FormikField
                                                id="mailruProfile"
                                                name={`mailruProfile[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.insuranceCompany && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Страховая компания
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.insuranceCompany?.map(
                                      (_, index) => {
                                        return (
                                          <div className="edit_field">
                                            <FieldArray name="insuranceCompany">
                                              {({ remove }) => (
                                                <FormikField
                                                  id="insuranceCompany"
                                                  name={`insuranceCompany[${index}]`}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                  component={MyInput}
                                                />
                                              )}
                                            </FieldArray>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              )}
                              {values?.insuranceNumber && (
                                <div className="details_div custom_details_div social_details_div">
                                  <div className="details_label">
                                    Номер страховки
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.insuranceNumber?.map((_, index) => {
                                      return (
                                        <div className="edit_field">
                                          <FieldArray name="insuranceNumber">
                                            {({ remove }) => (
                                              <FormikField
                                                id="insuranceNumber"
                                                name={`insuranceNumber[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </Accordion>
                        )}

                        {(hasPassportData ||
                          hasPassportFromAvto ||
                          values?.documents) && (
                          <Accordion title="Паспортные данные" Icon={Passport}>
                            <div className="accordion_inner">
                              <div className="accordion_gap">
                                <div className="accordion_content accordion_row">
                                  {values?.inn && values?.inn !== " " && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">ИНН</div>
                                      <div className="custom_fieldset">
                                        {values?.inn?.map((item, index) => {
                                          return (
                                            <FieldArray name={`inn`}>
                                              {({ remove }) => (
                                                <FormikField
                                                  id="inn"
                                                  name={`inn[${index}]`}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                  component={MyInput}
                                                />
                                              )}
                                            </FieldArray>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                  {values?.nationality && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        Национальность
                                      </div>
                                      <div className="custom_fieldset">
                                        {values?.nationality?.map(
                                          (_, index) => {
                                            return (
                                              <FieldArray name="nationality">
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="nationality"
                                                    name={`nationality[${index}]`}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                    component={MyInput}
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {values?.snils && values?.snils !== " " && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        № Соц страхования
                                      </div>
                                      <div className="custom_fieldset">
                                        {values?.snils?.map((item, index) => {
                                          return (
                                            <FieldArray name="snils">
                                              {({ remove }) => (
                                                <FormikField
                                                  id="snils"
                                                  name={`snils[${index}]`}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                  component={MyInput}
                                                />
                                              )}
                                            </FieldArray>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                  {values?.passportIssuedBy && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        Кем выдан паспорт
                                      </div>
                                      <div className="custom_fieldset">
                                        {values?.passportIssuedBy?.map(
                                          (item, index) => {
                                            return (
                                              <FieldArray name="passportIssuedBy">
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="passportIssuedBy"
                                                    name={`passportIssuedBy[${index}]`}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                    component={MyInput}
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {values?.passportNumber && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        Номер паспорта
                                      </div>
                                      <div className="custom_fieldset">
                                        {values?.passportNumber?.map(
                                          (item, index) => {
                                            return (
                                              <FieldArray name="passportNumber">
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="passportNumber"
                                                    name={`passportNumber[${index}]`}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                    component={MyInput}
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {values?.passportAddress && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        Паспорт адрес
                                      </div>
                                      <div className="custom_fieldset">
                                        {values?.passportAddress?.map(
                                          (item, index) => {
                                            return (
                                              <FieldArray
                                                name={`passportAddress`}
                                              >
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="passportAddress"
                                                    name={`passportAddress[${index}]`}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                    component={MyInput}
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {values?.passport && (
                                    <div className="details_div custom_details_div">
                                      <div className="details_label">
                                        Паспорт
                                      </div>
                                      <div className="custom_fieldset">
                                        {values?.passport?.map(
                                          (item, index) => {
                                            return (
                                              <FieldArray name={`passport`}>
                                                {({ remove }) => (
                                                  <FormikField
                                                    id="passport"
                                                    name={`passport[${index}]`}
                                                    functionRemove={() =>
                                                      remove(index)
                                                    }
                                                    component={MyInput}
                                                  />
                                                )}
                                              </FieldArray>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {values?.documents ? (
                                  <ExpandCards>
                                    <Title
                                      style={{ marginBottom: "12px" }}
                                      Tag="h3"
                                    >
                                      Документы
                                    </Title>
                                    <div className="expand_cards_row expand_cards_row-4">
                                      {values?.documents?.map(
                                        (
                                          {
                                            dcmSerialNo,
                                            dcmNumber,
                                            dcmIssueWhere,
                                            dcmExpiryDate,
                                            dcmDate,
                                            dcmType,
                                          },
                                          index,
                                        ) => {
                                          return (
                                            <>
                                              <FieldArray name="documents">
                                                <Card>
                                                  {dcmSerialNo && (
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Серия
                                                      </div>
                                                      <FormikField
                                                        id="documents.dcmSerialNo"
                                                        name={`documents[${index}].dcmSerialNo`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  )}
                                                  {dcmNumber && (
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Номер
                                                      </div>
                                                      <FormikField
                                                        id="documents.dcmNumber"
                                                        name={`documents[${index}].dcmNumber`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  )}
                                                  {dcmType && (
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Тип
                                                      </div>
                                                      <FormikField
                                                        id="documents.dcmType"
                                                        name={`documents[${index}].dcmType`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  )}
                                                  {dcmIssueWhere && (
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Документ выдан
                                                      </div>
                                                      <FormikField
                                                        id="documents.dcmIssueWhere"
                                                        name={`documents[${index}].dcmIssueWhere`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  )}
                                                  {dcmDate && (
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Дата выдачи
                                                      </div>
                                                      <FormikField
                                                        id="documents.dcmDate"
                                                        name={`documents[${index}].dcmDate`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  )}
                                                  {dcmExpiryDate && (
                                                    <div className="details_div">
                                                      <div className="details_label">
                                                        Срок действия
                                                      </div>
                                                      <FormikField
                                                        id="documents.dcmExpiryDate"
                                                        name={`documents[${index}].dcmExpiryDate`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  )}
                                                </Card>
                                              </FieldArray>
                                            </>
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

                        {values?.workPlace && (
                          <Accordion
                            title="Место работы (база авто)"
                            Icon={Job}
                          >
                            <div className="accordion_content accordion_column">
                              {values?.workPlace && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Место работы
                                  </div>
                                  <div className="custom_fieldset">
                                    {values?.workPlace?.map((item, index) => {
                                      return (
                                        <FieldArray name={`workPlace`}>
                                          {({ remove }) => (
                                            <div className="edit_area">
                                              <FormikField
                                                id="workPlace"
                                                type="textArea"
                                                name={`workPlace[${index}]`}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                                component={MyInput}
                                              />
                                            </div>
                                            // <FormikField
                                            //   id="workPlace"
                                            //   name={`workPlace[${index}]`}
                                            //   functionRemove={() =>
                                            //     remove(index)
                                            //   }
                                            //   component={MyInput}
                                            // />
                                          )}
                                        </FieldArray>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </Accordion>
                        )}

                        {hasSecretData && (
                          <Accordion
                            title="Ограничения / Привелегии"
                            Icon={Key}
                          >
                            <div className="accordion_content accordion_row">
                              {values?.departureRestrictions && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Ограничение на выезд
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.departureRestrictions?.map(
                                      (_, index) => {
                                        return (
                                          <div className="edit_area">
                                            <FieldArray
                                              name={`departureRestrictions`}
                                            >
                                              {({ remove }) => (
                                                <FormikField
                                                  type="textArea"
                                                  id="departureRestrictions"
                                                  name={`departureRestrictions[${index}]`}
                                                  component={MyInput}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                />
                                              )}
                                            </FieldArray>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              )}
                              {values?.secretAccess && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Секретный доступ
                                  </div>
                                  <div className="custom_fieldset">
                                    {values.secretAccess?.map((_, index) => {
                                      return (
                                        <div className="edit_area">
                                          <FieldArray name={`secretAccess`}>
                                            {({ remove }) => (
                                              <FormikField
                                                type="textArea"
                                                id="secretAccess"
                                                name={`secretAccess[${index}]`}
                                                component={MyInput}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.topSecretAccessInfo && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Доступ к гос.тайне
                                  </div>
                                  <div className="custom_fieldset">
                                    {values?.topSecretAccessInfo?.map(
                                      (_, index) => {
                                        return (
                                          <div className="edit_area">
                                            <FieldArray
                                              name={`topSecretAccessInfo`}
                                            >
                                              {({ remove }) => (
                                                <FormikField
                                                  type="textArea"
                                                  id="topSecretAccessInfo"
                                                  name={`topSecretAccessInfo[${index}]`}
                                                  component={MyInput}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                />
                                              )}
                                            </FieldArray>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              )}
                              {values?.diplWorkPlace && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Дип. место работы
                                  </div>
                                  {values?.diplWorkPlace?.map((_, index) => {
                                    return (
                                      <div className="edit_area">
                                        <FieldArray name={`diplWorkPlace`}>
                                          {({ remove }) => (
                                            <FormikField
                                              type="textArea"
                                              id="diplWorkPlace"
                                              name={`diplWorkPlace[${index}]`}
                                              component={MyInput}
                                              functionRemove={() =>
                                                remove(index)
                                              }
                                            />
                                          )}
                                        </FieldArray>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              {values?.diplSecretAccess && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Доступ к дип. тайне
                                  </div>
                                  <div className="custom_fieldset">
                                    {values?.diplSecretAccess?.map(
                                      (_, index) => {
                                        return (
                                          <div className="edit_area">
                                            <FieldArray
                                              name={`diplSecretAccess`}
                                            >
                                              {({ remove }) => (
                                                <FormikField
                                                  type="textArea"
                                                  id="diplSecretAccess"
                                                  name={`diplSecretAccess[${index}]`}
                                                  component={MyInput}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                />
                                              )}
                                            </FieldArray>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              )}
                              {values?.diplCountry && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Страна дип. пребывания
                                  </div>
                                  <div className="custom_fieldset">
                                    {values?.diplCountry?.map((_, index) => {
                                      return (
                                        <div className="edit_area">
                                          <FieldArray name={`diplCountry`}>
                                            {({ remove }) => (
                                              <FormikField
                                                type="textArea"
                                                id="diplCountry"
                                                name={`diplCountry[${index}]`}
                                                component={MyInput}
                                                functionRemove={() =>
                                                  remove(index)
                                                }
                                              />
                                            )}
                                          </FieldArray>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {values?.diplTopSecretInfo && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Доступ к с.с информации
                                  </div>
                                  <div className="custom_fieldset">
                                    {values?.diplTopSecretInfo?.map(
                                      (_, index) => {
                                        return (
                                          <div className="edit_area">
                                            <FieldArray
                                              name={`diplTopSecretInfo`}
                                            >
                                              {({ remove }) => (
                                                <FormikField
                                                  type="textArea"
                                                  id="diplTopSecretInfo"
                                                  name={`diplTopSecretInfo[${index}]`}
                                                  component={MyInput}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                />
                                              )}
                                            </FieldArray>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              )}
                              {values?.diplTopSecretDescription && (
                                <div className="details_div custom_details_div">
                                  <div className="details_label">
                                    Описание к дип. тайне
                                  </div>
                                  <div className="custom_fieldset">
                                    {values?.diplTopSecretDescription?.map(
                                      (_, index) => {
                                        return (
                                          <div className="edit_area">
                                            <FieldArray
                                              name={`diplTopSecretDescription`}
                                            >
                                              {({ remove }) => (
                                                <FormikField
                                                  type="textArea"
                                                  id="diplTopSecretDescription"
                                                  name={`diplTopSecretDescription[${index}]`}
                                                  component={MyInput}
                                                  functionRemove={() =>
                                                    remove(index)
                                                  }
                                                />
                                              )}
                                            </FieldArray>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </Accordion>
                        )}
                        {values?.accounts?.length ? (
                          <Accordion title="Данные почта банк" Icon={Social}>
                            <div className="accordion_inner">
                              <div className="accordion_list">
                                {values?.accounts?.map((_, accIndex) => {
                                  return (
                                    <FieldArray name="accounts">
                                      <div className="accordion_col">
                                        <Card>
                                          <div className="accordion_col_header">
                                            <FormikField
                                              id="accounts.name"
                                              name={`accounts[${accIndex}].name`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div className="accordion_col_body">
                                            <div className="details_div">
                                              <div className="details_label">
                                                Состояние счета ₽ / валюта
                                              </div>
                                              <div className="details_table_colspan">
                                                <FormikField
                                                  id="accounts.amountRub"
                                                  name={`accounts[${accIndex}].amountRub`}
                                                  component={MyInput}
                                                />
                                                <FormikField
                                                  id="accounts.amountCur"
                                                  name={`accounts[${accIndex}].amountCur`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Card>
                                      </div>
                                    </FieldArray>
                                  );
                                })}
                              </div>
                            </div>
                          </Accordion>
                        ) : null}
                        {hasPassPortMerge && (
                          <Accordion title="Паспорта" Icon={Passport}>
                            <div className="accordion_inner">
                              <div className="accordion_list">
                                {values?.localPassportArray && (
                                  <>
                                    {values?.localPassportArray?.map(
                                      (item, index) => {
                                        return (
                                          <FieldArray name="localPassportArray">
                                            <div className="accordion_col">
                                              <Card>
                                                <div className="accordion_col_header">
                                                  <div>
                                                    <Title Tag="h4">
                                                      Паспорт РФ
                                                    </Title>
                                                  </div>
                                                </div>
                                                <div className="accordion_col_body">
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Паспорт РФ серия/номер
                                                    </div>
                                                    <div className="details_table_colspan">
                                                      <FormikField
                                                        id="localPassportArray.localPassportSeries"
                                                        name={`localPassportArray[${index}].localPassportSeries`}
                                                        component={MyInput}
                                                      />
                                                      <FormikField
                                                        id="localPassportArray.localPassportNumber"
                                                        name={`localPassportArray[${index}].localPassportNumber`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Выдан
                                                    </div>
                                                    <div className="edit_area">
                                                      <FormikField
                                                        id="localPassportArray.issuedBy"
                                                        type="textArea"
                                                        name={`localPassportArray[${index}].issuedBy`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Действителен от-до
                                                    </div>
                                                    <div className="details_table_colspan">
                                                      <FormikField
                                                        id="localPassportArray.issuedate"
                                                        name={`localPassportArray[${index}].issuedate`}
                                                        component={MyInput}
                                                      />
                                                      <FormikField
                                                        id="localPassportArray.localPassportDateOfExpiry"
                                                        name={`localPassportArray[${index}].localPassportDateOfExpiry`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </Card>
                                            </div>
                                          </FieldArray>
                                        );
                                      },
                                    )}
                                  </>
                                )}
                                {values?.foreignPassportArray && (
                                  <>
                                    {values?.foreignPassportArray?.map(
                                      (item, index) => {
                                        return (
                                          <FieldArray name="foreignPassportArray">
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
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Загран. паспорт номер
                                                    </div>
                                                    <div className="edit_field">
                                                      <FormikField
                                                        id="foreignPassportArray.foreignPassportNumber"
                                                        name={`foreignPassportArray[${index}].foreignPassportNumber`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Кем выдан
                                                    </div>
                                                    <div className="edit_area">
                                                      <FormikField
                                                        id="foreignPassportArray.department"
                                                        type="textArea"
                                                        name={`foreignPassportArray[${index}].department`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Действителен от-до
                                                    </div>
                                                    <div className="details_table_colspan">
                                                      <FormikField
                                                        id="foreignPassportArray.dateofissue"
                                                        name={`foreignPassportArray[${index}].dateofissue`}
                                                        component={MyInput}
                                                      />
                                                      <FormikField
                                                        id="foreignPassportArray.dateOfExpiry"
                                                        name={`foreignPassportArray[${index}].dateOfExpiry`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Загран MRZ1
                                                    </div>
                                                    <div className="edit_area">
                                                      <FormikField
                                                        type="textArea"
                                                        id="foreignPassportArray.mrz1"
                                                        name={`foreignPassportArray[${index}].mrz1`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="details_div custom_details_div">
                                                    <div className="details_label">
                                                      Загран MRZ2
                                                    </div>
                                                    <div className="edit_area">
                                                      <FormikField
                                                        type="textArea"
                                                        id="foreignPassportArray.mrz2"
                                                        name={`foreignPassportArray[${index}].mrz2`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </Card>
                                            </div>
                                          </FieldArray>
                                        );
                                      },
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </Accordion>
                        )}

                        {values?.jobHistory && (
                          <Accordion title="Работа" Icon={Job}>
                            <div className="accordion_inner">
                              <div className="accordion_content accordion_column">
                                <div className="details_table">
                                  {values.jobHistory?.map((job, jobIndex) => {
                                    return (
                                      <div className="details_table_row">
                                        <FieldArray name="jobHistory">
                                          {({ push, remove }) => (
                                            <>
                                              <div className="details_table_cell">
                                                <div className="details_table_label">
                                                  Место работы
                                                </div>
                                                <div className="edit_area">
                                                  <FormikField
                                                    id="jobHistory.organizationAddress"
                                                    name={`jobHistory[${jobIndex}].organizationAddress`}
                                                    type="textArea"
                                                    component={MyInput}
                                                  />
                                                </div>
                                                <div className="edit_area">
                                                  <FormikField
                                                    id="jobHistory.info"
                                                    name={`jobHistory[${jobIndex}].info`}
                                                    type="textArea"
                                                    component={MyInput}
                                                  />
                                                </div>
                                                <div className="edit_area">
                                                  <FormikField
                                                    id="jobHistory.organizationName"
                                                    name={`jobHistory[${jobIndex}].organizationName`}
                                                    type="textArea"
                                                    component={MyInput}
                                                  />
                                                </div>
                                              </div>
                                              <div className="details_table_cell">
                                                <div
                                                  className="details_table_label"
                                                  style={{
                                                    marginBottom: "4px",
                                                  }}
                                                >
                                                  Период работы
                                                </div>
                                                <div className="details_table_colspan">
                                                  <FormikField
                                                    id="jobHistory.hireDate"
                                                    name={`jobHistory[${jobIndex}].hireDate`}
                                                    component={MyInput}
                                                  />
                                                  <FormikField
                                                    id="jobHistory.fireDate"
                                                    name={`jobHistory[${jobIndex}].fireDate`}
                                                    component={MyInput}
                                                  />
                                                  <Button
                                                    style={{ padding: "10px" }}
                                                    mode="tretiary"
                                                    fill
                                                    Icon={Trash}
                                                    func={() =>
                                                      remove(jobIndex)
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </FieldArray>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </Accordion>
                        )}

                        {values?.sirenaPassenger && (
                          <Accordion title="Сирена Пасажиры" Icon={Sirena}>
                            <>
                              <ExpandCards
                                withActions
                                headTitle="Количество результатов:"
                                titleCount={values?.sirenaPassenger.length}
                              >
                                <div className="expand_cards_row expand_cards_colored_row">
                                  {values?.sirenaPassenger.map((item, i) => {
                                    const passengerId = `sirenaPassengers${i}`;

                                    return (
                                      <FieldArray name="sirenaPassenger">
                                        <div
                                          style={{
                                            marginTop: "24px",
                                          }}
                                        >
                                          <ExpandCard
                                            id={`sirenaPassenger${i}`}
                                            title={`Номер рейса: ${item.flight}`}
                                            subId={passengerId}
                                            subTitleShow="дополнительные данные"
                                          >
                                            <>
                                              <>
                                                <>
                                                  <div className="expand_content_title">
                                                    Фамилия
                                                  </div>
                                                  <FormikField
                                                    name={`sirenaPassenger[${i}].lastname`}
                                                    id="sirenaPassenger.lastname"
                                                    component={MyInput}
                                                  />
                                                </>
                                                <>
                                                  <div className="expand_content_title">
                                                    Имя
                                                  </div>
                                                  <FormikField
                                                    name={`sirenaPassenger[${i}].firstname`}
                                                    id="sirenaPassenger.firstname"
                                                    component={MyInput}
                                                  />
                                                </>
                                                <>
                                                  <div className="expand_content_title">
                                                    Отчество
                                                  </div>
                                                  <FormikField
                                                    name={`sirenaPassenger[${i}].patronymic`}
                                                    id="sirenaPassenger.patronymic"
                                                    component={MyInput}
                                                  />
                                                </>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Телефон
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaPassenger.passengerPhone"
                                                      name={`sirenaPassenger[${i}].passengerPhone`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Email
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaPassenger.passengerEmail"
                                                      name={`sirenaPassenger[${i}].passengerEmail`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                              </>
                                            </>
                                            <>
                                              <div>
                                                <div className="expand_content_title">
                                                  Дата рождения
                                                </div>
                                                <div className="edit_field">
                                                  <FormikField
                                                    name={`sirenaPassenger[${i}].dob`}
                                                    id="sirenaPassenger.dob"
                                                    component={MyInput}
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <div className="expand_content_title">
                                                  Отправление
                                                </div>
                                                <div className="edit_field">
                                                  <FormikField
                                                    id="sirenaPassenger.pointOfDeparture"
                                                    name={`sirenaPassenger[${i}].pointOfDeparture`}
                                                    component={MyInput}
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <div className="expand_content_title">
                                                  Время вылета
                                                </div>
                                                <div className="edit_field">
                                                  <FormikField
                                                    name={`sirenaPassenger[${i}].departureTime`}
                                                    id="sirenaPassenger.departureTime"
                                                    component={MyInput}
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <div className="expand_content_title">
                                                  Прибытие
                                                </div>
                                                <div className="edit_field">
                                                  <FormikField
                                                    id="sirenaPassenger.destination"
                                                    name={`sirenaPassenger[${i}].destination`}
                                                    component={MyInput}
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <div className="expand_content_title">
                                                  Дата бронирования
                                                </div>
                                                <div className="edit_field">
                                                  <FormikField
                                                    name={`sirenaPassenger[${i}].bookingTime`}
                                                    id="sirenaPassenger.bookingTime"
                                                    component={MyInput}
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <div className="expand_content_title">
                                                  Номер билета
                                                </div>
                                                <div className="edit_field">
                                                  <FormikField
                                                    id="sirenaPassenger.ticket"
                                                    name={`sirenaPassenger[${i}].ticket`}
                                                    component={MyInput}
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <div className="expand_content_title">
                                                  Номер документа / Тип
                                                  документа
                                                </div>
                                                <div className="details_table_colspan">
                                                  <FormikField
                                                    id="sirenaPassenger.docNum"
                                                    name={`sirenaPassenger[${i}].docNum`}
                                                    component={MyInput}
                                                  />
                                                  <FormikField
                                                    id="sirenaPassenger.docType"
                                                    name={`sirenaPassenger[${i}].docType`}
                                                    component={MyInput}
                                                  />
                                                </div>
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
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaPassenger.airline"
                                                      name={`sirenaPassenger[${i}].airline`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Клас обслуживания
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaPassenger.categoryFly"
                                                      name={`sirenaPassenger[${i}].categoryFly`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          </ExpandCard>
                                        </div>
                                      </FieldArray>
                                    );
                                  })}
                                </div>
                              </ExpandCards>
                            </>
                          </Accordion>
                        )}
                        {values?.sirenaTrainTicketInfo && (
                          <Accordion title="Сирена поезда" Icon={SirenaTrain}>
                            <>
                              <ExpandCards
                                withActions
                                headTitle="Количество результатов:"
                                titleCount={
                                  values?.sirenaTrainTicketInfo?.length
                                }
                              >
                                {values?.sirenaTrainTicketInfo?.map(
                                  (item, i) => {
                                    const ticketId = `sirenaTrainTicketInfo${i}`;
                                    return (
                                      <React.Fragment>
                                        <FieldArray name="sirenaTrainTicketInfo">
                                          <div
                                            className="expand_cards_row"
                                            style={{
                                              gridTemplateColumns:
                                                "repeat(2, minmax(250px, 500px))",
                                            }}
                                          >
                                            <ExpandCard
                                              id={`${cardsSirenaTrain}.sirenaTrainTicketInfo${i}`}
                                              title={`Номер брони: ${item.regnum}`}
                                              subId={ticketId}
                                              subTitleShow="дополнительные данные"
                                            >
                                              <>
                                                <div>
                                                  <>
                                                    <div className="expand_content_title">
                                                      Фамилия
                                                    </div>
                                                    <FormikField
                                                      name={`sirenaTrainTicketInfo[${i}].lastname`}
                                                      id="sirenaTrainTicketInfo.lastname"
                                                      component={MyInput}
                                                    />
                                                  </>
                                                  <>
                                                    <div className="expand_content_title">
                                                      Имя
                                                    </div>
                                                    <FormikField
                                                      name={`sirenaTrainTicketInfo[${i}].firstname`}
                                                      id="sirenaTrainTicketInfo.firstname"
                                                      component={MyInput}
                                                    />
                                                  </>
                                                  <>
                                                    <div className="expand_content_title">
                                                      Отчество
                                                    </div>
                                                    <FormikField
                                                      name={`sirenaTrainTicketInfo[${i}].patronymic`}
                                                      id="sirenaTrainTicketInfo.patronymic"
                                                      component={MyInput}
                                                    />
                                                  </>
                                                </div>
                                                <div>
                                                  <>
                                                    <div className="expand_content_title">
                                                      Телефон
                                                    </div>
                                                    <FormikField
                                                      name={`sirenaTrainTicketInfo[${i}].phone`}
                                                      id={`sirenaTrainTicketInfo.phone`}
                                                      component={MyInput}
                                                    />
                                                  </>
                                                </div>
                                              </>
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Город отправления
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaTrainTicketInfo.port_from"
                                                      name={`sirenaTrainTicketInfo[${i}].port_from`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата отправления
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      name={`sirenaTrainTicketInfo[${i}].tkt_date`}
                                                      id="sirenaTrainTicketInfo.tkt_date"
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Город прибытия
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaTrainTicketInfo.port_to"
                                                      name={`sirenaTrainTicketInfo[${i}].port_to`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Документ
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaTrainTicketInfo.pass_doc"
                                                      name={`sirenaTrainTicketInfo[${i}].pass_doc`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                              </>
                                              <>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Место
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaTrainTicketInfo.seat"
                                                      name={`sirenaTrainTicketInfo[${i}].seat`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Позиция места
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaTrainTicketInfo.seat_tier"
                                                      name={`sirenaTrainTicketInfo[${i}].seat_tier`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="details_div">
                                                  <div className="details_label">
                                                    Номер билета
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaTrainTicketInfo.ticket"
                                                      name={`sirenaTrainTicketInfo[${i}].ticket`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                              </>
                                            </ExpandCard>
                                          </div>
                                        </FieldArray>
                                        {item?.passengers && (
                                          <ExpandCards
                                            withActions
                                            titleCount={item?.regnum}
                                            headTitle="Попутчики по брони: "
                                          >
                                            <>
                                              <div className="expand_cards_row expand_cards_colored_row">
                                                {item.passengers?.map(
                                                  (_, passTicketIndex) => {
                                                    const passengerTicketId = `sirenaTrainTicketInfo${cardsSirenaPassanger}.passengers${passTicketIndex}.ticket${
                                                      item.ticket || item.regnum
                                                    }`;
                                                    return (
                                                      <FieldArray name="passengers">
                                                        <ExpandCard
                                                          id={`${cardsSirenaPassanger}.passengers[${passTicketIndex}].ticket`}
                                                          subId={
                                                            passengerTicketId
                                                          }
                                                          subTitleShow="дополнительные данные"
                                                        >
                                                          <React.Fragment>
                                                            <div>
                                                              <>
                                                                <div className="expand_content_title">
                                                                  Фамилия
                                                                </div>
                                                                <div className="edit_field">
                                                                  <FormikField
                                                                    id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].lastname`}
                                                                    name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].lastname`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                              </>
                                                              <>
                                                                <div className="expand_content_title">
                                                                  Имя
                                                                </div>
                                                                <div className="edit_field">
                                                                  <FormikField
                                                                    id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].firstname`}
                                                                    name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].firstname`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                              </>
                                                              <>
                                                                <div className="expand_content_title">
                                                                  Отчество
                                                                </div>
                                                                <div className="edit_field">
                                                                  <FormikField
                                                                    id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].patronymic`}
                                                                    name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].patronymic`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                              </>
                                                            </div>
                                                            <div>
                                                              <>
                                                                <div className="expand_content_title">
                                                                  Телефон
                                                                </div>
                                                                <FormikField
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].phone`}
                                                                  id={`sirenaTrainTicketInfo.passengers[${passTicketIndex}].phone`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </>
                                                            </div>
                                                          </React.Fragment>
                                                          <React.Fragment>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Город
                                                                отправления
                                                              </div>
                                                              <div className="edit_field">
                                                                <FormikField
                                                                  id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].port_from`}
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].port_from`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Дата отправления
                                                              </div>
                                                              <div className="edit_field">
                                                                <FormikField
                                                                  id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].tkt_date`}
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].tkt_date`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Город прибытия
                                                              </div>
                                                              <div className="edit_field">
                                                                <FormikField
                                                                  id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].port_to`}
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].port_to`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Документ
                                                              </div>
                                                              <div className="edit_field">
                                                                <FormikField
                                                                  id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].pass_doc`}
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].pass_doc`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                          </React.Fragment>
                                                          <React.Fragment>
                                                            <div className="details_div">
                                                              <div className="details_label">
                                                                Номер билета
                                                              </div>
                                                              <div className="edit_field">
                                                                <FormikField
                                                                  id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].ticket`}
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].ticket`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="details_div">
                                                              <div className="details_label">
                                                                Место
                                                              </div>
                                                              <div className="edit_field">
                                                                <FormikField
                                                                  id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].seat`}
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].seat`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="details_div">
                                                              <div className="details_label">
                                                                Позиция места
                                                              </div>
                                                              <div className="edit_field">
                                                                <FormikField
                                                                  id={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].seat_tier`}
                                                                  name={`sirenaTrainTicketInfo[${i}].passengers[${passTicketIndex}].seat_tier`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                          </React.Fragment>
                                                        </ExpandCard>
                                                      </FieldArray>
                                                    );
                                                  },
                                                )}
                                              </div>
                                            </>
                                          </ExpandCards>
                                        )}
                                      </React.Fragment>
                                    );
                                  },
                                )}
                              </ExpandCards>
                            </>
                          </Accordion>
                        )}
                        {values?.sirenaInsuranceInfo && (
                          <Accordion
                            title="Сирена страховки"
                            Icon={SirenaInsurance}
                          >
                            <>
                              <ExpandCards
                                withActions
                                headTitle="Количество результатов:"
                                titleCount={values?.sirenaInsuranceInfo.length}
                              >
                                <div
                                  className="expand_cards_row"
                                  style={{
                                    gridTemplateColumns:
                                      "repeat(2, minmax(250px, 500px))",
                                  }}
                                >
                                  {values?.sirenaInsuranceInfo?.map(
                                    (item, i) => {
                                      const insuranceId = `sirenaInsuranceInfo${i}`;
                                      return (
                                        <React.Fragment>
                                          <FieldArray name="sirenaInsuranceInfo">
                                            <ExpandCard
                                              id={`${cardsSirenaInsuranceInfo}.sirenaInsuranceInfo${i}`}
                                              title={`${item.city_from} - ${item.city_to} `}
                                              subId={insuranceId}
                                              subTitleShow="дополнительные данные"
                                            >
                                              <>
                                                <div>
                                                  <>
                                                    <div className="expand_content_title">
                                                      Фамилия
                                                    </div>
                                                    <FormikField
                                                      name={`sirenaInsuranceInfo[${i}].lastname`}
                                                      id="sirenaInsuranceInfo.lastname"
                                                      component={MyInput}
                                                    />
                                                  </>
                                                  <>
                                                    <div className="expand_content_title">
                                                      Имя
                                                    </div>
                                                    <FormikField
                                                      name={`sirenaInsuranceInfo[${i}].firstname`}
                                                      id="sirenaInsuranceInfo.firstname"
                                                      component={MyInput}
                                                    />
                                                  </>
                                                  <>
                                                    <div className="expand_content_title">
                                                      Отчество
                                                    </div>
                                                    <FormikField
                                                      name={`sirenaInsuranceInfo[${i}].patronymic`}
                                                      id="sirenaInsuranceInfo.patronymic"
                                                      component={MyInput}
                                                    />
                                                  </>
                                                </div>
                                              </>
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата бронирования
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      name={`sirenaInsuranceInfo[${i}].tkt_date`}
                                                      id="sirenaInsuranceInfo.tkt_date"
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Дата отправления
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      name={`sirenaInsuranceInfo[${i}].dep_date`}
                                                      id="sirenaInsuranceInfo.dep_date"
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Город отправления
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaInsuranceInfo.city_from"
                                                      name={`sirenaInsuranceInfo[${i}].city_from`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Город прибытия
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaInsuranceInfo.city_to"
                                                      name={`sirenaInsuranceInfo[${i}].city_to`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер документа
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaInsuranceInfo.docNumber"
                                                      name={`sirenaInsuranceInfo[${i}].docNumber`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Тип документа
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaInsuranceInfo.doctype"
                                                      name={`sirenaInsuranceInfo[${i}].doctype`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                              </>
                                              <>
                                                <div>
                                                  <div className="expand_content_title">
                                                    Номер самолета
                                                  </div>
                                                  <div className="edit_field">
                                                    <FormikField
                                                      id="sirenaInsuranceInfo.flight"
                                                      name={`sirenaInsuranceInfo[${i}].flight`}
                                                      component={MyInput}
                                                    />
                                                  </div>
                                                </div>
                                              </>
                                            </ExpandCard>
                                          </FieldArray>
                                        </React.Fragment>
                                      );
                                    },
                                  )}
                                </div>
                              </ExpandCards>
                            </>
                          </Accordion>
                        )}
                        {values?.sirenaTicketInfo ? (
                          <Accordion title="Сирена Билеты" Icon={Sirena}>
                            <ExpandCards
                              headTitle="Количество результатов:"
                              titleCount={values?.sirenaTicketInfo?.length}
                            >
                              {values?.sirenaTicketInfo?.map((item, i) => {
                                const ticketId = `sirenaTicketInfo${i}`;

                                return (
                                  <React.Fragment>
                                    <FieldArray name="sirenaTicketInfo">
                                      <div
                                        className="expand_cards_row"
                                        style={{
                                          gridTemplateColumns:
                                            "repeat(2, minmax(250px, 500px))",
                                        }}
                                      >
                                        <ExpandCard
                                          id={`${cardsSirenaPassanger}.sirenaTicketInfo${i}`}
                                          title={`Номер брони: ${item.regnum}`}
                                          subId={ticketId}
                                          subTitleShow="дополнительные данные"
                                        >
                                          <>
                                            <div>
                                              <>
                                                <div className="expand_content_title">
                                                  Фамилия
                                                </div>
                                                <FormikField
                                                  name={`sirenaTicketInfo[${i}].lastname`}
                                                  id="sirenaTicketInfo.lastname"
                                                  component={MyInput}
                                                />
                                              </>
                                              <>
                                                <div className="expand_content_title">
                                                  Имя
                                                </div>
                                                <FormikField
                                                  name={`sirenaTicketInfo[${i}].firstname`}
                                                  id="sirenaTicketInfo.firstname"
                                                  component={MyInput}
                                                />
                                              </>
                                              <>
                                                <div className="expand_content_title">
                                                  Отчество
                                                </div>
                                                <FormikField
                                                  name={`sirenaTicketInfo[${i}].patronymic`}
                                                  id="sirenaTicketInfo.patronymic"
                                                  component={MyInput}
                                                />
                                              </>
                                            </div>
                                            <div>
                                              {item?.phone && (
                                                <>
                                                  <div className="expand_content_title">
                                                    Телефон
                                                  </div>
                                                  {item?.phone?.map(
                                                    (ph, phIndex) => (
                                                      <FormikField
                                                        name={`sirenaTicketInfo[${i}].phone[${phIndex}]`}
                                                        id={`sirenaTicketInfo.phone[${phIndex}]`}
                                                        component={MyInput}
                                                      />
                                                    ),
                                                  )}
                                                </>
                                              )}
                                              {item?.email && (
                                                <>
                                                  <div className="expand_content_title">
                                                    Email
                                                  </div>
                                                  {item?.email?.map(
                                                    (_, emIndex) => (
                                                      <FormikField
                                                        name={`sirenaTicketInfo[${i}].email[${emIndex}]`}
                                                        id={`sirenaTicketInfo.email[${emIndex}]`}
                                                        component={MyInput}
                                                      />
                                                    ),
                                                  )}
                                                </>
                                              )}
                                            </div>
                                          </>
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Город вылета
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  id="sirenaTicketInfo.city_from"
                                                  name={`sirenaTicketInfo[${i}].city_from`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Дата вылета
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  name={`sirenaTicketInfo[${i}].tkt_date`}
                                                  id="sirenaTicketInfo.tkt_date"
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Город прилета
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  id="sirenaTicketInfo.city_to"
                                                  name={`sirenaTicketInfo[${i}].city_to`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Город бронирования
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  id="sirenaTicketInfo.first_city"
                                                  name={`sirenaTicketInfo[${i}].first_city`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Документ
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  id="sirenaTicketInfo.passDoc"
                                                  name={`sirenaTicketInfo[${i}].passDoc`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                          </>
                                          <>
                                            <div className="details_div">
                                              <div className="details_label">
                                                Авиакомпания
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  id="sirenaTicketInfo.airline_name"
                                                  name={`sirenaTicketInfo[${i}].airline_name`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div className="details_div">
                                              <div className="details_label">
                                                Инфо
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  id="sirenaTicketInfo.info"
                                                  name={`sirenaTicketInfo[${i}].info`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div className="details_div">
                                              <div className="details_label">
                                                Доп. инфо о месте вылета
                                              </div>
                                              <div className="edit_field">
                                                <FormikField
                                                  id="sirenaTicketInfo.farce_calt_vld_url"
                                                  name={`sirenaTicketInfo[${i}].farce_calt_vld_url`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                          </>
                                        </ExpandCard>
                                      </div>
                                    </FieldArray>
                                    {item?.relatedTickets && (
                                      <ExpandCards>
                                        <>
                                          <Title Tag="h3">{`Связанные билеты по брони: ${item?.regnum}`}</Title>
                                          <div className="expand_cards_row expand_cards_colored_row">
                                            {item.relatedTickets.map(
                                              (
                                                relatedTicketItem,
                                                relatedTicketIndex,
                                              ) => {
                                                const relatedTicketId = `sirenaTicketInfo${cardsSirenaPassanger}.relatedTickets${relatedTicketIndex}.ticket${id}`;

                                                return (
                                                  <FieldArray name="relatedTickets">
                                                    <ExpandCard
                                                      id={`${cardsSirenaPassanger}.relatedTickets[${relatedTicketIndex}].ticket`}
                                                      subId={relatedTicketId}
                                                      subTitleShow="дополнительные данные"
                                                    >
                                                      <React.Fragment>
                                                        <div>
                                                          <>
                                                            <div className="expand_content_title">
                                                              Фамилия
                                                            </div>
                                                            <div className="edit_field">
                                                              <FormikField
                                                                id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].lastname`}
                                                                name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].lastname`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                          </>
                                                          <>
                                                            <div className="expand_content_title">
                                                              Имя
                                                            </div>
                                                            <div className="edit_field">
                                                              <FormikField
                                                                id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].firstname`}
                                                                name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].firstname`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                          </>
                                                          <>
                                                            <div className="expand_content_title">
                                                              Отчество
                                                            </div>
                                                            <div className="edit_field">
                                                              <FormikField
                                                                id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].patronymic`}
                                                                name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].patronymic`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                          </>
                                                        </div>
                                                        <div>
                                                          {relatedTicketItem.phone && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Телефон
                                                              </div>
                                                              {relatedTicketItem.phone?.map(
                                                                (_, phI) => (
                                                                  <FormikField
                                                                    name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].phone[${phI}]`}
                                                                    id={`sirenaTicketInfo.relatedTickets[${relatedTicketIndex}].phone[${phI}]`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                ),
                                                              )}
                                                            </>
                                                          )}
                                                          {relatedTicketItem.email && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Email
                                                              </div>
                                                              {relatedTicketItem.email?.map(
                                                                (_, emI) => (
                                                                  <FormikField
                                                                    name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].email[${emI}]`}
                                                                    id={`sirenaTicketInfo.relatedTickets[${relatedTicketIndex}].email[${emI}]`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                ),
                                                              )}
                                                            </>
                                                          )}
                                                        </div>
                                                      </React.Fragment>
                                                      <React.Fragment>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Город вылета
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].city_from`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].city_from`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Дата вылета
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].tkt_date`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].tkt_date`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Город прилета
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].city_to`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].city_to`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Город бронирования
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].first_city`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].first_city`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Документ
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].passDoc`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].passDoc`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                      </React.Fragment>
                                                      <React.Fragment>
                                                        <div className="details_div">
                                                          <div className="details_label">
                                                            Авиакомпания
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].airline_name`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].airline_name`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                        <div className="details_div">
                                                          <div className="details_label">
                                                            Инфо
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].info`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].info`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                        <div className="details_div">
                                                          <div className="details_label">
                                                            Доп. инфо о месте
                                                            вылета
                                                          </div>
                                                          <div className="edit_field">
                                                            <FormikField
                                                              id={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].farce_calt_vld_url`}
                                                              name={`sirenaTicketInfo[${i}].relatedTickets[${relatedTicketIndex}].farce_calt_vld_url`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                      </React.Fragment>
                                                    </ExpandCard>
                                                  </FieldArray>
                                                );
                                              },
                                            )}
                                          </div>
                                        </>
                                      </ExpandCards>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </ExpandCards>
                          </Accordion>
                        ) : null}

                        {values?.cdekData && (
                          <Accordion title="CDEK" Icon={Cdek}>
                            <>
                              <ExpandCards
                                withActions
                                headTitle="Количество результатов:"
                                titleCount={values?.cdekData.length}
                              >
                                {values?.cdekData.map((item, index) => {
                                  const hasCustomer =
                                    item?.contragentName ||
                                    item?.contactPerson ||
                                    item?.phone ||
                                    item?.name ||
                                    item?.email ||
                                    item?.addressString ||
                                    item?.city;
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
                                    <div className="expand_cards_row expand_cards_colored_row">
                                      {hasCustomer && (
                                        <ExpandCard
                                          id={`edit${cardsCdekId}${item?.id}customer`}
                                          title="Данные клиента"
                                        >
                                          {/*first <></> = visible content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Имя
                                              </div>
                                              <FormikField
                                                id="cdekData.name"
                                                name={`cdekData[${index}].name`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Телефон
                                              </div>
                                              <FormikField
                                                id="cdekData.phone"
                                                name={`cdekData[${index}].phone`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Email
                                              </div>
                                              <FormikField
                                                id="cdekData.email"
                                                name={`cdekData[${index}].email`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </>
                                          {/*second <></> = hide content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Адрес
                                              </div>
                                              <FormikField
                                                id="cdekData.addressString"
                                                name={`cdekData[${index}].addressString`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Город
                                              </div>
                                              <FormikField
                                                id="cdekData.city"
                                                name={`cdekData[${index}].city`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контактное лицо
                                              </div>
                                              <FormikField
                                                id="cdekData.contactPerson"
                                                name={`cdekData[${index}].contactPerson`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контрагент
                                              </div>
                                              <FormikField
                                                id="cdekData.contragentName"
                                                name={`cdekData[${index}].contragentName`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Источник
                                              </div>
                                              <FormikField
                                                id="cdekData.sourceName"
                                                name={`cdekData[${index}].sourceName`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </>
                                        </ExpandCard>
                                      )}
                                      {hasPayer && (
                                        <ExpandCard
                                          id={`edit${cardsCdekId}${item?.id}payer`}
                                          title="Данные плательщика"
                                        >
                                          {/*first <></> = visible content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Имя
                                              </div>
                                              <FormikField
                                                id="cdekData.payerName"
                                                name={`cdekData[${index}].payerName`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Телефон
                                              </div>
                                              <FormikField
                                                id="cdekData.payerPhone"
                                                name={`cdekData[${index}].payerPhone`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Email
                                              </div>
                                              <FormikField
                                                id="cdekData.payerEmail"
                                                name={`cdekData[${index}].payerEmail`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </>
                                          {/*second <></> = hide content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Адрес
                                              </div>
                                              <FormikField
                                                id="cdekData.payerAddress"
                                                name={`cdekData[${index}].payerAddress`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Город
                                              </div>
                                              <FormikField
                                                id="cdekData.payerCity"
                                                name={`cdekData[${index}].payerCity`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контактное лицо
                                              </div>
                                              <FormikField
                                                id="cdekData.payerContactPerson"
                                                name={`cdekData[${index}].payerContactPerson`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контрагент
                                              </div>
                                              <FormikField
                                                id="cdekData.payerContragentName"
                                                name={`cdekData[${index}].payerContragentName`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </>
                                        </ExpandCard>
                                      )}
                                      {hasSender && (
                                        <ExpandCard
                                          id={`edit${cardsCdekId}${item?.id}sender`}
                                          title="Данные отправителя"
                                        >
                                          {/*first <></> = visible content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Имя
                                              </div>
                                              <FormikField
                                                id="cdekData.senderName"
                                                name={`cdekData[${index}].senderName`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Телефон
                                              </div>
                                              <FormikField
                                                id="cdekData.senderPhone"
                                                name={`cdekData[${index}].senderPhone`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Email
                                              </div>
                                              <FormikField
                                                id="cdekData.senderEmail"
                                                name={`cdekData[${index}].senderEmail`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </>
                                          {/*second <></> = hide content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Адрес
                                              </div>
                                              <FormikField
                                                id="cdekData.senderAddress"
                                                name={`cdekData[${index}].senderAddress`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Город
                                              </div>
                                              <FormikField
                                                id="cdekData.senderCity"
                                                name={`cdekData[${index}].senderCity`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контактное лицо
                                              </div>
                                              <FormikField
                                                id="cdekData.senderContactPerson"
                                                name={`cdekData[${index}].senderContactPerson`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контрагент
                                              </div>
                                              <FormikField
                                                id="cdekData.senderContragentName"
                                                name={`cdekData[${index}].senderContragentName`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </>
                                        </ExpandCard>
                                      )}
                                      {hasReceiver && (
                                        <ExpandCard
                                          title="Данные получателя"
                                          id={`edit${cardsCdekId}${item?.id}receiver`}
                                        >
                                          {/*first <></> = visible content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Имя
                                              </div>
                                              <FormikField
                                                id="cdekData.receiverName"
                                                name={`cdekData[${index}].receiverName`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Телефон
                                              </div>
                                              <FormikField
                                                id="cdekData.receiverPhone"
                                                name={`cdekData[${index}].receiverPhone`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Email
                                              </div>
                                              <FormikField
                                                id="cdekData.receiverEmail"
                                                name={`cdekData[${index}].receiverEmail`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </>
                                          {/*second <></> = hide content*/}
                                          <>
                                            <div>
                                              <div className="expand_content_title">
                                                Адрес
                                              </div>
                                              <FormikField
                                                id="cdekData.receiverAddress"
                                                name={`cdekData[${index}].receiverAddress`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Город
                                              </div>
                                              <FormikField
                                                id="cdekData.receiverCity"
                                                name={`cdekData[${index}].receiverCity`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контактное лицо
                                              </div>
                                              <FormikField
                                                id="cdekData.receiverContactPerson"
                                                name={`cdekData[${index}].receiverContactPerson`}
                                                component={MyInput}
                                              />
                                            </div>
                                            <div>
                                              <div className="expand_content_title">
                                                Контрагент
                                              </div>
                                              <FormikField
                                                id="cdekData.receiverContragentName"
                                                name={`cdekData[${index}].receiverContragentName`}
                                                component={MyInput}
                                              />
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
                        {values.autoArray && (
                          <Accordion title="Парковки" Icon={Car}>
                            <>
                              <ExpandCards>
                                <div className="expand_cards_row">
                                  {values?.autoArray?.map((item, index) => {
                                    return (
                                      <Card>
                                        <FieldArray name="autoArray">
                                          <>
                                            <div className="details_div custom_details_div">
                                              <div className="details_label">
                                                Номерной знак
                                              </div>
                                              <div className="custom_fieldset">
                                                <FormikField
                                                  id="plateNumber"
                                                  name={`autoArray[${index}].plateNumber`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div className="details_div custom_details_div">
                                              <div className="details_label">
                                                Марка
                                              </div>
                                              <div className="custom_fieldset">
                                                <FormikField
                                                  id="mark"
                                                  name={`autoArray[${index}].mark`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div className="details_div custom_details_div">
                                              <div className="details_label">
                                                Телефон
                                              </div>
                                              <div className="custom_fieldset">
                                                <FormikField
                                                  id="phone"
                                                  name={`autoArray[${index}].phone`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                          </>
                                        </FieldArray>
                                      </Card>
                                    );
                                  })}
                                </div>
                              </ExpandCards>
                            </>
                          </Accordion>
                        )}
                        {(hasSpektrPersonInfo || values?.accidents) && (
                          <Accordion title="SPEKTR" Icon={Spektr}>
                            <>
                              {hasSpektrPersonInfo && (
                                <ExpandCards>
                                  <div className="expand_cards_row">
                                    <Card>
                                      <>
                                        <div className="details_div custom_details_div">
                                          <div className="details_label">
                                            Тип участника
                                          </div>
                                          <p>Искомый участник</p>
                                        </div>
                                        {values.vin && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              VIN код
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.vin?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="vin"
                                                      name={`vin[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {values.body && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              Номер кузова
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.body?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="body"
                                                      name={`body[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {values.chassis && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              Номер шасси
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.chassis?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="chassis"
                                                      name={`chassis[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {values.engine && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              Номер двигателя
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.engine?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="engine"
                                                      name={`engine[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {values.mark && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              Автомобиль
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.mark?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="mark"
                                                      name={`mark[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {values.plateNumber && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              Номерной знак
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.plateNumber?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="plateNumber"
                                                      name={`plateNumber[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {values.yearOfCreation && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              Год выпуска
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.yearOfCreation?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="yearOfCreation"
                                                      name={`yearOfCreation[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {values.comment && (
                                          <div className="details_div custom_details_div">
                                            <div className="details_label">
                                              Комментарий
                                            </div>
                                            <div className="custom_fieldset">
                                              {values?.comment?.map(
                                                (item, index) => {
                                                  return (
                                                    <FormikField
                                                      id="comment"
                                                      name={`comment[${index}]`}
                                                      component={MyInput}
                                                    />
                                                  );
                                                },
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    </Card>
                                  </div>
                                </ExpandCards>
                              )}

                              {values?.accidents && (
                                <div className="spektr_section_content">
                                  <ExpandCards>
                                    {values?.accidents?.map(
                                      (accident, index) => {
                                        return (
                                          <div className="spektr_details">
                                            <div className="details_title">
                                              <div className="title_head">
                                                <Title Tag="h3">
                                                  {accident?.accidentType} -{" "}
                                                </Title>
                                                <Title
                                                  Tag="h3"
                                                  titleType={"title_secondary"}
                                                >
                                                  {moment(
                                                    accident.accidentDate,
                                                  ).format("YYYY-MM-DD")}
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
                                                (
                                                  participant,
                                                  participantIndex,
                                                ) => {
                                                  const uniqid = `accidents.${index}.participants${cardsSpektrId}${participantIndex}.edit`;
                                                  return (
                                                    <FieldArray
                                                      name={`accidents[${index}].participants`}
                                                    >
                                                      <ExpandCard
                                                        id={uniqid}
                                                        title={
                                                          participant.personInfo
                                                            .relation
                                                        }
                                                      >
                                                        <>
                                                          {participant
                                                            .personInfo
                                                            .relation && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Тип участника
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].personInfo.relation`}
                                                                id="participants.personInfo.relation"
                                                                // name={`participants${index}].personInfo.relation`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                          {participant
                                                            .personInfo
                                                            .surname && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Фамилия
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].personInfo.surname`}
                                                                id="participants.personInfo.surname"
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                          {participant
                                                            .personInfo
                                                            .name && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Имя
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].personInfo.name`}
                                                                id="participants.personInfo.name"
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                          {participant
                                                            .personInfo
                                                            .patronymic && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Отчество
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].personInfo.patronymic`}
                                                                id="participants.personInfo.patronymic"
                                                                // name={`participants${index}].personInfo.relation`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                          {participant
                                                            .personInfo
                                                            .birthDate && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Дата рождения
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].personInfo.birthDate`}
                                                                id="participants.personInfo.birthDate"
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                        </>
                                                        <>
                                                          {participant
                                                            .vehicleInfo
                                                            ?.vin && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                VIN код
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].vehicleInfo.vin`}
                                                                id="participants.vehicleInfo.vin"
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                          {participant
                                                            .vehicleInfo
                                                            ?.make && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Автомобиль
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].vehicleInfo.make`}
                                                                id="participants.vehicleInfo.make"
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                          {participant
                                                            .vehicleInfo
                                                            ?.plateNumber && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Номерной знак
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].vehicleInfo.plateNumber`}
                                                                id="participants.vehicleInfo.plateNumber"
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                          {participant
                                                            .vehicleInfo
                                                            ?.year && (
                                                            <>
                                                              <div className="expand_content_title">
                                                                Год выпуска
                                                              </div>
                                                              <FormikField
                                                                name={`accidents[${index}].participants[${participantIndex}].vehicleInfo.year`}
                                                                id="participants.vehicleInfo.year"
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </>
                                                          )}
                                                        </>
                                                      </ExpandCard>
                                                    </FieldArray>
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
                              )}
                            </>
                          </Accordion>
                        )}

                        {values?.jobArray && (
                          <Accordion
                            title="Место работы с других источников"
                            Icon={Job}
                          >
                            <div className="accordion_content accordion_column">
                              <div className="details_table">
                                {values.jobArray?.map((job, jobIndex) => {
                                  return (
                                    <div className="details_table_row">
                                      <FieldArray name="jobArray">
                                        {({ push, remove }) => (
                                          <>
                                            <div className="details_table_cell">
                                              <div className="details_table_label">
                                                Место работы
                                              </div>
                                              <div className="edit_area">
                                                <FormikField
                                                  id="jobArray.organizationAddress"
                                                  name={`jobArray[${jobIndex}].organizationAddress`}
                                                  type="textArea"
                                                  component={MyInput}
                                                />
                                              </div>
                                              <div className="edit_area">
                                                <FormikField
                                                  id="jobArray.info"
                                                  name={`jobArray[${jobIndex}].info`}
                                                  type="textArea"
                                                  component={MyInput}
                                                />
                                              </div>
                                              <div className="edit_area">
                                                <FormikField
                                                  id="jobArray.organizationName"
                                                  name={`jobArray[${jobIndex}].organizationName`}
                                                  type="textArea"
                                                  component={MyInput}
                                                />
                                              </div>
                                            </div>
                                            <div className="details_table_cell">
                                              <div
                                                className="details_table_label"
                                                style={{ marginBottom: "4px" }}
                                              >
                                                Период работы
                                              </div>
                                              <div className="details_table_colspan">
                                                <FormikField
                                                  id="jobArray.hireDate"
                                                  name={`jobArray[${jobIndex}].hireDate`}
                                                  component={MyInput}
                                                />
                                                <FormikField
                                                  id="jobArray.fireDate"
                                                  name={`jobArray[${jobIndex}].fireDate`}
                                                  component={MyInput}
                                                />
                                                <Button
                                                  iconStyle="red"
                                                  fill
                                                  Icon={Trash}
                                                  func={() => remove(jobIndex)}
                                                />
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </FieldArray>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Accordion>
                        )}

                        {values?.estates && (
                          <Accordion title="ЕГРОН" Icon={EgronImage}>
                            <div className="accordion_inner">
                              <div className="accordion_gap">
                                <div className="accordion_content">
                                  {values?.estates?.map((item, estateIndex) => {
                                    return (
                                      <>
                                        <FieldArray name="estates">
                                          <>
                                            <Card>
                                              <div className="details_div">
                                                <div className="details_label">
                                                  Кадастровый номер
                                                </div>
                                                <FormikField
                                                  id="estates.cadNumber"
                                                  name={`estates[${estateIndex}].cadNumber`}
                                                  component={MyInput}
                                                />
                                              </div>
                                              <div className="details_div">
                                                <div className="details_label">
                                                  Площадь
                                                </div>
                                                <FormikField
                                                  id="estates.area"
                                                  name={`estates[${estateIndex}].area`}
                                                  component={MyInput}
                                                />
                                              </div>
                                              <div className="details_div">
                                                <div className="details_label">
                                                  Адрес
                                                </div>
                                                <FormikField
                                                  id="estates.address"
                                                  name={`estates[${estateIndex}].address`}
                                                  component={MyInput}
                                                />
                                              </div>
                                              <div className="details_div">
                                                <div className="details_label">
                                                  Стоимость ₽
                                                </div>
                                                <FormikField
                                                  id="estates.price"
                                                  name={`estates[${estateIndex}].price`}
                                                  component={MyInput}
                                                />
                                              </div>
                                            </Card>
                                            {item.history && (
                                              <Accordion
                                                title="Действия по объекту"
                                                titleTag="h4"
                                              >
                                                <ExpandCards
                                                  withActions
                                                  headTitle="К-во действий по объекту:"
                                                  titleCount={
                                                    item.history.length
                                                  }
                                                >
                                                  <div className="accordion_content expand_cards_row expand_cards_row-4">
                                                    {item?.history.map(
                                                      (
                                                        element,
                                                        historyIndex,
                                                      ) => {
                                                        const histroyId = `estates${estateIndex}-${historyIndex}.history`;

                                                        return (
                                                          <FieldArray name="history">
                                                            <ExpandCard
                                                              id={histroyId}
                                                            >
                                                              <>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Фамилия
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].lastname`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].lastname`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Имя
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].firstname`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].firstname`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Отчество
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].patronymic`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].patronymic`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Дата сделки
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].dateFrom`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].dateFrom`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Тип сделки
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].dealType`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].dealType`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Тип площади
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].objectType`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].objectType`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Статус
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].status`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].status`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                              </>
                                                              <>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    № Соц
                                                                    страхования
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].snils`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].snils`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Серия
                                                                    Документа
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].document_series`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].document_series`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Номер
                                                                    Документа
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].document_number`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].document_number`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <div className="expand_content_title">
                                                                    Банк
                                                                    кредитор
                                                                  </div>
                                                                  <FormikField
                                                                    name={`estates[${estateIndex}].history[${historyIndex}].banks`}
                                                                    id={`estates[${estateIndex}].history[${historyIndex}].banks`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                              </>
                                                            </ExpandCard>
                                                          </FieldArray>
                                                        );
                                                      },
                                                    )}
                                                  </div>
                                                </ExpandCards>
                                              </Accordion>
                                            )}
                                          </>
                                        </FieldArray>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </Accordion>
                        )}

                        {values?.insurancePolicies && (
                          <Accordion title="Данные по авто(new)" Icon={Car}>
                            <div className="accordion_content accordion_column">
                              {values?.insurancePolicies?.map((item, index) => {
                                return (
                                  <FieldArray name="insurancePolicies">
                                    <div className="flex_details details_bg">
                                      {item.vin && (
                                        <>
                                          <div className="item_title">
                                            VIN код
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.vin"
                                              name={`insurancePolicies[${index}].vin`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item.vin}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.licensePlate && (
                                        <>
                                          <div className="item_title">
                                            Номерной знак
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.licensePlate"
                                              name={`insurancePolicies[${index}].licensePlate`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.licensePlate}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.brandName && (
                                        <>
                                          <div className="item_title">
                                            Марка авто
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.brandName"
                                              name={`insurancePolicies[${index}].brandName`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.brandName}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.modelCar && (
                                        <>
                                          <div className="item_title">
                                            Модель авто
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.modelCar"
                                              name={`insurancePolicies[${index}].modelCar`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.modelCar}</p>
                                          )}
                                        </>
                                      )}

                                      {item?.chassisNumber && (
                                        <>
                                          <div className="item_title">
                                            Номер шасси
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.chassisNumber"
                                              name={`insurancePolicies[${index}].chassisNumber`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.chassisNumber}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.bodyNumber && (
                                        <>
                                          <div className="item_title">
                                            Номер кузова
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.bodyNumber"
                                              name={`insurancePolicies[${index}].bodyNumber`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.bodyNumber}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.year_issue && (
                                        <>
                                          <div className="item_title">
                                            Год выпуска
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.year_issue"
                                              name={`insurancePolicies[${index}].year_issue`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.year_issue}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.enginePower && (
                                        <>
                                          <div className="item_title">
                                            К-во лошадиных сил
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.enginePower"
                                              name={`insurancePolicies[${index}].enginePower`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.enginePower}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.vehDocSerial && (
                                        <>
                                          <div className="item_title">
                                            Cерия документа на ТС
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.vehDocSerial"
                                              name={`insurancePolicies[${index}].vehDocSerial`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.vehDocSerial}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.docType && (
                                        <>
                                          <div className="item_title">
                                            Тип документа
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.docType"
                                              name={`insurancePolicies[${index}].docType`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.docType}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.docNumber && (
                                        <>
                                          <div className="item_title">
                                            Номер документа
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.docNumber"
                                              name={`insurancePolicies[${index}].docNumber`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.docNumber}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.docSerial && (
                                        <>
                                          <div className="item_title">
                                            Серия документа
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.docSerial"
                                              name={`insurancePolicies[${index}].docSerial`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.docSerial}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.policy_unq_id && (
                                        <>
                                          <div className="item_title">
                                            Уникальный номер СП
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.policy_unq_id"
                                              name={`insurancePolicies[${index}].policy_unq_id`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.policy_unq_id}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.insCompany && (
                                        <>
                                          <div className="item_title">
                                            Страховщик
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.insCompany"
                                              name={`insurancePolicies[${index}].insCompany`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.insCompany}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.isPolicyOwner && (
                                        <>
                                          <div className="item_title">
                                            Является владельцем страхового
                                            полиса
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.isPolicyOwner"
                                              name={`insurancePolicies[${index}].isPolicyOwner`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.isPolicyOwner}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.policyCreateDate && (
                                        <>
                                          <div className="item_title">
                                            Страховой полис дата от
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.policyCreateDate"
                                              name={`insurancePolicies[${index}].policyCreateDate`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>
                                              {moment(
                                                item.policyCreateDate,
                                              ).format("YYYY-MM-DD") || "-"}
                                            </p>
                                          )}
                                        </>
                                      )}
                                      {item?.policyEndDate && (
                                        <>
                                          <div className="item_title">
                                            Страховой полис дата до
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.policyEndDate"
                                              name={`insurancePolicies[${index}].policyEndDate`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>
                                              {moment(
                                                item?.policyEndDate,
                                              ).format("YYYY-MM-DD") || "-"}
                                            </p>
                                          )}
                                        </>
                                      )}
                                      {item?.isCarOwner && (
                                        <>
                                          <div className="item_title">
                                            Является владельцем авто
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.isCarOwner"
                                              name={`insurancePolicies[${index}].isCarOwner`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.isCarOwner}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.isDriver && (
                                        <>
                                          <div className="item_title">
                                            Водитель
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.isDriver"
                                              name={`insurancePolicies[${index}].isDriver`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.isDriver}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.contractType && (
                                        <>
                                          <div className="item_title">
                                            Тип договора
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.contractType"
                                              name={`insurancePolicies[${index}].contractType`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.contractType}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.isCarOwner && (
                                        <>
                                          <div className="item_title">
                                            Является владельцем авто
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.isCarOwner"
                                              name={`insurancePolicies[${index}].isCarOwner`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.isCarOwner}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.bsoFullNum && (
                                        <>
                                          <div className="item_title">
                                            Бланк строгой отчетности
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.bsoFullNum"
                                              name={`insurancePolicies[${index}].bsoFullNum`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.bsoFullNum}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.isRestrict && (
                                        <>
                                          <div className="item_title">
                                            Ограничения
                                          </div>
                                          {editable ? (
                                            <FormikField
                                              id="insurancePolicies.isRestrict"
                                              name={`insurancePolicies[${index}].isRestrict`}
                                              component={MyInput}
                                            />
                                          ) : (
                                            <p>{item?.isRestrict}</p>
                                          )}
                                        </>
                                      )}
                                      {item?.lastname && (
                                        <>
                                          <div className="item_title">
                                            Фамилия
                                          </div>
                                          <p>{item?.lastname}</p>
                                        </>
                                      )}
                                      {item?.firstname && (
                                        <>
                                          <div className="item_title">Имя</div>
                                          <p>{item?.firstname}</p>
                                        </>
                                      )}
                                      {item?.patronymic && (
                                        <>
                                          <div className="item_title">
                                            Отчество
                                          </div>
                                          <p>{item?.patronymic}</p>
                                        </>
                                      )}
                                    </div>
                                  </FieldArray>
                                );
                              })}
                            </div>
                          </Accordion>
                        )}
                        {values.alfa && (
                          <Accordion title="Альфа-банк" Icon={AlfaIcon}>
                            <ExpandCards>
                              {values.alfa.map((item, alfaIndex) => {
                                return (
                                  <div
                                    className="expand_cards_row expand_cards_colored_row"
                                    style={{ display: "block" }}
                                  >
                                    {item?.cards?.length ? (
                                      <>
                                        <Title
                                          style={{ marginBottom: "12px" }}
                                          Tag="h3"
                                        >
                                          Карты
                                        </Title>

                                        <div className="expand_cards_row">
                                          {item?.cards.map(
                                            (item, cardIndex) => {
                                              const alfaId = `custom-edit-alfa${alfaIndex}-${cardIndex}.cards`;

                                              return (
                                                <FieldArray name="cards">
                                                  <div
                                                    style={{
                                                      marginTop: "24px",
                                                    }}
                                                  >
                                                    <ExpandCard id={alfaId}>
                                                      <>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Номер карты
                                                          </div>
                                                          <FormikField
                                                            id={`alfa[${alfaIndex}].cards[${cardIndex}].cardnum_ccode`}
                                                            name={`alfa[${alfaIndex}].cards[${cardIndex}].cardnum_ccode`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Номер счета
                                                          </div>
                                                          <FormikField
                                                            id={`alfa[${alfaIndex}]cards[${cardIndex}].account_number`}
                                                            name={`alfa[${alfaIndex}]cards[${cardIndex}].account_number`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                      </>
                                                      <>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Владелец
                                                          </div>
                                                          <FormikField
                                                            id={`alfa[${alfaIndex}].firstname`}
                                                            name={`alfa[${alfaIndex}].firstname`}
                                                            component={MyInput}
                                                          />
                                                          <FormikField
                                                            id={`alfa[${alfaIndex}].lastname`}
                                                            name={`alfa[${alfaIndex}].lastname`}
                                                            component={MyInput}
                                                          />
                                                          <FormikField
                                                            id={`alfa[${alfaIndex}].patronymic`}
                                                            name={`alfa[${alfaIndex}].patronymic`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Дата рождения
                                                          </div>
                                                          <FormikField
                                                            id={`alfa[${alfaIndex}].dob`}
                                                            name={`alfa[${alfaIndex}].dob`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Дата истечения срока
                                                            карты
                                                          </div>
                                                          <FormikField
                                                            id={`alfa[${alfaIndex}]cards[${cardIndex}].expire_date`}
                                                            name={`alfa[${alfaIndex}]cards[${cardIndex}].expire_date`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                      </>
                                                    </ExpandCard>
                                                  </div>
                                                </FieldArray>
                                              );
                                            },
                                          )}
                                        </div>
                                      </>
                                    ) : null}
                                    {item?.phone?.length ? (
                                      <>
                                        <Title
                                          style={{ marginBottom: "12px" }}
                                          Tag="h3"
                                        >
                                          Телефоны
                                        </Title>

                                        <div className="expand_cards_row">
                                          <Card>
                                            {item?.phone.map(
                                              (item, phoneIndex) => {
                                                return (
                                                  <FieldArray name="phones">
                                                    <div className="details_div">
                                                      <FormikField
                                                        id={`alfa[${alfaIndex}].phone[${phoneIndex}]`}
                                                        name={`alfa[${alfaIndex}].phone[${phoneIndex}]`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </FieldArray>
                                                );
                                              },
                                            )}
                                          </Card>
                                        </div>
                                      </>
                                    ) : null}
                                    {item?.email?.length ? (
                                      <>
                                        <Title
                                          style={{ marginBottom: "12px" }}
                                          Tag="h3"
                                        >
                                          Почты
                                        </Title>

                                        <div className="expand_cards_row">
                                          <Card>
                                            {item?.email.map(
                                              (item, emailIndex) => {
                                                return (
                                                  <FieldArray name="emails">
                                                    <div className="details_div">
                                                      <FormikField
                                                        id={`alfa[${alfaIndex}].email[${emailIndex}]`}
                                                        name={`alfa[${alfaIndex}].email[${emailIndex}]`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </FieldArray>
                                                );
                                              },
                                            )}
                                          </Card>
                                        </div>
                                      </>
                                    ) : null}
                                  </div>
                                );
                              })}
                            </ExpandCards>
                          </Accordion>
                        )}

                        {values.mtsBank && (
                          <Accordion title="МТС-банк" Icon={MTS}>
                            <ExpandCards>
                              {values.mtsBank.map((item, mtsIndex) => {
                                return (
                                  <div
                                    className="expand_cards_row expand_cards_colored_row"
                                    style={{ display: "block" }}
                                  >
                                    {item?.cards?.length ? (
                                      <>
                                        <Title
                                          style={{ marginBottom: "12px" }}
                                          Tag="h3"
                                        >
                                          Карты
                                        </Title>

                                        <div className="expand_cards_row">
                                          {item?.cards.map(
                                            (item, cardIndex) => {
                                              const alfaId = `custom-edit-alfa${mtsIndex}-${cardIndex}.cards`;

                                              return (
                                                <FieldArray name="cards">
                                                  <div
                                                    style={{
                                                      marginTop: "24px",
                                                    }}
                                                  >
                                                    <ExpandCard id={alfaId}>
                                                      <>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Номер карты
                                                          </div>
                                                          <FormikField
                                                            id={`mtsBank[${mtsIndex}].cards[${cardIndex}].cardNumber`}
                                                            name={`mtsBank[${mtsIndex}].cards[${cardIndex}].cardNumber`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Тип карты
                                                          </div>
                                                          <FormikField
                                                            id={`mtsBank[${mtsIndex}].cards[${cardIndex}].cardType`}
                                                            name={`mtsBank[${mtsIndex}].cards[${cardIndex}].cardType`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                      </>
                                                      <>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Дата выдачи
                                                          </div>
                                                          <FormikField
                                                            id={`mtsBank[${mtsIndex}]cards[${cardIndex}].issueDate`}
                                                            name={`mtsBank[${mtsIndex}]cards[${cardIndex}].issueDate`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                        <div>
                                                          <div className="expand_content_title">
                                                            Дата истечения срока
                                                          </div>
                                                          <FormikField
                                                            id={`mtsBank[${mtsIndex}]cards[${cardIndex}].expiryDate`}
                                                            name={`mtsBank[${mtsIndex}]cards[${cardIndex}].expiryDate`}
                                                            component={MyInput}
                                                          />
                                                        </div>
                                                      </>
                                                    </ExpandCard>
                                                  </div>
                                                </FieldArray>
                                              );
                                            },
                                          )}
                                        </div>
                                      </>
                                    ) : null}
                                    {item?.phone?.length ? (
                                      <>
                                        <Title
                                          style={{ marginBottom: "12px" }}
                                          Tag="h3"
                                        >
                                          Телефоны
                                        </Title>

                                        <div className="expand_cards_row">
                                          <Card>
                                            {item?.phone.map(
                                              (item, phoneIndex) => {
                                                return (
                                                  <FieldArray name="phones">
                                                    <div className="details_div">
                                                      <FormikField
                                                        id={`mtsBank[${mtsIndex}].phone[${phoneIndex}]`}
                                                        name={`mtsBank[${mtsIndex}].phone[${phoneIndex}]`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </FieldArray>
                                                );
                                              },
                                            )}
                                          </Card>
                                        </div>
                                      </>
                                    ) : null}
                                    {item?.email?.length ? (
                                      <>
                                        <Title
                                          style={{ marginBottom: "12px" }}
                                          Tag="h3"
                                        >
                                          Почты
                                        </Title>

                                        <div className="expand_cards_row">
                                          <Card>
                                            {item?.email.map(
                                              (item, emailIndex) => {
                                                return (
                                                  <FieldArray name="emails">
                                                    <div className="details_div">
                                                      <FormikField
                                                        id={`mtsBank[${mtsIndex}].email[${emailIndex}]`}
                                                        name={`mtsBank[${mtsIndex}].email[${emailIndex}]`}
                                                        component={MyInput}
                                                      />
                                                    </div>
                                                  </FieldArray>
                                                );
                                              },
                                            )}
                                          </Card>
                                        </div>
                                      </>
                                    ) : null}
                                  </div>
                                );
                              })}
                            </ExpandCards>
                          </Accordion>
                        )}
                        {values?.kids?.length ? (
                          <Accordion Icon={DataBase} title="Гос услуги(Дети)">
                            <ExpandCards withActions>
                              <div className="expand_cards_row expand_cards_row-4">
                                {values?.kids?.map((item, i) => {
                                  return (
                                    <FieldArray name={`kids`}>
                                      <ExpandCard
                                        id={`kidsData${i}${cardKidsId}`}
                                      >
                                        {/*first <></> = visible content*/}
                                        <>
                                          <div>
                                            <div className="expand_content_title">
                                              ФИО
                                            </div>
                                            <FormikField
                                              id={`kids[${i}].lastname`}
                                              name={`kids[${i}].lastname`}
                                              component={MyInput}
                                            />
                                            <FormikField
                                              id={`kids[${i}].firstname`}
                                              name={`kids[${i}].firstname`}
                                              component={MyInput}
                                            />
                                            <FormikField
                                              id={`kids[${i}].patronymic`}
                                              name={`kids[${i}].patronymic`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              Дата рождения
                                            </div>
                                            <FormikField
                                              id={`kids[${i}].dob`}
                                              name={`kids[${i}].dob`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </>

                                        {/*second <></> = hide content*/}
                                        <>
                                          <div>
                                            <div className="expand_content_title">
                                              ИНН
                                            </div>
                                            <FormikField
                                              id={`kids[${i}].inn`}
                                              name={`kids[${i}].inn`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              № Соц страхования
                                            </div>
                                            <FormikField
                                              id={`kids[${i}].snils`}
                                              name={`kids[${i}].snils`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </>
                                      </ExpandCard>
                                    </FieldArray>
                                  );
                                })}
                              </div>
                            </ExpandCards>
                          </Accordion>
                        ) : null}
                        {values?.tutuPassengers?.length ? (
                          <Accordion Icon={Tutu} title="Tutu пользователи">
                            <ExpandCards withActions>
                              <div className="expand_cards_row expand_cards_row-4">
                                {values?.tutuPassengers?.map((item, i) => {
                                  return (
                                    <FieldArray name={`tutuPassengers`}>
                                      <ExpandCard
                                        id={`tutuPassengersData${i}${cardTutuPassengersId}`}
                                      >
                                        {/*first <></> = visible content*/}
                                        <>
                                          <div>
                                            <div className="expand_content_title">
                                              ФИО
                                            </div>
                                            <FormikField
                                              id={`tutuPassengers[${i}].lastname`}
                                              name={`tutuPassengers[${i}].lastname`}
                                              component={MyInput}
                                            />
                                            <FormikField
                                              id={`tutuPassengers[${i}].firstname`}
                                              name={`tutuPassengers[${i}].firstname`}
                                              component={MyInput}
                                            />
                                            <FormikField
                                              id={`tutuPassengers[${i}].patronymic`}
                                              name={`tutuPassengers[${i}].patronymic`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              Дата рождения
                                            </div>
                                            <FormikField
                                              id={`tutuPassengers[${i}].dob`}
                                              name={`tutuPassengers[${i}].dob`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </>

                                        {/*second <></> = hide content*/}
                                        <>
                                          <div>
                                            <div className="expand_content_title">
                                              Место рождения
                                            </div>
                                            <FormikField
                                              id={`tutuPassengers[${i}].placeOfBirth`}
                                              name={`tutuPassengers[${i}].placeOfBirth`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              Номер документа
                                            </div>
                                            <FormikField
                                              id={`tutuPassengers[${i}].dcmNumber`}
                                              name={`tutuPassengers[${i}].dcmNumber`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              Тип документа
                                            </div>
                                            <FormikField
                                              id={`tutuPassengers[${i}].dcmType`}
                                              name={`tutuPassengers[${i}].dcmType`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </>
                                      </ExpandCard>
                                    </FieldArray>
                                  );
                                })}
                              </div>
                            </ExpandCards>
                          </Accordion>
                        ) : null}
                        {values?.tutuReserveUsers?.length ? (
                          <Accordion Icon={Tutu} title="Tutu пассажиры">
                            <ExpandCards withActions>
                              <div className="expand_cards_row expand_cards_row-4">
                                {values?.tutuReserveUsers?.map((item, i) => {
                                  return (
                                    <FieldArray name={`tutuReserveUsers`}>
                                      <ExpandCard
                                        id={`tutuReserveUsersData${i}${cardTutuReserveUsersId}`}
                                      >
                                        {/*first <></> = visible content*/}
                                        <>
                                          <div>
                                            <div className="expand_content_title">
                                              ФИО
                                            </div>
                                            <FormikField
                                              id={`tutuReserveUsers[${i}].lastname`}
                                              name={`tutuReserveUsers[${i}].lastname`}
                                              component={MyInput}
                                            />
                                            <FormikField
                                              id={`tutuReserveUsers[${i}].firstname`}
                                              name={`tutuReserveUsers[${i}].firstname`}
                                              component={MyInput}
                                            />
                                            <FormikField
                                              id={`tutuReserveUsers[${i}].patronymic`}
                                              name={`tutuReserveUsers[${i}].patronymic`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              Дата рождения
                                            </div>
                                            <FormikField
                                              id={`tutuReserveUsers[${i}].dob`}
                                              name={`tutuReserveUsers[${i}].dob`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </>

                                        {/*second <></> = hide content*/}
                                        <>
                                          <div>
                                            <div className="expand_content_title">
                                              Email
                                            </div>
                                            <FormikField
                                              id={`tutuReserveUsers[${i}].email`}
                                              name={`tutuReserveUsers[${i}].email`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              Телефон
                                            </div>
                                            <FormikField
                                              id={`tutuReserveUsers[${i}].phone`}
                                              name={`tutuReserveUsers[${i}].phone`}
                                              component={MyInput}
                                            />
                                          </div>
                                          <div>
                                            <div className="expand_content_title">
                                              Билет куплен для
                                            </div>
                                            <FormikField
                                              id={`tutuReserveUsers[${i}].reservedFor`}
                                              name={`tutuReserveUsers[${i}].reservedFor`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </>
                                      </ExpandCard>
                                    </FieldArray>
                                  );
                                })}
                              </div>
                            </ExpandCards>
                          </Accordion>
                        ) : null}
                        {values.newAuto && (
                          <Accordion title="Данные по авто(new)" Icon={Car}>
                            <>
                              <ExpandCards>
                                {values.newAuto?.map(
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
                                                  <FieldArray name={"autoInfo"}>
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
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].vin`}
                                                              name={`newAuto[${i}]autoInfo[${index}].vin`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
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
                                                              <FormikField
                                                                id={`newAuto[${i}]autoInfo[${index}].license_plate`}
                                                                name={`newAuto[${i}]autoInfo[${index}].license_plate`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Год выпуска
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]autoInfo[${index}].yearIssue`}
                                                                name={`newAuto[${i}]autoInfo[${index}].yearIssue`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Марка
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]autoInfo[${index}].brand`}
                                                                name={`newAuto[${i}]autoInfo[${index}].brand`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Модель
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]autoInfo[${index}].model`}
                                                                name={`newAuto[${i}]autoInfo[${index}].model`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
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
                                                              <FormikField
                                                                id={`newAuto[${i}]autoInfo[${index}].mark_model_other`}
                                                                name={`newAuto[${i}]autoInfo[${index}].mark_model_other`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                          )}
                                                          <div>
                                                            <div className="expand_content_title">
                                                              Мощность двигателя
                                                            </div>
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].enginePower`}
                                                              name={`newAuto[${i}]autoInfo[${index}].enginePower`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                          <div>
                                                            <div className="expand_content_title">
                                                              Номер шасси
                                                            </div>
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].chassis_number`}
                                                              name={`newAuto[${i}]autoInfo[${index}].chassis_number`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                          <div>
                                                            <div className="expand_content_title">
                                                              Номер кузова
                                                            </div>
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].body_number`}
                                                              name={`newAuto[${i}]autoInfo[${index}].body_number`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                          <div className="expand_content_divider"></div>
                                                          <div>
                                                            <div className="expand_content_title">
                                                              Дата выдачи
                                                              документа на ТС
                                                            </div>
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].veh_doc_date`}
                                                              name={`newAuto[${i}]autoInfo[${index}].veh_doc_date`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                          <div>
                                                            <div className="expand_content_title">
                                                              Серия документа на
                                                              ТС
                                                            </div>
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].veh_doc_serial`}
                                                              name={`newAuto[${i}]autoInfo[${index}].veh_doc_serial`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                          <div>
                                                            <div className="expand_content_title">
                                                              Номер документа на
                                                              ТС
                                                            </div>
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].veh_doc_number`}
                                                              name={`newAuto[${i}]autoInfo[${index}].veh_doc_number`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                          <div className="expand_content_divider"></div>
                                                          <div>
                                                            <div className="expand_content_title">
                                                              Использовалась в
                                                              такси
                                                            </div>
                                                            <FormikField
                                                              id={`newAuto[${i}]autoInfo[${index}].is_taxi`}
                                                              name={`newAuto[${i}]autoInfo[${index}].is_taxi`}
                                                              component={
                                                                MyInput
                                                              }
                                                            />
                                                          </div>
                                                        </>
                                                      </ExpandCard>
                                                    </div>
                                                  </FieldArray>
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
                                                  {owners?.map(
                                                    (item, index) => {
                                                      const id = `owner${autoId}${index}`;
                                                      return (
                                                        <FieldArray name="owners">
                                                          <div className="accordion_col accordion_col_auto">
                                                            <Card>
                                                              <div
                                                                style={{
                                                                  display:
                                                                    "flex",
                                                                  flexDirection:
                                                                    "column",
                                                                  gap: "8px",
                                                                }}
                                                              >
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    ФИО
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      display:
                                                                        "flex",
                                                                      flexDirection:
                                                                        "column",
                                                                      gap: "8px",
                                                                    }}
                                                                  >
                                                                    <FormikField
                                                                      id={`newAuto[${i}]owners[${index}].lastname`}
                                                                      name={`newAuto[${i}]owners[${index}].lastname`}
                                                                      component={
                                                                        MyInput
                                                                      }
                                                                    />
                                                                    <FormikField
                                                                      id={`newAuto[${i}]owners[${index}].firstname`}
                                                                      name={`newAuto[${i}]owners[${index}].firstname`}
                                                                      component={
                                                                        MyInput
                                                                      }
                                                                    />
                                                                    <FormikField
                                                                      id={`newAuto[${i}]owners[${index}].patronymic`}
                                                                      name={`newAuto[${i}]owners[${index}].patronymic`}
                                                                      component={
                                                                        MyInput
                                                                      }
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    Дата
                                                                    рождения
                                                                  </div>
                                                                  <FormikField
                                                                    id={`newAuto[${i}]owners[${index}].dob`}
                                                                    name={`newAuto[${i}]owners[${index}].dob`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                {item?.documents
                                                                  ?.length ? (
                                                                  <>
                                                                    <div
                                                                      onClick={() =>
                                                                        handleVisibleOwnerById(
                                                                          id,
                                                                        )
                                                                      }
                                                                      className="show_all"
                                                                    >
                                                                      {visibleOwners?.[
                                                                        id
                                                                      ]
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
                                                                        overflow:
                                                                          "hidden",
                                                                        height: `${
                                                                          visibleOwners?.[
                                                                            id
                                                                          ]
                                                                            ? "fit-content"
                                                                            : "0"
                                                                        }`,
                                                                        display:
                                                                          "grid",
                                                                        gap: "16px",
                                                                        marginTop:
                                                                          "16px",
                                                                      }}
                                                                    >
                                                                      {item?.documents?.map(
                                                                        (
                                                                          item,
                                                                          docIndex,
                                                                        ) => {
                                                                          return (
                                                                            <FieldArray name="documents">
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
                                                                                  <FormikField
                                                                                    id={`newAuto[${i}]owners[${index}].documents[${docIndex}].doc_type`}
                                                                                    name={`newAuto[${i}]owners[${index}].documents[${docIndex}].doc_type`}
                                                                                    component={
                                                                                      MyInput
                                                                                    }
                                                                                  />
                                                                                </div>
                                                                                <div className="details_div">
                                                                                  <div className="details_label">
                                                                                    Серия
                                                                                    документа
                                                                                  </div>
                                                                                  <FormikField
                                                                                    id={`newAuto[${i}]owners[${index}].documents[${docIndex}].doc_serial`}
                                                                                    name={`newAuto[${i}]owners[${index}].documents[${docIndex}].doc_serial`}
                                                                                    component={
                                                                                      MyInput
                                                                                    }
                                                                                  />
                                                                                </div>
                                                                                <div className="details_div">
                                                                                  <div className="details_label">
                                                                                    Номер
                                                                                    документа
                                                                                  </div>
                                                                                  <FormikField
                                                                                    id={`newAuto[${i}]owners[${index}].documents[${docIndex}].doc_number`}
                                                                                    name={`newAuto[${i}]owners[${index}].documents[${docIndex}].doc_number`}
                                                                                    component={
                                                                                      MyInput
                                                                                    }
                                                                                  />
                                                                                </div>
                                                                                <div className="details_div">
                                                                                  <div className="details_label">
                                                                                    Дата
                                                                                    выдачи
                                                                                    документа
                                                                                  </div>
                                                                                  <FormikField
                                                                                    id={`newAuto[${i}]owners[${index}].documents[${docIndex}].date_from`}
                                                                                    name={`newAuto[${i}]owners[${index}].documents[${docIndex}].date_from`}
                                                                                    component={
                                                                                      MyInput
                                                                                    }
                                                                                  />
                                                                                </div>
                                                                              </div>
                                                                            </FieldArray>
                                                                          );
                                                                        },
                                                                      )}
                                                                    </div>
                                                                  </>
                                                                ) : null}
                                                              </div>
                                                            </Card>
                                                          </div>
                                                        </FieldArray>
                                                      );
                                                    },
                                                  )}
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
                                                  {drivers.map(
                                                    (item, index) => {
                                                      const id = `driver${autoId}${index}`;
                                                      return (
                                                        <div className="accordion_col accordion_col_auto">
                                                          <Card>
                                                            <div
                                                              style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                  "column",
                                                                gap: "8px",
                                                              }}
                                                            >
                                                              <div className="details_div">
                                                                <div className="details_label">
                                                                  ФИО
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    display:
                                                                      "flex",
                                                                    flexDirection:
                                                                      "column",
                                                                    gap: "8px",
                                                                  }}
                                                                >
                                                                  <FormikField
                                                                    id={`newAuto[${i}]drivers[${index}].lastname`}
                                                                    name={`newAuto[${i}]drivers[${index}].lastname`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                  <FormikField
                                                                    id={`newAuto[${i}]drivers[${index}].firstname`}
                                                                    name={`newAuto[${i}]drivers[${index}].firstname`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                  <FormikField
                                                                    id={`newAuto[${i}]drivers[${index}].patronymic`}
                                                                    name={`newAuto[${i}]drivers[${index}].patronymic`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                              </div>
                                                              <div className="details_div">
                                                                <div className="details_label">
                                                                  Дата рождения
                                                                </div>
                                                                <FormikField
                                                                  id={`newAuto[${i}]drivers[${index}].dob`}
                                                                  name={`newAuto[${i}]drivers[${index}].dob`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                              {item?.documents
                                                                ?.length ? (
                                                                <>
                                                                  <div
                                                                    onClick={() =>
                                                                      handleVisibleOwnerById(
                                                                        id,
                                                                      )
                                                                    }
                                                                    className="show_all"
                                                                  >
                                                                    {visibleOwners?.[
                                                                      id
                                                                    ]
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
                                                                      overflow:
                                                                        "hidden",
                                                                      height: `${
                                                                        visibleOwners?.[
                                                                          id
                                                                        ]
                                                                          ? "fit-content"
                                                                          : "0"
                                                                      }`,
                                                                      display:
                                                                        "grid",
                                                                      gap: "16px",
                                                                      marginTop:
                                                                        "16px",
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
                                                                              <FormikField
                                                                                id={`newAuto[${i}]drivers[${index}].documents[${docIndex}].doc_type`}
                                                                                name={`newAuto[${i}]drivers[${index}].documents[${docIndex}].doc_type`}
                                                                                component={
                                                                                  MyInput
                                                                                }
                                                                              />
                                                                            </div>
                                                                            <div className="details_div">
                                                                              <div className="details_label">
                                                                                Серия
                                                                                документа
                                                                              </div>
                                                                              <FormikField
                                                                                id={`newAuto[${i}]drivers[${index}].documents[${docIndex}].doc_serial`}
                                                                                name={`newAuto[${i}]drivers[${index}].documents[${docIndex}].doc_serial`}
                                                                                component={
                                                                                  MyInput
                                                                                }
                                                                              />
                                                                            </div>
                                                                            <div className="details_div">
                                                                              <div className="details_label">
                                                                                Номер
                                                                                документа
                                                                              </div>
                                                                              <FormikField
                                                                                id={`newAuto[${i}]drivers[${index}].documents[${docIndex}].doc_number`}
                                                                                name={`newAuto[${i}]drivers[${index}].documents[${docIndex}].doc_number`}
                                                                                component={
                                                                                  MyInput
                                                                                }
                                                                              />
                                                                            </div>
                                                                            <div className="details_div">
                                                                              <div className="details_label">
                                                                                Дата
                                                                                выдачи
                                                                                документа
                                                                              </div>
                                                                              <FormikField
                                                                                id={`newAuto[${i}]drivers[${index}].documents[${docIndex}].date_from`}
                                                                                name={`newAuto[${i}]drivers[${index}].documents[${docIndex}].date_from`}
                                                                                component={
                                                                                  MyInput
                                                                                }
                                                                              />
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
                                                    },
                                                  )}
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
                                                <Title Tag="h3">
                                                  Личные данные
                                                </Title>
                                                <div
                                                  className="accordion_list"
                                                  style={{ marginTop: "24px" }}
                                                >
                                                  {userInfo.map(
                                                    (item, index) => {
                                                      const id = `userInfo${autoId}${index}`;
                                                      return (
                                                        <FieldArray name="userInfo">
                                                          <div className="accordion_col">
                                                            <Card>
                                                              <div
                                                                style={{
                                                                  display:
                                                                    "flex",
                                                                  flexDirection:
                                                                    "column",
                                                                  gap: "8px",
                                                                }}
                                                              >
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    ФИО
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      display:
                                                                        "flex",
                                                                      flexDirection:
                                                                        "column",
                                                                      gap: "8px",
                                                                    }}
                                                                  >
                                                                    <FormikField
                                                                      id={`newAuto[${i}].userInfo[${index}].lastname`}
                                                                      name={`newAuto[${i}].userInfo[${index}].lastname`}
                                                                      component={
                                                                        MyInput
                                                                      }
                                                                    />
                                                                    <FormikField
                                                                      id={`newAuto[${i}].userInfo[${index}].first_name`}
                                                                      name={`newAuto[${i}].userInfo[${index}].first_name`}
                                                                      component={
                                                                        MyInput
                                                                      }
                                                                    />
                                                                    <FormikField
                                                                      id={`newAuto[${i}].userInfo[${index}].patronymic`}
                                                                      name={`newAuto[${i}].userInfo[${index}].patronymic`}
                                                                      component={
                                                                        MyInput
                                                                      }
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="details_div">
                                                                  <div className="details_label">
                                                                    Дата
                                                                    рождения
                                                                  </div>
                                                                  <FormikField
                                                                    id={`newAuto[${i}].userInfo[${index}].dob`}
                                                                    name={`newAuto[${i}].userInfo[${index}].dob`}
                                                                    component={
                                                                      MyInput
                                                                    }
                                                                  />
                                                                </div>
                                                                {item?.documents
                                                                  ?.length ? (
                                                                  <>
                                                                    <div
                                                                      onClick={() =>
                                                                        handleVisibleOwnerById(
                                                                          id,
                                                                        )
                                                                      }
                                                                      className="show_all"
                                                                    >
                                                                      {visibleOwners?.[
                                                                        id
                                                                      ]
                                                                        ? "Скрыть"
                                                                        : "Показать"}{" "}
                                                                      Документы
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
                                                                        overflow:
                                                                          "hidden",
                                                                        height: `${
                                                                          visibleOwners?.[
                                                                            id
                                                                          ]
                                                                            ? "fit-content"
                                                                            : "0"
                                                                        }`,
                                                                        display:
                                                                          "grid",
                                                                        gap: "16px",
                                                                        marginTop:
                                                                          "16px",
                                                                      }}
                                                                    >
                                                                      {item?.documents?.map(
                                                                        (
                                                                          item,
                                                                          docIndex,
                                                                        ) => {
                                                                          return (
                                                                            <div className="details_documents_container">
                                                                              <div className="details_div">
                                                                                <div className="details_label">
                                                                                  Тип
                                                                                  документа
                                                                                </div>
                                                                                <FormikField
                                                                                  id={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].doc_type`}
                                                                                  name={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].doc_type`}
                                                                                  component={
                                                                                    MyInput
                                                                                  }
                                                                                />
                                                                              </div>
                                                                              <div className="details_div">
                                                                                <div className="details_label">
                                                                                  Серия
                                                                                  документа
                                                                                </div>
                                                                                <FormikField
                                                                                  name={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].doc_serial`}
                                                                                  id={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].doc_serial`}
                                                                                  component={
                                                                                    MyInput
                                                                                  }
                                                                                />
                                                                              </div>
                                                                              <div className="details_div">
                                                                                <div className="details_label">
                                                                                  Номер
                                                                                  документа
                                                                                </div>
                                                                                <FormikField
                                                                                  id={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].doc_number`}
                                                                                  name={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].doc_number`}
                                                                                  component={
                                                                                    MyInput
                                                                                  }
                                                                                />
                                                                              </div>
                                                                              <div className="details_div">
                                                                                <div className="details_label">
                                                                                  Дата
                                                                                  выдачи
                                                                                  документа
                                                                                </div>
                                                                                <FormikField
                                                                                  name={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].date_from`}
                                                                                  id={`newAuto[${i}].userInfo[${index}].documents[${docIndex}].date_from`}
                                                                                  component={
                                                                                    MyInput
                                                                                  }
                                                                                />
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
                                                        </FieldArray>
                                                      );
                                                    },
                                                  )}
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
                                                {carOwners.map(
                                                  (item, index) => {
                                                    const carDriverId = `newAuto.${i}carOwners${cardsCarOwnersId}${index}.driver`;
                                                    const filteredDrivers =
                                                      item.drivers.filter(
                                                        Boolean,
                                                      );

                                                    return (
                                                      <div
                                                        style={{
                                                          marginTop: "24px",
                                                        }}
                                                      >
                                                        <ExpandCard
                                                          subId={carDriverId}
                                                          subTitleShow="допущеных к управлению"
                                                          id={`newAuto.${i}${cardsCarOwnersId}${index}carOwners`}
                                                        >
                                                          {/*first <></> = visible content*/}
                                                          <>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                VIN код
                                                              </div>
                                                              <FormikField
                                                                name={`newAuto[${i}]carOwners[${index}].vin`}
                                                                id={`newAuto[${i}]carOwners[${index}].vin`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
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
                                                                <FormikField
                                                                  id={`newAuto[${i}]carOwners[${index}].license_plate`}
                                                                  name={`newAuto[${i}]carOwners[${index}].license_plate`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                              <div>
                                                                <div className="expand_content_title">
                                                                  Год выпуска
                                                                </div>
                                                                <FormikField
                                                                  id={`newAuto[${i}]carOwners[${index}].yearIssue`}
                                                                  name={`newAuto[${i}]carOwners[${index}].yearIssue`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                              <div>
                                                                <div className="expand_content_title">
                                                                  Марка
                                                                </div>
                                                                <FormikField
                                                                  id={`newAuto[${i}]carOwners[${index}].brand`}
                                                                  name={`newAuto[${i}]carOwners[${index}].brand`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                              <div>
                                                                <div className="expand_content_title">
                                                                  Модель
                                                                </div>
                                                                <FormikField
                                                                  id={`newAuto[${i}]carOwners[${index}].model`}
                                                                  name={`newAuto[${i}]carOwners[${index}].model`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
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
                                                                <FormikField
                                                                  id={`newAuto[${i}]carOwners[${index}].mark_model_other`}
                                                                  name={`newAuto[${i}]carOwners[${index}].mark_model_other`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            )}
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Мощность
                                                                двигателя
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carOwners[${index}].enginePower`}
                                                                name={`newAuto[${i}]carOwners[${index}].enginePower`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Номер кузова
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carOwners[${index}].body_number`}
                                                                name={`newAuto[${i}]carOwners[${index}].body_number`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Дата выдачи
                                                                документа на ТС
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carOwners[${index}].veh_doc_date`}
                                                                name={`newAuto[${i}]carOwners[${index}].veh_doc_date`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Серия документа
                                                                на ТС
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carOwners[${index}].veh_doc_serial`}
                                                                name={`newAuto[${i}]carOwners[${index}].veh_doc_serial`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Номер документа
                                                                на ТС
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carOwners[${index}].veh_doc_number`}
                                                                name={`newAuto[${i}]carOwners[${index}].veh_doc_number`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Использовалась в
                                                                такси
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carOwners[${index}].is_taxi`}
                                                                name={`newAuto[${i}]carOwners[${index}].is_taxi`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                          </>
                                                          {/*third <></> = hide sub content*/}
                                                          {filteredDrivers?.length ? (
                                                            <>
                                                              <div
                                                                style={{
                                                                  display:
                                                                    "grid",
                                                                  gap: "16px",
                                                                  cursor:
                                                                    "pointer",
                                                                  marginTop:
                                                                    "16px",
                                                                }}
                                                              >
                                                                {filteredDrivers?.map(
                                                                  (
                                                                    item,
                                                                    driverIndex,
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
                                                                            ФИО
                                                                          </div>
                                                                          <div
                                                                            style={{
                                                                              display:
                                                                                "flex",
                                                                              flexDirection:
                                                                                "column",
                                                                              gap: "8px",
                                                                            }}
                                                                          >
                                                                            <FormikField
                                                                              id={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].lastname`}
                                                                              name={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].lastname`}
                                                                              component={
                                                                                MyInput
                                                                              }
                                                                            />
                                                                            <FormikField
                                                                              id={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].firstname`}
                                                                              name={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].firstname`}
                                                                              component={
                                                                                MyInput
                                                                              }
                                                                            />
                                                                            <FormikField
                                                                              id={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].patronymic`}
                                                                              name={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].patronymic`}
                                                                              component={
                                                                                MyInput
                                                                              }
                                                                            />
                                                                          </div>
                                                                        </div>
                                                                        <div className="details_div">
                                                                          <div className="details_label">
                                                                            Дата
                                                                            рождения
                                                                          </div>
                                                                          <FormikField
                                                                            id={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].dob`}
                                                                            name={`newAuto[${i}]carOwners[${index}].drivers[${driverIndex}].dob`}
                                                                            component={
                                                                              MyInput
                                                                            }
                                                                          />
                                                                        </div>
                                                                      </div>
                                                                    );
                                                                  },
                                                                )}
                                                              </div>
                                                            </>
                                                          ) : null}
                                                        </ExpandCard>
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
                                            <div
                                              className="expand_cards_row expand_cards_colored_row"
                                              style={{ display: "block" }}
                                            >
                                              <Title Tag="h3">
                                                Допущен к управлению
                                              </Title>
                                              <div className="expand_cards_row">
                                                {carDrivers.map(
                                                  (item, index) => {
                                                    const id = `newAuto.${i}.carDrivers.driver.${autoId}${index}`;
                                                    return (
                                                      <div
                                                        style={{
                                                          marginTop: "24px",
                                                        }}
                                                      >
                                                        <ExpandCard
                                                          subId={id}
                                                          subTitleShow="владельцев"
                                                          id={`newAuto.${i}${cardsCarDriversId}${id}${index}carDrivers`}
                                                        >
                                                          {/*first <></> = visible content*/}
                                                          <>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                VIN код
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].vin`}
                                                                name={`newAuto[${i}]carDrivers[${index}].vin`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
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
                                                                <FormikField
                                                                  id={`newAuto[${i}]carDrivers[${index}].license_plate`}
                                                                  name={`newAuto[${i}]carDrivers[${index}].license_plate`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                              <div>
                                                                <div className="expand_content_title">
                                                                  Год выпуска
                                                                </div>
                                                                <FormikField
                                                                  id={`newAuto[${i}]carDrivers[${index}].yearIssue`}
                                                                  name={`newAuto[${i}]carDrivers[${index}].yearIssue`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                              <div>
                                                                <div className="expand_content_title">
                                                                  Марка
                                                                </div>
                                                                <FormikField
                                                                  id={`newAuto[${i}]carDrivers[${index}].brand`}
                                                                  name={`newAuto[${i}]carDrivers[${index}].brand`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                              <div>
                                                                <div className="expand_content_title">
                                                                  Модель
                                                                </div>
                                                                <FormikField
                                                                  id={`newAuto[${i}]carDrivers[${index}].model`}
                                                                  name={`newAuto[${i}]carDrivers[${index}].model`}
                                                                  component={
                                                                    MyInput
                                                                  }
                                                                />
                                                              </div>
                                                            </div>
                                                          </>
                                                          {/*second <></> = hide content*/}
                                                          <>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Доп. Марка
                                                              </div>

                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].mark_model_other`}
                                                                name={`newAuto[${i}]carDrivers[${index}].mark_model_other`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Мощность
                                                                двигателя
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].enginePower`}
                                                                name={`newAuto[${i}]carDrivers[${index}].enginePower`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Номер кузова
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].body_number`}
                                                                name={`newAuto[${i}]carDrivers[${index}].body_number`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Дата выдачи
                                                                документа на ТС
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].veh_doc_date`}
                                                                name={`newAuto[${i}]carDrivers[${index}].veh_doc_date`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Серия документа
                                                                на ТС
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].veh_doc_serial`}
                                                                name={`newAuto[${i}]carDrivers[${index}].veh_doc_serial`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Номер документа
                                                                на ТС
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].veh_doc_number`}
                                                                name={`newAuto[${i}]carDrivers[${index}].veh_doc_number`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                            <div>
                                                              <div className="expand_content_title">
                                                                Использовалась в
                                                                такси
                                                              </div>
                                                              <FormikField
                                                                id={`newAuto[${i}]carDrivers[${index}].is_taxi`}
                                                                name={`newAuto[${i}]carDrivers[${index}].is_taxi`}
                                                                component={
                                                                  MyInput
                                                                }
                                                              />
                                                            </div>
                                                          </>
                                                          {/*third <></> = hide sub content*/}
                                                          {item?.carOwners
                                                            ?.length ? (
                                                            <>
                                                              <div
                                                                style={{
                                                                  display:
                                                                    "grid",
                                                                  gap: "16px",
                                                                  marginTop:
                                                                    "16px",
                                                                }}
                                                              >
                                                                {item?.carOwners.map(
                                                                  (
                                                                    item,
                                                                    ownerIndex,
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
                                                                            ФИО
                                                                          </div>
                                                                          <div
                                                                            style={{
                                                                              display:
                                                                                "flex",
                                                                              flexDirection:
                                                                                "column",
                                                                              gap: "8px",
                                                                            }}
                                                                          >
                                                                            <FormikField
                                                                              id={`newAuto[${i}]carDrivers[${index}].carOwners[${ownerIndex}].lastname`}
                                                                              name={`newAuto[${i}]carDrivers[${index}].carOwners[${ownerIndex}].lastname`}
                                                                              component={
                                                                                MyInput
                                                                              }
                                                                            />
                                                                            <FormikField
                                                                              id={`newAuto[${i}]carDrivers[${index}].carOwners[${ownerIndex}].firstname`}
                                                                              name={`newAuto[${i}]carDrivers[${index}].carOwners[${ownerIndex}].firstname`}
                                                                              component={
                                                                                MyInput
                                                                              }
                                                                            />
                                                                            <FormikField
                                                                              id={`newAuto[${i}]carDrivers[${index}].carOwners[${ownerIndex}].patronymic`}
                                                                              name={`newAuto[${i}]carDrivers[${index}].carOwners[${ownerIndex}].patronymic`}
                                                                              component={
                                                                                MyInput
                                                                              }
                                                                            />
                                                                          </div>
                                                                        </div>
                                                                        <div className="details_div">
                                                                          <div className="details_label">
                                                                            Дата
                                                                            рождения
                                                                          </div>
                                                                          <FormikField
                                                                            id={`newAuto[${i}]carDrivers[${index}]carOwners[${ownerIndex}].dob`}
                                                                            name={`newAuto[${i}]carDrivers[${index}]carOwners[${ownerIndex}].dob`}
                                                                            component={
                                                                              MyInput
                                                                            }
                                                                          />
                                                                        </div>
                                                                      </div>
                                                                    );
                                                                  },
                                                                )}
                                                              </div>
                                                            </>
                                                          ) : null}
                                                        </ExpandCard>
                                                      </div>
                                                    );
                                                  },
                                                )}
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

                        {values?.militaryInfo && (
                          <Accordion title="Воинская служба" Icon={Military}>
                            <div className="accordion_content accordion_column">
                              <div className="details_div custom_details_div">
                                <div className="details_label">
                                  Место прохождения службы
                                </div>
                                <div className="custom_fieldset">
                                  {values.militaryInfo?.map((_, index) => {
                                    return (
                                      <div className="edit_area">
                                        <FieldArray name={`militaryInfo`}>
                                          {({ remove }) => (
                                            <FormikField
                                              type="textArea"
                                              id="militaryInfo.militaryService"
                                              name={`militaryInfo[${index}].militaryService`}
                                              component={MyInput}
                                              functionRemove={() =>
                                                remove(index)
                                              }
                                            />
                                          )}
                                        </FieldArray>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </Accordion>
                        )}

                        {values?.relationships && (
                          <Accordion title="Родственники" Icon={Social}>
                            <div className="accordion_content">
                              <ExpandCards>
                                <div className="expand_cards_row expand_cards_row-4">
                                  {values?.relationships?.map((_, index) => {
                                    return (
                                      <FieldArray name={`relationships`}>
                                        <Card>
                                          <div className="details_div">
                                            <div className="details_label">
                                              ФИО
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "8px",
                                              }}
                                            >
                                              <FormikField
                                                id={`relationships[${index}].lastname`}
                                                name={`relationships[${index}].lastname`}
                                                component={MyInput}
                                              />
                                              <FormikField
                                                id={`relationships[${index}].firstname`}
                                                name={`relationships[${index}].firstname`}
                                                component={MyInput}
                                              />
                                              <FormikField
                                                id={`relationships[${index}].patronymic`}
                                                name={`relationships[${index}].patronymic`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </div>
                                          <div className="details_div">
                                            <div className="details_label">
                                              Дата Рождения
                                            </div>
                                            <FormikField
                                              id="relationships.dob"
                                              name={`relationships[${index}].dob`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </Card>
                                      </FieldArray>
                                    );
                                  })}
                                </div>
                              </ExpandCards>
                            </div>
                          </Accordion>
                        )}

                        {values?.fsspList && (
                          <Accordion title="Приставы" Icon={Social}>
                            <div className="accordion_content">
                              <ExpandCards>
                                <div className="expand_cards_row expand_cards_row-4">
                                  {values?.fsspList?.map((_, index) => {
                                    return (
                                      <FieldArray name={`fsspList`}>
                                        <Card>
                                          <div className="details_div">
                                            <div className="details_label">
                                              Пристав Исполнитель
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "8px",
                                              }}
                                            >
                                              <FormikField
                                                id={`fsspList[${index}].osp`}
                                                name={`fsspList[${index}].osp`}
                                                component={MyInput}
                                              />
                                            </div>
                                          </div>
                                          <div className="details_div">
                                            <div className="details_label">
                                              Сумма задолженности
                                            </div>
                                            <FormikField
                                              id="fsspList.debt_amount"
                                              name={`fsspList[${index}].debt_amount`}
                                              component={MyInput}
                                            />
                                          </div>
                                        </Card>
                                      </FieldArray>
                                    );
                                  })}
                                </div>
                              </ExpandCards>
                            </div>
                          </Accordion>
                        )}
                      </div>

                      <div className="footer_actions">
                        <Button
                          func={handleCancelEdit}
                          type="button"
                          text="Отменить редактирование"
                          mode="secondary"
                          Icon={Cancel}
                        />
                        {dirty && (
                          <Button
                            func={handleSaveChanges}
                            type="button"
                            text="Сохранить изменения"
                            Icon={Save}
                          />
                        )}
                      </div>
                    </form>
                  )}
                </Wrapper>
              </>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default CustomProfileEdit;
