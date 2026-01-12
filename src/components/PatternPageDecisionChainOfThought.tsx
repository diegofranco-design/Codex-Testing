import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  ShieldAlert, 
  TrendingUp, 
  GitBranch,
  Eye,
  FileText,
  Lightbulb,
  MessageSquare,
  HelpCircle,
  FileQuestion
} from "lucide-react";
import { PatternPageTemplate, SectionHeading, SubHeading, Card, MetricsSection } from "./shared/PatternPageTemplate";

export function PatternPageDecisionChainOfThought() {
  const [activeTab, setActiveTab] = useState("ux");

  const metadata = {
    title: "Decision Chain of Thought",
    description: "The system surfaces a clear, step-by-step reasoning path for AI-driven decisions so users can see how the system moved from inputs to outcome, and what options they have next.",
    category: "Interface / Transparency",
    complexityBadge: { label: "Complexity: Intermediate", color: "amber" as const },
    typeBadges: [
      { label: "Type: Interface / Transparency", color: "purple" as const },
      { label: "Transparency", color: "blue" as const },
    ],
    pillars: [
      { label: "Transparency", color: "blue" as const },
      { label: "Explainability", color: "purple" as const },
    ],
    figmaAssetUrl: "https://www.figma.com/design/UMSqRn7Cdh9snCcOXvTpNa/POC-Wireframes?node-id=343-990&t=Mci7p68NvyMKmwrw-4"
  };

  return (
    <PatternPageTemplate metadata={metadata}>
      
      {/* 1. Trust Challenge */}
      <section id="story" className="scroll-mt-24 space-y-8">
        <div>
          <SectionHeading>1. Trust Challenge</SectionHeading>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            What is the core risk to user trust, and when does it matter most?
          </p>
        </div>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 md:p-8 mb-8">
          <p className="text-slate-800 leading-relaxed mb-4">
            Users distrust AI decisions that feel like black boxes. When the system says "No" or "Approved" without explanation, users feel powerless and confused—especially if the outcome is unexpected or unfavorable.
          </p>
          <p className="text-slate-800 leading-relaxed">
            The trust gap widens when users have no visibility into why a decision was made or what they could do differently to change the outcome.
          </p>
        </div>

        <div>
          <SubHeading>Critical moments where this pattern matters most:</SubHeading>
          <Card className="mb-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Rejection or Denial:</strong> Loan denials, access restrictions, content moderation bans—where users demand to know "why me?"</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Unexpected Recommendations:</strong> When the AI suggests something surprising (e.g., "upgrade to premium" or "contact support"), and the user wants to understand the logic.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Multi-Step Workflows:</strong> Complex processes (claims processing, eligibility checks) where users need to see progress and understand next steps.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Learning & Improvement:</strong> When users want to understand how to improve future outcomes (e.g., "What can I do to qualify next time?").</p>
                </div>
              </li>
            </ul>
          </Card>
          <p className="text-slate-600 leading-relaxed">
            Without transparency into the decision process, users feel manipulated or misunderstood, even when the decision is technically correct.
          </p>
        </div>
      </section>

      {/* 2. Desired Outcome */}
      <section id="outcome" className="scroll-mt-24">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <SectionHeading className="!mb-3 !text-2xl">2. Desired Outcome</SectionHeading>
              <p className="text-slate-500 text-lg">What does 'trust done right' look like for this pattern?</p>
            </div>
            
            <p className="text-slate-700 leading-relaxed mb-8">
              Decision Chain of Thought is working when users can follow the AI's reasoning from start to finish.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { title: "Visible Steps", desc: "Each decision is broken into clear stages: Data Collection → Analysis → Decision → Next Actions.", icon: GitBranch },
                { title: "Understandable Language", desc: "The reasoning is explained in plain language, not technical jargon or model outputs.", icon: Eye },
                { title: "Actionable Insights", desc: "Users see not just 'why' but 'what now'—what they can do to change or appeal the outcome.", icon: Lightbulb },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="mb-3 inline-flex p-2.5 rounded-xl bg-slate-50 text-blue-600 group-hover:bg-blue-50 transition-colors">
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
                  Users trust the outcome because they understand how the system arrived at it—and they know what to do next, even if the answer is "No."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Implementation Constraints */}
      <section id="constraints" className="scroll-mt-24">
        <SectionHeading>3. Implementation Constraints</SectionHeading>
        <p className="text-lg text-slate-600 mb-6">What limitations or requirements shape how this pattern can be applied?</p>

        <p className="text-slate-700 leading-relaxed mb-6">
          To apply Decision Chain of Thought effectively, you need:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-900 mb-4">Requirements</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Structured Decision Logic:</strong> Your AI or rules engine must output not just a result, but the intermediate steps (e.g., "checked credit score," "evaluated income," "applied risk threshold").</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Translation Layer:</strong> You need to convert technical outputs (model scores, rule IDs) into user-friendly language ("Your application was flagged due to insufficient employment history").</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>UI Space:</strong> The interface must have room to display this reasoning without overwhelming the user (expandable sections, progressive disclosure).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Legal/Compliance Review:</strong> Some explanations touch on sensitive topics (protected classes, scoring models). You need legal sign-off on what can be shown.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h4 className="font-semibold text-amber-900 mb-4">Constraints / Limitations</h4>
            <ul className="space-y-3 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Complexity Overload:</strong> If the decision involves 50 variables, showing all of them would confuse users. You must curate the "top 3" factors.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Black-Box Models:</strong> Some ML models (deep neural nets) don't naturally produce interpretable reasoning. You'll need approximate explanations (SHAP, LIME) or simplified proxies.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Legal Risk:</strong> Over-explaining can expose liability (e.g., revealing that age was a factor in a decision, even indirectly). Tread carefully.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Pattern in Practice */}
      <section id="practice" className="scroll-mt-24">
        <SectionHeading>4. Pattern in Practice</SectionHeading>
        <p className="text-lg text-slate-600 mb-8">What specific mechanism or behavior will address the risk in the product?</p>
        
        {/* Core Mechanism */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 mb-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Core mechanism:</h3>
          <p className="text-slate-700 mb-6">
            The system displays a Reasoning Timeline that breaks down the decision into human-understandable steps.
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {[
              { label: 'Step 1: Inputs', value: "\"We reviewed your application details: Credit Score (720), Income ($85k), Employment (3 years).\"" },
              { label: 'Step 2: Analysis', value: "\"Our system flagged one area of concern: High debt-to-income ratio (45%).\"" },
              { label: 'Step 3: Decision', value: "\"Based on our lending policy, applications with DTI greater than 40% require manual review.\"" },
              { label: 'Step 4: Next Steps', value: "\"Your application has been forwarded to a specialist. You'll hear back in 2 business days. To improve approval odds, consider reducing outstanding debt.\"" },
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
               The reasoning is visible but not intrusive—users can expand to see details or skip if they trust the outcome.
             </p>
             <ul className="space-y-2 text-sm text-slate-700">
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>Collapsible "Why?" Section:</strong> A button labeled "See how we decided" that expands the reasoning timeline.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>Progressive Disclosure:</strong> Show top 3 factors by default, with a "See all factors" link for power users.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>Plain Language:</strong> Avoid jargon. Use "We" language: "We checked..." not "The model evaluated..."</span>
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
                  Use these components to visualize decision reasoning.
                </p>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">1. Reasoning Timeline (Vertical Stepper)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> To show the decision as a sequence of steps.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Vertical timeline with icons and text.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Step Icons:</strong> Checkmarks (completed), Warning (flagged issue), Arrow (next step).</li>
                      <li><strong>Step Labels:</strong> "Reviewed eligibility," "Checked compliance," "Determined outcome."</li>
                      <li><strong>Expandable Details:</strong> Click a step to see what data was used.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">2. Key Factors Card (Summary View)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> To highlight the top reasons for the decision.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Compact card with bullet points.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Factor List:</strong> "✓ Credit score: Excellent (720+)" / "⚠ Debt ratio: High (45%)"</li>
                      <li><strong>Color Coding:</strong> Green for positive factors, amber for concerns.</li>
                      <li><strong>CTA:</strong> "See full breakdown" link.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">3. Next Steps Panel (Action Guidance)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> To guide users on what they can do next.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Action-oriented callout box.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Clear Instructions:</strong> "To improve your chances: 1) Reduce debt, 2) Wait 6 months, 3) Reapply."</li>
                      <li><strong>Appeal Option:</strong> "Think this is wrong? File an appeal."</li>
                    </ul>
                  </div>
                </div>
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
        <p className="text-lg text-slate-600 mb-6">In which contexts does this pattern create the greatest trust value?</p>
        
        <p className="text-slate-700 leading-relaxed mb-6">
          Decision Chain of Thought is especially valuable when:
        </p>

        <Card className="mb-6">
          <div className="space-y-6">
            {[
              { title: "High-Impact Decisions", desc: "Loan approvals, insurance claims, account suspensions—where users have a right to understand the reasoning." },
              { title: "Complex Multi-Step Processes", desc: "Eligibility checks, triage systems, or workflows where users need to see progress and dependencies." },
              { title: "User Appeals & Disputes", desc: "When users can challenge the outcome, showing reasoning helps them understand what to contest or correct." },
              { title: "Trust-Building for New AI", desc: "Early in a product's lifecycle, when users are skeptical and need proof that the AI is fair and logical." }
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
          In these scenarios, transparency isn't just nice-to-have—it's essential for user trust and regulatory compliance.
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
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Too Much Information</h4>
              <p className="text-sm text-amber-900">
                Showing every model weight or rule ID overwhelms users. They want the "why," not a technical audit trail.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Gaming the System</h4>
              <p className="text-sm text-amber-900">
                If you reveal exact thresholds ("DTI must be below 40%"), savvy users will game the inputs to barely meet the bar, potentially undermining the model's intent.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Legal Exposure</h4>
              <p className="text-sm text-amber-900">
                Over-explaining can reveal that you're using protected attributes (even indirectly), creating compliance risk. Always get legal review.
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-slate-50 rounded-r-lg">
          <h4 className="font-bold text-slate-900 mb-3">To use this pattern safely:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Curate, Don't Dump:</strong> Show the top 3-5 factors, not all 50. Use progressive disclosure for deeper details.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Use Ranges, Not Exact Thresholds:</strong> Say "Low income relative to loan amount" instead of "Income must be greater than $50k."</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Legal Sign-Off:</strong> Work with compliance to ensure explanations don't inadvertently reveal discriminatory logic or violate regulations.</span>
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
            title: "Explanation Engagement Rate",
            description: "What % of users expand the \"Why?\" section? High engagement means they value the transparency; low engagement (but high satisfaction) means they trust without needing proof.",
            icon: Eye,
            accentColor: "blue"
          }}
          supportingMetrics={[
            {
              title: "Appeal/Dispute Rate",
              description: "Are fewer users appealing decisions because they understand and accept the reasoning?",
              icon: MessageSquare
            },
            {
              title: "User Comprehension",
              description: "Survey users: \"Did you understand why this decision was made?\" Target: 80%+ \"Yes.\"",
              icon: HelpCircle
            },
            {
              title: "Support Ticket Deflection",
              description: "Reduction in \"Why was I denied?\" tickets after implementing this pattern.",
              icon: FileQuestion
            }
          ]}
        />
      </section>
    </PatternPageTemplate>
  );
}