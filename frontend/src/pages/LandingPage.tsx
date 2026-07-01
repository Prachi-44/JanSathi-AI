import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Cpu, Eye, FileSpreadsheet, Fingerprint, HelpCircle, Landmark, ShieldCheck, Sparkles, Users, XCircle } from "lucide-react";
import { Button } from "../components/ui/button";

const stats = [
  { value: "48+", label: "Government Schemes", icon: FileSpreadsheet },
  { value: "9+", label: "Citizen Categories", icon: Users },
  { value: "AI-Powered", label: "Smart RAG Explanations", icon: Sparkles },
  { value: "Privacy-First", label: "AES-256 Encryption", icon: ShieldCheck },
];

const categories = [
  { name: "Farmers", icon: "🌾", desc: "Income support, crop insurance, subsidies, and credit." },
  { name: "Students", icon: "🎓", desc: "Scholarships, skill loans, fee exemptions, and awards." },
  { name: "Women Welfare", icon: "👩", desc: "Social pensions, maternity benefits, and enterprise support." },
  { name: "Workers", icon: "👨‍🏭", desc: "Social security, registration cards, and insurance." },
  { name: "Seniors", icon: "👴", desc: "Subsidized pensions, tax relief, savings accounts." },
  { name: "Divyang", icon: "🧑‍🦽", desc: "UDID cards, free assistive devices, and pensions." },
  { name: "Health", icon: "❤️", desc: "Cashless secondary/tertiary hospital assurance." },
  { name: "Housing", icon: "🏠", desc: "Affordable urban and rural housing financial aid." },
  { name: "Jobs & Startups", icon: "💼", desc: "Greenfield enterprise loans, self-employment grants." }
];

const problems = [
  {
    title: "Scattered Scheme Data",
    desc: "Schemes are published across dozens of state & central portal URLs, making comparison nearly impossible.",
    isSolution: false,
  },
  {
    title: "Unified Scheme Directory",
    desc: "JanSathi aggregates central and state schemes in one indexed database with smart autocomplete search.",
    isSolution: true,
  },
  {
    title: "Black-box AI Hallucinations",
    desc: "General AI chatbots frequently hallucinate scheme eligibility details, creating false user expectations.",
    isSolution: false,
  },
  {
    title: "Deterministic Rule Engine",
    desc: "Eligibility is computed by rule-based, audited logic first. AI is only used to explain details, not make rules.",
    isSolution: true,
  },
  {
    title: "Exposed Personal PII",
    desc: "Registering on portal sites forces citizens to input unmasked Aadhaar numbers or store files on server disks.",
    isSolution: false,
  },
  {
    title: "AES Encrypted & PII Masking",
    desc: "Aadhaar and PAN details are masked in-memory. File uploads are purged instantly. Sensitive PII is AES-encrypted.",
    isSolution: true,
  },
];

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-transparent to-transparent py-20 sm:py-32">
        {/* Ashoka Chakra background watermark */}
        <div className="absolute right-[-10%] top-[-10%] opacity-[0.03] select-none pointer-events-none text-primary">
          <Landmark className="h-[600px] w-[600px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Discover Government Schemes <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              With Grounded AI & Audited Rules
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            JanSathi AI bridges the gap between citizens and benefits. We combine a rule-based eligibility engine with RAG-grounded Gemini explanations for 100% auditable results.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="h-12 px-6">
                <span>Start eligibility check</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/schemes">
              <Button variant="outline" className="h-12 px-6">
                Browse Scheme Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Strip */}
      <section className="bg-primary py-8 text-primary-foreground border-y border-white/10 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-x-4 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="p-2 bg-white/10 rounded-lg">
                  <stat.icon className="h-6 w-6" />
                </span>
                <span className="text-3xl font-extrabold">{stat.value}</span>
                <span className="text-sm opacity-80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why JanSathi AI?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              How our architecture solves the problems found in typical scheme discovery apps.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {problems.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-6 bg-card flex gap-4 shadow-sm hover:shadow-md transition-shadow ${
                  item.isSolution ? "border-primary/30 bg-primary/5" : "border-destructive/20 bg-destructive/5"
                }`}
              >
                <span className="mt-1 shrink-0">
                  {item.isSolution ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive" />
                  )}
                </span>
                <div>
                  <h3 className="font-semibold text-base text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Scheme Categories
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Comprehensive benefits tailored for the primary pillars of Indian society.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="rounded-xl border bg-card p-6 shadow-sm hover:-translate-y-1 transition duration-200">
                <span className="text-3xl block mb-4">{cat.icon}</span>
                <h3 className="font-semibold text-lg text-foreground mb-2">{cat.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/40 border-t border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The JanSathi AI Workflow
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              From profile setup to claiming benefits, we ensure a seamless and private experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 text-center relative">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4 text-lg">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Build Profile or Upload ID</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Fill the eligibility form, or upload your ID (Aadhaar/PAN) to run instant OCR auto-fill with masked security.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4 text-lg">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Deterministic Scoring</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Our rule engine checks your profile against the scheme database to return exact eligible matches with audit scores.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4 text-lg">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Explain with AI</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Query individual schemes using semantic search. Gemini generates structured, grounded markdown answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to find your eligible benefits?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg opacity-90">
            Sign up today to discover, save, and learn about government schemes with absolute privacy.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-primary hover:bg-white/95 h-12 px-6">
                Register Citizen Profile
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 h-12 px-6">
                Citizen Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
