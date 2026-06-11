import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  DocumentStatus,
  InvoiceStatus,
  PayrollStatus,
  ReviewStatus,
} from "@/lib/portal/types";

type Status = PayrollStatus | ReviewStatus | InvoiceStatus | DocumentStatus;

const config: Record<Status, { label: string; className: string }> = {
  al_dia: {
    label: "Al dia",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  revisar: {
    label: "Revisar",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
  sin_nomina: {
    label: "Sin nomina",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  revisada: {
    label: "Revisada",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  en_revision: {
    label: "En revision",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  pagada: {
    label: "Pagada",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rechazada: {
    label: "Rechazada",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  completo: {
    label: "Completo",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  vencido: {
    label: "Vencido",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export function PortalStatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
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
