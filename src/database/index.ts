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
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
})
DB.Item.belongsTo(DB.User, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})

DB.Item.hasOne(DB.Auction, {
    foreignKey: {
        name: 'itemId',
        field: 'item_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})
DB.Auction.belongsTo(DB.Item, {
    foreignKey: {
        name: 'itemId',
        field: 'item_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})

DB.User.hasMany(DB.Bid, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})
DB.Bid.belongsTo(DB.User, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})

DB.Auction.hasMany(DB.Bid, {
    foreignKey: {
        name: 'auctionId',
        field: 'auction_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})  
DB.Bid.belongsTo(DB.Auction, {
    foreignKey: {
        name: 'auctionId',
        field: 'auction_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
})

DB.User.hasMany(DB.Auction, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: true
    },
})
DB.Auction.belongsTo(DB.User, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: true
    },
})


export default DB;