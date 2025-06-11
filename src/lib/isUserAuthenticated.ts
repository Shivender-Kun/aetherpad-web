import { cookies } from "next/headers";

const isUserAuthenticated = async () => {
  const cookieStore = await cookies();
  const auth_token = cookieStore.get("auth_token")?.value;
  return auth_token;
};

export default isUserAuthenticated;
