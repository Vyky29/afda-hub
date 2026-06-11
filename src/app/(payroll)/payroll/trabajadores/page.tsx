"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/payroll/page-header";
import { WorkerTable } from "@/components/payroll/worker-table";
import { WorkerProfileDialog } from "@/components/payroll/worker-profile-dialog";
import { workers as allWorkers } from "@/lib/payroll/mock-data";
import type { Worker } from "@/lib/payroll/types";

export default function TrabajadoresPage() {
  const [search, setSearch] = useState("");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = allWorkers.filter(
    (w) =>
      w.fullName.toLowerCase().includes(search.toLowerCase()) ||
      w.role.toLowerCase().includes(search.toLowerCase()) ||
      w.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (worker: Worker) => {
    setSelectedWorker(worker);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Registro de trabajadores"
        description="Base de datos de profesionales y personal de AFDA"
      >
        <Button className="rounded-xl bg-[#59a5a9] hover:bg-[#4d9296]">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo trabajador
        </Button>
      </PageHeader>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Buscar por nombre, rol o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl pl-10"
        />
      </div>

      <WorkerTable workers={filtered} onSelectWorker={handleSelect} />

      <WorkerProfileDialog
        worker={selectedWorker}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
