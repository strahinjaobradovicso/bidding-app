import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

interface ItemModel {
    id: CreationOptional<number>,
    title: string,
    price: number,
    description: CreationOptional<string>,
    userId: number
}

type ItemModelAttributes = InferAttributes<ItemModel, { omit:'userId' }>
type ItemCreationAttributes = InferCreationAttributes<ItemModel>

class ItemModel extends Model<ItemModelAttributes, ItemCreationAttributes> {
    
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