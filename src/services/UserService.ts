import DB from "../database";
import { UserModel } from "../database/models/user";
import { CreateUserDto } from "../dtos/user";
import { HttpException } from "../exceptions/httpException";
import * as crypto from 'crypto';



export class UserService {

    private dbUser = DB.User;

    async findByUniqueProperty(property: string, userData: CreateUserDto): Promise<UserModel | null>{
        const user = await this.dbUser.findOne({where:{[property]: userData[property as keyof CreateUserDto]}})
        return user;
    }

    async createUser(userData: CreateUserDto): Promise<UserModel> {
        
        let userProperties = DB.User.getAttributes()    
        const errors = []

        for(const property of Object.entries(userProperties)){
            const propertyKey = property[0]
            const propertyValue = property[1]

            if(propertyValue.unique === true){
                const findUser = await this.findByUniqueProperty(propertyKey, userData);
                if(findUser){
                    errors.push(`${propertyKey} already exists`)
                }
            }
        }

        if(errors.length > 0){
            throw new HttpException(409, errors.join(', '));
        }


        try {
            const salt = crypto.randomBytes(16).toString('hex')
            userData.password = crypto.pbkdf2Sync(userData.password, 
                salt, 1000, 64, 'sha512').toString('hex')
            
            let userWithSalt = {...userData, salt};
            await this.dbUser.create(userWithSalt);    
        } catch (error) {
            throw new HttpException(500)
        }

        const user = await this.dbUser.findOne({where: {username: userData.username}})

        return user!;

    }


}