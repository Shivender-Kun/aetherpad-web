import errorHandler from "@/lib/errorHandler";
import { authHandler } from "../authHandler";
import { API } from "@/constants";
import axios from "axios";

const fetchDetails = async () => {
  try {
    const auth_token = await authHandler();
    const headers = { Authorization: `Bearer ${auth_token}` };
    const response = await axios.get(API.USER.DETAILS, { headers });

    if (response.status !== 200) throw Error(response.data.message);

    return response.data.user;
  } catch (error) {
    errorHandler(error);
  }
};

export default fetchDetails;
