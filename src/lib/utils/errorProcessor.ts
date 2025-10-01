import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { ErrorPayload } from "../types/store";

function errorProcessor(error: unknown) {
  const errorPayload: ErrorPayload = {
    message: "Something went wrong",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    success: false,
  };

  if (error instanceof AxiosError) {
    errorPayload.message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      errorPayload.message;
    errorPayload.status = error.response?.status || errorPayload.status;
  } else if (error instanceof Error) {
    errorPayload.message = error.message || errorPayload.message;
  } else if (typeof error === "string") {
    errorPayload.message = error || errorPayload.message;
  }

  // console.error("Thunk error:", error);

  return errorPayload;
}

export default errorProcessor;
