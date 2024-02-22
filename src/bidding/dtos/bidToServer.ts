import { IsNumber, IsString } from "class-validator"

export class BidToServer {

    @IsString()
    declare auctionId: string

    @IsNumber()
    declare value: number
}