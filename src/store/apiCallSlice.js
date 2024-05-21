import { createSlice } from "@reduxjs/toolkit";
import {
  getCallCampaigns,
  createApiCall,
  getApiCallRequests,
  getApiCallRecording,
} from "store/thunks/apiCallThunk";

const apiCallSlice = createSlice({
  name: "apiCall",
  initialState: {
    loading: false,
    historyData: null,
    historyPage: 1,
    callCampaignsData: [],
    callRecordingData: null,
    historyCallPaginationData: null,
    selectedCheckboxIds: [],
  },
  reducers: {
    setCheckboxId(state, action) {
      state.selectedCheckboxIds = action.payload;
    },
    setHistoryPage(state, action) {
      state.historyPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCallCampaigns.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getCallCampaigns.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCallCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.callCampaignsData = action.payload;
      })
      .addCase(createApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(createApiCall.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createApiCall.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getApiCallRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApiCallRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload.data;
        state.historyCallPaginationData = action.payload;
      })
      .addCase(getApiCallRequests.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getApiCallRecording.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getApiCallRecording.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getApiCallRecording.fulfilled, (state, action) => {
        state.loading = false;
        state.callRecordingData = action.payload;
      });
  },
});

export const apiCallActions = apiCallSlice.actions;

export default apiCallSlice;
