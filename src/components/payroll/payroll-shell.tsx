import { PayrollSidebar } from "@/components/payroll/payroll-sidebar";
import { PayrollTopbar } from "@/components/payroll/payroll-topbar";
import { PrivacyNotice } from "@/components/payroll/privacy-notice";

interface PayrollShellProps {
  children: React.ReactNode;
}

export function PayrollShell({ children }: PayrollShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <PayrollSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PayrollTopbar />
        <main className="flex-1 overflow-y-auto bg-slate-50/30 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <PrivacyNotice />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
