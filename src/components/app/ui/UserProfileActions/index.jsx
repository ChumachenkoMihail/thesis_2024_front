import "./index.scss";
import IOSwitch from "components/app/use/IOSwitch";
import {
  updateUser,
  updateUserCredits,
} from "store/thunks/usersThunks";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "store/context/themeContextProvider";

const UserProfileActions = ({ userProfile }) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const isInfiniteCredits = Object.values(userProfile?.credits)?.every(
    (value) => value === -1,
  );

  const handleChangeStatus = () => {
    if (userProfile.status === "active") {
      const data = { status: "restricted" };
      dispatch(updateUser({ id: userProfile.id, data }));
    } else {
      const data = { status: "active" };
      dispatch(updateUser({ id: userProfile.id, data }));
    }
  };

  const handleUpdateCredits = () => {
    if (isInfiniteCredits) {
      const val = {
        userId: Number(userProfile.id),
        credits: {
          api: 1,
          merge: 1,
          export: 1,
          search: 1,
          anketDetail: 1,
        },
      };
      dispatch(updateUserCredits(val));
    } else {
      const valFull = {
        userId: Number(userProfile.id),
        credits: {
          api: -1,
          merge: -1,
          export: -1,
          search: -1,
          anketDetail: -1,
        },
      };
      dispatch(updateUserCredits(valFull));
    }
  };

  const handleChangeAccess = (accessType) => {
    dispatch(
      updateUser({
        id: userProfile.id,
        data: { [accessType]: !userProfile[accessType] },
        isAccess: true,
      }),
    );
  };
  return (
    <div
      className={`profile_actions ${isDarkTheme ? "profile_actions_dark" : ""}`}
    >
      <div className="profile_action_item">
        <IOSwitch
          onChange={handleChangeStatus}
          id={userProfile.status}
          isChecked={userProfile.status === "active"}
        />
        Пользователь включен
      </div>
      <div className="profile_action_item">
        <IOSwitch
          onChange={() => handleChangeAccess("isLogged")}
          id={"isLogged"}
          isChecked={userProfile.isLogged}
        />
        Логировать действия пользователя
      </div>
      <div className="profile_action_item">
        <IOSwitch
          onChange={handleUpdateCredits}
          id={"credits"}
          isChecked={isInfiniteCredits}
        />
        Бесконечные кредиты
      </div>

      <div className="profile_action_item">
        <IOSwitch
          onChange={() => handleChangeAccess("canDeleteHistory")}
          id={"canDeleteHistory"}
          isChecked={userProfile?.canDeleteHistory}
        />
        Пользователь может удалять поиски
      </div>
      <div className="profile_action_item">
        <IOSwitch
          onChange={() => handleChangeAccess("searchByAccess")}
          id={"searchByAccess"}
          isChecked={userProfile?.searchByAccess}
        />
        Пользователь может искать по секретному доступу
      </div>
      <div className="profile_action_item">
        <IOSwitch
          onChange={() => handleChangeAccess("searchByPhoto")}
          id={"searchByPhoto"}
          isChecked={userProfile?.searchByPhoto}
        />
        Пользователь может искать по фото
      </div>
    </div>
  );
};

export default UserProfileActions;
