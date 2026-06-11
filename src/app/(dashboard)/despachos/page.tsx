"use client";

import { useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { rooms as initialRooms } from "@/lib/mock-data/despachos";
import type { Room, RoomStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusSummary = {
  disponible: "bg-emerald-500",
  ocupado: "bg-[#59a5a9]",
  reservado: "bg-amber-400",
  mantenimiento: "bg-slate-300",
};

export default function DespachosPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const handleCheckIn = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id && room.status === "disponible"
          ? {
              ...room,
              status: "ocupado" as RoomStatus,
              currentProfessional: "Profesional asignado",
              currentBooking: "Ahora — En curso",
            }
          : room
      )
    );
  };

  const handleCheckOut = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id && (room.status === "ocupado" || room.status === "reservado")
          ? {
              ...room,
              status: "disponible" as RoomStatus,
              currentProfessional: undefined,
              currentBooking: undefined,
            }
          : room
      )
    );
  };

  const handleReserve = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id && room.status === "disponible"
          ? {
              ...room,
              status: "reservado" as RoomStatus,
              currentProfessional: "Reserva pendiente",
              currentBooking: "Pr�xima sesión",
            }
          : room
      )
    );
  };

  const counts = {
    disponible: rooms.filter((r) => r.status === "disponible").length,
    ocupado: rooms.filter((r) => r.status === "ocupado").length,
    reservado: rooms.filter((r) => r.status === "reservado").length,
    mantenimiento: rooms.filter((r) => r.status === "mantenimiento").length,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Despachos"
        description="Gestión visual de espacios y salas — Sede Zaragoza"
      />

      <div className="flex flex-wrap gap-4">
        {(
          Object.entries(counts) as [RoomStatus, number][]
        ).map(([status, count]) => (
          <div
            key={status}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2"
          >
            <span
              className={cn("h-2.5 w-2.5 rounded-full", statusSummary[status])}
            />
            <span className="text-sm text-slate-600">
              <StatusBadge status={status} className="mr-1" />
              <span className="font-semibold text-slate-900">{count}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col rounded-xl border border-slate-200/80 bg-white p-5"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {room.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      statusSummary[room.status]
                    )}
                  />
                  <StatusBadge status={room.status} />
                </div>
              </div>
            </div>

            <div className="mb-4 flex-1 space-y-2 text-sm text-slate-500">
              {room.currentProfessional && (
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>{room.currentProfessional}</span>
                </div>
              )}
              {room.currentBooking && (
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{room.currentBooking}</span>
                </div>
              )}
              {room.nextBooking && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[#59a5a9]" />
                  <span className="text-xs text-[#59a5a9]">
                    {room.nextBooking}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="flex-1 rounded-lg bg-[#59a5a9] text-white hover:bg-[#4d9296]"
                disabled={room.status !== "disponible"}
                onClick={() => handleCheckIn(room.id)}
              >
                Check in
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 rounded-lg"
                disabled={
                  room.status !== "ocupado" && room.status !== "reservado"
                }
                onClick={() => handleCheckOut(room.id)}
              >
                Check out
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="w-full rounded-lg"
                disabled={room.status !== "disponible"}
                onClick={() => handleReserve(room.id)}
              >
                Reservar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
