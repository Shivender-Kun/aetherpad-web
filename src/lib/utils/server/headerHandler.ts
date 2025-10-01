import { withAuth } from "@/lib/middlewares/withAuth";
import CookieHandler from "./cookieHandler";
import { AxiosHeaders } from "axios";

type AUTH_RESPONSE = {
  id: string;
};

async function getUserId(): Promise<Pick<AxiosHeaders, "X-User-Id">> {
  const { id } = (await withAuth()) as AUTH_RESPONSE;
  return { "X-User-Id": id };
}

async function getCsrf(): Promise<Pick<AxiosHeaders, "X-CSRF-Token">> {
  const csrfToken = await new CookieHandler().get("csrf_token");
  return { "X-CSRF-Token": csrfToken };
}

async function getInternalAuth(): Promise<
  Pick<AxiosHeaders, "X-Internal-Auth">
> {
  return { "X-Internal-Auth": process.env.PROXY_SECRET_KEY };
}

async function getRequired(): Promise<
  Pick<AxiosHeaders, "X-CSRF-Token" | "X-Internal-Auth" | "X-User-Id">
> {
  const cookieStore = new CookieHandler();
  const csrfToken = await cookieStore.get("csrf_token");
  const { id } = (await withAuth()) as AUTH_RESPONSE;

  return {
    "X-CSRF-Token": csrfToken,
    "X-Internal-Auth": process.env.PROXY_SECRET_KEY,
    "X-User-Id": id,
  };
}

const HeaderHandler = {
  getCsrf,
  getInternalAuth,
  getRequired,
  getUserId,
};

export default HeaderHandler;
