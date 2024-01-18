import DB from "../database";
import { UserModel } from "../database/models/user";
import { CreateUserDto } from "../dtos/user";
import { HttpException } from "../exceptions/httpException";

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


        let user;
        try {
            user = await this.dbUser.create(userData);            
        } catch (error) {
            throw new HttpException(500, '')
        }

        return user;

    }


}