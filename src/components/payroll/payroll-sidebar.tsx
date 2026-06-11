"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PAYROLL_NAV } from "@/lib/payroll/constants";

export function PayrollSidebar() {
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
          <span className="text-sm font-semibold text-slate-900">
            Payroll Tracker
          </span>
          <span className="text-[10px] text-slate-400">Nominas Mayo 2026</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {PAYROLL_NAV.map((item) => {
          const isActive =
            item.href === "/payroll"
              ? pathname === "/payroll"
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
          href="/"
          className="text-xs text-[#59a5a9] hover:underline"
        >
          Volver a AFDA Hub
        </Link>
        <p className="mt-2 text-xs text-slate-400">
          Modulo restringido — solo administracion autorizada
        </p>
      </div>
    </aside>
  );
}
