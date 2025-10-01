import { API } from "@/constants/server";
import { withApiHandler } from "@/lib/middlewares/withApiHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) =>
  withApiHandler(async (headers) => {
    const payload = await req.formData();
    const response = await axios.post(API.USER.SIGNUP, payload, { headers });
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);
