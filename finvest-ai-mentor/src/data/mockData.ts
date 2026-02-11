import {
  Asset,
  PortfolioAsset,
  Portfolio,
  AIRecommendation,
  TradingSignal,
  EducationalContent,
  RiskAssessment,
  AssetType,
  RiskProfile,
  RiskLevel,
  RecommendationType,
  SignalType,
  EducationCategory,
  DifficultyLevel,
  User,
  PriceHistory,
  MarketData,
  PerformanceData,
  ChartDataPoint
} from '../types';

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'Marco Rossi',
  email: 'marco.rossi@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  riskProfile: RiskProfile.MODERATE,
  totalPortfolioValue: 125000,
  joinDate: new Date('2023-01-15')
};

// Mock assets data
export const mockAssets: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: AssetType.STOCK,
    price: 185.20,
    change: 2.45,
    changePercent: 1.34,
    volume: 58420000,
    marketCap: 2900000000000,
    logoUrl: 'https://logo.clearbit.com/apple.com'
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: AssetType.STOCK,
    price: 415.85,
    change: -3.21,
    changePercent: -0.77,
    volume: 24680000,
    marketCap: 3100000000000,
    logoUrl: 'https://logo.clearbit.com/microsoft.com'
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: AssetType.STOCK,
    price: 142.65,
    change: 1.88,
    changePercent: 1.33,
    volume: 31250000,
    marketCap: 1800000000000,
    logoUrl: 'https://logo.clearbit.com/google.com'
  },
  {
    id: '4',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: AssetType.STOCK,
    price: 248.50,
    change: -8.75,
    changePercent: -3.40,
    volume: 89450000,
    marketCap: 789000000000,
    logoUrl: 'https://logo.clearbit.com/tesla.com'
  },
  {
    id: '5',
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    type: AssetType.ETF,
    price: 245.30,
    change: 1.20,
    changePercent: 0.49,
    volume: 4250000,
    marketCap: 1500000000000
  },
  {
    id: '6',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: AssetType.CRYPTO,
    price: 45680.50,
    change: 1250.75,
    changePercent: 2.82,
    volume: 28450000,
    marketCap: 892000000000
  }
];

// Mock portfolio data
export const mockPortfolio: Portfolio = {
  id: '1',
  name: 'Main Portfolio',
  assets: [
    {
      ...mockAssets[0],
      quantity: 150,
      value: 27780,
      allocation: 22.2,
      averagePrice: 175.20,
      totalReturn: 1500,
      totalReturnPercent: 5.7
    },
    {
      ...mockAssets[1],
      quantity: 75,
      value: 31188.75,
      allocation: 25.0,
      averagePrice: 395.50,
      totalReturn: 1518.75,
      totalReturnPercent: 5.1
    },
    {
      ...mockAssets[2],
      quantity: 200,
      value: 28530,
      allocation: 22.8,
      averagePrice: 138.90,
      totalReturn: 750,
      totalReturnPercent: 2.7
    },
    {
      ...mockAssets[4],
      quantity: 100,
      value: 24530,
      allocation: 19.6,
      averagePrice: 238.50,
      totalReturn: 680,
      totalReturnPercent: 2.9
    },
    {
      ...mockAssets[5],
      quantity: 0.25,
      value: 11420.13,
      allocation: 9.1,
      averagePrice: 42500,
      totalReturn: 795.13,
      totalReturnPercent: 7.5
    }
  ],
  totalValue: 125000,
  totalReturn: 8750,
  totalReturnPercent: 7.5,
  dayChange: 1245.50,
  dayChangePercent: 1.01,
  diversificationScore: 85,
  riskScore: 65,
  lastUpdated: new Date()
};

// Mock AI recommendations
export const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: RecommendationType.REBALANCE,
    title: 'Riequilibra il Portfolio',
    description: 'Il tuo portfolio è sbilanciato verso i titoli tecnologici. Considera di diversificare.',
    confidence: 85,
    expectedReturn: 12.5,
    riskLevel: RiskLevel.MEDIUM,
    timeframe: '3-6 mesi',
    reasoning: [
      'Concentrazione del 70% in titoli tech',
      'Bassa esposizione ai settori difensivi',
      'Opportunità di diversificazione settoriale'
    ],
    actionItems: [
      'Riduci esposizione AAPL del 5%',
      'Aggiungi ETF settore sanitario',
      'Considera bonds governativi per stabilità'
    ],
    createdAt: new Date('2024-02-10')
  },
  {
    id: '2',
    type: RecommendationType.BUY,
    title: 'Opportunità in NVDA',
    description: 'NVIDIA mostra segnali positivi con forte crescita nel settore AI.',
    confidence: 92,
    expectedReturn: 18.7,
    riskLevel: RiskLevel.HIGH,
    timeframe: '6-12 mesi',
    reasoning: [
      'Crescita esplosiva nel settore AI',
      'Risultati trimestrali sopra le attese',
      'Posizione dominante nel mercato GPU'
    ],
    actionItems: [
      'Alloca 3-5% del portfolio',
      'Monitora volatilità',
      'Imposta stop loss al 15%'
    ],
    createdAt: new Date('2024-02-09')
  },
  {
    id: '3',
    type: RecommendationType.SELL,
    title: 'Ridimensiona TSLA',
    description: 'Tesla mostra segnali di debolezza con vendite in calo in Cina.',
    confidence: 78,
    riskLevel: RiskLevel.HIGH,
    timeframe: '1-3 mesi',
    reasoning: [
      'Calo vendite nel mercato cinese',
      'Aumento competizione EV',
      'Valutazione ancora elevata'
    ],
    actionItems: [
      'Riduci posizione del 30%',
      'Monitora dati vendite Q1',
      'Reinvesti in ETF diversificato'
    ],
    createdAt: new Date('2024-02-08')
  }
];

