"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Error = ({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => route.replace("/login"), 1000);
  }, [route]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <h2 className="font-medium text-3xl">Something went wrong!</h2>
      <p className="text-xl">Redirecting to login page...</p>
    </div>
  );
};

export default Error;
