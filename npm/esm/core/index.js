import { counterparty } from "./counterparty/api.js";
import { openbook } from "./openbook/api_2.js";
import { bitcoin } from "./bitcoin/api.js";
import { stamps } from "./stamps/api.js";
import { initConfig, getConfig } from "./config.js";
export const bitcoinsdk = {
    counterparty,
    openbook,
    bitcoin,
    stamps,
    initConfig,
    getConfig,
};
export default bitcoinsdk;
