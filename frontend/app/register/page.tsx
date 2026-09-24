"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/firebase/auth";

function RegisterContent() {
  const { registerWithEmail, loginWithGoogle, loginWithGithub } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await registerWithEmail(email, password, name, "");
      router.push(redirectUrl);
    } catch (err: any) {
      if (err.message && err.message.includes("Registration successful")) {
        setSuccess(err.message);
      } else {
        setError(err.message || "Failed to register");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGithub = async () => {
    try {
      await loginWithGithub();
      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-mono selection:bg-[#f59e0b] selection:text-black">
      {/* Navbar Minimal */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-black">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Eclipse Logo" className="w-auto h-12 sm:h-[72px] object-contain" />
        </Link>
        <Link href="/login">
          <Button variant="outline" className="rounded-none border-black text-black font-bold hover:bg-neutral-100 uppercase tracking-wider text-[11px] h-10 px-6">
            SYSTEM ACCESS
          </Button>
        </Link>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-container-max mx-auto border-x border-black">
        
        {/* Left Form */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-black p-8 md:p-12 lg:p-16">
          <div className="mb-8 font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500 border border-black w-fit px-3 py-1 bg-neutral-100">
            <span className="w-2 h-2 bg-black inline-block mr-2"></span>
            DOSSIER CREATION
          </div>
          
          <h1 className="text-display-hero-mobile md:text-headline-lg font-bold text-black mb-2 font-heading tracking-tight uppercase leading-none">
            New Registration
          </h1>
          <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider mb-10">Establish your identity within the chapter.</p>

          {error && <div className="text-black bg-red-100 border border-black p-3 text-xs font-bold font-mono uppercase mb-6">{error}</div>}
          {success && <div className="text-black bg-[#f59e0b] border border-black p-3 text-xs font-bold font-mono uppercase mb-6">{success}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-black uppercase tracking-wider" htmlFor="name">Full Name</label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ALIAS" 
                  required 
                  className="h-12 rounded-none border border-black bg-white px-4 text-xs font-mono font-medium text-black placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:border-[#f59e0b] transition-all" 
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-black uppercase tracking-wider" htmlFor="email">Identity Vector (Email)</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="STUDENT@DIATM.EDU" 
                  required 
                  className="h-12 rounded-none border border-black bg-white px-4 text-xs font-mono font-medium text-black placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:border-[#f59e0b] transition-all" 
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-black uppercase tracking-wider" htmlFor="password">Security Key</label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
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

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" disabled={loading} className="w-full rounded-none bg-black hover:bg-[#f59e0b] hover:text-black text-white border border-black h-12 font-mono font-bold uppercase tracking-widest text-[11px] transition-colors">
                {loading ? 'INITIALIZING...' : 'ESTABLISH DOSSIER'}
              </Button>
            </div>
          </form>

          {/* Social Logins */}
          <div className="pt-10 mt-10 border-t border-black">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold text-black uppercase tracking-wider">EXTERNAL AUTH NETWORKS</span>
              <div className="flex-1 h-px bg-black"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleGoogle} variant="outline" type="button" className="h-12 rounded-none font-mono font-bold text-[11px] uppercase tracking-wider text-black bg-neutral-50 hover:bg-neutral-100 border border-black flex items-center justify-center gap-2 transition-colors">
                Google
              </Button>
              <Button onClick={handleGithub} variant="outline" type="button" className="h-12 rounded-none font-mono font-bold text-[11px] uppercase tracking-wider text-black bg-neutral-50 hover:bg-neutral-100 border border-black flex items-center justify-center gap-2 transition-colors">
                GitHub
              </Button>
            </div>
          </div>
        </div>

        {/* Right Info Panel */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-8 md:p-12 lg:p-16 bg-neutral-50">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-black text-[10px] font-bold font-mono uppercase tracking-widest text-neutral-500">
              <span>SYSTEM LOG</span>
              <span className="text-black flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#f59e0b] animate-pulse"></span>ACTIVE</span>
            </div>
            
            <h2 className="font-heading text-headline-lg font-bold text-black uppercase tracking-tight leading-none mb-4">
              Join the <br/> <span className="underline decoration-4 underline-offset-4">Vanguard</span>
            </h2>
            
            <p className="font-mono text-sm text-neutral-600 leading-relaxed max-w-sm">
              Creating a dossier gives you clearance to access campus hackathons, engineering resources, and cross-disciplinary collaborations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-black pt-8">
            <div className="p-4 border border-black bg-white">
              <span className="block text-[10px] font-bold text-neutral-500 font-mono uppercase tracking-wider mb-1">NODE</span>
              <span className="font-bold text-black font-mono text-sm uppercase tracking-wider">RAJBANDH-01</span>
            </div>
            <div className="p-4 border border-black bg-white">
              <span className="block text-[10px] font-bold text-neutral-500 font-mono uppercase tracking-wider mb-1">ENCRYPTION</span>
              <span className="font-bold text-black font-mono text-sm uppercase tracking-wider">SEC-L4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono text-black font-bold text-xs uppercase tracking-widest">INITIALIZING...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
