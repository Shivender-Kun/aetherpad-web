import { MAX_LABELS_PER_USER } from "@/constants/dataLimits";
import { API } from "@/constants/frontend";
import axiosInstance from "@/lib/api/setupAxios";
import { TCreateLabelSchema } from "@/lib/schemas";
import { ActionId, ILabel, IPaginationQuery, PaginatedData } from "@/lib/types";
import { ErrorPayload, ResponseState } from "@/lib/types/store";
import errorProcessor from "@/lib/utils/errorProcessor";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Initial State of labels reducer
 * - data: PaginatedData<ILabel>
 * - status: "idle" | "loading" | "succeeded" | "failed"
 * - error?: string
 * - initialized: boolean
 * - addMap: Record<string, ILabel>
 * - updateMap: Record<string, { prev: ILabel; next: ILabel }>
 * - deleteMap: Record<string, ILabel>
 */
interface LabelsState {
  data: PaginatedData<ILabel>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  initialized: boolean;
  addMap: Record<string, ILabel>;
  updateMap: Record<string, { prev: ILabel; next: ILabel }>;
  deleteMap: Record<string, ILabel>;
}

const initialState: LabelsState = {
  data: {
    list: [],
    page: 1,
    limit: 10,
    hasMore: false,
  },
  status: "idle",
  initialized: false,
  addMap: {},
  updateMap: {},
  deleteMap: {},
};

export const fetchLabels = createAsyncThunk<
  PaginatedData<ILabel>,
  undefined | IPaginationQuery
>("labels/fetchLabels", async (props, { rejectWithValue }) => {
  const { page = 1, limit = MAX_LABELS_PER_USER } = props || {};
  const query = `page=${page}&limit=${limit}`;

  try {
    const response = await axiosInstance.get(`${API.LABELS.GET_LIST}?${query}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(errorProcessor(error));
  }
});

type ActionableResponseState = ResponseState<{ data: ILabel } & ActionId>;
type ActionableRejectValue = ErrorPayload & ActionId;

export const addLabel = createAsyncThunk<
  ActionableResponseState,
  TCreateLabelSchema & ActionId,
  { rejectValue: ActionableRejectValue }
>("labels/addlabel", async (props, { rejectWithValue }) => {
  const { name, actionId } = props;
  try {
    const response = await axiosInstance.post(API.LABELS.ADD, { name });
    return { ...response.data, actionId };
  } catch (error) {
    return rejectWithValue({ ...errorProcessor(error), actionId });
  }
});

export const deleteLabel = createAsyncThunk<
  ActionableResponseState,
  { id: string } & ActionId,
  { rejectValue: ActionableRejectValue }
>("labels/deleteLabel", async (props, { rejectWithValue }) => {
  const { actionId, id } = props;
  try {
    const response = await axiosInstance.delete(API.LABELS.DELETE(id));
    return { ...response.data, actionId };
  } catch (error) {
    return rejectWithValue({ ...errorProcessor(error), actionId });
  }
});

export const updateLabel = createAsyncThunk<
  ActionableResponseState,
  { label: ILabel } & ActionId,
  { rejectValue: ActionableRejectValue }
>("labels/updateLabel", async (props, { rejectWithValue }) => {
  const {
    actionId,
    label: { _id, name },
  } = props;
  try {
    const response = await axiosInstance.patch(API.LABELS.UPDATE(_id), {
      name,
    });
    return { ...response.data, actionId };
  } catch (error) {
    return rejectWithValue({ ...errorProcessor(error), actionId });
  }
});

type OptimisticAddAction = PayloadAction<{ name: string } & ActionId>;
type OptimisticUpdateAction = PayloadAction<
  { label: ILabel; updatedName: string } & ActionId
>;
type OptimisticDeleteAction = PayloadAction<{ label: ILabel } & ActionId>;

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    hydrateLabels(state, action) {
      state.data = action.payload;
      state.status = "succeeded";
      state.initialized = true;
    },
    optimisticAddLabel(state, action: OptimisticAddAction) {
      const { actionId, name } = action.payload;
      const payload = { _id: actionId, name };
      state.addMap[actionId] = payload;
      state.data.list.unshift(payload);
    },
    optimisticUpdateLabel(state, action: OptimisticUpdateAction) {
      const { actionId, label, updatedName } = action.payload;

      const next = { ...label, name: updatedName };
      const labelIndex = state.data.list.findIndex(
        (item) => item._id === label._id,
      );
      state.data.list[labelIndex] = next;

      state.updateMap[actionId] = { prev: label, next: next };
    },
    optimisticDeleteLabel(state, action: OptimisticDeleteAction) {
      const { actionId, label } = action.payload;
      state.deleteMap[actionId] = label;
      state.data.list = state.data.list.filter(
        (item) => item._id !== label._id,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLabels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addLabel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLabel.fulfilled, (state, action) => {
        const { actionId, data } = action.payload;

        state.data.list[0] = data;

        state.status = "succeeded";
        delete state.addMap[actionId];
      })
      .addCase(addLabel.rejected, (state, action) => {
        const { actionId } = action.payload!;

        state.data.list.shift();

        state.status = "failed";
        state.error = action.error.message;
        delete state.addMap[actionId];
      })
      .addCase(deleteLabel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        const { actionId } = action.payload;

        state.status = "succeeded";
        delete state.deleteMap[actionId];
      })
      .addCase(deleteLabel.rejected, (state, action) => {
        const { actionId } = action.payload!;

        state.data.list.unshift(state.deleteMap[actionId]);

        state.status = "failed";
        state.error = action.error.message;
        delete state.deleteMap[actionId];
      })
      .addCase(updateLabel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        const { actionId } = action.payload;

        state.status = "succeeded";
        delete state.updateMap[actionId];
      })
      .addCase(updateLabel.rejected, (state, action) => {
        const { actionId } = action.payload!;

        const prev = state.updateMap[actionId].prev;
        const labelIndex = state.data.list.findIndex(
          (label) => label._id === prev._id,
        );
        state.data.list[labelIndex] = prev;

        state.status = "failed";
        state.error = action.error.message;
        delete state.updateMap[actionId];
      });
  },
});

export const {
  hydrateLabels,
  optimisticAddLabel,
  optimisticUpdateLabel,
  optimisticDeleteLabel,
} = labelsSlice.actions;
export default labelsSlice.reducer;
