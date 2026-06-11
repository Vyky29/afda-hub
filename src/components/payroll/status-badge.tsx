import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  ClassificationStatus,
  ReviewStatus,
  SendStatus,
  TrackingStatus,
  WorkerStatus,
} from "@/lib/payroll/types";

type PayrollStatus =
  | ClassificationStatus
  | SendStatus
  | TrackingStatus
  | WorkerStatus
  | ReviewStatus
  | "en_proceso"
  | "completado"
  | "pendiente"
  | "uploaded";

const config: Record<PayrollStatus, { label: string; className: string }> = {
  matched: {
    label: "Coincidente",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  needs_review: {
    label: "Revisar",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  missing_worker: {
    label: "Sin trabajador",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  duplicate: {
    label: "Duplicado",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
  ready_to_send: {
    label: "Listo para enviar",
    className: "bg-[#59a5a9]/10 text-[#3d7a7d] border-[#59a5a9]/30",
  },
  ready: {
    label: "Listo",
    className: "bg-[#59a5a9]/10 text-[#3d7a7d] border-[#59a5a9]/30",
  },
  sent: {
    label: "Enviado",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  failed: {
    label: "Fallido",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  activo: {
    label: "Activo",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  inactivo: {
    label: "Inactivo",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  baja: {
    label: "Baja",
    className: "bg-slate-100 text-slate-500 border-slate-200",
  },
  en_proceso: {
    label: "En proceso",
    className: "bg-[#59a5a9]/10 text-[#3d7a7d] border-[#59a5a9]/30",
  },
  completado: {
    label: "Completado",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  uploaded: {
    label: "Subido",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  reviewed: {
    label: "Revisada",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending_review: {
    label: "Pendiente revision",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  in_review: {
    label: "En revision",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

interface StatusBadgeProps {
  status: PayrollStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const item = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", item.className, className)}
    >
      {item.label}
    </Badge>
  );
}
