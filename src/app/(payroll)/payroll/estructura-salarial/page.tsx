import {
  Building2,
  CheckCircle2,
  Clock,
  Euro,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/payroll/page-header";
import { SalaryPrivacyBanner } from "@/components/payroll/salary-privacy-banner";
import { SalaryStructureTable } from "@/components/payroll/salary-structure-table";
import { SummaryCard } from "@/components/payroll/summary-card";
import { formatEuro } from "@/lib/payroll/format";
import {
  computeSalarySummary,
  salaryStructureRecords,
} from "@/lib/payroll/salary-mock-data";

export default function EstructuraSalarialPage() {
  const summary = computeSalarySummary(salaryStructureRecords);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Estructura Salarial"
        description="Desglose mensual de nominas por trabajador — Mayo 2026"
      />

      <SalaryPrivacyBanner />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard
          title="Total bruto"
          value={formatEuro(summary.totalGross, false)}
          description="nomina bruta del mes"
          icon={Euro}
        />
        <SummaryCard
          title="Total liquido"
          value={formatEuro(summary.totalNet, false)}
          description="liquido a percibir"
          icon={Wallet}
        />
        <SummaryCard
          title="Coste empresa"
          value={formatEuro(summary.totalCompanyCost, false)}
          description="coste total empleador"
          icon={Building2}
        />
        <SummaryCard
          title="Nominas revisadas"
          value={summary.payslipsReviewed}
          icon={CheckCircle2}
        />
        <SummaryCard
          title="Pendientes revision"
          value={summary.payslipsPendingReview}
          icon={Clock}
        />
      </div>

      <SalaryStructureTable records={salaryStructureRecords} />
    </div>
  );
}
