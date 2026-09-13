"use client";

import { useAuth } from "@/lib/firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, CalendarPlus, Users, Settings, LogOut, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdminMobileBottomNav } from "@/components/admin/AdminMobileBottomNav";
import { NotificationsMenu } from "@/components/dashboard/NotificationsMenu";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setCheckingRole(false);
      return;
    }

    if (!loading && !user) {
      router.push("/admin/login");
      return;
    }

    if (user) {
      const verifyAdmin = async () => {
        try {
          const token = await user.getIdToken();
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.role === "admin") {
              setIsAdmin(true);
            } else {
              router.push("/dashboard");
            }
          } else {
            router.push("/admin/login");
          }
        } catch (error) {
          router.push("/admin/login");
        } finally {
          setCheckingRole(false);
        }
      };
      verifyAdmin();
    }
  }, [user, loading, router, pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading || checkingRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans selection:bg-blue-100 selection:text-blue-900 pb-16 md:pb-0">
      
      {/* Admin Sidebar */}
      <aside className="hidden md:flex w-[260px] bg-[#0f172a] text-white flex-col fixed inset-y-0 left-0 shadow-2xl z-20">
        <div className="p-6">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold font-heading tracking-tight text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-[12px] text-white font-bold">WS</span>
              </div>
              <span className="glass-text-animation">Eclipse Tech Community</span>
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mt-2 ml-10">Admin Control</p>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-4">Menu</p>
          
          <Link href="/admin/events" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${pathname.includes('/admin/events') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <CalendarPlus className="w-5 h-5" />
            Manage Events
          </Link>
          <Link href="/admin/teams" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${pathname.includes('/admin/teams') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Users className="w-5 h-5" />
            All Teams
          </Link>
          <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${pathname.includes('/admin/users') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Users className="w-5 h-5" />
            All Users
          </Link>
          <Link href="/admin/notifications" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${pathname.includes('/admin/notifications') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Bell className="w-5 h-5" />
            Broadcasts
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={() => { logout(); router.push('/admin/login'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen w-full">
        
        {/* Top Header */}
        <header className="h-[72px] border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between">
          
          {/* Search */}
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search events, users..." 
              className="w-full pl-9 h-10 bg-gray-50/50 border-gray-200 rounded-full text-[13px] focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 ml-auto">
            <NotificationsMenu isAdmin={true} />
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <div className="relative">
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-9 h-9 bg-blue-100 hover:bg-blue-200 transition-colors rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                  <span className="text-blue-700 font-bold text-sm">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'AD'}
                  </span>
                </div>
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-[14px] font-bold text-gray-900 truncate">
                      {user?.displayName || "Admin User"}
                    </p>
                    <p className="text-[12px] font-medium text-gray-500 truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-[13px] font-medium text-gray-700 transition-colors w-full">
                      <Settings className="w-4 h-4 text-gray-400" />
                      Account Settings
                    </Link>
                    <button 
                      onClick={() => { logout(); router.push('/admin/login'); }}
                      className="flex items-center gap-2 px-3 py-2.5 hover:bg-red-50 rounded-xl text-[13px] font-medium text-red-600 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 w-full">
          {children}
        </main>
      </div>

      <AdminMobileBottomNav />
    </div>
  );
}
