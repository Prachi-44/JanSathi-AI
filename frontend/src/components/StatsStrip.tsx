import { CheckCircle2, Database, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Curated schemes", value: "24", icon: Database },
  { label: "Eligibility mode", value: "Rule-based", icon: CheckCircle2 },
  { label: "Document storage", value: "None", icon: ShieldCheck },
];

export function StatsStrip() {
  return (
    <section className="grid gap-3 sm:grid-cols-3" aria-label="Platform status">
      {stats.map((item) => (
        <div key={item.label} className="rounded-lg border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold leading-none">{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
