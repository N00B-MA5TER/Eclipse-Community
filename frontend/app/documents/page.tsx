"use client";

import { useAuth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900 flex">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 max-w-[1200px] w-full mx-auto flex items-center justify-center">
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-black rounded-none flex items-center justify-center mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-heading uppercase tracking-tight font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider font-medium">This feature is coming soon!</p>
          </div>
        </main>
      </div>
    </div>
  );
}
