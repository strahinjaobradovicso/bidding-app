export interface AuctionRules {
    regularTime: number,
    extraTimeIntervalDelay: number,
    bidIncrementPct: number,
    silentTimeout: number,
    teardownDelay: number
}