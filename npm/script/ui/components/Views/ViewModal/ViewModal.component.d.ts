import React from "react";
interface ViewModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}
export declare function ViewModal({ children, isOpen, onClose, className }: ViewModalProps): React.ReactElement | null;
export {};
