import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, CheckCircle, AlertTriangle, User, Bot, Clock, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

interface AuditEntry {
  id: string;
  timestamp: string;
  actor: "AI" | "Human";
  action: string;
  outcome: "Approved" | "Rejected" | "Flagged";
  confidence: number;
  details: string;
}

export function AuditTrailDemo() {
  const [entries, setEntries] = useState<AuditEntry[]>([
    {
      id: "evt_8823",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toLocaleTimeString(),
      actor: "AI",
      action: "Loan Application #4592",
      outcome: "Approved",
      confidence: 94,
      details: "Credit score > 750, DTI < 30%"
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const generateId = () => `evt_${Math.floor(Math.random() * 9000) + 1000}`;

  const runDecision = () => {
    const confidence = Math.random() * 100;
    const isHighConfidence = confidence > 80;
    const isRisk = Math.random() > 0.7;
    
    let outcome: AuditEntry["outcome"] = "Approved";
    let details = "Standard criteria met";
    
    if (isRisk) {
      outcome = "Flagged";
      details = "Unusual geolocation pattern detected";
    } else if (!isHighConfidence) {
      outcome = "Rejected";
      details = "Confidence threshold not met (Required: 80%)";
    }

    const newEntry: AuditEntry = {
      id: generateId(),
      timestamp: new Date().toLocaleTimeString(),
      actor: "AI",
      action: `Loan Application #${Math.floor(Math.random() * 5000) + 4000}`,
      outcome,
      confidence: Math.round(confidence),
      details
    };

    setEntries((prev) => [newEntry, ...prev]);
  };

  const addHumanOverride = () => {
    if (entries.length === 0) return;
    
    const lastEntry = entries[0];
    if (lastEntry.actor === "Human") return; // Don't double override

    const newEntry: AuditEntry = {
      id: generateId(),
      timestamp: new Date().toLocaleTimeString(),
      actor: "Human",
      action: `Review of ${lastEntry.id}`,
      outcome: lastEntry.outcome === "Approved" ? "Rejected" : "Approved",
      confidence: 100,
      details: `Manual override by Senior Reviewer`
    };
    
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" /> 
            Immutable Audit Log
          </h3>
          <p className="text-sm text-slate-500">
            Simulate AI decisions and human interventions. Every action is recorded.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runDecision} className="bg-slate-900 hover:bg-slate-800">
            <Bot className="mr-2 h-4 w-4" />
            Simulate AI Decision
          </Button>
          <Button variant="outline" onClick={addHumanOverride} disabled={entries.length === 0 || entries[0].actor === "Human"}>
            <User className="mr-2 h-4 w-4" />
            Human Override
          </Button>
        </div>
      </div>

      <Card className="bg-slate-50/50 border-slate-200 overflow-hidden shadow-inner h-[400px] flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-white text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2">Time / ID</div>
          <div className="col-span-2">Actor</div>
          <div className="col-span-3">Action</div>
          <div className="col-span-2">Outcome</div>
          <div className="col-span-3">Reasoning</div>
        </div>
        
        <ScrollArea className="flex-1 p-0">
          <div className="px-4 py-2 flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-12 gap-4 p-3 rounded-lg bg-white border border-slate-200 shadow-sm items-center text-sm">
                    <div className="col-span-2 flex flex-col">
                      <span className="font-mono text-xs text-slate-400">{entry.timestamp}</span>
                      <span className="font-mono text-xs font-medium text-slate-700">{entry.id}</span>
                    </div>
                    
                    <div className="col-span-2">
                      <Badge variant={entry.actor === "AI" ? "secondary" : "outline"} className="gap-1">
                        {entry.actor === "AI" ? <Bot size={10} /> : <User size={10} />}
                        {entry.actor}
                      </Badge>
                    </div>

                    <div className="col-span-3 font-medium text-slate-700 truncate" title={entry.action}>
                      {entry.action}
                    </div>

                    <div className="col-span-2">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium
                        ${entry.outcome === 'Approved' ? 'bg-green-50 text-green-700 border border-green-100' : 
                          entry.outcome === 'Flagged' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                          'bg-red-50 text-red-700 border border-red-100'}`}>
                        {entry.outcome === 'Approved' && <CheckCircle size={12} />}
                        {entry.outcome === 'Flagged' && <AlertTriangle size={12} />}
                        {entry.outcome === 'Rejected' && <ShieldAlert size={12} />}
                        {entry.outcome}
                      </div>
                    </div>

                    <div className="col-span-3 text-xs text-slate-500 leading-tight">
                      {entry.details}
                      {entry.actor === "AI" && (
                        <div className="mt-1 text-[10px] text-slate-400">
                          Confidence: <span className={entry.confidence > 80 ? "text-green-600" : "text-amber-600"}>{entry.confidence}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {entries.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Clock className="mx-auto h-8 w-8 mb-2 opacity-50" />
                No events recorded yet
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}