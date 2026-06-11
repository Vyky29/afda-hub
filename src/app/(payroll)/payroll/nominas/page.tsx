"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/payroll/page-header";
import { PayrollUploadList } from "@/components/payroll/payroll-upload-list";
import { MatchReviewDialog } from "@/components/payroll/match-review-dialog";
import {
  payrollDocuments as initialDocs,
  workers,
} from "@/lib/payroll/mock-data";
import type { PayrollDocument } from "@/lib/payroll/types";

export default function NominasPage() {
  const [documents, setDocuments] =
    useState<PayrollDocument[]>(initialDocs);
  const [reviewDoc, setReviewDoc] = useState<PayrollDocument | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);

  const handleReview = (doc: PayrollDocument) => {
    setReviewDoc(doc);
    setReviewOpen(true);
  };

  const handleConfirmMatch = (documentId: string, workerId: string) => {
    const worker = workers.find((w) => w.id === workerId);
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              workerId,
              detectedWorker: worker?.fullName ?? null,
              status: "ready_to_send" as const,
            }
          : doc
      )
    );
    setReviewOpen(false);
    setReviewDoc(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Subida y clasificacion"
        description="Carga las nominas mensuales y revisa la coincidencia automatica"
      />

      <Card className="border-dashed border-slate-300 bg-white shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#59a5a9]/10">
            <Upload className="h-6 w-6 text-[#59a5a9]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-900">
              Arrastra archivos PDF aqui
            </p>
            <p className="text-xs text-slate-400">
              Prototipo: se muestran archivos de ejemplo precargados
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => alert("Subida simulada — prototipo frontend")}
          >
            Seleccionar archivos
          </Button>
        </CardContent>
      </Card>

      <PayrollUploadList documents={documents} onReview={handleReview} />

      <MatchReviewDialog
        document={reviewDoc}
        workers={workers}
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        onConfirm={handleConfirmMatch}
      />
    </div>
  );
}
