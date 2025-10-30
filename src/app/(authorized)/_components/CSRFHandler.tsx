"use client";

import { getCsrf } from "@/lib/api/csrf";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useDebounceCallback from "../_hooks/useDebounce";

const CSRFHandler = () => {
  const session = useSession();

  const REFRESH_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

  const fetchCsrfToken = useDebounceCallback(
    async () => await getCsrf(),
    REFRESH_INTERVAL,
  );

  useEffect(() => {
    if (session.status === "authenticated") fetchCsrfToken();
  }, [session.data]);

  return null;
};

export default CSRFHandler;
