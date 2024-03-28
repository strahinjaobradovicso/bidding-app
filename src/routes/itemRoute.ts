import { Router } from "express";
import { Routes } from "./interfaces/route";
import { ItemController } from "../controllers/itemController";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { CreateItemDto } from "../dtos/item";
import { isOwnerMiddleware, setOwnerMiddleware } from "../middlewares/ownerMiddleware";
import { ItemModel } from "../database/models/item";
import { authMiddleware } from "../middlewares/authMiddleware";
import { multerMiddleware } from "../middlewares/multerMiddleware";

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
        multerMiddleware.array('file'),
        dtoValidationMiddleware(CreateItemDto),
        setOwnerMiddleware('userId', 'body'),
        this.itemController.storeItem
        );
        
        this.router.delete(`${this.path}/:itemId`, 
        authMiddleware(),
        isOwnerMiddleware(ItemModel, 'itemId'),
        this.itemController.deleteItem);

        this.router.put(`${this.path}/:itemId`,
        authMiddleware(),
        isOwnerMiddleware(ItemModel, 'itemId'),
        dtoValidationMiddleware(CreateItemDto),
        this.itemController.updateItem)
    }
}