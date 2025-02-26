import React from "react";
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, Home, BarChart2, Wallet2, Settings } from "lucide-react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
const menuItems = [
    { name: "Home", id: "/", icon: Home },
    { name: "Market", id: "/market", icon: BarChart2 },
    { name: "Wallet", id: "/wallet", icon: Wallet2 },
    { name: "Settings", id: "/settings", icon: Settings },
];
export function HamburgerMenu() {
    const navigate = useNavigate();
    return (React.createElement(DropdownMenu.Root, null,
        React.createElement(DropdownMenu.Trigger, { asChild: true },
            React.createElement("button", { type: "button", className: "p-2 flex items-center justify-between text-dark  gap-2 cursor-pointer rounded-lg hover:border-primary hover:text-primary transition-colors border border-primary/20" },
                React.createElement(MenuIcon, { className: "w-7 h-7" }))),
        React.createElement(DropdownMenu.Portal, null,
            React.createElement(DropdownMenu.Content, { className: "z-50 min-w-[10rem] overflow-hidden rounded-md border border-secondary bg-light p-1 shadow-md", sideOffset: 5 }, menuItems.map((item) => (React.createElement(DropdownMenu.Item, { key: item.id, className: " relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-dark hover:text-primary data-[highlighted]:bg-secondary data-[highlighted]:text-primary transition-colors", onClick: () => navigate(item.id) },
                React.createElement(item.icon, { className: "mr-2 h-4 w-4" }),
                React.createElement("span", null, item.name))))))));
}
