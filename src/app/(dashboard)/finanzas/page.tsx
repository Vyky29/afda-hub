import {
  AlertCircle,
  CreditCard,
  FileText,
  Receipt,
  TrendingUp,
} from "lucide-react";
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
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  financeSummary,
  gastos,
  nominas,
  subvenciones,
} from "@/lib/mock-data/finanzas";
import { Check, X } from "lucide-react";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCurrencyDetailed(amount: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export default function FinanzasPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Finanzas"
        description="Subvenciones, nóminas y gastos — Sede central"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Subvenciones activas"
          value={formatCurrency(financeSummary.activeFunding)}
          icon={TrendingUp}
        />
        <StatCard
          title="Justificación pendiente"
          value={formatCurrency(financeSummary.pendingJustification)}
          description="requiere acción"
          icon={AlertCircle}
        />
        <StatCard
          title="Nóminas del mes"
          value={formatCurrency(financeSummary.monthlyPayroll)}
          icon={CreditCard}
        />
        <StatCard
          title="Gastos del mes"
          value={formatCurrency(financeSummary.monthlyExpenses)}
          icon={Receipt}
        />
      </div>

      <Tabs defaultValue="subvenciones" className="space-y-6">
        <TabsList className="rounded-xl bg-slate-100 p-1">
          <TabsTrigger value="subvenciones" className="rounded-lg">
            Subvenciones
          </TabsTrigger>
          <TabsTrigger value="nominas" className="rounded-lg">
            Nóminas
          </TabsTrigger>
          <TabsTrigger value="gastos" className="rounded-lg">
            Gastos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subvenciones">
          <div className="rounded-xl border border-slate-200/80 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Organismo</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Plazo</TableHead>
                  <TableHead>Proyecto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subvenciones.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">
                      {sub.fundingBody}
                    </TableCell>
                    <TableCell>{formatCurrency(sub.amount)}</TableCell>
                    <TableCell>
                      <StatusBadge status={sub.status} />
                    </TableCell>
                    <TableCell>{sub.deadline}</TableCell>
                    <TableCell className="text-slate-500">
                      {sub.project}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="nominas">
          <div className="rounded-xl border border-slate-200/80 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Empleado</TableHead>
                  <TableHead>Mes</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Documento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nominas.map((nomina) => (
                  <TableRow key={nomina.id}>
                    <TableCell className="font-medium">
                      {nomina.employee}
                    </TableCell>
                    <TableCell>{nomina.month}</TableCell>
                    <TableCell>
                      <StatusBadge status={nomina.status} />
                    </TableCell>
                    <TableCell>
                      {nomina.documentUploaded ? (
                        <span className="flex items-center gap-1 text-sm text-emerald-600">
                          <Check className="h-4 w-4" />
                          Subido
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-amber-600">
                          <X className="h-4 w-4" />
                          Pendiente
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="gastos">
          <div className="rounded-xl border border-slate-200/80 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Categoría</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gastos.map((gasto) => (
                  <TableRow key={gasto.id}>
                    <TableCell className="font-medium">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        {gasto.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatCurrencyDetailed(gasto.amount)}
                    </TableCell>
                    <TableCell>{gasto.date}</TableCell>
                    <TableCell>
                      <StatusBadge status={gasto.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
