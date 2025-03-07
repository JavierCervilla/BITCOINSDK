import React from "react";
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { WalletProvider } from '../../context/walletContext.js';
import { walletConfig } from '../../index.js';
import { Layout } from '../Layout/Layout.component.js';
import { MarketView } from '../Views/Market/Market.component.js';
import { WalletView } from '../Views/Wallet/Wallet.component.js';
import { SettingsView } from '../Views/Settings/Settings.component.js';
import { AssetView } from "../Views/Asset/AssetView.component.js";
import { ToastProvider } from '../Toast/ToastProvider.component.js';
export function OpenBookApp({ isOpen, onClose, theme = 'bitcoin-dark' }) {
    return (React.createElement(MemoryRouter, null,
        React.createElement(ToastProvider, null,
            React.createElement(WalletProvider, { theme: theme, wallets: walletConfig },
                React.createElement(Routes, null,
                    React.createElement(Route, { element: React.createElement(Layout, { isOpen: isOpen, onClose: onClose }) },
                        React.createElement(Route, { path: "/", element: React.createElement(MarketView, null) }),
                        React.createElement(Route, { path: "/market", element: React.createElement(MarketView, null) }),
                        React.createElement(Route, { path: "/wallet", element: React.createElement(WalletView, null) }),
                        React.createElement(Route, { path: "/settings", element: React.createElement(SettingsView, null) }),
                        React.createElement(Route, { path: "/asset/:assetid", element: React.createElement(AssetView, null) })))))));
}
