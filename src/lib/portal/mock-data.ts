import type {
  DashboardSummary,
  DocumentFolder,
  Employee,
  Freelancer,
  Invoice,
} from "./types";
import payrollRaw from "@/lib/payroll/real-data.json";

const ROLES = [
  "Psicologo/a",
  "Neuropsicologo/a",
  "Fisioterapeuta",
  "Nutricionista",
  "Administrativo/a",
  "Coordinador/a",
  "Tecnico/a",
];

const CONTRACTS = ["Indefinido", "Temporal", "Parcial", "Interinidad"];

function inferRole(name: string, idx: number): string {
  const n = name.toLowerCase();
  if (n.includes("martinez") && idx % 7 === 0) return "Neuropsicologo/a";
  if (n.includes("prieto") || n.includes("romero")) return "Administrativo/a";
  if (n.includes("gimenez") && idx % 5 === 0) return "Nutricionista";
  if (n.includes("herrera") || n.includes("vela") || n.includes("aznar"))
    return "Fisioterapeuta";
  if (n.includes("gimenez soler") || n.includes("marta")) return "Coordinador/a";
  return ROLES[idx % ROLES.length];
}

export const employees: Employee[] = (payrollRaw as {
  id: string;
  fullName: string;
  nif: string;
  bruto: number;
  liquido: number;
  payslipUrl?: string;
  sendStatus: string;
}[])
  .filter((w) => w.bruto > 0)
  .map((w, idx) => {
    const complements = Math.round(w.bruto * 0.08 * 100) / 100;
    const payrollStatus =
      w.sendStatus === "sent"
        ? "al_dia"
        : w.sendStatus === "needs_review"
          ? "revisar"
          : "pendiente";
    return {
      id: w.id,
      name: w.fullName,
      role: inferRole(w.fullName, idx),
      contractType: CONTRACTS[idx % CONTRACTS.length],
      email: `${w.fullName.split(" ")[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@asociacionafda.com`,
      nif: w.nif,
      grossSalary: w.bruto,
      complements,
      payrollStatus: payrollStatus as Employee["payrollStatus"],
      documentsCount: 2 + (idx % 4),
      notes: idx % 5 === 0 ? "Revision anual de documentacion pendiente" : "",
      payslips: [
        {
          month: "Mayo",
          year: 2026,
          bruto: w.bruto,
          liquido: w.liquido,
          file: w.payslipUrl,
        },
        {
          month: "Abril",
          year: 2026,
          bruto: Math.round(w.bruto * 0.98 * 100) / 100,
          liquido: Math.round(w.liquido * 0.98 * 100) / 100,
        },
      ],
    };
  });

export const freelancers: Freelancer[] = [
  {
    id: "f-1",
    name: "Joaquin Domingo Garcia",
    specialty: "Psicologia clinica",
    nifCif: "73160247F",
    email: "j.domingo@externo.com",
    rate: 45,
    invoicesUploaded: 5,
    detectedSessions: 57,
    monthlyTotal: 2565,
    reviewStatus: "revisada",
    notes: "Facturas trimestrales. Enero 25 sesiones, febrero 32.",
  },
  {
    id: "f-2",
    name: "Patricia Vega Soto",
    specialty: "Neuropsicologia",
    nifCif: "688442117P",
    email: "p.vega@externo.com",
    rate: 55,
    invoicesUploaded: 3,
    detectedSessions: 28,
    monthlyTotal: 1540,
    reviewStatus: "pendiente",
    notes: "",
  },
  {
    id: "f-3",
    name: "Carlos Mena Ruiz",
    specialty: "Fisioterapia",
    nifCif: "B50902873",
    email: "c.mena@autonomo.com",
    rate: 40,
    invoicesUploaded: 4,
    detectedSessions: 41,
    monthlyTotal: 1640,
    reviewStatus: "revisada",
    notes: "Colaboracion sede Bulbuente",
  },
  {
    id: "f-4",
    name: "Lucia Fernandez Aragon",
    specialty: "Nutricion",
    nifCif: "72988123K",
    email: "l.fernandez@autonomo.com",
    rate: 38,
    invoicesUploaded: 2,
    detectedSessions: 18,
    monthlyTotal: 684,
    reviewStatus: "en_revision",
    notes: "Revisar numero de sesiones en factura de marzo",
  },
  {
    id: "f-5",
    name: "Miguel Santos Prieto",
    specialty: "Formacion",
    nifCif: "25488190H",
    email: "m.santos@autonomo.com",
    rate: 50,
    invoicesUploaded: 1,
    detectedSessions: 8,
    monthlyTotal: 400,
    reviewStatus: "pendiente",
    notes: "",
  },
];

