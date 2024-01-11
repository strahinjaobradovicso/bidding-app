import { Sequelize, Optional, DataTypes, Model } from "sequelize";
import { Auction, AuctionStatus } from "../interfaces/auction";

export type AuctionCreationAttributes = Omit<Optional<Auction, 'id'>, 'lastBid' | 'status'>

export class AuctionModel extends Model<Auction, AuctionCreationAttributes> implements Auction{
    declare id: number;
    declare start: Date;
    declare lastBid: number;
    declare status: AuctionStatus;
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
                type: DataTypes.ENUM(...Object.values(AuctionStatus)),
                defaultValue: AuctionStatus.Upcoming,
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