"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/payroll/status-badge";
import type { PayrollDocument, Worker } from "@/lib/payroll/types";

interface MatchReviewDialogProps {
  document: PayrollDocument | null;
  workers: Worker[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (documentId: string, workerId: string) => void;
}

export function MatchReviewDialog({
  document,
  workers,
  open,
  onOpenChange,
  onConfirm,
}: MatchReviewDialogProps) {
  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Revisar coincidencia</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs text-slate-400">Archivo</p>
            <p className="font-medium">{document.fileName}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Estado actual:</span>
            <StatusBadge status={document.status} />
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">
              Asignar manualmente a trabajador
            </p>
            <Select
              onValueChange={(workerId) =>
                onConfirm(document.id, workerId)
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Seleccionar trabajador" />
              </SelectTrigger>
              <SelectContent>
                {workers.map((worker) => (
                  <SelectItem key={worker.id} value={worker.id}>
                    {worker.fullName} — {worker.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
