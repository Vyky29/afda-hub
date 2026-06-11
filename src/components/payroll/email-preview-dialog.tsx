"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SendPayslipItem } from "@/lib/payroll/types";

interface EmailPreviewDialogProps {
  item: SendPayslipItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailPreviewDialog({
  item,
  open,
  onOpenChange,
}: EmailPreviewDialogProps) {
  if (!item) return null;

  const subject = `Nomina correspondiente a ${item.month} ${item.year}`;
  const body = `Hola ${item.workerName.split(" ")[0]}, adjuntamos tu nomina correspondiente a ${item.month} ${item.year}. Un saludo, AFDA.`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Vista previa del email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs text-slate-400">Para</p>
            <p className="font-medium">
              {item.email || "Sin email — no se puede enviar"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Asunto</p>
            <p className="font-medium">{subject}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Mensaje</p>
            <p className="rounded-lg border border-slate-100 bg-slate-50/50 p-4 leading-relaxed text-slate-600">
              {body}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Adjunto</p>
            <p className="text-slate-500">{item.payslipFile}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
