import React from "react";
import { cn } from "../../utils/style.js";
export function Loader({ className, size = 80 }) {
    return (React.createElement("div", { className: "flex items-center justify-center h-full w-full" },
        React.createElement("div", { className: cn("animate-spin rounded-full border-b-6 border-primary ", className), style: {
                width: `${size}px`,
                height: `${size}px`,
            } })));
}
