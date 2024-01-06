import { Sequelize } from "sequelize";
import { DB_SCHEMA, DB_USERNAME, DB_PASSWORD, DB_HOST} from '../config'
import initUser from "../models/user";
import initItem from "../models/item";
import initAuction from "../models/auction";
import initBid from "../models/bid";

const sequelize = new Sequelize(DB_SCHEMA!, DB_USERNAME!, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST
})

async function connect(){
    await sequelize.authenticate()
    await sequelize.sync()
}
const DB = {
    sequelize,
    connect,
    User: initUser(sequelize),
    Item: initItem(sequelize),
    Auction: initAuction(sequelize),
    Bid: initBid(sequelize)
}

DB.User.hasMany(DB.Item, {
    foreignKey: 'seller_id',
    onDelete: 'CASCADE'
})
DB.Item.belongsTo(DB.User, {
    foreignKey: 'seller_id',
    onDelete: 'CASCADE'
})

DB.Item.hasOne(DB.Auction, {
    foreignKey: 'item_id',
    onDelete: 'CASCADE'
})
DB.Auction.belongsTo(DB.Item, {
    foreignKey: 'item_id',
    onDelete: 'CASCADE'
})

DB.User.hasMany(DB.Bid, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
DB.Bid.belongsTo(DB.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

DB.Auction.hasMany(DB.Bid, {
    foreignKey: 'auction_id',
    onDelete: 'CASCADE'
})  
DB.Bid.belongsTo(DB.Auction, {
    foreignKey: 'auction_id',
    onDelete: 'CASCADE'
})

DB.User.hasMany(DB.Auction, {
    foreignKey: 'winner_id',
    onDelete: 'CASCADE'
})
DB.Auction.belongsTo(DB.User, {
    foreignKey: 'winner_id',
    onDelete: 'CASCADE'
})


export default DB;