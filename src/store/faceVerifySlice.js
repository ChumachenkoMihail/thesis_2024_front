import { faceVerify } from "./thunks/outsideApiThunks";
import { createSlice } from "@reduxjs/toolkit";

const faceVerifySlice = createSlice({
  name: "faceVerify",
  initialState: {
    verifyValues: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(faceVerify.pending, (state) => {
        state.loading = true;
      })
      .addCase(faceVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyValues = action.payload;
      })
      .addCase(faceVerify.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default faceVerifySlice;
