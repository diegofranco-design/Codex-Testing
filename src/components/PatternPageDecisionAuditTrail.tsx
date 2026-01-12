import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  Layout, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  Search,
  FileText,
  FileDiff,
  Clock,
  Shield,
  BarChart3
} from "lucide-react";
import { PatternPageTemplate, SubHeading, Card, MetricsSection } from "./shared/PatternPageTemplate";
import { SectionHeader } from "./SectionHeader";

export function PatternPageDecisionAuditTrail() {
  const [activeTab, setActiveTab] = useState("ux");

  const metadata = {
    title: "AI Decision Audit Trail",
    description: "Every consequential AI decision is logged with inputs, outputs, and reasoning — creating a reconstructable record for disputes, debugging, and compliance.",
    category: "Architecture / Governance",
    complexityBadge: { label: "Complexity: High", color: "amber" as const },
    typeBadges: [
      { label: "Type: Architecture / Governance", color: "purple" as const },
      { label: "Transparency", color: "blue" as const },
    ],
    pillars: [
      { label: "Accountability", color: "blue" as const },
      { label: "Transparency", color: "purple" as const },
    ],
    figmaAssetUrl: "https://www.figma.com/design/UMSqRn7Cdh9snCcOXvTpNa/POC-Wireframes?node-id=343-561&t=Mci7p68NvyMKmwrw-4"
  };

  return (
    <PatternPageTemplate metadata={metadata}>
      
      {/* 1. Trust Challenge */}
      <section id="story" className="scroll-mt-24 space-y-8">
        <div>
          <SectionHeader number="01" title="Trust Challenge" />
          <p className="text-slate-600 leading-relaxed">
            What is the core risk to user trust, and when does it matter most?
          </p>
        </div>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 md:p-8">
          <p className="text-slate-800 leading-relaxed mb-4">
            Teams lose trust in their own AI systems when they cannot reconstruct past decisions. Without a clear audit trail, you fly blind—unable to trace incidents, prove fairness, or defend against disputes.
          </p>
          <p className="text-slate-800 leading-relaxed">
            If you don't know which model version made a call, what inputs were used, or whether policy was followed, you cannot resolve appeals or pass regulatory audits.
          </p>
        </div>

        <div>
          <SubHeading>Critical moments where this pattern matters most:</SubHeading>
          <Card>
            <ul className="space-y-4">
              {[
                "User challenges a decision (Appeals & Disputes).",
                "External boards demand proof (Regulatory Audits).",
                "Root-cause analysis for failures (Harm Investigations).",
                "Comparing logic across versions (Model Drift).",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <p className="text-slate-600 leading-relaxed mt-6">
            Without an audit trail, teams cannot defend decisions, investigate problems, or build confidence in their AI systems.
          </p>
        </div>
      </section>

      {/* 2. Desired Outcome */}
      <section id="outcome" className="scroll-mt-24">
        <SectionHeader number="02" title="Desired Outcome" />
        <p className="text-slate-600 leading-relaxed mb-8">
          What does 'trust done right' look like for this pattern?
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          
          <div className="p-8 md:p-10">
            <p className="text-slate-700 leading-relaxed mb-8">
              AI Decision Audit Trail is working when every decision can be fully reconstructed from a structured record.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { title: "Reconstructable History", desc: "Full narrative for any decision: Who, When, Why, and What.", icon: Database },
                { title: "Routine Investigations", desc: "Fast queries and dashboards replace manual log diving.", icon: Search },
                { title: "Governance Control", desc: "Compliance teams can independently sample decisions.", icon: ShieldCheck },
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
                  Given a Case ID, a non-engineer can fully reconstruct the decision path within 2 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Implementation Constraints */}
      <section id="constraints" className="scroll-mt-24">
        <SectionHeader number="03" title="Implementation Constraints" />
        <p className="text-slate-600 leading-relaxed mb-6">
          What limitations or requirements shape how this pattern can be applied?
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          To apply AI Decision Audit Trail effectively, you need:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-900 mb-4">Requirements</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Stable Identifiers:</strong> A persistent decision_id for every event and a case_id for the entity (user, ticket, loan).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Structured Data Model:</strong> You cannot dump raw text. You need a strict schema including actor_type, input_summary, model_version, and final_outcome.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Storage Infrastructure:</strong> A database or event store (e.g., PostgreSQL, Elasticsearch) capable of handling write-heavy structured logs and complex queries.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Access Control:</strong> Audit logs often contain PII/sensitive data; strictly control who can view them.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h4 className="font-semibold text-amber-900 mb-4">Constraints / Limitations</h4>
            <ul className="space-y-3 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span>If you cannot reliably identify a "Case" (e.g., ephemeral anonymous chat), you cannot build a meaningful historical trail.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span>If data retention laws are strict (e.g., GDPR right to erasure), you may need to log summaries or references rather than raw input data.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Pattern in Practice */}
      <section id="practice" className="scroll-mt-24">
        <SectionHeader number="04" title="Pattern in Practice" />
        <p className="text-slate-600 leading-relaxed mb-8">
          What specific mechanism or behavior will address the risk in the product?
        </p>
        
        {/* Core Mechanism */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 mb-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Core mechanism:</h3>
          <p className="text-slate-700 mb-6">
            Every time an in-scope decision is made, the system emits a Decision Audit Event atomically.
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {[
              { label: 'The "What"', value: "Final decision (Approved, Routed to Team X)." },
              { label: 'The "Who"', value: "Actor Type (AI Agent v2 / Human Supervisor)." },
              { label: 'The "Why"', value: "Input summary, policy version ID, and confidence score." },
              { label: 'The "Outcome"', value: "The eventual result (linked later, e.g., User repaid loan)." }
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
               The audit event is written immediately when a decision is committed. Later events (overrides, appeals) are linked back to the original decision_id, creating a threaded history.
             </p>
             <ul className="space-y-2 text-sm text-slate-700">
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>The Audit Log Table:</strong> Master view for finding specific decisions with sortable columns.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>The Decision Detail Drawer:</strong> Slide-out panel showing complete decision reconstruction.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>The Diff View:</strong> Comparing decisions or tracking changes across versions.</span>
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
                  Use these components to visualize the "System of Record" for admins and compliance officers.
                </p>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <Layout className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">1. The "Audit Log Table" (The Master View)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> High-density view for finding specific decisions.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Data grid with sortable columns.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Columns:</strong> Timestamp, Case ID, Decision Type (Badge), Actor (Avatar + Label), Confidence (%), Outcome.</li>
                      <li><strong>Visuals:</strong> Use distinct icons for "AI" (Robot) vs "Human" (User) to make the "Who" scannable.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">2. The "Decision Detail Drawer" (The Deep Dive)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> To reconstruct a single decision without leaving the list context.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> A slide-out panel or modal.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Header:</strong> Decision ID and huge Status Badge (e.g., "APPROVED").</li>
                      <li><strong>Snapshot Section:</strong> "Inputs at time of decision" (Key-Value pairs).</li>
                      <li><strong>Timeline:</strong> Vertical steps showing the Request → Analysis → Decision → Notification.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <FileDiff className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">3. The "Diff View" (Governance Tool)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> For comparing why a decision changed or why two similar cases differ.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Split screen.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Visuals:</strong> Side-by-side comparison of "Case A Inputs" vs "Case B Inputs" with highlighting on the variables that differ.</li>
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
        <SectionHeader number="05" title="Best Used When" />
        <p className="text-slate-600 leading-relaxed mb-6">
          In which contexts does this pattern create the greatest trust value?
        </p>
        
        <p className="text-slate-700 leading-relaxed mb-6">
          AI Decision Audit Trail is especially valuable when:
        </p>

        <Card className="mb-6">
          <div className="space-y-6">
            {[
              { title: "Regulated Industries", desc: "Healthcare, Finance, Insurance, or HR where 'show your work' is a legal requirement." },
              { title: "High-Stakes Disputes", desc: "Environments where users frequently appeal decisions (e.g., Content Moderation bans, Warranty denials)." },
              { title: "Hybrid Workflows", desc: "Systems where AI and Humans collaborate, and you need to distinguish clearly who clicked the button (Action Ownership)." },
              { title: "Continuous Learning", desc: "When you need to correlate 'Decision Inputs' with 'Real World Outcomes' to retrain models." }
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
          In these scenarios, the added infrastructure cost is justified by the massive reduction in liability and the increase in organizational confidence.
        </p>
      </section>

      {/* 6. Use With Caution */}
      <section id="risks" className="scroll-mt-24">
        <SectionHeader number="06" title="Use With Caution" />
        
        <p className="text-slate-600 mb-6">When could applying this pattern create friction or unintended effects?</p>

        <div className="bg-amber-50 rounded-xl p-6 md:p-8 border border-amber-100 mb-8">
          <h3 className="font-bold text-amber-900 mb-6">Risks and Anti-Patterns:</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">The "Data Swamp"</h4>
              <p className="text-sm text-amber-900">
                Logging giant, unstructured JSON blobs creates a "Write-Only" database that nobody can query. Structure is mandatory.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Privacy Leaks</h4>
              <p className="text-sm text-amber-900">
                Over-collecting inputs (recording full raw chat history instead of "Intent Tags") can turn your audit log into a massive PII liability.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Unusable Logs</h4>
              <p className="text-sm text-amber-900">
                Building an audit trail that has no UI/Dashboard. If support teams can't access it easily, it's expensive noise.
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-slate-50 rounded-r-lg">
          <h4 className="font-bold text-slate-900 mb-3">To use this pattern safely:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Define schemas:</strong> Enforce a strict schema for decision events (with versions) to prevent unstructured data swamps.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Data minimization:</strong> Apply masking where appropriate, ensuring sensitive PII/PHI is not permanently written to immutable logs.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Access control:</strong> Align retention and access with legal and internal policies to ensure compliance and security.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 7. How to Measure Success */}
      <section id="measurement" className="scroll-mt-24">
        <SectionHeader number="07" title="How to Measure Success" />
        <p className="text-slate-600 mb-8">How will we know this pattern is strengthening trust?</p>

        <MetricsSection
          northStar={{
            title: "Reconstruction Velocity",
            description: "Percentage of in-scope decisions where a complete record can be retrieved and understood by a human within the time expected.",
            icon: TrendingUp,
            accentColor: "blue"
          }}
          supportingMetrics={[
            {
              title: "Investigation Efficiency",
              description: "Average time for Support/Risk teams to close a dispute or incident investigation.",
              icon: Clock
            },
            {
              title: "Coverage",
              description: "% of decisions with a valid audit record (should be 100% for in-scope flows).",
              icon: Shield
            },
            {
              title: "Governance Value",
              description: "Reduction in \"Unexplainable Incidents\", cases where the team has to admit \"We don't know why the AI did that.\"",
              icon: BarChart3
            }
          ]}
        />
      </section>
    </PatternPageTemplate>
  );
}