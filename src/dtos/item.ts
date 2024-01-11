import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ItemCreationAttributes } from "../database/models/item";

const TITLE_MIN_LENGTH = 20
const TITLE_MAX_LENGTH = 70

export class CreateItemDto implements ItemCreationAttributes {

    @MinLength(TITLE_MIN_LENGTH)
    @MaxLength(TITLE_MAX_LENGTH)
    declare title: string

    @IsNumber()
    @Min(0)
    declare price: number

    @IsOptional()
    @IsString()
    declare description?: string | undefined;
}