"use client";

import { FileText, History } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/payroll/status-badge";
import { workerPayrollHistory } from "@/lib/payroll/mock-data";
import type { Worker } from "@/lib/payroll/types";

interface WorkerProfileDialogProps {
  worker: Worker | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkerProfileDialog({
  worker,
  open,
  onOpenChange,
}: WorkerProfileDialogProps) {
  if (!worker) return null;

  const history = workerPayrollHistory[worker.id] ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>{worker.fullName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <section>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Datos personales
            </h3>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-400">Email</dt>
                <dd>{worker.email || "Sin email"}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Telefono</dt>
                <dd>{worker.phone}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Estado</dt>
                <dd>
                  <StatusBadge status={worker.status} />
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Inicio</dt>
                <dd>{worker.startDate}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Datos laborales
            </h3>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-400">Rol</dt>
                <dd>{worker.role}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Centro</dt>
                <dd>{worker.workCentre}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Contrato</dt>
                <dd>{worker.contractType}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Carpeta nomina</dt>
                <dd className="text-xs">{worker.payrollFolder}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <History className="h-4 w-4" />
              Historial de nominas
            </h3>
            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((entry) => (
                  <div
                    key={`${entry.month}-${entry.year}`}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm"
                  >
                    <span>
                      {entry.month} {entry.year}
                    </span>
                    <span className="text-xs text-slate-400">
                      Enviado: {entry.sentDate}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                Sin historial registrado para este trabajador.
              </p>
            )}
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FileText className="h-4 w-4" />
              Documentos
            </h3>
            <p className="rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm text-slate-500">
              Carpeta: {worker.payrollFolder}
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">
              Notas
            </h3>
            <p className="text-sm text-slate-500">{worker.notes}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
