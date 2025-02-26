import React from "react";
interface LayoutProps {
    isOpen: boolean;
    onClose: () => void;
}
export declare function Layout({ isOpen, onClose }: Readonly<LayoutProps>): React.JSX.Element;
export {};
