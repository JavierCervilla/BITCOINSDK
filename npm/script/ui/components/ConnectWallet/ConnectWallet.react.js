"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const walletContext_js_1 = require("../../context/walletContext.js");
const ConnectWalletButton = () => {
    const containerRef = (0, react_1.useRef)(null);
    const wallet = (0, walletContext_js_1.useWallet)(); // 🚀 Accede a la instancia global
    (0, react_1.useEffect)(() => {
        if (wallet && containerRef.current) {
            console.log("🟢 React: Montando el Web Component connect-wallet-button");
            if (!containerRef.current.querySelector("connect-wallet-button")) {
                const webComponent = document.createElement("connect-wallet-button");
                containerRef.current.innerHTML = "";
                containerRef.current.appendChild(webComponent);
            }
        }
        const updateUI = () => containerRef.current?.firstChild?.remove();
        document.addEventListener("wallet-updated", updateUI);
        return () => {
            document.removeEventListener("wallet-updated", updateUI);
        };
    }, [wallet]);
    return react_1.default.createElement("div", { ref: containerRef });
};
exports.default = ConnectWalletButton;
