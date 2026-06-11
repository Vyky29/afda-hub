"use client";

import { useState } from "react";
import { Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { weekAgenda } from "@/lib/mock-data/agenda";
import { WEEK_DAYS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { AgendaItem } from "@/lib/types";

const typeLabels = {
  terapia: "Terapia",
  grupo: "Grupo",
  reserva: "Reserva",
};

const typeColors = {
  terapia: "border-l-[#59a5a9]",
  grupo: "border-l-emerald-400",
  reserva: "border-l-amber-400",
};

export default function AgendaPage() {
  const [selectedDay, setSelectedDay] = useState<string>("Jueves");

  const filteredAgenda = weekAgenda.filter((item) => item.day === selectedDay);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Agenda"
        description="Vista semanal de sesiones, actividades y reservas"
      >
        <Button
          variant="outline"
          className="rounded-xl border-slate-200 text-sm"
        >
          Semana del 9 — 13 jun 2026
        </Button>
      </PageHeader>

      <div className="flex flex-wrap gap-2">
        {WEEK_DAYS.map((day) => {
          const count = weekAgenda.filter((item) => item.day === day).length;
          const isToday = day === "Jueves";

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                selectedDay === day
                  ? "border-[#59a5a9] bg-[#59a5a9]/10 text-[#3d7a7d]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {day}
              {isToday && (
                <span className="ml-1.5 text-xs text-[#59a5a9]">(hoy)</span>
              )}
              <span className="ml-2 text-xs text-slate-400">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAgenda.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-slate-400">
            No hay eventos programados para este día
          </p>
        ) : (
          filteredAgenda.map((item) => (
            <AgendaCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

function AgendaCard({ item }: { item: AgendaItem }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 border-l-4 bg-white p-5 shadow-none transition-shadow hover:shadow-sm",
        typeColors[item.type]
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {typeLabels[item.type]}
          </span>
          <h3 className="mt-0.5 text-sm font-semibold text-slate-900">
            {item.title}
          </h3>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="space-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>
            {item.time} — {item.endTime}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-slate-400" />
          <span>{item.professional}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <span>{item.room}</span>
        </div>
      </div>
    </div>
  );
}
