export declare const stamps: {
    getStamps: () => Promise<unknown>;
    getSRC20Balance: ({ address, limit, page, amt }: {
        address: string;
        limit: number;
        page: number;
        amt: number;
    }) => Promise<unknown>;
    getStampsBalance: ({ address, limit, page }: {
        address: string;
        limit: number;
        page: number;
    }) => Promise<unknown>;
};
