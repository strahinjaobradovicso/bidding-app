import DB from "../../database"
import { UserModel } from "../../database/models/user"
import { CreateUserDto } from "../../dtos/user"
import { userService } from "../../services/UserService"

describe('user service', () => {

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

    it('createUser should return user without sensitive data', (done) => {   
        userService.createUser(user).then(user=>{
            expect(user.password).toBeUndefined()
            expect(user.salt).toBeUndefined()
            done()
        })
    })


})
