import { TUserState } from "@/types";
import { asyncThunkValidation, fetchApi } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from "reapop";

export const fetchRegister = createAsyncThunk("register", async (payload: any, thunkAPI) => {
  return await asyncThunkValidation(thunkAPI, async () => {
    const response = await fetchApi.json.post("/api/users/register", payload);
    thunkAPI.dispatch(
      notify({ status: "success", title: response.data.status, message: response.data.message })
    );
    return response.data;
  });
});

export const fetchLogin = createAsyncThunk("login", async (payload: any, thunkAPI) => {
  return await asyncThunkValidation(thunkAPI, async () => {
    const response = await fetchApi.json.post("/api/users/login", payload);
    thunkAPI.dispatch(
      notify({ status: "success", title: response.data.status, message: response.data.message })
    );
    return response.data;
  });
});

const initialState: TUserState = {
  user: null,

  isRegisterLoading: false,
  isRegisterSuccess: false,
  isRegisterFailed: false,

  isLoginLoading: false,
  isLoginSuccess: false,
  isLoginFailed: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetAllUserStatus: (state) => {
      state.isRegisterLoading = false;
      state.isRegisterSuccess = false;
      state.isRegisterFailed = false;

      state.isLoginLoading = false;
      state.isLoginSuccess = false;
      state.isLoginFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.isRegisterLoading = true;
        state.isRegisterSuccess = false;
        state.isRegisterFailed = false;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.isRegisterLoading = false;
        state.isRegisterSuccess = true;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.isRegisterLoading = false;
        state.isRegisterFailed = true;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.isLoginLoading = true;
        state.isLoginSuccess = false;
        state.isLoginFailed = false;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.isLoginLoading = false;
        state.isLoginSuccess = true;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.isLoginLoading = false;
        state.isLoginFailed = true;
      });
  },
});

export const { setUser, resetAllUserStatus } = usersSlice.actions;

export default usersSlice.reducer;
