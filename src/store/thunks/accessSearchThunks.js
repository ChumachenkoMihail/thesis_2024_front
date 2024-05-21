import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";

export const searchAccess = createAsyncThunk(
  "access_search/searchAccess",
  async ({ limit, page, queryName, query }) => {
    try {
      const response = await axiosInstance.get(
        `search/getVariantsByTemplate?${queryName}=${query}&page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (err) {
      if (err.response.status === 403) {
        toast.error("Недостаточно прав для поиска в Поиске по доступу", {
          description: "Обратитесь к администратору",
        });
      }
    }
  },
);
