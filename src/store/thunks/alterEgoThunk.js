import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";

export const alterEgo = createAsyncThunk(
  "alterEgo/alterego",
  async ({ data, showNotification }) => {
    try {
      const response = await axiosInstance.post(`alterego`, data);

      if (response?.data?.result?.mergerdResults?.length) {
        showNotification && toast.info(`Найдено ${response?.data?.result?.mergerdResults.flatMap(item => item.alteregos).length} Alter ego анкет`)
      
        return response?.data;
      }
    } catch (err) {
      if (!err.response) {
        throw err;
      }
    }
  },
);