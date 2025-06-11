import errorHandler from "@/lib/errorHandler";
import { StoreContextType } from "@/types";
import { API } from "@/constants";
import axios from "axios";

type FORGOT_PASSWORD_PROPS = {
  email: string;
  setIsLoading: (isLoading: boolean) => void;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
};

const forgotPassword = async ({
  email,
  setIsLoading,
  setAPIMessage,
}: FORGOT_PASSWORD_PROPS) =>
  await errorHandler({
    apiCall: async () => {
      const response = await axios.post(API.USER.FORGOT_PASSWORD, { email });
      if (response.status === 200)
        setAPIMessage({
          notify: true,
          type: "success",
          message: response.data.message,
        });
    },
    setIsLoading,
    setAPIMessage,
  });

export default forgotPassword;
