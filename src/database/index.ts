import { Sequelize } from "sequelize";
import { DB_SCHEMA, DB_USERNAME, DB_PASSWORD, DB_HOST} from '../config'

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
    connect
}

export default DB;