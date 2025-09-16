export const NEXT_PUBLIC_ENV = {
  IS_DEV: process.env.NODE_ENV === "development",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000/",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0",
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION ?? "v1",
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
};

export const ENV = {
  SERVER_URL: process.env.SERVER_URL ?? "http://localhost:3001/",
  PROXY_URL: process.env.PROXY_URL ?? "http://localhost:3000/",
  API_VERSION: process.env.API_VERSION ?? "v1",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  IS_DEV: process.env.NODE_ENV === "development",
  IS_PROD: process.env.NODE_ENV === "production",
};
