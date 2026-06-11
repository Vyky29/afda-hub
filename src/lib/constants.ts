import {
  CalendarDays,
  LayoutDashboard,
  DoorOpen,
  Sparkles,
  Wallet,
} from "lucide-react";

export const AFDA_GREEN = "#59a5a9";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Agenda",
    href: "/agenda",
    icon: CalendarDays,
  },
  {
    title: "Despachos",
    href: "/despachos",
    icon: DoorOpen,
  },
  {
    title: "Actividades",
    href: "/actividades",
    icon: Sparkles,
  },
  {
    title: "Finanzas",
    href: "/finanzas",
    icon: Wallet,
  },
] as const;

export const WEEK_DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
] as const;
