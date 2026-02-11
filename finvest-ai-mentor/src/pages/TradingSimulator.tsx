import React, { useState } from 'react';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  RotateCcw,
  Activity,
  BarChart3,
  Target,
  Zap,
  Award,
  Clock
} from 'lucide-react';
import { mockAssets } from '../data/mockData';
import { formatCurrency, formatPercentage, getChangeColor } from '../utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const TradingSimulator: React.FC = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [virtualBalance, setVirtualBalance] = useState(100000);
  const [selectedAsset, setSelectedAsset] = useState(mockAssets[0]);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderAmount, setOrderAmount] = useState('');
  const [positions, setPositions] = useState<any[]>([]);

  const simulationStats = {
    totalReturn: 5250,
    totalReturnPercent: 5.25,
    winRate: 68,
    totalTrades: 25,
    profitableTrades: 17,
    averageReturn: 2.1,
    maxDrawdown: -1250,
    sharpeRatio: 1.45
  };

  const marketMoods = [
    { mood: 'Bullish', percentage: 65, color: 'text-green-600', bgColor: 'bg-green-100' },
    { mood: 'Bearish', percentage: 25, color: 'text-red-600', bgColor: 'bg-red-100' },
    { mood: 'Neutral', percentage: 10, color: 'text-gray-600', bgColor: 'bg-gray-100' }
  ];

  const tradingChallenges = [
    {
      title: 'Warren Buffett Challenge',
      description: 'Investi come il leggendario investor',
      target: '+15% in 6 mesi',
      reward: '500 XP',
      difficulty: 'Intermedio',
      participants: 1234
    },
    {
      title: 'Day Trading Master',
      description: 'Completa 10 trade profittevoli consecutivi',
      target: '10 trade vincenti',
      reward: '1000 XP',
      difficulty: 'Avanzato',
      participants: 567
    },
    {
      title: 'Risk Management Pro',
      description: 'Mantieni il drawdown sotto il 5%',
      target: 'Max -5% perdite',
      reward: '750 XP',
      difficulty: 'Intermedio',
      participants: 890
    }
  ];

  const recentTrades = [
    { symbol: 'AAPL', type: 'buy', quantity: 10, price: 185.20, profit: 125.50, time: '10:30' },
    { symbol: 'MSFT', type: 'sell', quantity: 5, price: 415.85, profit: -45.20, time: '09:15' },
    { symbol: 'GOOGL', type: 'buy', quantity: 8, price: 142.65, profit: 89.30, time: '08:45' }
  ];

  const generatePerformanceData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', { 
        day: 'numeric', 
        month: 'short' 
      }),
      value: 100000 + (Math.random() - 0.4) * 10000 + i * 200,
      benchmark: 100000 + (Math.random() - 0.5) * 8000 + i * 150
    }));
  };

  const performanceData = generatePerformanceData();

  const handleTrade = () => {
    if (!orderAmount || parseFloat(orderAmount) <= 0) return;

    const amount = parseFloat(orderAmount);
    const asset = selectedAsset;
    const cost = amount * asset.price;

    if (orderType === 'buy' && cost <= virtualBalance) {
      setVirtualBalance(prev => prev - cost);
      setPositions(prev => [...prev, {
        id: Date.now(),
        symbol: asset.symbol,
        type: 'buy',
        quantity: amount,
        price: asset.price,
        timestamp: new Date()
      }]);
    } else if (orderType === 'sell') {
      // Find existing position to sell
      const existingPosition = positions.find(p => p.symbol === asset.symbol && p.type === 'buy');
      if (existingPosition && existingPosition.quantity >= amount) {
        setVirtualBalance(prev => prev + cost);
        // Update position or remove if fully sold
        setPositions(prev => prev.map(p => 
          p.id === existingPosition.id 
            ? { ...p, quantity: p.quantity - amount }
            : p
        ).filter(p => p.quantity > 0));
      }
    }

    setOrderAmount('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <DollarSign className="mr-3 h-8 w-8 text-primary-600" />
            Trading Simulator
          </h1>
          <p className="mt-2 text-gray-600">
            Pratica il trading senza rischi con denaro virtuale
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setIsSimulationRunning(!isSimulationRunning)}
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
              isSimulationRunning 
                ? 'bg-red-600 text-white hover:bg-red-500'
                : 'bg-green-600 text-white hover:bg-green-500'
            }`}
          >
            {isSimulationRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pausa
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Avvia
              </>
            )}
          </button>
          <button className="inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Virtual Portfolio Status */}
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Saldo Virtuale</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(virtualBalance)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">P&L Totale</p>
              <p className={`text-xl font-bold ${getChangeColor(simulationStats.totalReturnPercent)}`}>
                {formatCurrency(simulationStats.totalReturn)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Win Rate</p>
              <p className="text-xl font-bold text-gray-900">{simulationStats.winRate}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Trade Totali</p>
              <p className="text-xl font-bold text-gray-900">{simulationStats.totalTrades}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Trading Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Portfolio Virtuale
              </h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
                  <span>Il tuo Portfolio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span>S&P 500</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value), '']}
                  labelFormatter={(label) => `Data: ${label}`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                  name="Portfolio"
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Benchmark"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Trading Interface */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Interfaccia di Trading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset
                  </label>
                  <select 
                    value={selectedAsset.id}
                    onChange={(e) => setSelectedAsset(mockAssets.find(a => a.id === e.target.value) || mockAssets[0])}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    {mockAssets.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.symbol} - {formatCurrency(asset.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setOrderType('buy')}
                    className={`px-4 py-2 rounded-md font-medium ${
                      orderType === 'buy' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Compra
                  </button>
                  <button
                    onClick={() => setOrderType('sell')}
                    className={`px-4 py-2 rounded-md font-medium ${
                      orderType === 'sell' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Vendi
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantità
                  </label>
                  <input
                    type="number"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(e.target.value)}
                    placeholder="Inserisci quantità"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Costo Stimato:</span>
                    <span className="font-medium">
                      {orderAmount ? formatCurrency(parseFloat(orderAmount) * selectedAsset.price) : '-'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleTrade}
                  className={`w-full py-3 rounded-md font-medium ${
                    orderType === 'buy' 
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {orderType === 'buy' ? 'Compra' : 'Vendi'} {selectedAsset.symbol}
                </button>
              </div>

              {/* Asset Details */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{selectedAsset.name}</h4>
                    {selectedAsset.logoUrl && (
                      <img className="h-8 w-8 rounded-full" src={selectedAsset.logoUrl} alt={selectedAsset.name} />
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prezzo Corrente:</span>
                      <span className="font-medium">{formatCurrency(selectedAsset.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Variazione:</span>
                      <span className={`font-medium ${getChangeColor(selectedAsset.changePercent)}`}>
                        {formatPercentage(selectedAsset.changePercent)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium">
                        {(selectedAsset.volume / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Trades */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Trade Recenti</h4>
                  <div className="space-y-2">
                    {recentTrades.map((trade, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            trade.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          <span className="text-sm font-medium">{trade.symbol}</span>
                          <span className="text-xs text-gray-600 ml-2">
                            {trade.quantity}x @ {formatCurrency(trade.price)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${getChangeColor(trade.profit)}`}>
                            {formatCurrency(trade.profit)}
                          </span>
                          <div className="text-xs text-gray-600">{trade.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Statistiche
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Rendimento Totale:</span>
                <span className={`font-medium ${getChangeColor(simulationStats.totalReturnPercent)}`}>
                  {formatPercentage(simulationStats.totalReturnPercent)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rendimento Medio:</span>
                <span className="font-medium">{formatPercentage(simulationStats.averageReturn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Drawdown:</span>
                <span className="font-medium text-red-600">{formatCurrency(simulationStats.maxDrawdown)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sharpe Ratio:</span>
                <span className="font-medium">{simulationStats.sharpeRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trade Profittevoli:</span>
                <span className="font-medium text-green-600">
                  {simulationStats.profitableTrades}/{simulationStats.totalTrades}
                </span>
              </div>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Sentiment di Mercato
            </h3>
            <div className="space-y-3">
              {marketMoods.map((mood, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${mood.bgColor} mr-3`}></div>
                    <span className="text-sm font-medium">{mood.mood}</span>
                  </div>
                  <span className={`text-sm font-medium ${mood.color}`}>
                    {mood.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Challenges */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-600" />
              Sfide Trading
            </h3>
            <div className="space-y-4">
              {tradingChallenges.slice(0, 2).map((challenge, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Target: {challenge.target}</span>
                    <span className="font-medium text-yellow-600">{challenge.reward}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
              Vedi tutte le sfide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};