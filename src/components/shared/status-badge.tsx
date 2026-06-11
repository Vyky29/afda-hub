import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  AttendanceStatus,
  FinanceStatus,
  RoomStatus,
  SessionStatus,
} from "@/lib/types";

type StatusType = RoomStatus | SessionStatus | FinanceStatus | AttendanceStatus;

const statusConfig: Record<
  StatusType,
  { label: string; className: string }
> = {
  disponible: {
    label: "Disponible",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  ocupado: {
    label: "Ocupado",
    className: "bg-[#59a5a9]/10 text-[#3d7a7d] border-[#59a5a9]/30",
  },
  reservado: {
    label: "Reservado",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  mantenimiento: {
    label: "Mantenimiento",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  confirmada: {
    label: "Confirmada",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  en_curso: {
    label: "En curso",
    className: "bg-[#59a5a9]/10 text-[#3d7a7d] border-[#59a5a9]/30",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  cancelada: {
    label: "Cancelada",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  activa: {
    label: "Activa",
    className: "bg-[#59a5a9]/10 text-[#3d7a7d] border-[#59a5a9]/30",
  },
  justificada: {
    label: "Justificada",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  vencida: {
    label: "Vencida",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  pagada: {
    label: "Pagada",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  aprobada: {
    label: "Aprobada",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rechazada: {
    label: "Rechazada",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  completa: {
    label: "Completa",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  parcial: {
    label: "Parcial",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
