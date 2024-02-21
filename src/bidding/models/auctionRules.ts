import { AuctionModel } from "../../database/models/auction";
import { addSeconds } from "../util/addSeconds";

const AUCTION_REGULAR_TIME = 60000
const AUCTION_EXTRA_TIME = 5000
const BID_INCREMENT_PCT = 0.1

export class AuctionRules {

    public auctionStart: Date
    public auctionEnd: Date
    public auctionExtraTime: number
    public startingBid: number
    public bidIncrement: number

    constructor(auction: AuctionModel){
        this.auctionStart = auction.start
        this.auctionEnd = addSeconds(AUCTION_REGULAR_TIME)
        this.auctionExtraTime = AUCTION_EXTRA_TIME
        this.startingBid = auction.startingBid
        this.bidIncrement = BID_INCREMENT_PCT
    }

    public extendAuction() {
        this.auctionEnd = addSeconds(AUCTION_EXTRA_TIME);
    }
    
}