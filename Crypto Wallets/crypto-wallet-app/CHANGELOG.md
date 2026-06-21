# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] — 2026-06-21

### Added
- MetaMask wallet connection via ethers.js v6
- Multi-chain support (Ethereum, Polygon, BSC, BSC Testnet)
- Native balance display with USD portfolio value
- ERC-20 token balance fetching (USDT, USDC, DAI, UNI, LINK)
- CoinGecko market data tab (top 50 coins)
- 7-day sparkline charts for market coins
- Search and sort functionality for market data
- Tab navigation (Wallet | Market)
- Toast notification system
- Quick action buttons (Send, Receive, Swap)
- Dark glassmorphism UI theme
- Skeleton loading states
- Staggered entrance animations
- Lazy-loaded Market tab
- Responsive design
- SonarQube, Qodana, ESLint, Prettier configurations
- AI context files (.cursorrules, copilot-instructions.md, CLAUDE.md)

### Removed
- react-moralis v1 and moralis v2 dependencies
- Moralis Parse API server dependency

### Changed
- Migrated from react-moralis to ethers.js v6
- Updated tsconfig to es2020 target
- Enhanced .gitignore with IDE/OS/TypeScript entries