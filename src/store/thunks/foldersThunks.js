import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { getAnketById } from "./searchThunks";
import { foldersSortEnums } from "../../libs/Enums";
import { toast } from "sonner";

export const getAllFolders = createAsyncThunk(
  "folders/getAllFolders",
  async ({ sortBy }) => {
    const response = await axiosInstance.get(
      `folders?${sortBy ? `${sortBy}` : ""}`,
    );
    return response?.data;
  },
);

export const createNewFolder = createAsyncThunk(
  "folders/createNewFolder",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`folders`, data);
    response &&
      thunkAPI.dispatch(getAllFolders({ sortBy: foldersSortEnums[0]?.value }));
    response && toast.info(`Папка ${data?.name} создана`);
    return response;
  },
);

export const addAnketToFolder = createAsyncThunk(
  "folders/addAnketToFolder",
  async ({ data, anketSourceId }, thunkAPI) => {
    const id = data.anketId;
    const response = await axiosInstance.post(`folders/bookmark`, data);
    response && toast.info(`Анкета добавлена в папку`);
    response &&
      thunkAPI.dispatch(getAnketById({ id, sourceID: anketSourceId }));
    return response;
  },
);

export const updateFolder = createAsyncThunk(
  "folders/updateFolder",
  async ({ data, folderId }) => {
    const response = await axiosInstance.patch(`folders/${folderId}`, data);

    response && toast.info(`Папка оновлена`);
    return response;
  },
);

export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (folderId, thunkAPI) => {
    const response = await axiosInstance.delete(`folders/${folderId}`);
    response &&
      thunkAPI.dispatch(getAllFolders({ sortBy: foldersSortEnums[0]?.value }));
    response && toast.info(`Папка удалена`);
    return response;
  },
);

export const getFolderBookmarks = createAsyncThunk(
  "folders/getFolderBookmarks",
  async ({ id, limit, page }) => {
    const response = await axiosInstance.get(
      `folders/bookmarks/${id}/?page=${page}&limit=${limit}`,
    );
    if (!response.data?.bookmarks?.length) return null;
    return response?.data;
  },
);

export const deleteBookmarkFolder = createAsyncThunk(
  "markedProfiles/deleteBookmarkFolder",
  async (
    { folderId, bookmarkId, sourceID, limit = 10, page = 1 },
    thunkAPI,
  ) => {
    const response = await axiosInstance.delete(
      `folders/${folderId}/bookmark/${bookmarkId}`,
    );
    response && toast.info(`Анкета удалена из папки`);
    // response && thunkAPI.dispatch(getAnketById({ id: bookmarkId, sourceID }));
    const id = folderId;
    response && thunkAPI.dispatch(getFolderBookmarks({ id, limit, page }));

    return response;
  },
);
