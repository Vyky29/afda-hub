"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  FileText,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/payroll/status-badge";
import { formatEuro } from "@/lib/payroll/format";
import { WORKER_ROLES } from "@/lib/payroll/constants";
import type { ReviewStatus, SalaryStructureRecord } from "@/lib/payroll/types";
import { cn } from "@/lib/utils";

type SortKey =
  | "workerName"
  | "professionalCategory"
  | "grossTotal"
  | "netSalary"
  | "companyCost"
  | "workedDays";

type SortDir = "asc" | "desc";

interface SalaryStructureTableProps {
  records: SalaryStructureRecord[];
}

export function SalaryStructureTable({ records }: SalaryStructureTableProps) {
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("Mayo");
  const [yearFilter, setYearFilter] = useState("2026");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("workerName");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = records.filter((r) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        r.workerName.toLowerCase().includes(q) ||
        r.dniNie.toLowerCase().includes(q) ||
        r.payslipFile.toLowerCase().includes(q);
      const matchesMonth = !monthFilter || r.month === monthFilter;
      const matchesYear = !yearFilter || r.year === Number(yearFilter);
      const matchesRole =
        roleFilter === "all" || r.professionalCategory === roleFilter;
      const matchesStatus =
        statusFilter === "all" || r.reviewStatus === statusFilter;
      return (
        matchesSearch && matchesMonth && matchesYear && matchesRole && matchesStatus
      );
    });

    result = [...result].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc"
          ? av.localeCompare(bv, "es")
          : bv.localeCompare(av, "es");
      }
      return sortDir === "asc"
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });

    return result;
  }, [
    records,
    search,
    monthFilter,
    yearFilter,
    roleFilter,
    statusFilter,
    sortKey,
    sortDir,
  ]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column)
      return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="ml-1 inline h-3 w-3 text-[#59a5a9]" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3 text-[#59a5a9]" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar trabajador, DNI/NIE o archivo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl pl-10"
          />
        </div>
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-[130px] rounded-xl">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mayo">Mayo</SelectItem>
            <SelectItem value="Abril">Abril</SelectItem>
          </SelectContent>
        </Select>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-[100px] rounded-xl">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[170px] rounded-xl">
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
              ["reviewed", "pending_review", "in_review"] as ReviewStatus[]
            ).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-8" />
                <TableHead>
                  <button
                    type="button"
                    className="flex items-center font-medium"
                    onClick={() => toggleSort("workerName")}
                  >
                    Trabajador
                    <SortIcon column="workerName" />
                  </button>
                </TableHead>
                <TableHead>DNI/NIE</TableHead>
                <TableHead>
                  <button
                    type="button"
                    className="flex items-center font-medium"
                    onClick={() => toggleSort("professionalCategory")}
                  >
                    Categoria
                    <SortIcon column="professionalCategory" />
                  </button>
                </TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>
                  <button
                    type="button"
                    className="flex items-center font-medium"
                    onClick={() => toggleSort("workedDays")}
                  >
                    Dias
                    <SortIcon column="workedDays" />
                  </button>
                </TableHead>
                <TableHead className="text-right">Salario Base</TableHead>
                <TableHead className="text-right">Paga Extra</TableHead>
                <TableHead className="text-right">Compl. Espec.</TableHead>
                <TableHead className="text-right">Otros Compl.</TableHead>
                <TableHead className="text-right">
                  <button
                    type="button"
                    className="ml-auto flex items-center font-medium"
                    onClick={() => toggleSort("grossTotal")}
                  >
                    Bruto
                    <SortIcon column="grossTotal" />
                  </button>
                </TableHead>
                <TableHead className="text-right">SS Trab.</TableHead>
                <TableHead className="text-right">IRPF</TableHead>
                <TableHead className="text-right">Otras Ded.</TableHead>
                <TableHead className="text-right">Tot. Ded.</TableHead>
                <TableHead className="text-right">
                  <button
                    type="button"
                    className="ml-auto flex items-center font-medium"
                    onClick={() => toggleSort("netSalary")}
                  >
                    Liquido
                    <SortIcon column="netSalary" />
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button
                    type="button"
                    className="ml-auto flex items-center font-medium"
                    onClick={() => toggleSort("companyCost")}
                  >
                    Coste Emp.
                    <SortIcon column="companyCost" />
                  </button>
                </TableHead>
                <TableHead>Archivo</TableHead>
                <TableHead>Revision</TableHead>
                <TableHead>Envio</TableHead>
                <TableHead>Enviado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={22}
                    className="py-12 text-center text-slate-400"
                  >
                    No hay registros que coincidan con los filtros
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((record) => {
                  const isExpanded = expandedId === record.id;
                  return (
                    <SalaryRow
                      key={record.id}
                      record={record}
                      isExpanded={isExpanded}
                      onToggle={() =>
                        setExpandedId(isExpanded ? null : record.id)
                      }
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        {filtered.length} registro(s) — Haz clic en una fila para ver el
        desglose detallado
      </p>
    </div>
  );
}

function SalaryRow({
  record,
  isExpanded,
  onToggle,
}: {
  record: SalaryStructureRecord;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <TableRow
        className={cn(
          "cursor-pointer transition-colors",
          isExpanded && "bg-[#59a5a9]/5"
        )}
        onClick={onToggle}
      >
        <TableCell>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-[#59a5a9]" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-400" />
          )}
        </TableCell>
        <TableCell className="whitespace-nowrap font-medium">
          {record.workerName}
        </TableCell>
        <TableCell className="font-mono text-xs">{record.dniNie}</TableCell>
        <TableCell className="text-slate-500">
          {record.professionalCategory}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {record.month} {record.year}
        </TableCell>
        <TableCell>{record.workedDays}</TableCell>
        <TableCell className="text-right tabular-nums">
          {formatEuro(record.baseSalary)}
        </TableCell>
        <TableCell className="text-right tabular-nums">
          {formatEuro(record.extraPay)}
        </TableCell>
        <TableCell className="text-right tabular-nums">
          {formatEuro(record.specificComplement)}
        </TableCell>
        <TableCell className="text-right tabular-nums">
          {formatEuro(record.otherComplements)}
        </TableCell>
        <TableCell className="text-right font-medium tabular-nums">
          {formatEuro(record.grossTotal)}
        </TableCell>
        <TableCell className="text-right tabular-nums text-red-600/80">
          -{formatEuro(record.socialSecurityDeduction)}
        </TableCell>
        <TableCell className="text-right tabular-nums text-red-600/80">
          -{formatEuro(record.irpfDeduction)}
        </TableCell>
        <TableCell className="text-right tabular-nums text-red-600/80">
          {record.otherDeductions > 0
            ? `-${formatEuro(record.otherDeductions)}`
            : "—"}
        </TableCell>
        <TableCell className="text-right tabular-nums text-red-600">
          -{formatEuro(record.totalDeductions)}
        </TableCell>
        <TableCell className="text-right font-semibold tabular-nums text-[#3d7a7d]">
          {formatEuro(record.netSalary)}
        </TableCell>
        <TableCell className="text-right tabular-nums">
          {formatEuro(record.companyCost)}
        </TableCell>
        <TableCell className="max-w-[120px] truncate text-xs text-slate-400">
          {record.payslipFile}
        </TableCell>
        <TableCell>
          <StatusBadge status={record.reviewStatus} />
        </TableCell>
        <TableCell>
          <StatusBadge status={record.sendStatus} />
        </TableCell>
        <TableCell className="text-xs text-slate-500">
          {record.sentDate ?? "—"}
        </TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
          <TableCell colSpan={22} className="p-0">
            <SalaryBreakdownPanel record={record} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function SalaryBreakdownPanel({ record }: { record: SalaryStructureRecord }) {
  return (
    <div className="grid gap-6 border-t border-slate-100 p-6 md:grid-cols-2 lg:grid-cols-4">
      <BreakdownSection title="Devengos">
        <BreakdownLine label="Salario Base" value={record.baseSalary} />
        <BreakdownLine label="Paga Extra" value={record.extraPay} />
        <BreakdownLine
          label="Complemento Especifico"
          value={record.specificComplement}
        />
        <BreakdownLine
          label="Otros complementos"
          value={record.otherComplements}
        />
        <BreakdownLine
          label="Total bruto"
          value={record.grossTotal}
          highlight
        />
      </BreakdownSection>

      <BreakdownSection title="Deducciones">
        <BreakdownLine
          label="Cotizacion Seg. Social"
          value={-record.socialSecurityDeduction}
          negative
        />
        <BreakdownLine label="IRPF" value={-record.irpfDeduction} negative />
        <BreakdownLine
          label="Otras deducciones"
          value={-record.otherDeductions}
          negative
        />
        <BreakdownLine
          label="Total deducciones"
          value={-record.totalDeductions}
          highlight
          negative
        />
      </BreakdownSection>

      <BreakdownSection title="Resumen">
        <BreakdownLine
          label="Liquido a percibir"
          value={record.netSalary}
          highlight
        />
        <BreakdownLine
          label="Coste Empresa"
          value={record.companyCost}
          highlight
        />
        <div className="mt-3 space-y-1 border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-400">Dias trabajados</p>
          <p className="text-sm font-medium">{record.workedDays} dias</p>
        </div>
      </BreakdownSection>

      <BreakdownSection title="Documentacion">
        <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2.5">
          <FileText className="h-4 w-4 text-[#59a5a9]" />
          <span className="text-xs text-slate-600">{record.payslipFile}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <StatusBadge status={record.reviewStatus} />
          <StatusBadge status={record.sendStatus} />
        </div>
        {record.notes && (
          <div className="mt-3 rounded-lg border border-slate-100 bg-white p-3">
            <p className="text-xs font-medium text-slate-400">Notas internas</p>
            <p className="mt-1 text-sm text-slate-600">{record.notes}</p>
          </div>
        )}
      </BreakdownSection>
    </div>
  );
}

function BreakdownSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function BreakdownLine({
  label,
  value,
  highlight,
  negative,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span
        className={cn(
          "tabular-nums",
          highlight && "font-semibold text-slate-900",
          negative && !highlight && "text-red-600/80",
          highlight && negative && "text-red-600",
          highlight && !negative && "text-[#3d7a7d]"
        )}
      >
        {formatEuro(Math.abs(value))}
      </span>
    </div>
  );
}
