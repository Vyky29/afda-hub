"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { FreelancersTable } from "@/components/portal/freelancers-table";
import { FreelancerProfileDialog } from "@/components/portal/freelancer-profile-dialog";
import { freelancers } from "@/lib/portal/mock-data";
import type { Freelancer } from "@/lib/portal/types";

export default function AutonomosPage() {
  const [selected, setSelected] = useState<Freelancer | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Autonomos"
        description="Profesionales externos  facturas, sesiones y revision"
      />
      <FreelancersTable freelancers={freelancers} onSelect={setSelected} />
      <FreelancerProfileDialog
        freelancer={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
}
