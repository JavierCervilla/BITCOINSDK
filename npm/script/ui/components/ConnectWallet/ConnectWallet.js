"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWalletButton = void 0;
const index_js_1 = require("../../providers/index.js");
const walletContext_js_1 = require("../../context/walletContext.js");
const ConnectWallet_styles_js_1 = require("./ConnectWallet.styles.js");
const index_js_2 = require("../../../assets/index.js");
function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
}
class ConnectWalletButton extends globalThis.HTMLElement {
    constructor() {
        super();
        Object.defineProperty(this, "wallets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: index_js_1.walletConfig
        });
        this.attachShadow({ mode: "open" });
        const styleElement = document.createElement("style");
        styleElement.textContent = ConnectWallet_styles_js_1.styles;
        if (this.shadowRoot)
            this.shadowRoot.appendChild(styleElement);
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (!Object.keys(this.wallets).length) {
            return;
        }
        const walletManager = (0, walletContext_js_1.useWallet)();
        const { walletAddress, connected } = walletManager;
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = "";
        }
        const container = document.createElement("div");
        container.classList.add("wallet-container");
        if (!connected) {
            const button = document.createElement("button");
            button.className = "wallet-button";
            button.innerHTML = `<img src=${index_js_2.walletImg} class="wallet-icon"/> <span>Connect Wallet</span>`;
            container.appendChild(button);
            const dropdown = document.createElement("div");
            dropdown.className = "wallet-dropdown hidden";
            for (const key of Object.keys(this.wallets)) {
                const { label, icon } = this.wallets[key];
                const item = document.createElement("div");
                item.className = "wallet-dropdown-item";
                item.innerHTML = `<img src="${icon || "/placeholder.svg"}" class="wallet-item-icon"/> <span>${label}</span>`;
                item.onclick = async () => {
                    await walletManager.connectWallet(key);
                    this.render();
                };
                dropdown.appendChild(item);
            }
            button.onclick = () => {
                dropdown.classList.toggle("hidden");
            };
            container.appendChild(dropdown);
        }
        else {
            const addressDiv = document.createElement("div");
            addressDiv.className = "wallet-address";
            addressDiv.innerText = shortenAddress(walletAddress || "");
            const logoutButton = document.createElement("button");
            logoutButton.className = "wallet-logout-button";
            logoutButton.innerHTML = `<img src=${index_js_2.logoutImg} class="logout-icon"/>`;
            logoutButton.onclick = () => {
                walletManager.disconnectWallet();
                this.render();
            };
            container.appendChild(addressDiv);
            container.appendChild(logoutButton);
        }
        const styleElement = document.createElement("style");
        styleElement.textContent = ConnectWallet_styles_js_1.styles;
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(styleElement);
            this.shadowRoot.appendChild(container);
        }
    }
}
exports.ConnectWalletButton = ConnectWalletButton;
customElements.define("connect-wallet-button", ConnectWalletButton);
