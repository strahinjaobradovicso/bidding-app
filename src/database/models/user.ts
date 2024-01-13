import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { User } from "../interfaces/user";

export type UserCreationAttributes = Optional<User, 'id'>
type UserModelAttributes = User

export class UserModel extends Model<UserModelAttributes, UserCreationAttributes> implements User {
    declare id: number;
    declare username: string;
    declare password: string;
    declare email: string;
}

const initUser = (sequelize: Sequelize)=>{
    UserModel.init(
        {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        }
        },
        {
            tableName: 'users',
            underscored:true,
            sequelize
        }
    )

    return UserModel;
}

export default initUser;