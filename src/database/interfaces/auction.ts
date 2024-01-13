export enum AuctionStatus {
    Upcoming = 'UPCOMING',
    Started = 'STARTED',
    Done = 'DONE'
}

export interface Auction{
    id:number,
    start:Date,
    lastBid:number,
    status:AuctionStatus,
    itemId:number,
    userId:number
}