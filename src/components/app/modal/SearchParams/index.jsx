import "./index.scss";
import DropZone from "components/app/ui/DropZone";
import { useEffect, useRef, useState } from "react";
import Field from "components/app/input/Field";
import Button from "components/app/use/Button";
import { ReactComponent as File } from "assets/images/file.svg";
import { ReactComponent as Passport } from "assets/images/passport.svg";
import { ReactComponent as Car } from "assets/images/car.svg";
import { ReactComponent as Job } from "assets/images/job.svg";
import { ReactComponent as Military } from "assets/images/military.svg";
import { ReactComponent as Percent } from "assets/images/percent.svg";
import { ReactComponent as Filtration } from "assets/images/filtration.svg";
import { ReactComponent as Search } from "assets/images/search_2.svg";
import { ReactComponent as Cancel } from "assets/images/cancel.svg";
import { ReactComponent as Drop } from "assets/images/download.svg";
import { ReactComponent as Location } from "assets/images/location.svg";

import { useFormik } from "formik";
import {
  daysEnums,
  genderEnums,
  monthsEnums,
  regions,
  searchHelpsCsvEnums,
  searchHelpsEnums,
  socialSearchEnums,
  yearsEnums,
} from "libs/Enums";
import { searchSchema } from "libs/schemas";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { searchAnkets } from "store/thunks/searchThunks";
import { insightSearch } from "store/thunks/outsideApiThunks";
import { removeEmptyKeys } from "libs/parseApi";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import ReactSelect from "components/app/input/Select";
import RangeSlider from "components/app/use/RangeSlider";
import Title from "components/app/use/Title";
import Error from "components/app/use/Error";
import { searchActions } from "store/searchSlice";
import Modal from "components/app/base/Modal";
import CsvConfirmationModal from "components/app/modal/CsvConfirmationModal";
import { toast } from "sonner";
import { useUserCredits } from "apiHooks/useUserCredits";
import Accordion from "../../base/Accordion";

