import z from "zod";

const registerUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password must be at most 50 characters long"),
    confirmPassword: z.string(),
    profilePicture: z
      .any()
      .refine((file) => file.length > 0, "Please select a profile picture"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

const updateUserSchema = z.object({
  profilePicture: z.string(),
  coverPicture: z.string(),
  username: z.string(),
});

const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export {
  registerUserSchema,
  loginSchema,
  updateUserSchema,
  changePasswordSchema,
  forgotPasswordSchema,
};
