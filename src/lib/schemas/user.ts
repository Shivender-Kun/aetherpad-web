import { MAX_PICTURE_SIZE } from "@/constants/dataLimits";
import z from "zod";

const registerUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be at most 50 characters")
      .regex(
        /^[a-zA-Z0-9]{6,30}$/,
        "Username must contain only letters and numbers",
      ),
    confirmPassword: z.string(),
    profilePicture: z.union([
      z.instanceof(File).refine((file) => file.size <= MAX_PICTURE_SIZE, {
        message: "Profile picture must be under 2MB",
      }),
      z.string().url(),
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const registerUserSchemaTransformed = registerUserSchema.transform(
  ({ email, password, profilePicture }) => ({
    email,
    password,
    profilePicture,
  }),
);

const updateUserSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(32, "Username can be 32 characters"),
  profilePicture: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_PICTURE_SIZE, {
      message: "Profile picture must be under 2MB",
    }),
    z.string().url(),
  ]),
  coverPicture: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_PICTURE_SIZE, {
      message: "Cover picture must be under 2MB",
    }),
    z.string().url(),
  ]),
});

const UpdateUserSchemaParsed = updateUserSchema.transform(
  ({ username, profilePicture, coverPicture }) => ({
    username,
    ...(profilePicture instanceof File ? { profilePicture } : {}),
    ...(coverPicture instanceof File ? { coverPicture } : {}),
  }),
);

const userLoginSchema = z.object({
  password: z.string(),
  email: z.string().email(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 50 characters")
    .regex(
      /^[a-zA-Z0-9]{6,30}$/,
      "Username must contain only letters and numbers",
    ),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordBaseSchema = z.object({
  token: z.string(),
  confirmPassword: z.string(),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 50 characters")
    .regex(
      /^[a-zA-Z0-9]{6,30}$/,
      "Username must contain only letters and numbers",
    ),
});

const resetPasswordSchema = resetPasswordBaseSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

const resetPasswordSchemaTransformed = resetPasswordBaseSchema.transform(
  ({ token, newPassword }) => ({ token, newPassword }),
);

const resetPasswordApiSchema = resetPasswordBaseSchema.pick({
  token: true,
  newPassword: true,
});

export type TRegisterUserSchema = z.infer<typeof registerUserSchema>;
export type TRegisterUserSchemaTransformed = z.infer<
  typeof registerUserSchemaTransformed
>;
export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
export type TUpdateUserSchemaParsed = z.infer<typeof UpdateUserSchemaParsed>;
export type TUserLoginSchema = z.infer<typeof userLoginSchema>;
export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TResetPasswordSchemaTransformed = z.infer<
  typeof resetPasswordSchemaTransformed
>;
export type TResetPasswordApiSchema = z.infer<typeof resetPasswordApiSchema>;

export default {
  login: userLoginSchema,
  register: registerUserSchema,
  registerTransformed: registerUserSchemaTransformed,
  update: updateUserSchema,
  updateParsed: UpdateUserSchemaParsed,
  resetPassword: resetPasswordSchema,
  resetPasswordApi: resetPasswordApiSchema,
  resetPasswordTransformed: resetPasswordSchemaTransformed,
  changePassword: changePasswordSchema,
  forgotPassword: forgotPasswordSchema,
};
