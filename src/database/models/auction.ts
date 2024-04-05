import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsToMixin } from "../mixins/belongsToMixin";
import { ItemModel } from "./item";
import { UserModel } from "./user";
import { HasManyMixin } from "../mixins/hasManyMixin";
import { BidModel } from "./bid";

export enum AuctionStatus {
    Upcoming = 'UPCOMING',
    Started = 'STARTED',
    Done = 'DONE'
}

export interface AuctionModel extends 
    BelongsToMixin<ItemModel, number, 'ItemModel'>,
    HasManyMixin<BidModel, number, 'BidModel'>
    {
        id: CreationOptional<number>,
        start: Date,
        lastBid?: number,
        status: AuctionStatus,
        itemId: number,
        ownerId: number,
        winnerId?: number,
        startingBid: number
}

type AuctionModelAttributes = InferAttributes<AuctionModel, { omit:'itemId' | 'winnerId' }>
type AuctionCreationAttributes = InferCreationAttributes<AuctionModel, { omit: 'lastBid' | 'status' | 'winnerId'}>

export class AuctionModel extends Model<AuctionModelAttributes, AuctionCreationAttributes> {
    
}

const initAuction = (sequelize: Sequelize)=>{

    AuctionModel.init(
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            start:{
                type: DataTypes.DATE,
                allowNull: false
            },
            lastBid:{
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            status:{
                type: DataTypes.ENUM(...Object.values(AuctionStatus)),
                defaultValue: AuctionStatus.Upcoming,
                allowNull: false
            },
            startingBid:{
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            ownerId:{
                type: DataTypes.INTEGER
            }
        },
        {
            tableName:'auctions',
            underscored:true,
            sequelize
        }
    )
    return AuctionModel;
}

export default initAuction;