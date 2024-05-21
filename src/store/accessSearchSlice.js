import { createSlice } from "@reduxjs/toolkit";
import { searchAccess } from "store/thunks/accessSearchThunks";

const accessSearchSlice = createSlice({
  name: "access_search",
  initialState: {
    searchResult: null,
    selectedSearchParam: "secretAccessTemplate",
    loading: false,
    page: 1,
    limit: 10,
    totalPages: "",
    totalFind: null,
    searchQuery: "",
    selectedSearchData: {},
  },
  reducers: {
    setSearchParam(state, action) {
      state.selectedSearchParam = action.payload;
      state.searchResult = null;
      state.page = 1;
      state.limit = 10;
      state.totalPages = "";
      state.totalFind = null;
      state.searchQuery = "";
    },
    setSearchPage(state, action) {
      state.page = action.payload;
    },
    setLimitPage(state, action) {
      state.limit = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setDataToSearch(state, action) {
      state.selectedSearchData = action.payload;
    },
    clearAccessSearchState(state) {
      state.selectedSearchData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAccess.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload?.values;
        state.totalPages = action.payload?.totalPages;
        state.totalFind = action.payload?.totalRes;
      })
      .addCase(searchAccess.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const accessSearchActions = accessSearchSlice.actions;
export default accessSearchSlice;
