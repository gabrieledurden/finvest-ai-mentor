import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Portfolio } from './pages/Portfolio';
import { AIAdvisor } from './pages/AIAdvisor';
import { MarketAnalysis } from './pages/MarketAnalysis';
import { Education } from './pages/Education';
import { RiskAssessment } from './pages/RiskAssessment';
import { TradingSimulator } from './pages/TradingSimulator';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/market-analysis" element={<MarketAnalysis />} />
          <Route path="/education" element={<Education />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/trading-simulator" element={<TradingSimulator />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;