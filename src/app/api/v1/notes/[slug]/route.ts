import { API } from "@/constants/server";
import { withSecureApiHandler } from "@/lib/middlewares/withSecureApiHandler";
import { notesSchema, TUpdateNoteSchemaInput } from "@/lib/schemas";
import { NOTE_ACTION } from "@/lib/types/enums";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**  Get notes by slug as noteType - active, archived, deleted */
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) =>
  withSecureApiHandler(async (headers) => {
    const { slug } = await params;
    const { searchParams } = req.nextUrl;
    const path = `${API.NOTES.GET(slug)}?${searchParams.toString()}`;
    const response = await axios.get(path, { headers: headers });
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);

/**  Update note by slug as noteId */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) =>
  withSecureApiHandler<TUpdateNoteSchemaInput>(
    async (headers, payload) => {
      const { slug } = await params;
      const response = await axios.patch(
        API.NOTES[NOTE_ACTION.UPDATE](slug),
        payload,
        { headers },
      );
      const { data, status } = response;
      return NextResponse.json(data, { status });
    },
    req,
    notesSchema.updateInput,
  );

// Delete note permanently by slug as noteId
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) =>
  withSecureApiHandler(async (headers) => {
    const { slug } = await params;
    const response = await axios.delete(API.NOTES.DELETE(slug), {
      headers,
    });
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);
