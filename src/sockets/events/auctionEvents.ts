import { AuctionBid } from "../../bidding/interfaces/auctionBid";
import { AddSuffix } from "../../util/addSufix";
import { EventResponse } from "./eventResponse";

export type ToServerEvents = AddSuffix<
    {
        enterAuction: (auctionKey: string) => void,
        placeBid: (auctionKey: string, value: number) => void
    },
    'ToServer'
>

export type ToClientEvents = AddSuffix<
    {
        enterAuction: (auctionBid: AuctionBid | void, res: EventResponse) => void,
        placeBid: (auctionKey: string, newAskBid: AuctionBid | void, res: EventResponse) => void
    },
    'ToClient'
>