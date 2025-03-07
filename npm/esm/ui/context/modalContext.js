import React from "react";
import { createContext, useContext, useState } from "react";
const ModalContext = createContext(undefined);
export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const openModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
    };
    return (React.createElement(ModalContext.Provider, { value: { isOpen, openModal, closeModal, modalContent } }, children));
}
export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
