"use client";

import { FileText, UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/payroll/status-badge";
import type { PayrollDocument } from "@/lib/payroll/types";

interface PayrollUploadListProps {
  documents: PayrollDocument[];
  onReview: (document: PayrollDocument) => void;
}

export function PayrollUploadList({
  documents,
  onReview,
}: PayrollUploadListProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Archivo</TableHead>
            <TableHead>Trabajador detectado</TableHead>
            <TableHead>Mes</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                <span className="flex items-center gap-2 font-medium">
                  <FileText className="h-4 w-4 text-[#59a5a9]" />
                  {doc.fileName}
                </span>
              </TableCell>
              <TableCell>
                {doc.detectedWorker ?? (
                  <span className="text-amber-600">No detectado</span>
                )}
              </TableCell>
              <TableCell>{doc.month}</TableCell>
              <TableCell>{doc.year}</TableCell>
              <TableCell>
                <StatusBadge status={doc.status} />
              </TableCell>
              <TableCell className="text-right">
                {(doc.status === "needs_review" ||
                  doc.status === "missing_worker" ||
                  doc.status === "duplicate") && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => onReview(doc)}
                  >
                    <UserSearch className="mr-1.5 h-3.5 w-3.5" />
                    Revisar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
