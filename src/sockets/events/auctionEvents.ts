import { AddSuffix } from "../../util/addSufix";

export type ToServerEvents = AddSuffix<
    {
        enterAuction: (auctionId: number) => void,
    },
    'ToServer'
>

export type ToClientEvents = AddSuffix<
    {
        enterAuction: (auctionRules: any) => void;
    },
    'ToClient'
>