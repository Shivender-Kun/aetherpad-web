import {
  MAX_CONTENT_LENGTH,
  MAX_LABELS_PER_NOTE,
  MAX_TITLE_LENGTH,
} from "@/constants/dataLimits";
import z from "zod";

const noteInputSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(
      MAX_TITLE_LENGTH,
      `Title must be at most ${MAX_TITLE_LENGTH} characters`,
    ),
  content: z
    .string()
    .max(
      MAX_CONTENT_LENGTH,
      `Content must be at most ${MAX_CONTENT_LENGTH} characters`,
    ),
  labels: z
    .array(z.string())
    .max(
      MAX_LABELS_PER_NOTE,
      `You can assign up to ${MAX_LABELS_PER_NOTE} labels per note`,
    ),
  bgColor: z.string(),
});

const createNoteSchema = noteInputSchema;
const updateNoteSchema = noteInputSchema;

export type TCreateNoteSchema = z.infer<typeof createNoteSchema>;
export type TUpdateNoteSchema = z.infer<typeof updateNoteSchema>;

export default {
  create: createNoteSchema,
  update: updateNoteSchema,
};
