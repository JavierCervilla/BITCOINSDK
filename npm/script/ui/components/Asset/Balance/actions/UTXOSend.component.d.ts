import React from "react";
import type * as XCPAPI from "../../../../../core/counterparty/api_2";
interface SendActionProps {
    balance: XCPAPI.Balance;
}
export declare function UTXOSendAction({ balance }: Readonly<SendActionProps>): React.ReactNode;
export {};
