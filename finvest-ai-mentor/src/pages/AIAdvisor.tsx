import React, { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  Target, 
  Clock, 
  Star,
  CheckCircle,
  XCircle,
  ArrowRight,
  Bot,
  Lightbulb,
  BarChart3,
  Shield,
  MessageCircle
} from 'lucide-react';
import { 
  mockRecommendations, 
  mockTradingSignals,
  mockPortfolio,
  mockUser
} from '../data/mockData';
import { 
  formatCurrency, 
  formatPercentage, 
  getChangeColor, 
  getRiskLevelLabel,
  formatDate
} from '../utils';

export const AIAdvisor: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('recommendations');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  const tabs = [
    { id: 'recommendations', name: 'Raccomandazioni', icon: Brain },
    { id: 'signals', name: 'Segnali Trading', icon: TrendingUp },
    { id: 'insights', name: 'Insights', icon: Lightbulb },
    { id: 'chat', name: 'Chat AI', icon: MessageCircle }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRecommendationTypeIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'sell': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'hold': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'rebalance': return <BarChart3 className="h-5 w-5 text-purple-600" />;
      case 'diversify': return <Shield className="h-5 w-5 text-orange-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSignalTypeColor = (type: string) => {
    switch (type) {
      case 'strong_buy': return 'bg-green-100 text-green-800';
      case 'buy': return 'bg-green-50 text-green-700';
      case 'sell': return 'bg-red-50 text-red-700';
      case 'strong_sell': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bot className="mr-3 h-8 w-8 text-primary-600" />
            AI Investment Advisor
          </h1>
          <p className="mt-2 text-gray-600">
            Ricevi consigli personalizzati e intelligenti per ottimizzare i tuoi investimenti
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Portfolio Value</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(mockUser.totalPortfolioValue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Status Card */}
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center animate-pulse-slow">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                AI Analysis Status
              </h3>
              <p className="text-gray-600">
                Analisi completata • Ultima aggiornamento: {formatDate(new Date(), 'short')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Raccomandazioni</p>
              <p className="text-xl font-bold text-primary-600">{mockRecommendations.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Segnali Attivi</p>
              <p className="text-xl font-bold text-green-600">{mockTradingSignals.length}</p>
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
        {selectedTab === 'recommendations' && (
          <RecommendationsView 
            recommendations={mockRecommendations}
            getRecommendationTypeIcon={getRecommendationTypeIcon}
            getConfidenceColor={getConfidenceColor}
            selectedRecommendation={selectedRecommendation}
            setSelectedRecommendation={setSelectedRecommendation}
          />
        )}
        {selectedTab === 'signals' && (
          <TradingSignalsView 
            signals={mockTradingSignals}
            getSignalTypeColor={getSignalTypeColor}
          />
        )}
        {selectedTab === 'insights' && (
          <InsightsView />
        )}
        {selectedTab === 'chat' && (
          <ChatView />
        )}
      </div>
    </div>
  );
};

// Recommendations View Component
const RecommendationsView: React.FC<{
  recommendations: any[];
  getRecommendationTypeIcon: (type: string) => React.ReactNode;
  getConfidenceColor: (confidence: number) => string;
  selectedRecommendation: string | null;
  setSelectedRecommendation: (id: string | null) => void;
}> = ({ 
  recommendations, 
  getRecommendationTypeIcon, 
  getConfidenceColor,
  selectedRecommendation,
  setSelectedRecommendation
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recommendations List */}
      <div className="lg:col-span-2 space-y-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className={`glass rounded-xl p-6 cursor-pointer transition-all duration-200 card-hover ${
              selectedRecommendation === rec.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setSelectedRecommendation(rec.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getRecommendationTypeIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {rec.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium ${getConfidenceColor(rec.confidence)}`}>
                      {rec.confidence}% Confidence
                    </span>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {rec.timeframe}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Target className="h-4 w-4 mr-1" />
                      {getRiskLevelLabel(rec.riskLevel)}
                    </div>
                    {rec.expectedReturn && (
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{rec.expectedReturn}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Details */}
      <div className="lg:col-span-1">
        {selectedRecommendation ? (
          <RecommendationDetails 
            recommendation={recommendations.find(r => r.id === selectedRecommendation)} 
          />
        ) : (
          <div className="glass rounded-xl p-6">
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seleziona una raccomandazione
              </h3>
              <p className="text-gray-600">
                Clicca su una raccomandazione per vedere i dettagli e le azioni consigliate.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Recommendation Details Component
const RecommendationDetails: React.FC<{ recommendation: any }> = ({ recommendation }) => {
  if (!recommendation) return null;

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Dettagli Raccomandazione
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Tipo</p>
            <p className="font-medium capitalize">{recommendation.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Confidenza</p>
            <p className="font-medium">{recommendation.confidence}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Timeframe</p>
            <p className="font-medium">{recommendation.timeframe}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Livello di Rischio</p>
            <p className="font-medium">{getRiskLevelLabel(recommendation.riskLevel)}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Ragionamento</h4>
        <ul className="space-y-2">
          {recommendation.reasoning.map((reason: string, index: number) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Azioni Consigliate</h4>
        <ul className="space-y-2">
          {recommendation.actionItems.map((action: string, index: number) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{action}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
        Implementa Raccomandazione
      </button>
    </div>
  );
};

// Trading Signals View Component
const TradingSignalsView: React.FC<{
  signals: any[];
  getSignalTypeColor: (type: string) => string;
}> = ({ signals, getSignalTypeColor }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signals.map((signal) => (
          <div key={signal.id} className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {signal.symbol}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium uppercase ${getSignalTypeColor(signal.type)}`}>
                {signal.type.replace('_', ' ')}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Prezzo Attuale</span>
                <span className="font-medium">{formatCurrency(signal.price)}</span>
              </div>
              
              {signal.targetPrice && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Price</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(signal.targetPrice)}
                  </span>
                </div>
              )}
              
              {signal.stopLoss && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Stop Loss</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(signal.stopLoss)}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Forza Segnale</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${signal.strength}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{signal.strength}%</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Timeframe</span>
                <span className="font-medium">{signal.timeframe}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">{signal.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Creato: {formatDate(signal.createdAt, 'short')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Insights View Component
const InsightsView: React.FC = () => {
  const insights = [
    {
      title: "Diversificazione Settoriale",
      description: "Il tuo portfolio è concentrato nel settore tecnologico (70%). Considera di diversificare verso settori difensivi come healthcare e utilities.",
      impact: "Medio",
      action: "Riduci esposizione tech del 10-15%"
    },
    {
      title: "Volatilità del Portfolio",
      description: "La volatilità del tuo portfolio è del 18%, superiore alla media del mercato. Questo è dovuto all'alta concentrazione in titoli growth.",
      impact: "Alto",
      action: "Aggiungi bond o ETF a bassa volatilità"
    },
    {
      title: "Performance vs Benchmark",
      description: "Il tuo portfolio ha superato il benchmark S&P 500 del 6.2% nell'ultimo anno. Mantieni la strategia attuale ma monitora i rischi.",
      impact: "Positivo",
      action: "Continua la strategia, monitora posizioni"
    }
  ];

  return (
    <div className="space-y-6">
      {insights.map((insight, index) => (
        <div key={index} className="glass rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {insight.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {insight.description}
              </p>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  insight.impact === 'Alto' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Impatto: {insight.impact}
                </span>
                <span className="text-sm text-gray-500">
                  Azione: {insight.action}
                </span>
              </div>
            </div>
            <Lightbulb className="h-6 w-6 text-yellow-500 flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Chat View Component
const ChatView: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Ciao! Sono il tuo AI Financial Advisor. Come posso aiutarti oggi?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    const aiResponse = {
      id: messages.length + 2,
      text: generateAIResponse(message),
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setMessage('');
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Interessante domanda! Basandomi sui dati del tuo portfolio, suggerirei di considerare una maggiore diversificazione.",
      "Dal mio punto di vista, questa potrebbe essere una buona opportunità di investimento, ma valuta sempre il tuo profilo di rischio.",
      "I dati di mercato mostrano tendenze positive in quel settore. Vuoi che analizzi più nel dettaglio?",
      "Ottima osservazione! Ti consiglio di monitorare questi indicatori nei prossimi giorni."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="glass rounded-xl p-6 h-96 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.sender === 'user' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Scrivi la tua domanda..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Invia
        </button>
      </div>
    </div>
  );
};