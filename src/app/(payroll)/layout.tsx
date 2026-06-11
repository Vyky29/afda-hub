import { PayrollShell } from "@/components/payroll/payroll-shell";

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PayrollShell>{children}</PayrollShell>;
}
