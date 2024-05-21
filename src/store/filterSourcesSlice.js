import { createSlice } from "@reduxjs/toolkit";
import {
  getSourcesFilters,
  updateSourcesFilters,
} from "store/thunks/filterSourcesThunk";

const filterSourcesSlice = createSlice({
  name: "filterSources",
  initialState: {
    loading: false,
    filterSourcesData: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSourcesFilters.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSourcesFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.filterSourcesData = action.payload;
      })
      .addCase(getSourcesFilters.rejected, (state, action) => {
        state.loading = false;
      })
      ////
      .addCase(updateSourcesFilters.pending, (state) => {
        state.error = null;
      })
      .addCase(updateSourcesFilters.fulfilled, (state, action) => {
        state.filterSourcesData = action.payload;
      })
      .addCase(updateSourcesFilters.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const filterSourcesActions = filterSourcesSlice.actions;

export default filterSourcesSlice;
