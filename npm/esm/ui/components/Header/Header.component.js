import React from "react";
import { useState, useEffect, useCallback } from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { bitcoinsdk } from "../../../core/index.js";
import { ConnectWalletButton } from "../ConnectWallet/ConnectWallet.component.js";
import { walletConfig } from "../../index.js";
import { useWallet } from "../../context/walletContext.js";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu.component.js";
import { cn } from "../../utils/style.js";
const CryptoInfo = ({ data }) => {
    const isPositive = data.price_change_percentage_24h >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    return (React.createElement("div", { className: "flex items-center gap-2 text-nowrap flex-nowrap px-4" },
        React.createElement("img", { src: data.icon || "/placeholder.svg", alt: data.id, className: "w-6 h-6" }),
        React.createElement("div", { className: "flex items-center align-baseline space-x-2" },
            React.createElement("span", { className: "hidden lg:block text-xs font-black text-muted-foreground uppercase" }, data.symbol),
            React.createElement("span", { className: "text-xs font-bold" }, data.current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            })),
            React.createElement("div", { className: cn("flex text-xs items-center", isPositive ? "text-green-500" : "text-red-500") },
                React.createElement(TrendIcon, { className: "w-4 h-4" }),
                React.createElement("span", { className: "text-sm font-medium" },
                    Math.abs(data.price_change_percentage_24h).toFixed(2),
                    "%")))));
};
const BalanceInfo = ({ balance, symbol }) => {
    const iconColor = symbol.toLowerCase() === 'btc' ? 'text-[#F7931A]' : 'text-[#FF3B9A]';
    return (React.createElement("div", { className: "flex items-center space-x-2" },
        React.createElement(Wallet, { className: `w-4 h-4 ${iconColor}` }),
        React.createElement("span", { className: "text-xs font-medium" }, balance?.toFixed(symbol.toUpperCase() === "BTC" ? 4 : 2))));
};
export function Header() {
    const { walletAddress, connected } = useWallet();
    const [cryptoData, setCryptoData] = useState([]);
    const [balances, setBalances] = useState(null);
    const fetchBalances = useCallback(async (address) => {
        const [xcpData, btcData] = await Promise.all([
            bitcoinsdk.counterparty.getTokenBalance({ asset: 'XCP', address }),
            bitcoinsdk.openbook.getBTCBalance({ address })
        ]);
        setBalances({
            BTC: btcData,
            XCP: Number(xcpData[0]?.qty_normalized) || 0
        });
    }, []);
    useEffect(() => {
        bitcoinsdk.openbook.getMarketData().then((data) => {
            setCryptoData(data);
        });
    }, []);
    useEffect(() => {
        if (!walletAddress)
            return;
        fetchBalances(walletAddress);
    }, [walletAddress, fetchBalances]);
    return (React.createElement("div", { className: "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" },
        React.createElement("div", { className: "flex max-w-full min-w-fit flex-col lg:flex-row items-center justify-between px-4 py-3 lg:px-6 gap-4 mx-auto" },
            React.createElement("div", { className: "flex flex-col w-full sm:flex-row gap-4 p-3 rounded-lg border border-border/50" }, cryptoData.map((crypto, index) => (React.createElement("div", { key: crypto.id, className: `flex w-full justify-around items-center sm:items-center gap-3 
                  ${index < cryptoData.length - 1 ? 'sm:border-r sm:border-border/50 sm:pr-4' : ''}` },
                React.createElement(CryptoInfo, { data: crypto }),
                connected && balances && (React.createElement(BalanceInfo, { balance: balances[crypto.symbol.toUpperCase()], symbol: crypto.symbol })))))),
            React.createElement("div", { className: "flex items-center justify-between lg:justify-end w-full gap-3" },
                React.createElement(HamburgerMenu, null),
                React.createElement(ConnectWalletButton, { wallets: walletConfig, className: "cursor-pointer hover:bg-primary hover:text-light important py-2.5 min-w-fit px-4 bg-light border border-primary text-nowrap text-primary hover:bg-primary hover:scale-105 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300" })))));
}
