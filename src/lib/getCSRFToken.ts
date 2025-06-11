import { DEBUG } from "@/constants";

const getCSRFToken = () => {
  const cookie = document.cookie.split("; ");
  const csrfToken = cookie.find((c) => c.startsWith("csrf_token="));

  if (!csrfToken) {
    const errorMessage =
      DEBUG === "true" ? "CSRF token not found" : "Unauthorized";
    throw Error(errorMessage);
  }

  return csrfToken.split("=")[1];
};

export default getCSRFToken;
