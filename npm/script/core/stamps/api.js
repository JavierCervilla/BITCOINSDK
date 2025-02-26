"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stamps = void 0;
const config_js_1 = require("../config.js");
exports.stamps = {
    getStamps: async () => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().STAMPS.ENDPOINT}/api/v2/stamps`);
        const data = await fetch(endpoint);
        const json = await data.json();
        return json;
    }
};
