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

    public cancelAuction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.auctionService.deleteAuction(Number(req.params.auctionId))
            res.status(200).json({message: 'auction is deleted'});
        } catch (error) {
            next(error);
        }
    }

    public updateAuction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auctionId = Number(req.params.auctionId);
            const auctionData: CreateAuctionDto = req.body;
            const updateAuction: AuctionModel = await this.auctionService.updateAuction(auctionId, auctionData);
            res.status(200).json({ data: updateAuction, message: 'auction is updated'});
        } catch (error) {
            next(error);
        }
    }

    public getUpcoming = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const date = req.query.date as string;
            let auctions;
            if(date)
                auctions = await this.auctionService.findUpcoming(new Date(date));
            else{
                auctions = await this.auctionService.findUpcoming();
            }
            res.status(200).json(auctions);
        } catch (error) {
            next(error);
        }
    }

}