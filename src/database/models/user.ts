import { Sequelize, Model, DataTypes, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize";

interface UserModel {
    id: CreationOptional<number>,
    username:string,
    password:string,
    email:string,
}

type UserModelAttributes = InferAttributes<UserModel>
type UserCreationAttributes = InferCreationAttributes<UserModel>

class UserModel extends Model<UserModelAttributes, UserCreationAttributes> {

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