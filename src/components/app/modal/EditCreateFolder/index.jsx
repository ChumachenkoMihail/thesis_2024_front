import "./index.scss";
import Field from "components/app/input/Field";
import { useFormik } from "formik";
import { foldersSchema } from "libs/schemas";
import Button from "components/app/use/Button";
import { useDispatch } from "react-redux";
import {
  createNewFolder,
  updateFolder,
} from "store/thunks/foldersThunks";

const EditCreateFolder = ({ cancel, isEdit, foldersNames }) => {
  const dispatch = useDispatch();
  const { handleSubmit, values, handleChange, errors, setErrors } = useFormik({
    initialValues: {
      name: isEdit ? isEdit?.name : "",
    },
    enableReinitialize: true,
    validationSchema: foldersSchema,
    onSubmit: (values) => {
      if (foldersNames.includes(values.name)) {
        setErrors({ name: "Папка с таким именем уже существует" });
        return;
      }
      if (isEdit) {
        const folderId = isEdit.id;
        const data = {
          name: values.name,
        };
        dispatch(updateFolder({ data, folderId }));
      } else {
        dispatch(createNewFolder(values));
      }
      cancel();
    },
  });
  return (
    <form className="folders_form" onSubmit={handleSubmit}>
      <Field
        name="name"
        onChange={handleChange}
        value={values.name}
        error={errors.name}
        label="Название папки"
        placeholder="Введите название папки"
      />
      <div className="modal_action">
        <Button mode="secondary" text="Отмена" func={cancel} />

        <Button mode="primary" text={`Сохранить`} type="submit" />
      </div>
    </form>
  );
};

export default EditCreateFolder;
