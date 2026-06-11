"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Mail,
  Search,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/payroll/status-badge";
import { formatEuro } from "@/lib/payroll/format";
import type { PayrollWorkerRecord, SendStatus } from "@/lib/payroll/types";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "afda-payroll-mayo-2026";

type StoredState = Record<
  string,
  { email?: string; sendStatus?: SendStatus; sentDate?: string; notes?: string }
>;

function loadStored(): StoredState {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveStored(data: StoredState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function mergeWorkers(
  base: PayrollWorkerRecord[],
  stored: StoredState
): PayrollWorkerRecord[] {
  return base.map((w) => ({
    ...w,
    email: stored[w.id]?.email ?? w.email,
    sendStatus: stored[w.id]?.sendStatus ?? w.sendStatus,
    sentDate: stored[w.id]?.sentDate ?? w.sentDate,
    notes: stored[w.id]?.notes ?? w.notes,
  }));
}

interface PayrollTrackerTableProps {
  workers: PayrollWorkerRecord[];
  onWorkersChange?: (workers: PayrollWorkerRecord[]) => void;
}

export function PayrollTrackerTable({
  workers: baseWorkers,
  onWorkersChange,
}: PayrollTrackerTableProps) {
  const [workers, setWorkers] = useState(baseWorkers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [emailDialog, setEmailDialog] = useState<PayrollWorkerRecord | null>(
    null
  );
  const [previewDialog, setPreviewDialog] = useState<PayrollWorkerRecord | null>(
    null
  );

  useEffect(() => {
    setWorkers(mergeWorkers(baseWorkers, loadStored()));
  }, [baseWorkers]);

  const persist = (id: string, patch: StoredState[string]) => {
    const stored = loadStored();
    stored[id] = { ...stored[id], ...patch };
    saveStored(stored);
    const merged = mergeWorkers(baseWorkers, stored);
    setWorkers(merged);
    onWorkersChange?.(merged);
  };

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        w.fullName.toLowerCase().includes(q) ||
        w.nif.toLowerCase().includes(q) ||
        w.employeeNum.includes(q);
      const matchesStatus =
        statusFilter === "all" || w.sendStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [workers, search, statusFilter]);

  const handleSend = (worker: PayrollWorkerRecord) => {
    if (!worker.email) {
      setEmailDialog(worker);
      return;
    }
    const today = new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    persist(worker.id, { sendStatus: "sent", sentDate: today });
    setEmailDialog(null);
  };

  const handleSaveEmail = (worker: PayrollWorkerRecord, email: string) => {
    persist(worker.id, { email, sendStatus: "ready" });
    setEmailDialog(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar por nombre, NIF o numero..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "Todos" },
            { key: "pending", label: "Pendiente" },
            { key: "ready", label: "Listo" },
            { key: "sent", label: "Enviado" },
            { key: "needs_review", label: "Revisar" },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setStatusFilter(f.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === f.key
                  ? "border-[#59a5a9] bg-[#59a5a9]/10 text-[#3d7a7d]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-8" />
                <TableHead>N.</TableHead>
                <TableHead>Trabajador</TableHead>
                <TableHead>NIF</TableHead>
                <TableHead className="text-right">Bruto</TableHead>
                <TableHead className="text-right">Liquido</TableHead>
                <TableHead className="text-right">Coste emp.</TableHead>
                <TableHead>Nomina</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((worker) => {
                const expanded = expandedId === worker.id;
                return (
                  <Fragment key={worker.id}>
                    <TableRow
                      className={cn(
                        "cursor-pointer",
                        expanded && "bg-[#59a5a9]/5"
                      )}
                      onClick={() =>
                        setExpandedId(expanded ? null : worker.id)
                      }
                    >
                      <TableCell>
                        {expanded ? (
                          <ChevronDown className="h-4 w-4 text-[#59a5a9]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-500">
                        {worker.employeeNum}
                      </TableCell>
                      <TableCell className="font-medium">
                        {worker.fullName}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {worker.nif}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {worker.bruto > 0
                          ? formatEuro(worker.bruto)
                          : ""}
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums text-[#3d7a7d]">
                        {worker.liquido > 0
                          ? formatEuro(worker.liquido)
                          : ""}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-slate-500">
                        {worker.coste > 0
                          ? formatEuro(worker.coste)
                          : ""}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {worker.payslipUrl ? (
                          <a
                            href={worker.payslipUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-[#59a5a9] hover:underline"
                          >
                            <Download className="h-3 w-3" />
                            PDF
                          </a>
                        ) : (
                          <span className="text-xs text-slate-300"></span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={worker.sendStatus} />
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 rounded-lg px-2"
                            onClick={() => setPreviewDialog(worker)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-lg px-2"
                            disabled={worker.sendStatus === "sent"}
                            onClick={() =>
                              worker.email
                                ? handleSend(worker)
                                : setEmailDialog(worker)
                            }
                          >
                            <Send className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expanded && (
                      <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableCell colSpan={10} className="p-0">
                          <WorkerDetail
                            worker={worker}
                            onNotesChange={(notes) =>
                              persist(worker.id, { notes })
                            }
                            onEmailChange={(email) =>
                              persist(worker.id, { email })
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        {filtered.length} trabajadores  Datos de Costes Mayo 2026.xlsx y nominas
        PDF
      </p>

      <EmailDialog
        worker={emailDialog}
        open={!!emailDialog}
        onClose={() => setEmailDialog(null)}
        onSave={handleSaveEmail}
        onSend={handleSend}
      />

      <PreviewDialog
        worker={previewDialog}
        open={!!previewDialog}
        onClose={() => setPreviewDialog(null)}
      />
    </div>
  );
}

function WorkerDetail({
  worker,
  onNotesChange,
  onEmailChange,
}: {
  worker: PayrollWorkerRecord;
  onNotesChange: (notes: string) => void;
  onEmailChange: (email: string) => void;
}) {
  const [notes, setNotes] = useState(worker.notes);
  const [email, setEmail] = useState(worker.email);

  return (
    <div className="grid gap-6 p-6 md:grid-cols-3">
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Devengos y deducciones
        </h4>
        <DetailLine label="Total bruto" value={worker.bruto} />
        <DetailLine
          label="Seg. Social trabajador"
          value={worker.ss}
          negative
        />
        <DetailLine label="IRPF" value={worker.irpf} negative />
        {worker.otrosDesc !== 0 && (
          <DetailLine label="Otros descuentos" value={worker.otrosDesc} negative />
        )}
        <DetailLine
          label="Total deducciones"
          value={-worker.totalDeductions}
          negative
          bold
        />
        <DetailLine label="Liquido a percibir" value={worker.liquido} bold />
        <DetailLine label="Coste empresa" value={worker.coste} />
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Nomina guardada
        </h4>
        {worker.payslipFile && (
          <p className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs text-slate-600">
            {worker.payslipFile}
          </p>
        )}
        {worker.payslipUrl && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            asChild
          >
            <a href={worker.payslipUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-3.5 w-3.5" />
              Abrir nomina PDF
            </a>
          </Button>
        )}
        {worker.sentDate && (
          <p className="text-xs text-slate-500">
            Enviada: {worker.sentDate}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Contacto y notas
        </h4>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => onEmailChange(email)}
            placeholder="email@asociacionafda.com"
            className="rounded-lg text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Notas internas</label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => onNotesChange(notes)}
            placeholder="Observaciones..."
            className="rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
}

function DetailLine({
  label,
  value,
  negative,
  bold,
}: {
  label: string;
  value: number;
  negative?: boolean;
  bold?: boolean;
}) {
  if (value === 0 && !bold) return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span
        className={cn(
          "tabular-nums",
          negative && "text-red-600/80",
          bold && "font-semibold text-slate-900"
        )}
      >
        {value < 0 || negative
          ? `-${formatEuro(Math.abs(value))}`
          : formatEuro(value)}
      </span>
    </div>
  );
}

function EmailDialog({
  worker,
  open,
  onClose,
  onSave,
  onSend,
}: {
  worker: PayrollWorkerRecord | null;
  open: boolean;
  onClose: () => void;
  onSave: (w: PayrollWorkerRecord, email: string) => void;
  onSend: (w: PayrollWorkerRecord) => void;
}) {
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (worker) setEmail(worker.email);
  }, [worker]);

  if (!worker) return null;

  const subject = `Nomina correspondiente a ${worker.month} ${worker.year}`;
  const body = `Hola ${worker.fullName.split(" ")[0]}, adjuntamos tu nomina correspondiente a ${worker.month} ${worker.year}. Un saludo, AFDA.`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Enviar nomina  {worker.fullName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            <label className="text-xs text-slate-400">Email del trabajador</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 rounded-xl"
              placeholder="nombre@email.com"
            />
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
            <p className="text-xs text-slate-400">Asunto</p>
            <p className="font-medium">{subject}</p>
            <p className="mt-2 text-xs text-slate-400">Mensaje</p>
            <p className="text-slate-600">{body}</p>
            <p className="mt-2 text-xs text-slate-400">Adjunto</p>
            <p className="text-slate-500">{worker.payslipFile}</p>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" className="rounded-xl" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => onSave(worker, email)}
            disabled={!email}
          >
            <Mail className="mr-2 h-4 w-4" />
            Guardar email
          </Button>
          <Button
            className="rounded-xl bg-[#59a5a9] hover:bg-[#4d9296]"
            onClick={() => {
              if (email && email !== worker.email) onSave(worker, email);
              onSend(worker);
            }}
            disabled={!email}
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PreviewDialog({
  worker,
  open,
  onClose,
}: {
  worker: PayrollWorkerRecord | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!worker) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Vista previa email</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-slate-400">Para: </span>
            {worker.email || "Sin email"}
          </p>
          <p>
            <span className="text-slate-400">Asunto: </span>
            Nomina correspondiente a {worker.month} {worker.year}
          </p>
          <p className="rounded-lg bg-slate-50 p-3 text-slate-600">
            Hola {worker.fullName.split(" ")[0]}, adjuntamos tu nomina
            correspondiente a {worker.month} {worker.year}. Un saludo, AFDA.
          </p>
          <p className="text-xs text-slate-400">
            Liquido: {formatEuro(worker.liquido)} | Adjunto: {worker.payslipFile}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
