export type WorkerRole =
  | "Psicologo/a"
  | "Neuropsicologo/a"
  | "Fisioterapeuta"
  | "Nutricionista"
  | "Administrativo/a"
  | "Coordinador/a"
  | "Otro";

export type WorkerStatus = "activo" | "inactivo" | "baja";

export type ClassificationStatus =
  | "matched"
  | "needs_review"
  | "missing_worker"
  | "duplicate"
  | "ready_to_send";

export type SendStatus =
  | "ready"
  | "sent"
  | "pending"
  | "failed"
  | "needs_review";

export type TrackingStatus =
  | "uploaded"
  | "sent"
  | "pending"
  | "failed"
  | "needs_review";

export interface Worker {
  id: string;
  fullName: string;
  role: WorkerRole;
  email: string;
  phone: string;
  workCentre: string;
  status: WorkerStatus;
  payrollFolder: string;
  lastPayslipSent: string | null;
  notes: string;
  startDate: string;
  contractType: string;
}

export interface PayrollDocument {
  id: string;
  fileName: string;
  detectedWorker: string | null;
  workerId: string | null;
  month: string;
  year: number;
  status: ClassificationStatus;
}

export interface SendPayslipItem {
  id: string;
  workerId: string;
  workerName: string;
  email: string;
  payslipFile: string;
  month: string;
  year: number;
  status: SendStatus;
  selected?: boolean;
}

export interface TrackingRecord {
  id: string;
  workerId: string;
  workerName: string;
  role: WorkerRole;
  month: string;
  year: number;
  payslipUploaded: boolean;
  emailMatched: boolean;
  sentDate: string | null;
  confirmationStatus: TrackingStatus;
  issueNotes: string;
}

export interface PayrollSettings {
  payrollMonth: string;
  payrollYear: number;
  defaultSenderEmail: string;
  emailSubject: string;
  emailBody: string;
  workerCategories: WorkerRole[];
  folderStructure: string;
}

export interface DashboardStats {
  monthlyStatus: "en_proceso" | "completado" | "pendiente";
  totalWorkers: number;
  payslipsUploaded: number;
  payslipsSent: number;
  pendingPayslips: number;
  errorsOrMissingEmails: number;
  progressPercent: number;
}

export type ReviewStatus = "reviewed" | "pending_review" | "in_review";

export interface SalaryStructureRecord {
  id: string;
  workerId: string;
  workerName: string;
  dniNie: string;
  professionalCategory: WorkerRole;
  month: string;
  year: number;
  workedDays: number;
  baseSalary: number;
  extraPay: number;
  specificComplement: number;
  otherComplements: number;
  grossTotal: number;
  socialSecurityDeduction: number;
  irpfDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;
  companyCost: number;
  payslipFile: string;
  reviewStatus: ReviewStatus;
  sendStatus: SendStatus;
  sentDate: string | null;
  notes: string;
}

export interface SalaryStructureSummary {
  totalGross: number;
  totalNet: number;
  totalCompanyCost: number;
  payslipsReviewed: number;
  payslipsPendingReview: number;
}
