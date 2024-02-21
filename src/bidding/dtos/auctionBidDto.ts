import { AuctionRules } from "../models/auctionRules";

export interface AuctionBidDto {
    extendAuction: boolean;
    askValue: number;
    auctionRules?: AuctionRules
}