import DB from "../../database"
import { UserModel } from "../../database/models/user"
import { CreateUserDto } from "../../dtos/user"
import { HttpException } from "../../exceptions/httpException"
import { UserService } from "../../services/UserService"

const userService = new UserService()

describe('user service', ()=>{

    afterAll(()=>{
        DB.sequelize.close()
    })

    let user: CreateUserDto = {
        username: `user${new Date()}`,
        password: '',
        email: `email${new Date()}`
    }

    let copy = { ...user }

    it('unique email and password => create and return user', (done) => {
        userService.createUser(user)
        .then(savedUser=>{
            expect(savedUser).toBeInstanceOf(UserModel)
            done()
        })
        .catch(err=>{
            throw new Error('this error should not be thrown')
        })
    })

    it('not unique email and password => throw HttpException instance', (done) => {
        userService.createUser(copy)
        .then(savedCopy=>{
            throw new Error('this error should not be thrown')
        })
        .catch(err=>{
            expect(err).toBeInstanceOf(HttpException)
            if(err instanceof HttpException){
                expect(err.status).toBe(409)
                expect(err.message).toEqual('username already exists, email already exists')
            }
            done()
        })
    })


})
