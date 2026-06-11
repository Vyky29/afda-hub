"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { EmployeesTable } from "@/components/portal/employees-table";
import { EmployeeProfileDialog } from "@/components/portal/employee-profile-dialog";
import { employees } from "@/lib/portal/mock-data";
import type { Employee } from "@/lib/portal/types";

export default function TrabajadoresPage() {
  const [selected, setSelected] = useState<Employee | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Trabajadores"
        description="Personal con contrato  perfiles, nominas y documentacion"
      />
      <EmployeesTable employees={employees} onSelect={setSelected} />
      <EmployeeProfileDialog
        employee={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
}
