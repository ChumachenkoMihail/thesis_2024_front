import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";
import { getHistoryRequests, getHistoryResults } from "./historyThunks";
import { historyCsvActions } from "../historyCsvSlice";

export const csvBulkSearch = createAsyncThunk(
  "historyCsv/csvBulkSearch",
  async (data, thunkAPI) => {
    const currentState = thunkAPI.getState();

    const response = await axiosInstance.post(`search/bulk-search`, data);
    if (response.status === 201) {
      toast.info("Поиск CSV успешно запущен", {
        description: "результат появится в истории поиска",
      });
      thunkAPI.dispatch(
        getCsvHistoryRequests({
          limit: 10,
          page: 1,
          sort: currentState?.historyCsv?.historySort.value,
        }),
      );
    }
    return response.data;
  },
);

export const getCsvHistoryRequests = createAsyncThunk(
  "historyCsv/getCsvHistoryRequests",
  async ({ limit, page, sort, name = null }) => {
    const response = await axiosInstance.get(
      `search/bulk-history?page=${page}&limit=${limit}${
        sort ? `&sortByDate=${sort}` : ""
      }${name?.length ? `&name=${name}` : ""}`,
    );
    return response.data;
  },
);
export const getCsvHistoryResults = createAsyncThunk(
  "historyCsv/getCsvHistoryResults",
  async ({ historyId, limit, page, sourceID, sort, sortValue, paramsId }) => {
    const response = await axiosInstance.get(
      `search/history/bulk-search/details/?sourceId=${sourceID}&historyId=${historyId}&page=${page}&paramsId=${paramsId}&limit=${limit}${
        sort ? `&${sort}=${sortValue}` : ""
      }`,
    );
    return response.data;
  },
);

export const deleteHistoryCsv = createAsyncThunk(
  "historyCsv/deleteHistoryCsv",
  async (data, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const response = await axiosInstance.post(`search/bulk-history`, data);
    thunkAPI.dispatch(
      historyCsvActions.setHistoryPage(response.data.currentPage || 1),
    );
    response?.data &&
      thunkAPI.dispatch(
        getCsvHistoryRequests({
          limit: response.data.limit,
          page: response.data.currentPage || 1,
          sort: currentState?.historyCsv?.historySort.value,
        }),
      );
  },
);

export const updateCsvHistory = createAsyncThunk(
  "historyCsv/updateCsvHistory",
  async ({ data, historyId }, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const response = await axiosInstance.patch(
      `search/bulk-history/${historyId}`,
      data,
    );
    response?.data?.updatedName &&
      toast.info("Название поиска успешно изменено");
    response?.data?.updatedName &&
      thunkAPI.dispatch(
        getCsvHistoryRequests({
          limit: 10,
          page: currentState.historyCsv.historyPage,
          sort: currentState?.historyCsv?.historySort.value,
        }),
      );
  },
);

export const getCsvHistoryParams = createAsyncThunk(
  "historyCsv/getCsvHistoryParams",
  async (historyId) => {
    const response = await axiosInstance.get(
      `search/history/bulk-search/${historyId}/parameters`,
    );
    return response.data;
  },
);
