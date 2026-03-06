"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center duration-300">
      <div className="flex flex-col items-center">
        <div className="mb-2 flex size-17 items-center justify-center rounded-full bg-neutral-700/10 ">
          <AlertCircle className="size-9" />
        </div>

        <h1 className="mb-2 text-3xl font-medium tracking-tight sm:text-4xl">
          {isDev ? "Runtime Exception" : "Something went sideways"}
        </h1>
      </div>

      <p className="mb-8 max-w-[500px] text-muted-foreground">
        {isDev
          ? error.message
          : "An unexpected error occurred. We've been notified and are looking into it."}
      </p>

      {isDev && error.stack && (
        <div className="mb-8 w-full max-w-full overflow-hidden rounded-xl border p-5 text-left">
          <p className="pb-2 mb-3 text-sm border-b font-medium capitalize tracking-wider text-muted-foreground">
            Stack Trace
          </p>
          <pre className="max-h-70 overflow-auto text-sm font-mono leading-relaxed">
            {error.stack}
          </pre>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="xl" onClick={() => reset()} className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
        <Button size="xl" variant="outline" asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {!isDev && error.digest && (
        <p className="mt-8 text-xs font-mono text-muted-foreground/60">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
