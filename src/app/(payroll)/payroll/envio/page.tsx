"use client";

import { useState } from "react";
import { PageHeader } from "@/components/payroll/page-header";
import { SendPayslipPanel } from "@/components/payroll/send-payslip-panel";
import { EmailPreviewDialog } from "@/components/payroll/email-preview-dialog";
import { sendPayslips as initialItems } from "@/lib/payroll/mock-data";
import type { SendPayslipItem } from "@/lib/payroll/types";

export default function EnvioPage() {
  const [items, setItems] = useState<SendPayslipItem[]>(
    initialItems.map((i) => ({ ...i, selected: false }))
  );
  const [previewItem, setPreviewItem] = useState<SendPayslipItem | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const toggleSelect = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = (checked: boolean) => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: checked })));
  };

  const markSent = (ids: string[]) => {
    setItems((prev) =>
      prev.map((item) =>
        ids.includes(item.id)
          ? { ...item, status: "sent" as const, selected: false }
          : item
      )
    );
  };

  const handleSendSelected = () => {
    const ids = items.filter((i) => i.selected).map((i) => i.id);
    markSent(ids);
  };

  const handleSendAllReady = () => {
    const ids = items
      .filter((i) => i.status === "ready")
      .map((i) => i.id);
    markSent(ids);
  };

  const handlePreview = (item: SendPayslipItem) => {
    setPreviewItem(item);
    setPreviewOpen(true);
  };

  const handleMarkManual = (id: string) => {
    markSent([id]);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Envio de nominas"
        description="Revisa y envia las nominas a cada trabajador por email"
      />

      <SendPayslipPanel
        items={items}
        onToggleSelect={toggleSelect}
        onToggleAll={toggleAll}
        onSendSelected={handleSendSelected}
        onSendAllReady={handleSendAllReady}
        onPreview={handlePreview}
        onMarkManual={handleMarkManual}
      />

      <EmailPreviewDialog
        item={previewItem}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
}