// Mock trading signals
export const mockTradingSignals: TradingSignal[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: SignalType.BUY,
    strength: 85,
    price: 185.20,
    targetPrice: 195.00,
    stopLoss: 178.00,
    timeframe: '1-2 settimane',
    description: 'Breakout rialzista con volumi elevati',
    createdAt: new Date('2024-02-11')
  },
  {
    id: '2',
    symbol: 'TSLA',
    type: SignalType.SELL,
    strength: 75,
    price: 248.50,
    targetPrice: 235.00,
    stopLoss: 255.00,
    timeframe: '3-5 giorni',
    description: 'Rottura supporto tecnico con RSI ipercomprato',
    createdAt: new Date('2024-02-11')
  }
];

// Mock educational content
export const mockEducationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'Fondamenti dell\'Investimento',
    description: 'Impara i principi base degli investimenti finanziari',
    category: EducationCategory.BASICS,
    difficulty: DifficultyLevel.BEGINNER,
    duration: 45,
    content: 'Contenuto del corso sui fondamenti...',
    tags: ['investimenti', 'base', 'principianti'],
    completed: true,
    progress: 100
  },
  {
    id: '2',
    title: 'Analisi Tecnica Avanzata',
    description: 'Tecniche avanzate di analisi tecnica per il trading',
    category: EducationCategory.ANALYSIS,
    difficulty: DifficultyLevel.ADVANCED,
    duration: 120,
    content: 'Contenuto del corso di analisi tecnica...',
    videoUrl: 'https://example.com/video',
    tags: ['analisi tecnica', 'trading', 'avanzato'],
    completed: false,
    progress: 35
  },
  {
    id: '3',
    title: 'Psicologia del Trading',
    description: 'Come gestire le emozioni negli investimenti',
    category: EducationCategory.PSYCHOLOGY,
    difficulty: DifficultyLevel.INTERMEDIATE,
    duration: 60,
    content: 'Contenuto del corso di psicologia...',
    tags: ['psicologia', 'emozioni', 'trading'],
    completed: false,
    progress: 0
  }
];

// Mock risk assessment
export const mockRiskAssessment: RiskAssessment = {
  overallRisk: RiskLevel.MEDIUM,
  diversificationRisk: 35,
  marketRisk: 65,
  liquidityRisk: 20,
  concentrationRisk: 45,
  volatilityRisk: 70,
  score: 62,
  recommendations: [
    'Aumenta la diversificazione settoriale',
    'Considera bonds per ridurre volatilità',
    'Monitora concentrazione in singoli titoli',
    'Mantieni riserva di liquidità del 10%'
  ]
};

// Mock performance data
export const mockPerformanceData: PerformanceData[] = [
  { period: '1D', return: 1.01, benchmark: 0.85 },
  { period: '1W', return: 2.45, benchmark: 1.95 },
  { period: '1M', return: 5.67, benchmark: 4.32 },
  { period: '3M', return: 12.45, benchmark: 8.76 },
  { period: '6M', return: 18.92, benchmark: 14.55 },
  { period: '1Y', return: 24.67, benchmark: 18.45 },
  { period: 'YTD', return: 7.85, benchmark: 5.67 }
];

// Mock price history
export const generateMockPriceHistory = (symbol: string, days: number = 30): PriceHistory => {
  const basePrice = mockAssets.find(a => a.symbol === symbol)?.price || 100;
  const data: MarketData[] = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const volatility = 0.02; // 2% daily volatility
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const price = basePrice * (1 + randomChange * i / days);
    
    data.push({
      timestamp: date,
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 10000000) + 1000000
    });
  }
  
  return { symbol, data };
};

// Mock chart data
export const mockChartData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  value: Math.round((125000 + Math.random() * 10000 - 5000) * 100) / 100,
  benchmark: Math.round((120000 + Math.random() * 8000 - 4000) * 100) / 100
}));