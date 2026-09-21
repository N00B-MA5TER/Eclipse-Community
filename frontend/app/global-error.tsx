"use client";

import "./globals.css";
import { useEffect } from "react";
import { ErrorState } from "@/components/ui/ErrorState";
import { API_ERRORS } from "@/lib/api-errors";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ErrorState
          statusCode={500}
          title="Critical Error"
          message={API_ERRORS[500].message}
          primaryAction={{
            label: "Try Again",
            onClick: () => reset(),
          }}
          secondaryAction={{
            label: "Go Home",
            onClick: () => {
              window.location.href = "/";
            },
          }}
        />
      </body>
    </html>
  );
}
