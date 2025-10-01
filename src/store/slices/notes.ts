import { API } from "@/constants/frontend";
import axiosInstance from "@/lib/api/setupAxios";
import { TCreateNoteSchema, TUpdateNoteSchema } from "@/lib/schemas";
import {
  ActionId,
  ILabel,
  INote,
  INoteFilterQuery,
  IPaginationQuery,
  PaginatedData,
} from "@/lib/types";
import { NOTE_ACTION, NOTE_STATUS } from "@/lib/types/enums";
import { ErrorPayload } from "@/lib/types/store";
import errorProcessor from "@/lib/utils/errorProcessor";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Status of an asynchronous operation */
type status = "idle" | "loading" | "succeeded" | "failed";

type UpdatableNoteAction = Exclude<
  NOTE_ACTION,
  NOTE_ACTION.ADD | NOTE_ACTION.DELETE
>;

/** State structure for notes data */
type DataState = {
  /** Status of the data fetch operation */
  status: status;
  /** Error message, if any */
  error?: string;
  /** Indicates if the data has been initialized */
  initialized: boolean;
  /** The actual notes data */
  data: PaginatedData<INote>;
};

/** State structure for pinned notes data */
type PinnedData = {
  /** Status of the data fetch operation */
  status: status;
  /** Error message, if any */
  error?: string;
  /** Indicates if the data has been initialized */
  initialized: boolean;
  /** The actual pinned notes data */
  data: { list: INote[] };
};

/** Overall state structure for notes slice */
export interface NotesState {
  /** State for archived notes */
  archived: DataState;
  /** State for binned notes */
  binned: DataState;
  /** State for pinned notes */
  pinned: PinnedData;
  /** State for unpinned notes */
  unpinned: DataState;
  /** Status of various note actions */
  actionStatus: {
    /** Status of adding a note */
    add: status;
    /** Status of editing a note */
    update: status;
    /** Status of deleting a note */
    delete: status;
  };

  updateMap: Record<string, { prev: INote; next: INote }>;
  binnedMap: Record<string, INote>;
  addMap: Record<string, INote>;
}

const initialDataState: DataState = {
  status: "idle",
  initialized: false,
  data: {
    list: [],
    page: 1,
    limit: 10,
    hasMore: false,
  },
};

const initialState: NotesState = {
  pinned: { ...initialDataState, data: { list: [] } },
  unpinned: { ...initialDataState },
  archived: { ...initialDataState },
  binned: { ...initialDataState },
  actionStatus: {
    add: "idle",
    update: "idle",
    delete: "idle",
  },
  addMap: {},
  updateMap: {},
  binnedMap: {},
};

/** Optional parameters for fetching notes
 * - page: number
 * - limit: number
 * - labels: string
 * - search: string
 */
type FetchNotesParams = IPaginationQuery & INoteFilterQuery;

const fetchNotes = <T>(name: string, type: string) =>
  createAsyncThunk<T, undefined | FetchNotesParams>(
    name,
    async (props, { rejectWithValue }) => {
      const { page = 1, limit = 10, search = "", labels = "" } = props || {};
      const searchQuery = search ? `search=${search}&` : "";
      const labelsQuery = labels ? `labels=${labels}&` : "";
      const query = `${searchQuery}${labelsQuery}page=${page}&limit=${limit}`;

      try {
        const response = await axiosInstance.get(
          `${API.NOTES.GET(type)}?${query}`,
        );

        return response.data.data;
      } catch (error) {
        return rejectWithValue(errorProcessor(error));
      }
    },
  );

/** Fetch active notes (pinned and unpinned) */
export const fetchActive = fetchNotes<{
  pinned: INote[];
  unpinned: PaginatedData<INote>;
}>("notes/fetchActive", "active");

/** Fetch archived notes */
export const fetchArchived = fetchNotes<PaginatedData<INote>>(
  "notes/fetchArchived",
  "archived",
);

/** Fetch binned notes */
export const fetchBinned = fetchNotes<PaginatedData<INote>>(
  "notes/fetchBinned",
  "binned",
);

type AddNotePayload = TCreateNoteSchema & ActionId;

/** Add new note */
export const addNote = createAsyncThunk<INote & ActionId, AddNotePayload>(
  "note/add",
  async (payload, { rejectWithValue }) => {
    const { actionId, ...note } = payload;
    try {
      const response = await axiosInstance.post(
        API.NOTES[NOTE_ACTION.ADD],
        note,
      );
      return { ...response.data.data, actionId };
    } catch (error) {
      return rejectWithValue({ ...errorProcessor(error), actionId });
    }
  },
);

