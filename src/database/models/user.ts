import { Sequelize, Model, DataTypes, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize";
import { HasManyMixin } from "../mixins/hasManyMixin";
import { ItemModel } from "./item";

export interface UserModel extends
    HasManyMixin<ItemModel, number, 'ItemModel'>
    {
        id: CreationOptional<number>,
        username:string,
        password:string,
        email:string,
}

type UserModelAttributes = InferAttributes<UserModel>
type UserCreationAttributes = InferCreationAttributes<UserModel>

export class UserModel extends Model<UserModelAttributes, UserCreationAttributes> {

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