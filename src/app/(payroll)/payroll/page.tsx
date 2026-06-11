import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Upload,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/payroll/page-header";
import { StatusBadge } from "@/components/payroll/status-badge";
import { SummaryCard } from "@/components/payroll/summary-card";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats } from "@/lib/payroll/mock-data";

export default function PayrollDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Resumen del proceso de nominas — Mayo 2026"
      >
        <StatusBadge status={dashboardStats.monthlyStatus} />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <SummaryCard
          title="Trabajadores"
          value={dashboardStats.totalWorkers}
          icon={Users}
        />
        <SummaryCard
          title="Nominas subidas"
          value={dashboardStats.payslipsUploaded}
          description="este mes"
          icon={Upload}
        />
        <SummaryCard
          title="Nominas enviadas"
          value={dashboardStats.payslipsSent}
          icon={Send}
        />
        <SummaryCard
          title="Pendientes"
          value={dashboardStats.pendingPayslips}
          icon={Clock}
        />
        <SummaryCard
          title="Errores / emails"
          value={dashboardStats.errorsOrMissingEmails}
          description="requieren atencion"
          icon={AlertTriangle}
        />
        <SummaryCard
          title="Progreso"
          value={`${dashboardStats.progressPercent}%`}
          icon={CheckCircle2}
        />
      </div>

      <Card className="border-slate-200/80 bg-white shadow-none">
        <CardHeader>
          <CardTitle className="text-base">
            Progreso mensual de nominas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              {dashboardStats.payslipsSent} de {dashboardStats.totalWorkers}{" "}
              nominas enviadas
            </span>
            <span className="font-semibold text-[#59a5a9]">
              {dashboardStats.progressPercent}%
            </span>
          </div>
          <Progress
            value={dashboardStats.progressPercent}
            className="h-3 rounded-full"
          />
          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <p className="text-xs text-slate-400">Subidas</p>
              <p className="text-lg font-semibold">
                {dashboardStats.payslipsUploaded}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <p className="text-xs text-slate-400">Enviadas</p>
              <p className="text-lg font-semibold text-emerald-600">
                {dashboardStats.payslipsSent}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <p className="text-xs text-slate-400">Pendientes</p>
              <p className="text-lg font-semibold text-amber-600">
                {dashboardStats.pendingPayslips}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 bg-white shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Tareas pendientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "2 trabajadores sin email registrado",
            "1 nomina sin trabajador asignado",
            "1 archivo duplicado pendiente de revision",
            "4 nominas listas para enviar",
          ].map((task) => (
            <div
              key={task}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm text-slate-600"
            >
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
              {task}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
