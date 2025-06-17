import errorHandler from "@/lib/errorHandler";
import { StoreContextType } from "@/types";
import { API } from "@/constants";
import axios from "axios";

type RESET_PASSWORD_PROPS = {
  token: string;
  newPassword: string;
  setIsLoading: (isLoading: boolean) => void;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
};

const resetPassword = async ({
  token,
  newPassword,
  setIsLoading,
  setAPIMessage,
}: RESET_PASSWORD_PROPS) =>
  await errorHandler({
    apiCall: async () => {
      const response = await axios.post(API.USER.RESET_PASSWORD, {
        newPassword,
        token,
      });

      if (response.status === 200)
        return setAPIMessage({
          notify: true,
          type: "success",
          message: response.data.message,
        });
    },
    setIsLoading,
    setAPIMessage,
  });

export default resetPassword;
