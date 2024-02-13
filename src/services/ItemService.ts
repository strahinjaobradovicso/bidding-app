import DB from "../database";
import { ItemModel } from "../database/models/item";
import { CreateItemDto } from "../dtos/item";
import { HttpException } from "../exceptions/httpException";

const dbItem = DB.Item;

const createItem = async (itemData: CreateItemDto): Promise<ItemModel> => {
    let item;
    try {
        item = await dbItem.create(itemData);
    } catch (error) {
        throw new HttpException(500)
    }
    return item;
}

const findItemById = async (itemId: number): Promise<ItemModel> => {
    const item = await dbItem.findByPk(itemId);
    if(!item){
        throw new HttpException(404, 'Item not found')
    }
    return item;
} 

export const itemService = {
    createItem,
    findItemById
}