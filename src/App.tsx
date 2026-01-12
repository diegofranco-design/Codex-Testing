import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { PatternDetailPage } from "./components/PatternDetailPage";
import { PatternPageDecisionAuditTrail } from "./components/PatternPageDecisionAuditTrail";
import { PatternPageHallucinationBlock } from "./components/PatternPageHallucinationBlock";
import { PatternPageHumanRouting } from "./components/PatternPageHumanRouting";
import { PatternPageDecisionChainOfThought } from "./components/PatternPageDecisionChainOfThought";
import { PatternPagePromptInjectionShield } from "./components/PatternPagePromptInjectionShield";
import { PatternPageEmergencyStop } from "./components/PatternPageEmergencyStop";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patterns/audit-trail" element={<PatternPageDecisionAuditTrail />} />
          <Route path="/patterns/explainable-decisions" element={<PatternPageDecisionChainOfThought />} />
          <Route path="/patterns/hallucination-block" element={<PatternPageHallucinationBlock />} />
          <Route path="/patterns/human-routing" element={<PatternPageHumanRouting />} />
          <Route path="/patterns/prompt-injection-shield" element={<PatternPagePromptInjectionShield />} />
          <Route path="/patterns/emergency-stop" element={<PatternPageEmergencyStop />} />
          <Route path="/patterns/:id" element={<PatternDetailPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}