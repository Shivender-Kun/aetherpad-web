import { API } from "@/constants/server";
import { withApiHandler } from "@/lib/middlewares/withApiHandler";
import { TUserLoginSchema, userSchema } from "@/lib/schemas";
import CookieHandler from "@/lib/utils/server/cookieHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) =>
  withApiHandler<TUserLoginSchema>(
    async (headers, payload) => {
      const cookieStore = new CookieHandler();
      const response = await axios.post(API.USER.SIGNIN, payload, { headers });

      const {
        data: {
          data: { authToken, csrfToken },
          message,
        },
        status,
        headers: { "set-cookie": secretCookies },
      } = response;

      let _csrf = "";
      if (secretCookies) {
        const csrfMatch = secretCookies[0].match(/_csrf=([^;]+)/);
        _csrf = csrfMatch?.[1] || "";
      }

      await cookieStore.set({
        name: "auth_token",
        value: authToken,
        httpOnly: true,
      });
      await cookieStore.set({ name: "csrf_token", value: csrfToken });
      await cookieStore.set({ name: "_csrf", value: _csrf });

      return NextResponse.json({ message }, { status });
    },
    req,
    userSchema.login,
  );
