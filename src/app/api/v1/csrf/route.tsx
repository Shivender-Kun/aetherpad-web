import { API } from "@/constants/server";
import withApiHandler from "@/lib/middlewares/withApiHandler";
import CookieHandler from "@/lib/utils/server/cookieHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) =>
  withApiHandler(async (headers) => {
    const response = await axios.get(API.CSRF, { headers });
    const {
      data: {
        data: { csrfToken },
      },
      status,
      headers: { "set-cookie": secretCookies },
    } = response;

    let _csrf = "";
    if (secretCookies) {
      const csrfMatch = secretCookies[0].match(/_csrf=([^;]+)/);
      _csrf = csrfMatch?.[1] || "";
    }

    const cookieStore = new CookieHandler();
    await cookieStore.set({ name: "csrf_token", value: csrfToken });
    await cookieStore.set({ name: "_csrf", value: _csrf });

    return NextResponse.json(
      { message: "CSRF token fetched successfully" },
      { status },
    );
  }, req);
