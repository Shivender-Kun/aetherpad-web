import { authHandler } from "../authHandler";
import errorHandler from "../errorHandler";
import { API } from "@/constants";
import axios from "axios";

type FETCH_NOTES_PROPS = { queries?: string };

const fetchNotes = async ({ queries = "" }: FETCH_NOTES_PROPS) =>
  await errorHandler({
    apiCall: async () => {
      const query = `${API.NOTES.GET_LIST}?${queries}`;
      const auth_token = await authHandler();
      const headers = { Authorization: `Bearer ${auth_token}` };

      const response = await axios.get(query, { headers });
      if (response.status === 200) return response.data.data;
    },
  });

export default fetchNotes;
