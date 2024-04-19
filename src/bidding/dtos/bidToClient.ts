import { Bidder } from "../interfaces/bidder";
import { AuctionRules } from "../models/auctionRules";

export interface BidToClient {
    bidder?: Bidder;
    askValue: number;
    auctionRules?: AuctionRules;
    reachedValue: number;
    isFinal: boolean;
}