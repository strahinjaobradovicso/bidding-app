import DB from "../database";
import { CreateBidDto } from "../dtos/bid";

export class BidService {

    private dbBid = DB.Bid;
    
    public recordBidForStats = async (userId: number, bidData: CreateBidDto) => {
        try {
            await this.dbBid.create({...bidData, userId});
        } catch (error) {
            console.log(error);
        }
    }
}