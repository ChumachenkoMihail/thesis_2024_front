import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "store/authSlice";
import searchSlice from "store/searchSlice";
import foldersSlice from "store/foldersSlice";
import historySlice from "store/historySlice";
import historyCsvSlice from "store/historyCsvSlice";
import apiCallSlice from "store/apiCallSlice";
import usersSlice from "store/usersSlice";
import accessLevelsSlice from "store/accessLevelsSlice";
import customProfileSlice from "store/customProfileSlice";
import accessSearchSlice from "store/accessSearchSlice";
import settingsApiSlice from "store/settingsApiSlice";
import alterEgoSlice from "store/alterEgoSlice";
import filterSourcesSlice from "store/filterSourcesSlice";
import faceVerifySlice from "./faceVerifySlice";
import historyInsightSlice from "./historyInsightSlice";
import globalSlice from "./globalSlice";

const appReducer = combineReducers({
  auth: authSlice.reducer,
  search: searchSlice.reducer,
  folders: foldersSlice.reducer,
  history: historySlice.reducer,
  historyCsv: historyCsvSlice.reducer,
  historyInsight: historyInsightSlice.reducer,
  apiCall: apiCallSlice.reducer,
  users: usersSlice.reducer,
  levels: accessLevelsSlice.reducer,
  custom: customProfileSlice.reducer,
  access_search: accessSearchSlice.reducer,
  settingsApi: settingsApiSlice.reducer,
  alterEgo: alterEgoSlice.reducer,
  filterSources: filterSourcesSlice.reducer,
  faceVerify: faceVerifySlice.reducer,
  global: globalSlice.reducer,
});

const reducerProxy = (state, action) => {
  if (action.type === "logout/LOGOUT") {
    return appReducer(undefined, action); // clear all state in reducer when logout
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
