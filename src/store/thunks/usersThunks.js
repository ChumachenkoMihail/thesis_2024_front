import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ query, filterBy }) => {
    const response = await axiosInstance.get(
      `admin/users/?creditFilter=${filterBy}${
        query?.length ? `&name=${query}` : ""
      }`,
    );
    return response?.data?.users;
  },
);
export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("admin/users", data);
      const currentState = thunkAPI.getState();
      response.data && toast.info(`Пользователь успешно создан`);
      thunkAPI.dispatch(
        getAllUsers({
          filterBy: currentState.users?.filterUsersBy?.value,
          query: "",
        }),
      );

      return response;
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(
          "Недостаточно прав доступа для создания пользователя с ролью Админ",
        );
      }
    }
  },
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data, isAccess = false }, thunkAPI) => {
    const currentState = thunkAPI.getState();

    try {
      const response = await axiosInstance.patch(`admin/users/${id}`, data);
      const name = response?.data?.username;
      if (isAccess) {
        toast.info(`Параметры доступа для ${name} обновлены`);
      } else {
        if (response.data && response?.data?.status === "restricted") {
          toast.info(`Доступ для пользователя ${name} отключен`);
        } else if (response.data && response?.data?.status === "active") {
          toast.info(`Доступ для пользователя ${name} включен`);
        }
      }
      thunkAPI.dispatch(getUser(id));
      thunkAPI.dispatch(
        getAllUsers({
          filterBy: currentState.users?.filterUsersBy?.value,
          query: "",
        }),
      );
      return response.data;
    } catch (err) {
      if (err.response.status === 409) {
        toast.error("Недостаточно прав доступа");
      }
    }
  },
);
export const getUsersInProject = createAsyncThunk(
    "projects/get-project-users",
    async ( projectId , thunkAPI) => {
        const response = await axiosInstance.post(`projects/get-project-users`, {projectId: Number(projectId)});
        const userId = localStorage.getItem('userId');
        return response.data.filter(item => item.userId !== Number(userId));
    },
);

export const deleteUserFromProject = createAsyncThunk(
    "projects/delete-user-from-project",
    async ( inviteData , thunkAPI) => {
        const response = await axiosInstance.post(`projects/delete-user-from-project`, inviteData);
        toast.success('Користувача видалено з проекту')
        await thunkAPI.dispatch(getUsersInProject(inviteData?.projectId))
        return response?.data;
    },
);

export const addUserToProject = createAsyncThunk(
    "projects/add-user-to-project",
    async ( inviteData , thunkAPI) => {
        console.log('we are here');
        const response = await axiosInstance.post(`projects/add-user-to-project`, inviteData);
        await thunkAPI.dispatch(getUsersInProject(inviteData?.projectId))
        return response?.data;
    },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, username }, thunkAPI) => {
    const currentState = thunkAPI.getState();
    try {
      const response = await axiosInstance.delete(`admin/users/${id}`);

      response.data &&
        thunkAPI.dispatch(
          getAllUsers({
            filterBy: currentState.users?.filterUsersBy?.value,
            query: "",
          }),
        );
      response.data && toast.info(`Пользователь ${username} успешно удален`);
      return response;
    } catch (error) {
      if (error.response.status === 403) {
        toast.error("Недостаточно прав доступа");
      }
    }
  },
);

export const updateTOTP = createAsyncThunk(
  "users/updateTOTP",
  async (id, thunkAPI) => {
    const currentState = thunkAPI.getState();
    try {
      const response = await axiosInstance.post(
        `admin/regenerate-totp-secret`,
        Number(id),
      );
      thunkAPI.dispatch(getUser(id?.userId));
      response.statusText === "Created" &&
        thunkAPI.dispatch(
          getAllUsers({
            filterBy: currentState.users?.filterUsersBy?.value,
            query: "",
          }),
        );
      response.statusText === "Created" && toast.info(`TOTP успешно обновлен`);
      return response;
    } catch (error) {
      if (error.response.status === 403) {
        toast.error("Недостаточно прав доступа");
      }
    }
  },
);

export const getProfile = createAsyncThunk("users/getProfile", async () => {
  return await axiosInstance.get(`users/profile`);
});

export const subtractUserCredits = createAsyncThunk(
  "users/subtractUserCredits",
  async ({ subtract = true, creditsPayload, logsPayload }, thunkAPI) => {
    const currentState = thunkAPI.getState();
    if (
      currentState?.users?.userRole !== "admin" &&
      currentState?.users?.userRole !== "superAdmin"
    ) {
      const res =
        subtract &&
        (await axiosInstance.patch(`users/subtractCredits`, creditsPayload));
      res?.status === 200 && thunkAPI.dispatch(getProfile());
      logsPayload && thunkAPI.dispatch(logUserActions(logsPayload));
    }
  },
);

export const logUserActions = createAsyncThunk(
  "users/logUserActions",
  async (data, thunkAPI) => {
    const currentState = thunkAPI.getState();
    if (currentState.users?.userAccess.isLogged) {
      return await axiosInstance.post("logs", data);
    }
  },
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, thunkAPI) => {
    return await axiosInstance.get(`admin/users/${id}`);
  },
);

export const deleteUserFromDetailsProfile = createAsyncThunk(
  "users/deleteUser",
  async ({ id, username, navigate }) => {
    const response = await axiosInstance.delete(`admin/users/${id}`);
    response.data && navigate("/admin/settings/manage");
    response.data && toast.info(`Пользователь ${username} успешно удален`);
    return response;
  },
);

export const updateUserCredits = createAsyncThunk(
  "users/updateUserCredits",
  async (data, thunkAPI) => {
    const res = await axiosInstance.patch("admin/user-credits", data);
    res.status === 200 && thunkAPI.dispatch(getUser(data?.userId));
    res.status === 200 && toast.info(`Кредиты обновлены`);
  },
);
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.patch("admin/role", data);
      res.status === 200 && thunkAPI.dispatch(getUser(data?.userId));
      res.status === 200 && toast.info("Роль успешно оновлена");
    } catch (err) {
      if (err.response.status === 403) {
        toast.error("Недостаточно прав доступа для смены роли пользователя");
      }
    }
  },
);

export const getUserLogs = createAsyncThunk(
  "users/getUserLogs",
  async ({ page, limit, name, type, orderByTime, userId }) => {
    return await axiosInstance.get(
      `logs/user/${userId}?page=${page}&limit=${limit}${
        type ? `&type=${type}` : ""
      }${orderByTime ? `&orderByTime=${orderByTime}` : ""}${
        name?.length ? `&name=${name}` : ""
      }`,
    );
  },
);
