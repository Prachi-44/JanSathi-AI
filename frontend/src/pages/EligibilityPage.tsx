import { useState } from "react";

import { EligibilityForm } from "../components/EligibilityForm";
import { SchemeDecisionCard } from "../components/SchemeDecisionCard";
import { Skeleton } from "../components/ui/skeleton";
import type { EligibilityResponse } from "../types";

export function EligibilityPage() {
  const [result, setResult] = useState<EligibilityResponse | null>(null);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[440px_1fr] lg:px-8">
      <section className="lg:sticky lg:top-24 lg:self-start">
        <EligibilityForm onResult={setResult} />
      </section>

      <section className="grid gap-4" aria-live="polite">
        <div className="rounded-lg border bg-card p-5 shadow-soft">
          <h1 className="text-xl font-semibold">Eligibility Results</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Each decision comes from deterministic rules mapped to the curated scheme dataset.
          </p>
        </div>

        {!result ? (
          <div className="grid gap-4">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        ) : (
          <div className="grid gap-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold">Eligible schemes ({result.eligible_schemes.length})</h2>
              <div className="grid gap-4">
                {result.eligible_schemes.length ? (
                  result.eligible_schemes.map((decision) => (
                    <SchemeDecisionCard key={decision.scheme.scheme_name} decision={decision} status="eligible" />
                  ))
                ) : (
                  <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
                    No eligible schemes were found for this profile in the MVP dataset.
                  </div>
                )}
              </div>
            </div>

            <details className="rounded-lg border bg-card p-5 shadow-soft">
              <summary className="cursor-pointer text-lg font-semibold">Ineligible schemes ({result.ineligible_schemes.length})</summary>
              <div className="mt-4 grid gap-4">
                {result.ineligible_schemes.map((decision) => (
                  <SchemeDecisionCard key={decision.scheme.scheme_name} decision={decision} status="ineligible" />
                ))}
              </div>
            </details>
          </div>
        )}
      </section>
    </main>
  );
}
