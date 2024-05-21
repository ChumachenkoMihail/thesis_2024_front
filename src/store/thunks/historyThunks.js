import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";
import { historyActions } from "../historySlice";

export const getHistoryRequests = createAsyncThunk(
  "history/getHistoryRequests",
  async ({ limit, page, sort, name = null }) => {
    const response = await axiosInstance.get(
      `search/history?page=${page}&limit=${limit}${
        sort ? `&sortByDate=${sort}` : ""
      }${name?.length ? `&name=${name}` : ""}`,
    );
    return response.data;
  },
);

export const getHistoryGetContact = createAsyncThunk(
  "history/getHistoryGetContact",
  async () => {
    const response = await axiosInstance.get(`getcontact/history`);
    return response.data;
  },
);

export const getHistoryParams = createAsyncThunk(
  "history/getHistoryParams",
  async (historyId) => {
    const response = await axiosInstance.get(
      `search/history/${historyId}/parameters`,
    );
    return response.data;
  },
);

export const getHistoryResults = createAsyncThunk(
  "history/getHistoryResults",
  async ({ historyId, limit, page, sourceID, sort, sortValue }) => {
    try {
      const response = await axiosInstance.get(
        `search/history/${historyId}/details/${sourceID}?page=${page}&limit=${limit}${
          sort ? `&${sort}=${sortValue}` : ""
        }`,
      );
      return response.data;
    } catch (err) {
      if (err.response.status === 403) {
        toast.error("Недостаточно прав для просмотра выбранной базы", {
          description: "Обратитесь к администратору",
        });
      }
      if (err.response.status === 404) {
        toast.error("История не найдена");
      }
    }
  },
);

export const searchBySecretAccess = createAsyncThunk(
  "history/searchAccess",
  async (searchData) => {
    const response = await axiosInstance.post(
      `search/searchBySecretAccessAndDepartureRestriction`,
      searchData,
    );
    return response.data;
  },
);

export const deleteHistory = createAsyncThunk(
  "history/deleteHistory",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`search/history`, data);
    thunkAPI.dispatch(
      historyActions.changePage(response.data.currentPage || 1),
    );
    response?.data &&
      thunkAPI.dispatch(
        getHistoryRequests({
          limit: response.data.limit || 10,
          page: response.data.currentPage || 1,
        }),
      );
  },
);

export const updateHistory = createAsyncThunk(
  "history/updateHistory",
  async (data, thunkAPI) => {
    const limit = 10; // default for history
    const page = 1; // default for history
    // historyId, limit, page, sourceID
    const response = await axiosInstance.patch(`search/history`, data);
    response?.data?.updatedName &&
      data.sourceID &&
      thunkAPI.dispatch(
        getHistoryResults({
          historyId: data.historyId,
          limit: limit,
          page,
          sourceID: data.sourceID,
        }),
      );
    response?.data?.updatedName &&
      thunkAPI.dispatch(getHistoryRequests({ limit, page }));
  },
);
