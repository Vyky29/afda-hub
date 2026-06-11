export type RoomStatus = "disponible" | "ocupado" | "reservado" | "mantenimiento";

export type SessionStatus = "confirmada" | "en_curso" | "pendiente" | "cancelada";

export type FinanceStatus =
  | "activa"
  | "pendiente"
  | "justificada"
  | "vencida"
  | "pagada"
  | "aprobada"
  | "rechazada";

export type ActivityCategory =
  | "Grupos terapéuticos"
  | "Grupos para el bienestar"
  | "Talleres saludables"
  | "Arte y salud"
  | "Juecharlas"
  | "Deporte y bienestar"
  | "Saberes compartidos"
  | "Espacios de socialización";

export type AttendanceStatus = "completa" | "parcial" | "pendiente" | "cancelada";

export interface AgendaItem {
  id: string;
  title: string;
  type: "terapia" | "grupo" | "reserva";
  professional: string;
  room: string;
  day: string;
  time: string;
  endTime: string;
  status: SessionStatus;
}

export interface Room {
  id: string;
  name: string;
  status: RoomStatus;
  currentProfessional?: string;
  currentBooking?: string;
  nextBooking?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  date: string;
  professional: string;
  participants: number;
  maxParticipants: number;
  objective: string;
  attendance: AttendanceStatus;
  notes: string;
}

export interface Subvencion {
  id: string;
  fundingBody: string;
  amount: number;
  status: FinanceStatus;
  deadline: string;
  project: string;
}

export interface Nomina {
  id: string;
  employee: string;
  month: string;
  status: FinanceStatus;
  documentUploaded: boolean;
}

export interface Gasto {
  id: string;
  category: string;
  amount: number;
  date: string;
  status: FinanceStatus;
}

export interface DashboardStats {
  sessionsToday: number;
  activeProfessionals: number;
  occupiedRooms: number;
  activitiesToday: number;
  pendingFinanceTasks: number;
}
