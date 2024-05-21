import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { toast } from "sonner";
import { convertURIToBinary } from "../../libs/convertURIToBinary";
import { getProfile } from "./usersThunks";
import { apiCallActions } from "../apiCallSlice";

export const getCallCampaigns = createAsyncThunk(
  "apiCall/getCallCampaigns",
  async () => {
    const response = await axiosInstance.get(`zvonok/get-campaigns`);
    return response.data.campaigns.map((campaign) => ({
      value: campaign.id,
      label: campaign.name,
    }));
  },
);

export const createApiCall = createAsyncThunk(
  "apiCall/createApiCall",
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.post(`zvonok/call`, data);
      dispatch(getProfile());

      if (response.data && response.data?.code === 400) {
        toast.info(response.data?.message);
      }

      if (response.data && response.data?.code !== 400) {
        toast.info("Запись звонка появится в истории поиска");

        return response?.data;
      }

      dispatch(getApiCallRequests({ limit: 10, page: 1 }));
    } catch (err) {
      toast.info(err.response.data.message);
    }
  },
);

export const getApiCallRequests = createAsyncThunk(
  "apiCall/getApiCallRequests",
  async ({ limit, page }) => {
    const response = await axiosInstance.get(
      `zvonok/history?page=${page}&limit=${limit}`,
    );
    return response.data;
  },
);

export const deleteApiCall = createAsyncThunk(
  "apiCall/deleteApiCall",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`zvonok/history/delete`, data);
    thunkAPI.dispatch(
      apiCallActions.setHistoryPage(response.data.currentPage || 1),
    );
    response?.data &&
      thunkAPI.dispatch(
        getApiCallRequests({
          limit: response.data.limit,
          page: response.data.currentPage || 1,
        }),
      );
  },
);

export const getApiCallRecording = createAsyncThunk(
  "apiCall/getApiCallRecording",
  async (historyId) => {
    try {
      const response = await axiosInstance.post(`zvonok/get-call-recording`, {
        historyId,
      });

      const binary = convertURIToBinary(
        `data:audio/mp3;base64,${response.data.recording}`,
      );
      const blob = new Blob([binary], {
        type: "audio/mp3",
      });
      const blobUrl = URL.createObjectURL(blob);

      return blobUrl;
    } catch (err) {
      toast.info(err.response.data?.message);
    }
  },
);
