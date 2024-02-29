import DB from "../database";
import { UserModel } from "../database/models/user";
import { CreateUserDto } from "../dtos/user";
import { HttpException } from "../exceptions/httpException";
import { saltAndHash } from "./util/saltAndHash";

export class UserService {

    private dbUser = DB.User;

    public createUser = async (userData: CreateUserDto): Promise<UserModel> => {
        
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
        
        const {salt , hashedPassword} = saltAndHash(userData.password);
        userData.password = hashedPassword;
        
        let userWithSalt = {...userData, salt};
        await this.dbUser.create(userWithSalt);    
    
        const user = await this.dbUser.findOne({where: {username: userData.username}})
        return user!;
    }

    public findByUniqueProperty = async (property: string, userData: CreateUserDto): Promise<UserModel | null> => {
        const user = await this.dbUser.findOne({where:{[property]: userData[property as keyof CreateUserDto]}})
        return user;
    }
    
}