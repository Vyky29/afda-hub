import Link from "next/link";
import {
  AlertTriangle,
  FileText,
  FolderOpen,
  Receipt,
  UserSquare2,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  dashboardSummary,
  monthlyAlerts,
} from "@/lib/portal/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Gestion interna AFDA  equipo, autonomos, nominas y facturas"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Trabajadores activos"
          value={dashboardSummary.activeEmployees}
          icon={Users}
        />
        <StatCard
          title="Autonomos activos"
          value={dashboardSummary.activeFreelancers}
          icon={UserSquare2}
        />
        <StatCard
          title="Nominas pendientes"
          value={dashboardSummary.pendingPayrolls}
          icon={FileText}
        />
        <StatCard
          title="Facturas pendientes"
          value={dashboardSummary.pendingInvoices}
          icon={Receipt}
        />
        <StatCard
          title="Documentos pendientes"
          value={dashboardSummary.pendingDocuments}
          icon={FolderOpen}
        />
        <StatCard
          title="Alertas del mes"
          value={dashboardSummary.monthlyAlerts}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/80 bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Accesos rapidos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {[
              { href: "/trabajadores", label: "Ver trabajadores" },
              { href: "/autonomos", label: "Ver autonomos" },
              { href: "/facturas", label: "Gestionar facturas" },
              { href: "/documentos", label: "Expedientes" },
              { href: "/payroll", label: "Nominas Mayo 2026" },
              { href: "/profesionales", label: "Equipo profesional" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-medium text-[#3d7a7d] transition-colors hover:bg-[#59a5a9]/10"
              >
                {link.label}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Alertas del mes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {monthlyAlerts.map((alert) => (
              <div
                key={alert}
                className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-600"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                {alert}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
