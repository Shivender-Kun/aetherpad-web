import { authHandler } from "./authHandler";
import errorHandler from "../errorHandler";
import { API } from "@/constants";
import axios from "axios";

const fetchNotes = async ({ queries = "" }: { queries?: string }) => {
  const query = `${API.NOTES.GET_LIST}?${queries}`;

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

export default fetchNotes;
