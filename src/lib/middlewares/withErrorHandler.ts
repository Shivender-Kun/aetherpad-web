import { NextResponse } from "next/server";
import errorProcessor from "../utils/errorProcessor";

export const withErrorHandler = async (handler: () => Promise<Response>) => {
  try {
    return await handler();
  } catch (error) {
    const errorPayload = errorProcessor(error);
    // console.error(error);
    return NextResponse.json(errorPayload, { status: errorPayload.status });
  }
};
