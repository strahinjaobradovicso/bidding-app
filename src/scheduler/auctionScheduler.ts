import { AuctionModel } from "../database/models/auction";
import * as nodeCron from "node-cron";
import { auctionService } from "../services/AuctionService";
import { bidStoreClient } from "../bidding/service";
import { AuctionBid } from "../bidding/models/auctionBid";
import { AuctionRules } from "../bidding/models/auctionRules";

const init = (cronExpression:string = "0 0 * * * *") => {
    const job = nodeCron.schedule(cronExpression, async () => {
        const auctions:AuctionModel[] = await auctionService.findAllByDate(new Date());
        for (const auction of auctions) {
            setAuctionBid(auction);
        }    
    });
}

const setAuctionBid = async (auction: AuctionModel) => {
    const auctionRules = new AuctionRules(auction);
    const startingBid = new AuctionBid(auctionRules);
    bidStoreClient.setBid(auction.id.toString(), startingBid);
}

export const auctionScheduler = {
    init
}
