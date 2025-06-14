import errorHandler from "@/lib/errorHandler";
import { API } from "@/constants";
import axios from "axios";

const deleteAccount = async () =>
  await errorHandler({
    apiCall: async () => {
      const response = await axios.post(API.USER.DELETE);
      if (response.status === 200) window.location.href = "/login";
    },
  });

export default deleteAccount;
