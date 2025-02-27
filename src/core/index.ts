import { counterparty } from "./counterparty/api.ts";
import { openbook } from "./openbook/api.ts";
import { bitcoin } from "./bitcoin/api.ts";
import { stamps } from "./stamps/api.ts";

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
export const bitcoinsdk = {
    counterparty,
    openbook,
    bitcoin,
    stamps,
};

export { counterparty, openbook, bitcoin, stamps };

/**
 * Type definition for the Bitcoin SDK.
 */

export type BitcoinSDK = typeof bitcoinsdk;



export default bitcoinsdk