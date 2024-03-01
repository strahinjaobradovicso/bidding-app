import DB from "../../database"
import { UserModel } from "../../database/models/user"
import { CreateUserDto } from "../../dtos/user"
import { UserService } from "../../services/UserService"

describe('user service', () => {

    const userService = new UserService();

    afterAll(()=>{
        DB.sequelize.close()
    })

    let user: CreateUserDto;
    let copy: CreateUserDto;

    beforeEach(() => {
        let sufix = `${new Date().valueOf()}`
        user = {
            username: `user_${sufix}`,
            password: '',
            email: `email_${sufix}`
        }
    })

    it('unique email and password => create and return user model instance', (done) => {
        userService.createUser(user)
        .then(savedUser=>{
            expect(savedUser).toBeInstanceOf(UserModel)
            done()
            copy = {...user}
        })
    })

    it('not unique email and password => throw HttpException instance', (done) => {
        userService.createUser(copy)
        .catch(err=>{
            expect(err.status).toBe(409)
            expect(err.message).toEqual('username already exists, email already exists')
            done()
        })
    })

})
