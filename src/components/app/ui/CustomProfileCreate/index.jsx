import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import "./index.scss";
import Button from "components/app/use/Button";
import Field from "components/app/input/Field";
import { ReactComponent as Search } from "assets/images/search_2.svg";
import CheckBox from "components/app/input/CheckBox";
import {
  addDataToAnket,
  createNewCustomAnket,
  findAnketByName,
} from "store/thunks/customProfileThunks";
import { ReactComponent as Plus } from "assets/images/plus.svg";

import { useEffect, useContext } from "react";
import { createCustomProfileSchema } from "libs/schemas";
import { ThemeContext } from "store/context/themeContextProvider";
import { removeEmptyValues } from "libs/parseApi";
import { generateCustomProfileFields } from "libs/generateCustomProfileFields";
import Title from "components/app/use/Title";
import RadioButton from "components/app/input/RadioButton";
import Error from "components/app/use/Error";

const CustomProfileCreate = ({ cancel, allAvailableFields, userAnket }) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const { anketsFindList, newCustomAnket } = useSelector(
    (state) => state.custom,
  );
  const removeEmptyAnketData = removeEmptyValues(userAnket);

  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    errors,
    setErrors,
  } = useFormik({
    initialValues: {
      name: "",
      anketId: null,
      fieldsIds: [],
    },
    enableReinitialize: true,
    validationSchema: createCustomProfileSchema,
    onSubmit: (values) => {
      const extractedValues = generateCustomProfileFields(
        values?.fieldsIds,
        removeEmptyAnketData,
      );
      extractedValues &&
        dispatch(addDataToAnket({ id: values.anketId, data: extractedValues }));
      cancel();
    },
  });
  const handleNewProfile = () => {
    const profileName = values.name?.toString()?.trim();
    if (profileName === "") {
      setErrors({ name: "Введите название для анкеты" });
    } else {
      dispatch(createNewCustomAnket({ name: profileName }));
      setFieldValue("name", "");
    }
  };

  const handleCheckbox = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("fieldsIds", [...values.fieldsIds, e.target.value]);
    } else {
      setFieldValue(
        "fieldsIds",
        values.fieldsIds.filter((value) => value !== e.target.value),
      );
    }
  };
  const handleCheckedAll = (e, fields) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      const updateFields = fields?.map((i) => i.fieldId);
      setFieldValue("fieldsIds", updateFields);
    } else {
      setFieldValue("fieldsIds", []);
    }
  };

  const handleAnketId = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("anketId", e.target.value);
    } else {
      setFieldValue("anketId", null);
    }
  };

  useEffect(() => {
    if (values.name?.toString()?.trim() !== "") {
      dispatch(findAnketByName(values.name));
    }
  }, [values.name]);
  const checkedAll = values?.fieldsIds?.length;
  return (
    <form className="profile_create" onSubmit={handleSubmit}>
      <div className={`profile_row ${isDarkTheme ? "" : "row_light"}`}>
        <div
          className={`profile_data_column ${isDarkTheme ? "" : "column_light"}`}
        >
          <Title Tag="h4">Существующая информация</Title>
          <div className="selected_action">
            <CheckBox
              checkedAll
              onChange={(e) => handleCheckedAll(e, allAvailableFields)}
              name={`all`}
              title="Отметить все"
              checked={checkedAll === allAvailableFields?.length}
            />
          </div>
          <ul className="fields_column">
            {allAvailableFields?.map(({ name, fieldId }) => {
              return (
                <li key={uuid()}>
                  <CheckBox
                    onChange={handleCheckbox}
                    name={fieldId}
                    checked={values.fieldsIds.includes(fieldId)}
                    title={name}
                    error={errors.fieldsIds}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`profile_data_column ${isDarkTheme ? "" : "column_light"}`}
        >
          <Title Tag="h4">
            Введите название анкеты для поиска с существующих, или создайте
            новую
          </Title>
          <div className="action_create_row">
            <Field
              name="name"
              Icon={Search}
              label="Название анкеты"
              placeholder="Введите название анкеты"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
            />
            <Button
              func={handleNewProfile}
              text="Создать анкету"
              type="button"
              mode="tretiary"
              Icon={Plus}
            />
          </div>

          {newCustomAnket ? (
            <ul className="find_ankets_list new_anket_list">
              <li
                key={uuid()}
                className={`new_anket ${
                  values?.anketId?.includes(newCustomAnket?.id)
                    ? "selected "
                    : ""
                }`}
              >
                <RadioButton
                  onChange={handleAnketId}
                  name={newCustomAnket?.id}
                  checked={values?.anketId?.includes(newCustomAnket?.id)}
                  text={newCustomAnket?.name}
                  error={errors.anketId}
                  value={newCustomAnket?.id}
                />
              </li>
            </ul>
          ) : null}

          <ul className="find_ankets_list">
            {anketsFindList?.map(({ name, id }) => {
              return (
                <li
                  key={uuid()}
                  className={`${
                    values?.anketId?.includes(id) ? "selected" : ""
                  }`}
                >
                  <RadioButton
                    onChange={handleAnketId}
                    name={id}
                    checked={values?.anketId?.includes(id)}
                    text={name}
                    error={errors.anketId}
                    value={id}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="create_profile_actions">
        <div className="action_error">
          {(errors?.fieldsIds || errors?.anketId) && (
            <Error message={errors?.fieldsIds || errors?.anketId} />
          )}
        </div>
        <div className="modal_action">
          <Button mode="secondary" text="Отмена" func={cancel} />
          <Button
            disabled={Object.keys(errors).length >= 1}
            mode="primary"
            text="Добавить в анкету"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default CustomProfileCreate;
