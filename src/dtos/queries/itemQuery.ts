import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"
import { QueryPaginationDto } from "./paginationQuery";

export class QueryItemDto extends QueryPaginationDto{

    @IsNumberString()
    declare owner: number

    @IsOptional()
    @IsString()
    declare title?: string;
}