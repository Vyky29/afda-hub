"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { EmployeesTable } from "@/components/portal/employees-table";
import { FreelancersTable } from "@/components/portal/freelancers-table";
import { EmployeeProfileDialog } from "@/components/portal/employee-profile-dialog";
import { FreelancerProfileDialog } from "@/components/portal/freelancer-profile-dialog";
import { employees, freelancers } from "@/lib/portal/mock-data";
import type { Employee, Freelancer } from "@/lib/portal/types";

export default function ProfesionalesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<Freelancer | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profesionales"
        description="Equipo de trabajadores y autonomos de AFDA"
      />

      <Tabs defaultValue="trabajadores" className="space-y-6">
        <TabsList className="rounded-xl bg-slate-100 p-1">
          <TabsTrigger value="trabajadores" className="rounded-lg">
            Trabajadores ({employees.length})
          </TabsTrigger>
          <TabsTrigger value="autonomos" className="rounded-lg">
            Autonomos ({freelancers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trabajadores">
          <EmployeesTable
            employees={employees}
            onSelect={(e) => setSelectedEmployee(e)}
          />
        </TabsContent>

        <TabsContent value="autonomos">
          <FreelancersTable
            freelancers={freelancers}
            onSelect={(f) => setSelectedFreelancer(f)}
          />
        </TabsContent>
      </Tabs>

      <EmployeeProfileDialog
        employee={selectedEmployee}
        open={!!selectedEmployee}
        onOpenChange={(o) => !o && setSelectedEmployee(null)}
      />
      <FreelancerProfileDialog
        freelancer={selectedFreelancer}
        open={!!selectedFreelancer}
        onOpenChange={(o) => !o && setSelectedFreelancer(null)}
      />
    </div>
  );
}
