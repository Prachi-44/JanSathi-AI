import { Navigate, Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppLayout } from "./components/layout/AppLayout";
import { Toaster } from "./components/Toaster";
import { ToastProvider } from "./hooks/useToast";
import { Dashboard } from "./pages/Dashboard";
import { EligibilityPage } from "./pages/EligibilityPage";
import { SchemesPage } from "./pages/SchemesPage";

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toaster />
      </ToastProvider>
    </ErrorBoundary>
  );
}
