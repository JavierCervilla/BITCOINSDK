import React from "react";
import { type ReactNode } from "react";
interface ModalContextType {
    isOpen: boolean;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
    modalContent: ReactNode | null;
}
export declare function ModalProvider({ children }: {
    children: ReactNode;
}): React.JSX.Element;
export declare const useModal: () => ModalContextType;
export {};
