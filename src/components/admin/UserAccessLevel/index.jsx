import "./index.scss";
import { v4 as uuid } from "uuid";
import CheckBox from "components/app/input/CheckBox";
import { useFormik } from "formik";
import Button from "components/app/use/Button";
import { updateUserAccess } from "libs/schemas";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateUserRole } from "store/thunks/usersThunks";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "components/app/use/Title";
import { roleEnums } from "libs/Enums";
import ReactSelect from "components/app/input/Select";
import Field from "components/app/input/Field";
import Error from "components/app/use/Error";

const UserAccessLevel = ({ cancel, state, allLevels }) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const { userProfile } = useSelector((state) => state.users);
  let userLevelsId = state?.accessLevels?.map((l) => l.id);
  const id = state.id; // user id
  const { handleSubmit, values, handleChange, setFieldValue, errors } =
    useFormik({
      initialValues: {
        accessLevels: userLevelsId,
        role: userProfile?.role || "",
        comment: userProfile?.comment,
      },
      enableReinitialize: true,
      validationSchema: updateUserAccess,
      onSubmit: (values) => {
        const data = values;
        dispatch(updateUser({ id, data, isAccess: true }));
        cancel();
      },
    });

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
  const handleChangeRole = async (value) => {
    await dispatch(updateUserRole({ userId: userProfile?.id, role: value }));
    cancel();
  };
  return (
    <form
      className={`user_access_level ${
        isDarkTheme ? "" : "access_level_light"
      } `}
      onSubmit={handleSubmit}
    >
      <div>
        <p>Пользователь:</p>
        <Title Tag="h3">{state?.username}</Title>
      </div>
      <ReactSelect
        label="Роль"
        value={values.role}
        name="role"
        onChange={handleChangeRole}
        options={roleEnums}
        placeholder="Выберите роль"
      />
      <Title Tag="h4">Выберите уровень доступа</Title>
      <ul className="access_column">
        {allLevels?.map(({ levelName, levelId }) => {
          return (
            <li key={uuid()}>
              <CheckBox
                error={errors.accessLevels}
                onChange={handleCheckbox}
                name={levelId}
                checked={values.accessLevels.includes(levelId)}
                title={levelName}
              />
            </li>
          );
        })}
      </ul>
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

        <Button mode="primary" text="Сохранить" type="submit" />
      </div>
    </form>
  );
};

export default UserAccessLevel;
