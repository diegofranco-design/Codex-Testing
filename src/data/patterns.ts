export type Pillar = "Security" | "Safety" | "Transparency" | "Reliability" | "Foundational";
export type PatternType = "UX" | "Frontend" | "Backend" | "AI" | "Data/Infra";

export interface StoryboardStep {
  title: string;
  description: string;
  icon: "bot" | "funnel" | "user" | "log" | "settings";
}

export interface ImplementationDetails {
  ui: string[];
  workflow: string[];
  ai: string[];
}

export interface FoundationalContent {
  problem: { text: string; list: string[] };
  outcome: { text: string; list: string[] };
  scope: { handles: string[]; doesNotHandle: string[] };
  howItWorks: { description: string; flow: string[]; modes: string[] };
  systemInteraction: { placement: string[]; architectures: string[] };
  experience: string;
  assets: string;
  whenToUse: string[];
  risks: { risks: string[]; guidelines: string[] };
  trustAlignment: { pillar: string; description: string }[];
  effectiveness: { northStar: string; metrics: string[] };
}

export interface Pattern {
  id: string;
  name: string;
  outcome: string;
  summary: string;
  pillars: Pillar[];
  riskBand: string;
  complexity: number; // 1-5
  types: PatternType[];
  tags: string[];
  designDos: string[];
  designDonts: string[];
  storyboard: StoryboardStep[];
  implementation: ImplementationDetails;
  foundationalContent?: FoundationalContent;
  kpis: string[];
  related: string[];
  imageUrl: string;
  comingSoon?: boolean; // Add this flag for coming soon patterns
}

export const PILLARS: Pillar[] = [
  "Security",
  "Safety",
  "Transparency",
  "Reliability",
  "Foundational"
];

export const PATTERN_TYPES: PatternType[] = [
  "UX", 
  "Frontend", 
  "Backend", 
  "AI", 
  "Data/Infra"
];

