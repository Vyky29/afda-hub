import type { AgendaItem, Activity, DashboardStats, Room } from "@/lib/types";

export const dashboardStats: DashboardStats = {
  sessionsToday: 14,
  activeProfessionals: 9,
  occupiedRooms: 5,
  activitiesToday: 6,
  pendingFinanceTasks: 4,
};

export const todayAgenda: AgendaItem[] = [
  {
    id: "ta-1",
    title: "Sesión individual — Ansiedad",
    type: "terapia",
    professional: "Dra. Elena Martínez",
    room: "Despacho 2",
    day: "Jueves",
    time: "09:00",
    endTime: "10:00",
    status: "confirmada",
  },
  {
    id: "ta-2",
    title: "Grupo terapéutico — Gestión emocional",
    type: "grupo",
    professional: "Laura Sánchez",
    room: "Sala Bienestar",
    day: "Jueves",
    time: "10:30",
    endTime: "12:00",
    status: "en_curso",
  },
  {
    id: "ta-3",
    title: "Neuropsicología — Evaluación",
    type: "terapia",
    professional: "Dr. Pablo Ruiz",
    room: "Despacho 4",
    day: "Jueves",
    time: "11:00",
    endTime: "12:30",
    status: "confirmada",
  },
  {
    id: "ta-4",
    title: "Taller saludable — Alimentación consciente",
    type: "grupo",
    professional: "Carmen Ortega",
    room: "Sala Actividades",
    day: "Jueves",
    time: "16:00",
    endTime: "17:30",
    status: "pendiente",
  },
];

export const roomAvailability: Room[] = [
  {
    id: "r-1",
    name: "Despacho 1",
    status: "ocupado",
    currentProfessional: "Marta Giménez",
    currentBooking: "09:00 – 11:00",
    nextBooking: "12:00 — Terapia familiar",
  },
  {
    id: "r-2",
    name: "Despacho 2",
    status: "ocupado",
    currentProfessional: "Dra. Elena Martínez",
    currentBooking: "09:00 – 10:00",
    nextBooking: "10:30 — Seguimiento",
  },
  {
    id: "r-3",
    name: "Despacho 3",
    status: "disponible",
    nextBooking: "14:00 — Primera consulta",
  },
  {
    id: "r-4",
    name: "Despacho 4",
    status: "reservado",
    currentProfessional: "Dr. Pablo Ruiz",
    currentBooking: "11:00 – 12:30",
    nextBooking: "15:00 — Evaluación",
  },
  {
    id: "r-5",
    name: "Sala Bienestar",
    status: "ocupado",
    currentProfessional: "Laura Sánchez",
    currentBooking: "10:30 – 12:00",
    nextBooking: "17:00 — Yoga terapéutico",
  },
  {
    id: "r-6",
    name: "Sala Actividades",
    status: "disponible",
    nextBooking: "16:00 — Taller saludable",
  },
];

export const recentActivities: Activity[] = [
  {
    id: "ra-1",
    title: "Juecharla — Cuidar desde la comunidad",
    category: "Juecharlas",
    date: "10 jun 2026",
    professional: "Ana Belén Torres",
    participants: 18,
    maxParticipants: 25,
    objective: "Reflexionar sobre redes de apoyo mutuo",
    attendance: "completa",
    notes: "Buena participación y clima de confianza",
  },
  {
    id: "ra-2",
    title: "Grupo de bienestar — Movimiento consciente",
    category: "Grupos para el bienestar",
    date: "9 jun 2026",
    professional: "Sofía Herrera",
    participants: 12,
    maxParticipants: 15,
    objective: "Conectar cuerpo y regulación emocional",
    attendance: "parcial",
    notes: "2 ausencias por motivos médicos",
  },
  {
    id: "ra-3",
    title: "Saberes Compartidos — Gestión del estrés",
    category: "Saberes compartidos",
    date: "8 jun 2026",
    professional: "Javier Molina",
    participants: 22,
    maxParticipants: 22,
    objective: "Intercambiar estrategias de afrontamiento",
    attendance: "completa",
    notes: "Lista de espera activa para próxima convocatoria",
  },
];

export const financeAlerts = [
  {
    id: "fa-1",
    title: "Justificación trimestral IASS",
    description: "Documentación pendiente de revisión antes del 15 de junio",
    priority: "alta" as const,
  },
  {
    id: "fa-2",
    title: "Nóminas mayo sin validar",
    description: "3 nóminas pendientes de firma del responsable",
    priority: "media" as const,
  },
  {
    id: "fa-3",
    title: "Gasto de material terapéutico",
    description: "Factura de 342 € esperando aprobación",
    priority: "baja" as const,
  },
];
