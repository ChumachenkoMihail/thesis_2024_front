import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import axios from "axios";
import axiosInstance from "../../axios";
import { toast } from "sonner";

export const login = createAsyncThunk(
  "auth/login",
  async ({ authObj, navigate }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, authObj);
      if (response.data.message === "Internal server error") {
        toast.error("Internal server error");
      } else if (response?.status === 201) {
        navigate("/organizations");
        toast.success("Ви успішно зайшли в аккаунт");
      }
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      if (err.response.data.statusCode === 423) {
        toast.error("В доступе отказано, обратитесь к администратору.");
      } else {
        toast.error(`${err.response.data.message}`);
      }
    }
  },
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ authObj, navigate }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, authObj);
            if (response.data.message === "Internal server error") {
                toast.error("Internal server error");
            } else if (response?.status === 201) {
                localStorage.setItem("token", JSON.stringify(response?.data?.accessToken));
                localStorage.setItem("refresh", JSON.stringify(response?.data?.refreshToken));
                localStorage.setItem("userId", JSON.stringify(response?.data?.userId));
                navigate("/organizations");
                toast.success("Ви успішно зайшли зареєструвались");
            }
            return response;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            if (err.response.data.statusCode === 423) {
                toast.error("В доступе отказано, обратитесь к администратору.");
            } else {
                toast.error(`${err.response.data.message}`);
            }
        }
    },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (navigate, thunkAPI) => {
    const { data } = await axiosInstance.get(`auth/logout`);
    data && thunkAPI.dispatch({ type: "logout/LOGOUT" });
    data && toast.info("Ви вийшли з аккаунту");
    data && navigate("/");
  },
);
