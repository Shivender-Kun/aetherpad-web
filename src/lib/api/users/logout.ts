import errorHandler from "@/lib/errorHandler";
import { API } from "@/constants";
import axios from "axios";

const logoutUser = async () => {
  try {
    const response = await axios.post(API.USER.LOGOUT);

    if (response.status !== 200) throw Error(response.data.message);
    window.location.href = "/login";
  } catch (error) {
    errorHandler(error);
  }
};

export default logoutUser;
