# BitcoinSDK - The Ultimate Bitcoin Integration Tool
BitcoinSDK is a powerful and modular JavaScript/TypeScript SDK designed to seamlessly integrate Bitcoin wallets and The OpenBook Protocol into your react applications.

With built-in support for multiple wallet providers, PSBT signing, and atomic swaps via OpenBook, BitcoinSDK provides developers with an efficient and scalable way to interact with the Bitcoin ecosystem.

✅ Features:

✅ Multi-wallet support: Connect, sign transactions, and manage wallets effortlessly.
✅ Bitcoin RPC utilities: Fetch balances, send raw transactions, and interact with the Bitcoin blockchain.
✅ OpenBook Protocol Integration: Easily list and trade Counterparty assets via atomic swaps.
✅ React-ready UI components: Prebuilt components to accelerate wallet integrations.
✅ TailwindCSS compatible: Fully customizable UI with Tailwind support.
🔗 GitHub Repository: BitcoinSDK on GitHub

🚀 Get started today and build the next generation of Bitcoin-powered applications!

To install use your favorite package manager:

`npm install bitcoinsdk`

If you are using deno use:

`deno add npm:bitcoinsdk`

This package is split in two:

## 🛠 SDK Structure
BitcoinSDK is split into two modules, allowing you to choose based on your needs:

### 1️⃣ bitcoinsdk/core - For Backend & Core Functionality
If you only need blockchain interaction, use the core package:

```ts
import { bitcoinsdk } from "bitcoinsdk/core";

// Get Bitcoin balance
const balance = await bitcoinsdk.bitcoin.getBalance({ address: "your-bitcoin-address" });

// Fetch Counterparty asset details
const asset = await bitcoinsdk.counterparty.getAsset({ asset: "XCP" });

// Interact with OpenBook Protocol
const orderbook = await bitcoinsdk.openbook.getAtomicSales({
    page: 1,
    limit: 100
});

```
🔹 Provides access to Bitcoin, Counterparty, and OpenBook APIs.
🔹 No UI dependencies—perfect for backend use or custom UI projects.


### 2️⃣ bitcoinsdk/ui - Prebuilt UI Components
If you want to quickly integrate wallets and UI components, use:

```tsx
import { WalletProvider, ConnectWalletButton } from "bitcoinsdk/ui";

function App() {
  return (
    <WalletProvider>
      <ConnectWalletButton />
    </WalletProvider>
  );
}

```
🔹 Includes prebuilt UI components for React.
🔹 Integrates seamlessly with multiple wallet providers.
🔹 Uses TailwindCSS for styling (customizable).

## ✨ Features
✅ Multi-wallet support: Connect, sign transactions, and manage wallets effortlessly.
✅ Bitcoin RPC utilities: Fetch balances, send raw transactions, and interact with the Bitcoin blockchain.
✅ OpenBook Protocol Integration: Easily list and trade Counterparty assets via atomic swaps.
✅ React-ready UI components: Prebuilt components for fast integration.
✅ TailwindCSS compatible: Fully customizable UI with Tailwind support.



## 📖 Documentation
📌 More detailed docs will be available soon.
📌 This is an open-source project—contributions are welcome! ❤️

🔗 GitHub Repository: [BitcoinSDK](https://github.com/javiercervilla/BITCOINSDK) on GitHub

🚀 Join us in building the next generation of Bitcoin-powered applications!