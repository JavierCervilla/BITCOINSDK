"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenBookApp = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const walletContext_js_1 = require("../../context/walletContext.js");
const index_js_1 = require("../../index.js");
const Layout_component_js_1 = require("../Layout/Layout.component.js");
const Market_component_js_1 = require("../Views/Market/Market.component.js");
const Wallet_component_js_1 = require("../Views/Wallet/Wallet.component.js");
const Settings_component_js_1 = require("../Views/Settings/Settings.component.js");
const AssetView_component_js_1 = require("../Views/Asset/AssetView.component.js");
const ToastProvider_component_js_1 = require("../Toast/ToastProvider.component.js");
function OpenBookApp({ isOpen, onClose, theme = 'bitcoin-dark' }) {
    return (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
        react_1.default.createElement(ToastProvider_component_js_1.ToastProvider, null,
            react_1.default.createElement(walletContext_js_1.WalletProvider, { theme: theme, wallets: index_js_1.walletConfig },
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { element: react_1.default.createElement(Layout_component_js_1.Layout, { isOpen: isOpen, onClose: onClose }) },
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Market_component_js_1.MarketView, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/market", element: react_1.default.createElement(Market_component_js_1.MarketView, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/wallet", element: react_1.default.createElement(Wallet_component_js_1.WalletView, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/settings", element: react_1.default.createElement(Settings_component_js_1.SettingsView, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/asset/:assetid", element: react_1.default.createElement(AssetView_component_js_1.AssetView, null) })))))));
}
exports.OpenBookApp = OpenBookApp;
