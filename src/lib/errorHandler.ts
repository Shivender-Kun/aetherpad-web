import { StoreContextType } from "@/types";
import { AxiosError } from "axios";

const errorHandler = (
  error: unknown,
  setAPIMessage?: (apiMessage: StoreContextType["apiMessage"] | null) => void
) => {
  let message = "";
  if (error instanceof AxiosError) message = error.response?.data.message;
  else if (error instanceof Error) message = error.message;
  if (setAPIMessage) setAPIMessage({ type: "error", message, notify: true });
  console.error(message);
};

export default errorHandler;
