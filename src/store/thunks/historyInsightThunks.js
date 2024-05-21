import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";
import { getHistoryRequests } from "./historyThunks";
import { historyInsightActions } from "../historyInsightSlice";

export const getInsightHistory = createAsyncThunk(
  "historyInsight/getInsightHistory",
  async ({ limit, page, sort, name = null }) => {
    const response = await axiosInstance.get(
      `insight/history?page=${page}&limit=${limit}${
        sort ? `&sortByDate=${sort}` : ""
      }${name?.length ? `&name=${name}` : ""}`,
    );
    return response.data;
  },
);

export const deleteInsightHistory = createAsyncThunk(
  "historyInsight/deleteInsightHistory",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`insight/history/delete`, data);
    thunkAPI.dispatch(
      historyInsightActions.changePage(response?.data?.currentPage || 1),
    );
    response &&
      thunkAPI.dispatch(
        getInsightHistory({
          limit: response?.data?.limit,
          page: response?.data?.currentPage || 1,
        }),
      );
  },
);
