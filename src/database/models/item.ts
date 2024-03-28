import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsToMixin } from "../mixins/belongsToMixin";
import { UserModel } from "./user";
import { HasManyMixin } from "../mixins/hasManyMixin";
import { AuctionModel } from "./auction";
import { ImageModel } from "./image";

export interface ItemModel extends
    BelongsToMixin<UserModel, number, 'UserModel'>,
    HasManyMixin<AuctionModel, number, 'AuctionModel'>,
    HasManyMixin<ImageModel, number, 'ImageModel'>
    {
        id: CreationOptional<number>,
        title: string,
        price: number,
        description: CreationOptional<string>,
        userId: number
}

type ItemModelAttributes = InferAttributes<ItemModel>
type ItemCreationAttributes = InferCreationAttributes<ItemModel>

export class ItemModel extends Model<ItemModelAttributes, ItemCreationAttributes> {
    
}

const initItem = (sequelize: Sequelize)=>{
    ItemModel.init(
        {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
        },
        userId:{
            type: DataTypes.INTEGER
        }
        },
        {
            tableName: 'items',
            underscored:true,
            sequelize
        }
    )

    return ItemModel;
}

export default initItem;