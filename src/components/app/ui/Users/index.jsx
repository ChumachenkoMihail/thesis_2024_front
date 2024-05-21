import { v4 as uuid } from "uuid";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/app/use/Button";
import Modal from "components/app/base/Modal";
import NewUser from "components/app/../admin/NewUser";
import UserQr from "components/app/../admin/UserQr/UserQr";
import IOSwitch from "components/app/use/IOSwitch";
import Loader from "components/app/use/Loader";
import { ReactComponent as Plus } from "assets/images/user_plus.svg";
import { ReactComponent as Copy } from "assets/images/copy.svg";
import { ReactComponent as QR } from "assets/images/qr_code.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { ReactComponent as Pencil } from "assets/images/pencil_edit.svg";
import { ReactComponent as Clear } from "assets/images/clear_input.svg";
import { ReactComponent as SearchLoop } from "assets/images/Select/search.svg";
import { ReactComponent as Empty } from "assets/images/empty_page.svg";

import { deleteUser, getAllUsers, updateUser } from "store/thunks/usersThunks";
import { getAllLevelsWithFields } from "store/thunks/levelsThunks";
import Wrapper from "layouts/Wrapper";
import "./index.scss";
import { useModal } from "store/context/ModalContext";
import Title from "components/app/use/Title";
import ResultCounter from "components/app/use/ResultCounter";
import { copyToTextClipboard } from "libs/clipboardCopy";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "store/context/themeContextProvider";
import SearchTable from "components/app/base/SearchTable";
import Field from "components/app/input/Field";
import DropDown from "components/app/use/DropDown";
import { creditsNameEnum, usersFilterEnum } from "libs/Enums";
import ReactSelect from "components/app/input/Select";
import { usersActions } from "store/usersSlice";
import EmptyPage from "components/app/base/EmptyPage";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);
  const { openModal } = useModal();
  const { users, loading, filterUsersBy } = useSelector((state) => state.users);
  const { levels } = useSelector((state) => state.levels);
  const [newUserModal, setNewUserModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [userQr, setUserQr] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchData = () => {
    dispatch(
      getAllUsers({
        query: searchQuery,
        filterBy: filterUsersBy.value,
      }),
    );
  };

  useEffect(() => {
    fetchData(); // Call the function immediately on the initial render
    let timerId;

    const handleFetchData = () => {
      clearTimeout(timerId);

      if (searchQuery.length > 3 || searchQuery === "") {
        timerId = setTimeout(
          () => {
            fetchData();
          },
          searchQuery.length > 3 ? 2000 : 1000,
        );
      }
    };
    !isFirstRender && handleFetchData();
    setIsFirstRender(false);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery, filterUsersBy]);
  const handleNewUserModal = () => {
    setNewUserModal(!newUserModal);
  };
  const handleQrModal = (values) => {
    setUserQr(values);
    setQrModal(!qrModal);
  };

  const handleDetailsUser = (anketId) => {
    navigate(`/admin/settings/manage/user/${anketId}`);
  };
  const handleCheckboxChange = (id) => {
    const user = users.find((user) => user.id === id);
    if (user.status === "active") {
      const data = { status: "restricted" };
      dispatch(updateUser({ id, data }));
    } else {
      const data = { status: "active" };
      dispatch(updateUser({ id, data }));
    }
  };
  const handleGetByName = (e) => {
    const queryStr = e.target.value?.trim();
    setSearchQuery(queryStr);
  };
  const handleDeleteUser = (id, username) => {
    openModal(
      deleteUser,
      { id, username },
      {
        title: "Удаление пользователя",
        message: `Вы действительно хотите удалить пользователя ${username}?`,
        type: "delete",
      },
    );
  };

  const handleChangeFilter = (option) => {
    const selectedFilter = usersFilterEnum.find((opt) => opt.value === option);
    dispatch(usersActions.setFilter(selectedFilter));
  };
  return (
    <>
      {loading && <Loader />}
      {newUserModal && (
        <Modal
          Icon={Plus}
          title="Создание пользователя"
          closeModal={handleNewUserModal}
        >
          <NewUser
            allUsers={users}
            allLevels={levels}
            cancel={handleNewUserModal}
          />
        </Modal>
      )}
      {qrModal && (
        <Modal Icon={QR} title="QR код" closeModal={handleQrModal}>
          <UserQr cancel={() => setQrModal(!qrModal)} values={userQr} />
        </Modal>
      )}
      <Wrapper className="kermit_users">
        <div className="accordion_content accordion_column">
          <div className="wrapper_head" style={{ marginBottom: "24px" }}>
            <div className="head_vis-l">
              <Title Tag="h4">Пользователи</Title>
              {users?.length ? (
                <div className="head_count_bordered">
                  <ResultCounter text="Пользователей:" count={users?.length} />
                </div>
              ) : null}
            </div>
            <div className="head_vis-r">
              <Button
                Icon={Plus}
                text="Создать пользователя"
                func={handleNewUserModal}
              />
            </div>
          </div>
          <div className="users_search_action">
            <Field
              name="searchQuery"
              placeholder="Поиск по имени пользователя"
              onChange={handleGetByName}
              value={searchQuery}
              Icon={SearchLoop}
            >
              {searchQuery && (
                <Clear
                  className="clear_field"
                  onClick={() => setSearchQuery("")}
                />
              )}
            </Field>
            <ReactSelect
              options={usersFilterEnum}
              name="sort_search"
              placeholder={filterUsersBy.label}
              value={filterUsersBy.value}
              onChange={handleChangeFilter}
              label=""
              type="filter"
            />
          </div>
          <ReactTooltip
            id="creditCount"
            className={`kermit_tooltip ${isDarkTheme ? "" : "tooltip_light"}`}
            place="top"
          />
          <SearchTable>
            {users?.map(
              ({ username, status, totpUrl, id, role, credits, comment }) => {
                const creditsArray = Object?.entries(credits)?.map(
                  ([creditName, creditCount]) => {
                    return {
                      creditName,
                      creditCount,
                    };
                  },
                );
                const userWithLowCredit =
                  role === "user" &&
                  Object.values(credits)?.some(
                    (credit) => credit !== null && credit !== -1 && credit < 10,
                  );
                return (
                  <tr key={uuid()}>
                    <td className="table_cell_switch">
                      <IOSwitch
                        onChange={handleCheckboxChange}
                        id={id}
                        isChecked={status === "active"}
                      />
                    </td>
                    <td className="table_cell_hover">
                      <div className="table_col">
                        <div
                          className="table_col_value"
                          data-tooltip-id={
                            userWithLowCredit ? "creditCount" : ""
                          }
                          style={{
                            cursor: userWithLowCredit ? "help" : "",
                          }}
                          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                            <div>{"У пользователя заканчиваются кредиты"}</div>,
                          )}
                        >
                          {username}

                          {userWithLowCredit && (
                            <span
                              style={{
                                color: " #E80000",
                                fontSize: "20px",
                              }}
                            >
                              ?
                            </span>
                          )}
                        </div>
                        <div className="table_col_copy">
                          <div
                            className="table_col_icon"
                            onClick={() => copyToTextClipboard(username, "Имя")}
                          >
                            <Copy />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="table_cell_role">
                      <div className="table_col_flex">
                        <div className="table_col_label">Роль</div>
                        <div className="table_col_value">{role}</div>
                      </div>
                    </td>
                    <td className="table_cell_comment">
                      {comment && (
                        <div className="table_col_flex">
                          <div className="table_col_label">Комментарий</div>
                          <div
                            className="table_col_value"
                            style={{
                              maxHeight: "120px",
                              overflowY: "scroll",
                              padding: "4px",
                            }}
                          >
                            {comment}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="table_cell_actions">
                      <div className="cel_actions_row">
                        {role === "user" && (
                          <div className="table_col_flex">
                            {credits && (
                              <DropDown title="Кредиты" placement="top">
                                {creditsArray?.map(
                                  ({ creditName, creditCount }) => {
                                    return (
                                      <div
                                        key={uuid()}
                                        className="head_actions_item"
                                        style={{
                                          justifyContent: "space-between",
                                          color:
                                            creditCount < 10 &&
                                            creditCount !== -1
                                              ? "#E80000"
                                              : "",
                                        }}
                                      >
                                        {creditsNameEnum[creditName]}{" "}
                                        <span>
                                          {creditCount
                                            ? creditCount?.toString() === "-1"
                                              ? "∞"
                                              : creditCount?.toString()
                                            : "0"}
                                        </span>
                                      </div>
                                    );
                                  },
                                )}
                              </DropDown>
                            )}
                          </div>
                        )}
                        <Button
                          Icon={Pencil}
                          mode="tretiary"
                          text="Посмотреть профиль"
                          func={() => handleDetailsUser(id)}
                        />
                        <Button
                          Icon={QR}
                          mode="tretiary"
                          text="QR код"
                          func={() =>
                            handleQrModal({
                              qr: totpUrl,
                              name: username,
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
                          func={() => handleDeleteUser(id, username)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </SearchTable>
          {!users?.length && (
            <EmptyPage Icon={Empty} title="Пользователей не найдено" />
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Users;
