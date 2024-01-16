import { Sequelize, Model, DataTypes, CreationOptional, InferCreationAttributes, InferAttributes } from "sequelize";
import { BelongsToMixin } from "../mixins/belongsToMixin";
import { AuctionModel } from "./auction";
import { UserModel } from "./user";

export interface BidModel extends 
    BelongsToMixin<AuctionModel, number, 'AuctionModel'>,
    BelongsToMixin<UserModel, number, 'UserModel'>
    {
        id: CreationOptional<number>,
        value: number,
        auctionId: number,
        userId: number
}

type BidModelAttributes = InferAttributes<BidModel, { omit: 'auctionId' | 'userId' }>
type BidCreationAttributes = InferCreationAttributes<BidModel>

export class BidModel extends Model<BidModelAttributes, BidCreationAttributes> {

}

const initBid = (sequelize: Sequelize)=>{

    BidModel.init(
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            value:{
                type: DataTypes.DOUBLE,
                allowNull: false
            }
        },
        {
            tableName: 'bids',
            underscored:true,
            sequelize
        }
    )


    return BidModel
}
   
export default initBid;