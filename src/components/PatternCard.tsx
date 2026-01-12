import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Pattern } from "../data/patterns";
import { PillarChip } from "./PillarChip";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Signal, Layers, Lock, Database } from "lucide-react";

import { cn } from "./ui/utils";

interface PatternCardProps {
  pattern: Pattern;
  index?: number;
  variant?: "expanded" | "compressed";
}

function PatternVisual({ pattern }: { pattern: Pattern }) {
  switch (pattern.id) {
    case "audit-trail":
      return (
        <div className="w-full h-full bg-muted flex items-center justify-center p-8">
          <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
            {/* Background lines */}
            <line x1="40" y1="10" x2="40" y2="110" className="stroke-border" strokeWidth="2" strokeDasharray="4 4"/>
            
            {/* Event 1 */}
            <g>
              <circle cx="40" cy="30" r="6" className="fill-primary"/>
              <rect x="60" y="20" width="120" height="20" rx="4" className="fill-card stroke-border" strokeWidth="1"/>
              <rect x="65" y="26" width="80" height="8" rx="2" className="fill-muted"/>
            </g>
            
            {/* Event 2 */}
            <g>
              <circle cx="40" cy="60" r="6" className="fill-primary"/>
              <rect x="60" y="50" width="120" height="20" rx="4" className="fill-card stroke-border" strokeWidth="1"/>
              <rect x="65" y="56" width="60" height="8" rx="2" className="fill-muted"/>
            </g>

             {/* Event 3 */}
             <g>
              <circle cx="40" cy="90" r="6" className="fill-amber-500"/>
              <rect x="60" y="80" width="120" height="20" rx="4" className="fill-card stroke-border" strokeWidth="1"/>
              <rect x="65" y="86" width="90" height="8" rx="2" className="fill-muted"/>
            </g>
          </svg>
        </div>
      );
    case "human-routing":
       return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* Paths */}
               <path d="M 20 60 L 60 60" fill="none" className="stroke-border" strokeWidth="3"/>
               <path d="M 60 60 C 90 60, 90 30, 120 30" fill="none" className="stroke-border" strokeWidth="3"/>
               <path d="M 60 60 C 90 60, 90 90, 120 90" fill="none" className="stroke-border" strokeWidth="3"/>
               
               {/* Nodes */}
               <circle cx="20" cy="60" r="8" className="fill-foreground"/>
               
               {/* Router */}
               <rect x="50" y="50" width="20" height="20" rx="4" className="fill-primary"/>

               {/* Ends */}
               <circle cx="120" cy="30" r="12" className="fill-card stroke-amber-500" strokeWidth="2"/>
               <text x="120" y="33" textAnchor="middle" fontSize="10" className="fill-amber-600 font-bold">H</text>
               
               <circle cx="120" cy="90" r="12" className="fill-card stroke-green-500" strokeWidth="2"/>
               <text x="120" y="93" textAnchor="middle" fontSize="10" className="fill-green-600 font-bold">AI</text>
            </svg>
         </div>
       );
    case "explainable-decisions":
        return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* Main Decision */}
               <rect x="80" y="40" width="40" height="40" rx="8" className="fill-primary"/>
               <path d="M 100 60 L 110 50 M 100 60 L 110 70" stroke="white" strokeWidth="2" strokeLinecap="round"/>

               {/* Tooltip/Explanation Bubble */}
               <path d="M 120 60 L 140 60" className="stroke-muted-foreground" strokeWidth="2" strokeDasharray="2 2"/>
               <rect x="140" y="30" width="50" height="60" rx="4" className="fill-card stroke-border" strokeWidth="1"/>
               <line x1="148" y1="45" x2="182" y2="45" className="stroke-border" strokeWidth="4" strokeLinecap="round"/>
               <line x1="148" y1="55" x2="172" y2="55" className="stroke-border" strokeWidth="4" strokeLinecap="round"/>
               <line x1="148" y1="65" x2="178" y2="65" className="stroke-border" strokeWidth="4" strokeLinecap="round"/>
            </svg>
         </div>
       );
    case "hallucination-block":
        return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* Input Flow */}
               <path d="M 20 60 L 70 60" fill="none" className="stroke-border" strokeWidth="3"/>
               
               {/* Filter/Verification Box */}
               <rect x="70" y="45" width="30" height="30" rx="4" className="fill-primary"/>
               
               {/* Filter Icon - Funnel shape */}
               <path d="M 78 53 L 78 67 M 92 53 L 92 67 M 78 53 L 92 53" stroke="white" strokeWidth="2" strokeLinecap="round"/>
               
               {/* Output Paths */}
               <path d="M 100 60 L 130 60" fill="none" className="stroke-border" strokeWidth="3"/>
               <path d="M 100 60 C 115 60, 115 35, 130 35" fill="none" className="stroke-border" strokeWidth="2" strokeDasharray="3 3"/>
               
               {/* Verified Output (checkmark) */}
               <circle cx="150" cy="60" r="18" className="fill-card stroke-green-500" strokeWidth="2"/>
               <path d="M 143 60 L 148 65 L 157 54" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
               
               {/* Blocked Output (X) */}
               <circle cx="150" cy="35" r="12" className="fill-card stroke-red-400" strokeWidth="2"/>
               <path d="M 145 30 L 155 40 M 155 30 L 145 40" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
            </svg>
         </div>
       );
    case "prompt-injection-shield":
        return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* Input arrow */}
               <path d="M 20 60 L 60 60" className="stroke-muted-foreground" strokeWidth="4" strokeLinecap="round"/>
               <path d="M 55 54 L 60 60 L 55 66" fill="none" className="stroke-muted-foreground" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
               
               {/* Shield - simple and bold */}
               <path d="M 100 30 L 100 30 C 90 30 80 32 80 38 L 80 65 C 80 78 90 90 100 95 C 110 90 120 78 120 65 L 120 38 C 120 32 110 30 100 30 Z" 
                     className="fill-primary stroke-primary" 
                     strokeWidth="3"/>
               
               {/* Checkmark on shield */}
               <path d="M 92 62 L 97 68 L 108 54" 
                     fill="none" 
                     stroke="white" 
                     strokeWidth="5" 
                     strokeLinecap="round" 
                     strokeLinejoin="round"/>
               
               {/* Output arrow */}
               <path d="M 140 60 L 180 60" stroke="#22c55e" strokeWidth="4" strokeLinecap="round"/>
               <path d="M 175 54 L 180 60 L 175 66" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </div>
       );
    case "emergency-stop":
        return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* Large stop sign octagon */}
               <path d="M 70 45 L 90 45 L 100 55 L 100 75 L 90 85 L 70 85 L 60 75 L 60 55 Z" 
                     className="fill-red-500 stroke-red-700" 
                     strokeWidth="4"/>
               
               {/* Hand/stop symbol - simplified */}
               <rect x="72" y="58" width="16" height="16" rx="2" className="fill-white"/>
               <rect x="78" y="52" width="4" height="8" rx="1" className="fill-white"/>
               
               {/* Input line (cut off) */}
               <path d="M 20 65 L 50 65" className="stroke-muted-foreground" strokeWidth="4" strokeLinecap="round"/>
               
               {/* Output line (cut off) */}
               <path d="M 110 65 L 140 65" className="stroke-border" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
               <circle cx="145" cy="65" r="3" className="fill-muted-foreground/30" opacity="0.3"/>
               <circle cx="155" cy="65" r="3" className="fill-muted-foreground/30" opacity="0.3"/>
               
               {/* Safe redirect arrow going down */}
               <path d="M 80 90 L 80 105" stroke="#22c55e" strokeWidth="4" strokeLinecap="round"/>
               <path d="M 74 100 L 80 105 L 86 100" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </div>
       );
    case "trust-visibility-dashboard":
        return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* Dashboard frame */}
               <rect x="30" y="20" width="140" height="80" rx="6" className="fill-card stroke-border" strokeWidth="2"/>
               
               {/* Three metric cards */}
               <rect x="40" y="35" width="35" height="25" rx="3" className="fill-blue-100 stroke-blue-300" strokeWidth="1.5"/>
               <rect x="82" y="35" width="35" height="25" rx="3" className="fill-green-100 stroke-green-300" strokeWidth="1.5"/>
               <rect x="124" y="35" width="35" height="25" rx="3" className="fill-amber-100 stroke-amber-300" strokeWidth="1.5"/>
               
               {/* Chart bars */}
               <rect x="45" y="72" width="8" height="18" rx="2" className="fill-blue-400"/>
               <rect x="58" y="78" width="8" height="12" rx="2" className="fill-blue-400"/>
               <rect x="71" y="68" width="8" height="22" rx="2" className="fill-blue-400"/>
               
               {/* Trend line */}
               <path d="M 95 85 L 108 78 L 121 82 L 134 72 L 147 76" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
               <circle cx="95" cy="85" r="3" className="fill-green-500"/>
               <circle cx="147" cy="76" r="3" className="fill-green-500"/>
            </svg>
         </div>
       );
    case "human-feedback-loop":
        return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* AI output box */}
               <rect x="30" y="35" width="50" height="30" rx="4" className="fill-blue-100 stroke-blue-400" strokeWidth="2"/>
               <circle cx="55" cy="50" r="8" className="fill-blue-400"/>
               
               {/* Arrow to user */}
               <path d="M 80 50 L 105 50" className="stroke-muted-foreground" strokeWidth="3" strokeLinecap="round"/>
               <path d="M 100 44 L 105 50 L 100 56" fill="none" className="stroke-muted-foreground" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
               
               {/* User icon */}
               <circle cx="125" cy="42" r="8" className="fill-muted stroke-muted-foreground" strokeWidth="2"/>
               <path d="M 112 65 Q 125 55 138 65" className="fill-muted stroke-muted-foreground" strokeWidth="2"/>
               
               {/* Feedback arrow (curved back) */}
               <path d="M 135 70 Q 160 85 120 95 Q 80 105 55 85" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"/>
               <path d="M 60 88 L 55 85 L 58 80" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
               
               {/* Thumbs up icon */}
               <circle cx="148" cy="78" r="8" className="fill-green-100 stroke-green-500" strokeWidth="2"/>
               <path d="M 146 80 L 148 76 L 150 80" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </div>
       );
    case "conversational-presets":
        return (
         <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
               {/* Chat input area */}
               <rect x="30" y="75" width="140" height="30" rx="15" className="fill-card stroke-border" strokeWidth="2"/>
               
               {/* Preset chips/buttons above */}
               <rect x="35" y="25" width="55" height="20" rx="10" className="fill-blue-100 stroke-blue-300" strokeWidth="1.5"/>
               <rect x="98" y="25" width="65" height="20" rx="10" className="fill-green-100 stroke-green-300" strokeWidth="1.5"/>
               
               <rect x="50" y="50" width="45" height="20" rx="10" className="fill-purple-100 stroke-purple-300" strokeWidth="1.5"/>
               <rect x="103" y="50" width="55" height="20" rx="10" className="fill-amber-100 stroke-amber-300" strokeWidth="1.5"/>
               
               {/* Lines in chips to represent text */}
               <line x1="42" y1="35" x2="82" y2="35" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
               <line x1="105" y1="35" x2="155" y2="35" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
               <line x1="58" y1="60" x2="87" y2="60" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
               <line x1="110" y1="60" x2="150" y2="60" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
               
               {/* Cursor/sparkle in input */}
               <circle cx="45" cy="90" r="2" className="fill-blue-400"/>
            </svg>
         </div>
       );
    case "okta-auth-block":
      return (
        <div className="w-full h-full bg-muted flex items-center justify-center p-6">
           <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
              <rect x="50" y="30" width="100" height="70" rx="6" className="fill-card stroke-border" strokeWidth="2"/>
              <rect x="50" y="30" width="100" height="20" className="fill-blue-100/50" />
              <circle cx="100" cy="70" r="16" className="fill-primary/20 stroke-primary" strokeWidth="2"/>
              <Lock className="text-primary h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" x="90" y="60" />
              <rect x="85" y="40" width="30" height="4" rx="2" className="fill-muted-foreground/30"/>
           </svg>
        </div>
      );
    case "memory-context-block":
      return (
        <div className="w-full h-full bg-muted flex items-center justify-center p-6">
           <svg width="100%" height="100%" viewBox="0 0 200 120" className="drop-shadow-sm">
              <rect x="60" y="30" width="80" height="20" rx="10" className="fill-card stroke-border" strokeWidth="2"/>
              <rect x="60" y="55" width="80" height="20" rx="10" className="fill-card stroke-border" strokeWidth="2"/>
              <rect x="60" y="80" width="80" height="20" rx="10" className="fill-card stroke-border" strokeWidth="2"/>
              <path d="M 100 40 L 100 90" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
           </svg>
        </div>
      );
    default:
        return (
          <div className="w-full h-full bg-muted flex items-center justify-center">
             <div className="p-4 bg-background/50 rounded-full">
               <Layers className="h-8 w-8 text-muted-foreground/40" />
             </div>
          </div>
        );
  }
}

