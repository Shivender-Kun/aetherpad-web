import { LABELS_LIMIT_PER_PAGE } from "@/constants/dataLimits";
import { API_PROXY } from "@/constants/server";
import errorHandler from "@/lib/utils/errorHandler";
import axiosInstance from "../setupAxios";

type FETCH_LABELS_PROPS = {
  page?: number;
  limit?: number;
  queries?: string;
};

const fetchLabels = ({
  page = 1,
  queries = "",
  limit = LABELS_LIMIT_PER_PAGE,
}: FETCH_LABELS_PROPS) =>
  errorHandler({
    apiCall: async () => {
      const query = `${API_PROXY.LABELS.GET_LIST}?page=${page}&limit=${limit}&${queries}`;
      const response = await axiosInstance.get(query);
      if (response.status === 200) return response.data.data;
    },
  });

export default { fetch: fetchLabels };
