import { cookies } from "next/headers";

export async function authHandler() {
  const cookieStore = await cookies();
  const auth_token = cookieStore.get("auth_token")?.value;

  if (!auth_token) throw Error("Unauthorized");
  return auth_token;
}
