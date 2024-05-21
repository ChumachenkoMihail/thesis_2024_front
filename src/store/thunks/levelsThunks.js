import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";

export const getAllLevelSources = createAsyncThunk(
  "levels/getAllLevelSources",
  async () => {
    const response = await axiosInstance.get("admin/level-sources");
    return response?.data;
  },
);

export const getAllLevelsWithFields = createAsyncThunk(
  "levels/getAllLevelsWithFields",
  async (arg, thunkAPI) => {
    const response = await axiosInstance.get("admin/access-levels-fields");
    const responseAllLevelSources = await thunkAPI.dispatch(
      getAllLevelSources(),
    );
    return response?.data
      ?.map((obj1) => ({
        ...obj1,
        ...responseAllLevelSources?.payload?.find(
          (obj2) => obj2.leveId === obj1.levelId,
        ),
      }))
      .map((item) => {
        const { dataSources, ...rst } = item;
        return {
          ...rst,
          dataSourcesApi: dataSources?.filter(
            (sourceApi) => sourceApi.sourceType === "api",
          ),
          dataSourcesDb: dataSources?.filter(
            (sourceApi) => sourceApi.sourceType === "db",
          ),
        };
      });
  },
);

export const addNewLevel = createAsyncThunk(
  "levels/addNewLevel",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post("admin/access-levels", data);
    response.data && toast.info("Уровень успешно создан");
    response.data && thunkAPI.dispatch(getAllLevelsWithFields());
    return response?.data;
  },
);
export const updateLevel = createAsyncThunk(
  "levels/updateLevel",
  async ({ levelId, data }, thunkAPI) => {
    const response = await axiosInstance.patch(
      `admin/access-level-fields/${levelId}`,
      data,
    );
    response.data && toast.info("Уровень успешно обновлен");
    return response?.data;
  },
);
export const updateLevelSources = createAsyncThunk(
  "levels/updateLevelSources",
  async (data, thunkAPI) => {
    const response = await axiosInstance.patch(`admin/level-sources`, data);
    response.data && thunkAPI.dispatch(getAllLevelsWithFields());
    return response?.data;
  },
);

export const deleteLevel = createAsyncThunk(
  "levels/deleteLevel",
  async (levelId, thunkAPI) => {
    const response = await axiosInstance.delete(
      `admin/access-level/${levelId}`,
    );
    response && thunkAPI.dispatch(getAllLevelsWithFields());
    response && thunkAPI.dispatch(getAllLevelSources());
    response && toast.info("Уровень успешно удален");

    return response;
  },
);
