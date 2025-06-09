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
        "Username must contain only letters and numbers"
      ),
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
  password: z.string(),
  email: z.string().email(),
});

const updateUserSchema = z.object({
  username: z.string(),
  coverPicture: z.string(),
  profilePicture: z.string(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 50 characters")
    .regex(
      /^[a-zA-Z0-9]{6,30}$/,
      "Username must contain only letters and numbers"
    ),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z
  .object({
    token: z.string(),
    confirmPassword: z.string(),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be at most 50 characters")
      .regex(
        /^[a-zA-Z0-9]{6,30}$/,
        "Username must contain only letters and numbers"
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export {
  loginSchema,
  updateUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  changePasswordSchema,
  forgotPasswordSchema,
};
