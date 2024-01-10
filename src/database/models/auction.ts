import { Sequelize, Optional, DataTypes, Model } from "sequelize";
import { Auction } from "../interfaces/auction";

export type AuctionCreationAttributes = Optional<Auction, 'id'>

export class AuctionModel extends Model<Auction, AuctionCreationAttributes> implements Auction{
    declare id: number;
    declare start: Date;
    declare lastBid: number;
    declare status: string
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
                allowNull: false
            },
            status:{
                type: DataTypes.STRING,
                allowNull: false
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