import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  Link2,
  BadgeCheck,
  Sparkles,
  MousePointerClick,
  ThumbsDown,
  Clock,
  XCircle,
  Target
} from "lucide-react";
import { PatternPageTemplate, SectionHeading, SubHeading, Card, MetricsSection } from "./shared/PatternPageTemplate";

export function PatternPageHallucinationBlock() {
  const [activeTab, setActiveTab] = useState("ux");

  const metadata = {
    title: "Hallucination Block",
    description: "Before an AI-generated answer is shown, a second agent (\"The Judge\") verifies that it is grounded in the provided context, blocking unverified statements from reaching the user.",
    category: "Architecture / Verification",
    complexityBadge: { label: "Complexity: Intermediate", color: "amber" as const },
    typeBadges: [
      { label: "Type: Architecture / Verification", color: "purple" as const },
      { label: "Accuracy", color: "green" as const },
    ],
    pillars: [
      { label: "Accuracy", color: "green" as const },
      { label: "Reliability", color: "blue" as const },
    ],
    figmaAssetUrl: "https://www.figma.com/design/UMSqRn7Cdh9snCcOXvTpNa/POC-Wireframes?node-id=343-1507&t=Mci7p68NvyMKmwrw-4"
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
        
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 md:p-8 mb-8">
          <p className="text-slate-800 leading-relaxed mb-4">
            LLMs are confident storytellers. When data is missing, unclear, or contradictory, they often fill gaps with fluent but incorrect answers instead of admitting uncertainty.
          </p>
          <p className="text-slate-800 leading-relaxed">
            From a user's perspective, this is worse than "I don't know." It feels like being lied to by a system that sounds authoritative.
          </p>
        </div>

        <div>
          <SubHeading>Critical moments where this pattern matters most:</SubHeading>
          <Card className="mb-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700">The answer depends on live or factual data (records, schedules, prices, policies, status).</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700">The system is expected to be source-of-truth, not just a brainstorming tool.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700">Mistakes have real consequences (money, access, health, legal, safety).</p>
                </div>
              </li>
            </ul>
          </Card>
          <p className="text-slate-600 leading-relaxed">
            Without a verification layer, users are forced to double-check every single output manually, negating the efficiency gains of using AI in the first place.
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
          
          <div className="p-8 md:p-10">
            <p className="text-slate-700 leading-relaxed mb-8">
              Hallucination Block is working when answers are grounded, not guessed.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { title: "Evidence-Backed Responses", desc: "Factual answers are consistent with the underlying data and policies the product is built on.", icon: ShieldCheck },
                { title: "Honest Uncertainty", desc: "When data is missing or ambiguous, the assistant says \"I'm not sure\" or offers a safe fallback instead of inventing.", icon: Link2 },
                { title: "Reduced \"Confidently Wrong\" Moments", desc: "Users see fewer situations where the AI says something fluent but obviously untrue.", icon: XCircle },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="mb-3 inline-flex p-2.5 rounded-xl bg-slate-50 text-green-600 group-hover:bg-green-50 transition-colors">
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
                  Users come to expect that if the assistant states a fact about their account, a policy, or the system, it is either correct or clearly marked as uncertain or pending verification.
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
          To apply Hallucination Block effectively, you need:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-900 mb-4">Requirements</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Trusted Context:</strong> Clear access to the data and rules that should constrain answers (APIs, databases, documents, policies). The judge cannot evaluate answers in a vacuum.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Separation of Roles:</strong> A "generator" that drafts responses and a "judge" that evaluates them; these can be separate models or the same model in a different mode, but their responsibilities are distinct.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Evaluation Rubric:</strong> The Judge needs clear instructions on what constitutes an error. Is a slight rephrasing okay? Or must it be an exact semantic match? You need to define these thresholds rigorously.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Structured Feedback Channel:</strong> A way for the judge to label an answer as supported, unsupported, unsafe, or incomplete—and for the system to act on that signal.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h4 className="font-semibold text-amber-900 mb-4">Constraints / Limitations</h4>
            <ul className="space-y-3 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Latency & Cost:</strong> A second pass over each answer adds overhead; you may need to apply it selectively (e.g., only to certain intents or high-risk domains).</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Coverage Limits:</strong> The judge can only compare answers to the context it has. If your grounding data is incomplete, the judge can't magically fill the gaps.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Design Discipline:</strong> The judge must be configured to prioritize "I don't know" over guessing, even if that feels less impressive.</span>
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
            The product introduces a Verification Loop into the generation pipeline.
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {[
              { label: 'Generate', value: "The primary LLM creates a draft response based on the user's prompt and retrieved context." },
              { label: 'Critique', value: 'The "Judge" model receives the Draft Response + The Original Source Context. It prompts: "Does the response contain any claims not supported by the context?"' },
              { label: 'Act: Pass', value: "If the Judge finds no errors, the response is streamed to the user." },
              { label: 'Act: Fail', value: "If errors are found, the system triggers a Regeneration (asking the main model to try again with specific feedback) or tags the response with a Low Confidence warning." },
            ].map((item, i) => (
              <div key={i} className="p-4 grid sm:grid-cols-[120px_1fr] gap-2 items-start transition-colors hover:bg-slate-100/50">
                <strong className="text-slate-900 text-sm">{item.label}</strong>
                <span className="text-slate-600 text-sm">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
             <h4 className="font-semibold text-slate-900 mb-3">Behavior in the UI / conversation:</h4>
             <p className="text-slate-700 text-sm mb-4">
               For the user, this process is largely seamless, but transparency can be added.
             </p>
             <ul className="space-y-2 text-sm text-slate-700">
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>The Verified Badge:</strong> A subtle checkmark indicating the response passed the integrity check.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>The Citation Check:</strong> When hovering over a citation, the UI might show a snippet of the source text that validates the claim, proving the connection.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>The Uncertainty Disclaimer:</strong> If the Judge is unsure, the AI output might shift tone: "Based on the documents, it appears that X, though the text is ambiguous regarding Y."</span>
               </li>
             </ul>
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
                className={`px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-2xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
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
                  Use these components to visualize the verification layer.
                </p>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">1. Confidence Banner</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> Signal when an answer is grounded vs. uncertain in a single line.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Placement:</strong> Top or bottom of the assistant’s message.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Variants:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>“Checked against current data” (normal / neutral styling).</li>
                      <li>“Some parts may be incomplete or outdated” (subtle warning styling).</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">2. “Limited Confidence” Answer Style</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> Provide a visual style for answers that passed the judge with low support.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Regular answer text with a short disclaimer and suggested next step.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>One-line caveat:</strong> “I’m not fully confident in this answer based on the data I have.”</li>
                      <li><strong>Action buttons:</strong> “See source data”, “Contact support”, “Refresh data”.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">3. Fallback / Escalation Card</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> Handle cases where the judge blocks the answer entirely.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Text:</strong> “I’m not confident enough in my answer to show it to you.”</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Actions:</strong> “Ask a human”, “View related help articles”, “Try a different question”.</p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed italic border-t border-slate-200 pt-4">
                  These UI elements make the invisible judgment pass tangible: grounded answers feel solid, and uncertain ones are clearly marked as such.
                </p>
              </div>
            )}

            {activeTab === "tech" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                  <Shield className="h-8 w-8 text-slate-400 mx-auto mb-3" />
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
          Hallucination Block is especially valuable when:
        </p>

        <Card className="mb-6">
          <div className="space-y-6">
            {[
              { title: "RAG Systems", desc: "Where the primary promise is \"Chat with your data.\" The user expects the AI to be a faithful scribe, not a creative writer." },
              { title: "Compliance & Legal", desc: "Where accuracy is legally mandated. A hallucinated clause in a contract summary is unacceptable." },
              { title: "Medical & Scientific Q&A", desc: "Where specific protocols or dosage information must be exact." },
              { title: "Customer Support Automation", desc: "To ensure the bot doesn't invent return policies or promise refunds that don't exist." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
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
          In these scenarios, the added latency and cost are justified by the massive reduction in liability and the increase in user confidence.
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
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">The "Paralyzed" AI</h4>
              <p className="text-sm text-amber-900">
                If the Judge is set to "Zero Tolerance," the AI might refuse to answer anything that isn't a verbatim quote, frustrating users who want synthesis or summary.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Latency Fatigue</h4>
              <p className="text-sm text-amber-900">
                If the verification step adds 5+ seconds to every answer, users will abandon the tool for a faster, dumber alternative.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">False Security</h4>
              <p className="text-sm text-amber-900">
                Users might blindly trust a "Verified" badge, assuming it guarantees absolute truth, when it only guarantees consistency with the provided context (which itself might be wrong).
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-slate-50 rounded-r-lg">
          <h4 className="font-bold text-slate-900 mb-3">To use this pattern safely:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Asynchronous Verification:</strong> For lower-stakes queries, stream the answer first and run the Judge in the background, updating the UI with a "Verified" badge only after the check is done.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Tunable Strictness:</strong> Allow admins to adjust the "Temperature" of the Judge based on the use case (e.g., strict for Legal, lenient for Creative Writing).</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Human Override:</strong> Always provide a link to the source so the human can be the "Supreme Court" if they suspect the Judge is wrong.</span>
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
            title: "Regeneration Rate",
            description: "How often does the Judge reject a draft? A high rate means the primary model needs better prompting; a low rate means the system is stable.",
            icon: Sparkles,
            accentColor: "green"
          }}
          supportingMetrics={[
            {
              title: "Citation Click-through Rate",
              description: "If users are clicking citations less often over time, it implies they trust the AI's summary is accurate (or they are disengaged—context matters).",
              icon: MousePointerClick
            },
            {
              title: "User Feedback (Thumbs Down)",
              description: "Specifically tagging \"Inaccurate\" or \"Made this up.\"",
              icon: ThumbsDown
            },
            {
              title: "Latency Impact",
              description: "Monitoring the average time-to-first-token to ensure the verification step isn't killing the UX.",
              icon: Clock
            }
          ]}
        />
      </section>
    </PatternPageTemplate>
  );
}