/** Delete note permanently */
export const deleteNote = createAsyncThunk<INote, string>(
  "note/deletePermanently",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API.NOTES[NOTE_ACTION.DELETE](id),
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue({ ...errorProcessor(error), id });
    }
  },
);

/** Parameters for note action */
type NoteActionParams = {
  /** Unique action id
   * - pass the same id as used in the optimistic update for the same operation
   */
  actionId: string;
  /** Note id */
  id: string;
  /** Action on the note */
  action: UpdatableNoteAction;
  /** Optional note data if updating */
  data?: Partial<TUpdateNoteSchema>;
};

type NoteActionRejection = ErrorPayload & {
  noteAction: UpdatableNoteAction;
  actionId: string;
};

const noteAction = (name = "note/update") =>
  createAsyncThunk<INote & ActionId, NoteActionParams>(
    name,
    async (props, { rejectWithValue }) => {
      const { id, action, data, actionId } = props;
      try {
        const response = await axiosInstance.patch(API.NOTES[action](id), data);
        return { ...response.data.data, actionId };
      } catch (error) {
        return rejectWithValue({
          ...errorProcessor(error),
          noteAction: action,
          actionId,
        });
      }
    },
  );

export const updateNote = noteAction("note/update");

export const moveToBin = noteAction("note/moveToBin");

/** Removes specific note from the pinned list, takes redux state and note id as params */
const removeFromPinned = (state: NotesState, id: string) => {
  return state.pinned.data.list.filter((item) => item._id !== id);
};

/** Removes specific note from the unpinned list, takes redux state and note id as params */
const removeFromUnpinned = (state: NotesState, id: string) => {
  return state.unpinned.data.list.filter((item) => item._id !== id);
};

/** Removes specific note from the archived list, takes redux state and note id as params */
const removeFromArchived = (state: NotesState, id: string) => {
  return state.archived.data.list.filter((item) => item._id !== id);
};

/** Removes specific note from the bin list, takes redux state and note id as params */
const removeFromBin = (state: NotesState, id: string) => {
  return state.binned.data.list.filter((item) => item._id !== id);
};

type OptimisticUpdatePayload = PayloadAction<{
  /** Unique action id
   * - pass the same id as used in the api update for the same operation
   */
  actionId: string;
  /** Note action
   * - ARCHIVE
   * - UNARCHIVE
   * - PIN
   * - UNPIN
   * - BIN
   * - RESTORE
   * - UPDATE
   * - BACKGROUND
   */
  noteAction: UpdatableNoteAction;
  /** Original data of selected note  */
  note: INote;
  /** Updated data of the selected note */
  data?: Partial<INote>;
}>;

type OptimisticDeletePayload = PayloadAction<{
  note: INote;
}>;

type OptimisticAddPayload = PayloadAction<
  {
    note: TCreateNoteSchema & { _id: string };
    labels: ILabel[];
  } & ActionId
>;

