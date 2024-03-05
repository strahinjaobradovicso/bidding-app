import { AuctionModel } from "../../database/models/auction";
import { addSeconds } from "../util/addSeconds";

const DURATION_SEC = 60
const BID_INCREMENT_PCT = 0.1

export class AuctionRules {

    public start: Date
    public end: Date
    public startingBid: number
    public bidIncrement: number

    constructor(auction: AuctionModel){
        this.start = auction.start
        this.end = addSeconds(DURATION_SEC)
        this.startingBid = auction.startingBid
        this.bidIncrement = BID_INCREMENT_PCT
    }

}