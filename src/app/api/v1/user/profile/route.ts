import { API } from "@/constants/server";
import { withSecureApiHandler } from "@/lib/middlewares/withSecureApiHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) =>
  withSecureApiHandler(async (headers) => {
    const response = await axios.get(API.USER.PROFILE, {
      headers,
    });
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);

export const PATCH = async (req: NextRequest) =>
  withSecureApiHandler(async (headers) => {
    const payload = await req.formData();
    const response = await axios.patch(API.USER.PROFILE, payload, { headers });
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);
