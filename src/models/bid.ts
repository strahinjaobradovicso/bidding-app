import { Sequelize, Model, Optional, DataTypes } from "sequelize";
import { Bid } from "../interfaces/bid";

export type BidCreationAttributes = Optional<Bid, 'id'>

class BidModel extends Model<Bid, BidCreationAttributes> implements Bid {
    declare id: number
    declare value: number
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