import axios from "axios";
import { API_URL } from "./constants";
import {toast} from "sonner";

// create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// add a request interceptor to attach access token to outgoing requests
axiosInstance.interceptors.request.use(

(config) => {
    const token = localStorage.getItem("token");
    const parsedToken = token && JSON.parse(token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const handleClear = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  window.location.reload();
};

// function to refresh access token
const handleRefresh = async () => {
  let auth = JSON.parse(localStorage.getItem("token"));
  let refresh = JSON.parse(localStorage.getItem("refresh"));

  if (auth && refresh) {
    try {
      const { data } = await axiosInstance.post("/auth/refresh", {
        refreshToken: refresh,
      });
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      localStorage.setItem("refresh", JSON.stringify(data.refreshToken));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      return data.accessToken;
    } catch (error) {
      handleClear()
      console.error("Failed to refresh access token:", error);
    }
  }
};

let isRefreshing = false;
let refreshSubscribers = [];


// add a response interceptor to handle 401 errors and retry failed requests
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message === "Internal server error") {
      alert(
        `Ошибка сервера  (${response.data.message}) при попытке получить доступ к ${response?.request?.responseURL}`,
      );
    }
    // toast.error('bebra')
    if (response.data.message === "anketNotFound") {
      alert("Такой анкеты не существует");
      window.location.replace("/search");
    }
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 423) {
      alert("В доступе отказано, обратитесь к администратору.");
      handleClear();
    }
    if (
      error.response.status === 401 &&
      error.response?.data?.message === "Session expired"
    ) {
      handleClear();
    }
    if (
      error.response.status === 401 &&
      error.response?.data?.message === "Invalid Access Token"
    ) {
      handleClear();
    }
    if (
      error.response.status === 401 &&
      error.response?.data?.message === "Unauthorized in Guard"
    ) {
      handleClear();
    }
    if (
        error.response.status === 400
    ) {
      toast.error(error.response?.data?.message)
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const accessToken = await new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              resolve(token);
            });
          });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const accessToken = await handleRefresh();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        refreshSubscribers?.forEach((callback) => callback(accessToken));
        refreshSubscribers = [];
        return axiosInstance(originalRequest);
      } catch (err) {
        handleClear();
      } finally {
        isRefreshing = false;
      }
    } else {
      // window.location.reload();
    }
    if (error.message === "Network Error") {
      alert("Most likely the server went down");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
