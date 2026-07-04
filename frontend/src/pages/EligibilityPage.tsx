import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, HelpCircle, ShieldCheck, Sparkles } from "lucide-react";

import { EligibilityForm } from "../components/EligibilityForm";
import { SchemeDecisionCard } from "../components/SchemeDecisionCard";
import { Skeleton } from "../components/ui/skeleton";
import type { EligibilityResponse } from "../types";
import { ExplainDrawer } from "../components/ExplainDrawer";
import { Button } from "../components/ui/button";

export function EligibilityPage() {
  const [result, setResult] = useState<EligibilityResponse | null>(null);
  const [activeExplainScheme, setActiveExplainScheme] = useState<string | null>(null);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[460px_minmax(0,1fr)] lg:px-8">
      {/* Left panel: Form Wizard */}
      <section className="lg:sticky lg:top-24 lg:self-start space-y-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-auto">
        <EligibilityForm onResult={setResult} />
        
        <div className="rounded-xl border bg-amber-500/5 p-4 text-xs text-amber-800 dark:text-amber-300 border-amber-500/20 flex gap-2">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="font-semibold">Privacy Agreement</p>
            <p className="mt-0.5 leading-normal opacity-90">
              No files are stored permanently on server disks. Sensitive identifiers are masked in-memory. Central & State criteria are evaluated in accordance with the deterministic engine specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Right panel: Match Results */}
      <section className="grid gap-5" aria-live="polite">
        <div className="rounded-xl border bg-card p-5 shadow-soft flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Eligibility Results Mapping</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct outcomes computed via the deterministic rule-based GovTech database.
            </p>
          </div>
          {result && (
            <Link to="/schemes">
              <Button variant="outline" className="text-xs">
                <span>Browse Scheme Directory</span>
              </Button>
            </Link>
          )}
        </div>

        {!result ? (
          <div className="grid gap-4">
            <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground text-sm flex flex-col items-center justify-center min-h-[300px]">
              <HelpCircle className="h-10 w-10 text-muted-foreground/45 mb-3" />
              <p className="font-semibold">No eligibility profile evaluated yet.</p>
              <p className="text-xs mt-1 max-w-sm leading-normal">
                Complete the profile form or upload an identity document on the left to determine your matching schemes and priorities.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Eligible section */}
            <div>
              <h2 className="mb-3.5 text-base font-extrabold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Eligible Schemes ({result.eligible_schemes.length})</span>
              </h2>
              <div className="grid gap-4">
                {result.eligible_schemes.length ? (
                  result.eligible_schemes.map((decision) => (
                    <SchemeDecisionCard
                      key={decision.scheme.scheme_name}
                      decision={decision}
                      status="eligible"
                      onExplain={setActiveExplainScheme}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border bg-card p-6 text-center text-xs text-muted-foreground">
                    No eligible schemes matched this demographic profile.
                  </div>
                )}
              </div>
            </div>

            {/* Ineligible section */}
            {result.ineligible_schemes.length > 0 && (
              <details className="w-full min-w-0 rounded-xl border bg-card overflow-hidden shadow-soft group">
                <summary className="cursor-pointer font-extrabold text-xs text-muted-foreground hover:text-foreground uppercase tracking-wider p-4 bg-muted/20 select-none flex items-center justify-between">
                  <span>Ineligible schemes ({result.ineligible_schemes.length})</span>
                  <span className="transition duration-200 group-open:rotate-180">▼</span>
                </summary>
                <div className="p-4 border-t flex flex-col gap-4 bg-muted/5 w-full min-w-0">
                  {result.ineligible_schemes.map((decision) => (
                    <SchemeDecisionCard
                      key={decision.scheme.scheme_name}
                      decision={decision}
                      status="ineligible"
                      onExplain={setActiveExplainScheme}
                    />
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </section>

      {/* RAG Explain with AI slide drawer */}
      <ExplainDrawer
        schemeName={activeExplainScheme}
        onClose={() => setActiveExplainScheme(null)}
      />
    </main>
  );
}
