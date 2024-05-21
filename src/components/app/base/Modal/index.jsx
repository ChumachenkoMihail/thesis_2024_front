import "./index.scss";
import { useOutsideClick } from "libs/hooks/useOutsideClick";
import { ReactComponent as Close } from "assets/images/close_modal.svg";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import Title from "components/app/use/Title";

const Modal = ({
  className,
  children,
  closeModal,
  title,
  subTitle,
  Icon,
  width = "520",
  minWidth = null,
  subChildren = null,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const close = () => {
    closeModal();
  };

  const ref = useOutsideClick(close);

  return (
    <div
      className={`modal_wrapper ${className ? className : ""} ${
        isDarkTheme ? "" : "modal_wrapper_light"
      }`}
    >
      <div
        className="wrapper_outer"
        style={{
          maxWidth: `${+width + 32}px`,
          maxHeight: "95vh",
          minWidth: ` ${minWidth ?? +minWidth}px`,
        }}
      >
        <div ref={ref} className="wrapper_inner">
          <div className="inner_content">
            <div className="modal_head">
              <div className="head-row-top">
                <div className="head_title">
                  <Title Tag="h2">
                    {Icon ? <Icon /> : null}
                    {title}
                  </Title>
                  {subTitle && (
                    <Title Tag="h4" titleType="title_secondary">
                      {subTitle}
                    </Title>
                  )}
                  {subChildren}
                  {/*{subTitle && <p className="head_sub-title">{subTitle}</p>}*/}
                </div>
                <Close className="close" onClick={close} />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
