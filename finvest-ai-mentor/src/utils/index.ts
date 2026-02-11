// Utility functions for the financial application

export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value >= 0 ? '+' : ''}${formatNumber(value, decimals)}%`;
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return `${formatNumber(num / 1e9, 1)}B`;
  }
  if (num >= 1e6) {
    return `${formatNumber(num / 1e6, 1)}M`;
  }
  if (num >= 1e3) {
    return `${formatNumber(num / 1e3, 1)}K`;
  }
  return formatNumber(num, 0);
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return 'text-success-600';
  if (change < 0) return 'text-danger-600';
  return 'text-gray-600';
};

export const getChangeBgColor = (change: number): string => {
  if (change > 0) return 'bg-success-50 text-success-700';
  if (change < 0) return 'bg-danger-50 text-danger-700';
  return 'bg-gray-50 text-gray-700';
};

export const calculatePortfolioMetrics = (assets: any[]) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalReturn = assets.reduce((sum, asset) => sum + asset.totalReturn, 0);
  const totalReturnPercent = totalValue > 0 ? (totalReturn / totalValue) * 100 : 0;
  
  return {
    totalValue,
    totalReturn,
    totalReturnPercent,
  };
};

export const getDiversificationScore = (assets: any[]): number => {
  const typeDistribution = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + asset.allocation;
    return acc;
  }, {} as Record<string, number>);
  
  const allocations = Object.values(typeDistribution);
  
  // Calculate Herfindahl-Hirschman Index (lower is more diversified)
  const hhi = allocations.reduce((sum: number, allocation: number) => sum + Math.pow(allocation / 100, 2), 0);
  
  // Convert to score (higher is better)
  return Math.round((1 - hhi) * 100);
};

export const getRiskScore = (assets: any[], userRiskProfile: string): number => {
  // Simplified risk calculation based on asset types and volatility
  const riskWeights: any = {
    cash: 0,
    bond: 20,
    etf: 40,
    stock: 60,
    crypto: 90,
    commodity: 50,
    real_estate: 30,
  };
  
  const weightedRisk = assets.reduce((sum: number, asset: any) => {
    const risk = riskWeights[asset.type] || 50;
    return sum + (risk * asset.allocation / 100);
  }, 0);
  
  return Math.round(weightedRisk);
};

export const calculateSharpeRatio = (returns: number[], riskFreeRate: number = 0.02): number => {
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  
  return stdDev > 0 ? (avgReturn - riskFreeRate) / stdDev : 0;
};

export const generateColorPalette = (count: number): string[] => {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];
  
  const palette = [];
  for (let i = 0; i < count; i++) {
    palette.push(colors[i % colors.length]);
  }
  
  return palette;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: any;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const getAssetTypeLabel = (type: string): string => {
  const labels = {
    stock: 'Azioni',
    bond: 'Obbligazioni',
    etf: 'ETF',
    crypto: 'Criptovalute',
    commodity: 'Materie Prime',
    real_estate: 'Immobiliare',
    cash: 'Liquidità',
  };
  
  return labels[type as keyof typeof labels] || type;
};

export const getRiskLevelLabel = (level: string): string => {
  const labels = {
    low: 'Basso',
    medium: 'Medio',
    high: 'Alto',
    very_high: 'Molto Alto',
  };
  
  return labels[level as keyof typeof labels] || level;
};

export const getTimeframeLabel = (period: string): string => {
  const labels = {
    '1D': '1 Giorno',
    '1W': '1 Settimana',
    '1M': '1 Mese',
    '3M': '3 Mesi',
    '6M': '6 Mesi',
    '1Y': '1 Anno',
    'YTD': 'Anno Corrente',
  };
  
  return labels[period as keyof typeof labels] || period;
};

export const formatDate = (date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  const options: any = {
    short: { day: 'numeric', month: 'short' },
    medium: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' },
  };
  
  return new Intl.DateTimeFormat('it-IT', options[format]).format(date);
};

export const calculateMovingAverage = (data: number[], window: number): number[] => {
  const result = [];
  for (let i = window - 1; i < data.length; i++) {
    const sum = data.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / window);
  }
  return result;
};

export const calculateRSI = (prices: number[], period: number = 14): number => {
  if (prices.length < period + 1) return 50; // Neutral RSI
  
  let gains = 0;
  let losses = 0;
  
  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  const avgGain = gains / period;
  const avgLoss = losses / period;
  
  if (avgLoss === 0) return 100;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};