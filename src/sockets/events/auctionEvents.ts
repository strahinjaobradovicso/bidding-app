import { BidToClient } from "../../bidding/dtos/bidToClient";
import { BidToServer } from "../../bidding/dtos/bidToServer";

export type ToServerEvents = {
    enterAuction: (auctionKey: string) => void,
    placeBid: (data: BidToServer) => void
}

export type ToClientEvents = {
    bidAccept: (bid: BidToClient) => void;
    bidReject: (message: string) => void;
    auctionReject: (message: string) => void;
}