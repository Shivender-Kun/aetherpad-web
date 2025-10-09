"use client";

import { getCsrf } from "@/lib/api/csrf";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

const CSRFHandler = () => {
  const session = useSession();

  const fetchCsrfToken = useCallback(async () => {
    try {
      await getCsrf();
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  }, []);

  useEffect(() => {
    if (session.status === "authenticated") fetchCsrfToken(); // Fetch CSRF token logic here
  }, [session.data]);

  return null;
};

export default CSRFHandler;
