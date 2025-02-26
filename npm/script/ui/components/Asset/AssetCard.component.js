"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Media_component_js_1 = require("./Media.component.js");
function Asset({ asset }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    function handleURLClick() {
        navigate(`/asset/${asset.asset}`);
    }
    return (react_1.default.createElement("button", { type: "button", onClick: handleURLClick, className: "block aspect-[4/5] group hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-lg" },
        react_1.default.createElement("div", { className: "h-full bg-gradient-to-br from-primary via-secondary to-primary shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02]  rounded-lg" },
            react_1.default.createElement("div", { className: "h-full flex flex-col p-3" },
                react_1.default.createElement("div", { className: "flex-1 flex items-center justify-center bg-light  rounded-lg overflow-hidden backdrop-blur-sm" },
                    react_1.default.createElement(Media_component_js_1.Media, { asset: asset, className: "w-full h-full bg-transparent border-none rounded-lg transition-transform duration-300 group-hover:scale-110" })),
                react_1.default.createElement("div", { className: "mt-2 bg-light text-dark opacity-60 backdrop-blur-sm rounded-md p-2" },
                    react_1.default.createElement("h3", { className: "text-center opacity-100 text-sm font-bold truncate" }, asset.name.toUpperCase()),
                    react_1.default.createElement("p", { className: "text-center mt-1" }, Number(asset.qty_normalized).toLocaleString()))))));
}
exports.Asset = Asset;
