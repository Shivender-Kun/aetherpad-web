import { API } from "@/constants";
import axios from "axios";

const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(API.USER.FORGOT_PASSWORD, { email });

    if (response.status === 200) return true; // Indicate success
  } catch (error) {
    console.error("Error", error);
    throw error; // Re-throw the error for further handling
  }
  return false; // Indicate failure
};

export default forgotPassword;
