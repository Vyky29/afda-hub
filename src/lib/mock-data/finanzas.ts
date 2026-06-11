import type { Gasto, Nomina, Subvencion } from "@/lib/types";

export const financeSummary = {
  activeFunding: 287500,
  pendingJustification: 42300,
  monthlyPayroll: 38420,
  monthlyExpenses: 12680,
};

export const subvenciones: Subvencion[] = [
  {
    id: "sub-1",
    fundingBody: "Instituto Aragonés de Servicios Sociales (IASS)",
    amount: 95000,
    status: "activa",
    deadline: "15 jun 2026",
    project: "Intervención terapéutica comunitaria",
  },
  {
    id: "sub-2",
    fundingBody: "Gobierno de Aragón — Economía Social",
    amount: 72000,
    status: "pendiente",
    deadline: "30 jun 2026",
    project: "Redes de apoyo mutuo en salud mental",
  },
  {
    id: "sub-3",
    fundingBody: "Ayuntamiento de Zaragoza",
    amount: 35000,
    status: "activa",
    deadline: "20 jul 2026",
    project: "Actividades de bienestar en barrios",
  },
  {
    id: "sub-4",
    fundingBody: "Fundación La Caixa",
    amount: 45000,
    status: "justificada",
    deadline: "10 may 2026",
    project: "Saberes Compartidos XVI",
  },
  {
    id: "sub-5",
    fundingBody: "Diputación Provincial de Huesca",
    amount: 28500,
    status: "vencida",
    deadline: "1 jun 2026",
    project: "Atención en sede de Huesca",
  },
];

export const nominas: Nomina[] = [
  {
    id: "nom-1",
    employee: "Dra. Elena Martínez",
    month: "Mayo 2026",
    status: "pagada",
    documentUploaded: true,
  },
  {
    id: "nom-2",
    employee: "Laura Sánchez",
    month: "Mayo 2026",
    status: "pagada",
    documentUploaded: true,
  },
  {
    id: "nom-3",
    employee: "Dr. Pablo Ruiz",
    month: "Mayo 2026",
    status: "pendiente",
    documentUploaded: false,
  },
  {
    id: "nom-4",
    employee: "Marta Giménez",
    month: "Mayo 2026",
    status: "pendiente",
    documentUploaded: true,
  },
  {
    id: "nom-5",
    employee: "Carmen Ortega",
    month: "Mayo 2026",
    status: "aprobada",
    documentUploaded: true,
  },
  {
    id: "nom-6",
    employee: "Sofía Herrera",
    month: "Mayo 2026",
    status: "pagada",
    documentUploaded: true,
  },
];

export const gastos: Gasto[] = [
  {
    id: "gas-1",
    category: "Material terapéutico",
    amount: 342,
    date: "8 jun 2026",
    status: "pendiente",
  },
  {
    id: "gas-2",
    category: "Suministros oficina",
    amount: 128.5,
    date: "5 jun 2026",
    status: "aprobada",
  },
  {
    id: "gas-3",
    category: "Formación profesional",
    amount: 890,
    date: "3 jun 2026",
    status: "pagada",
  },
  {
    id: "gas-4",
    category: "Mantenimiento instalaciones",
    amount: 1250,
    date: "1 jun 2026",
    status: "aprobada",
  },
  {
    id: "gas-5",
    category: "Transporte actividades",
    amount: 215,
    date: "28 may 2026",
    status: "pagada",
  },
  {
    id: "gas-6",
    category: "Seguros",
    amount: 480,
    date: "25 may 2026",
    status: "pagada",
  },
];
