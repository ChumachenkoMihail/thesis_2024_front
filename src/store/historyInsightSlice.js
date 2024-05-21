import { createSlice } from "@reduxjs/toolkit";
import {
  deleteInsightHistory,
  getInsightHistory,
} from "./thunks/historyInsightThunks";
import { historySortEnums } from "../libs/Enums";

const historyInsightSlice = createSlice({
  name: "historyInsight",
  initialState: {
    loading: false,
    insightHistory: null,
    pagination: null,
    page: 1,
    sortBy: historySortEnums[0],
    selectedCheckboxIds: [],
  },
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    setCheckboxId(state, action) {
      state.selectedCheckboxIds = action.payload;
    },
    setHistorySort(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInsightHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInsightHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.insightHistory = action.payload.data;
        state.pagination = action.payload;
      })
      .addCase(getInsightHistory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteInsightHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInsightHistory.fulfilled, (state, action) => {
        state.loading = false;
        // state.insightHistory = action.payload.data;
        // state.pagination = action.payload;
      })
      .addCase(deleteInsightHistory.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const historyInsightActions = historyInsightSlice.actions;

export default historyInsightSlice;
