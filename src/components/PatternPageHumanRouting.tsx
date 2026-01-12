import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  UserCheck,
  Users,
  Clock,
  Zap,
  Target,
  Smile,
  Timer
} from "lucide-react";
import { PatternPageTemplate, SectionHeading, SubHeading, Card, MetricsSection } from "./shared/PatternPageTemplate";

export function PatternPageHumanRouting() {
  const [activeTab, setActiveTab] = useState("ux");

  const metadata = {
    title: "Human-Routing Fallback",
    description: "When the AI lacks confidence or encounters a case outside its policy bounds, it seamlessly escalates the user to a human rather than attempting to answer incorrectly or blocking the user entirely.",
    category: "Architecture / Human-In-Loop",
    complexityBadge: { label: "Complexity: Intermediate", color: "amber" as const },
    typeBadges: [
      { label: "Type: Architecture", color: "purple" as const },
      { label: "Reliability", color: "blue" as const },
    ],
    pillars: [
      { label: "Reliability", color: "blue" as const },
      { label: "Safety", color: "green" as const },
    ],
    figmaAssetUrl: "https://www.figma.com/design/UMSqRn7Cdh9snCcOXvTpNa/POC-Wireframes?node-id=343-101&t=GHHwIlzoE1lajmO5-4"
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
            Users stop trusting the system when the AI persists in error rather than acknowledging its limits. The trust breaks when the AI is uncertain but acts confidently, or when the stakes are high and the AI makes a bad call without oversight.
          </p>
        </div>

        <div>
          <SubHeading>Critical moments where this pattern matters most:</SubHeading>
          <Card className="mb-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>High-Risk Decisions:</strong> Medical triage, financial approvals (loans, claims), or security changes where an error is irreversible.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>User Distress:</strong> The user is angry, confused, or repeatedly asking for a human ("agent please").</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>AI Uncertainty:</strong> Low confidence scores or repeated "looping" where the AI cannot resolve the intent.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-slate-700"><strong>Compliance Boundaries:</strong> Requests touching regulated topics (GDPR, HIPAA) where policy explicitly requires human sign-off.</p>
                </div>
              </li>
            </ul>
          </Card>
          <p className="text-slate-600 leading-relaxed">
            In all of these, failing to route to a human at the right time erodes trust faster than a slow human workflow would.
          </p>
        </div>
      </section>

      {/* 2. Desired Outcome */}
      <section id="outcome" className="scroll-mt-24">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
          
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <SectionHeading className="!mb-3 !text-2xl">2. Desired Outcome</SectionHeading>
              <p className="text-slate-500 text-lg">What does 'trust done right' look like for this pattern?</p>
            </div>
            
            <p className="text-slate-700 leading-relaxed mb-8">
              Human-Routing Fallback is working when the system knows when to hand off gracefully.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { title: "Confidence-Based Routing", desc: "The AI detects its own uncertainty and escalates before making a mistake, not after.", icon: ShieldCheck },
                { title: "Context Preservation", desc: "When handing off, the human receives the full conversation, the AI's reasoning, and what triggered the escalation.", icon: Users },
                { title: "Transparent Transition", desc: "Users are told why they're being routed, how long the wait is, and what happens next.", icon: Clock },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="mb-3 inline-flex p-2.5 rounded-xl bg-slate-50 text-purple-600 group-hover:bg-purple-50 transition-colors">
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
                  Users trust that if the AI can't help, a human will step in seamlessly—and they never feel abandoned or stuck in a loop.
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
          To apply Human-Routing Fallback effectively, you need:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-900 mb-4">Requirements</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Human Availability:</strong> There must be humans in the loop who can actually respond. If the handoff is to a ticket queue with 72-hour SLA, this pattern won't save trust.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Routing Logic:</strong> Clear triggers for escalation: confidence thresholds, intent categories, explicit user requests ("talk to a human"), or business rules (high-value accounts).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Handoff Infrastructure:</strong> Integration with ticketing, live chat, or case management systems to actually route the case and preserve context.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Context Passing:</strong> The ability to send conversation history, metadata (user ID, session start time), and the AI's diagnostic notes to the human agent.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h4 className="font-semibold text-amber-900 mb-4">Constraints / Limitations</h4>
            <ul className="space-y-3 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Staffing Costs:</strong> If the AI routes too aggressively, you end up paying for a fully staffed support team, negating cost savings.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Wait Times:</strong> If humans are overwhelmed, the handoff becomes a bottleneck. The pattern only works if humans can respond within a timeframe the user finds acceptable.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <span><strong>Edge Case Coverage:</strong> The AI must recognize its limits accurately. If it over-escalates, you waste resources; if it under-escalates, you fail users.</span>
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
            The system implements Intelligent Escalation Triggers that detect when human intervention is needed.
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {[
              { label: 'Detect', value: "The AI evaluates its confidence, the user's sentiment, and business rules on every response." },
              { label: 'Decide', value: 'If a threshold is crossed (confidence < 60%, user says "agent", high-risk topic), the system marks for escalation.' },
              { label: 'Route', value: "The case is handed to a human via API (CRM, ticketing, live chat), with full context attached." },
              { label: 'Notify', value: 'The user sees a message: "I\'m connecting you to a specialist who can help with this. Estimated wait: 3 minutes."' },
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
               The handoff is smooth and communicated clearly to the user.
             </p>
             <ul className="space-y-2 text-sm text-slate-700">
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>Escalation Message:</strong> "I want to make sure you get the best help. Let me connect you with [Team Name]."</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>Wait Indicator:</strong> Real-time queue position or estimated wait time.</span>
               </li>
               <li className="flex items-start gap-2">
                 <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span><strong>Context Handoff:</strong> Behind the scenes, the human agent sees a summary: "User tried 3 password resets. AI confidence: 45%. Escalation reason: Technical issue beyond scope."</span>
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
                  Use these components to visualize the human handoff experience.
                </p>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">1. Escalation Notification (Chat Bubble)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> To inform the user that they're being routed to a human.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> System message with icon and clear action.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Icon:</strong> Human/agent icon to signal the transition.</li>
                      <li><strong>Message:</strong> "Connecting you to a specialist..."</li>
                      <li><strong>Reason (optional):</strong> "This request requires a security review."</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">2. Wait Time Display (Status Bar)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> To manage expectations during the handoff.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Live status indicator.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Queue Position:</strong> "You are #3 in line"</li>
                      <li><strong>Estimated Wait:</strong> "~2 minutes"</li>
                      <li><strong>Option to Leave:</strong> "We'll email you when ready" callback button.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded text-slate-600 shrink-0 mt-1">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">3. Agent Takeover Banner (Agent View)</h4>
                    <p className="text-sm text-slate-500 mb-3"><strong>Purpose:</strong> To give the human agent full context.</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Structure:</strong> Summary panel at top of agent interface.</p>
                    <p className="text-sm text-slate-700 mb-2"><strong>Key Elements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>Conversation History:</strong> Last 10 messages.</li>
                      <li><strong>AI Diagnostic:</strong> "Low confidence on intent classification."</li>
                      <li><strong>User Profile:</strong> Account tier, previous interactions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tech" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                  <Zap className="h-8 w-8 text-slate-400 mx-auto mb-3" />
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
          Human-Routing Fallback is especially valuable when:
        </p>

        <Card className="mb-6">
          <div className="space-y-6">
            {[
              { title: "High-Stakes Decisions", desc: "Healthcare triage, financial approvals, legal advice—where AI errors have severe consequences." },
              { title: "Emotionally Charged Interactions", desc: "Customer complaints, crisis support, or disputes where empathy and judgment are critical." },
              { title: "Regulated Domains", desc: "Compliance-heavy industries where certain decisions legally require human oversight." },
              { title: "Complex Edge Cases", desc: "When the user's request is so novel or ambiguous that the AI genuinely cannot handle it with confidence." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
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
          In these scenarios, the cost of maintaining human backup is justified by preventing catastrophic trust failures.
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
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">The "Escape Hatch Overuse"</h4>
              <p className="text-sm text-amber-900">
                If users learn they can get faster service by gaming the system (typing "agent" immediately), the AI is bypassed entirely and you're back to fully manual operations.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Understaffed Handoffs</h4>
              <p className="text-sm text-amber-900">
                If the human team is overwhelmed, the "escalation" becomes a black hole. Users wait 30 minutes and lose trust in both the AI and the company.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2">Context Loss</h4>
              <p className="text-sm text-amber-900">
                If the handoff doesn't pass conversation history, the user has to repeat everything, which feels worse than never using AI at all.
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-slate-50 rounded-r-lg">
          <h4 className="font-bold text-slate-900 mb-3">To use this pattern safely:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Throttle Explicit Requests:</strong> If a user types "agent" in the first message, prompt them to try the AI first: "I can help! But if you still need a specialist, I'll connect you."</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Monitor Escalation Rate:</strong> Track what % of sessions escalate. If it's greater than 30%, your AI needs better training or your triggers are too aggressive.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span><strong>Capacity Planning:</strong> Ensure human staffing scales with AI escalation volume.</span>
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
            title: "Successful Escalation Rate",
            description: "Of all cases that escalated, what % were resolved successfully by the human? High success means you're escalating at the right moments.",
            icon: TrendingUp,
            accentColor: "purple"
          }}
          supportingMetrics={[
            {
              title: "Escalation Precision",
              description: "False escalations (where AI could have handled it) vs. missed escalations (where AI should have escalated but didn't).",
              icon: Target
            },
            {
              title: "User Satisfaction Post-Handoff",
              description: "CSAT scores specifically for sessions that involved human escalation.",
              icon: Smile
            },
            {
              title: "Time to Human Connection",
              description: "Average wait time from escalation trigger to human response.",
              icon: Timer
            }
          ]}
        />
      </section>
    </PatternPageTemplate>
  );
}