export const invoices: Invoice[] = [
  {
    id: "inv-1",
    professionalId: "f-1",
    professionalName: "Joaquin Domingo Garcia",
    professionalType: "autonomo",
    month: "Enero",
    year: 2025,
    sessions: 25,
    amount: 1125,
    status: "pagada",
    fileName: "factura_joaquin_enero_2025.pdf",
  },
  {
    id: "inv-2",
    professionalId: "f-1",
    professionalName: "Joaquin Domingo Garcia",
    professionalType: "autonomo",
    month: "Febrero",
    year: 2025,
    sessions: 32,
    amount: 1440,
    status: "pagada",
    fileName: "factura_joaquin_febrero_2025.pdf",
  },
  {
    id: "inv-3",
    professionalId: "f-1",
    professionalName: "Joaquin Domingo Garcia",
    professionalType: "autonomo",
    month: "Marzo",
    year: 2025,
    sessions: 28,
    amount: 1260,
    status: "revisar",
    fileName: "factura_joaquin_marzo_2025.pdf",
  },
  {
    id: "inv-4",
    professionalId: "f-2",
    professionalName: "Patricia Vega Soto",
    professionalType: "externo",
    month: "Mayo",
    year: 2026,
    sessions: 12,
    amount: 660,
    status: "pendiente",
    fileName: "factura_patricia_mayo_2026.pdf",
  },
  {
    id: "inv-5",
    professionalId: "f-3",
    professionalName: "Carlos Mena Ruiz",
    professionalType: "autonomo",
    month: "Mayo",
    year: 2026,
    sessions: 18,
    amount: 720,
    status: "pagada",
    fileName: "factura_carlos_mayo_2026.pdf",
  },
  {
    id: "inv-6",
    professionalId: "f-4",
    professionalName: "Lucia Fernandez Aragon",
    professionalType: "autonomo",
    month: "Mayo",
    year: 2026,
    sessions: 10,
    amount: 380,
    status: "revisar",
    fileName: "factura_lucia_mayo_2026.pdf",
  },
  {
    id: "inv-7",
    professionalId: "f-5",
    professionalName: "Miguel Santos Prieto",
    professionalType: "autonomo",
    month: "Mayo",
    year: 2026,
    sessions: 8,
    amount: 400,
    status: "pendiente",
    fileName: "factura_miguel_mayo_2026.pdf",
  },
];

export const documentFolders: DocumentFolder[] = [
  ...employees.slice(0, 8).map((e, i) => ({
    id: `doc-e-${e.id}`,
    ownerId: e.id,
    ownerName: e.name,
    ownerType: "trabajador" as const,
    folderName: `Expediente ${e.name.split(" ")[0]}`,
    filesCount: e.documentsCount,
    status: (i % 4 === 0 ? "pendiente" : "completo") as DocumentFolder["status"],
    lastUpdated: `${10 + i} jun 2026`,
  })),
  ...freelancers.map((f, i) => ({
    id: `doc-f-${f.id}`,
    ownerId: f.id,
    ownerName: f.name,
    ownerType: "autonomo" as const,
    folderName: `Facturas y contratos`,
    filesCount: f.invoicesUploaded + 1,
    status: (f.reviewStatus === "pendiente"
      ? "pendiente"
      : "completo") as DocumentFolder["status"],
    lastUpdated: `${5 + i} jun 2026`,
  })),
];

export const dashboardSummary: DashboardSummary = {
  activeEmployees: employees.length,
  activeFreelancers: freelancers.length,
  pendingPayrolls: employees.filter(
    (e) => e.payrollStatus === "pendiente" || e.payrollStatus === "revisar"
  ).length,
  pendingInvoices: invoices.filter((i) => i.status === "pendiente").length,
  pendingDocuments: documentFolders.filter((d) => d.status === "pendiente")
    .length,
  monthlyAlerts: 6,
};

export const monthlyAlerts = [
  "12 nominas de mayo pendientes de envio",
  "3 facturas de autonomos en revision",
  "2 expedientes de trabajadores incompletos",
  "1 contrato temporal proximo a vencer",
  "Revision trimestral IASS pendiente",
  "Silvia Lopez: nomina sin datos en Excel",
];
