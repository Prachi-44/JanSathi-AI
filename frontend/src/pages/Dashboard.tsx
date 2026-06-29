import { ArrowRight, FileText, LockKeyhole, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

import { StatsStrip } from "../components/StatsStrip";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const capabilities = [
  {
    title: "Eligibility",
    description: "Rule-based matching with clear reasons for every result.",
    icon: FileText,
  },
  {
    title: "Privacy",
    description: "No raw document image is accepted or stored in this milestone.",
    icon: LockKeyhole,
  },
  {
    title: "Assistant",
    description: "Grounded AI chat will unlock after retrieval is implemented.",
    icon: MessageSquareText,
  },
];

export function Dashboard() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 rounded-lg border bg-card p-6 shadow-soft lg:grid-cols-[1fr_380px] lg:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">Citizen-first scheme discovery</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Find eligible government schemes with explainable rules.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            JanSathi AI starts with a deterministic eligibility engine over a curated dataset, giving fast and auditable matches before AI features are added.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/eligibility">
              <Button>
                <span>Start eligibility check</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/schemes">
              <Button variant="outline">Browse schemes</Button>
            </Link>
          </div>
        </div>
        <div className="grid content-start gap-3">
          {capabilities.map((item) => (
            <div key={item.title} className="rounded-lg border bg-background p-4">
              <div className="flex gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StatsStrip />

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dataset</CardTitle>
            <CardDescription>20-30 scheme MVP scope with strong coverage for farmers, students, women, health, housing, business, and Maharashtra residents.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/schemes" className="text-sm font-semibold text-primary hover:underline">
              View all schemes
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Backend</CardTitle>
            <CardDescription>FastAPI, Pydantic schemas, request logging, rate limiting, and MongoDB Atlas-ready persistence.</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="http://localhost:8000/docs" className="text-sm font-semibold text-primary hover:underline" target="_blank" rel="noreferrer">
              Open API docs
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Roadmap</CardTitle>
            <CardDescription>OCR, ChromaDB retrieval, Gemini 2.5 Flash, translation, and voice are isolated into dedicated service modules.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/eligibility" className="text-sm font-semibold text-primary hover:underline">
              Validate milestone
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
