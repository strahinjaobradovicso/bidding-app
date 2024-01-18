import DB from "../database";
import { BidModel } from "../database/models/bid";
import { CreateBidDto } from "../dtos/bid";

export class BidService {
    private dbBid = DB.Bid;

    async createBid(bidData: CreateBidDto): Promise<BidModel> {
        const bid = await this.dbBid.create(bidData);
        return bid;
    }
}