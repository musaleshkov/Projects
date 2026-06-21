# 🚀 Crypto Wallet App

A modern, dark-themed crypto wallet dashboard built with **React 19**, **TypeScript**, and **ethers.js v6**. Connect your MetaMask wallet, view token balances across multiple chains, and track live cryptocurrency prices from CoinGecko.

![Preview](./Preview.png?raw=true "Wallet Dashboard")
![Market](./Preview_2.png?raw=true "Market Tab")
![Portfolio](./Preview_3.png?raw=true "Portfolio View")

---

## ✨ Features

### 💰 Wallet
- **MetaMask connection** via ethers.js v6 (no Moralis dependency)
- **Multi-chain support** — Ethereum, Polygon, BSC, BSC Testnet
- **Native balance** with real-time USD portfolio value
- **ERC-20 token balances** — USDT, USDC, DAI, UNI, LINK (per chain)
- **Chain switching** with branded icons
- **Quick actions** — Send, Receive, Swap (opens Uniswap/PancakeSwap)
- **Address copy** with toast notification

### 📈 Market
- **Top 50 coins** from CoinGecko free API
- **7-day sparkline charts** (inline SVG)
- **Sortable columns** — Rank, Price, 24h Change, Market Cap
- **Search** by name or symbol
- **Auto-refresh** every 60 seconds
- **Lazy loaded** — doesn't affect wallet tab performance

### 🎨 UI/UX
- **Dark glassmorphism** theme with animated gradient background
- **Skeleton loaders** — shimmer placeholders during loading
- **Staggered animations** — smooth entrance effects
- **Toast notifications** — success/error/info with slide-in animation
- **Responsive** — desktop + mobile support
- **Error boundaries** — crash isolation per tab

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2 | UI framework |
| TypeScript | 4.9 | Type safety |
| ethers.js | 6.17 | Wallet + blockchain interaction |
| @iconify/react | 6.0 | SVG icons |
| react-scripts | 5.0 | Build tooling (CRA) |
| CoinGecko API | v3 | Market data |

---

## 🚦 Quick Start

```bash
# Prerequisites: Node.js 20 (see .nvmrc)
nvm use

# Install dependencies
npm install

# Start development server
npm start
# → http://localhost:3000

# Production build
npm run build

# Run all checks (lint + format + types + tests)
npm run check-all
```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm test` | Run tests once (CI mode) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Auto-format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run typecheck` | TypeScript type checking |
| `npm run check-all` | Run all quality checks |
| `npm run clean` | Remove build/coverage |

---

## 📁 Project Structure

```
src/
├── App.tsx                  # Root component with tabs + lazy loading
├── index.tsx                # Entry point (WalletProvider + ToastProvider)
├── index.css                # CSS custom properties + animations
├── App.css                  # Layout + animated background
│
├── components/
│   ├── ConnectButton/       # MetaMask connection button
│   ├── ContentBox/          # Wallet card
│   │   ├── ContentBox.tsx
│   │   ├── PortfolioValue.tsx       # USD value display
│   │   ├── ChainsOptionsDropdown/   # Chain selector
│   │   └── TokenBalances/           # ERC-20 + native balances
│   ├── Market/              # Market tab (lazy loaded)
│   │   ├── Market.tsx
│   │   ├── CoinRow.tsx              # Individual coin with sparkline
│   │   └── SearchBar.tsx            # Search input
│   ├── TabBar/              # Wallet | Market tab navigation
│   ├── Toast/               # Notification system
│   └── ErrorBoundary/       # Crash boundary
│
├── contexts/
│   └── WalletContext.tsx     # Wallet state management
│
├── hooks/
│   ├── useMarketData.ts     # CoinGecko top 50 fetch (60s refresh)
│   └── useNativePrice.ts   # Native token USD price (cached)
│
├── constants/
│   ├── supported-chains.ts  # Chain definitions + RPC
│   └── known-tokens.ts     # ERC-20 token list per chain
│
├── types/
│   └── index.ts            # TypeScript interfaces
│
├── utils/
│   ├── chain.ts            # Chain name/symbol/icon helpers
│   └── market.ts           # Price formatting utilities
│
└── abi/
    └── erc20-abi.ts         # Standard ERC-20 ABI
```

---

## 🏗 Architecture

```
App
└── ErrorBoundary (key={activeTab})
    ├── Wallet Tab
    │   ├── ConnectButton (disconnected state)
    │   └── ContentBox (connected state)
    │       ├── ChainsOptionsDropdown  →  WalletContext.switchChain()
    │       ├── PortfolioValue         →  useNativePrice() × nativeBalance
    │       ├── Quick Actions          →  Send / Receive / Swap
    │       └── TokenBalances          →  Contract.balanceOf() (parallel)
    │           └── TokenBalanceRow
    └── Market Tab (React.lazy)
        └── Market
            ├── SearchBar
            └── CoinRow[]  (memo + staggered animation)
```

### State Management
- **`WalletContext`** — Wallet connection, accounts, chain switching, native balance
- **`ToastProvider`** — Global toast notification system
- **Custom hooks** — `useMarketData`, `useNativePrice` for API data

### Data Flow
```
MetaMask → BrowserProvider → WalletContext
                                ↓
                          nativeBalance → PortfolioValue → USD
                                ↓
                          signer → TokenBalances → Contract.balanceOf()
                                                       ↓
                                                Promise.allSettled

CoinGecko API → useMarketData → Market → CoinRow[]
CoinGecko API → useNativePrice → WalletContext (60s cache)
```

---

## 🧪 Developer Tooling

| Tool | Config File |
|------|------------|
| SonarQube | `sonar-project.properties` |
| Qodana | `qodana.yaml` |
| ESLint | `.eslintrc.json` |
| Prettier | `.prettierrc` |
| EditorConfig | `.editorconfig` |
| Cursor AI | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Claude/Cline | `CLAUDE.md` |

---

## 📝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow and code conventions.

---

## 📄 License

Private project — all rights reserved.

---

## 🔗 Links

- [CoinGecko API Docs](https://www.coingecko.com/en/api)
- [ethers.js v6 Docs](https://docs.ethers.org/v6/)
- [MetaMask Docs](https://docs.metamask.io/)