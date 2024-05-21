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
import { login } from "store/thunks/authThunks";


const Login = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const authObj = {
        email: values.email,
        password: values.password,
      };
      dispatch(login({ authObj, navigate }));
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
                placeholder="Введіть ім'я користувача"
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
              <Button text="Увійти" type="submit" Icon={ArrowRight} />
            <NavLink
                to='/register'
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
              <Button text="Реєстрація" style={{backgroundColor: "#797575", borderColor : "#797575"}}  Icon={ArrowRight} />

            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
