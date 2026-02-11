import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Globe,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  DollarSign,
  Activity
} from 'lucide-react';
import { mockAssets } from '../data/mockData';
import { 
  formatCurrency, 
  formatPercentage, 
  getChangeColor,
  formatLargeNumber
} from '../utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart
} from 'recharts';

export const MarketAnalysis: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedMarket, setSelectedMarket] = useState('US');

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y'];
  const markets = [
    { id: 'US', name: 'USA', flag: '🇺🇸' },
    { id: 'EU', name: 'Europe', flag: '🇪🇺' },
    { id: 'ASIA', name: 'Asia', flag: '🌏' },
    { id: 'GLOBAL', name: 'Global', flag: '🌍' }
  ];

  // Mock market data
  const marketIndices = [
    { name: 'S&P 500', value: 4756.50, change: 1.24, changePercent: 0.026 },
    { name: 'NASDAQ', value: 14845.72, change: -23.45, changePercent: -0.158 },
    { name: 'DOW JONES', value: 37463.64, change: 45.87, changePercent: 0.123 },
    { name: 'FTSE MIB', value: 29450.12, change: 156.34, changePercent: 0.534 }
  ];

  const sectorPerformance = [
    { sector: 'Technology', performance: 2.45, color: '#3b82f6' },
    { sector: 'Healthcare', performance: 1.23, color: '#10b981' },
    { sector: 'Financial', performance: -0.87, color: '#ef4444' },
    { sector: 'Energy', performance: 3.45, color: '#f59e0b' },
    { sector: 'Consumer', performance: 0.67, color: '#8b5cf6' },
    { sector: 'Industrial', performance: 1.89, color: '#06b6d4' }
  ];

  const marketNews = [
    {
      title: "Fed mantiene tassi stabili, mercati reagiscono positivamente",
      time: "2 ore fa",
      impact: "High",
      sentiment: "positive"
    },
    {
      title: "Risultati trimestrali Apple superano le aspettative",
      time: "4 ore fa",
      impact: "Medium",
      sentiment: "positive"
    },
    {
      title: "Tensioni geopolitiche influenzano mercati energetici",
      time: "6 ore fa",
      impact: "High",
      sentiment: "negative"
    }
  ];

  // Generate mock chart data
  const generateChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', { 
        month: 'short', 
        day: 'numeric' 
      }),
      price: 4700 + Math.random() * 100,
      volume: Math.random() * 100000000,
      volatility: Math.random() * 5
    }));
  };

  const chartData = generateChartData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Globe className="mr-3 h-8 w-8 text-primary-600" />
            Market Analysis
          </h1>
          <p className="mt-2 text-gray-600">
            Analisi avanzate del mercato e trend in tempo reale
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select 
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {markets.map(market => (
              <option key={market.id} value={market.id}>
                {market.flag} {market.name}
              </option>
            ))}
          </select>
          <button className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500">
            <RefreshCw className="mr-2 h-4 w-4" />
            Aggiorna
          </button>
        </div>
      </div>

      {/* Market Status */}
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Mercati Aperti
              </h3>
              <p className="text-gray-600">
                Sessione di trading attiva • Ultimo aggiornamento: {new Date().toLocaleTimeString('it-IT')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">VIX (Fear Index)</p>
              <p className="text-lg font-bold text-red-600">18.45</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">DXY (USD Index)</p>
              <p className="text-lg font-bold text-blue-600">103.24</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Gold</p>
              <p className="text-lg font-bold text-yellow-600">$2,045</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketIndices.map((index, i) => (
          <div key={i} className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{index.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatLargeNumber(index.value)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <BarChart3 className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className={`mt-2 flex items-center text-sm ${getChangeColor(index.changePercent)}`}>
              {index.changePercent > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {index.change > 0 ? '+' : ''}{index.change.toFixed(2)} ({formatPercentage(index.changePercent * 100)})
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                S&P 500 Index
              </h3>
              <div className="flex space-x-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedTimeframe === tf
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis yAxisId="price" stroke="#6b7280" fontSize={12} />
                <YAxis yAxisId="volume" orientation="right" stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'price' ? formatCurrency(value) : formatLargeNumber(value),
                    name === 'price' ? 'Prezzo' : name === 'volume' ? 'Volume' : 'Volatilità'
                  ]}
                  labelFormatter={(label) => `Data: ${label}`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  yAxisId="price"
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Bar 
                  yAxisId="volume"
                  dataKey="volume" 
                  fill="#94a3b8" 
                  opacity={0.3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sector Performance */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Performance Settoriale
            </h3>
            <div className="space-y-4">
              {sectorPerformance.map((sector, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: sector.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">
                      {sector.sector}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${getChangeColor(sector.performance)}`}>
                      {formatPercentage(sector.performance)}
                    </span>
                    {sector.performance > 0 ? (
                      <TrendingUp className="ml-1 h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="ml-1 h-3 w-3 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Movers */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Movers
            </h3>
            <div className="space-y-4">
              {mockAssets.slice(0, 5).map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {asset.logoUrl && (
                      <img className="h-6 w-6 rounded-full mr-2" src={asset.logoUrl} alt={asset.name} />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{asset.symbol}</p>
                      <p className="text-xs text-gray-600">{formatCurrency(asset.price)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getChangeColor(asset.changePercent)}`}>
                      {formatPercentage(asset.changePercent)}
                    </p>
                    <p className="text-xs text-gray-600">
                      Vol: {formatLargeNumber(asset.volume)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market News */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Market News & Events
          </h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Vedi tutto
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketNews.map((news, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  news.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {news.impact} Impact
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  news.sentiment === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {news.title}
              </h4>
              <div className="flex items-center text-xs text-gray-600">
                <Activity className="h-3 w-3 mr-1" />
                {news.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Calendar */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary-600" />
            Calendario Economico
          </h3>
        </div>
        <div className="space-y-3">
          {[
            { time: '10:30', event: 'US GDP Quarterly Data', impact: 'High', currency: 'USD' },
            { time: '14:00', event: 'ECB Interest Rate Decision', impact: 'High', currency: 'EUR' },
            { time: '16:00', event: 'US Employment Data', impact: 'Medium', currency: 'USD' }
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-900 mr-3">
                  {event.time}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <p className="text-xs text-gray-600">{event.currency}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                event.impact === 'High' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};