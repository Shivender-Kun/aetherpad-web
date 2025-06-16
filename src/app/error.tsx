"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = ({
  reset,
}: {
  reset: () => void;
  error: Error & { digest?: string };
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <h2 className="font-medium text-3xl">Something went wrong!</h2>

      <div className="flex gap-4">
        <Link href="/login">
          <Button>Go To Login Page </Button>
        </Link>

        <Button onClick={reset}>Retry</Button>
      </div>
    </div>
  );
};

export default Error;
