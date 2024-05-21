import { useFormik } from "formik";
import { saveSearch } from "libs/schemas";
import Field from "components/app/input/Field";
import Button from "components/app/use/Button";
import { updateHistory } from "store/thunks/historyThunks";
import { useDispatch } from "react-redux";

const EditCreateSearchName = ({ cancel, defaultData, sourceID }) => {
  const dispatch = useDispatch();
  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      name: defaultData ? defaultData.name : "",
    },
    enableReinitialize: true,
    validationSchema: saveSearch,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        historyId: defaultData.historyId,
        sourceID: sourceID,
      };
      dispatch(updateHistory(data));
      cancel();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="Название поиска"
        placeholder="Введите название поиска"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <div className="modal_action">
        <Button mode="secondary" text="Отмена" func={cancel} />
        <Button mode="primary" text="Сохранить поиск" type="submit" />
      </div>
    </form>
  );
};

export default EditCreateSearchName;
