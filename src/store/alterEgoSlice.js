import { createSlice } from "@reduxjs/toolkit";
import {
    alterEgo
} from "store/thunks/alterEgoThunk";

const alterEgoSlice = createSlice({
    name: 'alterEgo',
    initialState: {
      alterEgoData: null,
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(alterEgo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(alterEgo.fulfilled, (state, action) => {
          state.loading = false;
          state.alterEgoData = action.payload;
        })
        .addCase(alterEgo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

export const alterEgoActions = alterEgoSlice.actions;

export default alterEgoSlice;