import type { PayrollWorkerRecord } from "./types";
import rawData from "./real-data.json";

export const payrollWorkers: PayrollWorkerRecord[] =
  rawData as PayrollWorkerRecord[];

export function getPayrollSummary(workers: PayrollWorkerRecord[]) {
  const withData = workers.filter((w) => w.bruto > 0);
  return {
    totalWorkers: workers.length,
    totalBruto: withData.reduce((s, w) => s + w.bruto, 0),
    totalLiquido: withData.reduce((s, w) => s + w.liquido, 0),
    totalCoste: withData.reduce((s, w) => s + w.coste, 0),
    sent: workers.filter((w) => w.sendStatus === "sent").length,
    pending: workers.filter(
      (w) => w.sendStatus === "pending" || w.sendStatus === "ready"
    ).length,
    needsAction: workers.filter(
      (w) =>
        w.sendStatus === "failed" ||
        w.sendStatus === "needs_review" ||
        !w.email
    ).length,
  };
}
