import { AuctionModel } from "../database/models/auction";
import * as nodeCron from "node-cron";
import { auctionService } from "../services/AuctionService";

const init = (cronExpression:string = "0 0 * * * *") => {
    const job = nodeCron.schedule(cronExpression, async () => {
        const auctions:AuctionModel[] = await auctionService.findAllByDate(new Date());
        for (const auction of auctions) {

        }    
    });
}

export const auctionScheduler = {
    init
}
