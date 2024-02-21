import { AuctionBidDto } from "../../bidding/dtos/auctionBidDto";
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
        enterAuction: (auctionKey: string, auctionBid: AuctionBidDto | void, res: EventResponse) => void,
        placeBid: (auctionKey: string, newAskBid: AuctionBidDto | void, res: EventResponse) => void
    },
    'ToClient'
>