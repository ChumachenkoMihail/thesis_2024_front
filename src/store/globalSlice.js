import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBindedAnket,
  getAllAvailableFields,
  getAllSearchFields,
  getAnketById,
  getBindedAnkets,
  getBindedPhotos,
  mergeAnkets,
  searchAnkets,
  getTickets,
  getPassengers,
  searchSirena,
} from "store/thunks/searchThunks";
import {
  findClone,
  tineyeSearch,
  getContact,
  leakCheck,
  insightSearch,
  normalizePhone,
  getInsightResult,
} from "store/thunks/outsideApiThunks";
import {
  normalizeSpaces,
  parseContacts,
  replaceWithNullIfOnlySpaces,
} from "libs/parseApi";
import moment from "moment/moment";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice;
