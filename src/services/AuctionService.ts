import DB from "../database";
import { AuctionModel } from "../database/models/auction";
import { CreateAuctionDto } from "../dtos/auction";

export class AuctionService {
    private dbAuction = DB.Auction;

    async createAuction(auctionData: CreateAuctionDto): Promise<AuctionModel> {
        const auction = await this.dbAuction.create(auctionData);
        return auction;
    }
}