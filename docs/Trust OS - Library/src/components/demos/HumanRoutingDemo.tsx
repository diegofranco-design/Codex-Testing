import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Bot, CheckCircle, AlertTriangle, ArrowRight, Play, GitMerge, ShieldAlert, X } from "lucide-react";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function HumanRoutingDemo() {
  // State
  const [confidence, setConfidence] = useState([85]);
  const [risk, setRisk] = useState<"Low" | "Medium" | "High">("Medium");
  const [simulating, setSimulating] = useState(false);
  const [routed, setRouted] = useState(false);
  const [humanAction, setHumanAction] = useState<"Accepted" | "Overridden" | "Escalated" | null>(null);

  // Logic
  const isHighRisk = risk === "High";
  const isLowConfidence = confidence[0] < 75;
  const shouldRouteToHuman = isHighRisk || isLowConfidence;
  
  const routingReason = isHighRisk 
    ? "High Risk Factor" 
    : isLowConfidence 
      ? "Low Confidence (< 75%)" 
      : "Safe for Automation";

  const simulateTask = () => {
    setSimulating(true);
    setRouted(false);
    setHumanAction(null);
    
    setTimeout(() => {
      setSimulating(false);
      setRouted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Demo Toolbar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
         <div className="flex flex-col sm:flex-row gap-6 flex-1 w-full">
            {/* Risk Selector */}
            <div className="space-y-3 flex-1">
               <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Risk Level</Label>
               <div className="flex gap-2">
                  {(["Low", "Medium", "High"] as const).map((r) => (
                     <button
                        key={r}
                        onClick={() => setRisk(r)}
                        className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                           risk === r 
                              ? r === "High" ? "bg-red-50 border-red-200 text-red-700" : "bg-slate-800 border-slate-800 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                     >
                        {r}
                     </button>
                  ))}
               </div>
            </div>

            {/* Confidence Slider */}
            <div className="space-y-3 flex-1 min-w-[180px]">
               <div className="flex justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Model Confidence</Label>
                  <span className={`font-mono text-xs font-bold ${confidence[0] < 75 ? 'text-amber-600' : 'text-green-600'}`}>
                     {confidence[0]}%
                  </span>
               </div>
               <Slider 
                  value={confidence} 
                  onValueChange={setConfidence} 
                  min={50} 
                  max={99} 
                  step={1}
               />
            </div>
         </div>

         <div className="w-full lg:w-auto pl-0 lg:pl-6 lg:border-l border-slate-100">
            <Button 
               onClick={simulateTask} 
               disabled={simulating}
               className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm shadow-blue-200"
            >
               {simulating ? "Processing..." : (
                  <>
                     <Play className="h-4 w-4 fill-current" /> Simulate Task
                  </>
               )}
            </Button>
         </div>
      </div>

      {/* Demo Body */}
      <div className="grid md:grid-cols-2 gap-6">
         {/* Left: Task Card */}
         <Card className="overflow-hidden border-slate-200 shadow-sm bg-white h-full flex flex-col">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Badge variant="outline" className="bg-white">Task #123</Badge>
                     <span className="text-xs text-slate-400">Incoming Request</span>
                  </div>
                  {routed && (
                     <Badge className={shouldRouteToHuman ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100" : "bg-green-100 text-green-700 border-green-200 hover:bg-green-100"}>
                        {shouldRouteToHuman ? "Needs Review" : "Auto-Handled"}
                     </Badge>
                  )}
               </div>
            </CardHeader>
            <CardContent className="pt-6 flex-grow space-y-6">
               <div className="space-y-2">
                  <Label className="text-xs text-slate-500 uppercase">Request Content</Label>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">
                     "Approve transaction of $5,000 to new vendor 'Acme Corp' (First time transfer)"
                  </p>
               </div>

               <div className="space-y-3">
                  <Label className="text-xs text-slate-500 uppercase">AI Suggestion</Label>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                           <Bot size={16} />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-900">Approve Transfer</div>
                           <div className="text-xs text-slate-500">Based on historical patterns</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className={`text-sm font-bold ${confidence[0] < 75 ? 'text-amber-600' : 'text-green-600'}`}>{confidence[0]}%</div>
                        <div className="text-[10px] text-slate-400">Confidence</div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Right: Routing Outcome */}
         <Card className="overflow-hidden border-slate-200 shadow-sm bg-white h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-100">
               <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Routing Decision</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex-grow flex flex-col items-center justify-center text-center min-h-[200px]">
               {!routed ? (
                  <div className="text-slate-300 flex flex-col items-center gap-3">
                     <GitMerge className="h-12 w-12 opacity-20" />
                     <p className="text-sm">Waiting for simulation...</p>
                  </div>
               ) : shouldRouteToHuman ? (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="w-full max-w-xs space-y-4"
                  >
                     <div className="mx-auto h-16 w-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
                        <User size={32} />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900">Routed to Human</h3>
                        <p className="text-sm text-amber-600 font-medium mt-1">Reason: {routingReason}</p>
                     </div>
                     
                     {/* Human Actions */}
                     {!humanAction ? (
                        <div className="pt-4 grid grid-cols-2 gap-2">
                           <Button onClick={() => setHumanAction("Accepted")} size="sm" className="bg-green-600 hover:bg-green-700 text-white w-full col-span-2">
                              <CheckCircle className="h-4 w-4 mr-2" /> Accept AI Suggestion
                           </Button>
                           <Button onClick={() => setHumanAction("Overridden")} variant="outline" size="sm" className="w-full border-slate-200">
                              Override
                           </Button>
                           <Button onClick={() => setHumanAction("Escalated")} variant="outline" size="sm" className="w-full border-slate-200 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                              Escalate
                           </Button>
                        </div>
                     ) : (
                        <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm"
                        >
                           <div className="flex items-center justify-center gap-2 font-medium text-slate-900 mb-1">
                              <User className="h-4 w-4" />
                              Human took control
                           </div>
                           <div className="text-slate-500">
                              Action logged: <span className="font-medium text-slate-700">{humanAction}</span>
                           </div>
                           <Button variant="link" size="sm" onClick={() => setHumanAction(null)} className="h-auto p-0 mt-2 text-xs text-blue-600">
                              Undo decision
                           </Button>
                        </motion.div>
                     )}
                  </motion.div>
               ) : (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="space-y-4"
                  >
                     <div className="mx-auto h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle size={32} />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900">Auto-Approved</h3>
                        <p className="text-sm text-green-600 font-medium mt-1">Reason: {routingReason}</p>
                     </div>
                     <p className="text-xs text-slate-400 max-w-[200px] mx-auto">
                        High confidence and acceptable risk allowed AI to complete this task instantly.
                     </p>
                  </motion.div>
               )}
            </CardContent>
         </Card>
      </div>
    </div>
  );
}