// Types for the financial application
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  riskProfile: RiskProfile;
  totalPortfolioValue: number;
  joinDate: Date;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  logoUrl?: string;
}

export interface PortfolioAsset extends Asset {
  quantity: number;
  value: number;
  allocation: number;
  averagePrice: number;
  totalReturn: number;
  totalReturnPercent: number;
}

export interface Portfolio {
  id: string;
  name: string;
  assets: PortfolioAsset[];
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  dayChange: number;
  dayChangePercent: number;
  diversificationScore: number;
  riskScore: number;
  lastUpdated: Date;
}

export interface MarketData {
  timestamp: Date;
  price: number;
  volume: number;
}

export interface PriceHistory {
  symbol: string;
  data: MarketData[];
}

export interface AIRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  confidence: number;
  expectedReturn?: number;
  riskLevel: RiskLevel;
  timeframe: string;
  reasoning: string[];
  actionItems: string[];
  createdAt: Date;
}

export interface TradingSignal {
  id: string;
  symbol: string;
  type: SignalType;
  strength: number;
  price: number;
  targetPrice?: number;
  stopLoss?: number;
  timeframe: string;
  description: string;
  createdAt: Date;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  category: EducationCategory;
  difficulty: DifficultyLevel;
  duration: number; // in minutes
  content: string;
  videoUrl?: string;
  tags: string[];
  completed?: boolean;
  progress?: number;
}

export interface RiskAssessment {
  overallRisk: RiskLevel;
  diversificationRisk: number;
  marketRisk: number;
  liquidityRisk: number;
  concentrationRisk: number;
  volatilityRisk: number;
  recommendations: string[];
  score: number; // 0-100
}

// Enums
export enum AssetType {
  STOCK = 'stock',
  BOND = 'bond',
  ETF = 'etf',
  CRYPTO = 'crypto',
  COMMODITY = 'commodity',
  REAL_ESTATE = 'real_estate',
  CASH = 'cash'
}

export enum RiskProfile {
  CONSERVATIVE = 'conservative',
  MODERATE = 'moderate',
  AGGRESSIVE = 'aggressive'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum RecommendationType {
  BUY = 'buy',
  SELL = 'sell',
  HOLD = 'hold',
  REBALANCE = 'rebalance',
  DIVERSIFY = 'diversify'
}

export enum SignalType {
  BUY = 'buy',
  SELL = 'sell',
  STRONG_BUY = 'strong_buy',
  STRONG_SELL = 'strong_sell'
}

export enum EducationCategory {
  BASICS = 'basics',
  STOCKS = 'stocks',
  BONDS = 'bonds',
  CRYPTO = 'crypto',
  OPTIONS = 'options',
  ANALYSIS = 'analysis',
  PSYCHOLOGY = 'psychology'
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

// Chart data types
export interface ChartDataPoint {
  date: string;
  value: number;
  [key: string]: any;
}

export interface PerformanceData {
  period: string;
  return: number;
  benchmark?: number;
}

// Navigation and UI types
export interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface DashboardCard {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  description?: string;
}