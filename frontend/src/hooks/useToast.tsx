import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface Toast {
  id: string;
  title: string;
  description?: any;
  variant?: "default" | "error";
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = crypto.randomUUID();
      let formattedDescription = toast.description;
      if (formattedDescription && typeof formattedDescription !== "string") {
        try {
          if (Array.isArray(formattedDescription)) {
            formattedDescription = formattedDescription
              .map((d: any) => {
                if (d && typeof d === "object") {
                  const field = d.loc ? d.loc.filter((l: any) => l !== "body" && l !== "query").join(".") : "";
                  return `${field ? field + ": " : ""}${d.msg || JSON.stringify(d)}`;
                }
                return String(d);
              })
              .join(", ");
          } else if (typeof formattedDescription === "object") {
            formattedDescription = formattedDescription.message || JSON.stringify(formattedDescription);
          } else {
            formattedDescription = String(formattedDescription);
          }
        } catch (e) {
          formattedDescription = "An unexpected error occurred.";
        }
      }
      setToasts((current) => [...current.slice(-2), { ...toast, description: formattedDescription, id }]);
      window.setTimeout(() => dismissToast(id), 4500);
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ toasts, showToast, dismissToast }), [dismissToast, showToast, toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return value;
}
