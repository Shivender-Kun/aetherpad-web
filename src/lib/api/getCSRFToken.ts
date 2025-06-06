const getCSRFToken = () => {
  const cookie = document.cookie.split("; ");
  const csrfToken = cookie.find((c) => c.startsWith("csrf_token="));

  if (csrfToken) {
    return csrfToken.split("=")[1];
  } else {
    console.error("CSRF token not found in cookies");
    return null;
  }
};

export default getCSRFToken;
