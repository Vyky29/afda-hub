"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/payroll/page-header";
import { payrollSettings as initialSettings } from "@/lib/payroll/mock-data";
import { useState } from "react";

export default function AjustesPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Ajustes"
        description="Configuracion del modulo de nominas"
      >
        <Button
          className="rounded-xl bg-[#59a5a9] hover:bg-[#4d9296]"
          onClick={handleSave}
        >
          {saved ? "Guardado" : "Guardar cambios"}
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/80 bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Periodo de nomina</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mes</Label>
                <Input
                  value={settings.payrollMonth}
                  onChange={(e) =>
                    setSettings({ ...settings, payrollMonth: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Ano</Label>
                <Input
                  type="number"
                  value={settings.payrollYear}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payrollYear: Number(e.target.value),
                    })
                  }
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Email de envio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Remitente por defecto</Label>
              <Input
                value={settings.defaultSenderEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultSenderEmail: e.target.value,
                  })
                }
                className="rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Plantilla de email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Asunto</Label>
              <Input
                value={settings.emailSubject}
                onChange={(e) =>
                  setSettings({ ...settings, emailSubject: e.target.value })
                }
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Cuerpo del mensaje</Label>
              <Textarea
                value={settings.emailBody}
                onChange={(e) =>
                  setSettings({ ...settings, emailBody: e.target.value })
                }
                rows={4}
                className="rounded-xl"
              />
              <p className="text-xs text-slate-400">
                Variables: [nombre], [mes], [ano]
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Categorias de trabajador</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {settings.workerCategories.map((cat) => (
                <li
                  key={cat}
                  className="rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm"
                >
                  {cat}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base">
              Estructura de carpetas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={settings.folderStructure}
              onChange={(e) =>
                setSettings({ ...settings, folderStructure: e.target.value })
              }
              className="rounded-xl font-mono text-sm"
            />
            <p className="text-xs text-slate-400">
              Ejemplo: /nominas/2026/mayo/apellido-nombre/
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
