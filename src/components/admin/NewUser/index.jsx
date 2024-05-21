import Button from "components/app/use/Button";
import "./index.scss";
import Field from "components/app/input/Field";
import { useFormik } from "formik";
import CheckBox from "components/app/input/CheckBox";
import { v4 as uuid } from "uuid";
import { newUserSchema } from "libs/schemas";
import { useDispatch } from "react-redux";
import { createNewUser } from "store/thunks/usersThunks";
import Title from "components/app/use/Title";
import ReactSelect from "components/app/input/Select";
import { roleEnums } from "libs/Enums";
import Error from "components/app/use/Error";

const NewUser = ({ cancel, allLevels, allUsers }) => {
  const dispatch = useDispatch();
  const usersNames = allUsers.map((user) => user.username);
  const {
    handleSubmit,
    values,
    setFieldValue,
    setErrors,
    handleChange,
    errors,
  } = useFormik({
    initialValues: {
      login: "",
      accessLevels: [],
      role: "",
      comment: "",
    },
    validationSchema: newUserSchema,
    onSubmit: (values) => {
      if (usersNames.includes(values.login)) {
        setErrors({ login: "Пользователь с таким именем уже существует" });
        return;
      }
      const data = values;
      dispatch(createNewUser(data));
      cancel();
    },
  });
  const handleGenerateName = () => {
    setFieldValue(
      "login",
      `user${Math.floor(Math.random() * 100000000000000)}`,
    );
  };
  const handleCheckbox = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue("accessLevels", [
        ...values.accessLevels,
        Number(e.target.value),
      ]);
    } else {
      setFieldValue(
        "accessLevels",
        values.accessLevels.filter((value) => value !== Number(e.target.value)),
      );
    }
  };

  const handleChangeRole = (value) => {
    setFieldValue("role", value);
  };
  return (
    <form autoComplete="off" className="new_user-form" onSubmit={handleSubmit}>
      <div className="form_head">
        <Field
          label="Имя пользователя"
          placeholder="Введите имя пользователя"
          name="login"
          value={values.login}
          onChange={handleChange}
          error={errors.login}
        />
        <Button
          mode="tretiary"
          text="Cгенерировать"
          func={handleGenerateName}
        />
        <ReactSelect
          label="Роль"
          value={values.role}
          name="role"
          onChange={handleChangeRole}
          options={roleEnums}
          error={errors.role}
          placeholder="Выберите роль"
        />
      </div>
      <div className="new_user_access">
        <Title Tag="h4">Выберите уровень доступа</Title>
        <ul className="access_column">
          {allLevels?.map(({ levelName, levelId }) => {
            return (
              <li key={uuid()}>
                <CheckBox
                  onChange={handleCheckbox}
                  name={levelId}
                  checked={values.accessLevels.includes(levelId)}
                  title={levelName}
                  error={errors.accessLevels}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Field
        label="Комментарий"
        placeholder=""
        name="comment"
        type="textArea"
        value={values.comment}
        onChange={handleChange}
      />
      {errors.accessLevels && (
        <div>
          <Error message={errors.accessLevels} />
        </div>
      )}
      <div className="modal_action">
        <Button mode="secondary" text="Отмена" func={cancel} />
        <Button
          mode="primary"
          text="Создать пользователя"
          type="submit"
          disabled={errors.login}
        />
      </div>
    </form>
  );
};

export default NewUser;
