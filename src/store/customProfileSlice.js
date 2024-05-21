import { createSlice } from "@reduxjs/toolkit";
import {
  createNewCustomAnket,
  findAnketByName,
  getAllAnkets,
  getAnketById,
  removeCustomAnket,
  updateAnketData,
} from "store/thunks/customProfileThunks";

const customProfileSlice = createSlice({
  name: "customProfile",
  initialState: {
    loading: false,
    error: null,
    allCustomProfiles: null,
    newCustomAnket: null,
    anketsFindList: null,
    customAnketData: null,
    customAnketDetails: null,
    page: 1,
    limit: 10,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnkets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAnkets.fulfilled, (state, action) => {
        state.loading = false;
        state.allCustomProfiles = action.payload;
      })
      .addCase(getAllAnkets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///
      .addCase(createNewCustomAnket.pending, (state) => {})
      .addCase(createNewCustomAnket.fulfilled, (state, action) => {
        state.newCustomAnket = action.payload;
      })
      .addCase(createNewCustomAnket.rejected, (state, action) => {
        state.error = action.error.message;
      })
      ///
      .addCase(findAnketByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(findAnketByName.fulfilled, (state, action) => {
        state.loading = false;
        state.anketsFindList = action.payload;
      })
      .addCase(findAnketByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///
      .addCase(getAnketById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnketById.fulfilled, (state, action) => {
        state.loading = false;
        state.customAnketData = action.payload.data;
        state.customAnketDetails = action.payload;
      })
      .addCase(getAnketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///
      .addCase(removeCustomAnket.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCustomAnket.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeCustomAnket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///
      .addCase(updateAnketData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAnketData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateAnketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const customProfileActions = customProfileSlice.actions;
export default customProfileSlice;
