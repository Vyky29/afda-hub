import { LayoutDashboard, Settings } from "lucide-react";

export const PAYROLL_NAV = [
  { title: "Nominas Mayo 2026", href: "/payroll", icon: LayoutDashboard },
  { title: "Ajustes", href: "/payroll/ajustes", icon: Settings },
] as const;

export const WORKER_ROLES = [
  "Psicologo/a",
  "Neuropsicologo/a",
  "Fisioterapeuta",
  "Nutricionista",
  "Administrativo/a",
  "Coordinador/a",
  "Otro",
] as const;

export const WORK_CENTRES = [
  "Zaragoza - Sta. Lucia",
  "Huesca - Berenguer",
  "Bulbuente",
  "Remoto",
] as const;

export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;
