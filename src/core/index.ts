import { counterparty } from "@/core/counterparty/api.ts";
import { openbook } from "@/core/openbook/api.ts";
import { bitcoin } from "@/core/bitcoin/api.ts";
import { stamps } from "@/core/stamps/api.ts";


export const bitcoinsdk = {
    counterparty,
    openbook,
    bitcoin,
    stamps,
};

export type BitcoinSDK = typeof bitcoinsdk;
export default bitcoinsdk as BitcoinSDK;