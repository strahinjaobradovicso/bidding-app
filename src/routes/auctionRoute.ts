import { Router } from "express";
import { Routes } from "./interfaces/route";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { CreateItemDto } from "../dtos/item";
import { AuctionController } from "../controllers/auctionController";

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
        dtoValidationMiddleware(CreateItemDto),
        this.auctionController.scheduleNewAuction);
    }


}