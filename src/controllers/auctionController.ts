import { NextFunction, Request, Response } from "express"
import { CreateAuctionDto } from "../dtos/auction"
import { auctionService } from "../services/AuctionService";
import { AuctionModel } from "../database/models/auction";

const scheduleNewAuction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auctionData: CreateAuctionDto = req.body;
        const scheduleAuctionData: AuctionModel = await auctionService.createAuction(auctionData);
        res.status(201).json({ data: scheduleAuctionData, message: 'auction scheduled' });
    } catch (error) {
        next(error);    
    }
}

export const auctionController = {
    scheduleNewAuction
}