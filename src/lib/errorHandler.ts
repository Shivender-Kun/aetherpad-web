import { StoreContextType } from "@/types";
import { AxiosError } from "axios";

type ERROR_HANDLER_PROPS = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiCall: () => Promise<any>;
  setIsLoading?: (isLoading: boolean) => void;
  setAPIMessage?: (apiMessage: StoreContextType["apiMessage"] | null) => void;
};

const errorHandler = async ({
  apiCall,
  setAPIMessage,
  setIsLoading,
}: ERROR_HANDLER_PROPS) => {
  if (setAPIMessage) setAPIMessage(null);
  if (setIsLoading) setIsLoading(true);

  try {
    return await apiCall();
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof AxiosError)
      message = error.response?.data.message || error.message;
    else if (error instanceof Error) message = error.message;
    if (setAPIMessage) setAPIMessage({ type: "error", message, notify: true });
  } finally {
    if (setIsLoading)
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }
};

export default errorHandler;
