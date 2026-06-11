import { Lock, ShieldAlert } from "lucide-react";

export function SalaryPrivacyBanner() {
  return (
    <div className="rounded-xl border border-red-200/80 bg-red-50/40 px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100">
          <ShieldAlert className="h-4 w-4 text-red-600" />
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-red-900">
            Datos salariales confidenciales
          </p>
          <p className="leading-relaxed text-red-800/80">
            Esta seccion contiene informacion salarial protegida. Solo usuarios
            administrativos autorizados pueden acceder. No compartas, exportes ni
            copies estos datos fuera de los canales oficiales de AFDA.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-red-700/70">
            <Lock className="h-3 w-3" />
            Los importes salariales solo son visibles en Estructura Salarial.
          </p>
        </div>
      </div>
    </div>
  );
}
