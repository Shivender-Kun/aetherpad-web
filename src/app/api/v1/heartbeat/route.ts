import { withApiHandler } from "@/lib/middlewares/withApiHandler";
import { NextResponse } from "next/server";

export const POST = async () =>
  withApiHandler(async () => {
    return NextResponse.json({
      success: true,
      message: "Success",
      timestamp: Date.now(),
    });
  });
