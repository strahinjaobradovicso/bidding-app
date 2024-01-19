import DB from "../database";
import { AuctionModel } from "../database/models/auction";
import { CreateAuctionDto } from "../dtos/auction";
import { HttpException } from "../exceptions/httpException";

export const SCHEDULE_TO_START_MIN_DAYS = 1;

export class AuctionService {
    private dbAuction = DB.Auction;

    public isStartTimeValid(start: Date): boolean {
        let now = new Date()
        let diff = start.getTime() - now.getTime()
        let daysDiff = Math.round(diff/1000*3600*24)

        if(daysDiff < SCHEDULE_TO_START_MIN_DAYS) {
            return false;
        }
        return true;
    }  

    async createAuction(auctionData: CreateAuctionDto): Promise<AuctionModel> {

        if(!this.isStartTimeValid(auctionData.start)){
            throw new HttpException(409, `auction start time is not valid`)
        }

        const auction = await this.dbAuction.create(auctionData);
        return auction;
    }


}