const SearchParams = ({ cancel, selectedParams }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { shouldCallFunctions, userCredits, canSearchByPhoto } =
    useUserCredits();
  const [percentRange, setPercentRange] = useState([90, 100]);
  const [socialId, setSocialId] = useState(socialSearchEnums[0].value);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [showCsvConfirm, setShowCsvConfirm] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const getTelegram = async (value, type) => {
    if (!shouldCallFunctions?.api) {
      return toast.error("Недостаточно кредитов для использования Insight", {
        description: "Обратитесь к администратору",
      });
    }
    dispatch(searchActions.setLoading(true));
    await dispatch(
      insightSearch({
        insightInput: value,
        inputType: type,
        createHistoryRecord: true,
        requestType: "global",
      }),
    );
    dispatch(searchActions.setLoading(false));
  };
  const { values, handleSubmit, errors, setFieldValue, handleChange } =
    useFormik({
      initialValues: selectedParams ? selectedParams : {},
      enableReinitialize: true,
      validationSchema: searchSchema,
      onSubmit: async (values) => {
        const { tgId, userName, userPhone, ...rest } = values;
        const removeEmptyValues = removeEmptyKeys(rest);
        const obj = {
          tgId,
          userName,
          userPhone,
        };
        if (
          (tgId || userName || userPhone) &&
          Object.keys(removeEmptyValues).length > 1
        ) {
          ///send request TG and search
          await dispatch(searchAnkets(removeEmptyValues));
          await getTelegram(
            tgId || userName || userPhone,
            Object.keys(removeEmptyKeys(obj))[0],
          );
        } else if (
          (tgId || userName || userPhone) &&
          Object.keys(removeEmptyValues).length === 1
        ) {
          ///send request only TG
          await getTelegram(
            tgId || userName || userPhone,
            Object.keys(removeEmptyKeys(obj))[0],
          );
        } else {
          ///send request only search
          await dispatch(searchAnkets(removeEmptyValues));
        }
        cancel();
      },
    });
  const handleChangePhone = (phone) => {
    setFieldValue("phone", phone);
  };
  function handleAgeRangeChange(value) {
    setFieldValue("matchingPercentage.from", value[0]);
    setFieldValue("matchingPercentage.to", value[1]);
    setPercentRange(value);
  }
  const handleChangeDoB = (fieldName, value) => {
    setFieldValue(fieldName, value);
  };
  const handleChangeGender = (value) => {
    setFieldValue("gender", value);
  };
  const handleChangeRegion = (value) => {
    setFieldValue("address.region", value);
  };
  const handleChangeSocialId = (value) => {
    setFieldValue("vkId", null);
    setFieldValue("tgId", null);
    setFieldValue("userName", null);
    setFieldValue("userPhone", null);
    setSocialId(value);
  };
  const handleDropImage = (img) => {
    setFieldValue("photo", img);
  };

  const handleClickCsv = () => {
    hiddenFileInput.current.click();
  };
  const handleDownloadCsv = () => {
    const link = document.createElement("a");

    // Set the href attribute to the path of the CSV file
    link.href = process.env.PUBLIC_URL + "/csv/example.csv";

    // Set the download attribute to specify the filename
    link.download = "example.csv";

    // Trigger a click to initiate the download
    link.click();
  };

  const convertCsvToJson = (csvData) => {
    const lines = csvData.split("\n");
    let separate = "";
    // Remove empty lines
    const nonEmptyLines = lines?.filter((line) => line?.trim() !== "");
    const hasSemicolonAfterQuotesOrCommas = /["',];"/?.test(nonEmptyLines[0]); // check  if we separete with coma or ;

    if (hasSemicolonAfterQuotesOrCommas) {
      separate = ";";
    } else {
      separate = ",";
    }
    const headers = nonEmptyLines[0]
      .split(`${separate}`)
      .map((header) => header.trim().replace(/"/g, ""));

    if (
      (userCredits?.search !== -1 &&
        nonEmptyLines?.slice(1)?.length > userCredits?.search) ||
      !shouldCallFunctions?.search
    ) {
      toast.error(
        `Недостаточно кредитов для CSV поиска, необходимо больше ${
          nonEmptyLines?.slice(1)?.length
        }`,
        {
          description: "Обратитесь к администратору",
        },
      );
      return;
    }
    const jsonData = nonEmptyLines?.slice(1)?.map((line, index) => {
      const values = line.split(`${separate}`);
      const entry = {};
      headers.forEach((header, i) => {
        const cleanedHeader = header.replace(/"/g, ""); // Remove double quotes from the header
        if (header.startsWith("age_from")) {
          // Handle 'age' field
          entry.age = {
            from: values[i] ? values[i].trim().replace(/"/g, "") : null,
            to:
              values[i + 1] !== undefined
                ? values[i + 1].trim().replace(/"/g, "")
                : null,
          };
        } else if (header.startsWith("job")) {
          // Handle 'job' field
          entry.job = {
            workPlace: values[i] ? values[i].trim().replace(/"/g, "") : null,
          };
        } else if (header.startsWith("localPassport")) {
          // Handle 'localPassport' field
          entry.localPassport = {
            series: values[i] ? values[i].trim().replace(/"/g, "") : null,
            number:
              values[i + 1] !== undefined
                ? values[i + 1].trim().replace(/"/g, "")
                : null,
          };
        } else if (header === "dateOfBirth_from_day") {
          // Handle 'dateOfBirth' field
          entry.dateOfBirth = {
            from: {
              day: values[i] ? values[i].trim().replace(/"/g, "") : null,
              month:
                values[i + 1] !== undefined
                  ? values[i + 1].trim().replace(/"/g, "")
                  : null,
              year:
                values[i + 2] !== undefined
                  ? values[i + 2].trim().replace(/"/g, "")
                  : null,
            },
            to: {
              day:
                values[i + 3] !== undefined
                  ? values[i + 3].trim().replace(/"/g, "")
                  : null,
              month:
                values[i + 4] !== undefined
                  ? values[i + 4].trim().replace(/"/g, "")
                  : null,
              year:
                values[i + 5] !== undefined
                  ? values[i + 5].trim().replace(/"/g, "")
                  : null,
            },
          };
        } else if (header === "matchingPercentage_from") {
          // Handle 'matchingPercentage' field
          entry.matchingPercentage = {
            from: values[i] ? values[i].trim().replace(/"/g, "") : null,
            to:
              values[i + 1] !== undefined
                ? values[i + 1].trim().replace(/"/g, "")
                : null,
          };
        } else {
          // Handle other fields
          entry[cleanedHeader] = values[i]
            ? values[i].trim().replace(/"/g, "")
            : null;
        }
        delete entry.dateOfBirth_from_month;
        delete entry.dateOfBirth_from_year;
        delete entry.dateOfBirth_to_day;
        delete entry.dateOfBirth_to_month;
        delete entry.dateOfBirth_to_year;
        delete entry.matchingPercentage_to;
        delete entry.age_to;
        delete entry.id;
      });

      // Assign an ID or use another identifier if needed
      entry.id = index + 1;
      const { id, ...rest } = entry;
      return rest;
    });
    return JSON.stringify(jsonData, null, 2);
  };

  const handleCloseCsvConfirm = () => {
    setShowCsvConfirm(false);
    cancel();
  };
  const handleCsvFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvData = e.target.result;
        const jsonData = convertCsvToJson(csvData);
        if (!jsonData) {
          cancel();
          return;
        }
        const withoutEmpty = removeEmptyKeys(JSON.parse(jsonData));
        if (withoutEmpty && !withoutEmpty?.filter(Boolean)?.length) {
          return toast.warning("Файл пустой!!!");
        } else {
          setShowCsvConfirm(true);
          setCsvData(withoutEmpty);
        }
      };
      reader.readAsText(file);
    }
  };
  useEffect(() => {
    if (selectedParams) {
      if (selectedParams?.userPhone) {
        handleChangeSocialId("userPhone");
        setFieldValue("userPhone", selectedParams?.userPhone);
      }
      if (selectedParams?.userName) {
        handleChangeSocialId("userName");
        setFieldValue("userName", selectedParams?.userName);
      }
      if (selectedParams?.tgId) {
        handleChangeSocialId("tgId");
        setFieldValue("tgId", selectedParams?.tgId);
      }
      setPercentRange([
        selectedParams?.matchingPercentage?.from,
        selectedParams?.matchingPercentage?.to,
      ]);
      setFieldValue(
        "matchingPercentage.from",
        selectedParams?.matchingPercentage?.from,
      );
      setFieldValue(
        "matchingPercentage.to",
        selectedParams?.matchingPercentage?.to,
      );
    } else {
      setFieldValue("matchingPercentage.from", percentRange[0]);
      setFieldValue("matchingPercentage.to", percentRange[1]);
    }
  }, [selectedParams]);

  return (
    <>
      {showCsvConfirm && (
        <Modal
          title="Название для csv поиска"
          closeModal={handleCloseCsvConfirm}
        >
          <CsvConfirmationModal json={csvData} cancel={handleCloseCsvConfirm} />
        </Modal>
      )}
      <form
        className={`search_form ${isDarkTheme ? "" : "search_form_light"}`}
        onSubmit={handleSubmit}
      >
        <div className="search_form_row">
          <div className="search_form_column">
            {canSearchByPhoto && (
              <DropZone
                isDarkTheme={isDarkTheme}
                dropped={values?.photo}
                setDropped={handleDropImage}
                title="Фото человека"
              />
            )}
            <div className="search_help_wrapp">
              <p className="helped_title">Рекомендации по поиску:</p>
              <ul className="search_help_column">
                {searchHelpsEnums.map(({ title }) => {
                  return <li key={uuid()}>{title}</li>;
                })}
              </ul>
              <input
                accept=".csv"
                type="file"
                ref={hiddenFileInput}
                onChange={handleCsvFileUpload}
                style={{
                  display: "none",
                }}
              />
              <div className="search_bulk_actions">
                <Button
                  text="Запустить CSV поиск"
                  Icon={Drop}
                  func={handleClickCsv}
                />
                <Button
                  mode="secondary"
                  text="Скачать пример csv"
                  Icon={Drop}
                  func={handleDownloadCsv}
                />
                <p className="helped_title">Рекомендации по поиску CSV:</p>
                <ul className="search_help_column">
                  {searchHelpsCsvEnums.map(({ title }) => {
                    return <li key={uuid()}>{title}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="search_form_column column_block">
            <div className="column_item">
              <Title
                Tag="h4"
                Icon={File}
                iconStyleWrapper="transparent_icon blue_icon"
                IconWidth="20px"
                IconHeight="20px"
              >
                Общие данные
              </Title>
              <Field
                label="Фамилия"
                placeholder="Иванов"
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName}
                name="lastName"
              />
              <div className="column_grid">
                <Field
                  label="Имя"
                  placeholder="Иван"
                  value={values.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  name="firstName"
                />
                <Field
                  label="Отчество"
                  placeholder="Иванович"
                  value={values.parentName}
                  onChange={handleChange}
                  error={errors.parentName}
                  name="parentName"
                />
              </div>
              <div className="column_grid">
                <Field
                  label="Email"
                  type="email"
                  placeholder="example@mail.com"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  name="email"
                />
                <Field
                  type="tel"
                  label="Номер телефона"
                  placeholder="+7 (***) *******"
                  value={values.phone}
                  name="phone"
                  onChange={handleChangePhone}
                  error={errors.phone}
                />
              </div>
            </div>
            <div className="column_item">
              <Title
                Tag="h4"
                Icon={Passport}
                iconStyleWrapper="transparent_icon blue_icon"
                IconWidth="20px"
                IconHeight="20px"
              >
                Документы
              </Title>
              <div
                className="column_grid"
                style={{ gridTemplateColumns: "110px 1fr" }}
              >
                <Field
                  type="text"
                  label="Паспорт РФ"
                  placeholder="Серия"
                  value={values.localPassport?.series}
                  onChange={handleChange}
                  name="localPassport.series"
                  error={
                    errors.localPassport?.series || errors.localPassport?.number
                  }
                  showError={errors.localPassport?.series}
                />
                <Field
                  type="text"
                  label={""}
                  placeholder="Номер"
                  value={values.localPassport?.number}
                  onChange={handleChange}
                  name="localPassport.number"
                  error={errors.localPassport?.number}
                  showError={false}
                />
              </div>
              <div className="column_grid">
                <Field
                  type="number"
                  label="Загранпаспорт"
                  placeholder="XX YYYYYYY"
                  value={values.foreignPassport}
                  onChange={handleChange}
                  name="foreignPassport"
                  error={errors.foreignPassport}
                />
                <Field
                  type="text"
                  label="Документ(все)"
                  placeholder="XXXXXXXXX"
                  value={values.documentNumber}
                  onChange={handleChange}
                  name="documentNumber"
                  error={errors.documentNumber}
                />
              </div>
              <div className="column_grid">
                <Field
                  type="text"
                  label="INN"
                  placeholder="XXXXXXXXX"
                  value={values.inn}
                  onChange={handleChange}
                  name="inn"
                  error={errors.inn}
                />
                <Field
                  type="text"
                  label="Страховой номер"
                  placeholder="XXXXXXXXX"
                  value={values.snils}
                  onChange={handleChange}
                  name="snils"
                  error={errors.snils}
                />
              </div>
              <div>
                <Field
                  type="text"
                  label="Кадастровый номер"
                  placeholder="xx:xx:xxxx:xx:xx:x"
                  value={values.cadNumber}
                  onChange={handleChange}
                  name="cadNumber"
                  error={errors.cadNumber}
                />
              </div>
              <div
                className="column_grid"
                style={{ gridTemplateColumns: "158px 158px ", gap: 2 }}
              >
                <Field
                  type="text"
                  label="ID"
                  placeholder={socialId}
                  value={values[socialId]}
                  onChange={handleChange}
                  name={socialId}
                  error={errors[socialId]}
                />
                <ReactSelect
                  styleField={{
                    control: (styles, state) => ({
                      ...styles,
                      border: `1px solid ${
                        isDarkTheme ? "#4B5563" : "#D1D5DB"
                      } `,
                      height: "38px",
                      color: `${isDarkTheme ? "#D1D5DB" : "#BAC1CA"}`,
                      backgroundColor: `${isDarkTheme ? "#1E2329" : "#FFFFFF"}`,
                      fontWeight: "500",
                      fontSize: "14px",
                      borderRadius: "8px",
                      "& .kermit-select__value-container": {
                        padding: state.hasValue ? "0 0 0 6px" : "0 0 0 6px",
                      },
                      "& .kermit-select__single-value": {
                        color: `${isDarkTheme ? "#D1D5DB" : "#2C323B"}`,
                      },
                      ":hover": {
                        border: `1px solid ${
                          isDarkTheme && state.menuIsOpen
                            ? "#006EFF"
                            : "#8ABCFF"
                        } `,
                      },
                    }),
                  }}
                  value={socialId}
                  name="socialId"
                  onChange={handleChangeSocialId}
                  options={socialSearchEnums}
                />
              </div>
            </div>

            <div className="column_item">
              <Title
                Tag="h4"
                Icon={Car}
                iconStyleWrapper="transparent_icon blue_icon"
                IconWidth="20px"
                IconHeight="20px"
              >
                Авто
              </Title>
              <div className="column_grid">
                <Field
                  type="text"
                  label="VIN код"
                  placeholder="XXXXXXXXX"
                  value={values.vin}
                  onChange={handleChange}
                  name="vin"
                  error={errors.inn}
                />
                <Field
                  type="text"
                  label="Номер авто"
                  placeholder="XXXXXXXXX"
                  value={values.plateNumber}
                  onChange={handleChange}
                  name="plateNumber"
                  error={errors.plateNumber}
                />
              </div>
            </div>
            <div className="column_item">
              <Title
                Tag="h4"
                Icon={Percent}
                iconStyleWrapper="transparent_icon blue_icon"
              >
                Процент совпадения (от-до)
              </Title>
              <div className="range_age_value">
                <span>{percentRange[0]}%</span>
                <span>{percentRange[1]}%</span>
              </div>
              <RangeSlider
                min={51}
                max={100}
                value={percentRange}
                onChange={handleAgeRangeChange}
              />
            </div>
          </div>
          <div className="search_form_column column_block">
            <div className="column_item">
              <Title
                Tag="h4"
                Icon={Location}
                iconStyleWrapper="transparent_icon blue_icon"
                IconWidth="20px"
                IconHeight="20px"
              >
                Адрес
              </Title>
              <ReactSelect
                label="Регион"
                isClear
                isSearch
                value={values.address?.region}
                name="address.region"
                onChange={handleChangeRegion}
                options={regions}
                placeholder="Выберите регион"
              />
              <Field
                label="Город"
                placeholder="москва"
                value={values.address?.city}
                onChange={handleChange}
                name="address.city"
              />
              <div
                className="column_grid"
                style={{ gridTemplateColumns: "260px 60px 50px ", gap: 2 }}
              >
                <Field
                  label="Улица"
                  placeholder="тамбовская"
                  value={values.address?.street}
                  onChange={handleChange}
                  name="address.street"
                />
                <Field
                  label="Дом"
                  placeholder="1"
                  value={values.address?.house}
                  onChange={handleChange}
                  name="address.house"
                />
                <Field
                  label="кв"
                  placeholder="11"
                  value={values.address?.flat}
                  onChange={handleChange}
                  name="address.flat"
                />
              </div>
            </div>
            <div className="column_item">
              <Title
                Tag="h4"
                Icon={Job}
                iconStyleWrapper="transparent_icon blue_icon"
                IconWidth="20px"
                IconHeight="20px"
              >
                Место работы
              </Title>
              <Field
                label="Место работы"
                placeholder="ООО Место работы"
                value={values.job?.workPlace}
                onChange={handleChange}
                name="job.workPlace"
                error={errors.job?.workPlace}
              />
            </div>
            <div className="column_item">
              <Title
                Tag="h4"
                Icon={Military}
                iconStyleWrapper="transparent_icon blue_icon"
                IconWidth="20px"
                IconHeight="20px"
              >
                Воинская служба
              </Title>
              <Field
                label="Место прохождения службы"
                placeholder="Город / Номер части"
                value={values.militaryInformation}
                onChange={handleChange}
                name="militaryInformation"
                error={errors.militaryInformation}
              />
            </div>

            <div className="column_item">
              <Title
                Tag="h4"
                Icon={Filtration}
                iconStyleWrapper="transparent_icon blue_icon"
                IconWidth="20px"
                IconHeight="20px"
              >
                Фильтры
              </Title>

              <ReactSelect
                label="Пол"
                isClear
                value={values.gender}
                name="gender"
                onChange={handleChangeGender}
                options={genderEnums}
                placeholder="Выберите пол"
              />
              <>
                <div
                  className="column_grid"
                  style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                >
                  <ReactSelect
                    isClear
                    isSearch
                    label="Дата рождения от"
                    value={values?.dateOfBirth?.from?.day}
                    name="dateOfBirth.from.day"
                    onChange={(e) => handleChangeDoB("dateOfBirth.from.day", e)}
                    options={daysEnums}
                    placeholder="День"
                  />
                  <ReactSelect
                    isClear
                    isSearch
                    label=""
                    value={values?.dateOfBirth?.from?.month}
                    name="dateOfBirth.from.month"
                    onChange={(e) =>
                      handleChangeDoB("dateOfBirth.from.month", e)
                    }
                    options={monthsEnums}
                    placeholder="Mecяц"
                  />
                  <ReactSelect
                    isClear
                    isSearch
                    label=""
                    value={values?.dateOfBirth?.from?.year}
                    name="dateOfBirth.from.year"
                    onChange={(e) =>
                      handleChangeDoB("dateOfBirth.from.year", e)
                    }
                    options={yearsEnums}
                    placeholder="Год"
                  />
                </div>
                <div
                  className="column_grid"
                  style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                >
                  <ReactSelect
                    isClear
                    isSearch
                    label="Дата рождения до"
                    value={values?.dateOfBirth?.to?.day}
                    name="dateOfBirth.to.day"
                    onChange={(e) => handleChangeDoB("dateOfBirth.to.day", e)}
                    options={daysEnums}
                    placeholder="День"
                  />
                  <ReactSelect
                    isClear
                    isSearch
                    label=""
                    value={values?.dateOfBirth?.to?.month}
                    name="dateOfBirth.to.month"
                    onChange={(e) => handleChangeDoB("dateOfBirth.to.month", e)}
                    options={monthsEnums}
                    placeholder="Mecяц"
                  />
                  <ReactSelect
                    isClear
                    isSearch
                    label=""
                    value={values.dateOfBirth?.to?.year}
                    name="dateOfBirth.to.year"
                    onChange={(e) => handleChangeDoB("dateOfBirth.to.year", e)}
                    options={yearsEnums}
                    placeholder="Год"
                  />
                </div>
                <div className="column_grid">
                  <Field
                    type="number"
                    label="Возраст (лет)"
                    placeholder="От"
                    value={values.age?.from}
                    onChange={handleChange}
                    error={errors.age?.from}
                    name="age.from"
                  />
                  <Field
                    type="number"
                    label=""
                    placeholder="До"
                    value={values.age?.to}
                    onChange={handleChange}
                    error={errors.age?.to}
                    name="age.to"
                  />
                </div>
              </>
            </div>
          </div>
        </div>
        <div
          className="column_grid"
          style={{ paddingLeft: "298px", marginTop: "24px" }}
        >
          <div className="action_error" style={{ alignSelf: "center" }}>
            {(errors.additionalFieldsSelected || errors.address) && (
              <Error
                message={errors.additionalFieldsSelected || errors.address}
              />
            )}
          </div>
          <div className="modal_action" style={{ margin: "0" }}>
            <Button
              Icon={Cancel}
              text="Отмена"
              mode="secondary"
              func={cancel}
            />
            <Button
              text={`Запустить поиск ${selectedParams ? "повторно" : ""}`}
              Icon={Search}
              type="submit"
              disabled={Object.keys(errors).length >= 1}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchParams;
