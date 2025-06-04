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
    if (error instanceof Error) console.error(error.message);
    else console.error(error);
  }
};

export default fetchDetails;
