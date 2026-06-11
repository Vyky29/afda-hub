import {
  BarChart3,
  LayoutDashboard,
  Send,
  Settings,
  TableProperties,
  Upload,
  Users,
} from "lucide-react";

export const PAYROLL_NAV = [
  { title: "Dashboard", href: "/payroll", icon: LayoutDashboard },
  { title: "Trabajadores", href: "/payroll/trabajadores", icon: Users },
  {
    title: "Estructura Salarial",
    href: "/payroll/estructura-salarial",
    icon: TableProperties,
  },
  { title: "Nominas", href: "/payroll/nominas", icon: Upload },
  { title: "Envio", href: "/payroll/envio", icon: Send },
  { title: "Seguimiento", href: "/payroll/seguimiento", icon: BarChart3 },
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
