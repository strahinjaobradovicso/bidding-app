import { AuctionModel } from "../database/models/auction";
import * as nodeCron from "node-cron";
import { AuctionBid } from "../bidding/models/auctionBid";
import { AuctionRules } from "../bidding/models/auctionRules";
import { AuctionService } from "../services/AuctionService";
import { toUTC } from "../services/util/dateConverter";
import { BidStoreClient } from "../bidding/service";

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

export class AuctionScheduler {
    private auctionService: AuctionService;
    private bidStoreClient: BidStoreClient;

    constructor(auctionService: AuctionService, bidStoreClient: BidStoreClient){
        this.auctionService = auctionService;
        this.bidStoreClient = bidStoreClient;
    }

    start(){
        this.setAuctions();
        this.silentChecks();
        this.clearAuctions();
    }

    async setAuctions() {
        nodeCron.schedule(SET_AUCTIONS, async () => {
            const auctions:AuctionModel[] = await this.auctionService.findAllByDate(toUTC(new Date()));
            for (const auction of auctions) {
                try {
                    const item = await auction.getItemModel();
                    const auctionRules = new AuctionRules(auction);
                    const startingBid = new AuctionBid(auctionRules, item.price);
                    this.bidStoreClient.setBid(auction.id.toString(), startingBid);
                } catch (error) {
                    console.log(error);
                }
            }    
        });
    }

    silentChecks(){
        for (const check of SILENT_CHECKS) {
            nodeCron.schedule(check, () => {
                try {
                    this.bidStoreClient.lowerAskBid(SILENT_INTERVAL_SEC);
                } catch (error) {
                    console.log(error);
                }
            })
        }
    }

    clearAuctions(){
        nodeCron.schedule(CLEAR_AUCTIONS, () => {
            try {
                this.bidStoreClient.clearAuctions();
            } catch (error) {
                console.log(error);
            }
        });
    }

}