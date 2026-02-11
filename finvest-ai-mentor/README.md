# 🤖💰 Finvest AI Mentor

**Un mentor AI avanzato per investimenti finanziari con analisi di portfolio completa, consigli intelligenti e strumenti di trading professionali.**

## ✨ Links Utili

🔗 **GitHub Repository**: [https://github.com/gabrieledurden/finvest-ai-mentor](https://github.com/gabrieledurden/finvest-ai-mentor)

## 🚀 Deploy su Piattaforme

### Deploy su Vercel (Raccomandato)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gabrieledurden/finvest-ai-mentor)

1. Clicca il pulsante sopra
2. Connetti il tuo account GitHub
3. Il deploy sarà automatico con queste impostazioni:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Deploy su Netlify
1. Vai su [netlify.com](https://netlify.com)
2. Trascina la cartella `dist/` su Netlify Drop
3. Oppure connetti il repository GitHub per deploy automatici

### Deploy Locale
```bash
git clone https://github.com/gabrieledurden/finvest-ai-mentor.git
cd finvest-ai-mentor
npm install
npm run dev
```

## 🎯 Caratteristiche Principali

### 📊 Dashboard Intelligente
- **Panoramica completa del portfolio** con metriche in tempo reale
- **Grafici di performance** con confronto benchmark
- **Allocazione degli asset** con visualizzazione pie chart
- **Azioni rapide** per analisi immediate

### 💼 Portfolio Analyzer Avanzato
- **Holdings dettagliate** con informazioni complete su ogni asset
- **Analisi di allocazione** con breakdown per settore e tipo
- **Performance tracking** con storico delle performance
- **Analysis view** con treemap e top performers

### 🧠 AI Investment Advisor
- **Raccomandazioni personalizzate** basate su algoritmi AI
- **Segnali di trading** con analisi tecnica avanzata
- **Insights intelligenti** su diversificazione e rischi
- **Chat AI** interattiva per consigli personalizzati

### 📈 Market Analysis
- **Dati di mercato in tempo reale** con indici principali
- **Performance settoriale** con heatmap
- **Notizie di mercato** con analisi dell'impatto
- **Calendario economico** con eventi importanti

### ⚖️ Risk Assessment
- **Valutazione completa del rischio** con score personalizzato
- **Analisi dettagliata** per tipo di rischio
- **Stress testing** con scenari avversi
- **Raccomandazioni prioritarie** per la gestione del rischio

### 🎓 Education Hub
- **Percorsi di apprendimento** strutturati per livello
- **Corsi interattivi** con tracking del progresso
- **Sistema di gamification** con XP e achievement
- **Filtering avanzato** per categoria e difficoltà

### 🎮 Trading Simulator
- **Portfolio virtuale** con €100,000 di partenza
- **Interfaccia di trading realistica** con ordini buy/sell
- **Statistiche di performance** dettagliate
- **Sfide di trading** competitive con leaderboard

## 🛠️ Tecnologie Utilizzate

### Frontend
- **React 18** + **TypeScript** per type safety
- **Vite** per build veloce e hot reload
- **Tailwind CSS** per styling moderno
- **Recharts** per grafici professionali
- **Framer Motion** per animazioni fluide
- **Lucide React** per icone moderne

### Design System
- **Glass morphism** per effetti moderni
- **Gradient backgrounds** per visual appeal
- **Responsive design** per tutti i dispositivi
- **Dark/Light mode ready** (estendibile)

### Architecture
- **Component-based** con riutilizzo massimo
- **TypeScript interfaces** per data modeling
- **Custom hooks** per logica condivisa
- **Utility functions** per formatting

## 🚀 Quick Start

```bash
# Clone del repository
git clone <repository-url>
cd finvest-ai-mentor

# Installazione dipendenze
npm install

# Avvio development server
npm run dev

# Build per produzione
npm run build
```

## 📁 Struttura del Progetto

```
src/
├── components/          # Componenti riutilizzabili
│   └── Layout.tsx      # Layout principale con navigation
├── pages/              # Pagine principali dell'app
│   ├── Dashboard.tsx   # Homepage con overview
│   ├── Portfolio.tsx   # Analizzatore portfolio
│   ├── AIAdvisor.tsx   # Consigli AI personalizzati
│   ├── MarketAnalysis.tsx  # Analisi mercati
│   ├── Education.tsx   # Hub educativo
│   ├── RiskAssessment.tsx  # Valutazione rischi
│   └── TradingSimulator.tsx # Simulatore trading
├── types/              # Definizioni TypeScript
│   └── index.ts       # Tipi per financial data
├── data/               # Mock data per demo
│   └── mockData.ts    # Dataset realistici
├── utils/              # Utility functions
│   ├── index.ts       # Helper functions
│   └── favicon.ts     # Custom favicon
└── styles/
    └── index.css      # Stili globali e Tailwind
```

## 💡 Funzionalità Avanzate

### 🔍 Analytics Intelligenti
- **Diversification Score** algoritmo proprietario
- **Risk Scoring** multi-fattoriale
- **Performance Attribution** analysis
- **Sharpe Ratio** e metriche avanzate

### 🎨 User Experience
- **Loading states** e feedback visivo
- **Hover effects** e micro-interactions
- **Responsive charts** per mobile
- **Accessibility compliant** (WCAG 2.1)

### 📱 Mobile First
- **Touch-friendly** interface
- **Swipe gestures** per navigation
- **Responsive breakpoints** ottimizzati
- **PWA ready** (estendibile)

## 🎛️ Personalizzazione

### Temi e Colori
```css
:root {
  --primary-600: #3b82f6;    # Blu principale
  --success-600: #10b981;    # Verde per gains
  --danger-600: #ef4444;     # Rosso per losses
  --warning-600: #f59e0b;    # Arancio per alerts
}
```

### Configurazioni
- **Risk tolerance** personalizzabile
- **Investment goals** configurabili  
- **Notification preferences** gestibili
- **Language support** (IT/EN)

## 🔐 Security & Privacy

- **No real financial data** - solo simulazione
- **Local storage** per preferenze utente
- **No external API calls** - completamente offline
- **Type-safe** operations ovunque

## 🌟 Highlights Tecnici

### Performance
- **Lazy loading** per componenti pesanti
- **Memoization** per calcoli complessi
- **Virtual scrolling** per liste lunghe
- **Optimized re-renders** con React.memo

### Code Quality  
- **TypeScript strict mode** attivo
- **ESLint configuration** professionale
- **Component composition** pattern
- **Custom hooks** per logica condivisa

### UX/UI Excellence
- **Micro-animations** con Framer Motion
- **Loading skeletons** per perceived performance
- **Error boundaries** per robustezza
- **Toast notifications** per feedback

## 🚀 Deployment

### Development
```bash
npm run dev          # Server locale su porta 5173
npm run build        # Build ottimizzata per produzione  
npm run preview      # Preview della build locale
```

### Production Ready
- **Minified bundle** < 500KB gzipped
- **Tree shaking** automatico
- **Asset optimization** integrata
- **Modern browser support** (ES2020+)

## 🤝 Contributi

Questo progetto dimostra:
- **Architettura scalabile** per applicazioni finanziarie
- **Best practices React/TypeScript** moderne
- **Design system** coerente e professionale  
- **User experience** ottimizzata per il settore finance

---

## 🎯 Prossimi Sviluppi

- [ ] Integrazione API reali (Yahoo Finance, Alpha Vantage)
- [ ] Real-time market data con WebSocket
- [ ] Machine Learning per predictions
- [ ] Social trading features
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode implementation
- [ ] Advanced charting (TradingView)

---

**Creato con ❤️ per dimostrare le potenzialità di una moderna applicazione finanziaria.**