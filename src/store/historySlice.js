import { createSlice } from "@reduxjs/toolkit";
import {
  deleteHistory,
  getHistoryGetContact,
  getHistoryParams,
  getHistoryRequests,
  getHistoryResults,
  searchBySecretAccess,
  updateHistory,
} from "store/thunks/historyThunks";
import { historySortEnums } from "libs/Enums";
import { getCsvHistoryResults } from "store/thunks/historyCsvThunks";

const historySlice = createSlice({
  name: "history",
  initialState: {
    loading: false,
    historyData: null,
    getContactData: null,
    historyPaginationData: null,
    historyParams: null,
    historySort: historySortEnums[0],
    historyResults: null,
    selectedSort: {},
    selectedCheckboxIds: [], // for delete history
    historyPage: 1,
    historySources: [],
  },
  reducers: {
    setCheckboxId(state, action) {
      state.selectedCheckboxIds = action.payload;
    },
    setHistorySources(state, action) {
      state.historySources = action.payload;
    },
    setHistorySort(state, action) {
      state.historySort = action.payload;
    },
    setSelectedSort(state, action) {
      state.selectedSort = action.payload;
    },
    clearHistoryParams(state, action) {
      state.historyParams = action.payload;
    },
    setHistoryParams(state, action) {
      state.historyParams = action.payload;
    },
    changePage(state, action) {
      state.historyPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistoryRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload.data;
        state.historyPaginationData = action.payload;
      })
      .addCase(getHistoryRequests.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(getHistoryGetContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistoryGetContact.fulfilled, (state, action) => {
        state.loading = false;
        state.getContactData = action.payload;
      })
      .addCase(getHistoryGetContact.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(getHistoryParams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHistoryParams.fulfilled, (state, action) => {
        state.loading = false;
        state.historyParams = action.payload;
      })
      .addCase(getHistoryParams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ////
      .addCase(deleteHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCheckboxIds = [];
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ////
      .addCase(updateHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHistory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ////
      .addCase(getHistoryResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHistoryResults.fulfilled, (state, action) => {
        state.loading = false;
        state.historyResults = action.payload;
        state.loading = false;
      })
      .addCase(getHistoryResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCsvHistoryResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCsvHistoryResults.fulfilled, (state, action) => {
        state.loading = false;
        state.historyResults = action.payload;
        state.loading = false;
      })
      .addCase(getCsvHistoryResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///
      .addCase(searchBySecretAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBySecretAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.historyResults = action.payload;
        state.loading = false;
      })
      .addCase(searchBySecretAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const historyActions = historySlice.actions;
export default historySlice;