export const PatternCard = forwardRef<HTMLDivElement, PatternCardProps>(({ pattern, index = 0, variant = "expanded" }, ref) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!pattern.comingSoon) {
      navigate(`/patterns/${pattern.id}`);
    }
  };

  const isCompressed = variant === "compressed";

  return (
    <div
      ref={ref}
      className={cn(isCompressed ? "w-full" : "h-full")}
    >
      <Card 
        className={cn(
          "group hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden relative rounded-lg border-border",
          pattern.comingSoon ? 'cursor-default opacity-80 hover:opacity-100 hover:shadow-sm' : 'cursor-pointer',
          isCompressed ? "flex flex-row items-center h-24" : "h-full flex flex-col"
        )}
        onClick={handleClick}
      >
        {/* Visual Section */}
        <div className={cn(
          "relative border-border bg-muted/20 overflow-hidden shrink-0",
          isCompressed ? "w-24 h-full border-r" : "w-full h-40 border-b"
        )}>
            <PatternVisual pattern={pattern} />
            
            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent opacity-100 pointer-events-none" />
            
            {!isCompressed && (
              <>
                <div className="absolute bottom-3 left-4">
                  <Badge variant={pattern.riskBand === "High" ? "destructive" : "secondary"} className="uppercase text-[10px] tracking-wider font-semibold shadow-sm bg-card/90 hover:bg-card text-foreground border-border">
                    {pattern.riskBand} Risk
                  </Badge>
                </div>

                {pattern.comingSoon && (
                  <div className="absolute top-3 right-4 z-10">
                    <Badge variant="outline" className="bg-background/90 backdrop-blur-md border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest shadow-sm">
                      Coming Soon
                    </Badge>
                  </div>
                )}
              </>
            )}

            {isCompressed && pattern.comingSoon && (
               <div className="absolute top-1 right-1 z-10">
                 <Lock className="w-3 h-3 text-muted-foreground/50" />
               </div>
            )}
        </div>

        {/* Content Section */}
        <div className={cn(
          "flex flex-col",
          isCompressed ? "flex-1 p-4 justify-center" : "gap-4 p-4 flex-grow"
        )}>
          {isCompressed ? (
            // Compressed Content
            <div className="flex items-center justify-between w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                    {pattern.name}
                  </h3>
                  {pattern.comingSoon && (
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 py-0 uppercase tracking-wider">Soon</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Signal className="h-3 w-3" /> Lvl {pattern.complexity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="h-3 w-3" /> {pattern.types.length} Types
                  </span>
                   <span className="flex items-center gap-1">
                     Risk: <span className={pattern.riskBand === 'High' ? 'text-destructive font-medium' : ''}>{pattern.riskBand}</span>
                   </span>
                </div>
              </div>

              {!pattern.comingSoon ? (
                 <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              ) : (
                <span className="text-xs text-muted-foreground/50 italic px-2">In development</span>
              )}
            </div>
          ) : (
            // Expanded Content
            <>
              <CardHeader className="p-0 pb-2">
                <div className="space-y-1.5">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors flex items-center justify-between">
                    {pattern.name}
                    {pattern.comingSoon && <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />}
                  </CardTitle>
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.pillars.map((p) => (
                      <PillarChip key={p} pillar={p} />
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex flex-col gap-4 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {pattern.outcome}
                </p>
                
                <div className="mt-auto pt-2 flex items-center justify-between text-xs text-muted-foreground">
                   <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <Signal className="h-3 w-3" /> Lvl {pattern.complexity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3" /> {pattern.types.length} Types
                    </span>
                  </div>
                  {!pattern.comingSoon && (
                    <span className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1 font-medium">
                      View Pattern <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                  {pattern.comingSoon && (
                    <span className="text-muted-foreground/60 italic flex items-center gap-1">
                      In development
                    </span>
                  )}
                </div>
              </CardContent>
            </>
          )}
        </div>
      </Card>
    </div>
  );
});

PatternCard.displayName = "PatternCard";