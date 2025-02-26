import React from "react";
import { Outlet } from "react-router-dom";
import { ViewModal } from "../Views/ViewModal/ViewModal.component.js";
import { Header } from "../Header/Header.component.js";
export function Layout({ isOpen, onClose }) {
    return (React.createElement(ViewModal, { isOpen: isOpen, onClose: onClose },
        React.createElement("div", { className: "flex flex-col h-full" },
            React.createElement(Header, null),
            React.createElement("main", { className: "flex-1 overflow-auto" },
                React.createElement(Outlet, null)))));
}
