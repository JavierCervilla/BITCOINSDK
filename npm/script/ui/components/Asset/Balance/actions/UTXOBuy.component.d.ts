import React from "react";
import type * as OpenbookAPI from "../../../../../core/openbook/api";
interface BuyOrderActionProps {
    order: OpenbookAPI.OpenbookAtomicSwapOrder;
}
export declare function UTXOBuyOrderAction({ order }: Readonly<BuyOrderActionProps>): React.JSX.Element;
export {};
