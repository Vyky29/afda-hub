import {
  Activity,
  AlertTriangle,
  Calendar,
  Clock,
  DoorOpen,
  Users,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  dashboardStats,
  financeAlerts,
  recentActivities,
  roomAvailability,
  todayAgenda,
} from "@/lib/mock-data/dashboard";
import { cn } from "@/lib/utils";

const priorityStyles = {
  alta: "border-red-200 bg-red-50",
  media: "border-amber-200 bg-amber-50",
  baja: "border-slate-200 bg-slate-50",
};

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description={`Resumen del día — ${today}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Sesiones hoy"
          value={dashboardStats.sessionsToday}
          icon={Calendar}
        />
        <StatCard
          title="Profesionales activos"
          value={dashboardStats.activeProfessionals}
          icon={Users}
        />
        <StatCard
          title="Despachos ocupados"
          value={dashboardStats.occupiedRooms}
          description="de 8 espacios"
          icon={DoorOpen}
        />
        <StatCard
          title="Actividades hoy"
          value={dashboardStats.activitiesToday}
          icon={Activity}
        />
        <StatCard
          title="Tareas financieras"
          value={dashboardStats.pendingFinanceTasks}
          description="pendientes"
          icon={Wallet}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Agenda de hoy"
          description="Sesiones y actividades programadas"
        >
          <div className="space-y-3">
            {todayAgenda.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900">
                    {item.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time} — {item.endTime}
                    </span>
                    <span>{item.professional}</span>
                    <span>{item.room}</span>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Disponibilidad de despachos"
          description="Estado actual de los espacios"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {roomAvailability.map((room) => (
              <div
                key={room.id}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">
                    {room.name}
                  </p>
                  <StatusBadge status={room.status} />
                </div>
                {room.currentProfessional && (
                  <p className="text-xs text-slate-500">
                    {room.currentProfessional}
                  </p>
                )}
                {room.currentBooking && (
                  <p className="text-xs text-slate-400">{room.currentBooking}</p>
                )}
                {room.nextBooking && (
                  <p className="mt-1 text-xs text-[#59a5a9]">
                    Siguiente: {room.nextBooking}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Actividades recientes"
          description="Últimas actividades registradas"
        >
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      {activity.category} — {activity.date}
                    </p>
                  </div>
                  <StatusBadge status={activity.attendance} />
                </div>
                <p className="text-xs text-slate-500">{activity.objective}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {activity.participants}/{activity.maxParticipants}{" "}
                  participantes — {activity.professional}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Alertas financieras"
          description="Tareas que requieren atención"
        >
          <div className="space-y-3">
            {financeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "flex gap-3 rounded-xl border p-4",
                  priorityStyles[alert.priority]
                )}
              >
                <AlertTriangle
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    alert.priority === "alta" && "text-red-500",
                    alert.priority === "media" && "text-amber-500",
                    alert.priority === "baja" && "text-slate-400"
                  )}
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {alert.title}
                  </p>
                  <p className="text-xs text-slate-500">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
