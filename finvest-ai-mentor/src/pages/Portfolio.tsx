import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  MoreVertical, 
  Plus, 
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Target,
  AlertTriangle
} from 'lucide-react';
import { 
  mockPortfolio, 
  mockAssets,
  mockPerformanceData,
  mockChartData 
} from '../data/mockData';
import { 
  formatCurrency, 
  formatPercentage, 
  getChangeColor,
  getChangeBgColor,
  formatLargeNumber,
  getAssetTypeLabel
} from '../utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  Treemap
} from 'recharts';

export const Portfolio: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('holdings');
  const portfolio = mockPortfolio;

  const tabs = [
    { id: 'holdings', name: 'Holdings', icon: BarChart3 },
    { id: 'allocation', name: 'Allocazione', icon: PieChart },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
    { id: 'analysis', name: 'Analisi', icon: Target }
  ];

  const allocationData = portfolio.assets.map((asset, index) => ({
    name: asset.symbol,
    fullName: asset.name,
    value: asset.allocation,
    amount: asset.value,
    color: getColorForIndex(index)
  }));

  const performanceChartData = mockChartData.map(item => ({
    date: item.date,
    value: item.value
  }));

  const sectorData = portfolio.assets.map(asset => ({
    name: asset.symbol,
    size: asset.value,
    change: asset.totalReturnPercent,
    type: asset.type
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="mt-2 text-gray-600">
            Analizza e gestisci il tuo portfolio di investimenti
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Esporta
          </button>
          <button className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500">
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Asset
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valore Totale</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(portfolio.totalValue)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className={`mt-2 flex items-center text-sm ${getChangeColor(portfolio.dayChangePercent)}`}>
            {portfolio.dayChangePercent > 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {formatCurrency(portfolio.dayChange)} ({formatPercentage(portfolio.dayChangePercent)})
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rendimento Totale</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(portfolio.totalReturn)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-100">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className={`mt-2 text-sm ${getChangeColor(portfolio.totalReturnPercent)}`}>
            {formatPercentage(portfolio.totalReturnPercent)}
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Diversificazione</p>
              <p className="text-2xl font-bold text-gray-900">
                {portfolio.diversificationScore}/100
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <PieChart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Ottimo livello
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Score Rischio</p>
              <p className="text-2xl font-bold text-gray-900">
                {portfolio.riskScore}/100
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Moderato
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
        {selectedTab === 'holdings' && (
          <HoldingsView assets={portfolio.assets} />
        )}
        {selectedTab === 'allocation' && (
          <AllocationView data={allocationData} />
        )}
        {selectedTab === 'performance' && (
          <PerformanceView data={performanceChartData} />
        )}
        {selectedTab === 'analysis' && (
          <AnalysisView assets={portfolio.assets} sectorData={sectorData} />
        )}
      </div>
    </div>
  );
};

// Holdings View Component
const HoldingsView: React.FC<{ assets: any[] }> = ({ assets }) => {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Le Tue Holdings</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca asset..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prezzo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantità
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valore
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allocazione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset, index) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {asset.logoUrl && (
                      <img className="h-8 w-8 rounded-full mr-3" src={asset.logoUrl} alt={asset.name} />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                      <div className="text-sm text-gray-500">{getAssetTypeLabel(asset.type)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatCurrency(asset.price)}</div>
                  <div className={`text-sm ${getChangeColor(asset.changePercent)}`}>
                    {formatPercentage(asset.changePercent)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(asset.value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{asset.allocation.toFixed(1)}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${asset.allocation}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${getChangeColor(asset.totalReturnPercent)}`}>
                    {formatCurrency(asset.totalReturn)}
                  </div>
                  <div className={`text-sm ${getChangeColor(asset.totalReturnPercent)}`}>
                    {formatPercentage(asset.totalReturnPercent)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Allocation View Component
const AllocationView: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Allocazione per Asset
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name} ${value.toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => [`${value.toFixed(1)}%`, 'Allocazione']}
              labelFormatter={(label) => `Asset: ${label}`}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Dettaglio Allocazione
        </h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.fullName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{item.value.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">{formatCurrency(item.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Performance View Component
const PerformanceView: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Performance Portfolio (30 giorni)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              formatter={(value: any) => [formatCurrency(value), 'Valore Portfolio']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('it-IT')}
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
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Metriche di Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {mockPerformanceData.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{metric.period}</p>
              <p className={`text-lg font-semibold ${getChangeColor(metric.return)}`}>
                {formatPercentage(metric.return)}
              </p>
              {metric.benchmark && (
                <p className="text-xs text-gray-500 mt-1">
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

// Analysis View Component
const AnalysisView: React.FC<{ assets: any[], sectorData: any[] }> = ({ assets, sectorData }) => {
  return (
    <div className="space-y-8">
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Mappa del Portfolio
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <Treemap
            data={sectorData}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent />}
          />
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Analisi per Tipo di Asset
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={assets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis />
              <Tooltip formatter={(value: any) => [formatCurrency(value), 'Valore']} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Top Performers
          </h3>
          <div className="space-y-4">
            {[...assets]
              .sort((a, b) => b.totalReturnPercent - a.totalReturnPercent)
              .slice(0, 5)
              .map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 mr-3">
                      <span className="text-xs font-medium text-primary-800">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{asset.symbol}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(asset.value)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${getChangeColor(asset.totalReturnPercent)}`}>
                      {formatPercentage(asset.totalReturnPercent)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(asset.totalReturn)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Treemap Content
const CustomizedContent: React.FC<any> = (props) => {
  const { root, depth, x, y, width, height, index, payload } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? getColorForIndex(index) : 'rgba(255,255,255,0)',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
          fontWeight="bold"
        >
          {payload.name}
        </text>
      )}
    </g>
  );
};

// Helper function to get colors for chart
const getColorForIndex = (index: number): string => {
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];
  return colors[index % colors.length];
};