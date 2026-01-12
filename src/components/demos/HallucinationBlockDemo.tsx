import React, { useState } from "react";
import { Shield, CheckCircle2, AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface VerificationResult {
  claim: string;
  verified: boolean;
  confidence: number;
  source?: string;
}

export function HallucinationBlockDemo() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<VerificationResult[]>([]);

  const sampleResponse = "The Eiffel Tower was completed in 1889 and stands at 330 meters tall. It was designed by Gustave Eiffel for the 1889 World's Fair in Paris.";

  const handleVerify = () => {
    setIsVerifying(true);
    setShowResults(false);

    // Simulate verification process
    setTimeout(() => {
      setResults([
        {
          claim: "The Eiffel Tower was completed in 1889",
          verified: true,
          confidence: 98,
          source: "Historical Records Database"
        },
        {
          claim: "Stands at 330 meters tall",
          verified: true,
          confidence: 95,
          source: "Official Engineering Documents"
        },
        {
          claim: "Designed by Gustave Eiffel",
          verified: true,
          confidence: 99,
          source: "Architectural Archives"
        },
        {
          claim: "Built for the 1889 World's Fair",
          verified: true,
          confidence: 97,
          source: "Historical Records Database"
        }
      ]);
      setIsVerifying(false);
      setShowResults(true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResults(false);
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">AI Response Verification Pipeline</h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Shield className="h-3 w-3 mr-1" />
          Fact-Checking Active
        </Badge>
      </div>

      {/* Primary AI Response */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg shrink-0">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-slate-900">Primary AI Response</h4>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                Generation Model v2.1
              </Badge>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {sampleResponse}
            </p>
          </div>
        </div>

        {!showResults && (
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying Claims...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Run Verification
                </>
              )}
            </Button>
          </div>
        )}
      </Card>

      {/* Verification Results */}
      {showResults && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Verification Results
            </h4>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              All Claims Verified
            </Badge>
          </div>

          <div className="space-y-3">
            {results.map((result, idx) => (
              <Card key={idx} className="p-4 border-l-4 border-l-green-500 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      {result.verified ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                      )}
                      <p className="text-sm text-slate-900 font-medium">
                        {result.claim}
                      </p>
                    </div>
                    {result.source && (
                      <div className="flex items-center gap-2 ml-6 text-xs text-slate-500">
                        <ExternalLink className="h-3 w-3" />
                        <span>Source: {result.source}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-700">
                      {result.confidence}%
                    </div>
                    <div className="text-xs text-slate-500">confidence</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-slate-900 rounded-xl p-5 flex gap-4 items-center">
            <div className="bg-green-500/10 p-3 rounded-full shrink-0">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-green-400 mb-1">
                Ready to Deliver
              </div>
              <p className="text-slate-200 text-sm">
                Response verified and safe to deliver to user. All claims cross-referenced against source documents.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-slate-300"
            >
              Reset Demo
            </Button>
          </div>
        </div>
      )}

      {/* Pipeline Indicator */}
      {isVerifying && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-4 mb-4">
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Verification in Progress
              </h4>
              <p className="text-sm text-blue-700">
                Secondary model is cross-referencing claims against knowledge base...
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
