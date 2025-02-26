import React from "react";
interface ConnectWalletButtonProps {
    readonly className?: string;
    readonly wallets: Readonly<{
        [key: string]: {
            label: string;
            icon: string;
        };
    }>;
}
export declare function ConnectWalletButton({ className, wallets, }: Readonly<ConnectWalletButtonProps>): React.JSX.Element;
export default ConnectWalletButton;
