import { TimeUnit, diffByUnit } from "../bidding/util/diffByUnit";
import DB from "../database";
import { AuctionModel } from "../database/models/auction";
import { CreateAuctionDto } from "../dtos/auction";
import { HttpException } from "../exceptions/httpException";
import { ItemService } from "./ItemService";

export const SCHEDULE_TO_START_MIN_DAYS = 1;

export class AuctionService {

    private dbAuction = DB.Auction;
    private itemService: ItemService;

    constructor(itemService: ItemService){
        this.itemService = itemService;
    }
    
    public isStartTimeValid = (start: Date): boolean => {
        let now = new Date()
        const daysDiff = diffByUnit(now, start, TimeUnit.Days);
        if(daysDiff < SCHEDULE_TO_START_MIN_DAYS) {
            return false;
        }
        return true;
    }  

    public createAuction = async (auctionData: CreateAuctionDto): Promise<AuctionModel> => {

        if(!this.isStartTimeValid(auctionData.start)){
            throw new HttpException(409, `auction start time is not valid`)
        }
        const auctionItem = await this.itemService.findItemById(auctionData.itemId);

        if(auctionData.startingBid > auctionItem.price){
            throw new HttpException(409, `starting bid must be less than or equal to the item's price`);
        }

        let auction;
        try {
            auction = await this.dbAuction.create(auctionData);
        } catch (error) {
            throw new HttpException(500);
        }

        return auction;
    }

    public findAuctionById = async (auctionId: number): Promise<AuctionModel> => {
        const auction = await this.dbAuction.findByPk(auctionId);
        if(!auction){
            throw new HttpException(404, 'Auction not found')
        }
        return auction;
    } 

    public findAllByDate = async (date: Date): Promise<AuctionModel[]> => {
        return this.dbAuction.findAll({where:{start:date}})
    }

}