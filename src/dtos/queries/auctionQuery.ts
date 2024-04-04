import { IsDateString, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"
import { AuctionStatus } from "../../database/models/auction"
import { QueryPaginationDto } from "./paginationQuery"

export class QueryAuctionDto extends QueryPaginationDto {

    @IsOptional()
    @IsEnum(AuctionStatus)
    declare status?: string

    @IsOptional()
    @IsDateString()
    declare date?: Date

    @IsOptional()
    @IsString()
    declare itemTitle?: string

    @IsOptional()
    @IsNumberString()
    declare itemOwner?: number

    @IsOptional()
    @IsNumberString()
    declare auctionWinner?: number
}
