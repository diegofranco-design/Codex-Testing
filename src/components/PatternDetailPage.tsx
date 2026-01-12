import { Link, useParams } from "react-router-dom";
import { PATTERNS, Pattern, StoryboardStep, ImplementationDetails } from "../data/patterns";
import { FoundationalPatternDetailPage } from "./FoundationalPatternDetailPage";
import { SectionHeader } from "./SectionHeader";
import { PillarChip } from "./PillarChip";
import { AuditTrailDemo } from "./demos/AuditTrailDemo";
import { ExplainableDecisionsDemo } from "./demos/ExplainableDecisionsDemo";
import { HumanRoutingDemo } from "./demos/HumanRoutingDemo";
import { HallucinationBlockDemo } from "./demos/HallucinationBlockDemo";
import { 
  ChevronLeft, CheckCircle2, XCircle, Info, 
  LayoutDashboard, Network, Signal, Layers,
  Bot, Filter, User, FileText, Settings,
  ArrowRight, BookOpen, ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";
import { cn } from "./ui/utils";
import React, { useState, useEffect } from "react";

// --- Sub-components ---

function PatternHeader({ pattern }: { pattern: Pattern }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl"
    >
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge 
          variant="secondary" 
          className={cn(
            "border",
            pattern.riskBand === 'High' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
            pattern.riskBand === 'Medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 
            'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
          )}
        >
          <Signal className="h-3 w-3 mr-1" /> {pattern.riskBand} Risk
        </Badge>
        <Badge variant="outline" className="text-muted-foreground border-border">
          Complexity: {pattern.complexity}/5
        </Badge>
        <Badge variant="outline" className="text-muted-foreground border-border">
          {pattern.types.join(" + ")}
        </Badge>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
        {pattern.name}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
        {pattern.outcome || pattern.tagline}
      </p>
    </motion.header>
  );
}

function PatternStoryboard({ steps }: { steps: StoryboardStep[] }) {
  if (!steps) return null;

  const icons: Record<string, any> = {
    bot: Bot,
    funnel: Filter,
    user: User,
    log: FileText,
    settings: Settings
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((step, idx) => {
          const Icon = icons[step.icon] || Settings;
          return (
            <Card key={idx} className="border-border shadow-sm bg-card relative overflow-hidden group hover:border-primary/50 transition-colors">
               {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 z-10 text-muted-foreground/30">
                    <ArrowRight className="h-4 w-4" />
                  </div>
               )}
              <CardContent className="p-5 flex flex-col gap-3 h-full">
                <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground shadow-sm group-hover:text-primary group-hover:border-primary/30 transition-colors">
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function PatternDoDontGrid({ dos, donts }: { dos: string[], donts: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
       <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-emerald-500" /> Do
          </h3>
          <Card className="border-l-4 border-l-emerald-500 bg-emerald-500/5 shadow-none border-border h-full">
             <CardContent className="pt-6">
                <ul className="space-y-3">
                   {dos.map((d, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                         <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                         <span className="leading-relaxed">{d}</span>
                      </li>
                   ))}
                </ul>
             </CardContent>
          </Card>
       </div>

       <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-destructive" /> Avoid
          </h3>
          <Card className="border-l-4 border-l-destructive bg-destructive/5 shadow-none border-border h-full">
             <CardContent className="pt-6">
                <ul className="space-y-3">
                   {donts.map((d, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                         <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                         <span className="leading-relaxed">{d}</span>
                      </li>
                   ))}
                </ul>
             </CardContent>
          </Card>
       </div>
    </div>
  );
}

function PatternImplementationTabs({ data }: { data: ImplementationDetails }) {
   if (!data) return null;
   
   return (
     <div className="space-y-4">
       <Tabs defaultValue="ui" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
             <TabsTrigger value="ui" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground">UI Layer</TabsTrigger>
             <TabsTrigger value="workflow" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground">Workflow</TabsTrigger>
             <TabsTrigger value="ai" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground">AI Logic</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 rounded-xl border border-border bg-card p-6 font-mono text-sm shadow-sm">
             <TabsContent value="ui" className="mt-0 space-y-2">
                {data.ui.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-blue-500">→</span> {item}
                   </div>
                ))}
             </TabsContent>
             <TabsContent value="workflow" className="mt-0 space-y-2">
                {data.workflow.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-amber-500">→</span> {item}
                   </div>
                ))}
             </TabsContent>
             <TabsContent value="ai" className="mt-0 space-y-2">
                {data.ai.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-violet-500">→</span> {item}
                   </div>
                ))}
             </TabsContent>
          </div>
       </Tabs>
     </div>
   );
}

