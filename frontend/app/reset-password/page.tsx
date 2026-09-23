"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or missing reset token. Please request a new override.");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) return;

    if (password !== passwordConfirmation) {
      setError("Security keys do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${getApiUrl()}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
          token, 
          email, 
          password, 
          password_confirmation: passwordConfirmation 
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to reset password");
      }
      setSuccess("Your new security key has been established. You may now authenticate.");
    } catch (err: any) {
      setError(err.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col border-r border-black p-8 md:p-12 lg:p-16">
      <div className="mb-8 font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500 border border-black w-fit px-3 py-1 bg-neutral-100">
        <span className="w-2 h-2 bg-black inline-block mr-2"></span>
        RECOVERY PROTOCOL
      </div>
      
      <h1 className="text-display-hero-mobile md:text-headline-lg font-bold text-black mb-2 font-heading tracking-tight uppercase leading-none">
        Establish Key
      </h1>
      <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider mb-10">
        Initialize a new security key for {email || 'your identity vector'}.
      </p>

      {error && <div className="text-black bg-red-100 border border-black p-3 text-xs font-bold font-mono uppercase mb-6">{error}</div>}
      {success && <div className="text-black bg-[#f59e0b] border border-black p-3 text-xs font-bold font-mono uppercase mb-6">{success}</div>}

      {!success && (!error || error === "Security keys do not match.") && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-black uppercase tracking-wider" htmlFor="password">New Security Key</label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required 
                minLength={6}
                className="h-12 rounded-none border border-black bg-white px-4 pr-12 text-xs font-mono font-medium text-black placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:border-[#f59e0b] transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-black uppercase tracking-wider" htmlFor="passwordConfirmation">Confirm Security Key</label>
            <div className="relative">
              <Input 
                id="passwordConfirmation" 
                type={showPasswordConfirmation ? "text" : "password"} 
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••" 
                required 
                minLength={6}
                className="h-12 rounded-none border border-black bg-white px-4 pr-12 text-xs font-mono font-medium text-black placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:border-[#f59e0b] transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors"
              >
                {showPasswordConfirmation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" disabled={loading} className="w-full rounded-none bg-black hover:bg-[#f59e0b] hover:text-black text-white border border-black h-12 font-mono font-bold uppercase tracking-widest text-[11px] transition-colors">
              {loading ? 'INITIALIZING...' : 'ESTABLISH SECURITY KEY'}
            </Button>
          </div>
        </form>
      )}

      {(success || error.includes("Invalid")) && (
        <div className="pt-4">
          <Link href="/login">
            <Button variant="outline" className="w-full rounded-none border-black hover:bg-neutral-100 text-black h-12 font-mono font-bold uppercase tracking-widest text-[11px] transition-colors">
              RETURN TO AUTHORIZATION
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-mono selection:bg-[#f59e0b] selection:text-black">
      {/* Navbar Minimal */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-black">
        <Link href="/" className="flex items-center">
          <img src="/final-logo-black.png" alt="Eclipse Logo" className="w-auto h-12 sm:h-[72px] object-contain" />
        </Link>
        <Link href="/login">
          <Button variant="outline" className="rounded-none border-black text-black font-bold hover:bg-neutral-100 uppercase tracking-wider text-[11px] h-10 px-6">
            RETURN TO LOGIN
          </Button>
        </Link>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-container-max mx-auto border-x border-black">
        
        <Suspense fallback={<div className="w-full lg:w-1/2 flex items-center justify-center border-r border-black font-mono font-bold text-xs uppercase">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>

        {/* Right Info Panel */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-8 md:p-12 lg:p-16 bg-neutral-50">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-black text-[10px] font-bold font-mono uppercase tracking-widest text-neutral-500">
              <span>SYSTEM LOG</span>
              <span className="text-black flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#f59e0b] animate-pulse"></span>ACTIVE</span>
            </div>
            
            <h2 className="font-heading text-headline-lg font-bold text-black uppercase tracking-tight leading-none mb-4">
              Identity <br/> <span className="underline decoration-4 underline-offset-4">Secured</span>
            </h2>
            
            <p className="font-mono text-sm text-neutral-600 leading-relaxed max-w-sm">
              Your security key must contain at least 6 characters. Do not share your access credentials with unauthorized cohorts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
