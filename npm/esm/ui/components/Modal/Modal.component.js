import React from "react";
import { X } from "lucide-react";
import { useModal } from "../../context/modalContext.js";
export function Modal() {
    const { isOpen, closeModal, modalContent } = useModal();
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
        React.createElement("div", { className: "bg-light p-6 rounded-lg shadow-xl max-w-md w-full" },
            React.createElement("div", { className: "flex justify-end items-center mb-4" },
                React.createElement("button", { type: "button", onClick: closeModal, className: "text-secondary hover:text-primary cursor-pointer" },
                    React.createElement(X, { className: "w-6 h-6" }))),
            modalContent)));
}
