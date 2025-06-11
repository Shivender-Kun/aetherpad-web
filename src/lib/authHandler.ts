import { cookies } from "next/headers";
import { DEBUG } from "@/constants";

export async function authHandler() {
  const cookieStore = await cookies();
  const auth_token = cookieStore.get("auth_token")?.value;

  if (!auth_token) {
    const errorMessage =
      DEBUG === "true" ? "Authentication token not found" : "Unauthorized";
    throw Error(errorMessage);
  }

  return auth_token;
}
