import { ENV } from "@/constants/env";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

class CookieHandler {
  async set({
    name,
    value,
    httpOnly = false,
  }: Pick<ResponseCookie, "name" | "value" | "httpOnly">) {
    const cookieStore = await cookies();
    return cookieStore.set({
      name,
      value,
      httpOnly,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      secure: ENV.NODE_ENV === "production",
    });
  }

  async delete({
    name,
    httpOnly = false,
  }: Pick<ResponseCookie, "name" | "httpOnly">) {
    const cookieStore = await cookies();
    return cookieStore.set({
      name,
      httpOnly,
      value: "",
      path: "/",
      maxAge: 0,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
    });
  }

  async get(name: string) {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value ?? null;
  }

  async getAllString() {
    const cookieStore = await cookies();
    return cookieStore.toString();
  }
}

export default CookieHandler;
