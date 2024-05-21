import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import CheckBox from "components/app/input/CheckBox";
import "./index.scss";
import Field from "components/app/input/Field";
import Button from "components/app/use/Button";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Plus } from "assets/images/plus.svg";
import {
  addAnketToFolder,
  createNewFolder,
} from "store/thunks/foldersThunks";
import Loader from "components/app/use/Loader";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "components/app/use/Title";
import { addUserToFolder } from "libs/schemas";

const AddToFolder = ({
  cancel,
  folders,
  userID,
  userFolders,
  anketSourceId,
}) => {
  const { loading } = useSelector((state) => state.folders);
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  let userFolds = userFolders?.map((i) => i.folderId) || [];
  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    errors,
    setErrors,
  } = useFormik({
    initialValues: {
      folderIds: userFolds,
      name: "",
    },
    enableReinitialize: true,
    validationSchema: addUserToFolder,
    onSubmit: (values) => {
      const data = {
        anketId: userID,
        folderIds: values.folderIds,
        sourceId: Number(anketSourceId),
      };
      dispatch(addAnketToFolder({ data, anketSourceId }));
      cancel();
    },
  });

  const handleCheckbox = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("folderIds", [
        ...values?.folderIds,
        Number(e.target.value),
      ]);
    } else {
      setFieldValue(
        "folderIds",
        values.folderIds.filter((value) => value !== Number(e.target.value)),
      );
    }
  };
  const handleNewFolder = () => {
    if (values.name === "") {
      setErrors({ name: "Введите название для папки" });
    } else {
      dispatch(createNewFolder({ name: values.name }));
      setFieldValue("name", "");
    }
  };
  return (
    <>
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className={`folders_wrapp_form ${
          isDarkTheme ? "" : "folders_wrapp_light"
        }`}
      >
        <Title Tag="h4">Выберите одну или несколько папок</Title>
        {folders?.length ? (
          <ul className="folders_column">
            {folders?.map(({ name, id }) => {
              return (
                <li key={uuid()}>
                  <CheckBox
                    onChange={handleCheckbox}
                    name={id}
                    checked={values?.folderIds?.includes(id)}
                    title={name}
                    error={errors.folderIds}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <Title Tag="h2" style={{ justifyContent: "center" }}>
            Нет созданных папок
          </Title>
        )}

        <div className="hr" />
        <div className="folders_actions">
          <Title Tag="h4">Создайте новую папку</Title>
          <div className="folders_actions_row">
            <Field
              onChange={handleChange}
              value={values.name}
              name="name"
              error={errors.name}
              label="Название папки"
              placeholder="Введите название папки"
            ></Field>
            <Button
              mode="tretiary"
              text="Создать папку"
              func={handleNewFolder}
              type="button"
              Icon={Plus}
            />
          </div>
        </div>
        <div className="modal_action">
          <Button mode="secondary" text="Отмена" func={cancel} />
          <Button
            disabled={errors.folderIds}
            mode="primary"
            text="Сохранить"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default AddToFolder;
