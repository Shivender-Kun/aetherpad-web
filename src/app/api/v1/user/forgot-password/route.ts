import { API } from "@/constants/server";
import { withApiHandler } from "@/lib/middlewares/withApiHandler";
import { TForgotPasswordSchema, userSchema } from "@/lib/schemas";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) =>
  withApiHandler<TForgotPasswordSchema>(
    async (headers, payload) => {
      const response = await axios.post(API.USER.FORGOT_PASSWORD, payload, {
        headers,
      });
      const { data, status } = response;
      return NextResponse.json(data, { status });
    },
    req,
    userSchema.forgotPassword,
  );
