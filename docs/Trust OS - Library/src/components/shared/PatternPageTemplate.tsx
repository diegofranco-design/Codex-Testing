import React, { useState } from "react";
import { BookOpen, Layers, TrendingUp, LucideIcon } from "lucide-react";
import { PageSidebar } from "./PageSidebar";

// Shared UI Components
const SectionHeading = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => (
  <h2 id={id} className={`text-2xl md:text-3xl font-bold text-slate-900 mb-4 scroll-mt-24 ${className}`}>
    {children}
  </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-8">
    {children}
  </h3>
);

const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" | "amber" | "slate" | "purple" }) => {
  const styles = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    slate: "bg-slate-100 text-slate-800 border-slate-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[color]}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

// Metrics Section Component
interface Metric {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface MetricsSectionProps {
  northStar: {
    title: string;
    description: string;
    icon?: LucideIcon;
    accentColor?: string;
  };
  supportingMetrics: Metric[];
}

const MetricsSection = ({ northStar, supportingMetrics }: MetricsSectionProps) => {
  const NorthStarIcon = northStar.icon || TrendingUp;
  
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {/* North Star Metric Card */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary via-primary/80 to-primary shadow-xl">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-white/5 opacity-10 blur-3xl" />
        
        <div className="relative z-10 p-8">
          {/* Icon */}
          <div className="inline-flex p-3 rounded-xl bg-background/20 mb-6">
            <NorthStarIcon className="h-7 w-7 text-primary-foreground" />
          </div>
          
          {/* Label */}
          <div className="text-xs font-bold uppercase tracking-widest text-primary-foreground/90 mb-3 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-current text-primary-foreground" />
            North Star Metric
          </div>
          
          {/* Title */}
          <h3 className="text-3xl font-bold text-primary-foreground mb-4 leading-tight">
            {northStar.title}
          </h3>
          
          {/* Description */}
          <p className="text-primary-foreground/80 leading-relaxed">
            {northStar.description}
          </p>
        </div>
      </div>
      
      {/* Supporting Metrics */}
      <div className="space-y-4">
        {supportingMetrics.map((metric, index) => {
          const MetricIcon = metric.icon;
          return (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <MetricIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-base mb-1">
                    {metric.title.split(":")[0]}
                  </h4>
                  {metric.title.split(":")[1] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {metric.title.split(":")[1].trim()}
                    </p>
                  )}
                  {metric.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export shared components
export { SectionHeading, SubHeading, Badge, Card, MetricsSection };
export type { Metric, MetricsSectionProps };

// Pattern page template props
interface PatternMetadata {
  title: string;
  description: string;
  category: string;
  complexityBadge: {
    label: string;
    color: "blue" | "green" | "amber" | "slate" | "purple";
  };
  typeBadges: Array<{
    label: string;
    color: "blue" | "green" | "amber" | "slate" | "purple";
  }>;
  pillars: Array<{
    label: string;
    color: "blue" | "green" | "amber" | "slate" | "purple";
  }>;
  figmaAssetUrl?: string;
}

interface PatternPageTemplateProps {
  metadata: PatternMetadata;
  children: React.ReactNode;
}

export function PatternPageTemplate({ metadata, children }: PatternPageTemplateProps) {
  const [activeSection, setActiveSection] = useState("");

  const SECTIONS = [
    { id: "story", label: "1. Trust Challenge" },
    { id: "outcome", label: "2. Desired Outcome" },
    { id: "constraints", label: "3. Implementation Constraints" },
    { id: "practice", label: "4. Pattern in Practice" },
    { id: "fit", label: "5. Best Used When" },
    { id: "risks", label: "6. Use With Caution" },
    { id: "measurement", label: "7. How to Measure Success" },
  ];

  React.useEffect(() => {
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

    SECTIONS.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center text-sm text-slate-500">
          <span className="hover:text-slate-900 cursor-pointer">Patterns</span>
          <span className="mx-2">/</span>
          <span className="hover:text-slate-900 cursor-pointer">{metadata.category}</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-900">{metadata.title}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge color={metadata.complexityBadge.color}>{metadata.complexityBadge.label}</Badge>
              {metadata.typeBadges.map((badge, i) => (
                <Badge key={i} color={badge.color}>{badge.label}</Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {metadata.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {metadata.description}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          
          {/* --- LEFT SIDEBAR (Sticky) --- */}
          <aside className="hidden lg:block">
            <PageSidebar 
              sections={SECTIONS}
              activeSection={activeSection}
              pillars={metadata.pillars}
              figmaAssetUrl={metadata.figmaAssetUrl}
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
          <main className="min-w-0 space-y-16">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}