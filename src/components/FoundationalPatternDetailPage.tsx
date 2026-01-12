import { Link } from "react-router-dom";
import { Pattern, PATTERNS, Pillar } from "../data/patterns";
import { PillarChip } from "./PillarChip";
import { SectionHeader } from "./SectionHeader";
import { PageSidebar, Pillar as SidebarPillar } from "./shared/PageSidebar";
import { 
  CheckCircle2, XCircle, AlertTriangle, 
  LayoutDashboard, Network, Signal, Layers,
  Bot, Filter, User, FileText, Settings,
  ArrowRight, BookOpen, Shield, Zap, Target,
  Server, Lock, Activity, ChevronRight, FileCode,
  TrendingUp, LucideIcon, Link as LinkIcon,
  PieChart, Scale
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";
import { cn } from "./ui/utils";
import { MetricsSection } from "./shared/PatternPageTemplate";
import React, { useState, useEffect } from "react";


// -----------------------------------------------------------------------------------------

function PatternHeader({ pattern }: { pattern: Pattern }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl"
    >
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
          Foundational
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
        {pattern.summary}
      </p>
    </motion.header>
  );
}

export function FoundationalPatternDetailPage({ pattern }: { pattern: Pattern }) {
  const [activeSection, setActiveSection] = useState("");
  const content = pattern.foundationalContent;

  const sections = [
    { id: "problem", number: "01", label: "The Problem" },
    { id: "outcome", number: "02", label: "Intended Outcome" },
    { id: "scope", number: "03", label: "Scope & Boundaries" },
    { id: "how-it-works", number: "04", label: "How it Works" },
    { id: "interaction", number: "05", label: "System Interaction" },
    { id: "experience", number: "06", label: "Experience Surface" },
    { id: "assets", number: "07", label: "Design Assets" },
    { id: "when-to-use", number: "08", label: "When to Use" },
    { id: "risks", number: "09", label: "Risks & Guidelines" },
    { id: "related", number: "10", label: "Trust Patterns" },
    { id: "measurement", number: "11", label: "How to Measure Success" },
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
      { rootMargin: "-10% 0px -60% 0px" }
    );

    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      Content not available
    </div>
  );

  const mapPillarToColor = (p: string): SidebarPillar["color"] => {
    switch (p) {
      case "Security": return "purple";
      case "Safety": return "amber";
      case "Transparency": return "blue";
      case "Reliability": return "green";
      default: return "slate";
    }
  };

  const sidebarPillars = pattern.pillars.map(p => ({
    label: p,
    color: mapPillarToColor(p)
  }));

  const sidebarSections = sections.map(s => ({
    id: s.id,
    label: `${s.number}. ${s.label}`
  }));

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
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                Foundational
              </Badge>
              <Badge variant="outline" className="text-muted-foreground border-border">
                Complexity: {pattern.complexity}/5
              </Badge>
              <Badge variant="outline" className="text-muted-foreground border-border">
                {pattern.types.join(" + ")}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              {pattern.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {pattern.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-16">
          
          {/* --- LEFT SIDEBAR (Sticky) --- */}
          <aside className="hidden lg:block">
            <PageSidebar 
              sections={sidebarSections}
              activeSection={activeSection}
              pillars={sidebarPillars}
              onSectionClick={(id) => {
                const el = document.getElementById(id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(id);
                }
              }}
            />
          </aside>

          {/* --- MAIN CONTENT COLUMN --- */}
          <main className="min-w-0 space-y-20 pb-24">

            {/* 1. The Problem */}
            <section id="problem" className="scroll-mt-24">
              <SectionHeader number="01" title="The Problem" />
              <div className="space-y-6 max-w-3xl">
                 <p className="text-base text-foreground leading-relaxed">
                   {content.problem.text}
                 </p>
                 <ul className="space-y-3 pt-2">
                   {content.problem.list.map((item, i) => (
                     <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                       <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 shrink-0" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </section>

            {/* 2. Intended Outcome */}
            <section id="outcome" className="scroll-mt-24">
               <SectionHeader number="02" title="Intended Outcome" />
               <div className="space-y-6 max-w-3xl">
                   <p className="text-base text-foreground leading-relaxed">
                     {content.outcome.text}
                   </p>
                   <ul className="space-y-3 pt-2">
                     {content.outcome.list.map((item, i) => (
                       <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                         <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                </div>
            </section>

            {/* 3. Scope & Boundaries */}
            <section id="scope" className="scroll-mt-24">
              <SectionHeader number="03" title="Scope & Boundaries" />
              <div className="grid md:grid-cols-2 gap-8">
                 <Card className="border-t-4 border-t-emerald-500 shadow-sm border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg font-semibold">
                        <CheckCircle2 className="h-5 w-5" /> Handles
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {content.scope.handles.map((item, i) => (
                          <li key={i} className="text-sm text-foreground flex items-start gap-3 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                 </Card>

                 <Card className="border-t-4 border-t-muted-foreground/30 shadow-sm bg-muted/20 border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-muted-foreground text-lg font-semibold">
                        <XCircle className="h-5 w-5" /> Does Not Handle
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {content.scope.doesNotHandle.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                 </Card>
              </div>
            </section>

             {/* 4. How It Works */}
             <section id="how-it-works" className="scroll-mt-24">
              <SectionHeader number="04" title="How it Works" />
              
              <div className="space-y-8">
                <p className="text-base text-foreground max-w-3xl leading-relaxed">
                  {content.howItWorks.description}
                </p>
                
                {/* Flow Steps */}
                <div className="relative pl-2">
                   <div className="absolute left-[22px] md:left-[22px] top-4 bottom-4 w-px bg-border" />
                   <div className="space-y-8">
                     {content.howItWorks.flow.map((step, i) => (
                       <div key={i} className="relative flex gap-6 items-start group">
                         <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
                           <span className="text-xs font-mono text-muted-foreground group-hover:text-primary">{i + 1}</span>
                         </div>
                         <div className="pt-1">
                           <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Modes */}
                <div className="grid md:grid-cols-2 gap-6 pt-6">
                  {content.howItWorks.modes.map((mode, i) => (
                    <Card key={i} className="bg-muted/30 border-dashed hover:border-solid hover:border-primary/30 transition-all shadow-none">
                      <CardContent className="p-5 flex items-start gap-4">
                         <Server className="h-5 w-5 text-primary mt-1" />
                         <span className="text-foreground font-medium text-sm">{mode}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Interaction with the system */}
            <section id="interaction" className="scroll-mt-24">
              <SectionHeader number="05" title="System Interaction" />
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                       <Activity className="h-4 w-4 text-muted-foreground" /> Placement & Triggers
                     </h3>
                     <ul className="space-y-3">
                       {content.systemInteraction.placement.map((p, i) => (
                         <li key={i} className="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                           <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" /> 
                           {p}
                         </li>
                       ))}
                     </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                        Supported Architectures
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {content.systemInteraction.architectures.map((arch, i) => (
                        <Badge key={i} variant="secondary" className="font-normal text-foreground bg-muted hover:bg-muted/80 border-transparent">
                          {arch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Experience Surface */}
            <section id="experience" className="scroll-mt-24">
                <SectionHeader number="06" title="Experience Surface" />
                <div className="bg-muted/30 rounded-lg p-6 md:p-8 border border-border/50 max-w-3xl">
                   <p className="text-base text-foreground leading-relaxed">
                     {content.experience}
                   </p>
                </div>
            </section>

            {/* 7. Design Assets */}
            <section id="assets" className="scroll-mt-24">
                <SectionHeader number="07" title="Design Assets" />
                <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card max-w-3xl">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                        <FileCode className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">Available Resources</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                           {content.assets || "No specific design assets linked for this pattern."}
                        </p>
                    </div>
                </div>
            </section>

            {/* 8. When to Use */}
            <section id="when-to-use" className="scroll-mt-24">
                 <SectionHeader number="08" title="When to use" />
                 <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
                   {content.whenToUse.map((item, i) => (
                     <div key={i} className="flex gap-4 p-4 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                             <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-foreground font-medium leading-relaxed">{item}</span>
                     </div>
                   ))}
                 </div>
            </section>

            {/* 9. Risks */}
            <section id="risks" className="scroll-mt-24">
               <SectionHeader number="09" title="Risks & Guidelines" />

               <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-l-4 border-l-destructive/50 border-border shadow-sm">
                     <CardHeader>
                       <CardTitle className="text-destructive flex items-center gap-2 text-lg font-semibold">
                          <AlertTriangle className="h-5 w-5" /> Common Risks
                       </CardTitle>
                     </CardHeader>
                     <CardContent>
                       <ul className="space-y-3">
                          {content.risks.risks.map((r, i) => (
                             <li key={i} className="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                                {r}
                             </li>
                          ))}
                       </ul>
                     </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-primary/50 border-border shadow-sm">
                     <CardHeader>
                       <CardTitle className="text-primary flex items-center gap-2 text-lg font-semibold">
                          <Shield className="h-5 w-5" /> Safety Guidelines
                       </CardTitle>
                     </CardHeader>
                     <CardContent>
                       <ul className="space-y-3">
                          {content.risks.guidelines.map((g, i) => (
                             <li key={i} className="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                {g}
                             </li>
                          ))}
                       </ul>
                     </CardContent>
                  </Card>
               </div>
            </section>

            {/* 10. Trust Patterns Related */}
            <section id="related" className="scroll-mt-24">
               <SectionHeader number="10" title="Trust Patterns Related" />
               <div className="grid sm:grid-cols-2 gap-6">
                  {content.trustAlignment.map((t, i) => {
                     // Filter Logic:
                     // 1. Must be a Trust Pattern (not Foundational)
                     // 2. Must match the current Pillar (Category)
                     // 3. Must match at least one Type (e.g. Backend to Backend)
                     // 4. If Trust Pattern is "AI" specific, Foundational pattern MUST also be "AI" (prevents AI patterns showing on generic backend blocks)
                     
                     const relatedPatterns = PATTERNS.filter(p => {
                        const isTrustPattern = !p.pillars.includes("Foundational");
                        if (!isTrustPattern) return false;

                        const matchesPillar = p.pillars.includes(t.pillar as Pillar);
                        if (!matchesPillar) return false;

                        const hasTypeOverlap = p.types.some(type => pattern.types.includes(type));
                        if (!hasTypeOverlap) return false;

                        const trustIsAI = p.types.includes("AI");
                        const foundationalIsAI = pattern.types.includes("AI");
                        
                        // Exclude AI patterns if foundational is not AI
                        if (trustIsAI && !foundationalIsAI) return false;

                        return true;
                     });

                     return (
                       <div key={i} className="group flex flex-col p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors shadow-sm">
                          <div className="mb-4">
                             <PillarChip pillar={t.pillar as any} />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors mb-4 flex-1">
                            {t.description}
                          </p>
                          
                          {/* Related Patterns Links */}
                          {relatedPatterns.length > 0 && (
                             <div className="pt-4 border-t border-border/50">
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Related Patterns</h4>
                                <div className="flex flex-wrap gap-2">
                                   {relatedPatterns.map(rp => (
                                      <Link 
                                        key={rp.id} 
                                        to={`/pattern/${rp.id}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
                                      >
                                         <LinkIcon className="h-3 w-3" />
                                         {rp.name}
                                      </Link>
                                   ))}
                                </div>
                             </div>
                          )}
                       </div>
                     );
                  })}
               </div>
            </section>

            {/* 11. Metrics */}
            <section id="measurement" className="scroll-mt-24 pb-20">
               <SectionHeader number="11" title="How to Measure Success" />
               <p className="text-muted-foreground mb-8">How will we know this pattern is strengthening trust?</p>

               <MetricsSection 
                  northStar={{
                    title: "North Star",
                    description: content.effectiveness.northStar,
                    icon: Target,
                    accentColor: "blue"
                  }}
                  supportingMetrics={content.effectiveness.metrics.map(m => {
                    let Icon = Signal;
                    const lower = m.toLowerCase();
                    if (lower.includes("latency")) Icon = Zap;
                    else if (lower.includes("failure")) Icon = XCircle;
                    else if (lower.includes("mix")) Icon = PieChart;
                    else if (lower.includes("stm")) Icon = Target;
                    else if (lower.includes("ltm")) Icon = BookOpen;
                    else if (lower.includes("ratio")) Icon = Scale;
                    else if (lower.includes("health")) Icon = Activity;

                    return {
                      title: m,
                      description: "",
                      icon: Icon
                    };
                  })}
               />
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}