import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  className?: string;
}

export function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  className,
}: SummaryCardProps) {
  return (
    <Card
      className={cn(
        "border-slate-200/80 bg-slate-50/50 shadow-none",
        className
      )}
    >
      <CardContent className="flex items-start justify-between p-5">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
          {description && (
            <p className="text-xs text-slate-400">{description}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#59a5a9]/10">
          <Icon className="h-5 w-5 text-[#59a5a9]" />
        </div>
      </CardContent>
    </Card>
  );
}
