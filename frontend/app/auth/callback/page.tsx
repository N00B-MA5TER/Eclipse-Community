"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth";

function OAuthCallbackContent() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth(); // Just to get the context methods or wait until user loads

  const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

  useEffect(() => {
    const code = searchParams.get("code");
    const err = searchParams.get("error");

    if (err) {
      if (err === 'no_email') setError("No email provided by the authentication service.");
      else if (err === 'email_not_verified') setError("Your email address is not verified.");
      else setError("Authentication failed.");
      return;
    }

    if (!code) {
      setError("No authentication code provided.");
      return;
    }

    const exchangeCode = async () => {
      try {
        const res = await fetch(`${getApiUrl()}/auth/oauth/exchange`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          // Save the sanctum token
          localStorage.setItem("auth_token", data.token);
          
          if (data.intended === 'admin') {
            window.location.href = "/admin/events";
          } else {
            window.location.href = "/dashboard";
          }
        } else {
          setError(data.message || "Failed to exchange authentication code.");
        }
      } catch (e) {
        console.error("Exchange error", e);
        setError("Network error during authentication.");
      }
    };

    exchangeCode();
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mb-8 text-neutral-600">{error}</p>
        <button
          onClick={() => router.push("/login")}
          className="rounded-none border border-black bg-black px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-neutral-800"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-black"></div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
        Authenticating...
      </p>
    </div>
  );
}

export default function OAuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-black"></div>
      </div>
    }>
      <OAuthCallbackContent />
    </Suspense>
  );
}
