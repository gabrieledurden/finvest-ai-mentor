import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PieChart,
  Bot,
  TrendingUp,
  GraduationCap,
  Shield,
  DollarSign,
  Menu,
  X,
  Bell,
  Settings,
  User,
  LogOut
} from 'lucide-react';
import { mockUser } from '../data/mockData';
import { formatCurrency } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    { name: 'AI Advisor', href: '/ai-advisor', icon: Bot },
    { name: 'Market Analysis', href: '/market-analysis', icon: TrendingUp },
    { name: 'Education', href: '/education', icon: GraduationCap },
    { name: 'Risk Assessment', href: '/risk-assessment', icon: Shield },
    { name: 'Trading Simulator', href: '/trading-simulator', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/20"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <div className="absolute right-0 top-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent navigation={navigation} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-xl">
          <SidebarContent navigation={navigation} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              {/* Search could go here */}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Portfolio value display */}
              <div className="hidden lg:flex lg:items-center lg:gap-x-2">
                <span className="text-sm font-medium text-gray-900">Portfolio:</span>
                <span className="text-lg font-bold text-primary-600">
                  {formatCurrency(mockUser.totalPortfolioValue)}
                </span>
              </div>

              {/* Notifications */}
              <button className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button className="flex items-center gap-x-2 rounded-full bg-gray-50 p-1.5 text-sm hover:bg-gray-100">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={mockUser.avatar}
                    alt={mockUser.name}
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-2 text-sm font-semibold text-gray-900">
                      {mockUser.name}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

interface SidebarContentProps {
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ElementType;
  }>;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ navigation }) => {
  return (
    <>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center gap-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-primary-700">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Finvest AI</h1>
            <p className="text-sm text-gray-500">Mentor</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <item.icon className="h-6 w-6 shrink-0" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          {/* Bottom section */}
          <li className="mt-auto">
            <div className="rounded-lg bg-gradient-to-r from-primary-50 to-primary-100 p-4">
              <div className="flex items-center gap-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{mockUser.name}</p>
                  <p className="text-xs text-gray-600">Profilo: {mockUser.riskProfile}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-x-2">
                <button className="flex-1 rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                  <Settings className="inline h-3 w-3 mr-1" />
                  Settings
                </button>
                <button className="flex-1 rounded-md bg-primary-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-700">
                  <LogOut className="inline h-3 w-3 mr-1" />
                  Esci
                </button>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};