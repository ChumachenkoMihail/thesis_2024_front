import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserCredits,
  getUserLogs,
  updateUserRole, getUsersInProject,
} from "store/thunks/usersThunks";
import { getProfile, getUser } from "store/thunks/usersThunks";
import { historySortEnums, usersFilterEnum } from "libs/Enums";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
    loading: false,
    userCredits: null,
    getUsersInProjectData: null,
    userRole: null,
    canDeleteHistory: "",
    userAccess: null,
    userProfile: null,
    selectedLogSort: historySortEnums[0],
    filterUsersBy: usersFilterEnum[0],
    selectedLogType: "",
    logsPage: 1,
    logsLimit: 10,
    logs: null,
    logsPaginationData: null,
  },
  reducers: {
    setSort(state, action) {
      state.selectedLogSort = action.payload;
    },
    setFilter(state, action) {
      state.filterUsersBy = action.payload;
    },
    setLogType(state, action) {
      state.selectedLogType = action.payload;
    },
    changePage(state, action) {
      state.logsPage = action.payload;
    },
    changeLimit(state, action) {
      state.logsLimit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get All Users Cases
      .addCase(getAllUsers.pending, (state) => {
        state.loading = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
      })

        .addCase(getUsersInProject.pending, (state) => {
          state.loading = false;
        })
        .addCase(getUsersInProject.fulfilled, (state, action) => {
          state.loading = false;
          state.getUsersInProjectData = action.payload;
        })
        .addCase(getUsersInProject.rejected, (state, action) => {
          state.loading = false;
        })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state?.users?.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (index !== -1 && state.users) {
            state.users[index] = action.payload;
          }
        }

        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
      })
      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.userRole = action?.payload?.data?.role;
        state.userCredits = action?.payload?.data?.credits;
        state.canDeleteHistory = action?.payload?.data?.canDeleteHistory;
        state.userAccess = {
          canDeleteHistory: action?.payload?.data?.canDeleteHistory,
          searchByAccess: action?.payload?.data?.searchByAccess,
          searchByPhoto: action?.payload?.data?.searchByPhoto,
          isLogged: action?.payload?.data?.isLogged,
        };
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userProfile = action?.payload.data;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserCredits.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserCredits.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserCredits.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserLogs.pending, (state) => {
        state.loading = false;
      })
      .addCase(getUserLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload?.data?.logs;
        state.logsPaginationData = action.payload?.data;
      })
      .addCase(getUserLogs.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice;
