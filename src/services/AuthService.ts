import DB from "../database";
import { CreateUserDto } from "../dtos/user";
import { HttpException } from "../exceptions/httpException";
import { saltAndHash } from "./util/saltAndHash";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { TokenRequestPayload } from "../ambient/request";

export class AuthService {

    private dbUser = DB.User;

    public login = async (user: CreateUserDto):Promise<string> => {
        const dbUser = await this.dbUser.findOne({ where: { username: user.username } })

        if(!dbUser){
            throw new HttpException(409, 'user not found');
        }

        const { hashedPassword } = saltAndHash(user.password, dbUser.salt);

        if(dbUser.password === hashedPassword){

            const payload: TokenRequestPayload = {
                userId: dbUser.id,
                username: dbUser.username
            }

            const token = jwt.sign(payload, JWT_SECRET!, {expiresIn:'1h'})
            return token;
        }
        else{
            throw new HttpException(409, 'password in not valid')
        }

    }

}