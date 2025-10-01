import store from "@/store";
import { setNotification } from "@/store/slices/notifications";
import axios from "axios";

function setupAxios() {
  const api = axios.create({
    withCredentials: true,
    timeout: 60000,
  });

  // Request Interception and Modification
  api.interceptors.request.use(async (config) => {
    const isServer = typeof window === "undefined";

    if (isServer) {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        if (cookieHeader) {
          config.headers.Cookie = cookieHeader;
        }
      } catch (error) {
        console.warn("Could not read cookies on server:", error);
      }
    }

    return config;
  });

  // Response Interception and Toast Notification
  api.interceptors.response.use(
    (response) => {
      const { config, data } = response;

      if (
        config.method &&
        ["put", "post", "patch", "delete"].includes(config.method)
      ) {
        store.dispatch(
          setNotification({
            type: "success",
            message: data.message,
          }),
        );
      }

      return response;
    },
    (error) => {
      let errorMsg: string = error.message || "Something went wrong";

      if (error.response) {
        const { data } = error.response;
        if (data?.message) errorMsg = data.message || errorMsg;
      }

      store.dispatch(
        setNotification({
          type: "error",
          message: errorMsg,
        }),
      );

      return Promise.reject(error);
    },
  );

  return api;
}
const axiosInstance = setupAxios();

export default axiosInstance;
