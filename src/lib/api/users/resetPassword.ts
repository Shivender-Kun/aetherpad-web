import { API } from "@/constants";
import axios, { AxiosError } from "axios";

const resetPassword = async (newPassword: string, token: string) => {
  try {
    const response = await axios.post(API.USER.RESET_PASSWORD, {
      newPassword,
      token,
    });

    if (response.status === 200) return true;
  } catch (error) {
    if (error instanceof AxiosError)
      console.error(error.response?.data.message);
  }
};

export default resetPassword;
