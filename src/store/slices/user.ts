import { API } from "@/constants/frontend";
import axiosInstance from "@/lib/api/setupAxios";
import { TUpdateUserSchema } from "@/lib/schemas";
import { IUser } from "@/lib/types";
import { ErrorPayload, ResponseState } from "@/lib/types/store";
import errorProcessor from "@/lib/utils/errorProcessor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  data: IUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  initialized: boolean;
}

const initialState: UserState = {
  data: null,
  status: "idle",
  initialized: false,
};

type T = { data: IUser };

export const updateUser = createAsyncThunk<
  ResponseState<T>,
  TUpdateUserSchema,
  { rejectValue: ErrorPayload }
>("user/updateUser", async (payload, { rejectWithValue }) => {
  try {
    const formdata = new FormData();
    formdata.append("username", payload.username);

    if (payload.profilePicture instanceof File)
      formdata.append("profilePicture", payload.profilePicture);

    if (payload.coverPicture instanceof File)
      formdata.append("coverPicture", payload.coverPicture);

    const response = await axiosInstance.patch(API.USER.PROFILE, formdata);

    return response.data;
  } catch (error) {
    return rejectWithValue(errorProcessor(error));
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    hydrateUser(state, action) {
      if (!state.initialized) {
        state.data = action.payload;
        state.status = "succeeded";
        state.initialized = true;
      }
    },
    setUser(state, action) {
      state.data = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state: UserState) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state: UserState, action) => {
        state.data = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state: UserState, action: any) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { hydrateUser, setUser } = userSlice.actions;

export default userSlice.reducer;
