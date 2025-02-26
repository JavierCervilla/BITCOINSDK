"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XCPAssetsBalance = void 0;
const react_1 = __importDefault(require("react"));
const AssetCard_component_js_1 = require("../Asset/AssetCard.component.js");
function XCPAssetsBalance({ assets }) {
    if (!assets?.length)
        return null;
    return (react_1.default.createElement("div", { className: "grid gap-3 p-2 sm:grid-cols-2 lg:grid-cols-4 w-full z-0" }, assets.map((asset, index) => (react_1.default.createElement(AssetCard_component_js_1.Asset, { asset: asset, key: `${asset.asset}-${index}` })))));
}
exports.XCPAssetsBalance = XCPAssetsBalance;
