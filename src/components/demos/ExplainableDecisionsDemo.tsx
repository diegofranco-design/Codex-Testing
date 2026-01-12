import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, ChevronDown, ChevronUp, Zap, ThumbsUp, TrendingUp, Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export function ExplainableDecisionsDemo() {
  const [selectedRec, setSelectedRec] = useState<"A" | "B">("A");
  const [isExpanded, setIsExpanded] = useState(false);

  const data = {
    A: {
      title: "Premium Plan",
      matchScore: 94,
      reasons: [
        { label: "Usage History", score: 90, icon: Clock, desc: "Your team logs in daily" },
        { label: "Team Size", score: 85, icon: ThumbsUp, desc: "You have >10 active members" },
        { label: "Feature Fit", score: 60, icon: Zap, desc: "You use analytics heavily" },
      ]
    },
    B: {
      title: "Standard Plan",
      matchScore: 72,
      reasons: [
        { label: "Budget Match", score: 95, icon: TrendingUp, desc: "Fits your stated budget" },
        { label: "Usage History", score: 40, icon: Clock, desc: "Lower storage needs detected" },
        { label: "Location", score: 20, icon: MapPin, desc: "Region defaults" },
      ]
    }
  };

  const current = data[selectedRec];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left: The UI the user sees */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">System Recommendation</h3>
          <Badge variant="outline">Simulation</Badge>
        </div>

        <div className="grid gap-3">
          {(["A", "B"] as const).map((key) => (
            <div
              key={key}
              onClick={() => setSelectedRec(key)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 
                ${selectedRec === key 
                  ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900">{data[key].title}</div>
                  <div className="text-sm text-slate-500 mt-1">Based on your team's activity</div>
                </div>
                {selectedRec === key && (
                   <Badge className="bg-blue-600">Best Match</Badge>
                )}
              </div>
              
              {/* The "Explain" Trigger */}
              {selectedRec === key && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="mt-3 pt-3 border-t border-blue-200/60"
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-blue-700 hover:text-blue-800 hover:bg-transparent font-medium text-xs flex items-center gap-1"
                    onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                  >
                    <Info size={14} />
                    Why was this recommended?
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </Button>
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 text-center">Click a plan to see how the explanation updates.</p>
      </div>

      {/* Right: The Explanation View (Simulated Modal or Inline Expansion) */}
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative"
          >
            <Card className="h-full border-slate-200 shadow-lg overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Why {current.title}?</CardTitle>
                  <div className="text-2xl font-bold text-blue-600">{current.matchScore}% <span className="text-xs text-slate-400 font-normal block text-right">Match Score</span></div>
                </div>
                <CardDescription>
                  Key factors influencing this AI recommendation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                {current.reasons.map((r, idx) => (
                  <div key={idx} className="space-y-1.5 group">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2 font-medium text-slate-700">
                        <r.icon size={14} className="text-slate-400" />
                        {r.label}
                      </div>
                      <span className="text-slate-500 text-xs">{r.score}% impact</span>
                    </div>
                    <Progress value={r.score} className="h-2" indicatorClassName={r.score > 70 ? "bg-blue-500" : "bg-slate-300"} />
                    <p className="text-[10px] text-slate-400 pl-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      {r.desc}
                    </p>
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t text-xs text-slate-400 flex gap-2">
                  <Info size={12} className="shrink-0 mt-0.5" />
                  Calculated based on your workspace activity over the last 30 days and organization profile settings.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden md:flex items-center justify-center h-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 text-sm p-8 text-center"
          >
            <div>
              <Info className="mx-auto mb-2 opacity-50" size={32} />
              Select a plan and click <br/>"Why was this recommended?"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}