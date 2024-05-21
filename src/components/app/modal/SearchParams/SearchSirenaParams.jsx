import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { searchSchema } from "libs/schemas";
import { removeEmptyKeys } from "libs/parseApi";
import { searchSirena } from "store/thunks/searchThunks";
import { ReactComponent as Passport } from "assets/images/passport.svg";
import { ReactComponent as Search } from "assets/images/search_2.svg";
import { ReactComponent as Cancel } from "assets/images/cancel.svg";
import { ReactComponent as File } from "assets/images/file.svg";
import { ReactComponent as Percent } from "assets/images/percent.svg";
import { ReactComponent as Filtration } from "assets/images/filtration.svg";

import "./index.scss";
import {
  daysEnums,
  monthsEnums,
  searchSirenaHelpsEnums,
  yearsEnums,
} from "libs/Enums";
import { v4 as uuid } from "uuid";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "../../use/Title";
import Field from "../../input/Field";
import ReactSelect from "../../input/Select";
import Button from "../../use/Button";
import RangeSlider from "../../use/RangeSlider";
import Error from "../../use/Error";
const SearchSirenaParams = ({ cancel, selectedParams }) => {
  const copyParam = { ...(selectedParams || {}) };
  let [year, month, day] = copyParam?.departureTime
    ? copyParam?.departureTime?.split("-")?.map(Number)
    : ["", "", ""];
  const updateData = {
    year: year,
    month: month,
    day: day,
  };
  copyParam.departureTime = updateData || "";
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const [percentRange, setPercentRange] = useState([90, 100]);

  const { values, handleSubmit, errors, setFieldValue, handleChange } =
    useFormik({
      initialValues: copyParam ? copyParam : {},
      enableReinitialize: true,
      validationSchema: searchSchema,
      onSubmit: async (values) => {
        const copy = { ...values };
        copy.departureTime = `${values?.departureTime?.year ?? ""}-${
          values?.departureTime?.month ?? ""
        }-${values?.departureTime?.day ?? ""}`;
        const removeEmptyValues = removeEmptyKeys(copy);
        if (removeEmptyValues.departureTime === "--") {
          delete removeEmptyValues.departureTime;
        }
        await dispatch(searchSirena(removeEmptyValues));
        cancel();
      },
    });
  useEffect(() => {
    if (selectedParams) {
      let { year, month, day } = copyParam?.departureTime;
      setFieldValue("departureTime.year", year);
      setFieldValue("departureTime.month", month);
      setFieldValue("departureTime.day", day);
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
  const handleChangeDate = (fieldName, value) => {
    setFieldValue(fieldName, value);
  };

  function handleAgeRangeChange(value) {
    setFieldValue("matchingPercentage.from", value[0]);
    setFieldValue("matchingPercentage.to", value[1]);
    setPercentRange(value);
  }
  const handleChangePhone = (phone) => {
    setFieldValue("phone", phone);
  };

  const handleChangeDoB = (fieldName, value) => {
    setFieldValue(fieldName, value);
  };
  return (
    <form
      className={`search_form ${isDarkTheme ? "" : "search_form_light"}`}
      onSubmit={handleSubmit}
    >
      <div className="search_form_row">
        <div className="search_form_column" style={{ maxWidth: "300px" }}>
          <div className="search_help_wrapp">
            <p className="helped_title">Рекомендации по поиску:</p>
            <ul className="search_help_column">
              {searchSirenaHelpsEnums.map(({ title }) => {
                return <li key={uuid()}>{title}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="search_form_column">
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

            <div className="column_grid">
              <Field
                type="text"
                label="Номер самолета"
                placeholder="XXXXXXXXX"
                value={values.flightNumber}
                onChange={handleChange}
                name="flightNumber"
                error={errors.flightNumber}
              />
              <Field
                type="text"
                label="Номер документа(все)"
                placeholder="XXXXXXXXX"
                value={values.documentNumber}
                onChange={handleChange}
                name="documentNumber"
                error={errors.documentNumber}
              />
            </div>
            <>
              <div
                className="column_grid"
                style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
              >
                <ReactSelect
                  error={errors?.departureTime?.day}
                  menuPlacement="top"
                  isClear
                  isSearch
                  label="Дата вылета"
                  value={values?.departureTime?.day}
                  name="departureTime.day"
                  onChange={(e) => handleChangeDate("departureTime.day", e)}
                  options={daysEnums}
                  placeholder="День"
                />
                <ReactSelect
                  error={errors?.departureTime?.month}
                  menuPlacement="top"
                  isClear
                  isSearch
                  label=""
                  value={values?.departureTime?.month}
                  name="departureTime.month"
                  onChange={(e) => handleChangeDate("departureTime.month", e)}
                  options={monthsEnums}
                  placeholder="Mecяц"
                />
                <ReactSelect
                  error={errors?.departureTime?.year}
                  menuPlacement="top"
                  isClear
                  isSearch
                  label=""
                  value={values.departureTime?.year}
                  name="departureTime.year"
                  onChange={(e) => handleChangeDate("departureTime.year", e)}
                  options={yearsEnums}
                  placeholder="Год"
                />
              </div>
            </>
          </div>
        </div>
        <div className="search_form_column">
          <div className="column_item">
            <Title
              Tag="h4"
              Icon={Percent}
              iconStyleWrapper="transparent_icon blue_icon"
              IconWidth="20px"
              IconHeight="20px"
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
                  onChange={(e) => handleChangeDoB("dateOfBirth.from.month", e)}
                  options={monthsEnums}
                  placeholder="Mecяц"
                />
                <ReactSelect
                  isClear
                  isSearch
                  label=""
                  value={values?.dateOfBirth?.from?.year}
                  name="dateOfBirth.from.year"
                  onChange={(e) => handleChangeDoB("dateOfBirth.from.year", e)}
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
        style={{ paddingLeft: "348px", marginTop: "24px" }}
      >
        <div className="action_error" style={{ alignSelf: "center" }}>
          {errors.additionalFieldsSelected && (
            <Error message={errors.additionalFieldsSelected} />
          )}
        </div>
        <div className="modal_action">
          <Button Icon={Cancel} text="Отмена" mode="secondary" func={cancel} />
          <Button
            text={`Запустить поиск ${selectedParams ? "повторно" : ""}`}
            Icon={Search}
            type="submit"
            disabled={Object.keys(errors).length >= 1}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchSirenaParams;
