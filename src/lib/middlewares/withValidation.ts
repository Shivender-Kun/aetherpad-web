import { ZodSchema } from "zod";

export const withValidation = async <T>(
  schema: ZodSchema<T>,
  getData: () => Promise<unknown>,
): Promise<T> => {
  const data = await getData();
  const result = schema.safeParse(data);
  if (!result.success) throw result.error;
  return result.data;
};
