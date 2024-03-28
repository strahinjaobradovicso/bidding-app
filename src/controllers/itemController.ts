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
            const owner:number = req.body.userId
            const itemData: CreateItemDto = req.body;
            let images = [];
            if(req.files){
                images = (JSON.parse(JSON.stringify(req.files)));
            }
            const storeItemData: ItemModel = await this.itemService.createItem(owner, itemData, images);
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

    public updateItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = Number(req.params.itemId);
            const itemData: CreateItemDto = req.body;
            const updateItemData: ItemModel = await this.itemService.updateItem(itemId, itemData);
            res.status(200).json({ data: updateItemData, message: 'item is updated' });
        } catch (error) {
            next(error);
        }
    }

    public getItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const owner:number = Number(req.query.userId)
            const items = await this.itemService.findItems(owner);
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item = await this.itemService.findItemById(Number(req.params.itemId));
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    }

}