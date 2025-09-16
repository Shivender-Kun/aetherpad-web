import { API } from "@/constants/server";
import { withSecureApiHandler } from "@/lib/middlewares/withSecureApiHandler";
import { NOTE_ACTION } from "@/lib/types/enums";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type ACTIONS = Exclude<NOTE_ACTION, "DELETE" | "UPDATE" | "ADD">;

const actions = [
  "background",
  "trash",
  "archive",
  "unarchive",
  "pin",
  "unpin",
  "restore",
];

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; action: string }> },
) =>
  withSecureApiHandler(async (headers) => {
    const { slug: id, action } = await params;
    if (!actions.includes(action)) {
      return NextResponse.json(
        { message: "Action not recoganized", success: false },
        { status: 400 },
      );
    }

    const Action = action.toUpperCase() as ACTIONS;

    let payload: Record<string, string> = {};

    if (Action === NOTE_ACTION.BACKGROUND) payload = await req.json();

    const response = await axios.patch(
      API.NOTES[NOTE_ACTION[Action]](id),
      payload,
      { headers },
    );
    const { data, status } = response;
    return NextResponse.json(data, { status });
  }, req);
