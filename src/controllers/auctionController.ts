import { NextFunction, Request, Response } from "express"
import { CreateAuctionDto } from "../dtos/auction"
import { AuctionService } from "../services/AuctionService";
import { AuctionModel } from "../database/models/auction";

export class AuctionController {

    private auctionService: AuctionService;
    constructor(auctionService: AuctionService){
        this.auctionService = auctionService;
    }

    public scheduleNewAuction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auctionData: CreateAuctionDto = req.body;
            const scheduleAuctionData: AuctionModel = await this.auctionService.createAuction(auctionData);
            res.status(201).json({ data: scheduleAuctionData, message: 'auction scheduled' });
        } catch (error) {
            next(error);    
        }
    }


}