function PatternKPIList({ kpis }: { kpis: string[] }) {
   if (!kpis) return null;

   return (
      <div className="space-y-4">
         {/* Title removed, managed by SectionHeader */}
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi, idx) => (
               <Card key={idx} className="shadow-sm border-border bg-card">
                  <CardContent className="p-4 flex items-start gap-3">
                     <div className="mt-0.5 p-1.5 rounded-md bg-primary/10 text-primary shrink-0">
                        <Signal className="h-4 w-4" />
                     </div>
                     <span className="text-sm text-muted-foreground font-medium leading-snug">{kpi}</span>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}

// --- Main Page Component ---

export function PatternDetailPage() {
  const { id } = useParams();
  const pattern = PATTERNS.find((p) => p.id === id);
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "demo", number: "01", label: "Interactive Demo" },
    { id: "how-it-works", number: "02", label: "How it Works" },
    { id: "do-dont", number: "03", label: "Best Practices" },
    { id: "implementation", number: "04", label: "Implementation" },
    { id: "kpis", number: "05", label: "KPIs & Metrics" },
    { id: "related", number: "06", label: "Related Patterns" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (!pattern) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
        <h2 className="text-2xl font-bold text-foreground mb-2">Pattern not found</h2>
        <p className="text-muted-foreground mb-6">The pattern you are looking for does not exist.</p>
        <Link to="/">
          <Button>Back to Patterns</Button>
        </Link>
      </div>
    );
  }

  if (pattern.pillars.includes("Foundational")) {
    return <FoundationalPatternDetailPage pattern={pattern} />;
  }

  const renderDemo = () => {
    switch (pattern.id) {
      case "audit-trail":
        return <AuditTrailDemo />;
      case "explainable-decisions":
        return <ExplainableDecisionsDemo />;
      case "human-routing":
        return <HumanRoutingDemo />;
      case "hallucination-block":
        return <HallucinationBlockDemo />;
      default:
        return (
           <div className="flex items-center justify-center h-64 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
              Demo coming soon
           </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10">
      
      {/* Breadcrumbs */}
      <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Patterns</Link>
          <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
          <span className="font-medium text-foreground">{pattern.name}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <PatternHeader pattern={pattern} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-16">
          
          {/* --- LEFT SIDEBAR (Sticky) --- */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              
              {/* On this page */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  Contents
                </h4>
                <nav className="flex flex-col space-y-1">
                  {sections.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a 
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(link.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                            setActiveSection(link.id);
                          }
                        }}
                        className={cn(
                          "relative py-2 pl-4 text-xs font-medium transition-colors rounded-r-lg border-l-2 -ml-[2px] flex items-center gap-3",
                          isActive 
                            ? "border-primary text-primary bg-primary/5" 
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <span className="font-mono opacity-50 text-[10px] w-4">{link.number}</span>
                        {link.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Pillars */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Pillars
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pattern.pillars.map((p: any) => (
                    <PillarChip key={p} pillar={p} />
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* --- MAIN CONTENT COLUMN --- */}
          <main className="min-w-0 space-y-20 pb-24">

            {/* 01. Demo Section */}
            <section id="demo" className="scroll-mt-24">
              <SectionHeader number="01" title="Interactive Demo" />
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 bg-muted/20">
                  {renderDemo()}
                </div>
              </div>
            </section>

            {/* 02. How it Works */}
            {pattern.storyboard && (
              <section id="how-it-works" className="scroll-mt-24">
                <SectionHeader number="02" title="How it Works" />
                <PatternStoryboard steps={pattern.storyboard} />
              </section>
            )}

            {/* 03. Best Practices */}
            {pattern.designDos && pattern.designDonts && (
              <section id="do-dont" className="scroll-mt-24">
                <SectionHeader number="03" title="Best Practices" />
                <PatternDoDontGrid dos={pattern.designDos} donts={pattern.designDonts} />
              </section>
            )}

            {/* 04. Implementation */}
            <section id="implementation" className="scroll-mt-24">
              <SectionHeader number="04" title="Implementation Details" />
              
              <div className="grid md:grid-cols-2 gap-8">
                {pattern.implementation && (
                  <div className="md:col-span-2">
                    <PatternImplementationTabs data={pattern.implementation} />
                  </div>
                )}
              </div>
            </section>

             {/* 05. KPIs & Metrics */}
             {pattern.kpis && (
               <section id="kpis" className="scroll-mt-24">
                 <SectionHeader number="05" title="KPIs & Metrics" />
                 <div className="md:col-span-2">
                   <PatternKPIList kpis={pattern.kpis} />
                 </div>
               </section>
             )}

            {/* 06. Related Patterns */}
            {pattern.related && pattern.related.length > 0 && (
              <section id="related" className="scroll-mt-24">
                <SectionHeader number="06" title="Related Patterns" />
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                  <div className="flex flex-wrap gap-3">
                    {pattern.related.map((rid) => {
                      const rp = PATTERNS.find((x) => x.id === rid);
                      if (!rp) return null;
                      return (
                        <Link key={rid} to={`/patterns/${rid}`}>
                          <Badge 
                            variant="outline" 
                            className="h-10 px-5 text-sm font-normal hover:bg-muted/50 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer bg-card text-muted-foreground border-border"
                          >
                            {rp.name}
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}