import { NextFunction, Request, Response } from "express"
import { CreateItemDto } from "../dtos/item";
import { itemService } from "../services/ItemService";
import { ItemModel } from "../database/models/item";

const storeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemData: CreateItemDto = req.body;
        const storeItemData: ItemModel = await itemService.createItem(itemData);
        res.status(201).json({ data: storeItemData, message: 'item stored'});
    } catch (error) {
        next(error);
    }
}

export const itemController = {
    storeItem
}