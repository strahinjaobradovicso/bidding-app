import { NextFunction, Request, Response } from "express"
import { CreateItemDto } from "../dtos/item";
import { ItemModel } from "../database/models/item";
import { ItemService } from "../services/ItemService";

export class ItemController {

    private itemService: ItemService;

    constructor(itemService: ItemService){
        this.itemService = itemService;
    }

    public storeItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemData: CreateItemDto = req.body;
            const storeItemData: ItemModel = await this.itemService.createItem(itemData);
            res.status(201).json({ data: storeItemData, message: 'item stored'});
        } catch (error) {
            next(error);
        }
    }

    public deleteItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.itemService.deleteItem(Number(req.params.itemId));
            res.status(200).json({message: 'item is deleted'});
        } catch (error) {
            next(error);
        }
    }

}