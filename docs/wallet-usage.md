# WalletContext Usage Guide

The `WalletContext` provides a unified interface for interacting with different Bitcoin wallets. This guide demonstrates practical examples of how to use the various system functionalities.

## Table of Contents
- [Basic Usage](#basic-usage)
- [Event Handling](#event-handling)
- [Multiple Wallets](#multiple-wallets)
- [Usage with Reactive Frameworks](#usage-with-reactive-frameworks)
- [Additional Features](#additional-features)
- [Types](#types)
- [Supported Providers](#supported-providers)

## Basic Usage

The following example shows basic wallet operations:

```typescript
import { walletStore, WalletManager } from '../src/ui/context/walletContext';

async function basicWalletUsage() {
  const walletManager = new WalletManager();

  try {
    // Connect to Unisat Wallet
    await walletManager.connectWallet('Unisat');
    console.log('Wallet state:', walletStore.get());

    // Sign a message
    const signature = await walletManager.signMessage('Hello Bitcoin');
    console.log('Signature:', signature);

    // Sign a PSBT
    const psbtHex = '70736274ff01...'; // Your PSBT in hexadecimal format
    const signedPsbt = await walletManager.signPSBT(psbtHex, {
      autoFinalized: true,
      inputsToSign: [
        {
          index: 0,
          address: walletStore.get().walletAddress ?? '',
          sighashTypes: [1], // SIGHASH_ALL
        }
      ]
    });
    console.log('Signed PSBT:', signedPsbt);

    // Disconnect wallet
    walletManager.disconnectWallet();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error occurred');
    }
  }
}
```

## Event Handling

The system includes events to keep the wallet state synchronized:

```typescript
import { walletStore } from '../src/ui/context/walletContext';

function walletEventsExample() {
  // Listen for wallet state changes
  document.addEventListener('wallet-updated', () => {
    const walletState = walletStore.get();
    console.log('Wallet updated:', {
      address: walletState.walletAddress,
      connected: walletState.connected,
      provider: walletState.walletProvider
    });
  });
}
```

## Multiple Wallets

Example of working with multiple wallet providers:

```typescript
import { walletStore, WalletManager } from '../src/ui/context/walletContext';
import { walletConfig, type WalletConfig } from '../src/ui/providers';

async function multiWalletExample() {
  const walletManager = new WalletManager();

  // List available wallets
  const availableWallets = Object.entries(walletConfig)
    .filter(([_, provider]) => provider.isAvailable?.())
    .map(([key, provider]) => ({
      key,
      label: provider.label
    }));

  console.log('Available wallets:', availableWallets);

  // Connect to each available wallet
  for (const wallet of availableWallets) {
    try {
      await walletManager.connectWallet(wallet.key as keyof WalletConfig);
      console.log(`Connected to ${wallet.label}:`, walletStore.get());
      
      // Perform operations...
      
      walletManager.disconnectWallet();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error with ${wallet.label}:`, error.message);
      } else {
        console.error(`Unknown error occurred with ${wallet.label}`);
      }
    }
  }
}
```

## Usage with Reactive Frameworks

The `useWallet` hook facilitates integration with reactive frameworks:

```typescript
import { useWallet } from '../src/ui/context/walletContext';

export function WalletComponent() {
  const wallet = useWallet();

  if (!wallet.connected) {
    return {
      status: 'disconnected'
    };
  }

  return {
    status: 'connected',
    address: wallet.walletAddress,
    provider: wallet.walletProvider
  };
}
```

## Additional Features

The system includes several automatic features:

- **Persistence**: Wallet state is automatically saved in localStorage when available
- **SSR**: Full Server-Side Rendering compatibility through environment detection
- **Environment Detection**: Automatic detection of available features (localStorage, CustomEvents)
- **Error Handling**: Robust error handling system with descriptive messages
- **Events**: Event system to keep UI synchronized with wallet state changes

## Types

The main interfaces you need to know:

```typescript
interface WalletState {
  walletAddress: string | null;
  publicKey: string | null;
  connected: boolean;
  walletProvider: string | null;
}

interface SignPSBTOptions {
  broadcast?: boolean;
  autoFinalized?: boolean;
  inputsToSign?: Array<{
    index: number;
    address: string;
    sighashTypes: number[];
  }>;
}
```

## Supported Providers

Currently, the system supports the following providers:

- **Leather**: Standard Bitcoin wallet
- **Unisat**: Popular Bitcoin and Ordinals wallet
- **OKX**: Multi-chain wallet with Bitcoin support
- **Universe** (Tap): Advanced Bitcoin wallet with unique features

Each provider follows a consistent pattern with standard methods:
- `connect`: Establish connection and get address
- `signMessage`: Sign arbitrary messages
- `signPSBT`: Sign Partially Signed Bitcoin Transactions
- `pushTX`: Broadcast signed transactions to the network
