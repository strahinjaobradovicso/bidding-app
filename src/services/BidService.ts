import DB from "../database";
import { BidModel } from "../database/models/bid";
import { CreateBidDto } from "../dtos/bid";
import { HttpException } from "../exceptions/httpException";

const dbBid = DB.Bid;

const createBid = async (bidData: CreateBidDto): Promise<BidModel> => {
    let bid;
    try {
        bid = await dbBid.create(bidData);
    } catch (error) {
        throw new HttpException(500);
    }
    return bid;
}

export const bidService = {
    createBid
}