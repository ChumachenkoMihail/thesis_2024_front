import { useFormik } from "formik";
import { csvConfirmationSchema } from "libs/schemas";
import Field from "components/app/input/Field";
import Button from "components/app/use/Button";
import { useDispatch } from "react-redux";
import {
  csvBulkSearch,
  updateCsvHistory,
} from "store/thunks/historyCsvThunks";

const CsvConfirmationModal = ({ cancel, json, defaultData }) => {
  const dispatch = useDispatch();
  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      name: defaultData ? defaultData.name : "",
    },
    enableReinitialize: true,
    validationSchema: csvConfirmationSchema,
    onSubmit: (values) => {
      defaultData &&
        dispatch(
          updateCsvHistory({
            data: { updatedName: values.name },
            historyId: defaultData.historyId,
          }),
        );
      !defaultData &&
        dispatch(
          csvBulkSearch({
            searchFields: json?.filter(Boolean),
            name: values.name,
          }),
        );
      cancel();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Field
        onChange={handleChange}
        value={values.name}
        name="name"
        error={errors.name}
        label="Название поиска"
        placeholder="Введите название поиска"
      ></Field>
      <div className="modal_action">
        <Button mode="secondary" text="Отмена" func={cancel} />
        <Button
          disabled={errors.name}
          mode="primary"
          text="Сохранить"
          type="submit"
        />
      </div>
    </form>
  );
};

export default CsvConfirmationModal;
