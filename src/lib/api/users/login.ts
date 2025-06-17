import errorHandler from "@/lib/errorHandler";
import { StoreContextType } from "@/types";
import { API } from "@/constants";
import axios from "axios";

type UserLoginProps = {
  data: { email: string; password: string };
  setIsLoading: (isLoading: boolean) => void;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
};

const userLogin = async ({
  data,
  setIsLoading,
  setAPIMessage,
}: UserLoginProps) =>
  await errorHandler({
    apiCall: async () => {
      const response = await axios.post(API.USER.LOGIN, data);
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

export default userLogin;
