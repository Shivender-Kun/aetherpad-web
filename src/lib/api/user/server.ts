import { API_PROXY } from "@/constants/server";
import errorHandler from "@/lib/utils/errorHandler";
import axiosInstance from "../setupAxios";

const fetchProfile = () =>
  errorHandler({
    apiCall: async () => {
      const response = await axiosInstance.get(API_PROXY.USER.PROFILE);
      if (response.status === 200) return response.data.data;
    },
  });

export default { fetch: fetchProfile };
