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
const ConnectWalletButton = () => {
    const containerRef = (0, react_1.useRef)(null);
    const [walletReady, setWalletReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        console.log("🔍 React: Esperando que useWallet() esté listo...");
        const interval = setInterval(() => {
            if (globalThis.walletManagerInstance) {
                console.log("✅ React: walletManagerInstance encontrado, montando Web Component.");
                setWalletReady(true);
                clearInterval(interval);
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);
    (0, react_1.useEffect)(() => {
        if (walletReady && containerRef.current) {
            console.log("🟢 React: Montando el Web Component connect-wallet-button");
            const webComponent = document.createElement("connect-wallet-button");
            containerRef.current.innerHTML = ""; // Limpiar contenedor antes de agregar el nuevo
            containerRef.current.appendChild(webComponent);
        }
    }, [walletReady]);
    return react_1.default.createElement("div", { ref: containerRef });
};
exports.default = ConnectWalletButton;
