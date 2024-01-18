import { IsNumber, Min } from "class-validator";

export class CreateBidDto {
    
    @IsNumber()
    @Min(0)
    declare value: number;

    @IsNumber()
    declare auctionId: number;

    @IsNumber()
    declare userId: number;
}