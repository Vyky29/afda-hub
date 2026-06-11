"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200/80 bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200/80 px-5">
        <Image
          src="/afda-logo.png"
          alt="AFDA"
          width={80}
          height={28}
          className="h-7 w-auto"
          priority
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">Hub</span>
          <span className="text-[10px] text-slate-400">Gestion administrativa</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#59a5a9]/10 text-[#3d7a7d]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  isActive ? "text-[#59a5a9]" : "text-slate-400"
                )}
              />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/80 p-4">
        <Link
          href="/payroll"
          className="mb-3 flex items-center gap-2 rounded-xl border border-[#59a5a9]/20 bg-[#59a5a9]/5 px-3 py-2 text-xs font-medium text-[#3d7a7d] hover:bg-[#59a5a9]/10"
        >
          Payroll Tracker
        </Link>
        <p className="text-xs text-slate-400">
          AFDA - Asociacion para el apoyo al tratamiento de ansiedad y
          depresion en Aragon
        </p>
        <a
          href="https://asociacionafda.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs text-[#59a5a9] hover:underline"
        >
          asociacionafda.com
        </a>
      </div>
    </aside>
  );
}
