import type { Room } from "@/lib/types";

export const rooms: Room[] = [
  {
    id: "room-1",
    name: "Despacho 1",
    status: "ocupado",
    currentProfessional: "Marta Giménez",
    currentBooking: "09:00 – 11:00",
    nextBooking: "12:00 — Terapia familiar",
  },
  {
    id: "room-2",
    name: "Despacho 2",
    status: "ocupado",
    currentProfessional: "Dra. Elena Martínez",
    currentBooking: "09:00 – 10:00",
    nextBooking: "10:30 — Seguimiento",
  },
  {
    id: "room-3",
    name: "Despacho 3",
    status: "disponible",
    nextBooking: "14:00 — Primera consulta",
  },
  {
    id: "room-4",
    name: "Despacho 4",
    status: "reservado",
    currentProfessional: "Dr. Pablo Ruiz",
    currentBooking: "11:00 – 12:30",
    nextBooking: "15:00 — Evaluación",
  },
  {
    id: "room-5",
    name: "Despacho 5",
    status: "disponible",
    nextBooking: "11:00 — Fisioterapia",
  },
  {
    id: "room-6",
    name: "Sala Bienestar",
    status: "ocupado",
    currentProfessional: "Laura Sánchez",
    currentBooking: "10:30 – 12:00",
    nextBooking: "17:00 — Yoga terapéutico",
  },
  {
    id: "room-7",
    name: "Sala Actividades",
    status: "disponible",
    nextBooking: "16:00 — Taller saludable",
  },
  {
    id: "room-8",
    name: "Sala Formación",
    status: "mantenimiento",
    nextBooking: "Disponible desde el 15 jun",
  },
];
