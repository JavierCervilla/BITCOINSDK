"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64toHex = exports.ascii2hex = exports.hex2ascii = exports.bin2hex = exports.hex2bin = void 0;
function hex2bin(hexString) {
    const normalizedHex = hexString.replace(/\s/g, "");
    const bytes = new Uint8Array(normalizedHex.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) ??
        []);
    return bytes;
}
exports.hex2bin = hex2bin;
function bin2hex(data) {
    return Array.from(data)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
exports.bin2hex = bin2hex;
function hex2ascii(hex) {
    return hex.match(/.{1,2}/g)?.map((byte) => String.fromCharCode(Number.parseInt(byte, 16))).join('') ?? "";
}
exports.hex2ascii = hex2ascii;
function ascii2hex(ascii) {
    return ascii.split('').map((char) => char.charCodeAt(0).toString(16)).join('');
}
exports.ascii2hex = ascii2hex;
function base64toHex(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    let hex = '';
    for (const byte of bytes) {
        const byteHex = byte.toString(16).padStart(2, '0');
        hex += byteHex;
    }
    return hex;
}
exports.base64toHex = base64toHex;
