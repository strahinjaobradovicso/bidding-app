import { AuctionModel } from "../database/models/auction";
import * as nodeCron from "node-cron";
import { auctionService } from "../services/AuctionService";
import { bidStoreClient } from "../bidding/service";
import { AuctionBid } from "../bidding/interfaces/auctionBid";
import { addSeconds } from "../bidding/util/addSeconds";

const AUCTION_REGULAR_TIME = 60000
const AUCTION_EXTRA_TIME = 5000
const BID_INCREMENT_PCT = 0.1

const init = (cronExpression:string = "0 0 * * * *") => {
    const job = nodeCron.schedule(cronExpression, async () => {
        const auctions:AuctionModel[] = await auctionService.findAllByDate(new Date());
        for (const auction of auctions) {
            setAuctionBid(auction);
        }    
    });
}

const setAuctionBid = async (auction: AuctionModel) => {

    const item = await auction.getItemModel()

    const startingBid: AuctionBid = {
        auctionStart: new Date(),
        auctionEnd: addSeconds(AUCTION_REGULAR_TIME),
        auctionExtraTime: AUCTION_EXTRA_TIME,
        startingValue: item.price,
        askValue: auction.startingBid,
        increment: BID_INCREMENT_PCT,
        extendAuction: false
    }
    bidStoreClient.setBid(auction.id.toString(), startingBid);
}

export const auctionScheduler = {
    init
}
