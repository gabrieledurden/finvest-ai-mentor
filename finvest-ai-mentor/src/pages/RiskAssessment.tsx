import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  BarChart3,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  PieChart
} from 'lucide-react';
import { mockRiskAssessment, mockPortfolio } from '../data/mockData';
import { formatPercentage, getRiskLevelLabel } from '../utils';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';

export const RiskAssessment: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const riskData = mockRiskAssessment;

  const tabs = [
    { id: 'overview', name: 'Panoramica', icon: Shield },
    { id: 'analysis', name: 'Analisi Dettagliata', icon: BarChart3 },
    { id: 'stress-test', name: 'Stress Test', icon: TrendingDown },
    { id: 'recommendations', name: 'Raccomandazioni', icon: Target }
  ];

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return '#10b981'; // green
    if (score <= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const riskMetrics = [
    { name: 'Diversificazione', value: riskData.diversificationRisk, max: 100 },
    { name: 'Mercato', value: riskData.marketRisk, max: 100 },
    { name: 'Liquidità', value: riskData.liquidityRisk, max: 100 },
    { name: 'Concentrazione', value: riskData.concentrationRisk, max: 100 },
    { name: 'Volatilità', value: riskData.volatilityRisk, max: 100 }
  ];

  const riskScoreData = [
    {
      name: 'Score Rischio',
      value: riskData.score,
      fill: getRiskScoreColor(riskData.score)
    }
  ];

  const stressTestScenarios = [
    {
      scenario: 'Recessione Economica',
      probability: '15%',
      impact: '-25%',
      description: 'Calo del PIL del 3% per due trimestri consecutivi'
    },
    {
      scenario: 'Crash Tecnologico',
      probability: '10%',
      impact: '-35%',
      description: 'Crollo del settore tech simile a dot-com bubble'
    },
    {
      scenario: 'Crisis Bancaria',
      probability: '8%',
      impact: '-40%',
      description: 'Crisi sistemica del settore bancario'
    },
    {
      scenario: 'Inflazione Alta',
      probability: '25%',
      impact: '-15%',
      description: 'Inflazione persistente sopra il 6%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="mr-3 h-8 w-8 text-primary-600" />
            Risk Assessment
          </h1>
          <p className="mt-2 text-gray-600">
            Valuta e gestisci i rischi del tuo portfolio
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Risk Score</p>
              <p className={`text-2xl font-bold ${
                riskData.score <= 30 ? 'text-green-600' :
                riskData.score <= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {riskData.score}/100
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-medium ${getRiskColor(riskData.overallRisk)}`}>
              {getRiskLevelLabel(riskData.overallRisk)}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Score Overview */}
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Livello di Rischio Complessivo
            </h3>
            <p className="text-gray-600 mb-4">
              Il tuo portfolio presenta un rischio {getRiskLevelLabel(riskData.overallRisk).toLowerCase()} 
              con alcune aree che richiedono attenzione.
            </p>
            <div className="flex items-center space-x-2">
              {riskData.score <= 30 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : riskData.score <= 60 ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="text-sm font-medium text-gray-700">
                {riskData.score <= 30 ? 'Portfolio ben diversificato' :
                 riskData.score <= 60 ? 'Alcune ottimizzazioni consigliate' :
                 'Azioni immediate necessarie'}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={riskScoreData}>
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  fill={getRiskScoreColor(riskData.score)}
                />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-800">
                  <tspan className="text-3xl font-bold">{riskData.score}</tspan>
                  <tspan className="text-sm" dy="20">/100</tspan>
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Basso (0-30)</span>
              <div className="w-16 h-2 bg-green-200 rounded-full">
                <div className="h-2 bg-green-600 rounded-full" style={{ width: riskData.score <= 30 ? '100%' : '0%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Medio (31-60)</span>
              <div className="w-16 h-2 bg-yellow-200 rounded-full">
                <div className="h-2 bg-yellow-600 rounded-full" style={{ 
                  width: riskData.score > 30 && riskData.score <= 60 ? '100%' : '0%' 
                }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Alto (61-100)</span>
              <div className="w-16 h-2 bg-red-200 rounded-full">
                <div className="h-2 bg-red-600 rounded-full" style={{ width: riskData.score > 60 ? '100%' : '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {selectedTab === 'overview' && (
          <OverviewView riskData={riskData} riskMetrics={riskMetrics} />
        )}
        {selectedTab === 'analysis' && (
          <AnalysisView riskMetrics={riskMetrics} />
        )}
        {selectedTab === 'stress-test' && (
          <StressTestView scenarios={stressTestScenarios} />
        )}
        {selectedTab === 'recommendations' && (
          <RecommendationsView recommendations={riskData.recommendations} />
        )}
      </div>
    </div>
  );
};

// Overview View Component
const OverviewView: React.FC<{ riskData: any; riskMetrics: any[] }> = ({ riskData, riskMetrics }) => {
  const pieData = riskMetrics.map((metric, index) => ({
    name: metric.name,
    value: metric.value,
    color: getColorForIndex(index)
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Risk Breakdown */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Breakdown dei Rischi
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => [`${value}%`, 'Rischio']} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Metrics Cards */}
      <div className="space-y-4">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="glass rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{metric.name}</h4>
              <span className={`text-sm font-medium ${
                metric.value <= 30 ? 'text-green-600' :
                metric.value <= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {metric.value}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metric.value <= 30 ? 'bg-green-600' :
                  metric.value <= 60 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analysis View Component
const AnalysisView: React.FC<{ riskMetrics: any[] }> = ({ riskMetrics }) => {
  return (
    <div className="space-y-8">
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Analisi Dettagliata dei Rischi
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={riskMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: any) => [`${value}%`, 'Livello di Rischio']} />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="glass rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Rischio di {metric.name}
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Livello Attuale:</span>
                <span className={`font-medium ${
                  metric.value <= 30 ? 'text-green-600' :
                  metric.value <= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {metric.value}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livello Raccomandato:</span>
                <span className="font-medium text-green-600">≤ 30%</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-700">
                  {getRiskDescription(metric.name, metric.value)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stress Test View Component
const StressTestView: React.FC<{ scenarios: any[] }> = ({ scenarios }) => {
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Stress Test Analysis
            </h3>
            <p className="text-gray-600">
              Analisi dell'impatto di scenari avversi sul tuo portfolio
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario, index) => (
          <div key={index} className="glass rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {scenario.scenario}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Probabilità:</span>
                <span className="font-medium text-orange-600">{scenario.probability}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">
              {scenario.description}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Impatto Stimato:</span>
                <span className="text-lg font-bold text-red-600">{scenario.impact}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Valore Portfolio:</span>
                <span className="text-sm text-gray-700">
                  {(mockPortfolio.totalValue * (1 + parseInt(scenario.impact) / 100)).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Info className="h-4 w-4 mr-1" />
                <span>Scenario basato su dati storici</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recommendations View Component
const RecommendationsView: React.FC<{ recommendations: string[] }> = ({ recommendations }) => {
  const actionPlan = [
    {
      priority: 'Alta',
      action: 'Ridurre concentrazione settore tech',
      timeframe: 'Entro 1 mese',
      impact: 'Alto',
      icon: TrendingDown
    },
    {
      priority: 'Media',
      action: 'Aggiungere bonds governativi',
      timeframe: 'Entro 2 mesi',
      impact: 'Medio',
      icon: Shield
    },
    {
      priority: 'Media',
      action: 'Aumentare liquidità di emergenza',
      timeframe: 'Entro 3 mesi',
      impact: 'Medio',
      icon: Activity
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Recommendations */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Target className="mr-2 h-5 w-5 text-primary-600" />
          Raccomandazioni Immediate
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Zap className="mr-2 h-5 w-5 text-yellow-600" />
          Piano d'Azione Prioritario
        </h3>
        <div className="space-y-4">
          {actionPlan.map((action, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 mr-4">
                  <action.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{action.action}</p>
                  <p className="text-sm text-gray-600">{action.timeframe}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                  action.priority === 'Alta' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {action.priority}
                </span>
                <span className="text-sm text-gray-600">
                  Impatto: {action.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getColorForIndex = (index: number): string => {
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16'
  ];
  return colors[index % colors.length];
};

const getRiskDescription = (riskType: string, value: number): string => {
  const descriptions: { [key: string]: { [key: string]: string } } = {
    'Diversificazione': {
      low: 'Il tuo portfolio è ben diversificato tra diversi settori e asset class.',
      medium: 'Una diversificazione moderata, considera di espandere in nuovi settori.',
      high: 'Portfolio troppo concentrato, aumenta la diversificazione urgentemente.'
    },
    'Mercato': {
      low: 'Bassa esposizione al rischio di mercato generale.',
      medium: 'Esposizione media al rischio di mercato, monitora le condizioni.',
      high: 'Alta esposizione al rischio di mercato, considera coperture.'
    },
    'Liquidità': {
      low: 'Ottima liquidità degli asset in portfolio.',
      medium: 'Liquidità adeguata, mantieni una riserva di emergenza.',
      high: 'Rischio di liquidità elevato, incrementa asset liquidi.'
    },
    'Concentrazione': {
      low: 'Buona distribuzione del peso tra gli asset.',
      medium: 'Concentrazione moderata in alcuni asset.',
      high: 'Troppo concentrato in pochi asset, diversifica immediatamente.'
    },
    'Volatilità': {
      low: 'Portfolio con bassa volatilità e rischio controllato.',
      medium: 'Volatilità moderata, bilanciata per il tuo profilo.',
      high: 'Alta volatilità, considera asset più stabili.'
    }
  };

  const level = value <= 30 ? 'low' : value <= 60 ? 'medium' : 'high';
  return descriptions[riskType]?.[level] || 'Analisi del rischio non disponibile.';
};