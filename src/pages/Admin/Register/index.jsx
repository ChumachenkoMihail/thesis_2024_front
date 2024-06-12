import { useContext } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useFormik } from "formik";
import Field from "components/app/input/Field";
import Button from "components/app/use/Button";
import Title from "components/app/use/Title";
import LogoWrapper from "components/app/base/LogoWrapper";
import Loader from "components/app/use/Loader";
import { loginSchema } from "libs/schemas";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as ArrowRight } from "assets/images/arrow_right.svg";
import "./index.scss";
import {Navigate, NavLink, Route, useNavigate} from "react-router-dom";
import { register } from "store/thunks/authThunks";


const Register = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      position: ""
    },
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const authObj = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        position: values.position,
      };
      dispatch(register({ authObj, navigate }));
    },
  });
  if (token) {
    return <Navigate to="/organizations" />;
  }
  return (
    <>
      {loading && <Loader />}
      <div className={`kermit_login ${isDarkTheme ? "" : "light_login"}`}>
        <div className="login_wrapper">
          <LogoWrapper />
          <Title Tag="h4">Bugira</Title>
          <form
              autoComplete="off"
              className="login_form"
              onSubmit={handleSubmit}
            >
              <Field
                name="email"
                placeholder="Введіть логін"
                label="Ім'я користувача"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
              />
              <Field
                  name="password"
                  placeholder="Введіть пароль"
                  label="Пароль"
                  type='password'
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password}
              />
            <Field
                name="firstName"
                placeholder="Введіть ім'я"
                label="Ім'я"
                onChange={handleChange}
                value={values.firstName}
                error={errors.firstName}
            />
            <Field
                name="lastName"
                placeholder="Введіть прізвище"
                label="Прізвище"
                onChange={handleChange}
                value={values.lastName}
                error={errors.lastName}
            />
            <Field
                name="position"
                placeholder="Введіть посаду"
                label="Посада"
                onChange={handleChange}
                value={values.position}
                error={errors.position}
            />
              <Button text="Реєстрація" type="submit" Icon={ArrowRight} />
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
              <Button text="Увійти" style={{backgroundColor: "#797575", borderColor : "#797575"}}  Icon={ArrowRight} />


            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
