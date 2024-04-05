import { Router } from "express";
import { Routes } from "./interfaces/route";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { AuctionController } from "../controllers/auctionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isOwnerMiddleware, setOwnerMiddleware } from "../middlewares/ownerMiddleware";
import { CreateAuctionDto } from "../dtos/auction";
import { QueryAuctionDto } from "../dtos/queries/auctionQuery";
import { ItemModel } from "../database/models/item";
import { AuctionModel } from "../database/models/auction";

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
        authMiddleware(),
        isOwnerMiddleware(ItemModel, 'body', 'itemId', 'userId'),
        dtoValidationMiddleware(CreateAuctionDto, 'body'),
        setOwnerMiddleware(),
        this.auctionController.scheduleNewAuction);

        this.router.delete(`${this.path}/:auctionId`,
        authMiddleware(),
        isOwnerMiddleware(AuctionModel, 'params', 'auctionId', 'ownerId'),
        this.auctionController.cancelAuction);

        this.router.put(`${this.path}/:auctionId`, 
        authMiddleware(),
        isOwnerMiddleware(AuctionModel, 'params', 'auctionId', 'ownerId'),
        dtoValidationMiddleware(CreateAuctionDto, 'body'),
        this.auctionController.updateAuction);

        this.router.get(`${this.path}`,
        dtoValidationMiddleware(QueryAuctionDto, 'query'),
        this.auctionController.getAuctions)
    }
}