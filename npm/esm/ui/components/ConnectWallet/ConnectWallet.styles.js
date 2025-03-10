export const styles = `
:host {
    --wallet-button-bg: #fefefe;
    --wallet-button-text: #000;
    --wallet-button-border: #ff9900;
    --wallet-button-hover-bg: #ff9900;
    --wallet-font-family: "Arial", sans-serif;
    --wallet-width: 184px;
    --wallet-height: 48px;
}

.wallet-logout-button{
    height: var(--wallet-height);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wallet-height);
}

.wallet-address {
    height: var(--wallet-height);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--wallet-font-family);
    font-weight: 500;
    background-color: var(--wallet-button-bg);
    color: var(--wallet-button-text);
    border: 2px solid var(--wallet-button-border);
    padding: 0 15px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    gap: 8px;
    border-radius: 8px;
}


.wallet-button {
    width: var(--wallet-width);
    height: var(--wallet-height);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--wallet-font-family);
    font-weight: 500;
    background-color: var(--wallet-button-bg);
    color: var(--wallet-button-text);
    border: 2px solid var(--wallet-button-border);
    padding: 0 15px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    gap: 8px;
    border-radius: 8px;
}

.wallet-button:hover {
    background-color: var(--wallet-button-hover-bg);
    transform: scale(1.05);
}

.wallet-container {
    position: relative;
    display: flex;
    gap: 8px;
    z-index: 50;
    align-items: center;
}

.wallet-address {
    padding: 0 16px;
    border-radius: 8px;
    border: 2px solid var(--wallet-button-border);
    background: var(--wallet-button-bg);
    text-align: center;
}

.wallet-logout-button {
    background: var(--wallet-button-hover-bg);
    border: 2px solid var(--wallet-button-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    padding: 0;
}

.wallet-logout-button:hover {
    transform: scale(1.05);
}

.logout-icon {
    width: 24px;
    height: 24px;
}

.wallet-dropdown {
    position: absolute;
    background: #ffffff;
    border: 2px solid var(--wallet-button-border);
    border-radius: 8px;
    width: var(--wallet-width);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    top: 60px;
    font-weight: 500;
}

.wallet-dropdown.hidden {
    display: none;
}

.hidden {
    display: none;
}

.wallet-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-weight: 500;
}

.wallet-dropdown-item:hover {
    background: #ff9900;
    color: #fff;
}

.wallet-item-icon {
    width: 24px;
    height: 24px;
}
`;
