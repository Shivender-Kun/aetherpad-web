import { API } from "@/constants/frontend";
import errorHandler from "../utils/errorHandler";
import axiosInstance from "./setupAxios";

const getCsrf = () => {
  return errorHandler({
    apiCall: async () => {
      const response = await axiosInstance.get(API.CSRF);
      return response;
    },
  });
};

export { getCsrf };
