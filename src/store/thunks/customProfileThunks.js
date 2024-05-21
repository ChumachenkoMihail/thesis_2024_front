import axiosInstance from "../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getAllAnkets = createAsyncThunk(
  "customProfile/getAllAnkets",
  async ({ page, limit }) => {
    const response = await axiosInstance.get(
      `custom-anket?page=${page}&limit=${limit}`,
    );
    return response?.data;
  },
);
export const getAnketById = createAsyncThunk(
  "customProfile/getAnketById",
  async (id) => {
    const response = await axiosInstance.get(`custom-anket/${id}`);
    return response?.data;
  },
);

export const createNewCustomAnket = createAsyncThunk(
  "customProfile/createNewCustomAnket",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`custom-anket`, data);
    response && toast.info(`Анкета ${data?.name} создана`);
    return response?.data;
  },
);
export const addDataToAnket = createAsyncThunk(
  "customProfile/addDataToAnket",
  async ({ id, data }, thunkAPI) => {
    const anketData = { data };
    const response = await axiosInstance.post(
      `custom-anket/add-data/${id}`,
      anketData,
    );
    response && toast.info(`Данные анкеты оновлены`);
    return response?.data;
  },
);
export const removeCustomAnket = createAsyncThunk(
  "customProfile/removeCustomAnket",
  async ({ id }, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const response = await axiosInstance.delete(`custom-anket/${id}`);

    response && toast.info(`Анкета удалена`);
    response &&
      thunkAPI.dispatch(
        getAllAnkets({
          page: 1,
          limit: currentState.custom.limit,
        }),
      );
    return response?.data;
  },
);

export const findAnketByName = createAsyncThunk(
  "customProfile/findAnketByName",
  async (query) => {
    const response = await axiosInstance.get(`custom-anket/find?name=${query}`);
    return response?.data;
  },
);
export const updateAnketData = createAsyncThunk(
  "customProfile/updateAnketData",
  async ({ id, data, name }, { dispatch }) => {
    const val = { data, name };
    try {
      const response = await axiosInstance.patch(`custom-anket/${id}`, val);
      response && dispatch(getAnketById(id));
      response && toast.info(`Данные анкеты оновлены`);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      toast.error(`${err?.response?.data?.message[0]}`, {
        duration: 8000,
      });
    }
  },
);
