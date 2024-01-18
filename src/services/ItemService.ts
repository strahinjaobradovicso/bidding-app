import DB from "../database";
import { ItemModel } from "../database/models/item";
import { CreateItemDto } from "../dtos/item";

export class ItemService {
    private dbItem = DB.Item;

    async createItem(itemData: CreateItemDto): Promise<ItemModel> {
        const item = await this.dbItem.create(itemData);
        return item;
    }
}