"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { InvoicesTable } from "@/components/portal/invoices-table";
import { invoices } from "@/lib/portal/mock-data";

export default function FacturasPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Facturas"
        description="Registro de facturas de autonomos y profesionales externos"
      >
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => alert("Subida simulada  prototipo")}
        >
          <Upload className="mr-2 h-4 w-4" />
          Subir factura
        </Button>
      </PageHeader>

      <Card className="border-dashed border-slate-300 bg-white shadow-none">
        <CardContent className="py-8 text-center text-sm text-slate-400">
          Prototipo: arrastra facturas PDF aqui. El sistema detectara sesiones e
          importe automaticamente.
        </CardContent>
      </Card>

      <InvoicesTable invoices={invoices} />
    </div>
  );
}
