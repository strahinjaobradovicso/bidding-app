import { IsNumber, IsNumberString } from "class-validator"

export class QueryPaginationDto {
    
    @IsNumberString()
    declare page: number

    @IsNumberString()
    declare itemsPerPage: number
}