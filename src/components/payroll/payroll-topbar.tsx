"use client";

import { Bell, Lock, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PayrollTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Buscar trabajadores, nominas..."
          className="h-10 rounded-xl border-slate-200 bg-slate-50/80 pl-10 text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500 sm:flex">
          <Lock className="h-3 w-3" />
          Acceso administrativo
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-xl"
        >
          <Bell className="h-4 w-4 text-slate-500" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-400" />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#59a5a9]/10 text-xs text-[#3d7a7d]">
              RP
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-900">Raquel Prieto</p>
            <p className="text-xs text-slate-400">Administracion</p>
          </div>
        </div>
      </div>
    </header>
  );
}
