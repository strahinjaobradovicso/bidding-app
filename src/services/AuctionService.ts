import { AuctionBid } from "../bidding/interfaces/auctionBid";
import DB from "../database";
import { AuctionModel, AuctionStatus } from "../database/models/auction";
import { CreateAuctionDto } from "../dtos/auction";
import { HttpException } from "../exceptions/httpException";
import { itemService } from "./ItemService";

export const SCHEDULE_TO_START_MIN_DAYS = 1;

const dbAuction = DB.Auction;

const isStartTimeValid = (start: Date): boolean => {
    let now = new Date()
    let diff = start.getTime() - now.getTime()
    let daysDiff = Math.round(diff/1000*3600*24)

    if(daysDiff < SCHEDULE_TO_START_MIN_DAYS) {
        return false;
    }
    return true;
}  

const createAuction = async (auctionData: CreateAuctionDto): Promise<AuctionModel> => {

    if(!isStartTimeValid(auctionData.start)){
        throw new HttpException(409, `auction start time is not valid`)
    }
    const auctionItem = await itemService.findItemById(auctionData.itemId);

    if(auctionData.startingBid > auctionItem.price){
        throw new HttpException(409, `starting bid must be less than or equal to the item's price`);
    }

    let auction;
    try {
        auction = await dbAuction.create(auctionData);
    } catch (error) {
        throw new HttpException(500);
    }

    return auction;
}

const findAllByDate = async (date: Date): Promise<AuctionModel[]> => {
    return dbAuction.findAll({where:{start:date}})
}

export const auctionService = {
    isStartTimeValid,
    createAuction,
    findAllByDate
}