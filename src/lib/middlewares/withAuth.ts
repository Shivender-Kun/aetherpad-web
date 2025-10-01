import { auth } from "@/auth";

export async function withAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized", { cause: 401 });
  return session.user;
}
