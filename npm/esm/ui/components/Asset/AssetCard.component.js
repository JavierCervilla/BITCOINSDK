import React from "react";
import { useNavigate } from "react-router-dom";
import { Media } from "./Media.component.js";
export function Asset({ asset }) {
    const navigate = useNavigate();
    function handleURLClick() {
        navigate(`/asset/${asset.asset}`);
    }
    return (React.createElement("button", { type: "button", onClick: handleURLClick, className: "block aspect-[4/5] group hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-lg" },
        React.createElement("div", { className: "h-full bg-gradient-to-br from-primary via-secondary to-primary shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02]  rounded-lg" },
            React.createElement("div", { className: "h-full flex flex-col p-3" },
                React.createElement("div", { className: "flex-1 flex items-center justify-center bg-light  rounded-lg overflow-hidden backdrop-blur-sm" },
                    React.createElement(Media, { asset: asset, className: "w-full h-full bg-transparent border-none rounded-lg transition-transform duration-300 group-hover:scale-110" })),
                React.createElement("div", { className: "mt-2 bg-light text-dark opacity-60 backdrop-blur-sm rounded-md p-2" },
                    React.createElement("h3", { className: "text-center opacity-100 text-sm font-bold truncate" }, asset.name.toUpperCase()),
                    React.createElement("p", { className: "text-center mt-1" }, Number(asset.qty_normalized).toLocaleString()))))));
}
