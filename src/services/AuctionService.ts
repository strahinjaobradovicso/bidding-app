import { Op } from "sequelize";
import { TimeUnit, diffByUnit } from "../bidding/util/diffByUnit";
import DB from "../database";
import { AuctionModel, AuctionStatus } from "../database/models/auction";
import { ImageModel } from "../database/models/image";
import { ItemModel } from "../database/models/item";
import { CreateAuctionDto } from "../dtos/auction";
import { HttpException } from "../exceptions/httpException";
import { ItemService } from "./ItemService";
import { toUTC } from "./util/dateConverter";

export const SCHEDULE_TO_START_MIN_DAYS = 1;

export class AuctionService {

    private dbAuction = DB.Auction;
    private itemService: ItemService;

    constructor(itemService: ItemService){
        this.itemService = itemService;
    }
    
    public isStartTimeValid = (start: Date): boolean => {
        let nowLocal = new Date()
        const nowUTC = toUTC(nowLocal);

        const daysDiff = diffByUnit(nowUTC, start, TimeUnit.Days);
        if(daysDiff < SCHEDULE_TO_START_MIN_DAYS) {
            return false;
        }
        return true;
    }  

    public createAuction = async (auctionData: CreateAuctionDto): Promise<AuctionModel> => {
        auctionData.start = new Date(auctionData.start);
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

    public deleteAuction = async (auctionId: number): Promise<void> => {
        const dbAuction = await this.findAuctionById(auctionId);
        dbAuction.destroy()
    }

    public updateAuction = async (auctionId: number, auctionData: CreateAuctionDto): Promise<AuctionModel> => {
        const dbAuction: AuctionModel = await this.findAuctionById(auctionId);

        if(this.isStartTimeValid(auctionData.start)){
            throw new HttpException(409, `auction start time is not valid`)
        }

        const auctionItem = await dbAuction.getItemModel();

        if(auctionData.startingBid > auctionItem.price){
            throw new HttpException(409, `starting bid must be less than or equal to the item's price`);
        }

        dbAuction.start = auctionData.start;
        dbAuction.startingBid = auctionData.startingBid;

        const updatedAuction = await dbAuction.save();

        return updatedAuction;
    }

    public findUpcoming = async (date?: Date): Promise<AuctionModel[]> => {

        let upcomingAuctions: AuctionModel[] = [];
        const whereCondition:any = {};

        if(date){
            const end = date.getTime() + (23*60*60*1000);
            whereCondition.start = {
                [Op.between]: [date, end]
            };
        }
        else{
            whereCondition.status = AuctionStatus.Upcoming
        }

        if(!date){
            upcomingAuctions = await this.dbAuction.findAll({
                include: [
                    {model: ItemModel, include: [ImageModel]}
                ],
                where: whereCondition
            });
        } else {
            upcomingAuctions = await this.dbAuction.findAll({
                include: [
                    {model: ItemModel, include: [ImageModel]}
                ],
                where: whereCondition
            });
        }

        return upcomingAuctions;            

    }
}