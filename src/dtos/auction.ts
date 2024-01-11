import { IsDate } from "class-validator";
import { AuctionCreationAttributes } from "../database/models/auction";

export class CreateAuctionDto implements AuctionCreationAttributes {

    @IsDate()
    declare start: Date;    
}