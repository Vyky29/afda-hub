import { Shield } from "lucide-react";

export function PrivacyNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/50 px-4 py-3">
      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      <div className="text-xs leading-relaxed text-amber-900/80">
        <p className="font-medium text-amber-900">
          Documentacion confidencial
        </p>
        <p className="mt-0.5">
          Las nominas son documentos sensibles protegidos por la normativa de
          proteccion de datos. Solo personal administrativo autorizado puede
          acceder a este modulo. No compartas archivos ni datos fuera de los
          canales oficiales de AFDA.
        </p>
      </div>
    </div>
  );
}
