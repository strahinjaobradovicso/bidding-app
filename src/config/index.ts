import { config } from "dotenv"
const env = process.env.NODE_ENV || 'test'

if(env === 'dev' || env === 'test'){
    config({ path:`.env.${env}`})
}

export const { 
    NODE_ENV,
    PORT,
    DB_SCHEMA,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DIALECT,
    AUCTION_KEY_HEADER
} = process.env

