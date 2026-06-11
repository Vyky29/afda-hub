"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/payroll/page-header";
import { SummaryCard } from "@/components/payroll/summary-card";
import { MonthlyTrackingTable } from "@/components/payroll/monthly-tracking-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackingRecords } from "@/lib/payroll/mock-data";
import { WORKER_ROLES } from "@/lib/payroll/constants";
import type { TrackingStatus, WorkerRole } from "@/lib/payroll/types";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Upload,
} from "lucide-react";

export default function SeguimientoPage() {
  const [monthFilter, setMonthFilter] = useState("Mayo");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [workerFilter, setWorkerFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return trackingRecords.filter((r) => {
      if (monthFilter && r.month !== monthFilter) return false;
      if (roleFilter !== "all" && r.role !== roleFilter) return false;
      if (statusFilter !== "all" && r.confirmationStatus !== statusFilter)
        return false;
      if (workerFilter !== "all" && r.workerId !== workerFilter) return false;
      return true;
    });
  }, [monthFilter, roleFilter, statusFilter, workerFilter]);

  const summary = useMemo(() => {
    const base = trackingRecords;
    return {
      uploaded: base.filter((r) => r.payslipUploaded).length,
      sent: base.filter((r) => r.confirmationStatus === "sent").length,
      pending: base.filter((r) => r.confirmationStatus === "pending").length,
      failed: base.filter((r) => r.confirmationStatus === "failed").length,
      needsReview: base.filter(
        (r) => r.confirmationStatus === "needs_review"
      ).length,
    };
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Seguimiento mensual"
        description="Control del estado de cada nomina por trabajador"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard title="Subidas" value={summary.uploaded} icon={Upload} />
        <SummaryCard title="Enviadas" value={summary.sent} icon={CheckCircle2} />
        <SummaryCard title="Pendientes" value={summary.pending} icon={Clock} />
        <SummaryCard title="Fallidas" value={summary.failed} icon={AlertTriangle} />
        <SummaryCard title="Revisar" value={summary.needsReview} icon={Eye} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-[140px] rounded-xl">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mayo">Mayo</SelectItem>
            <SelectItem value="Abril">Abril</SelectItem>
          </SelectContent>
        </Select>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los roles</SelectItem>
            {WORKER_ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] rounded-xl">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {(
              [
                "uploaded",
                "sent",
                "pending",
                "failed",
                "needs_review",
              ] as TrackingStatus[]
            ).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={workerFilter} onValueChange={setWorkerFilter}>
          <SelectTrigger className="w-[220px] rounded-xl">
            <SelectValue placeholder="Trabajador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {trackingRecords.map((r) => (
              <SelectItem key={r.workerId} value={r.workerId}>
                {r.workerName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MonthlyTrackingTable records={filtered} />
    </div>
  );
}
