import { AuctionModel } from "../../database/models/auction";
import { addSeconds } from "../util/addSeconds";

const REGULAR_TIME_SEC = 60
const EXTRA_TIME_SEC = 5
const BID_INCREMENT_PCT = 0.1

export class AuctionRules {

    public start: Date
    public end: Date
    public extraTimeSec: number
    public startingBid: number
    public bidIncrement: number

    constructor(auction: AuctionModel){
        this.start = auction.start
        this.end = addSeconds(REGULAR_TIME_SEC)
        this.extraTimeSec = EXTRA_TIME_SEC
        this.startingBid = auction.startingBid
        this.bidIncrement = BID_INCREMENT_PCT
    }

    public extendAuction() {
        this.end = addSeconds(EXTRA_TIME_SEC);
    }
    
}