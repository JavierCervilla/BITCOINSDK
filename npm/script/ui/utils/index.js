"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.short_address = void 0;
function short_address(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
exports.short_address = short_address;
