import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Flame,
  Home,
  Database,
  BarChart3,
  Sparkles,
  FileText,
  Globe,
  Satellite,
  MapPin,
  Activity,
  FlaskConical,
  ArrowRight,
  Send,
  BrainCircuit,
  Microscope,
  TrendingUp,
  Thermometer,
  Gauge,
  Zap,
  Lightbulb,
  Rocket,
  CircleDot,
} from "lucide-react";

import flameAsset from "@/assets/nasa-flame-flex.jpg.asset.json";
import earthAsset from "@/assets/earth-blue-marble.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IGNIS — Microgravity Combustion Lab" },
      {
        name: "description",
        content:
          "Mission control for microgravity combustion research: live flame visualization, telemetry and AI insights.",
      },
      { property: "og:title", content: "IGNIS — Microgravity Combustion Lab" },
      {
        property: "og:description",
        content:
          "Mission control for microgravity combustion research: live flame visualization, telemetry and AI insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------------------------- data --------------------------------- */

const NAV_OPERATIONS = [
  { id: "mission", label: "Mission Control", icon: Home },
  { id: "flame", label: "Flame Lab", icon: Flame },
  { id: "reports", label: "Research Reports", icon: FileText },
];

const NAV_SCIENCE = [
  { id: "data", label: "Data Explorer", icon: BarChart3 },
  { id: "intel", label: "IGNIS Intelligence", icon: Sparkles },
];

const QUICK_ACCESS = [
  { label: "NASA Data", icon: Database },
  { label: "AI Analysis", icon: BrainCircuit },
  { label: "Experiments", icon: Microscope },
  { label: "Insights", icon: BarChart3 },
];

const SPARKLINE = [12, 18, 14, 22, 19, 28, 24, 33, 30, 38, 42, 48];

/* --------------------------------- helpers -------------------------------- */

function Sparkline({ points, className }: { points: number[]; className?: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = useMemo(() => {
    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * 100;
        const y = 32 - ((p - min) / range) * 28 - 2;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [points, min, range]);

  const lastY = 32 - ((points[points.length - 1] ?? min) - min) / range * 28 - 2;

  return (
    <svg viewBox="0 0 100 32" className={className} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L100,32 L0,32 Z`} fill="url(#sparkFill)" stroke="none" />
      <path d={path} fill="none" stroke="var(--ember)" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="100" cy={lastY} r="1.8" fill="var(--ember)" />
    </svg>
  );
}

function Donut({ percent }: { percent: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const filled = (percent / 100) * c;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90" aria-hidden>
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--secondary)" strokeWidth="10" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="var(--ember)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${c - filled}`}
      />
    </svg>
  );
}

function MissionClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="font-mono text-xs text-muted-foreground tabular-nums">--:--:--</span>;
  const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = now.toLocaleTimeString("en-GB", { hour12: false });
  return (
    <span className="flex items-baseline gap-2 font-mono text-xs tabular-nums text-muted-foreground">
      <span>{date}</span>
      <span className="text-foreground">{time} UTC</span>
    </span>
  );
}

/* --------------------------------- layout --------------------------------- */

function Index() {
  const [active, setActive] = useState("mission");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "user", text: "What happens to flame shape in microgravity?" },
    {
      role: "ai",
      text: "In microgravity, flames form spherical shapes due to the absence of buoyancy, allowing more complete combustion.",
    },
  ]);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setChat((c) => [...c, { role: "user", text }]);
    setDraft("");
    setTimeout(
      () =>
        setChat((c) => [
          ...c,
          {
            role: "ai",
            text: "Logged. Microgravity removes buoyant convection, so heat transfer is diffusion-dominated — I can pull matching NASA experiments for this.",
          },
        ]),
      600,
    );
  };

  const navGroup = (title: string, items: typeof NAV_OPERATIONS) => (
    <div>
      <p className="px-4 pb-2 pt-4 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/70">
        {title}
      </p>
      <div className="space-y-1 px-3">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/15 text-primary shadow-[inset_2px_0_0_0_var(--ember)]"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <Icon className={`size-4 ${isActive ? "text-ember" : ""}`} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* space backdrop — NASA Blue Marble */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={earthAsset.url}
          alt=""
          className="absolute -bottom-32 right-[-12%] h-[75vh] w-auto -rotate-12 object-contain opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </div>

      <div className="relative flex min-h-screen">
        {/* sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background/70 backdrop-blur-xl lg:flex">
          <div className="flex items-center gap-3 px-5 py-6">
            <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-ember ember-glow">
              <Flame className="size-6" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold tracking-[0.2em]">IGNIS</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                Microgravity Combustion
              </p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto">
            {navGroup("Operations", NAV_OPERATIONS)}
            {navGroup("Science", NAV_SCIENCE)}
          </nav>

          <div className="m-3 rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Rocket className="size-4" />
              </span>
              <div className="text-xs leading-tight">
                <p className="font-semibold">NASA Space Apps</p>
                <p className="text-muted-foreground">Challenge 2026</p>
              </div>
            </div>
            <p className="mt-3 border-t border-border pt-3 font-display text-sm italic text-muted-foreground">
              Investigate. Understand. Innovate.
            </p>
          </div>
        </aside>

        {/* main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* topbar */}
          <header className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border bg-background/50 px-6 py-3 backdrop-blur-xl">
            <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-success">
              <span className="size-2 rounded-full bg-success live-dot" />
              System Online
            </span>
            <span className="hidden text-sm text-muted-foreground md:inline">
              Mission: <span className="font-medium text-foreground">Combustion Research</span>
            </span>
            <span className="hidden items-center gap-2 text-sm text-muted-foreground xl:flex">
              <Satellite className="size-4 text-telemetry" /> ISS — Live Data
            </span>
            <span className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
              <MapPin className="size-4 text-telemetry" /> Alexandria, Egypt
            </span>
            <span className="ml-auto">
              <MissionClock />
            </span>
          </header>

          <main className="flex-1 space-y-4 p-4 md:p-6">
            {/* status cards */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <StatusCard
                icon={<Globe className="size-6 text-telemetry" />}
                label="Environment"
                value="0.00 g"
                badge="Microgravity"
              />
              <StatusCard
                icon={<Database className="size-6 text-telemetry" />}
                label="Data Source"
                value="NASA"
                badge="Official Data"
              />
              <button className="mission-panel group flex items-center gap-4 p-5 text-left transition-colors hover:border-primary/40">
                <FlaskConical className="size-8 shrink-0 text-ember" />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Active Experiment
                  </p>
                  <p className="truncate font-display text-lg font-semibold">Flame Behavior Study</p>
                </div>
                <ArrowRight className="ml-auto size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-ember" />
              </button>
            </section>

            {/* visualization + assistant */}
            <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
              {/* combustion viz */}
              <div className="mission-panel flex flex-col overflow-hidden">
                <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
                  <Activity className="size-4 text-ember" />
                  <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em]">
                    Combustion Visualization
                  </h2>
                  <span className="ml-auto flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-success">
                    <span className="size-1.5 rounded-full bg-success live-dot" /> Live Experiment
                  </span>
                </div>

                <div className="grid flex-1 gap-4 p-4 md:grid-cols-[1fr_230px]">
                  <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-border bg-black md:min-h-[360px]">
                    <img
                      src={flameAsset.url}
                      alt="Spherical flame burning in microgravity — NASA FLEX experiment"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 scanlines" />
                    <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-destructive backdrop-blur">
                      <span className="size-1.5 rounded-full bg-destructive live-dot" /> Rec
                    </span>
                    <span className="absolute bottom-12 right-3 rounded bg-black/55 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white/70 backdrop-blur">
                      NASA · Fire in Space
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                      <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Zap className="size-3.5" />
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                        <div className="h-full w-[40%] rounded-full bg-primary" />
                      </div>
                      <span className="font-mono text-[10px] tabular-nums text-white/80">00:12 / 00:30</span>
                    </div>
                  </div>

                  {/* telemetry */}
                  <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card/50">
                    <Telemetry icon={<TrendingUp className="size-4 text-ember" />} label="Flame Diameter" value="2.8 cm" delta="+12%" tone="up" />
                    <Telemetry icon={<Thermometer className="size-4 text-telemetry" />} label="Temperature" value="1673 K" delta="+5%" tone="up" />
                    <Telemetry icon={<Gauge className="size-4 text-muted-foreground" />} label="Pressure" value="101.3 kPa" delta="—" tone="flat" />
                    <div className="p-4">
                      <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                        Heat Flux Trend
                      </p>
                      <Sparkline points={SPARKLINE} className="h-10 w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* assistant */}
              <div className="mission-panel flex flex-col overflow-hidden">
                <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
                  <Flame className="size-4 text-ember" />
                  <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em]">
                    IGNIS Assistant
                  </h2>
                  <span className="ml-auto rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    AI
                  </span>
                </div>

                <div className="flex max-h-[380px] min-h-[300px] flex-1 flex-col gap-3 overflow-y-auto p-4">
                  {chat.map((m, i) =>
                    m.role === "user" ? (
                      <div key={i} className="ml-8 rounded-xl rounded-tr-sm bg-primary/90 px-4 py-2.5 text-sm text-primary-foreground">
                        {m.text}
                      </div>
                    ) : (
                      <div key={i} className="mr-4 rounded-xl rounded-tl-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed text-foreground/90">
                        {m.text}
                      </div>
                    ),
                  )}
                </div>

                <div className="flex items-center gap-2 border-t border-border p-3">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask anything about IGNIS..."
                    className="h-10 min-w-0 flex-1 rounded-lg border border-input bg-background/60 px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
                  />
                  <button
                    onClick={send}
                    aria-label="Send message"
                    className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* bottom row */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {/* quick access */}
              <div className="mission-panel p-5">
                <PanelHeader icon={<Zap className="size-3.5 text-ember" />} title="Quick Access" />
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {QUICK_ACCESS.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card/50 px-2 py-4 transition-colors hover:border-primary/40 hover:bg-primary/10"
                    >
                      <Icon className="size-5 text-ember transition-transform group-hover:scale-110" />
                      <span className="text-center text-[10px] font-medium leading-tight text-muted-foreground group-hover:text-foreground">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* key insight */}
              <div className="mission-panel p-5">
                <PanelHeader icon={<Lightbulb className="size-3.5 text-ember" />} title="Key Insights" />
                <div className="mt-4 flex gap-4">
                  <img
                    src={flameAsset.url}
                    alt="Real NASA microgravity flame"
                    loading="lazy"
                    className="size-20 shrink-0 rounded-lg border border-border object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold leading-snug">Spherical Flame in Microgravity</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Without buoyancy, the flame forms a uniform blue sphere and burns steadier than on Earth.
                    </p>
                    <button className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ember transition-colors hover:text-primary">
                      Read More <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* mission stats */}
              <div className="mission-panel p-5 md:col-span-2 xl:col-span-1">
                <PanelHeader icon={<BarChart3 className="size-3.5 text-ember" />} title="Mission Stats" />
                <div className="mt-2 flex items-center gap-6">
                  <div className="relative grid place-items-center">
                    <Donut percent={87} />
                    <span className="absolute font-display text-xl font-bold tabular-nums">87%</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <p className="flex items-center gap-2">
                      <CircleDot className="size-3.5 text-ember" /> Completed Tasks
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <CircleDot className="size-3.5 opacity-40" /> Remaining
                    </p>
                    <p className="pt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      ETA: ~12 min
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ subcomponents ----------------------------- */

function PanelHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em]">{title}</h2>
    </div>
  );
}

function StatusCard({
  icon,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div className="mission-panel flex items-center gap-4 p-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-telemetry/10">{icon}</span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-bold tabular-nums leading-tight">{value}</p>
        {badge && (
          <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-success">
            {badge}
            <span className="size-1.5 rounded-full bg-success" />
          </p>
        )}
      </div>
    </div>
  );
}

function Telemetry({
  icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  tone: "up" | "flat";
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      {icon}
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <p className="font-mono text-lg font-semibold tabular-nums leading-tight">{value}</p>
      </div>
      <span
        className={`font-mono text-[11px] font-semibold tabular-nums ${
          tone === "up" ? "text-success" : "text-muted-foreground"
        }`}
      >
        {delta}
      </span>
    </div>
  );
}
