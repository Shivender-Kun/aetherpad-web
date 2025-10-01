import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import HeaderHandler from "../utils/server/headerHandler";
import { withErrorHandler } from "./withErrorHandler";
import { withValidation } from "./withValidation";

export const withApiHandler = async <T>(
  handler: (
    headers: Record<string, string>,
    data: T | null,
  ) => Promise<Response>,
  req?: NextRequest,
  schema?: ZodSchema<T>,
) =>
  withErrorHandler(async () => {
    const headers = await HeaderHandler.getInternalAuth();
    const data =
      schema && req ? await withValidation(schema, () => req.json()) : null;
    return handler(headers, data);
  });

export default withApiHandler;
