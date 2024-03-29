import { IsNumber, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

const TITLE_MIN_LENGTH = 20
const TITLE_MAX_LENGTH = 70

export class CreateItemDto {

    @MinLength(TITLE_MIN_LENGTH)
    @MaxLength(TITLE_MAX_LENGTH)
    declare title: string

    @IsNumberString({no_symbols:true})
    declare price: number

    @IsOptional()
    @IsString()
    declare description?: string | undefined;

    @IsOptional()
    declare file: any;

}