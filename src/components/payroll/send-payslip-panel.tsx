"use client";

import { Eye, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/payroll/status-badge";
import type { SendPayslipItem } from "@/lib/payroll/types";

interface SendPayslipPanelProps {
  items: SendPayslipItem[];
  onToggleSelect: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onSendSelected: () => void;
  onSendAllReady: () => void;
  onPreview: (item: SendPayslipItem) => void;
  onMarkManual: (id: string) => void;
}

export function SendPayslipPanel({
  items,
  onToggleSelect,
  onToggleAll,
  onSendSelected,
  onSendAllReady,
  onPreview,
  onMarkManual,
}: SendPayslipPanelProps) {
  const selectedCount = items.filter((i) => i.selected).length;
  const readyCount = items.filter((i) => i.status === "ready").length;
  const allSelected = items.length > 0 && selectedCount === items.length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          className="rounded-xl bg-[#59a5a9] hover:bg-[#4d9296]"
          onClick={onSendSelected}
          disabled={selectedCount === 0}
        >
          <Send className="mr-2 h-4 w-4" />
          Enviar seleccionados ({selectedCount})
        </Button>
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={onSendAllReady}
          disabled={readyCount === 0}
        >
          Enviar todos listos ({readyCount})
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => onToggleAll(!!checked)}
                />
              </TableHead>
              <TableHead>Trabajador</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Archivo</TableHead>
              <TableHead>Periodo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={item.selected}
                    onCheckedChange={() => onToggleSelect(item.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {item.workerName}
                </TableCell>
                <TableCell>
                  {item.email || (
                    <span className="text-red-600">Sin email</span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-slate-500">
                  {item.payslipFile}
                </TableCell>
                <TableCell>
                  {item.month} {item.year}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-lg"
                      onClick={() => onPreview(item)}
                    >
                      <Eye className="mr-1 h-3.5 w-3.5" />
                      Vista previa
                    </Button>
                    {item.status !== "sent" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => onMarkManual(item.id)}
                      >
                        <Mail className="mr-1 h-3.5 w-3.5" />
                        Marcar enviado
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
