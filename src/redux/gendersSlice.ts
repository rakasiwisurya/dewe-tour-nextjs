import { TGenderState } from "@/types";
import { asyncThunkValidation, fetchApi } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGenders = createAsyncThunk("genders", async (_, thunkAPI) => {
  return await asyncThunkValidation(thunkAPI, async () => {
    const response = await fetchApi.json.get("/api/genders");
    return response.data;
  });
});

const initialState: TGenderState = {
  genders: [],
  isGendersLoading: true,
  isGenderSuccess: false,
  isGenderFailed: false,
};

export const gendersSlice = createSlice({
  name: "genders",
  initialState,
  reducers: {
    resetAllGenderStatus: (state) => {
      state.isGendersLoading = true;
      state.isGenderSuccess = false;
      state.isGenderFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenders.pending, (state) => {
        state.isGendersLoading = true;
        state.isGenderSuccess = false;
        state.isGenderFailed = false;
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.genders = action.payload.data;
        state.isGendersLoading = false;
        state.isGenderSuccess = true;
      })
      .addCase(fetchGenders.rejected, (state) => {
        state.isGendersLoading = false;
        state.isGenderFailed = true;
      });
  },
});

export const { resetAllGenderStatus } = gendersSlice.actions;

export default gendersSlice.reducer;
