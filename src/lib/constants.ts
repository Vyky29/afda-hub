import {
  FileText,
  FolderOpen,
  LayoutDashboard,
  Receipt,
  UserCog,
  Users,
  UserSquare2,
} from "lucide-react";

export const AFDA_GREEN = "#59a5a9";

export const NAV_ITEMS = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Profesionales", href: "/profesionales", icon: UserCog },
  { title: "Trabajadores", href: "/trabajadores", icon: Users },
  { title: "Autonomos", href: "/autonomos", icon: UserSquare2 },
  { title: "Facturas", href: "/facturas", icon: Receipt },
  { title: "Documentos", href: "/documentos", icon: FolderOpen },
] as const;
