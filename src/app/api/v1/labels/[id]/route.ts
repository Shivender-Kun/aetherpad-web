import { API } from "@/constants/server";
import { withSecureApiHandler } from "@/lib/middlewares/withSecureApiHandler";
import { labelsSchema, TUpdateLabelSchema } from "@/lib/schemas";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) =>
  withSecureApiHandler<TUpdateLabelSchema>(
    async (headers, payload) => {
      const { id } = await params;
      const response = await axios.patch(API.LABELS.UPDATE(id), payload, {
        headers,
      });
      const { data, status } = response;
      return NextResponse.json(data, { status });
    },
    req,
    labelsSchema.update,
  );

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) =>
  withSecureApiHandler(async (headers) => {
    const { id } = await params;
    const response = await axios.delete(API.LABELS.DELETE(id), {
      headers,
    });
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);
