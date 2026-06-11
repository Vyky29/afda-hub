"use client";

import { FileText } from "lucide-react";
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
import type { Invoice } from "@/lib/portal/types";

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Profesional</TableHead>
            <TableHead>Mes</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Sesiones</TableHead>
            <TableHead className="text-right">Importe</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Archivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">
                {inv.professionalName}
              </TableCell>
              <TableCell>{inv.month}</TableCell>
              <TableCell>{inv.year}</TableCell>
              <TableCell>{inv.sessions}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatEuro(inv.amount)}
              </TableCell>
              <TableCell>
                <PortalStatusBadge status={inv.status} />
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <FileText className="h-3.5 w-3.5 text-[#59a5a9]" />
                  {inv.fileName}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
