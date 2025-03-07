import React from "react";
interface OpenBookAppProps {
    isOpen: boolean;
    onClose: () => void;
    theme?: string;
}
export declare function OpenBookApp({ isOpen, onClose, theme }: OpenBookAppProps): React.JSX.Element;
export {};
