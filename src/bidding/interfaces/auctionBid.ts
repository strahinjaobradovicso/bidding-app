export interface AuctionBid {
    minValue: number
    startingValue: number
    askValue: number
    reachedValue?: number
    increment: number
    userId?: number
    time: number
}