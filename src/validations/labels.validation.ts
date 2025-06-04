import z from "zod";

const createLabelSchema = z.object({
  name: z.string().min(1).max(50),
  // color: z
  //   .string()
  //   .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color code")
  //   .optional()
  //   .default("#000000"), // Default to black if no color is provided
});

const updateLabelSchema = z.object({
  name: z.string().min(1).max(50),
  // color: z
  //   .string()
  //   .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color code")
  //   .optional(),
});

export { createLabelSchema, updateLabelSchema };
