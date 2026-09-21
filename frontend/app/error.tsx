"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/ErrorState";
import { API_ERRORS } from "@/lib/api-errors";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service safely
    console.error("Application error:", error);
  }, [error]);

  return (
    <ErrorState
      statusCode={500}
      title={API_ERRORS[500].title}
      message={API_ERRORS[500].message}
      primaryAction={{
        label: "Try Again",
        onClick: () => reset(),
      }}
      secondaryAction={{
        label: "Go Home",
        href: "/",
      }}
    />
  );
}
