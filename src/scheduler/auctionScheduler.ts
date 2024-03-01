import { AuctionModel } from "../database/models/auction";
import * as nodeCron from "node-cron";
import { bidStoreClient } from "../bidding/service";
import { AuctionBid } from "../bidding/models/auctionBid";
import { AuctionRules } from "../bidding/models/auctionRules";
import { AuctionService } from "../services/AuctionService";

const SET_AUCTIONS = "0 0 * * * *";
const CLEAR_AUCTIONS = "0 1 * * * *";
const SILENT_INTERVAL_SEC = 10
const SILENT_CHECKS = [
    "10 0 * * * *",
    "20 0 * * * *",
    "30 0 * * * *",
    "40 0 * * * *",
    "50 0 * * * *"
]

const init = (auctionService: AuctionService) => {
    const setAuctions = nodeCron.schedule(SET_AUCTIONS, async () => {
        const auctions:AuctionModel[] = await auctionService.findAllByDate(new Date());
        for (const auction of auctions) {
            setAuctionBid(auction);
        }    
    });

    for (const check of SILENT_CHECKS) {
        const silentChecks = nodeCron.schedule(check, () => {
            bidStoreClient.lowerAskBid(SILENT_INTERVAL_SEC);
        })
    }

    const clearAuctions = nodeCron.schedule(CLEAR_AUCTIONS, () => {
        bidStoreClient.clearAuctions();
    });
}

const setAuctionBid = async (auction: AuctionModel) => {
    const item = await auction.getItemModel()
    const auctionRules = new AuctionRules(auction);
    const startingBid = new AuctionBid(auctionRules, item.price);
    bidStoreClient.setBid(auction.id.toString(), startingBid);
}

export const auctionScheduler = {
    init
}
