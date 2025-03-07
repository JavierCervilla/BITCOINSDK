import React from "react";
interface ConnectWalletButtonProps {
    readonly buttonClassName?: string;
    readonly dropdownClassName?: string;
    readonly dropdownItemClassName?: string;
    readonly wallets: Readonly<{
        [key: string]: {
            label: string;
            icon: string;
        };
    }>;
}
export declare function ConnectWalletButton({ buttonClassName, dropdownClassName, dropdownItemClassName, wallets, }: Readonly<ConnectWalletButtonProps>): React.JSX.Element;
export default ConnectWalletButton;
