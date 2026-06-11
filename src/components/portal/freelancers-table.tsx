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
import type { Freelancer } from "@/lib/portal/types";

interface FreelancersTableProps {
  freelancers: Freelancer[];
  onSelect: (freelancer: Freelancer) => void;
}

export function FreelancersTable({
  freelancers,
  onSelect,
}: FreelancersTableProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nombre</TableHead>
            <TableHead>Especialidad</TableHead>
            <TableHead>NIF/CIF</TableHead>
            <TableHead className="text-right">Tarifa</TableHead>
            <TableHead>Facturas</TableHead>
            <TableHead>Sesiones</TableHead>
            <TableHead className="text-right">Total mes</TableHead>
            <TableHead>Revision</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {freelancers.map((f) => (
            <TableRow
              key={f.id}
              className="cursor-pointer"
              onClick={() => onSelect(f)}
            >
              <TableCell className="font-medium">{f.name}</TableCell>
              <TableCell className="text-slate-500">{f.specialty}</TableCell>
              <TableCell className="font-mono text-xs">{f.nifCif}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatEuro(f.rate)}/h
              </TableCell>
              <TableCell>{f.invoicesUploaded}</TableCell>
              <TableCell>{f.detectedSessions}</TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {formatEuro(f.monthlyTotal)}
              </TableCell>
              <TableCell>
                <PortalStatusBadge status={f.reviewStatus} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
