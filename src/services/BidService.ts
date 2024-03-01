import DB from "../database";
import { BidModel } from "../database/models/bid";
import { CreateBidDto } from "../dtos/bid";
import { HttpException } from "../exceptions/httpException";


export class BidService {

    private dbBid = DB.Bid;
    
    public createBid = async (bidData: CreateBidDto): Promise<BidModel> => {
        let bid;
        try {
            bid = await this.dbBid.create(bidData);
        } catch (error) {
            throw new HttpException(500);
        }
        return bid;
    }

}