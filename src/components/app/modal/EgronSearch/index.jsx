import React from "react";
import { useFormik } from "formik";
import { egronSearchSchema } from "../../../../libs/schemas";
import "./index.scss";
import Title from "../../use/Title";
import RadioButton from "../../input/RadioButton";
import { searchAnkets } from "../../../../store/thunks/searchThunks";
import { useDispatch } from "react-redux";
import Button from "../../use/Button";
import moment from "moment";
const EgronSearch = ({ fields, cancel }) => {
  const dispatch = useDispatch();
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      selectedValue: "",
    },
    validationSchema: egronSearchSchema,
    onSubmit: async (values) => {
      if (values.selectedValue !== "") {
        if (values.selectedValue === "fio") {
          const current = moment().format("YYYY");
          const check = moment(fields?.dob, "YYYY/MM/DD");
          const month = check.format("M");
          const day = check.format("D");
          const year = check.format("YYYY");
          const birth = {
            dateOfBirth: {
              from: {
                year: current < year ? "" : year,
                month: month,
                day: day,
              },
              to: {
                year: current < year ? "" : year,
                month: month,
                day: day,
              },
            },
          };
          dispatch(
            searchAnkets({
              ...fields[values.selectedValue],
              ...(fields.dob ? birth : {}),
            }),
          );
        } else {
          dispatch(searchAnkets({ ...fields[values.selectedValue] }));
        }
      }
    },
  });
  return (
    fields && (
      <form onSubmit={handleSubmit} className="egron_search_fields">
        <Title Tag="h4">Выберите данные для поиска</Title>
        {Object.values(fields?.fio)?.length ? (
          <RadioButton
            onChange={() => setFieldValue("selectedValue", "fio")}
            name={"fio"}
            checked={values?.selectedValue === "fio"}
            text={"ФИО"}
            value={"fio"}
          />
        ) : null}
        {fields?.snils && (
          <RadioButton
            onChange={() => setFieldValue("selectedValue", "snils")}
            name={"snils"}
            checked={values?.selectedValue === "snils"}
            text={"№ Соц страхования"}
            value={"snils"}
          />
        )}
        {Object.values(fields?.passport?.localPassport)?.length ? (
          <RadioButton
            onChange={() => setFieldValue("selectedValue", "passport")}
            name={"passport"}
            checked={values?.selectedValue === "passport"}
            text={"Паспорт серия/номер"}
            value={"passport"}
          />
        ) : null}
        <div className="modal_action">
          <Button mode="secondary" text="Отмена" func={cancel} />
          <Button
            mode="primary"
            disabled={Object.keys(errors).length >= 1}
            text={`Запустить поиск`}
            type="submit"
          />
        </div>
      </form>
    )
  );
};

export default EgronSearch;
