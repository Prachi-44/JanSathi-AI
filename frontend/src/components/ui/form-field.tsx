import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <label className="grid gap-2 text-sm font-medium" htmlFor={id}>
      <span>{label}</span>
      {children}
      {error ? <span className="text-sm font-medium text-destructive">{error}</span> : null}
    </label>
  );
}

export const inputClassName = cn(
  "h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition",
  "focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60",
);

export const checkboxClassName = "h-4 w-4 rounded border-input accent-[hsl(var(--primary))]";
