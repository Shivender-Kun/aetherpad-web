import { authHandler } from "../../authHandler";
import errorHandler from "@/lib/errorHandler";
import { API } from "@/constants";
import axios from "axios";

const fetchDetails = async () => {
  return await errorHandler({
    apiCall: async () => {
      const auth_token = await authHandler();
      const headers = { Authorization: `Bearer ${auth_token}` };
      const response = await axios.get(API.USER.DETAILS, { headers });
      if (response.status === 200) return response.data.user;
    },
  });
};

export default fetchDetails;
