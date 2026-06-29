import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { listSchemes } from "../services/api";
import type { Scheme } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { inputClassName } from "../components/ui/form-field";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/useToast";

export function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    listSchemes()
      .then(setSchemes)
      .catch((error) =>
        showToast({
          title: "Unable to load schemes",
          description: error instanceof Error ? error.message : "Please verify the backend is running.",
          variant: "error",
        }),
      )
      .finally(() => setIsLoading(false));
  }, [showToast]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return schemes;
    }
    return schemes.filter((scheme) =>
      [scheme.scheme_name, scheme.category, scheme.state, scheme.summary, ...scheme.keywords].some((value) =>
        value.toLowerCase().includes(needle),
      ),
    );
  }, [query, schemes]);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="flex flex-col justify-between gap-4 rounded-lg border bg-card p-5 shadow-soft md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Scheme Directory</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Curated MVP dataset used by the rule engine.</p>
        </div>
        <label className="relative w-full md:max-w-sm" htmlFor="scheme-search">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="scheme-search"
            className={`${inputClassName} pl-9`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, category, state"
          />
        </label>
      </section>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-56" />
          ))}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((scheme) => (
            <Card key={scheme.scheme_name}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="leading-7">{scheme.scheme_name}</CardTitle>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">{scheme.state}</span>
                </div>
                <CardDescription>{scheme.summary}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <p className="text-sm font-semibold">Benefit</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{scheme.benefit}</p>
                </div>
                <Button variant="outline" onClick={() => window.open(scheme.official_website, "_blank", "noopener,noreferrer")}>
                  Official site
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}
