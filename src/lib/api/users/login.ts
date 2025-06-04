import { API } from "@/constants";
import { StoreContextType } from "@/types";
import axios from "axios";

type UserLoginProps = {
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  data: { email: string; password: string };
};

const userLogin = async ({
  setAPIMessage,
  setIsLoading,
  data,
}: UserLoginProps) => {
  setAPIMessage(null);
  setIsLoading(true);

  try {
    const response = await axios.post(API.USER.LOGIN, data);

    if (response.status === 200)
      setAPIMessage({
        notify: true,
        type: "success",
        message: response.data.message,
      });
  } catch (error) {
    let message = "An error occurred";
    if (error instanceof Error) message = error.message;
    setAPIMessage({ type: "error", message, notify: true });
    console.error(error);
  }

  setIsLoading(false);
};

export default userLogin;
