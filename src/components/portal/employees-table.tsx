"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PortalStatusBadge } from "@/components/portal/status-badge";
import { formatEuro } from "@/lib/payroll/format";
import type { Employee } from "@/lib/portal/types";

interface EmployeesTableProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
}

export function EmployeesTable({ employees, onSelect }: EmployeesTableProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nombre</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Contrato</TableHead>
            <TableHead className="text-right">Bruto</TableHead>
            <TableHead className="text-right">Complementos</TableHead>
            <TableHead>Nomina</TableHead>
            <TableHead>Docs</TableHead>
            <TableHead>Observaciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((e) => (
            <TableRow
              key={e.id}
              className="cursor-pointer"
              onClick={() => onSelect(e)}
            >
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell className="text-slate-500">{e.role}</TableCell>
              <TableCell className="text-slate-500">{e.contractType}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatEuro(e.grossSalary)}
              </TableCell>
              <TableCell className="text-right tabular-nums text-slate-500">
                {formatEuro(e.complements)}
              </TableCell>
              <TableCell>
                <PortalStatusBadge status={e.payrollStatus} />
              </TableCell>
              <TableCell>{e.documentsCount}</TableCell>
              <TableCell className="max-w-[180px] truncate text-xs text-slate-400">
                {e.notes || ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
