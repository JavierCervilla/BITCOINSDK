import { type WalletConfig, walletConfig } from "../../providers/index.ts";
import { useWallet } from "../../context/walletContext.ts";

import styles from "./connectWallet.styles.css?inline"; // 🔹 Importamos los estilos como string
import { walletImg, logoutImg } from "../../../assets/index.ts";

function shortenAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

class ConnectWalletButton extends HTMLElement {
    private readonly wallets: WalletConfig = walletConfig;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const styleElement = document.createElement("style");
        styleElement.textContent = styles;
        if (this.shadowRoot)
            this.shadowRoot.appendChild(styleElement);
    }

    connectedCallback() {
        this.render();
    }

    private render() {
        if (!Object.keys(this.wallets).length) {    
            return;
        }

        const { walletAddress, connected} = useWallet();

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = "";
        }

        const container = document.createElement("div");
        container.classList.add("wallet-container");

        if (!connected) {
            const button = document.createElement("button");
            button.className = "wallet-button";
            button.innerHTML = `<img src=${walletImg} class="wallet-icon"/> <span>Connect Wallet</span>`;
            container.appendChild(button);

            const dropdown = document.createElement("div");
            dropdown.className = "wallet-dropdown hidden";

            for (const key of Object.keys(this.wallets)) {
                const { label, icon } = this.wallets[key as keyof WalletConfig];
                const item = document.createElement("div");
                item.className = "wallet-dropdown-item";
                item.innerHTML = `<img src="${icon || "/placeholder.svg"}" class="wallet-item-icon"/> <span>${label}</span>`;
                item.onclick = async () => {
                    const walletManager = useWallet();
                    await walletManager.connectWallet(key);
                    this.render();
                };
                dropdown.appendChild(item);
            }

            button.onclick = () => {
                dropdown.classList.toggle("hidden");
            };

            container.appendChild(dropdown);
        } else {
            const addressDiv = document.createElement("div");
            addressDiv.className = "wallet-address";
            addressDiv.innerText = shortenAddress(walletAddress || "");

            const logoutButton = document.createElement("button");
            logoutButton.className = "wallet-logout-button";
            logoutButton.innerHTML = `<img src=${logoutImg} class="logout-icon"/>`;

            logoutButton.onclick = () => {
                const walletManager = useWallet();
                walletManager.disconnectWallet();
                this.render();
            };

            container.appendChild(addressDiv);
            container.appendChild(logoutButton);
        }

        const styleElement = document.createElement("style");
        styleElement.textContent = styles;
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(styleElement);
            this.shadowRoot.appendChild(container);
        }
    }

}

customElements.define("connect-wallet-button", ConnectWalletButton);

export { ConnectWalletButton };
