import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";

export const getSettings = createAsyncThunk(
  "settingsApi/getSettings",
  async () => {
    const response = await axiosInstance.get("admin/get-dotenv-variables");
    const updatateArr = [];

    const titleMap = new Map();
    response?.data.forEach((item) => {
      // Extract title from the key
      const title = item?.key?.split("_")?.[0];

      // Create a new variable object
      const variable = {
        description: item?.description,
        key: item?.key,
        value: item?.value,
      };

      if (titleMap?.has(title)) {
        // If yes, push the variable to the existing title
        titleMap?.get(title).variables.push(variable);
      } else {
        // If no, create a new entry in the map
        titleMap?.set(title, { title, variables: [variable] });
      }
    });

    // Convert the map values to an array
    updatateArr.push(...titleMap.values());

    return updatateArr;
  },
);

export const updateSettings = createAsyncThunk(
  "settingsApi/updateSettings",
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        "admin/set-dotenv-variables",
        data,
      );
      response.data && toast.info("Настройки обновлены");
      response.data && (await dispatch(getSettings()));
      return response?.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  },
);
