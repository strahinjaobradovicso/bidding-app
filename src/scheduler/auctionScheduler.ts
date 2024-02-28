import { AuctionModel } from "../database/models/auction";
import * as nodeCron from "node-cron";
import { auctionService } from "../services/AuctionService";
import { bidStoreClient } from "../bidding/service";
import { AuctionBid } from "../bidding/models/auctionBid";
import { AuctionRules } from "../bidding/models/auctionRules";

const SET_AUCTIONS = "0 0 * * * *";
const CLEAR_AUCTIONS = "0 1 * * * *";

const init = () => {
    const setAuctions = nodeCron.schedule(SET_AUCTIONS, async () => {
        const auctions:AuctionModel[] = await auctionService.findAllByDate(new Date());
        for (const auction of auctions) {
            setAuctionBid(auction);
        }    
    });

    const clearAuctions = nodeCron.schedule(CLEAR_AUCTIONS, () => {
        bidStoreClient.clearAuctions();
    })
}

const setAuctionBid = async (auction: AuctionModel) => {
    const auctionRules = new AuctionRules(auction);
    const startingBid = new AuctionBid(auctionRules);
    bidStoreClient.setBid(auction.id.toString(), startingBid);
}

export const auctionScheduler = {
    init
}
