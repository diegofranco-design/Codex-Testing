import { useState } from "react";
import { PATTERNS, PILLARS, PATTERN_TYPES, PatternType, Pillar } from "../data/patterns";
import { PatternCard } from "./PatternCard";
import { Search, Sparkles, Filter, X, ChevronDown, ChevronUp, SlidersHorizontal, Mail, ArrowRight, LayoutGrid, List, AlignJustify } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { motion, AnimatePresence } from "motion/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "./ui/utils";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [pillarFilter, setPillarFilter] = useState<"All" | Pillar>("All");
  const [selectedTypes, setSelectedTypes] = useState<PatternType[]>([]);
  const [complexityRange, setComplexityRange] = useState([1, 5]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'expanded' | 'compressed'>("expanded");

  const toggleType = (type: PatternType) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type]
    );
  };

  const filtered = PATTERNS.filter((p) => {
    const q = query.trim().toLowerCase();

    const matchesSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));

    const matchesPillar =
      pillarFilter === "All" || p.pillars.includes(pillarFilter);

    const matchesType =
      selectedTypes.length === 0 ||
      p.types.some((t) => selectedTypes.includes(t));

    const matchesComplexity =
      p.complexity >= complexityRange[0] && p.complexity <= complexityRange[1];

    return matchesSearch && matchesPillar && matchesType && matchesComplexity;
  });

  const clearFilters = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling the collapsible when clicking reset
    setQuery("");
    setPillarFilter("All");
    setSelectedTypes([]);
    setComplexityRange([1, 5]);
  };

  const activeFiltersCount = (pillarFilter !== "All" ? 1 : 0) + selectedTypes.length + (complexityRange[0] !== 1 || complexityRange[1] !== 5 ? 1 : 0);

  // Show all patterns in the grid, sorted so coming soon are last
  const availablePatterns = [...filtered].sort((a, b) => 
    (a.comingSoon === b.comingSoon ? 0 : a.comingSoon ? 1 : -1)
  );
  
  // Keep separate list for the footer background
  const comingSoonPatterns = PATTERNS.filter(p => p.comingSoon);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative pt-8 pb-4 md:pt-12 md:pb-8">
        <div className="max-w-4xl mx-auto text-center relative z-10 min-h-[50vh] flex flex-col justify-center">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] opacity-0 md:opacity-100 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-4 mb-10"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <Badge variant="outline" className="px-3 py-1 rounded-full border-blue-200 bg-white/60 backdrop-blur-sm text-primary font-medium text-xs shadow-sm">
                <span className="relative flex h-1.5 w-1.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                Trust OS · Internal Beta
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              Our practical standard for building
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-violet-600 pb-1">
                trustworthy AI at Arionkoder.
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              Trust OS is a shared library of proven patterns and guidance to help teams design and ship AI that is reliable, secure, safe, and transparent.
            </p>

            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="rounded-full px-6 h-10 bg-primary hover:bg-blue-700 text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 min-w-[160px] text-sm font-semibold"
                  onClick={() => document.getElementById('library-content')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Open the library
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-6 h-10 border-border hover:bg-muted hover:text-foreground min-w-[160px] text-sm bg-background/80 backdrop-blur-sm font-medium"
                >
                  Request support
                </Button>
              </div>
              <a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                Send feedback / suggest a pattern
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid Section */}
      <section id="library-content" className="space-y-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
             <h2 className="text-3xl font-bold tracking-tight text-foreground">Patterns</h2>
          </div>

          {/* Filters Panel - Collapsible */}
          <Collapsible
            open={isFiltersOpen}
            onOpenChange={setIsFiltersOpen}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-card/50">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent text-foreground hover:text-primary font-medium flex items-center gap-2 group w-auto">
                  <div className={`p-1.5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors`}>
                     <SlidersHorizontal className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Filter Patterns</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isFiltersOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  Reset filters ({activeFiltersCount})
                </Button>
              )}
            </div>

            <CollapsibleContent>
              <div className="px-6 pb-6 pt-2 space-y-6 border-t border-border/50">
                {/* Pillar Filter */}
                <div className="space-y-3">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    By Pillar
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={pillarFilter === "All" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPillarFilter("All")}
                      className={`rounded-full h-8 px-4 text-xs font-medium border transition-all ${pillarFilter === "All" ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-md" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                      All
                    </Button>
                    {PILLARS.map((p) => (
                      <Button
                        key={p}
                        variant={pillarFilter === p ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPillarFilter(p)}
                        className={`rounded-full h-8 px-4 text-xs font-medium border transition-all ${pillarFilter === p ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-md" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-border/50">
                  {/* Type Filter (Multi-select) */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      By Pattern Type
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {PATTERN_TYPES.map((type) => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <Badge
                            key={type}
                            variant="outline"
                            className={`cursor-pointer px-3 py-1.5 text-xs font-medium transition-all rounded-full select-none ${
                              isSelected 
                                ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" 
                                : "bg-background hover:bg-muted text-muted-foreground border-border hover:border-border/80"
                            }`}
                            onClick={() => toggleType(type)}
                          >
                            {type}
                            {isSelected && <X className="ml-1.5 h-3 w-3" />}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* Complexity Slider */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Complexity Level</span>
                      <Badge variant="secondary" className="font-normal bg-muted border border-border text-[10px] px-2 py-0.5">
                        Level {complexityRange[0]} - {complexityRange[1]}
                      </Badge>
                    </div>
                    <div className="px-1">
                      <Slider
                        defaultValue={[1, 5]}
                        value={complexityRange}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={setComplexityRange}
                        className="py-2"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-wider">
                        <span>Basic</span>
                        <span>Complex</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Results Info & View Toggles */}
        <div className="flex items-center justify-between">
           <div className="text-sm text-muted-foreground font-medium">
              Showing {availablePatterns.length} {availablePatterns.length === 1 ? 'pattern' : 'patterns'}
           </div>
           
           <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border">
              <Button 
                variant={viewMode === 'expanded' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('expanded')}
                className={cn("h-7 px-2.5 rounded-md", viewMode === 'expanded' && "bg-white shadow-sm dark:bg-zinc-800")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button 
                variant={viewMode === 'compressed' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('compressed')}
                className={cn("h-7 px-2.5 rounded-md", viewMode === 'compressed' && "bg-white shadow-sm dark:bg-zinc-800")}
              >
                <AlignJustify className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
           </div>
        </div>

        {/* Grid */}
        <div className={cn(
          "grid gap-4 md:gap-6",
          viewMode === 'expanded' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2" 
        )}>
            {availablePatterns.map((pattern, index) => (
              <PatternCard key={pattern.id} pattern={pattern} index={index} variant={viewMode} />
            ))}
        </div>

        {availablePatterns.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-muted/30 rounded-3xl border border-dashed border-border"
          >
            <div className="mx-auto h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No patterns found</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              We couldn't find any patterns matching your current filters. Try adjusting your complexity range or removing some filters.
            </p>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="mt-6 border-border"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}

        {/* Feedback / Internal Beta Section */}
        {comingSoonPatterns.length > 0 && (
          <section className="mt-16 relative">
             {/* Background Patterns (Visual Only) */}
             <div className="relative rounded-2xl overflow-hidden min-h-[500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 absolute inset-0 opacity-20 pointer-events-none">
                {comingSoonPatterns.slice(0, 6).map((pattern, index) => (
                   <PatternCard key={pattern.id} pattern={pattern} index={index} />
                ))}
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background flex flex-col items-center justify-center p-8 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <Badge variant="outline" className="mb-6 border-blue-200 bg-blue-50 text-primary font-semibold tracking-wider">
                    INTERNAL BETA
                  </Badge>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                    Try one pattern. Tell us what happened.
                  </h3>
                  
                  <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                    Pick a pattern that fits your current work, implement it, then share what worked, what didn’t, and what’s missing. We’ll use feedback to improve and expand the library based on real delivery needs.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      size="lg" 
                      className="rounded-full px-8 h-12 bg-primary hover:bg-blue-700 text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                      onClick={() => document.getElementById('library-content')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Find a pattern for my project
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full px-8 h-12 border-border hover:bg-muted font-medium w-full sm:w-auto"
                    >
                      Send feedback
                    </Button>
                  </div>

                  <div className="mt-8">
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                      Request support
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}