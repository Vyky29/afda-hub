"use client";

import { FolderOpen, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PortalStatusBadge } from "@/components/portal/status-badge";
import { formatEuro } from "@/lib/payroll/format";
import type { Employee } from "@/lib/portal/types";

export function EmployeeProfileDialog({
  employee,
  open,
  onOpenChange,
}: {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>{employee.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          <section className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400">Rol</p>
              <p>{employee.role}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Contrato</p>
              <p>{employee.contractType}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">NIF</p>
              <p className="font-mono">{employee.nif}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Estado nomina</p>
              <PortalStatusBadge status={employee.payrollStatus} />
            </div>
          </section>

          <section>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Mail className="h-3.5 w-3.5" />
              Email
            </p>
            <Input
              defaultValue={employee.email}
              className="rounded-xl"
              readOnly
            />
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Nominas
            </p>
            <div className="space-y-2">
              {employee.payslips.map((p) => (
                <div
                  key={`${p.month}-${p.year}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2"
                >
                  <span>
                    {p.month} {p.year}
                  </span>
                  <div className="text-right text-xs">
                    <p>Bruto: {formatEuro(p.bruto)}</p>
                    <p className="text-[#3d7a7d]">
                      Liquido: {formatEuro(p.liquido)}
                    </p>
                  </div>
                  {p.file && (
                    <a
                      href={p.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#59a5a9] hover:underline"
                    >
                      PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <FolderOpen className="h-3.5 w-3.5" />
              Carpeta de documentos ({employee.documentsCount} archivos)
            </p>
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-3 py-4 text-center text-xs text-slate-400">
              La administrativa puede anadir contratos, DNI, titulaciones y mas
              documentos al perfil del trabajador.
            </p>
          </section>

          {employee.notes && (
            <section>
              <p className="text-xs text-slate-400">Observaciones</p>
              <p className="text-slate-600">{employee.notes}</p>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
