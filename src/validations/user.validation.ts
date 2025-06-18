import z from "zod";

const isSSR = typeof window === "undefined";

// WRAP THIS IN A FUNCTION
const getRegisterUserSchema = () =>
  z
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
          if (isSSR) return true;
          return file && file.length > 0;
        },
        { message: "Please select a profile picture" }
      ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

// WRAP THIS TOO
const getUpdateUserSchema = () =>
  z.object({
    email: z.string(),
    username: z
      .string()
      .min(1, "Username is required")
      .max(32, "Username can be 32 characters"),
    profilePicture: z.union([
      typeof File === "undefined" ? z.any() : z.instanceof(File),
      z.string().url(),
    ]),
  });

// ✅ These are SSR-safe
const loginSchema = z.object({
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
  getRegisterUserSchema,
  getUpdateUserSchema,
  resetPasswordSchema,
  changePasswordSchema,
  forgotPasswordSchema,
};
