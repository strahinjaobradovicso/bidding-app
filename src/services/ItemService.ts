import { Op } from "sequelize";
import DB from "../database";
import { ImageModel } from "../database/models/image";
import { ItemModel } from "../database/models/item";
import { UserModel } from "../database/models/user";
import { CreateItemDto } from "../dtos/item";
import { HttpException } from "../exceptions/httpException";
import { QueryItemDto } from "../dtos/queries/itemQuery";

export class ItemService {
    
    private dbItem = DB.Item;

    public createItem = async (userId: number, itemData: CreateItemDto, images: any): Promise<ItemModel> => {
        let item;
        try {
            item = await this.dbItem.create({...itemData, userId});
            const promises = [];
            for (const img of images) {
                let imgUrl = img.path.replace("\\", "/");
                let promise = DB.Image.create({
                    imageData: imgUrl,
                    itemId: item.id
                })
                promises.push(promise);
            }
            await Promise.all(promises);
                

        } catch (error) {
            throw new HttpException(500)
        }
        return item;
    }
    
    public findItemById = async (itemId: number): Promise<ItemModel> => {
        const item = await this.dbItem.findByPk(itemId, {
            include: ImageModel
        });
        if(!item){
            throw new HttpException(404, 'Item not found')
        }
        return item;
    }
    
    public deleteItem = async (itemId: number): Promise<void> => {
        const item = await this.findItemById(itemId);
        await item.destroy()
    }

    public updateItem = async (itemId: number, itemData: CreateItemDto): Promise<ItemModel> => {
        const dbItem: ItemModel = await this.findItemById(itemId);

        dbItem.title = itemData.title;
        dbItem.price = itemData.price;
        if(itemData.description)
            dbItem.description = itemData.description;

        const updatedItem = await dbItem.save();

        return updatedItem;
    }

    public findItems = async(query: QueryItemDto):Promise<
    {
        rows: ItemModel[],
        count: number; 
    }
    > => {
        return this.dbItem.findAndCountAll({
            include: ImageModel,
            where:{ 
                userId: query.owner,
                title: {
                    [Op.substring]: query.title
                }
            },
            offset: (query.page - 1)* query.itemsPerPage,
            limit: query.itemsPerPage,
            distinct:true
        });
    }
}