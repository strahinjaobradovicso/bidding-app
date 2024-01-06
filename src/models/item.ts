import DB from "../database";
import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { Item } from "../interfaces/item";

export type ItemCreationAttributes = Optional<Item, 'id' | 'description'>

class ItemModel extends Model<Item, ItemCreationAttributes> implements Item{
    declare id: number
    declare title: string
    declare price: number
    declare description: string
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