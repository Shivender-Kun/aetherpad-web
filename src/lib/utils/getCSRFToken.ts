import { NEXT_PUBLIC_ENV } from "@/constants/env";

const getCSRFToken = () => {
  const cookie = document.cookie.split("; ");
  const csrfToken = cookie.find((c) => c.startsWith("csrf_token="));

  if (!csrfToken) {
    const errorMessage = NEXT_PUBLIC_ENV.IS_DEV
      ? "CSRF token not found"
      : "Unauthorized";
    throw Error(errorMessage);
  }

  return csrfToken.split("=")[1];
};

export default getCSRFToken;
