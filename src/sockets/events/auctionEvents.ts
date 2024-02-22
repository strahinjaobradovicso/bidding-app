import { BidToClient } from "../../bidding/dtos/bidToClient";
import { BidToServer } from "../../bidding/dtos/bidToServer";
import { AddSuffix } from "../../util/addSufix";
import { EventResponse } from "./eventResponse";

export type ToServerEvents = AddSuffix<
    {
        enterAuction: (auctionKey: string) => void,
        placeBid: (data: BidToServer) => void
    },
    'ToServer'
>

export type ToClientEvents = AddSuffix<
    {
        enterAuction: (auctionKey: string, auctionBid: BidToClient | void, res: EventResponse) => void,
        placeBid: (auctionKey: string, newAskBid: BidToClient | void, res: EventResponse) => void
    },
    'ToClient'
>