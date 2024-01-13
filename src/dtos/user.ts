import { IsAlphanumeric, IsEmail, MinLength } from "class-validator"

const PASSWORD_MIN_LENGTH = 8;

export class CreateUserDto {
    
    @IsAlphanumeric()
    declare username: string

    @MinLength(PASSWORD_MIN_LENGTH)
    declare password: string
 
    @IsEmail()
    declare email: string
    
}