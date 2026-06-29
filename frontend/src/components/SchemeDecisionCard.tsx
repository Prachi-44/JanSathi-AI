import { ExternalLink } from "lucide-react";

import type { SchemeDecision } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props {
  decision: SchemeDecision;
  status: "eligible" | "ineligible";
}

export function SchemeDecisionCard({ decision, status }: Props) {
  const { scheme, reasons } = decision;

  return (
    <Card className={status === "eligible" ? "border-primary/40" : ""}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="leading-7">{scheme.scheme_name}</CardTitle>
            <CardDescription>{scheme.summary}</CardDescription>
          </div>
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">{scheme.category}</span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm font-semibold">Decision reason</p>
          <ul className="mt-2 grid gap-1 text-sm leading-6 text-muted-foreground">
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
        {status === "eligible" ? (
          <div className="grid gap-3 rounded-md bg-muted p-3">
            <div>
              <p className="text-sm font-semibold">Benefit</p>
              <p className="text-sm leading-6 text-muted-foreground">{scheme.benefit}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Documents</p>
              <p className="text-sm leading-6 text-muted-foreground">{scheme.documents.join(", ")}</p>
            </div>
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">{scheme.state}</span>
          <Button variant="outline" onClick={() => window.open(scheme.official_website, "_blank", "noopener,noreferrer")}>
            <ExternalLink className="h-4 w-4" />
            <span>Official site</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
