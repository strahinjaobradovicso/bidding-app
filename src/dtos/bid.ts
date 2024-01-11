import { IsNumber, Min } from "class-validator";
import { BidCreationAttributes } from "../database/models/bid";

export class CreateBidDto implements BidCreationAttributes {
    
    @IsNumber()
    @Min(0)
    declare value: number;
}