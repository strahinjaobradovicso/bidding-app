import { BidToClient } from "../../bidding/dtos/bidToClient";
import { BidToServer } from "../../bidding/dtos/bidToServer";
import { AddSuffix } from "../../util/addSufix";
import { EventResponse } from "../response/eventResponse";

export type ToServerEvents = AddSuffix<
    {
        enterAuction: (auctionKey: string) => void,
        placeBid: (data: BidToServer) => void
    },
    'ToServer'
>

export type ToClientEvents = AddSuffix<
    {
        enterAuction: (res: EventResponse, auctionBid?: BidToClient) => void,
        placeBid: (res: EventResponse, newAskBid?: BidToClient) => void
    },
    'ToClient'
>