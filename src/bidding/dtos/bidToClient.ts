import { AuctionRules } from "../models/auctionRules";

export interface BidToClient {
    extendAuction: boolean;
    askValue: number;
    auctionRules?: AuctionRules
}