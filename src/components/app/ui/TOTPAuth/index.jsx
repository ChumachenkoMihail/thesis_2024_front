import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import ReactInputVerificationCode from "react-input-verification-code";
import Button from "components/app/use/Button";
import { ReactComponent as ArrowLeft } from "assets/images/arrow_left.svg";
import { ReactComponent as ArrowRight } from "assets/images/arrow_right.svg";
import { login } from "store/thunks/authThunks";
import { authActions } from "store/authSlice";

const TOTPAuth = ({ back, userName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.auth);

  const { values, setErrors, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      code: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const authObj = {
        login: userName,
        totpCode: values.code,
      };
      const val = values.code.replaceAll("-", "");
      if (val.length < 6) {
        setErrors({ code: "Код должен состоять из 6 цифр" });
        return;
      }
      dispatch(login({ authObj, navigate }));
    },
  });

  const handleChangeCode = (value) => {
    dispatch(authActions.clearError(null));
    setErrors({});
    setFieldValue("code", value);
  };

  const authObj = {
    login: userName,
    totpCode: values.code,
  };

  useEffect(() => {
    const val = values.code.replaceAll("-", "");
    if (val.length === 6) {
      dispatch(login({ authObj, navigate }));
    }
  }, [values.code]);

  useEffect(() => {
    if (authError) {
      setTimeout(() => {
        dispatch(authActions.clearError(null));
      }, 5000);
    }
  }, [authError]);

  return (
    <form
      autoComplete="off"
      className="login_form totp_form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
    >
      <div className={`custom_verify ${errors.code ? "verify_err" : ""}`}>
        <ReactInputVerificationCode
          length={6}
          placeholder="-"
          onChange={handleChangeCode}
          value={values.code}
          autoFocus={true}
        />
      </div>
      <div className="totp_action">
        <Button
          text="Назад"
          mode="secondary"
          className="btn_back"
          Icon={ArrowLeft}
          func={back}
        />
        <Button text="Войти" type="submit" Icon={ArrowRight} />
      </div>

      {errors.code && <p className="error">{errors.code}</p>}
    </form>
  );
};

export default TOTPAuth;
