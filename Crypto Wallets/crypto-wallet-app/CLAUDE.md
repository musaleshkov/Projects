# CLAUDE.md — Project Context for Claude Code / Cline

## Project Identity
- **Name:** Crypto Wallet App
- **Type:** React 19 SPA (CRA)
- **Language:** TypeScript 4.9
- **Node:** >=18 (pinned to 20 in `.nvmrc`)
- **Repo:** `https://github.com/musaleshkov/Projects` (subdirectory `crypto-wallet-app`)

## Quick Start
```bash
npm install
npm start        # dev on :3000
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier
npm test         # Jest (CRA)
```

## Architecture Decisions
1. **No Moralis.** Removed `react-moralis` v1 and `moralis` v2. Use ethers.js v6 directly.
2. **Context + Hooks.** `WalletContext` handles all wallet state. Custom hooks encapsulate data fetching.
3. **No path aliases.** CRA/webpack doesn't resolve `@/` without craco. Use relative imports.
4. **Dark theme.** CSS custom properties in `src/index.css`. Glassmorphism via `backdrop-filter`.
5. **Lazy Market tab.** `React.lazy(() => import("./components/Market/Market"))` with Suspense fallback.

## Key Files
| Path | Purpose |
|------|---------|
| `src/contexts/WalletContext.tsx` | Wallet connection, chain switching, native balance |
| `src/hooks/useMarketData.ts` | CoinGecko top 50 coins (60s refresh) |
| `src/hooks/useNativePrice.ts` | CoinGecko native token USD price (cached) |
| `src/constants/supported-chains.ts` | Chain definitions (Ethereum, Polygon, BSC, BSC Testnet) |
| `src/constants/known-tokens.ts` | Known ERC-20 tokens per chain for balance checks |
| `src/components/ContentBox/ContentBox.tsx` | Main wallet card UI |
| `src/components/Market/Market.tsx` | Market tab (lazy loaded) |
| `src/components/Toast/` | Toast notification system (provider + hook) |
| `src/abi/erc20-abi.ts` | Standard ERC-20 ABI |

## API Endpoints
- **CoinGecko markets:** `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
- **CoinGecko simple price:** `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
- **Rate limit:** ~10-30 req/min (free tier). Native price is cached for 60s.

## Wallet Flow
```
Disconnected → Click "Connect Wallet" → MetaMask popup → Connected
Connected → View balances (native + ERC-20) → Switch chains → Refetch
Connected → Market tab → CoinGecko fetch → Sort/Search → 60s auto-refresh
```

## Component Tree
```
App
└── ErrorBoundary (key={activeTab})
    ├── Wallet Tab
    │   ├── ConnectButton (if disconnected)
    │   └── ContentBox (if connected)
    │       ├── ChainsOptionsDropdown
    │       ├── PortfolioValue
    │       ├── Quick Actions (Send/Receive/Swap)
    │       └── TokenBalances
    │           └── TokenBalanceRow (per token)
    └── Market Tab (lazy)
        └── Market
            ├── SearchBar
            └── CoinRow (per coin)
```

## What Not To Do
- ❌ Don't add `react-moralis`, `moralis`, `wagmi`, `web3modal`, `@web3-react`
- ❌ Don't add path aliases in `tsconfig.json`
- ❌ Don't add inline styles
- ❌ Don't remove `AbortController` from fetch hooks
- ❌ Don't use `any` without eslint disable
- ❌ Don't sequentialize independent async operations — use `Promise.allSettled`