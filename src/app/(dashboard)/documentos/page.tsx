"use client";

import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { PortalStatusBadge } from "@/components/portal/status-badge";
import { documentFolders } from "@/lib/portal/mock-data";

export default function DocumentosPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Documentos"
        description="Carpetas y expedientes por trabajador y autonomo"
      >
        <Button className="rounded-xl bg-[#59a5a9] hover:bg-[#4d9296]">
          <Plus className="mr-2 h-4 w-4" />
          Nueva carpeta
        </Button>
      </PageHeader>

      <div className="rounded-xl border border-slate-200/80 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Persona</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Carpeta</TableHead>
              <TableHead>Archivos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Actualizado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentFolders.map((doc) => (
              <TableRow key={doc.id} className="cursor-pointer">
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-[#59a5a9]" />
                    {doc.ownerName}
                  </span>
                </TableCell>
                <TableCell className="capitalize text-slate-500">
                  {doc.ownerType}
                </TableCell>
                <TableCell>{doc.folderName}</TableCell>
                <TableCell>{doc.filesCount}</TableCell>
                <TableCell>
                  <PortalStatusBadge status={doc.status} />
                </TableCell>
                <TableCell className="text-slate-500">
                  {doc.lastUpdated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
