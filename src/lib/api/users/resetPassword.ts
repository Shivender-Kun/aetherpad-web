import errorHandler from "@/lib/errorHandler";
import { API } from "@/constants";
import axios from "axios";

const resetPassword = async (newPassword: string, token: string) => {
  try {
    const response = await axios.post(API.USER.RESET_PASSWORD, {
      newPassword,
      token,
    });

    if (response.status === 200) return true;
  } catch (error) {
    errorHandler(error);
  }
};

export default resetPassword;
