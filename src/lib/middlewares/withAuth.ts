import { JWT_SECRET } from "@/constants/server";
import jwt from "jsonwebtoken";
import CookieHandler from "../utils/server/cookieHandler";

export async function withAuth() {
  const cookieStore = new CookieHandler();
  const token = await cookieStore.get("auth_token");
  if (!token) throw new Error("Unauthorized", { cause: 401 });

  const validatedAuth = jwt.verify(token, JWT_SECRET!);

  return validatedAuth;
}
