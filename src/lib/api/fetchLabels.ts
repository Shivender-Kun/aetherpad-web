import { API, DEFAULT_PAGINATION_LIMIT } from "@/constants";
import { authHandler } from "../authHandler";
import errorHandler from "../errorHandler";
import axios from "axios";

type FETCH_LABELS_PROPS = {
  page?: number;
  limit?: number;
  queries?: string;
};

const fetchLabels = async ({
  page = 1,
  queries = "",
  limit = DEFAULT_PAGINATION_LIMIT,
}: FETCH_LABELS_PROPS) =>
  await errorHandler({
    apiCall: async () => {
      const query = `${API.LABELS.GET_LIST}?page=${page}&limit=${limit}&${queries}`;
      const auth_token = await authHandler();
      const headers = { Authorization: `Bearer ${auth_token}` };

      const response = await axios.get(query, { headers });
      if (response.status === 200) return response.data.data;
    },
  });

export default fetchLabels;
