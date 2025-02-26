import React from "react";
import type * as OpenbookAPI from "../../../../../core/openbook/api";
interface AtomicSwapItemProps {
    atomicSwap: OpenbookAPI.OpenbookAtomicSwapOrder;
    btcPrice: number;
}
declare function AtomicSwapItemComponent({ atomicSwap, btcPrice }: Readonly<AtomicSwapItemProps>): React.JSX.Element;
export declare const AtomicSwapItem: React.MemoExoticComponent<typeof AtomicSwapItemComponent>;
export {};
