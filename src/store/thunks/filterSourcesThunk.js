import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";

export const getSourcesFilters = createAsyncThunk(
    "filterSources/getSourcesFilters",
    async () => {
      const response = await axiosInstance.get(`admin/merge-filters`);

      return response.data
    },
);

export const updateSourcesFilters = createAsyncThunk(
    "filterSources/updateSourcesFilters",
    async (requestData, thunkAPI) => {
        try {
            const response = await axiosInstance.patch("admin/merge-filters", requestData);
            
            if (response.data) {
                toast.info(`Фильтры источников обновлены`);
                return response.data;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);