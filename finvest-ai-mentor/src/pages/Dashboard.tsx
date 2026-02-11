import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Target, AlertCircle } from 'lucide-react';
import { mockUser, mockPortfolio, mockPerformanceData, mockChartData } from '../data/mockData';
import { formatCurrency, formatPercentage, getChangeColor } from '../utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

export const Dashboard: React.FC = () => {
  const portfolio = mockPortfolio;
  const user = mockUser;

  const dashboardCards = [
    {
      title: 'Valore Portfolio',
      value: formatCurrency(portfolio.totalValue),
      change: portfolio.dayChangePercent,
      changeValue: formatCurrency(portfolio.dayChange),
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: 'Rendimento Totale',
      value: formatCurrency(portfolio.totalReturn),
      change: portfolio.totalReturnPercent,
      changeValue: formatPercentage(portfolio.totalReturnPercent),
      icon: TrendingUp,
      color: 'success'
    },
    {
      title: 'Diversificazione',
      value: `${portfolio.diversificationScore}/100`,
      change: 0,
      changeValue: 'Ottimo',
      icon: PieChart,
      color: 'primary'
    },
    {
      title: 'Rischio',
      value: `${portfolio.riskScore}/100`,
      change: 0,
      changeValue: 'Moderato',
      icon: Target,
      color: 'warning'
    }
  ];

  const allocationData = portfolio.assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.allocation,
    color: getColorForIndex(index)
  }));

  const performanceData = mockChartData.map(item => ({
    date: item.date,
    portfolio: item.value,
    benchmark: item.benchmark
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Benvenuto, {user.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Ecco una panoramica del tuo portfolio e delle opportunità di investimento.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500">
            <TrendingUp className="mr-2 h-4 w-4" />
            Analizza Portfolio
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <div key={index} className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${card.color}-100`}>
                <card.icon className={`h-6 w-6 text-${card.color}-600`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.change !== 0 && (
                  <p className={`flex items-center text-sm ${getChangeColor(card.change)}`}>
                    {card.change > 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {card.changeValue}
                  </p>
                )}
                {card.change === 0 && (
                  <p className="text-sm text-gray-500">{card.changeValue}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Portfolio Performance Chart */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Portfolio (30 giorni)
              </h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
                  <span>Il tuo Portfolio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span>Benchmark</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value), '']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('it-IT')}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="portfolio" 
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
        </div>

        {/* Asset Allocation */}
        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Allocazione Asset
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Allocazione']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-gray-600">{item.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Azioni Rapide
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors">
                <span className="font-medium text-primary-900">Analizza Portfolio</span>
                <TrendingUp className="h-4 w-4 text-primary-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-success-50 hover:bg-success-100 transition-colors">
                <span className="font-medium text-success-900">Consigli AI</span>
                <AlertCircle className="h-4 w-4 text-success-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-warning-50 hover:bg-warning-100 transition-colors">
                <span className="font-medium text-warning-900">Valuta Rischi</span>
                <Target className="h-4 w-4 text-warning-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Metriche di Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {mockPerformanceData.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-600 mb-1">{metric.period}</p>
              <p className={`font-semibold ${getChangeColor(metric.return)}`}>
                {formatPercentage(metric.return)}
              </p>
              {metric.benchmark && (
                <p className="text-xs text-gray-500">
                  vs {formatPercentage(metric.benchmark)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get colors for pie chart
const getColorForIndex = (index: number): string => {
  const colors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // yellow
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
  ];
  return colors[index % colors.length];
};