import { isAxiosError } from "axios";
import { notify } from "reapop";

export const asyncThunkValidation = async (thunkAPI: any, resolve: () => any) => {
  try {
    return await resolve();
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      thunkAPI.dispatch(
        notify({
          status: "error",
          title: error?.response?.data?.status,
          message: error?.response?.data?.message,
        })
      );
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }

    thunkAPI.dispatch(
      notify({ status: "error", title: "System Error", message: "System may get some erorr" })
    );
    return thunkAPI.rejectWithValue(error);
  }
};
