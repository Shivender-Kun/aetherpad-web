import errorHandler from "@/lib/errorHandler";
import { API } from "@/constants";
import axios from "axios";

const logoutUser = async () =>
  await errorHandler({
    apiCall: async () => {
      const response = await axios.post(API.USER.LOGOUT);
      if (response.status === 200) window.location.href = "/login";
    },
  });

export default logoutUser;
