import { IsDate, IsDateString, IsNumber } from "class-validator";

export class CreateAuctionDto {

    @IsDateString()
    declare start: Date;
    
    @IsNumber()
    declare itemId: number;

    @IsNumber()
    declare startingBid: number;
}