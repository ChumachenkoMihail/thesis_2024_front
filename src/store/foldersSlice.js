import { createSlice } from "@reduxjs/toolkit";
import {
  createNewFolder,
  getAllFolders,
  updateFolder,
  deleteFolder,
  getFolderBookmarks,
  deleteBookmarkFolder,
  addAnketToFolder,
} from "store/thunks/foldersThunks";
import { replaceById } from "libs/helpers";
import { foldersSortEnums } from "libs/Enums";

const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    loading: false,
    allFolders: null,
    folderBookmarks: null,
    folderName: null,
    selectedCheckboxIds: [], // for delete folders
    foldersSort: foldersSortEnums[0],
  },
  reducers: {
    setCheckboxId(state, action) {
      state.selectedCheckboxIds = action.payload;
    },
    setFoldersSort(state, action) {
      state.foldersSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /// getAllFolders Cases
      .addCase(getAllFolders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFolders.fulfilled, (state, action) => {
        state.loading = false;
        state.allFolders = action.payload;
      })
      .addCase(getAllFolders.rejected, (state, action) => {
        state.loading = false;
      })
      /// createNewFolder Cases
      .addCase(createNewFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewFolder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createNewFolder.rejected, (state, action) => {
        state.loading = false;
      })
      /// updateFolder Cases
      .addCase(updateFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFolder.fulfilled, (state, action) => {
        state.loading = false;
        const newState = replaceById(
          state.allFolders,
          action.payload.data.id,
          action.payload.data,
        );
        state.allFolders = newState;
      })
      .addCase(updateFolder.rejected, (state, action) => {
        state.loading = false;
      })
      /// deleteFolder Cases
      .addCase(deleteFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCheckboxIds = [];
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.loading = false;
      })
      /// getFolderBookmarks Cases
      .addCase(getFolderBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFolderBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.folderBookmarks = action.payload;
        state.folderName = action.payload?.folderName;
      })
      .addCase(getFolderBookmarks.rejected, (state, action) => {
        state.loading = false;
      })
      /// deleteBookmarkFolder Cases
      .addCase(deleteBookmarkFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookmarkFolder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteBookmarkFolder.rejected, (state, action) => {
        state.loading = false;
      })
      /// addAnketToFolder Cases
      .addCase(addAnketToFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAnketToFolder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addAnketToFolder.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const foldersActions = foldersSlice.actions;

export default foldersSlice;
