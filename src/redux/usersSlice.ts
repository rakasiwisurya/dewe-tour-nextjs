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

const initialState: TUserState = {
  user: null,
  isRegisterLoading: false,
  isLoginLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.isRegisterLoading = false;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.isRegisterLoading = false;
      });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
