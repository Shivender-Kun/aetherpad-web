import { MAX_PICTURE_SIZE } from "@/constants/dataLimits";
import z from "zod";

const emailSchema = z.string().email("Invalid email address");

const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .max(32, "Username can be 32 characters");

const pictureSchema = (type: string) =>
  z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_PICTURE_SIZE, {
      message: `${type} picture must be under 2MB`,
    }),
    z.string().url(),
  ]);

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(30, "Password must be at most 50 characters")
  .regex(
    /^[a-zA-Z0-9]{6,30}$/,
    "Username must contain only letters and numbers",
  );

const registerUserFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    profilePicture: pictureSchema("Profile"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const registerUserSchema = registerUserFormSchema.transform(
  ({ email, password, profilePicture }) => ({
    email,
    password,
    profilePicture,
  }),
);

const updateUserFormSchema = z.object({
  username: usernameSchema,
  profilePicture: pictureSchema("Profile"),
  coverPicture: pictureSchema("Cover"),
});

const updateUserSchema = updateUserFormSchema.transform(
  ({ username, profilePicture, coverPicture }) => ({
    username,
    ...(profilePicture instanceof File ? { profilePicture } : {}),
    ...(coverPicture instanceof File ? { coverPicture } : {}),
  }),
);

const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

const changePasswordFormSchema = z
  .object({
    oldPassword: z.string(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const changePasswordSchema = changePasswordFormSchema.transform(
  ({ oldPassword, password }) => ({ oldPassword, password }),
);

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

const resetPasswordBaseSchema = z.object({
  token: z.string(),
  confirmPassword: z.string(),
  newPassword: passwordSchema,
});

const resetPasswordFormSchema = resetPasswordBaseSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

const resetPasswordSchema = resetPasswordFormSchema.transform(
  ({ token, newPassword }) => ({ token, newPassword }),
);

const resetPasswordApiSchema = resetPasswordBaseSchema.pick({
  token: true,
  newPassword: true,
});

export type TRegisterUserFormSchema = z.infer<typeof registerUserFormSchema>;
export type TRegisterUserSchema = z.infer<typeof registerUserSchema>;
export type TUpdateUserFormSchema = z.infer<typeof updateUserFormSchema>;
export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
export type TUserLoginSchema = z.infer<typeof userLoginSchema>;
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TResetPasswordApiSchema = z.infer<typeof resetPasswordApiSchema>;

export default {
  login: userLoginSchema,
  register: registerUserSchema,
  registerTransformed: registerUserSchema,
  update: updateUserFormSchema,
  updateParsed: updateUserSchema,
  resetPassword: resetPasswordSchema,
  resetPasswordApi: resetPasswordApiSchema,
  resetPasswordTransformed: resetPasswordSchema,
  changePassword: changePasswordFormSchema,
  forgotPassword: forgotPasswordSchema,
};
