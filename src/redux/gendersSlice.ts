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
};

export const gendersSlice = createSlice({
  name: "genders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenders.pending, (state) => {
        state.isGendersLoading = true;
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.isGendersLoading = false;
        state.genders = action.payload.data;
      })
      .addCase(fetchGenders.rejected, (state) => {
        state.isGendersLoading = false;
      });
  },
});

export default gendersSlice.reducer;
