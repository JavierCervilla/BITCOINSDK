import { counterparty } from "./counterparty/api.ts";
import { openbook } from "./openbook/api.ts";
import { bitcoin } from "./bitcoin/api.ts";
import { stamps } from "./stamps/api.ts";


export const bitcoinsdk = {
    counterparty,
    openbook,
    bitcoin,
    stamps,
};

export type BitcoinSDK = typeof bitcoinsdk;
export default bitcoinsdk as BitcoinSDK;