import { IsDate, IsNumber } from "class-validator";

export class CreateAuctionDto {

    @IsDate()
    declare start: Date;
    
    @IsNumber()
    declare itemId: number;

    @IsNumber()
    declare startingBid: number;
}