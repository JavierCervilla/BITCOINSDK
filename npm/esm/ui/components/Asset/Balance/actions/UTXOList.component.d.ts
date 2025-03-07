import React from "react";
import type * as XCPAPI from "../../../../../core/counterparty/api_2";
interface ListUTXOActionProps {
    balance: XCPAPI.Balance;
    btcPrice: number;
}
export declare function ListUTXOAction({ balance, btcPrice }: Readonly<ListUTXOActionProps>): React.JSX.Element;
export {};
