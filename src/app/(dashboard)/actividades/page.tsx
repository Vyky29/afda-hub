"use client";

import { useState } from "react";
import { LayoutGrid, List, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { activities, activityCategories } from "@/lib/mock-data/actividades";
import type { Activity, ActivityCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ActividadesPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    ActivityCategory | "todas"
  >("todas");
  const [view, setView] = useState<"cards" | "table">("cards");

  const filtered =
    selectedCategory === "todas"
      ? activities
      : activities.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Actividades"
        description="Gestión de actividades comunitarias y terap�uticas de AFDA"
      >
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
          <Button
            variant={view === "cards" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-lg"
            onClick={() => setView("cards")}
          >
            <LayoutGrid className="mr-1.5 h-4 w-4" />
            Tarjetas
          </Button>
          <Button
            variant={view === "table" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-lg"
            onClick={() => setView("table")}
          >
            <List className="mr-1.5 h-4 w-4" />
            Tabla
          </Button>
        </div>
      </PageHeader>

      <div className="flex flex-wrap gap-2">
        <CategoryPill
          label="Todas"
          active={selectedCategory === "todas"}
          onClick={() => setSelectedCategory("todas")}
        />
        {activityCategories.map((cat) => (
          <CategoryPill
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>

      {view === "cards" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200/80 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Actividad</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Asistencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">
                    {activity.title}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {activity.category}
                  </TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.professional}</TableCell>
                  <TableCell>
                    {activity.participants}/{activity.maxParticipants}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={activity.attendance} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-[#59a5a9] bg-[#59a5a9]/10 text-[#3d7a7d]"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      )}
    >
      {label}
    </button>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200/80 bg-white p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-medium text-[#59a5a9]">
            {activity.category}
          </span>
          <h3 className="mt-0.5 text-sm font-semibold text-slate-900">
            {activity.title}
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">{activity.date}</p>
        </div>
        <StatusBadge status={activity.attendance} />
      </div>

      <p className="mb-3 flex-1 text-sm text-slate-500">{activity.objective}</p>

      <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <div className="flex items-center justify-between">
          <span>Responsable</span>
          <span className="font-medium text-slate-700">
            {activity.professional}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            Participantes
          </span>
          <span className="font-medium text-slate-700">
            {activity.participants}/{activity.maxParticipants}
          </span>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <span className="text-slate-400">Notas: </span>
          {activity.notes}
        </div>
      </div>
    </div>
  );
}
