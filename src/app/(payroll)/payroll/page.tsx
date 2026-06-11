"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  Euro,
  Users,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/payroll/page-header";
import { PayrollTrackerTable } from "@/components/payroll/payroll-tracker-table";
import { SalaryPrivacyBanner } from "@/components/payroll/salary-privacy-banner";
import { SummaryCard } from "@/components/payroll/summary-card";
import { formatEuro } from "@/lib/payroll/format";
import { getPayrollSummary, payrollWorkers } from "@/lib/payroll/real-data";
import type { PayrollWorkerRecord } from "@/lib/payroll/types";

export default function PayrollDashboardPage() {
  const [workers, setWorkers] = useState<PayrollWorkerRecord[]>(payrollWorkers);
  const summary = useMemo(() => getPayrollSummary(workers), [workers]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nominas Mayo 2026"
        description="Seguimiento de lo que cobra cada trabajador, nominas guardadas y envio por email"
      />

      <SalaryPrivacyBanner />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard
          title="Trabajadores"
          value={summary.totalWorkers}
          icon={Users}
        />
        <SummaryCard
          title="Total liquido"
          value={formatEuro(summary.totalLiquido, false)}
          description="liquido a percibir"
          icon={Wallet}
        />
        <SummaryCard
          title="Total bruto"
          value={formatEuro(summary.totalBruto, false)}
          description="nomina bruta"
          icon={Euro}
        />
        <SummaryCard
          title="Coste empresa"
          value={formatEuro(summary.totalCoste, false)}
          icon={Building2}
        />
        <SummaryCard
          title="Enviadas"
          value={`${summary.sent} / ${summary.totalWorkers}`}
          description={`${summary.pending} pendientes`}
          icon={CheckCircle2}
        />
      </div>

      {summary.needsAction > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-800">
          <Clock className="h-4 w-4 shrink-0" />
          {summary.needsAction} nominas requieren atencion (sin email o pendientes
          de revision)
        </div>
      )}

      <PayrollTrackerTable
        workers={payrollWorkers}
        onWorkersChange={setWorkers}
      />
    </div>
  );
}
