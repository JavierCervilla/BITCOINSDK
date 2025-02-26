import React from "react";
import type * as OpenbookAPI from "../../../../../core/openbook/api";
interface CancelOrderActionProps {
    order: OpenbookAPI.OpenbookAtomicSwapOrder;
}
export declare function CancelOrderAction({ order }: Readonly<CancelOrderActionProps>): React.JSX.Element;
export {};
