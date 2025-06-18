import z from "zod";

const isSSR = typeof window === "undefined";

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
    profilePicture: z.any().refine(
      (file) => {
        if (isSSR) return true; // skip SSR check
        return file && file.length > 0;
      },
      { message: "Please select a profile picture" }
    ),
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
  email: z.string(),
  username: z
    .string()
    .min(1, "Username is required")
    .max(32, "Username can be 32 characters"),
  profilePicture: z.union([z.instanceof(File), z.string().url()]),
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
