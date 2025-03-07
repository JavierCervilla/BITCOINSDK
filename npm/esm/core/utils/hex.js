export function hex2bin(hexString) {
    const normalizedHex = hexString.replace(/\s/g, "");
    const bytes = new Uint8Array(normalizedHex.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) ??
        []);
    return bytes;
}
export function bin2hex(data) {
    return Array.from(data)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
export function hex2ascii(hex) {
    return hex.match(/.{1,2}/g)?.map((byte) => String.fromCharCode(Number.parseInt(byte, 16))).join('') ?? "";
}
export function ascii2hex(ascii) {
    return ascii.split('').map((char) => char.charCodeAt(0).toString(16)).join('');
}
export function base64toHex(base64) {
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
