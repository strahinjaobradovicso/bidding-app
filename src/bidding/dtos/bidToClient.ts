import { AuctionRules } from "../models/auctionRules";

export interface BidToClient {
    userId?: number;
    askValue: number;
    auctionRules?: AuctionRules
}