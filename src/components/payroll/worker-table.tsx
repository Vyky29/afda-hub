"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/payroll/status-badge";
import type { Worker } from "@/lib/payroll/types";

interface WorkerTableProps {
  workers: Worker[];
  onSelectWorker: (worker: Worker) => void;
}

export function WorkerTable({ workers, onSelectWorker }: WorkerTableProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nombre completo</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Centro</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Carpeta</TableHead>
            <TableHead>Ultimo envio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.map((worker) => (
            <TableRow
              key={worker.id}
              className="cursor-pointer"
              onClick={() => onSelectWorker(worker)}
            >
              <TableCell className="font-medium">{worker.fullName}</TableCell>
              <TableCell className="text-slate-500">{worker.role}</TableCell>
              <TableCell>
                {worker.email || (
                  <span className="text-amber-600">Sin email</span>
                )}
              </TableCell>
              <TableCell className="text-slate-500">{worker.phone}</TableCell>
              <TableCell className="text-slate-500">
                {worker.workCentre}
              </TableCell>
              <TableCell>
                <StatusBadge status={worker.status} />
              </TableCell>
              <TableCell className="max-w-[140px] truncate text-xs text-slate-400">
                {worker.payrollFolder}
              </TableCell>
              <TableCell className="text-slate-500">
                {worker.lastPayslipSent ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
