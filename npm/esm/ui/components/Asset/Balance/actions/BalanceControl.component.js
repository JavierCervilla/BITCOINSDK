import React from "react";
import { useState } from "react";
import { useModal } from "../../../../context/modalContext.js";
export function BalanceControl({ icon: Icon, label, action }) {
    const { openModal } = useModal();
    const [showTooltip, setShowTooltip] = useState(false);
    const handleClick = () => {
        openModal(action);
    };
    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);
    return (React.createElement("div", { className: "relative" },
        React.createElement("button", { type: "button", onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: "cursor-pointer flex items-center justify-center p-2 text-primary hover:text-secondary hover:bg-primary/10 rounded-full transition-colors", "aria-label": label },
            React.createElement(Icon, { className: "w-4 h-4" })),
        showTooltip && (React.createElement("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-semibold text-light bg-primary rounded shadow-lg" }, label))));
}
