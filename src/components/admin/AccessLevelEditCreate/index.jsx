import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import "./index.scss";
import Button from "components/app/use/Button";
import Field from "components/app/input/Field";
import { newAccessLevelSchema } from "libs/schemas";
import {
  addNewLevel,
  updateLevel,
  updateLevelSources,
} from "store/thunks/levelsThunks";
import AccessLevelsDrop from "components/admin/AccessLevelsDrop";
import { ThemeContext } from "store/context/themeContextProvider";
import Error from "components/app/use/Error";
import Accordion from "components/app/base/Accordion";
import AccessToSources from "components/app/ui/AccessToSources";

const AccessLevelEditCreate = React.memo(function AccessLevelEditCreate({
  searchFields,
  cancel,
  initialState,
}) {
  const [indexOpen, setIndexOpen] = useState([0]);
  const { isDarkTheme } = useContext(ThemeContext);
  let mergedArray = [];
  if (initialState) {
    for (const item of initialState?.sources) {
      const availableFields = item.availableFields;
      for (const field of availableFields) {
        const ob = { ...field };
        ob.sourceId = item.sourceId;
        delete ob.fieldName;
        mergedArray.push(ob);
      }
    }
  }
  const dispatch = useDispatch();
  const ediState = {
    availableFieldsWithSources: mergedArray,
    name: initialState?.name,
    availableSources:
      [
        ...(initialState?.dataSourcesDb || []),
        ...(initialState?.dataSourcesApi || []),
      ]?.map((item) => item?.sourceId) || [],
    levelId: initialState?.levelId,
  };
  const { handleSubmit, values, setFieldValue, handleChange, errors } =
    useFormik({
      initialValues: initialState
        ? ediState
        : {
            availableFieldsWithSources: [],
            availableSources: [],
            name: "",
          },
      enableReinitialize: true,
      validationSchema: newAccessLevelSchema,
      onSubmit: (values) => {
        const data = values;
        if (initialState) {
          dispatch(updateLevel({ levelId: initialState?.levelId, data }));
          dispatch(
            updateLevelSources({
              levelId: initialState?.levelId,
              availableSources: data.availableSources,
            }),
          );
        } else {
          dispatch(addNewLevel(values));
        }
        cancel();
      },
    });
  const handleCheckbox = (e, id) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("availableFieldsWithSources", [
        ...values.availableFieldsWithSources,
        {
          fieldId: Number(e.target.value),
          sourceId: Number(id),
        },
      ]);
    } else {
      setFieldValue(
        "availableFieldsWithSources",
        values.availableFieldsWithSources.filter(
          (value) => Number(value.fieldId) !== Number(e.target.value),
        ),
      );
    }
  };
  const handleOpen = (index) => {
    /// legacy code, formik state rerender children when selected some checkbox, and drop down closed
    if (indexOpen.includes(index)) {
      setIndexOpen(indexOpen.filter((val) => val !== index));
    } else {
      setIndexOpen((prevIndexOpen) => [...prevIndexOpen, index]);
    }
  };
  const handleCheckedAll = (e, sourceId, fields) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      const updateFields = fields?.map((i) => {
        return {
          fieldId: i.id,
          sourceId: sourceId,
        };
      });
      const combinedArray = Array.from(
        new Set(
          [...values.availableFieldsWithSources, ...updateFields].map(
            (obj) => obj.fieldId,
          ),
        ),
      ).map((fieldId) => {
        return [...values.availableFieldsWithSources, ...updateFields].find(
          (obj) => obj.fieldId === fieldId,
        );
      });
      setFieldValue("availableFieldsWithSources", combinedArray);
    } else {
      setFieldValue(
        "availableFieldsWithSources",
        values.availableFieldsWithSources.filter(
          (value) => value.sourceId !== sourceId,
        ),
      );
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`new_access_form ${isDarkTheme ? "" : "access_form_light"} `}
      >
        <Field
          label="Название уровня доступа"
          placeholder="Введите название уровня доступа"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          id="name"
        />
        <div className="access_fields">
          <Accordion title="Доступ к полями">
            <ul className="access_column">
              {searchFields
                ?.filter((item) => item?.fields?.length)
                .map(({ name, id, fields }, index) => {
                  const checkedAll = values?.availableFieldsWithSources.filter(
                    (s) => s?.sourceId === id,
                  )?.length;
                  return (
                    <AccessLevelsDrop
                      checkAll={handleCheckedAll}
                      setIndexOpen={handleOpen}
                      indexOpen={indexOpen}
                      index={index}
                      isCheckedAll={checkedAll === fields?.length}
                      sourceID={id}
                      onChange={handleCheckbox}
                      key={uuid()}
                      nameBD={name}
                      sourceFields={fields}
                      allSource={searchFields}
                      checkedValues={values.availableFieldsWithSources}
                      checkBoxError={errors.availableFieldsWithSources}
                    />
                  );
                })}
            </ul>
          </Accordion>
        </div>
        <div className="access_sources">
          <Accordion title="Доступ к базам">
            <AccessToSources
              values={values}
              setFieldValue={setFieldValue}
              allDataBasesList={searchFields?.filter(
                (item) => item?.sourceType === "db",
              )}
              sources={initialState?.dataSourcesDb}
              levelId={initialState?.levelId}
            />
          </Accordion>
        </div>
        <div className="access_sources">
          <Accordion title="Доступ к API">
            <AccessToSources
              values={values}
              setFieldValue={setFieldValue}
              allDataBasesList={searchFields?.filter(
                (item) => item?.sourceType === "api",
              )}
              sources={initialState?.dataSourcesApi}
              levelId={initialState?.levelId}
            />
          </Accordion>
        </div>
        <div className="modal_action">
          <div className="action_error" style={{ marginRight: "auto" }}>
            {errors.name && <Error message={errors.name} />}
            {errors.availableFieldsWithSources && (
              <Error message={errors.availableFieldsWithSources} />
            )}
          </div>
          <Button mode="secondary" text="Отмена" func={() => cancel(null)} />
          <Button
            mode="primary"
            text={`${initialState ? "Сохранить" : "Создать уровень доступа"}`}
            type="submit"
            disabled={errors.name || errors.availableFieldsWithSources}
          />
        </div>
      </form>
    </>
  );
});

export default AccessLevelEditCreate;
