import { Router } from "express";
import { Routes } from "./interfaces/route";
import { ItemController } from "../controllers/itemController";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { CreateItemDto } from "../dtos/item";
import { isOwnerMiddleware } from "../middlewares/ownerMiddleware";
import { ItemModel } from "../database/models/item";
import { authMiddleware } from "../middlewares/authMiddleware";

export class ItemRoute implements Routes {
    public path = '/items'
    public router = Router()

    private itemController: ItemController;

    constructor(itemController: ItemController){
        this.itemController = itemController;
        this.initRoutes();
    }

    private initRoutes(){
        this.router.post(`${this.path}`,
        authMiddleware(),
        dtoValidationMiddleware(CreateItemDto), this.itemController.storeItem);
        
        this.router.delete(`${this.path}/:itemId`, 
        authMiddleware(),
        isOwnerMiddleware(ItemModel, 'itemId'),
        this.itemController.deleteItem);
    }
}