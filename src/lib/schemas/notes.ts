import {
  MAX_CONTENT_LENGTH,
  MAX_LABELS_PER_NOTE,
  MAX_TITLE_LENGTH,
} from "@/constants/dataLimits";
import z from "zod";

const createNoteSchemaInput = z.object({
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

const updateNoteSchemaInput = z.object({
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
  labels: z.array(z.string()).max(5),
  bgColor: z.string(),
});

export type TCreateNoteSchemaInput = z.infer<typeof createNoteSchemaInput>;
export type TUpdateNoteSchemaInput = z.infer<typeof updateNoteSchemaInput>;

export default {
  createInput: createNoteSchemaInput,
  updateInput: updateNoteSchemaInput,
};