/** Redux slice for managing notes state */
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    /** Hydrate pinned notes state with provided data */
    hydratePinned(state, action: PayloadAction<INote[]>) {
      state.pinned.data.list = action.payload;
      state.pinned.initialized = true;
    },
    /** Hydrate unpinned notes state with provided data */
    hydrateUnpinned(state, action: PayloadAction<PaginatedData<INote>>) {
      state.unpinned.data = action.payload;
      state.unpinned.initialized = true;
    },
    /** Hydrate archived notes state with provided data */
    hydrateArchived(state, action: PayloadAction<PaginatedData<INote>>) {
      state.archived.data = action.payload;
      state.archived.initialized = true;
    },
    /** Hydrate binned notes state with provided data */
    hydrateBinned(state, action: PayloadAction<PaginatedData<INote>>) {
      state.binned.data = action.payload;
      state.binned.initialized = true;
    },
    /** Optimistically update note */
    optimisticNoteUpdate(state, action: OptimisticUpdatePayload) {
      const { note, data, noteAction, actionId } = action.payload;

      if (
        noteAction === NOTE_ACTION.UPDATE ||
        noteAction === NOTE_ACTION.BACKGROUND
      ) {
        const next = { ...note, ...data };
        state.updateMap[actionId] = { prev: note, next };

        /** Returns the updated note data for the matching item in an array.map callback */
        const handleOptimisticNoteUpdate = (item: INote) => {
          if (item._id === note._id) return { ...item, ...data };
          return item;
        };

        if (note.isPinned) {
          state.pinned.data.list = state.pinned.data.list.map(
            handleOptimisticNoteUpdate,
          );
        } else {
          state.unpinned.data.list = state.unpinned.data.list.map(
            handleOptimisticNoteUpdate,
          );
        }
      }

      if (noteAction === NOTE_ACTION.PIN) {
        const next = { ...note, isPinned: true };
        state.updateMap[actionId] = { prev: note, next };
        state.unpinned.data.list = removeFromUnpinned(state, note._id);
        state.pinned.data.list.unshift(next);
      }

      if (noteAction === NOTE_ACTION.UNPIN) {
        const next = { ...note, isPinned: false };
        state.updateMap[actionId] = { prev: note, next };
        state.pinned.data.list = removeFromPinned(state, note._id);
        state.unpinned.data.list.unshift(next);
      }

      if (noteAction === NOTE_ACTION.ARCHIVE) {
        const next = { ...note, status: NOTE_STATUS.ARCHIVED };
        state.updateMap[actionId] = { prev: note, next };

        if (note.isPinned) {
          state.pinned.data.list = removeFromPinned(state, note._id);
        } else {
          state.unpinned.data.list = removeFromUnpinned(state, note._id);
        }
      }

      if (noteAction === NOTE_ACTION.UNARCHIVE) {
        const next = { ...note, status: NOTE_STATUS.ACTIVE };
        state.updateMap[actionId] = { prev: note, next };
        state.archived.data.list = removeFromArchived(state, note._id);
      }

      if (noteAction === NOTE_ACTION.BIN) {
        const next = { ...note, status: NOTE_STATUS.BINNED };
        state.updateMap[actionId] = { prev: note, next };

        if (note.status === NOTE_STATUS.ARCHIVED) {
          state.archived.data.list = removeFromArchived(state, note._id);
        } else if (note.isPinned) {
          state.pinned.data.list = removeFromPinned(state, note._id);
        } else {
          state.unpinned.data.list = removeFromUnpinned(state, note._id);
        }
      }

      if (noteAction === NOTE_ACTION.RESTORE) {
        const next = { ...note, status: NOTE_STATUS.ACTIVE };
        state.updateMap[actionId] = { prev: note, next };
        state.binned.data.list = removeFromBin(state, note._id);
      }
    },
    /** Optimistically delete note */
    optimisticNoteDelete(state, action: OptimisticDeletePayload) {
      const { note } = action.payload;
      state.binnedMap[note._id] = note;
      state.binned.data.list = removeFromBin(state, note._id);
    },
    /** Optimistically add note */
    optimisticNoteAdd(state, action: OptimisticAddPayload) {
      const { note, actionId, labels } = action.payload;
      const payload = {
        ...note,
        _id: actionId,
        isPinned: false,
        labels,
        status: NOTE_STATUS.ACTIVE,
      };
      state.addMap[note._id] = payload;
      state.unpinned.data.list.unshift(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Active List (Pinned and Unpinned)
      .addCase(fetchActive.pending, (state) => {
        state.pinned.status = "loading";
        state.unpinned.status = "loading";
      })
      .addCase(fetchActive.fulfilled, (state, action) => {
        const {
          unpinned: { page, list, hasMore, limit },
        } = action.payload;

        if (page > 1) {
          state.unpinned.data = {
            list: [...state.unpinned.data.list, ...list],
            page,
            limit,
            hasMore,
          };
        } else {
          state.pinned.data.list = action.payload.pinned;
          state.unpinned.data = action.payload.unpinned;
          state.pinned.status = "succeeded";
        }
        state.unpinned.status = "succeeded";
      })
      .addCase(fetchActive.rejected, (state) => {
        state.pinned.status = "failed";
        state.unpinned.status = "failed";
      })
      // Archived List
      .addCase(fetchArchived.pending, (state) => {
        state.archived.status = "loading";
      })
      .addCase(fetchArchived.fulfilled, (state, action) => {
        const { page, list, hasMore, limit } = action.payload;

        if (page > 1) {
          state.archived.data = {
            list: [...state.archived.data.list, ...list],
            page,
            limit,
            hasMore,
          };
        } else {
          state.archived.data = action.payload;
        }

        state.archived.status = "succeeded";
      })
      .addCase(fetchArchived.rejected, (state) => {
        state.archived.status = "failed";
      })
      // Binned List
      .addCase(fetchBinned.pending, (state) => {
        state.binned.status = "loading";
      })
      .addCase(fetchBinned.fulfilled, (state, action) => {
        const { page, list, hasMore, limit } = action.payload;

        if (page > 1) {
          state.binned.data = {
            list: [...state.binned.data.list, ...list],
            page,
            limit,
            hasMore,
          };
        } else {
          state.binned.data = action.payload;
        }
        state.binned.status = "succeeded";
      })
      .addCase(fetchBinned.rejected, (state) => {
        state.binned.status = "failed";
      })
      // Add
      .addCase(addNote.pending, (state) => {
        state.actionStatus.add = "loading";
      })
      .addCase(addNote.rejected, (state, action) => {
        const { actionId, isPinned } = action.payload as Pick<
          NoteActionRejection,
          "actionId"
        > & { isPinned: boolean };

        if (isPinned) {
          state.pinned.data.list = removeFromPinned(state, actionId);
        } else {
          state.unpinned.data.list = removeFromUnpinned(state, actionId);
        }

        delete state.addMap[actionId];
        state.actionStatus.add = "failed";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        const { actionId, ...note } = action.payload;
        const isPinned = state.addMap[actionId].isPinned;

        state.addMap[actionId] = note;

        if (isPinned) {
          state.pinned.data.list = state.pinned.data.list.map((item) => {
            if (item._id === actionId) return { ...note, isPinned };
            return item;
          });
        } else {
          state.unpinned.data.list = state.unpinned.data.list.map((item) => {
            if (item._id === actionId) return note;
            return item;
          });
          delete state.addMap[actionId];
        }

        state.actionStatus.add = "succeeded";
      })
      // Update
      .addCase(updateNote.pending, (state) => {
        state.actionStatus.update = "loading";
      })
      .addCase(updateNote.rejected, (state, action) => {
        const { actionId, noteAction } = action.payload as NoteActionRejection;

        /** Saved copy of the note's old state */
        const savedNoteCopy =
          state.addMap[actionId] || state.updateMap[actionId].prev;

        /** Returns the savedNoteCopy for the matching item in an array.map callback */
        const handleRejectedNoteRollback = (item: INote) => {
          if (item._id === savedNoteCopy._id) return savedNoteCopy;
          return item;
        };

        if (
          noteAction === NOTE_ACTION.UPDATE ||
          noteAction === NOTE_ACTION.BACKGROUND
        ) {
          if (savedNoteCopy.isPinned) {
            state.pinned.data.list = state.pinned.data.list.map(
              handleRejectedNoteRollback,
            );
          } else {
            state.unpinned.data.list = state.unpinned.data.list.map(
              handleRejectedNoteRollback,
            );
          }
        }

        if (noteAction === NOTE_ACTION.PIN) {
          state.unpinned.data.list.unshift(savedNoteCopy);
          state.pinned.data.list = removeFromPinned(state, savedNoteCopy._id);
        }

        if (noteAction === NOTE_ACTION.UNPIN) {
          state.pinned.data.list.unshift(savedNoteCopy);
          state.unpinned.data.list = removeFromUnpinned(
            state,
            savedNoteCopy._id,
          );
        }

        if (noteAction === NOTE_ACTION.ARCHIVE) {
          if (savedNoteCopy.isPinned) {
            state.pinned.data.list.unshift(savedNoteCopy);
          } else {
            state.unpinned.data.list.unshift(savedNoteCopy);
          }
        }

        if (noteAction === NOTE_ACTION.UNARCHIVE) {
          state.archived.data.list.unshift(savedNoteCopy);
        }

        if (noteAction === NOTE_ACTION.BIN) {
          if (savedNoteCopy.status === NOTE_STATUS.ARCHIVED) {
            state.archived.data.list.unshift(savedNoteCopy);
          } else if (savedNoteCopy.isPinned) {
            state.pinned.data.list.unshift(savedNoteCopy);
          } else {
            state.unpinned.data.list.unshift(savedNoteCopy);
          }
        }

        if (noteAction === NOTE_ACTION.RESTORE) {
          state.binned.data.list.unshift(savedNoteCopy);
        }

        state.actionStatus.update = "failed";
        if (state.addMap[actionId]) delete state.addMap[actionId];
        else delete state.updateMap[actionId];
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { actionId } = action.payload;
        delete state.updateMap[actionId];
        state.actionStatus.update = "succeeded";
      })
      // Delete
      .addCase(deleteNote.pending, (state) => {
        state.actionStatus.delete = "loading";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        const { id } = action.payload as ErrorPayload & { id: string };
        state.actionStatus.delete = "failed";
        state.binned.data.list.unshift(state.binnedMap[id]);
        delete state.binnedMap[id];
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.binned.data.list = state.binned.data.list.filter(
          (note) => note._id !== action.payload._id,
        );
        state.actionStatus.delete = "succeeded";
        delete state.binnedMap[action.payload._id];
      });
  },
});

export const {
  hydrateArchived,
  hydrateBinned,
  hydratePinned,
  hydrateUnpinned,
  optimisticNoteUpdate,
  optimisticNoteDelete,
  optimisticNoteAdd,
} = notesSlice.actions;

export default notesSlice.reducer;
