import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  ShieldAlert, 
  ShieldOff,
  ShieldCheck,
  TrendingDown,
  ActivitySquare,
  BarChart3,
  MessageSquare,
  Settings,
  XCircle,
  LifeBuoy,
  FileText
} from "lucide-react";
import { PatternPageTemplate, SectionHeading, SubHeading, Card, MetricsSection } from "./shared/PatternPageTemplate";

export function PatternPageEmergencyStop() {
  const [activeTab, setActiveTab] = useState("ux");

  const metadata = {
    title: "Emergency Stop",
    description: "A pre-filter layer that intercepts high-risk, malformed, or unsafe inputs before they reach the AI, or outputs before they reach the user back. It works as a kill switch: halting the interaction instantly, showing a safe fallback, and preventing the model from even attempting to process dangerous content.",
    category: "Safety",
    complexityBadge: { label: "Complexity: Intermediate", color: "amber" as const },
    typeBadges: [
      { label: "Type: Safety", color: "amber" as const },
    ],
    pillars: [
      { label: "Safety", color: "amber" as const },
    ],
    figmaAssetUrl: "https://www.figma.com/design/your-emergency-stop-assets"
  };

  return (
    <PatternPageTemplate metadata={metadata}>
      
      {/* 1. Trust Challenge */}
      <section id="story" className="scroll-mt-24 space-y-8">
        <div>
          <SectionHeading>1. Trust Challenge</SectionHeading>
          <p className="text-slate-600 leading-relaxed">
            What is the core risk to user trust, and when does it matter most?
          </p>
        </div>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 md:p-8">
          <p className="text-slate-800 leading-relaxed mb-4">
            AI systems can unintentionally respond to harmful or destabilizing inputs if they aren't screened beforehand. Without a guard that can stop critical failures early, the model may attempt to answer:
          </p>
          <ul className="space-y-2 text-slate-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Emergency or crisis content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Self-harm or harm-to-others disclosures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Illegal, abusive, or violent intent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Highly malformed, non-parsable, or corrupted input</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Requests that would lead to system errors or unpredictable behavior</span>
            </li>
          </ul>
          <p className="text-slate-800 leading-relaxed mt-4">
            If the AI tries to "be helpful" in any of these scenarios, the result can be both unsafe and trust-breaking.
          </p>
        </div>

        <div>
          <SubHeading>Critical moments where this pattern matters most:</SubHeading>
          <Card className="mb-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Crisis Detection:</strong> A user expresses harm to self or others and the system must stop responding conversationally and redirect to human or emergency resources.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Severe Policy Violations:</strong> Inputs that demand illegal actions or breach platform rules.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Structural Corruption:</strong> Inputs that are too malformed or ambiguous to interpret (system-level gibberish, broken tool calls, malformed JSON payloads).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>System Faults:</strong> Model timeouts, corrupted responses, or upstream failures where continuing interaction would confuse or mislead users.</p>
                </div>
              </li>
            </ul>
          </Card>
          <p className="text-slate-600 leading-relaxed">
            Without an Emergency Stop, the system continues "trying to answer" when it should decisively halt, opening users to potential harm.
          </p>
        </div>
      </section>

      {/* 2. Desired Outcome */}
      <section id="outcome" className="scroll-mt-24">
        <SectionHeading>2. Desired Outcome</SectionHeading>
        <p className="text-slate-600 leading-relaxed mb-8">
          What does 'trust done right' look like for this pattern?
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-red-500" />
          
          <div className="p-8 md:p-10">
            <p className="text-slate-700 leading-relaxed mb-8">
              A well-implemented Emergency Stop ensures the AI never proceeds when the safest action is to pause.
            </p>

            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {[
                { title: "Immediate Interception", desc: "Unsafe input never reaches the AI model; the flow is stopped at the gate.", icon: ShieldOff },
                { title: "Safe Fallback", desc: "Users see a calm, directive message explaining that the system cannot continue.", icon: MessageSquare },
                { title: "Clear Next Steps", desc: "The user is redirected to safe alternatives: Human support, crisis resources, compliant pathways, or a restart.", icon: LifeBuoy },
                { title: "Predictable Behavior", desc: "The system stops in the same way every time, reducing ambiguity in sensitive moments.", icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="mb-3 inline-flex p-2.5 rounded-xl bg-slate-50 text-amber-600 group-hover:bg-amber-50 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-xl p-5 md:p-6 flex gap-5 items-center">
              <div className="bg-emerald-500/10 p-3 rounded-full shrink-0">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Success State</div>
                <p className="text-slate-200 font-medium">
                  Users feel reassured that the system won't say something harmful or misleading. When a request crosses a line, it clearly stops and guides them to safer options instead of trying to guess.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Implementation Constraints */}
      <section id="constraints" className="scroll-mt-24">
        <SectionHeading>3. Implementation Constraints</SectionHeading>
        <p className="text-slate-600 leading-relaxed mb-6">
          What limitations or requirements shape how this pattern can be applied?
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          To apply Emergency Stop effectively, you need:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-900 mb-4">Requirements</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>High-risk Classifier:</strong> A deterministic or ML-based filter that can detect crisis language, illegal intent, abusive content, or malformed requests.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Immediate Short-circuiting:</strong> A mechanism that halts the pipeline before generation, before any tools or reasoning steps executed.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Fallback Templates:</strong> Pre-defined, vetted messages appropriate for each failure mode (crisis, illegal request, corruption, unknown error).</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h4 className="font-semibold text-amber-900 mb-4">Constraints / Limitations</h4>
            <ul className="space-y-3 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Over-triggering:</strong> Too sensitive a filter can block normal requests and frustrate users.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Localization & Sensitivity:</strong> Crisis or high-risk phrasing varies by language and culture; classifiers must be validated on relevant linguistic contexts.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Human Pathways:</strong> The redirect must be appropriate: crisis flows need real resources, not vague suggestions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Pattern in Practice */}
      <section id="practice" className="scroll-mt-24">
        <SectionHeading>4. Pattern in Practice</SectionHeading>
        <p className="text-slate-600 leading-relaxed mb-8">
          What specific mechanism or behavior will address the risk in the product?
        </p>
        
        {/* Core Mechanism */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 mb-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Core mechanism:</h3>
          <p className="text-slate-700 mb-6">
            The Emergency Stop sits as a first-pass gate before any AI reasoning or tool use. The flow:
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {[
              { label: 'Receive Input', value: 'User input enters the system.' },
              { label: 'Screen for Risk', value: 'High-risk classifier scans for crisis language, illegal intent, malformed input, or corruption patterns.' },
              { label: 'If Risk Detected', value: 'Do not send the prompt to the LLM. Do not call any tools. Immediately return a safe fallback response with clear next steps.' },
              { label: 'If Safe', value: 'Pass the input forward into the normal LLM pipeline.' },
            ].map((item, i) => (
              <div key={i} className="p-4 grid sm:grid-cols-[160px_1fr] gap-2 items-start transition-colors hover:bg-slate-100/50">
                <strong className="text-slate-900 text-sm">{item.label}</strong>
                <span className="text-slate-600 text-sm">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
             <h4 className="font-semibold text-slate-900 mb-3">Behavior in the UI / conversation:</h4>
             <p className="text-slate-700 text-sm mb-4">
               From the user's perspective, Emergency Stop shows up as a single, clear interruption instead of a normal AI answer:
             </p>
             <ul className="space-y-2 text-sm text-slate-700">
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span>A short message that explains, at a high level, why the system can't continue with this request.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span>A pointer to what the user can do next (e.g., contact a human, use crisis resources, retry with a different kind of question).</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span>No extra conversational back-and-forth from the AI after the stop—the safeguard is the last word for that input.</span>
               </li>
             </ul>
             <p className="text-slate-600 text-sm mt-4">
               The system decisively halts instead of trying to "be helpful" in harmful ways.
             </p>
          </div>
        </div>

        {/* Tabs for Details */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {[
              { id: "ux", label: "Figma Assets: The UI Kit" },
              { id: "tech", label: "Technical Approach" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 bg-blue-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 min-h-[300px]">
            {activeTab === "ux" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <p className="text-slate-600 leading-relaxed">
                  Use these components to visualize the effect of the emergency stop.
                </p>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">1. Emergency Alert Card</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> Main visible surface when a hard stop is triggered.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Prominent card or modal that replaces expected response.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Icon + title:</strong> "Safety Notice", "We can't continue with this request"</li>
                      <li><strong>1–3 lines of explanation</strong></li>
                      <li><strong>Primary action:</strong> e.g., "Get help", "Contact support", "Try again"</li>
                    </ul>
                    <p className="text-sm text-slate-500 mt-2"><strong>Style:</strong> Prominent but calm; supportive tone, high contrast, limited text.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">2. Soft Halt Toast</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> For non-critical stops (e.g., malformed input, transient system error).</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Small toast or banner at top/bottom of viewport.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Short text:</strong> "We couldn't process this request. Please try again."</li>
                      <li><strong>Optional "Retry" button</strong></li>
                    </ul>
                    <p className="text-sm text-slate-500 mt-2"><strong>Style:</strong> Subtle banner or toast, non-alarming.</p>
                  </div>
                </div>

                <p className="text-slate-500 text-sm italic">
                  These components provide decisive, calm feedback that guides users to safe next steps without creating panic or confusion.
                </p>
              </div>
            )}

            {activeTab === "tech" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                  <FileText className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-1">Technical Approach: The Implementation</h4>
                  <p className="text-slate-500 text-sm">(Content to be added)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Best Used When */}
      <section id="fit" className="scroll-mt-24">
        <SectionHeading>5. Best Used When</SectionHeading>
        <p className="text-slate-600 leading-relaxed mb-6">
          In which contexts does this pattern create the greatest trust value?
        </p>
        
        <p className="text-slate-700 leading-relaxed mb-6">
          Emergency Stop is especially valuable when:
        </p>

        <Card className="mb-6">
          <div className="space-y-6">
            {[
              { title: "Crisis or Distress Messages", desc: "Your assistant may receive messages about self-harm, harm to others, or emergency situations requiring immediate human intervention." },
              { title: "Real-World Actions", desc: "The AI can control or influence transactions, devices, critical systems, or other high-stakes operations." },
              { title: "Structured Commands", desc: "Inputs can include tool calls or structured commands where malformed requests might cause unpredictable or unsafe behavior." },
              { title: "Regulatory Risk", desc: "There are regulatory or reputational risks if the AI responds inappropriately to certain topics or illegal requests." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-slate-600 leading-relaxed">
          In these settings, knowing the system will decisively stop—and not improvise—adds a meaningful layer of safety.
        </p>
      </section>

      {/* 6. Use With Caution */}
      <section id="risks" className="scroll-mt-24">
        <SectionHeading className="flex items-center gap-3">
          6. Use With Caution
          <ShieldAlert className="h-8 w-8 text-amber-500" />
        </SectionHeading>
        
        <p className="text-slate-600 mb-6">When could applying this pattern create friction or unintended effects?</p>

        <div className="bg-amber-50 rounded-xl p-6 md:p-8 border border-amber-100 mb-8">
          <h3 className="font-bold text-amber-900 mb-6">Risks and Anti-Patterns:</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Over-protection</h4>
              <p className="text-sm text-amber-900">
                Blocking too frequently will frustrate users and make them feel censored or that the system is broken.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Vague Warnings</h4>
              <p className="text-sm text-amber-900">
                A generic "I can't help with that" without context or next steps creates confusion and erodes trust.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Insensitive Crisis Messaging</h4>
              <p className="text-sm text-amber-900">
                Tone must be non-judgmental and supportive; poorly phrased alerts can worsen user distress in crisis situations.
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-slate-50 rounded-r-lg">
          <h4 className="font-bold text-slate-900 mb-3">To use this pattern safely:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Tune filters based on real usage data:</strong> Monitor false positive rates and adjust thresholds.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Match crisis copy to local norms and verified resources:</strong> Ensure appropriate cultural sensitivity and real help pathways.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Support human review/override processes:</strong> Avoid over-triggering by having humans audit and adjust stop logic.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 7. How to Measure Success */}
      <section id="measurement" className="scroll-mt-24">
        <SectionHeading>7. How to Measure Success</SectionHeading>
        <p className="text-slate-600 mb-8">How will we know this pattern is strengthening trust?</p>

        <MetricsSection
          northStar={{
            title: "Emergency Stop Activation Accuracy",
            description: "The percentage of Emergency Stop activations that were later confirmed, via audit reviews, to be appropriate.",
            icon: ShieldCheck
          }}
          supportingMetrics={[
            {
              title: "False Positive Rate",
              description: "Percentage of stops that blocked legitimate, safe requests—indicates over-sensitivity.",
              icon: TrendingDown
            },
            {
              title: "Crisis Redirect Success Rate",
              description: "Percentage of users who engaged with provided crisis resources after a stop.",
              icon: LifeBuoy
            },
            {
              title: "Stop-to-Recovery Time",
              description: "Average time from Emergency Stop to user re-engagement with safe request.",
              icon: ActivitySquare
            },
            {
              title: "User Feedback on Stops",
              description: "Qualitative feedback specifically on Emergency Stop messages—tone, clarity, and helpfulness.",
              icon: BarChart3
            }
          ]}
        />
      </section>

    </PatternPageTemplate>
  );
}
