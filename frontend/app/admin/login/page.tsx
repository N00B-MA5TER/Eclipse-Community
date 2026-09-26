"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ShieldAlert, LogIn } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";

function AdminLoginForm() {
  const { loginWithEmail, user } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const errParam = searchParams.get("error");
    if (errParam === "unauthorized_admin") {
      setError("Access Denied: The Google account is not an authorized administrator.");
    } else if (errParam === "unverified_google_email") {
      setError("Access Denied: The Google account's email is not verified.");
    }
  }, [searchParams]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const data = await loginWithEmail(email, password);
      
      const role = data?.user?.role || data?.role || "";
      if (role.toString().trim().toLowerCase() === "admin") {
        router.push("/admin/events");
      } else {
        setError("Access Denied: You do not have administrator privileges.");
        // Logout non-admin user
        const token = localStorage.getItem("auth_token");
        if (token) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api'}/auth/logout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });
          localStorage.removeItem("auth_token");
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4 font-mono selection:bg-[#f59e0b] selection:text-black broadsheet-grid">
      <div className="w-full max-w-md bg-white border border-black p-8 md:p-10 relative">
        
        {/* Top corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-b border-r border-black"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-b border-l border-black"></div>
        
        <div className="mb-10">
          <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 border border-black w-fit px-2 py-1 bg-neutral-100 flex items-center gap-2">
            <ShieldAlert className="w-3 h-3 text-black" />
            ADMIN PORTAL
          </div>
          <h1 className="text-3xl font-black font-heading text-black uppercase tracking-tight leading-none">Admin Login</h1>
          <p className="text-neutral-600 mt-2 text-xs uppercase tracking-wider">Sign in to access the dashboard.</p>
        </div>

        <div className="bg-neutral-100 text-black p-3 text-[11px] font-bold mb-6 border border-black uppercase tracking-wider">
          Authentication is securely routed through Laravel Sanctum.
        </div>

        {error && (
          <div className="bg-red-100 text-black p-3 text-[11px] font-bold mb-6 border border-black uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-black uppercase tracking-wider" htmlFor="email">Email Address</label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="admin@eclipse.community"
              className="h-12 rounded-none border border-black bg-white px-4 text-xs font-mono font-medium text-black placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:border-[#f59e0b] transition-all" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-black uppercase tracking-wider" htmlFor="password">Password</label>
              <Link href="/forgot-password" className="text-[10px] font-bold text-neutral-500 hover:text-black uppercase underline">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="••••••••"
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

          <Button type="submit" disabled={loading} className="w-full h-12 rounded-none bg-black hover:bg-[#f59e0b] hover:text-black text-white font-bold font-mono text-[11px] uppercase tracking-widest border border-black transition-colors mt-2">
            {loading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-neutral-300"></div>
          <span className="mx-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">OR</span>
          <div className="flex-1 border-t border-neutral-300"></div>
        </div>

        <Button 
          type="button"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/google/redirect?intended=admin`;
          }}
          disabled={loading}
          variant="outline"
          className="w-full h-12 rounded-none bg-white hover:bg-neutral-100 text-black font-bold font-mono text-[11px] uppercase tracking-widest border border-black transition-colors flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Continue with Google
        </Button>

        <div className="mt-8 text-center text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 hover:text-black transition-colors">
          <Link href="/login">Abort & Return</Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-black"></div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
