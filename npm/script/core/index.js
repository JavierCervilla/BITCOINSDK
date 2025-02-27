"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stamps = exports.bitcoin = exports.openbook = exports.counterparty = exports.bitcoinsdk = void 0;
const api_js_1 = require("./counterparty/api.js");
Object.defineProperty(exports, "counterparty", { enumerable: true, get: function () { return api_js_1.counterparty; } });
const api_2_js_1 = require("./openbook/api_2.js");
Object.defineProperty(exports, "openbook", { enumerable: true, get: function () { return api_2_js_1.openbook; } });
const api_js_2 = require("./bitcoin/api.js");
Object.defineProperty(exports, "bitcoin", { enumerable: true, get: function () { return api_js_2.bitcoin; } });
const api_js_3 = require("./stamps/api.js");
Object.defineProperty(exports, "stamps", { enumerable: true, get: function () { return api_js_3.stamps; } });
const config_js_1 = require("./config.js");
/**
 * The Bitcoin SDK object that provides access to various functionalities:
 *
 * - **counterparty**: Interactions with Counterparty API.
 * - **openbook**: OpenBook protocol for Atomic swaps trading and market analytics.
 * - **bitcoin**: Bitcoin RPC calls and utilities.
 * - **stamps**: Interactions with Bitcoin Stamps API.
 *
 * @see {@link bitcoin} for Bitcoin RPC methods.
 * @see {@link counterparty} for Counterparty asset management.
 * @see {@link openbook} for OpenBook protocol.
 * @see {@link stamps} for Bitcoin stamps management.
 */
exports.bitcoinsdk = {
    counterparty: api_js_1.counterparty,
    openbook: api_2_js_1.openbook,
    bitcoin: api_js_2.bitcoin,
    stamps: api_js_3.stamps,
    initConfig: config_js_1.initConfig,
    getConfig: config_js_1.getConfig,
};
exports.default = exports.bitcoinsdk;
