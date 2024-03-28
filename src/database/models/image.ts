import { Sequelize, Model, DataTypes, CreationOptional, InferCreationAttributes, InferAttributes } from "sequelize";
import { BelongsToMixin } from "../mixins/belongsToMixin";
import { ItemModel } from "./item";

export interface ImageModel extends 
    BelongsToMixin<ItemModel, number, 'AuctionModel'>
    {
        id: CreationOptional<number>,
        imageData: string,
        itemId: number
}

type ImageModelAttributes = InferAttributes<ImageModel, { omit: 'itemId' }>
type ImageCreationAttributes = InferCreationAttributes<ImageModel>

export class ImageModel extends Model<ImageModelAttributes, ImageCreationAttributes> {

}

const initImage = (sequelize: Sequelize)=>{

  ImageModel.init(
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            imageData:{
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'images',
            underscored:true,
            sequelize
        }
    )


    return ImageModel
}
   
export default initImage;