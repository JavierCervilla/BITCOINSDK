import React from "react";
import type * as BTCAPI from "../../../../../core/bitcoin/api_2";
import type * as OpenbookAPI from "../../../../../core/openbook/api";
interface AtomicSwapListProps {
    swaps: OpenbookAPI.OpenbookAtomicSwapOrder[];
    isLoading: boolean;
    btcPrice: BTCAPI.BTCPrice;
}
declare function AtomicSwapListComponent({ btcPrice, swaps, isLoading }: Readonly<AtomicSwapListProps>): React.JSX.Element;
export declare const AtomicSwapList: React.MemoExoticComponent<typeof AtomicSwapListComponent>;
export {};
