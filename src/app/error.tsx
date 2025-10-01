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
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-medium">Something went wrong!</h2>

      <div className="flex gap-4">
        <Link href="/signin">
          <Button>Go To Sign in Page </Button>
        </Link>

        <Button onClick={reset}>Retry</Button>
      </div>
    </div>
  );
};

export default Error;
