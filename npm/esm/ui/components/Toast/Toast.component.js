import React from "react";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
const icons = {
    success: React.createElement(CheckCircle, { className: "w-6 h-6 text-green-500" }),
    error: React.createElement(XCircle, { className: "w-6 h-6 text-red-500" }),
    warning: React.createElement(AlertCircle, { className: "w-6 h-6 text-yellow-500" }),
    info: React.createElement(Info, { className: "w-6 h-6 text-blue-500" }),
};
const CustomToast = ({ t, message, type }) => {
    return (React.createElement("div", { className: `${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-light shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-primary` },
        React.createElement("div", { className: "flex-1 w-0 p-4" },
            React.createElement("div", { className: "flex items-start" },
                React.createElement("div", { className: "flex-shrink-0 pt-0.5" }, icons[type]),
                React.createElement("div", { className: "ml-3 flex-1" }, message))),
        React.createElement("div", { className: "flex border-l border-primary" },
            React.createElement("button", { type: "button", onClick: () => toast.dismiss(t.id), className: "cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" },
                React.createElement(X, { className: "w-4 h-4" })))));
};
export const showToast = ({ content, type, options }) => {
    return toast.custom((t) => React.createElement(CustomToast, { t: t, message: content, type: type }), {
        duration: 100000,
        position: "top-right",
        ...options,
    });
};
