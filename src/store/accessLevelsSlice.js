import { createSlice } from "@reduxjs/toolkit";
import {
  addNewLevel,
  deleteLevel,
  getAllLevelsWithFields,
  getAllLevelSources,
  updateLevel,
} from "store/thunks/levelsThunks";
import { replaceById } from "libs/helpers";

const accessLevelsSlice = createSlice({
  name: "levels",
  initialState: {
    loading: false,
    levels: null,
  },
  extraReducers: (builder) => {
    builder
      /// get all levels
      .addCase(getAllLevelsWithFields.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLevelsWithFields.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = action.payload;
      })
      .addCase(getAllLevelsWithFields.rejected, (state) => {
        state.loading = false;
        state.levels = [];
      })
      .addCase(getAllLevelSources.pending, (state) => {
        state.loading = false;
      })
      .addCase(getAllLevelSources.fulfilled, (state, action) => {
        state.loading = false;
        // state.levels = action.payload;
      })
      .addCase(getAllLevelSources.rejected, (state) => {
        state.loading = false;
        state.levels = [];
      })
      // delete level by ID
      .addCase(deleteLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLevel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLevel.rejected, (state) => {
        state.loading = false;
      })
      // add new level
      .addCase(addNewLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewLevel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewLevel.rejected, (state) => {
        state.loading = false;
      })
      // add new level
      .addCase(updateLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLevel.fulfilled, (state, action) => {
        state.loading = false;
        const newState = replaceById(
          state.levels,
          action.payload.levelId,
          action.payload,
          "levelId",
        );
        state.levels = newState;
      })
      .addCase(updateLevel.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const levelsActions = accessLevelsSlice.actions;
export default accessLevelsSlice;
