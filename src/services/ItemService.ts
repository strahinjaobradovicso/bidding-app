import DB from "../database";
import { ItemModel } from "../database/models/item";
import { CreateItemDto } from "../dtos/item";
import { HttpException } from "../exceptions/httpException";

export class ItemService {
    
    private dbItem = DB.Item;

    public createItem = async (itemData: CreateItemDto): Promise<ItemModel> => {
        let item;
        try {
            item = await this.dbItem.create(itemData);
        } catch (error) {
            throw new HttpException(500)
        }
        return item;
    }
    
    public findItemById = async (itemId: number): Promise<ItemModel> => {
        const item = await this.dbItem.findByPk(itemId);
        if(!item){
            throw new HttpException(404, 'Item not found')
        }
        return item;
    }
    
    public deleteItem = async (itemId: number): Promise<void> => {
        const item = await this.findItemById(itemId);
        await item.destroy()
    }
}