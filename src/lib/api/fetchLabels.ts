import { API, DEFAULT_PAGINATION_LIMIT } from "@/constants";
import { authHandler } from "./authHandler";
import errorHandler from "../errorHandler";
import axios from "axios";

const fetchLabels = async ({
  page = 1,
  queries = "",
  limit = DEFAULT_PAGINATION_LIMIT,
}: {
  page?: number;
  limit?: number;
  queries?: string;
}) => {
  const query = `${API.LABELS.GET_LIST}?page=${page}&limit=${limit}&${queries}`;

  try {
    const auth_token = await authHandler();
    const headers = { Authorization: `Bearer ${auth_token}` };

    const response = await axios.get(query, { headers });

    if (response.status !== 200) throw Error(response.data.message);

    return response.data.data;
  } catch (error) {
    errorHandler(error);
  }
};

export default fetchLabels;
