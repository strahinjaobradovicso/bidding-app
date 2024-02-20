export interface AuctionBid {
    auctionStart: Date,
    auctionEnd: Date,
    auctionExtraTime: number,
    startingValue: number,
    extendAuction: boolean,
    askValue: number,
    increment: number,
}