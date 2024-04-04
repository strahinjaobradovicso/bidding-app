import { Router } from "express";
import { Routes } from "./interfaces/route";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { AuctionController } from "../controllers/auctionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isOwnerMiddleware } from "../middlewares/ownerMiddleware";
import { CreateAuctionDto } from "../dtos/auction";
import { QueryAuctionDto } from "../dtos/queries/auctionQuery";
import { ItemModel } from "../database/models/item";

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
        isOwnerMiddleware(ItemModel, 'body', 'itemId'),
        dtoValidationMiddleware(CreateAuctionDto, 'body'),
        this.auctionController.scheduleNewAuction);

        this.router.delete(`${this.path}/:itemId`,
        authMiddleware(),
        isOwnerMiddleware(ItemModel, 'params' ,'itemId'),
        this.auctionController.cancelAuction);

        this.router.put(`${this.path}/:auctionId`, 
        authMiddleware(),
        isOwnerMiddleware(ItemModel, 'body', 'itemId'),
        dtoValidationMiddleware(CreateAuctionDto, 'body'),
        this.auctionController.updateAuction);

        this.router.get(`${this.path}`,
        dtoValidationMiddleware(QueryAuctionDto, 'query'),
        this.auctionController.getAuctions)
    }
}