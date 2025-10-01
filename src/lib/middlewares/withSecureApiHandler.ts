import { AxiosHeaders } from "axios";
import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import HeaderHandler from "../utils/server/headerHandler";
import { withErrorHandler } from "./withErrorHandler";
import { withValidation } from "./withValidation";

export const withSecureApiHandler = async <T>(
  handler: (
    headers: Pick<
      AxiosHeaders,
      "X-CSRF-Token" | "X-Internal-Auth" | "X-User-Id" | "Cookie"
    >,
    payload: T | null,
  ) => Promise<Response>,
  req: NextRequest,
  schema?: ZodSchema<T>,
) =>
  withErrorHandler(async () => {
    const headers = await HeaderHandler.getRequired();
    const cookieHeader = req.cookies.toString();
    const payload = schema
      ? await withValidation(schema, () => req.json())
      : null;

    return handler({ ...headers, Cookie: cookieHeader }, payload);
  });

export default withSecureApiHandler;
