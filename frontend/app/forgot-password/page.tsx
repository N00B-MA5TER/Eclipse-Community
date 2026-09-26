"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${getApiUrl()}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to send reset link");
      }
      setSuccess("We have emailed your password reset link. Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0c111d] flex flex-col font-mono selection:bg-[#f59e0b] selection:text-[#0c111d]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 py-12 lg:py-20 w-full max-w-2xl mx-auto">
        <div className="w-full bg-[#ffffff] border-2 border-[#0c111d] shadow-[8px_8px_0px_0px_#0c111d] p-8 md:p-12 relative overflow-hidden">
          
          <div className="mb-8 flex items-center gap-2 border-b border-[#0c111d] pb-2 font-mono-code text-[11px]">
            <span className="w-2 h-2 bg-[#0c111d]"></span>
            <span className="font-bold tracking-wider text-[#0c111d] uppercase">ACCOUNT RECOVERY</span>
          </div>
          
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#0c111d] mb-2 tracking-tight uppercase leading-none">
            Reset Password
          </h1>
          <p className="text-[#434656] font-mono-code text-xs uppercase tracking-wider mb-10 border-l-4 border-[#0c111d] pl-4 py-1">Request a password reset link to regain access.</p>

          {error && <div className="text-[#0c111d] bg-red-100 border border-[#0c111d] p-3 text-xs font-bold font-mono-code uppercase mb-6">{error}</div>}
          {success && <div className="text-[#0c111d] bg-[#f59e0b] border border-[#0c111d] p-3 text-xs font-bold font-mono-code uppercase mb-6">{success}</div>}

          {!success && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#0c111d] uppercase tracking-wider font-mono-code" htmlFor="email">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="STUDENT@DIATM.EDU" 
                  required 
                  className="h-12 rounded-none border border-[#0c111d] bg-[#f5f4ef] px-4 text-xs font-mono-code font-bold text-[#0c111d] placeholder:text-[#737688] focus-visible:ring-0 focus-visible:border-[#f59e0b] focus-visible:bg-[#ffffff] focus-visible:shadow-[3px_3px_0px_0px_#0c111d] transition-all" 
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button type="submit" disabled={loading} className="w-full sm:flex-1 rounded-none bg-[#0c111d] hover:bg-[#f59e0b] hover:text-[#0c111d] hover:shadow-[3px_3px_0px_0px_#0c111d] text-[#fcfbf9] border border-[#0c111d] h-12 font-mono-code font-bold uppercase tracking-widest text-[11px] transition-all">
                  {loading ? 'SENDING LINK...' : 'SEND RESET LINK'}
                </Button>
                <Link href="/login" className="w-full sm:w-auto h-12 px-6 flex items-center justify-center rounded-none bg-[#ffffff] hover:bg-[#f5f4ef] hover:shadow-[3px_3px_0px_0px_#0c111d] text-[#0c111d] border border-[#0c111d] font-mono-code font-bold uppercase tracking-widest text-[11px] transition-all">
                  RETURN TO LOGIN
                </Link>
              </div>
            </form>
          )}

          {success && (
            <div className="pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full rounded-none bg-[#ffffff] hover:bg-[#f5f4ef] hover:shadow-[3px_3px_0px_0px_#0c111d] text-[#0c111d] border border-[#0c111d] h-12 font-mono-code font-bold uppercase tracking-widest text-[11px] transition-all">
                  RETURN TO LOGIN
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
