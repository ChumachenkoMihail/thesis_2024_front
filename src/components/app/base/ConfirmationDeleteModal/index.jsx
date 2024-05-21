import { useContext } from "react";
import { useModal } from "store/context/ModalContext";
import Modal from "components/app/base/Modal";
import CheckBox from "components/app/input/CheckBox";
import Button from "components/app/use/Button";
import { ThemeContext } from "store/context/themeContextProvider";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Cancel } from "assets/images/cancel.svg";
import { ReactComponent as Save } from "assets/images/save_icon.svg";
import "./index.scss";

const ConfirmationDeleteModal = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    isModalOpen,
    closeModal,
    dontAskAgain,
    shouldAskConfirmation,
    handleDelete,
    setDontAskAgain,
    modalText,
  } = useModal();

  const handleCheckboxChange = () => {
    setDontAskAgain(!dontAskAgain);
  };
  return (
    isModalOpen &&
    shouldAskConfirmation && (
      <Modal
        width="600"
        Icon={
          modalText.type === "cancelEdit"
            ? Cancel
            : modalText.type === "delete"
            ? Trash
            : modalText.type === "saveEdit"
            ? Save
            : Trash
        }
        title={modalText?.title}
        closeModal={closeModal}
      >
        <div
          className={`confirmation_modal ${isDarkTheme ? "" : "confirm_light"}`}
        >
          <div className="confirmation_modal-content">
            <p className="content_message">{modalText?.message}</p>

            <div className="confirm_actions">
              <div className="action_ask">
              </div>
              <div className="buttons_actions">
                <Button text="Відміна" mode="secondary" func={closeModal} />
                <Button
                  mode="primary"
                  text={`${
                    modalText.type === "delete"
                      ? "Видалити"
                      : modalText.type === "saveEdit"
                      ? "Сохранить"
                      : modalText.type === "cancelEdit"
                      ? "Отменить редактирование"
                      : "Сохранить"
                  }`}
                  func={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ConfirmationDeleteModal;
