import { withApiHandler } from "@/lib/middlewares/withApiHandler";
import CookieHandler from "@/lib/utils/server/cookieHandler";
import { NextResponse } from "next/server";

export const POST = async () =>
  withApiHandler(async () => {
    const cookieStore = new CookieHandler();
    await cookieStore.delete({ name: "auth_token", httpOnly: true });
    await cookieStore.delete({ name: "csrf_token" });
    await cookieStore.delete({ name: "_csrf" });
    return NextResponse.json({ message: "Logged out succesfully" });
  });
