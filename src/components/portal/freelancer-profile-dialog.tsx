"use client";

import { FileText, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PortalStatusBadge } from "@/components/portal/status-badge";
import { formatEuro } from "@/lib/payroll/format";
import { invoices } from "@/lib/portal/mock-data";
import type { Freelancer } from "@/lib/portal/types";

export function FreelancerProfileDialog({
  freelancer,
  open,
  onOpenChange,
}: {
  freelancer: Freelancer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!freelancer) return null;

  const ownInvoices = invoices.filter(
    (i) => i.professionalId === freelancer.id
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>{freelancer.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          <section className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400">Especialidad</p>
              <p>{freelancer.specialty}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">NIF/CIF</p>
              <p className="font-mono">{freelancer.nifCif}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Tarifa</p>
              <p>{formatEuro(freelancer.rate)}/sesion</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Revision</p>
              <PortalStatusBadge status={freelancer.reviewStatus} />
            </div>
          </section>

          <section>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Mail className="h-3.5 w-3.5" />
              Email
            </p>
            <Input
              defaultValue={freelancer.email}
              className="rounded-xl"
              readOnly
            />
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Facturas registradas
            </p>
            <div className="space-y-2">
              {ownInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2"
                >
                  <div>
                    <p>
                      {inv.month} {inv.year}
                    </p>
                    <p className="text-xs text-slate-400">
                      {inv.sessions} sesiones
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {formatEuro(inv.amount)}
                    </span>
                    <PortalStatusBadge status={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <FileText className="h-3.5 w-3.5" />
              Carpeta de documentos
            </p>
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-3 py-4 text-center text-xs text-slate-400">
              Contratos, facturas y documentacion fiscal del autonomo.
            </p>
          </section>

          {freelancer.notes && (
            <section>
              <p className="text-xs text-slate-400">Observaciones</p>
              <p className="text-slate-600">{freelancer.notes}</p>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
