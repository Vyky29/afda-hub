"use client";

import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/payroll/status-badge";
import type { TrackingRecord } from "@/lib/payroll/types";

interface MonthlyTrackingTableProps {
  records: TrackingRecord[];
}

export function MonthlyTrackingTable({ records }: MonthlyTrackingTableProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Trabajador</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Nomina subida</TableHead>
            <TableHead>Email valido</TableHead>
            <TableHead>Fecha envio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Notas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.workerName}</TableCell>
              <TableCell className="text-slate-500">{record.role}</TableCell>
              <TableCell>
                {record.payslipUploaded ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <X className="h-4 w-4 text-slate-300" />
                )}
              </TableCell>
              <TableCell>
                {record.emailMatched ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </TableCell>
              <TableCell className="text-slate-500">
                {record.sentDate ?? "—"}
              </TableCell>
              <TableCell>
                <StatusBadge status={record.confirmationStatus} />
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-xs text-slate-400">
                {record.issueNotes || "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
