import React from "react";
import type * as XCPAPI from "../../../../../core/counterparty/api_2";
interface SendActionProps {
    balance: XCPAPI.Balance;
}
export declare function AccountSendAction({ balance }: Readonly<SendActionProps>): React.JSX.Element;
export {};
