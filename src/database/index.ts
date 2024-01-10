import { Dialect, Sequelize } from "sequelize";
import { DB_SCHEMA, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT} from '../config'
import initUser from "./models/user";
import initItem from "./models/item";
import initAuction from "./models/auction";
import initBid from "./models/bid";

const sequelize = new Sequelize(DB_SCHEMA!, DB_USERNAME!, DB_PASSWORD, {
    dialect: DB_DIALECT as Dialect,
    host: DB_HOST
})

async function connect(){
    await sequelize.authenticate()
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
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
DB.Item.belongsTo(DB.User, {
    foreignKey: 'user_id',
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
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
DB.Auction.belongsTo(DB.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})


export default DB;