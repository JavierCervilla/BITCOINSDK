import { counterparty } from "@/lib/counterparty/api.ts";
import { openbook } from "@/lib/openbook/api.ts";
import { bitcoin } from "@/lib/bitcoin/api.ts";
import { stamps } from "@/lib/stamps/api.ts";


export const bitcoinsdk = {
    counterparty,
    openbook,
    bitcoin,
    stamps
};

export type BitcoinSDK = typeof bitcoinsdk;
export default bitcoinsdk as BitcoinSDK;