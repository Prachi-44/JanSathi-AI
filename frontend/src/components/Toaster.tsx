import { AlertCircle, CheckCircle2, X } from "lucide-react";

import { useToast } from "../hooks/useToast";
import { Button } from "./ui/button";

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 grid w-[min(420px,calc(100vw-2rem))] gap-3" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = toast.variant === "error" ? AlertCircle : CheckCircle2;
        return (
          <div key={toast.id} className="flex gap-3 rounded-lg border bg-card p-4 shadow-soft">
            <Icon className={toast.variant === "error" ? "mt-0.5 h-5 w-5 text-destructive" : "mt-0.5 h-5 w-5 text-primary"} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{toast.title}</p>
              {toast.description ? <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p> : null}
            </div>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => dismissToast(toast.id)} aria-label="Dismiss notification">
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
