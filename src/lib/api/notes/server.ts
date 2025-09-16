import { API_PROXY } from "@/constants/server";
import { INote, PaginatedData } from "@/lib/types";
import errorHandler from "@/lib/utils/errorHandler";
import axios from "axios";

type FetchNotesParams = {
  page?: number;
  limit?: number;
  search?: string;
  labels?: string;
  type?: string;
};

type FetchActiveNotesResponse = {
  pinned: INote[];
  unpinned: PaginatedData<INote>;
};

type FetchInactiveNotesResponse = PaginatedData<INote>;

const fetchNotes = <T>(cookieHeader: string | null, props?: FetchNotesParams) =>
  errorHandler<T>({
    apiCall: async () => {
      const {
        page = 1,
        limit = 10,
        search = "",
        labels = "",
        type = "active",
      } = props || {};

      if (!cookieHeader) throw new Error("No cookie header provided");

      const searchQuery = search ? `search=${search}&` : "";
      const labelsQuery = labels ? `labels=${labels}&` : "";

      const response = await axios.get(
        `${API_PROXY.NOTES.GET(type)}?${searchQuery}${labelsQuery}page=${page}&limit=${limit}`,
        { headers: { Cookie: cookieHeader } },
      );
      if (response.status === 200) return response.data.data;
    },
  });

const fetchInitalActiveNotes = (
  cookieHeader: string | null,
  props?: FetchNotesParams,
) =>
  fetchNotes<FetchActiveNotesResponse>(cookieHeader, {
    ...props,
    type: "active",
  });

const fetchInitalArchivedNotes = (
  cookieHeader: string | null,
  props?: FetchNotesParams,
) =>
  fetchNotes<FetchInactiveNotesResponse>(cookieHeader, {
    ...props,
    type: "archived",
  });

const fetchInitalDeletedNotes = (
  cookieHeader: string | null,
  props?: FetchNotesParams,
) =>
  fetchNotes<FetchInactiveNotesResponse>(cookieHeader, {
    ...props,
    type: "deleted",
  });

export default {
  fetchInitalActiveNotes,
  fetchInitalArchivedNotes,
  fetchInitalDeletedNotes,
};
