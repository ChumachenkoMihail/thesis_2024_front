import React, { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { useSelector } from "react-redux";
import Loader from "../../components/app/use/Loader";

const Wrapper = ({ className, children }) => {
  const { loading } = useSelector((state) => state.global);

  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`${className ? className : ""} kermit_wrapper ${
            isDarkTheme ? "" : "wrapper_light"
          }`}
        >
          <div className="wrapper_inner">{children}</div>
        </div>
      )}
    </>
  );
};

export default Wrapper;
