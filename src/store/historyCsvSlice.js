import { createSlice } from "@reduxjs/toolkit";
import {
  csvBulkSearch,
  deleteHistoryCsv,
  getCsvHistoryParams,
  getCsvHistoryRequests,
  getCsvHistoryResults,
  updateCsvHistory,
} from "store/thunks/historyCsvThunks";
import { historySortEnums } from "libs/Enums";

const historyCsvSlice = createSlice({
  name: "historyCsv",
  initialState: {
    loading: false,
    historyData: null,
    historyPage: 1,
    historySort: historySortEnums[0],
    historyCsvPaginationData: null,
    selectedCheckboxIds: [], // for delete history
    selectedCsvSourceNameId: null,
    historyCsvParams: null,
  },
  reducers: {
    setCheckboxId(state, action) {
      state.selectedCheckboxIds = action.payload;
    },
    setCsvHistorySort(state, action) {
      state.historySort = action.payload;
    },
    setHistoryPage(state, action) {
      state.historyPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(csvBulkSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(csvBulkSearch.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(csvBulkSearch.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getCsvHistoryRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCsvHistoryRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload.data;
        state.historyCsvPaginationData = action.payload;
      })
      .addCase(getCsvHistoryRequests.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteHistoryCsv.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHistoryCsv.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteHistoryCsv.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCsvHistoryResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCsvHistoryResults.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getCsvHistoryResults.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCsvHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCsvHistory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCsvHistory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCsvHistoryParams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCsvHistoryParams.fulfilled, (state, action) => {
        state.loading = false;
        state.historyCsvParams = action.payload;
      })
      .addCase(getCsvHistoryParams.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const historyCsvActions = historyCsvSlice.actions;

export default historyCsvSlice;
