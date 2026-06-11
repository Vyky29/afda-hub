export type PayrollStatus = "al_dia" | "pendiente" | "revisar" | "sin_nomina";

export type ReviewStatus = "revisada" | "pendiente" | "en_revision";

export type InvoiceStatus = "pagada" | "pendiente" | "revisar" | "rechazada";

export type DocumentStatus = "completo" | "pendiente" | "vencido";

export interface Employee {
  id: string;
  name: string;
  role: string;
  contractType: string;
  email: string;
  nif: string;
  grossSalary: number;
  complements: number;
  payrollStatus: PayrollStatus;
  documentsCount: number;
  notes: string;
  payslips: { month: string; year: number; bruto: number; liquido: number; file?: string }[];
}

export interface Freelancer {
  id: string;
  name: string;
  specialty: string;
  nifCif: string;
  email: string;
  rate: number;
  invoicesUploaded: number;
  detectedSessions: number;
  monthlyTotal: number;
  reviewStatus: ReviewStatus;
  notes: string;
}

export interface Invoice {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalType: "autonomo" | "externo";
  month: string;
  year: number;
  sessions: number;
  amount: number;
  status: InvoiceStatus;
  fileName: string;
}

export interface DocumentFolder {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerType: "trabajador" | "autonomo";
  folderName: string;
  filesCount: number;
  status: DocumentStatus;
  lastUpdated: string;
}

export interface DashboardSummary {
  activeEmployees: number;
  activeFreelancers: number;
  pendingPayrolls: number;
  pendingInvoices: number;
  pendingDocuments: number;
  monthlyAlerts: number;
}