export const PATTERNS: Pattern[] = [
  {
    id: "audit-trail",
    name: "AI Decision Audit Trail",
    outcome: "Reconstruct any AI decision with full context and rationale.",
    pillars: ["Transparency", "Reliability"],
    riskBand: "High",
    complexity: 4,
    types: ["Backend", "Data/Infra"],
    tags: ["Logs", "Compliance", "Debugging"],
    summary:
      "Create a tamper-resistant record of AI decisions so you can investigate incidents, satisfy compliance, and continuously improve your models.",
    designDos: [
      "Include who/what triggered the AI decision and when.",
      "Capture enough context to make sense of the decision without storing raw PII.",
      "Make it easy to search by user, time, outcome, and model version."
    ],
    designDonts: [
      "Mix AI and human-only actions without clearly differentiating them.",
      "Hide audit access behind engineering-only tools where PM/compliance can't see them.",
      "Store sensitive input data without retention policies or masking."
    ],
    storyboard: [
      { title: "AI Act", description: "AI makes a decision or takes an action.", icon: "bot" },
      { title: "Log Event", description: "System captures inputs, outputs, and context.", icon: "log" },
      { title: "Store Securely", description: "Data is stored in a tamper-resistant ledger.", icon: "settings" },
      { title: "Audit Access", description: "Admins or compliance officers review the trail.", icon: "user" }
    ],
    implementation: {
      ui: ["Timeline view of events", "Filter/Search controls", "Detail view for payload inspection"],
      workflow: ["On decision -> Async log write", "On view -> Auth check & Fetch logs"],
      ai: ["Model versioning", "Input/Output serialization"]
    },
    kpis: [
      "Coverage: % of critical AI decisions recorded in the trail.",
      "Mean time to diagnose incidents using the trail.",
      "Override rate by model version and decision type."
    ],
    related: ["explainable-decisions", "human-routing"],
    imageUrl: "https://images.unsplash.com/photo-1709120395858-92f1c7c577f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBkYXRhJTIwc3RyZWFtJTIwYXVkaXR8ZW58MXx8fHwxNzYzNTcyNzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "prompt-injection-shield",
    name: "Prompt Injection Shield",
    outcome: "Protect the AI from being tricked into ignoring rules or acting outside its scope.",
    pillars: ["Security", "Safety"],
    riskBand: "High",
    complexity: 5,
    types: ["AI", "Backend"],
    tags: ["Security", "Jailbreak Defense", "Input Validation"],
    summary:
      "The system protects the assistant from being tricked into ignoring rules, exposing data, or acting outside its scope by filtering, constraining, and validating prompts and tool calls before they reach the core LLM.",
    designDos: [
      "Implement multi-layer defense with input guards, instruction firewalls, and tool constraints.",
      "Provide clear, respectful explanations when blocking requests with alternative paths.",
      "Define core rules in config/code, not just in prompts, so models can't rewrite them."
    ],
    designDonts: [
      "Block everything defensively—overly strict guards make the assistant feel broken.",
      "Rely on the same model to police itself without external enforcement.",
      "Hide why requests are blocked—transparency maintains trust even in refusals."
    ],
    storyboard: [
      { title: "Input Scan", description: "Every message is screened for injection patterns.", icon: "funnel" },
      { title: "Policy Check", description: "System validates against non-overridable rules.", icon: "settings" },
      { title: "Tool Validation", description: "Backend validates any tool calls before execution.", icon: "log" },
      { title: "Safe Response", description: "User receives either the answer or a scoped refusal.", icon: "user" }
    ],
    implementation: {
      ui: ["Scoped refusal messages", "Guardrail banners", "Safety redirect panels", "Tool error toasts"],
      workflow: ["Input Guard -> Instruction Firewall -> Tool Constraining -> Response"],
      ai: ["Prompt injection classifier", "Separate system/user context", "Server-side tool validation"]
    },
    kpis: [
      "Rewrite & Block Accuracy: % of interventions reviewers confirm were appropriate.",
      "Incident Trend: Drop in security/privacy incidents from prompt manipulation.",
      "User Recovery Rate: % of users who continue successfully after a Shield block.",
      "Intervention Severity Mix: Ratio of rewrites to full blocks."
    ],
    related: ["audit-trail", "human-routing"],
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2hpZWxkJTIwcHJvdGVjdGlvbnxlbnwxfHx8fDE3NjM1NzI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "explainable-decisions",
    name: "Decision Chain of Thought",
    outcome:
      "The system surfaces a clear, step-by-step reasoning path for AI-driven decisions so users can see how the system moved from inputs to outcome, and what options they have next.",
    pillars: ["Transparency"],
    riskBand: "Medium",
    complexity: 3,
    types: ["UX", "AI"],
    tags: ["Chain of Thought", "Transparency", "Explainability"],
    summary:
      "Show users a structured reasoning path for AI decisions so they understand how the system moved from their situation to the outcome, making the black box visible and actionable.",
    designDos: [
      "Show a clear 3-4 step narrative: what was considered, how it was interpreted, and how that led to the decision.",
      "Highlight the 2-5 main factors that actually influenced the outcome, not every variable.",
      "Bridge the decision to next actions (appeal, correct data, or accept) to turn a 'dead end' into a workflow."
    ],
    designDonts: [
      "Hallucinate chains: generating explanations after the fact without grounding in actual logic.",
      "Use internal jargon like 'model confidence' or 'vector distance' instead of human concepts.",
      "Explain every micro-decision—only show differentiating factors to avoid cognitive overload."
    ],
    storyboard: [
      { title: "Input Collection", description: "The system identifies what information was considered for the decision.", icon: "bot" },
      { title: "Evaluation", description: "The system interprets the inputs against decision criteria.", icon: "settings" },
      { title: "Intermediate Finding", description: "Key factors that influenced the outcome are identified.", icon: "funnel" },
      { title: "Decision & Next Step", description: "Final outcome is presented with actionable next steps.", icon: "user" }
    ],
    implementation: {
      ui: ["Reasoning Card with vertical stepper", "Factor Pills showing weighted inputs", "Abstracted Logic Banner for security contexts"],
      workflow: ["Decision Engine -> Explanation Generator -> Frontend Display"],
      ai: ["Traceable logic with explainability layers (SHAP/LIME)", "Taxonomy mapping technical signals to human-readable explanations"]
    },
    kpis: [
      "Comprehension Rate: % of users who understand why the decision was made (via micro-survey).",
      "Constructive Corrections: Increase in users updating specific data points mentioned in the chain.",
      "Audit Alignment: % of displayed chains that match backend logs for accuracy verification."
    ],
    related: ["audit-trail", "human-routing"],
    imageUrl: "https://images.unsplash.com/photo-1760239037245-a372db8630f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGlhZ3JhbSUyMGV4cGxhbmF0aW9uJTIwd2hpdGUlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjM1NzI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "human-routing",
    name: "Human-Routing Fallback",
    outcome:
      "Route risky AI tasks to humans and give users a clear way to override the AI.",
    pillars: ["Safety", "Reliability"],
    riskBand: "High",
    complexity: 3,
    types: ["UX", "AI", "Backend"],
    tags: ["Human-in-the-loop", "Escalation", "Risk"],
    summary:
      "Keep humans in control by routing AI outputs to reviewers when confidence is low or impact is high, before they reach end users.",
    designDos: [
      "Show why a task was routed to a human (low confidence, high risk, new pattern).",
      "Give reviewers the AI suggestion + explanation, not just raw data.",
      "Display clearly to end users when a human is in control."
    ],
    designDonts: [
      "Routing everything to humans \"just in case\" (reviewer overload).",
      "Hiding whether a human or AI made the final decision.",
      "Using routing rules no one can understand or adjust."
    ],
    storyboard: [
      { title: "AI Proposal", description: "AI proposes a decision and computes confidence.", icon: "bot" },
      { title: "Routing Check", description: "Routing rules check risk level and confidence thresholds.", icon: "funnel" },
      { title: "Assignment", description: "Task is either auto-applied or placed in a human review queue.", icon: "settings" },
      { title: "Human Review", description: "Human accepts, overrides, or escalates; system logs the outcome.", icon: "user" },
      { title: "Feedback Loop", description: "Routing thresholds can be tuned over time based on overrides.", icon: "log" }
    ],
    implementation: {
      ui: [
        "Task card with AI suggestion & confidence label",
        "'Send to human' state indicator",
        "Override / Escalate buttons"
      ],
      workflow: [
        "If risk = high → route to human",
        "Else if confidence < threshold → route to human",
        "Else → auto-handle",
        "Log each human action linked to original decision"
      ],
      ai: [
        "Confidence score computation",
        "Risk classification model",
        "Feedback loop data collection"
      ]
    },
    kpis: [
      "% of tasks routed to human by risk level",
      "AI suggestion acceptance rate in human review",
      "Average time from AI suggestion to human decision",
      "Incident rate: auto-handled vs human-reviewed tasks"
    ],
    related: ["audit-trail", "explainable-decisions"],
    imageUrl: "https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMHdvcmtpbmclMjB3aXRoJTIwY29tcHV0ZXIlMjBtb2Rlcm4lMjBtaW5pbWFsJTIwb2ZmaWNlfGVufDF8fHx8MTc2MzU3Mjc5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "hallucination-block",
    name: "Hallucination Block",
    outcome: "Intercept and correct AI hallucinations before they reach users.",
    pillars: ["Reliability", "Safety"],
    riskBand: "Medium",
    complexity: 3,
    types: ["AI", "Backend"],
    tags: ["Verification", "Accuracy", "Quality Control"],
    summary:
      "This pattern employs a secondary, specialized AI model to act as an objective evaluator that scrutinizes the output of the primary AI before it reaches the user. By rigorously cross-referencing generated claims against source documents or factual databases, the system can intercept and correct hallucinations, ensuring that users receive only verified, high-confidence information.",
    designDos: [
      "Use a specialized verification model optimized for fact-checking rather than generation.",
      "Clearly indicate to users when content has been verified or flagged.",
      "Provide fallback responses when hallucinations are detected instead of blocking entirely."
    ],
    designDonts: [
      "Rely on the same model to both generate and verify its own outputs.",
      "Block all uncertain content without providing helpful alternatives.",
      "Hide verification status from users, creating false confidence."
    ],
    storyboard: [
      { title: "Generate", description: "Primary AI model generates a response.", icon: "bot" },
      { title: "Verify", description: "Secondary model cross-references claims against sources.", icon: "funnel" },
      { title: "Score", description: "System assigns confidence scores to each claim.", icon: "settings" },
      { title: "Filter", description: "Low-confidence claims are flagged or corrected.", icon: "log" },
      { title: "Deliver", description: "Only verified content reaches the user.", icon: "user" }
    ],
    implementation: {
      ui: ["Verification badge on responses", "Confidence indicators", "Source citations"],
      workflow: ["Generate -> Verify -> Score -> Filter -> Deliver", "Log verification results for monitoring"],
      ai: ["Primary generation model", "Secondary verification model", "Fact-checking against knowledge base"]
    },
    kpis: [
      "Hallucination detection rate: % of false claims caught before delivery.",
      "False positive rate: % of valid content incorrectly flagged.",
      "User-reported accuracy improvement.",
      "Verification latency added to response time."
    ],
    related: ["explainable-decisions", "audit-trail"],
    imageUrl: "https://images.unsplash.com/photo-1732479347798-84ef29577a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVja21hcmslMjB2ZXJpZmljYXRpb24lMjB0ZWNoJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzY0ODYwNTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "emergency-stop",
    name: "Emergency Stop",
    outcome: "Intercept high-risk or unsafe inputs before they reach the AI, halting interaction instantly with safe fallback.",
    pillars: ["Safety"],
    riskBand: "High",
    complexity: 3,
    types: ["AI", "Backend"],
    tags: ["Crisis Detection", "Safety", "Input Validation"],
    summary:
      "A pre-filter layer that intercepts high-risk, malformed, or unsafe inputs before they reach the AI, or outputs before they reach the user back. It works as a kill switch: halting the interaction instantly, showing a safe fallback, and preventing the model from even attempting to process dangerous content.",
    designDos: [
      "Implement a deterministic or ML-based classifier for crisis, illegal, or malformed content.",
      "Provide calm, supportive messaging with clear next steps (crisis resources, human support).",
      "Short-circuit the pipeline immediately—stop before generation or tool execution."
    ],
    designDonts: [
      "Over-trigger the stop, blocking normal requests and frustrating users.",
      "Use vague generic warnings without context or actionable next steps.",
      "Apply insensitive crisis messaging—tone must be non-judgmental and supportive."
    ],
    storyboard: [
      { title: "Input Received", description: "User input enters the system.", icon: "user" },
      { title: "Risk Screening", description: "High-risk classifier scans for crisis, illegal, or malformed content.", icon: "funnel" },
      { title: "Emergency Stop", description: "If risk detected, pipeline halts before LLM or tools.", icon: "settings" },
      { title: "Safe Fallback", description: "User receives calm message with next steps (resources, retry, support).", icon: "bot" }
    ],
    implementation: {
      ui: ["Emergency Alert Card", "Soft Halt Toast", "Crisis resource links", "Retry/restart buttons"],
      workflow: ["Input → Screen for risk → If high-risk → Return fallback (skip LLM)", "If safe → Pass to normal pipeline", "Log all stops for review"],
      ai: ["Crisis language classifier", "Policy violation detector", "Malformed input parser", "Multi-lingual detection"]
    },
    kpis: [
      "Emergency Stop Activation Accuracy: % of stops confirmed appropriate via audit.",
      "False Positive Rate: % of stops that blocked legitimate requests.",
      "Crisis Redirect Success Rate: % of users engaging with provided resources.",
      "Stop-to-Recovery Time: Average time from stop to user re-engagement."
    ],
    related: ["prompt-injection-shield", "human-routing"],
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2hpZWxkJTIwcHJvdGVjdGlvbnxlbnwxfHx8fDE3NjM1NzI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "trust-visibility-dashboard",
    name: "Trust Visibility Dashboard",
    outcome: "Give stakeholders real-time visibility into AI system health, safety metrics, and trust indicators.",
    pillars: ["Transparency", "Reliability"],
    riskBand: "Medium",
    complexity: 3,
    types: ["UX", "Data/Infra"],
    tags: ["Monitoring", "Metrics", "Transparency"],
    summary:
      "A centralized dashboard that surfaces key trust metrics, AI performance indicators, and safety signals in real-time, enabling teams to monitor system health and address issues proactively.",
    designDos: [],
    designDonts: [],
    storyboard: [],
    implementation: {
      ui: [],
      workflow: [],
      ai: []
    },
    kpis: [],
    related: ["audit-trail", "explainable-decisions"],
    imageUrl: "",
    comingSoon: true
  },
  {
    id: "human-feedback-loop",
    name: "Human Feedback Loop",
    outcome: "Capture user corrections and feedback to continuously improve AI accuracy and behavior.",
    pillars: ["Reliability", "Transparency"],
    riskBand: "Medium",
    complexity: 2,
    types: ["UX", "AI", "Backend"],
    tags: ["Feedback", "Learning", "Iteration"],
    summary:
      "A systematic pattern for collecting, processing, and acting on user feedback to iteratively improve AI outputs, close accuracy gaps, and build user confidence through visible improvement.",
    designDos: [],
    designDonts: [],
    storyboard: [],
    implementation: {
      ui: [],
      workflow: [],
      ai: []
    },
    kpis: [],
    related: ["audit-trail", "hallucination-block"],
    imageUrl: "",
    comingSoon: true
  },
  {
    id: "conversational-presets",
    name: "Conversational Presets",
    outcome: "Guide users with pre-defined conversation starters that set clear expectations about AI capabilities.",
    pillars: ["Transparency", "Safety"],
    riskBand: "Low",
    complexity: 2,
    types: ["UX", "Frontend"],
    tags: ["Onboarding", "Guidance", "UX"],
    summary:
      "Strategic conversation starters and suggested prompts that help users understand what the AI can and cannot do, reducing confusion and misaligned expectations from the first interaction.",
    designDos: [],
    designDonts: [],
    storyboard: [],
    implementation: {
      ui: [],
      workflow: [],
      ai: []
    },
    kpis: [],
    related: ["explainable-decisions", "human-routing"],
    imageUrl: "",
    comingSoon: true
  },
  {
    id: "okta-auth-block",
    name: "Authentication Block",
    outcome: "A production-ready authentication building block for microservice architectures that enables multi-provider login (Cognito + Okta SSO) and stateless JWT verification.",
    pillars: ["Foundational"],
    riskBand: "Medium",
    complexity: 3,
    types: ["Backend", "Data/Infra"],
    tags: ["Authentication", "SSO", "Microservices", "Security"],
    summary: "A production-ready authentication building block for microservice architectures that enables multi-provider login (Cognito + Okta SSO) and stateless JWT verification via either a lightweight SDK or a containerized service.",
    designDos: [],
    designDonts: [],
    storyboard: [],
    implementation: { ui: [], workflow: [], ai: [] },
    kpis: [],
    related: [],
    imageUrl: "https://images.unsplash.com/photo-1638645540399-40229456a236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRoZW50aWNhdGlvbiUyMHNlY3VyaXR5JTIwbG9jayUyMGNvZGV8ZW58MXx8fHwxNzY2MTU0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    foundationalContent: {
      problem: {
        text: "Teams building distributed systems need a secure, consistent way to authenticate users across services without each team re-implementing auth logic. In practice, this becomes fragmented: different token checks, inconsistent provider integrations, duplicated security mistakes, and a high cost of change when identity providers evolve.",
        list: [
          "Microservices growth: Multiple services need to verify tokens consistently without duplicating auth code.",
          "Provider complexity: Supporting both consumer auth (username/password) and enterprise SSO requires different flows and security considerations.",
          "Migration & scale: Switching providers or adding new ones is costly when auth is embedded differently in every service."
        ]
      },
      outcome: {
        text: "Key outcomes this block enables:",
        list: [
          "Consistent token verification across services, regardless of the identity provider.",
          "Provider flexibility so products can support Cognito and enterprise SSO without re-architecture.",
          "Fast, low-friction integration through either a service interface or an SDK."
        ]
      },
      scope: {
        handles: [
          "Stateless JWT verification with caching and key rotation support.",
          "Multi-provider support (currently AWS Cognito and Okta SSO).",
          "Two integration modes: REST API for language-agnostic usage and Python SDK for direct embedding and low-latency verification.",
          "Production readiness surfaces such as health checks and structured logging."
        ],
        doesNotHandle: [
          "Product-specific authorization rules (roles, entitlements, resource-level permissions).",
          "UI/UX for login beyond enabling the auth flows (those remain product-owned)."
        ]
      },
      howItWorks: {
        description: "At a high level, how does this building block operate? Core behavior flow:",
        flow: [
          "User authenticates with an identity provider (Cognito or Okta SSO).",
          "The user receives a JWT token from the provider.",
          "A backend service receives requests containing that token.",
          "The Authentication Block verifies the token by: Validating signature via provider keys (with caching), Confirming token integrity and validity (expiry, issuer, audience as configured).",
          "The service receives verified claims and continues with business logic."
        ],
        modes: [
          "SDK Mode: The service verifies tokens locally using the Python SDK.",
          "Container Service Mode: Services call the verification endpoint over HTTP."
        ]
      },
      systemInteraction: {
        placement: [
          "Sits at the boundary of protected services, close to request handling.",
          "Works alongside gateways or BFF layers, but does not require them.",
          "Standardizes identity verification so downstream services can focus on business logic."
        ],
        architectures: [
          "Frontend → IdP → API Gateway/BFF → Microservices",
          "Backend-to-backend service calls with shared token validation behavior",
          "Mobile and multi-tenant setups where providers may vary"
        ]
      },
      experience: "This block is mostly invisible to end users. Its effect is experienced indirectly through: Consistent login success/failure behavior, Predictable session and access validation across services, Reduced “random auth errors” caused by inconsistent token handling. In enterprise contexts, it enables the product to support SSO flows without custom auth logic per service.",
      assets: "This building block is primarily backend-facing, so UI assets are optional. Auth Status Banner (optional) Purpose: A minimal pattern for showing “signed in / session expired” states consistently. Key elements: status label, refresh action, support link.",
      whenToUse: [
        "You have multiple services that need consistent authentication behavior.",
        "You support both consumer login and enterprise SSO (or plan to).",
        "You want a clean path to add providers over time without rewriting auth across services.",
        "You want teams to integrate auth quickly without becoming identity specialists."
      ],
      risks: {
        risks: [
          "Treating token verification as authorization (“JWT valid” ≠ “user can do this action”).",
          "Mixing integration modes inconsistently across services without clear ownership.",
          "Overexposing optional endpoints that aren’t required for a given product surface."
        ],
        guidelines: [
          "Keep authorization decisions in the product domain; use the block only for identity verification.",
          "Establish a standard integration mode by context (SDK for internal services, REST for heterogeneous stacks).",
          "Use feature flags and least-privilege exposure for optional endpoints."
        ]
      },
      trustAlignment: [
        { pillar: "Transparency", description: "Enables clearer operational visibility via consistent logging and health checks (for teams)." },
        { pillar: "Reliability", description: "Provides predictable auth behavior across services and supports key rotation without breaking verification." },
        { pillar: "Security", description: "Centralizes token validation and provider handling, reducing inconsistent implementations and security drift." },
        { pillar: "Safety", description: "Helps prevent unauthorized access by ensuring requests are verified before reaching sensitive operations." }
      ],
      effectiveness: {
        northStar: "Token Verification Success Rate: percentage of verification attempts that return a valid, verified result (excluding intentionally invalid tokens).",
        metrics: [
          "Verification Latency: Measures how fast token verification completes. Useful to validate the “fast path” promise, especially in SDK mode vs service mode.",
          "Verification Failure Breakdown: Counts failures by reason category (expired token, invalid signature, issuer/audience mismatch, missing token, malformed token).",
          "Provider Mix Over Time: Percentage of verified tokens by provider (Cognito vs Okta)."
        ]
      }
    }
  },
  {
    id: "memory-context-block",
    name: "Memory Context Block",
    outcome: "Unified memory management for AI agents.",
    pillars: ["Foundational"],
    riskBand: "Medium",
    complexity: 3,
    types: ["Backend", "AI"],
    tags: ["Memory", "Context", "Agents", "History"],
    summary: "A unified Memory Service Interface for AI agent projects that stores and retrieves both short-term conversational context (STM) and long-term historical memory (LTM) through a clean, stateless REST service with pluggable storage backends.",
    designDos: [],
    designDonts: [],
    storyboard: [],
    implementation: { ui: [], workflow: [], ai: [] },
    kpis: [],
    related: [],
    imageUrl: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcnRpZmljaWFsJTIwSW50ZWxsaWdlbmNlJTIwTWVtb3J5JTIwQnJhaW4lMjBhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY2NDE1MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    comingSoon: false,
    foundationalContent: {
      problem: {
        text: "AI agents quickly become unreliable and repetitive when they cannot maintain context across a session or learn from past interactions. Teams often solve this in fragmented ways: ad-hoc caches for “recent context,” separate databases for “long-term memory,” and inconsistent retrieval approaches across products.",
        list: [
          "Multi-turn conversations: The agent loses track of what was said earlier and starts repeating questions or contradicting itself.",
          "Long-lived user journeys: Users return later and the agent behaves as if it has never met them.",
          "Scaling agent features: Teams add new memory use cases (preferences, summaries, knowledge base) and rebuild storage logic each time."
        ]
      },
      outcome: {
        text: "Key outcomes this block enables:",
        list: [
          "Stable conversational continuity within a session using STM.",
          "Longer-term personalization and recall using LTM, without mixing responsibilities.",
          "A consistent memory API that multiple agents and services can reuse, regardless of backend."
        ]
      },
      scope: {
        handles: [
          "A single REST interface for creating, storing, retrieving, and managing memory.",
          "A dual memory model: STM for recent conversational context, LTM for persistent historical memory.",
          "Pluggable backends (configured per environment): STM (Redis/in-memory), LTM (Qdrant/PGVector).",
          "Stateless, horizontally scalable service behavior with production surfaces (health, logging, docker)."
        ],
        doesNotHandle: [
          "Product-specific memory policies (what to store, what to forget, how to summarize).",
          "Trust decisions like consent, retention rules, or sensitive data classification (those must be defined by the product and governance layer)."
        ]
      },
      howItWorks: {
        description: "At a high level, how does this building block operate? Core behavior flow:",
        flow: [
          "The agent or product sends a memory write request (STM or LTM) with structured metadata (e.g., session, user, category).",
          "The service routes the write to the configured backend (Redis/in-memory for STM; Qdrant/PGVector for LTM).",
          "The agent sends a memory read/query request when composing a response.",
          "The service returns relevant memory entries based on scope (STM, LTM, or both) and retrieval parameters.",
          "The agent uses retrieved memory as context to improve response continuity, personalization, and task completion."
        ],
        modes: [
          "STM: Redis or in-memory",
          "LTM: Qdrant or PGVector"
        ]
      },
      systemInteraction: {
        placement: [
          "Acts as a shared memory service that multiple agents, microservices, or orchestration layers call.",
          "Sits between the agent runtime and storage backends, standardizing memory operations.",
          "Supports incremental evolution: teams can change backends or storage strategies without changing agent integrations."
        ],
        architectures: [
          "Conversation history and session state",
          "User preferences and personalization",
          "Agent summaries and “working notes”",
          "Knowledge base references (when paired with embeddings/search in LTM)"
        ]
      },
      experience: "This block is mostly invisible to end users, but it materially shapes the experience through: Reduced repetition (“I already told you this”), Better continuity (“it remembers the plan we agreed on”), More consistent personalization (“it recalls preferences appropriately”), Smoother multi-step tasks (“it resumes where we left off”). If misconfigured or misused, users experience the opposite: inconsistency, amnesia, or inappropriate recall.",
      assets: "Memory Indicator (Optional UI Pattern). Purpose: subtle signal when the agent is using saved context. Key elements: “Using saved context” label + “Manage memory” link. Memory Controls (Optional UI Pattern). Purpose: give users basic control over persistence. Key elements: “Forget this,” “Clear history,” “View saved preferences.”",
      whenToUse: [
        "You are building agents that require multi-turn continuity and session state.",
        "You need both “recent context” and “long-term recall” without mixing them in one store.",
        "You want a shared memory layer across multiple agents or microservices.",
        "You anticipate growth in memory use cases (preferences, summaries, knowledge, sessions) and want a stable interface now."
      ],
      risks: {
        risks: [
          "Treating memory as a dumping ground (storing everything without purpose or policy).",
          "Mixing STM and LTM responsibilities (turning long-term memory into noisy chat logs).",
          "Storing sensitive data without clear retention, consent, and deletion rules.",
          "Over-retrieving (injecting too much memory into context and degrading model performance)."
        ],
        guidelines: [
          "Define clear memory categories (preferences, tasks, summaries) and store intentionally.",
          "Keep STM scoped to sessions; keep LTM scoped to durable, high-signal information.",
          "Apply governance: retention rules, deletion paths, and sensitive data handling before enabling persistence at scale."
        ]
      },
      trustAlignment: [
        { pillar: "Reliability", description: "Ensures agents maintain context and continuity, preventing hallucinations or repetitive errors." },
        { pillar: "Security", description: "Centralizes memory access, allowing for consistent retention, deletion, and access policies." },
        { pillar: "Transparency", description: "Enables UX patterns like 'Using saved context' to show users when memory is influencing the agent." },
        { pillar: "Safety", description: "Prevents mixing sensitive long-term data with transient session noise, ensuring cleaner data boundaries." }
      ],
      effectiveness: {
        northStar: "Memory Retrieval Utilization Rate — percentage of agent turns that successfully retrieve relevant memory (STM, LTM, or both) when memory is expected to be used.",
        metrics: [
          "STM Hit Rate: Share of requests that return STM context within the active session. Indicates whether session continuity is working.",
          "LTM Recall Rate: Share of LTM queries that return results above a relevance threshold. Indicates whether long-term memory is finding usable information rather than noise.",
          "Memory Latency (p50 / p95): End-to-end response time for memory reads/writes. Ensures memory does not become a bottleneck in agent responsiveness.",
          "Write-to-Retrieve Ratio (by category): Compares how much is stored vs how much is actually retrieved and used. Helps detect “memory hoarding” and low-signal storage.",
          "Backend Health (by store): Availability and error rate per backend (Redis/in-memory, Qdrant/PGVector)."
        ]
      }
    }
  }
];