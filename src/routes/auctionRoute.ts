import { Router } from "express";
import { Routes } from "./interfaces/route";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { AuctionController } from "../controllers/auctionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isOwnerMiddleware } from "../middlewares/ownerMiddleware";
import { AuctionModel } from "../database/models/auction";
import { CreateAuctionDto } from "../dtos/auction";

export class AuctionRoute implements Routes {

    public path = '/auctions';
    public router = Router();

    private auctionController: AuctionController;

    constructor(auctionController: AuctionController){
        this.auctionController = auctionController;
        this.initRoutes();
    }
    
    private initRoutes(){
        this.router.post(`${this.path}`, 
        authMiddleware,
        dtoValidationMiddleware(CreateAuctionDto),
        this.auctionController.scheduleNewAuction);

        this.router.delete(`${this.path}/:auctionId`,
        authMiddleware,
        isOwnerMiddleware(AuctionModel, 'auctionId'),
        this.auctionController.cancelAuction);

        this.router.put(`${this.path}/:auctionId`, 
        authMiddleware,
        isOwnerMiddleware(AuctionModel, 'auctionId'),
        dtoValidationMiddleware(CreateAuctionDto),
        this.auctionController.updateAuction);
    }
}