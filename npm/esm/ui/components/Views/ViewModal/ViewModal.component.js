import React from "react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
export function ViewModal({ children, isOpen, onClose, className = "" }) {
    const modalRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        }
        else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current &&
                !modalRef.current.contains(event.target) &&
                event.target.classList.contains('modal-overlay')) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);
    if (!isVisible)
        return null;
    return (React.createElement("div", { className: `modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/99 p-4 sm:p-6 md:p-8 transition-opacity duration-600 ${isAnimating ? "opacity-100" : "opacity-0"}` },
        React.createElement("div", { ref: modalRef, className: `w-full h-full max-w-6xl mx-auto
          bg-light dark:bg-dark rounded-lg shadow-xl overflow-hidden flex flex-col 
          transition-all duration-300 transform ${isAnimating ? "opacity-100" : "opacity-0"} ${className}` },
            React.createElement("div", { className: "flex justify-between items-center p-4 border-b border-secondary" },
                React.createElement("button", { type: "button", onClick: onClose, className: "p-1 rounded-full hover:bg-secondary transition-colors duration-200" },
                    React.createElement(X, { size: 24, className: "text-primary cursor-pointer" }))),
            React.createElement("div", { className: "flex-grow p-4 overflow-y-auto text-secondary" }, children))));
}
