import { Sequelize, Optional, DataTypes, Model } from "sequelize";
import { Auction, AuctionStatus } from "../interfaces/auction";

export type AuctionCreationAttributes = Omit<Optional<Auction, 'id'>, 'lastBid' | 'status' | 'userId'>
type AuctionModelAttributes = Omit<Auction, 'itemId' | 'userId'>

export class AuctionModel extends Model<AuctionModelAttributes, AuctionCreationAttributes> implements Auction{
    declare id: number;
    declare start: Date;
    declare lastBid: number;
    declare status: AuctionStatus;

    declare itemId: number;
    declare userId: number;
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