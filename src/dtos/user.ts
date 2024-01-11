import { IsAlphanumeric, IsEmail, MinLength } from "class-validator"
import { UserCreationAttributes } from "../database/models/user"

const PASSWORD_MIN_LENGTH = 8;

export class CreateUserDto implements UserCreationAttributes{
    
    @IsAlphanumeric()
    declare username: string

    @MinLength(PASSWORD_MIN_LENGTH)
    declare password: string
 
    @IsEmail()
    declare email: string
    
}