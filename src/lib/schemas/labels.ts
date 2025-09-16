import { MAX_LABEL_NAME_LENGTH } from "@/constants/dataLimits";
import z from "zod";

const labelSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(
      MAX_LABEL_NAME_LENGTH,
      `Label name must be at most ${MAX_LABEL_NAME_LENGTH} characters long.`,
    ),
});

const createLabelSchema = labelSchema;
const updateLabelSchema = labelSchema;

export type TCreateLabelSchema = z.infer<typeof createLabelSchema>;
export type TUpdateLabelSchema = z.infer<typeof updateLabelSchema>;

export default { create: createLabelSchema, update: updateLabelSchema };
