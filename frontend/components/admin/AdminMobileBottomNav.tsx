"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarPlus, Settings } from "lucide-react";

export function AdminMobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/admin/events", icon: CalendarPlus },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a] border-t border-slate-800 pb-safe">
      <nav className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-16 transition-colors ${
                isActive ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? "bg-blue-600/20" : "bg-transparent"}`}>
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? "text-blue-400" : "text-slate-500"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
