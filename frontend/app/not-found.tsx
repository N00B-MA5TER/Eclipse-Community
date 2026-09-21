"use client";

import Link from 'next/link';
import { ErrorState } from '@/components/ui/ErrorState';
import { API_ERRORS } from '@/lib/api-errors';

export default function NotFound() {
  return (
    <ErrorState
      statusCode={404}
      title={API_ERRORS[404].title}
      message={API_ERRORS[404].message}
      primaryAction={{
        label: "Go Home",
        href: "/",
      }}
      secondaryAction={{
        label: "Go Back",
        onClick: () => {
          if (typeof window !== 'undefined') {
            window.history.back();
          }
        },
      }}
    />
  );
}
