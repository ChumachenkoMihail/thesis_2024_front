import { createSlice } from "@reduxjs/toolkit";
import {
  getSettings,
  updateSettings,
} from "store/thunks/settingsApiThunks";

const settingsApiSlice = createSlice({
  name: "settingsApi",
  initialState: {
    loading: false,
    settingsApi: null,
  },
  extraReducers: (builder) => {
    builder
      /// get all settings
      .addCase(getSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsApi = action.payload;
      })
      .addCase(getSettings.rejected, (state) => {
        state.loading = false;
        state.settingsApi = [];
      })
      // set settings
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSettings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const settingsApisActions = settingsApiSlice.actions;
export default settingsApiSlice;
