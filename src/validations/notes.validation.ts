import z from "zod";

const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(1000, "Title must be at most 1000 characters"),
  content: z.string().max(19999, "Content must be at most 19999 characters"),
  labels: z.array(z.string()).max(5).optional(),
});

const updateNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(1000, "Title must be at most 1000 characters"),
  content: z.string().max(19999, "Content must be at most 19999 characters"),
  labels: z.array(z.string()).max(5),
});

export { createNoteSchema, updateNoteSchema };
