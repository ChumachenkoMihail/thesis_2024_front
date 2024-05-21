import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "layouts/Wrapper";
import Button from "components/app/use/Button";
import { ReactComponent as ArrowCurved } from "assets/images/arrow_back_curved.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as QR } from "assets/images/qr_code.svg";
import { ReactComponent as Key } from "assets/images/key.svg";
import Title from "components/app/use/Title";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "store/context/themeContextProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFromDetailsProfile,
  getUser,
} from "store/thunks/usersThunks";
import Loader from "components/app/use/Loader";
import "./index.scss";
import { useModal } from "store/context/ModalContext";
import Modal from "components/app/base/Modal";
import UserQr from "components/admin/UserQr/UserQr";
import UserAccessLevel from "components/admin/UserAccessLevel";
import { getAllLevelsWithFields } from "store/thunks/levelsThunks";
import UserProfileBalance from "components/app/ui/UserProfileBalance";
import UserProfileActions from "components/app/ui/UserProfileActions";
import UserDetailLogs from "components/admin/UserDetailLogs";
import { Tooltip as ReactTooltip } from "react-tooltip";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { userProfile, loading } = useSelector((state) => state.users);
  const { levels } = useSelector((state) => state.levels);
  const { isDarkTheme } = useContext(ThemeContext);
  const [qrModal, setQrModal] = useState(false);
  const [userQr, setUserQr] = useState({});
  const [accessModal, setAccessModal] = useState(false);
  const [userAccessData, setUserAccessData] = useState({});
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getAllLevelsWithFields());
  }, []);
  const handleDeleteUser = (id, username) => {
    openModal(
      deleteUserFromDetailsProfile,
      { id, username, navigate },
      {
        title: "Удаление пользователя",
        message: `Вы действительно хотите удалить пользователя ${username}?`,
        type: "delete",
      },
    );
  };
  const handleQrModal = (values) => {
    setUserQr(values);
    setQrModal(!qrModal);
  };
  const handleAccessModal = (values) => {
    setUserAccessData(values);
    setAccessModal(!accessModal);
  };
  return (
    <>
      {loading && <Loader />}
      {qrModal && (
        <Modal Icon={QR} title="QR код" closeModal={handleQrModal}>
          <UserQr cancel={() => setQrModal(!qrModal)} values={userQr} />
        </Modal>
      )}
      {accessModal && (
        <Modal
          Icon={Key}
          title="Управление доступом"
          closeModal={handleAccessModal}
        >
          <UserAccessLevel
            allLevels={levels}
            state={userAccessData}
            cancel={handleAccessModal}
          />
        </Modal>
      )}
      {userProfile ? (
        <>
          <div className="kermit_user_details">
            <ReactTooltip
              id="comment-tooltip"
              className={`kermit_tooltip ${isDarkTheme ? "" : "tooltip_light"}`}
              place="top"
            />
            <Wrapper
              className={`kermit_user  ${
                isDarkTheme ? "" : "kermit_user_light"
              } kermit_user`}
            >
              <div className="details_container">
                <div className="wrapper_head">
                  <div className="head_details">
                    <Button
                      text=" "
                      Icon={ArrowCurved}
                      func={() => navigate(-1)}
                    />
                    <div className="head_title">
                      <Title Tag="h3">
                        <>
                          {userProfile?.username}
                          <p
                            data-tooltip-id="comment-tooltip"
                            data-tooltip-content={userProfile.comment}
                            data-tooltip-place="top"
                            style={{
                              color: "#006eff",
                              maxWidth: "300px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {userProfile.comment
                              ? `- ${userProfile.comment}`
                              : ""}
                          </p>
                        </>
                      </Title>
                      <div className="user_status">
                        <div className={`status_dot ${userProfile?.status}`} />
                        <Title Tag="h4">
                          {userProfile?.status === "active"
                            ? "Активный сертификат"
                            : "Сертификат отключен"}
                        </Title>
                      </div>
                    </div>
                  </div>
                  <div className="head_actions">
                    <Button
                      Icon={Key}
                      mode="tretiary"
                      text="Управление доступом"
                      func={() =>
                        handleAccessModal({
                          accessLevels: userProfile?.accessLevels,
                          username: userProfile?.username,
                          role: userProfile?.role,
                          id,
                        })
                      }
                    />
                    <Button
                      Icon={QR}
                      mode="tretiary"
                      text="QR код"
                      func={() =>
                        handleQrModal({
                          qr: userProfile?.totpUrl,
                          name: userProfile?.username,
                          id: id,
                        })
                      }
                    />
                    <Button
                      style={{
                        padding: "10px",
                      }}
                      mode="tretiary"
                      Icon={Trash}
                      func={() => handleDeleteUser(id, userProfile?.username)}
                    />
                  </div>
                </div>
                <div className="user_actions_row">
                  {userProfile?.credits && (
                    <div className="action_column">
                      <Title Tag="h3">Баланс пользователя</Title>

                      <UserProfileBalance
                        userId={id}
                        credits={userProfile?.credits}
                      />
                    </div>
                  )}

                  <div className="action_column">
                    <Title Tag="h3">Управление аккаунтом</Title>
                    <UserProfileActions userProfile={userProfile} />
                  </div>
                </div>
              </div>
            </Wrapper>
            <UserDetailLogs userId={id} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default UserDetails;
