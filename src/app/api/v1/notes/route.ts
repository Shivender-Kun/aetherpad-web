import { API } from "@/constants/server";
import { withSecureApiHandler } from "@/lib/middlewares/withSecureApiHandler";
import { notesSchema, TCreateNoteSchemaInput } from "@/lib/schemas";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) =>
  withSecureApiHandler(async (headers) => {
    const { searchParams } = req.nextUrl;
    const path = `${API.NOTES.GET_LIST}?${searchParams.toString()}`;
    const response = await axios.get(path, { headers: headers });
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);

export const POST = async (req: NextRequest) =>
  withSecureApiHandler<TCreateNoteSchemaInput>(
    async (headers, payload) => {
      const response = await axios.post(API.NOTES.ADD, payload, { headers });
      const { data, status } = response;
      return NextResponse.json(data, { status });
    },
    req,
    notesSchema.createInput,
  );
