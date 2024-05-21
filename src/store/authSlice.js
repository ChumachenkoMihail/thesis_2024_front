import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "store/thunks/authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authError: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      /// login Case
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.data?.accessToken;
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload?.data?.accessToken) || "",
        );
        localStorage.setItem(
          "refresh",
          JSON.stringify(action.payload?.data?.refreshToken) || "",
        );
        localStorage.setItem(
          "role",
          JSON.stringify(action.payload?.data?.role) || "",
        );
        localStorage.setItem(
            "userId",
            JSON.stringify(action.payload?.data?.userId) || "",
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload?.message;
      })

      /// logout Case
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      });

  },
  reducers: {
    clearError(state, action) {
      state.authError = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

const { clearError } = authSlice.actions;
