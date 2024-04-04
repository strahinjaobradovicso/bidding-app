import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware"
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../exceptions/httpException";
import { CreateUserDto } from "../../dtos/user";
import { QueryAuctionDto } from "../../dtos/queries/auctionQuery";

const requestHandlerFn = dtoValidationMiddleware(CreateUserDto, 'body')
const queryAuctionValidator = dtoValidationMiddleware(QueryAuctionDto, 'query')

describe('dto validation middleware', ()=>{

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: Partial<NextFunction>;

    next = jest.fn((err: HttpException)=>{
        
    })

    it('valid properties => error message is undefined', (done) => {
        req = {
            body: {
                username: 'dummyUsername',
                password: 'dummyPassword',
                email: 'dummy@test.com'
            }
        }
        requestHandlerFn(req as Request, res as Response, next as NextFunction).then(message => {
            expect(message).toBeUndefined()          
            done();
        })
    })

    it('missing property => present in the error message', (done) => {
        req = {
            body: {
                password: 'dummyPassword',
                email: 'dummy@test.com'
            }
        }
        requestHandlerFn(req as Request, res as Response, next as NextFunction).then(message => {
            expect(message).toEqual('username must contain only letters and numbers')
            done();
        })
    })

    it('not valid value => present in the error message', (done) => {
        req = {
            body: {
                username: 'dummyUsername',
                password: 'dummyPassword',
                email: 'dummytest.com'
            }
        }
        requestHandlerFn(req as Request, res as Response, next as NextFunction).then(message => {
            expect(message).toEqual('email must be an email')      
            done();
        })
    })

    it('multiple errors => present in the error message (separated with ", ")', (done) => {
        req = {
            body: {
                username: 'dummyUser.name',
                password: 'toShort',
                email: 'dummytest.com'
            }
        }
        requestHandlerFn(req as Request, res as Response, next as NextFunction).then(message => {
            expect(message).toEqual('username must contain only letters and numbers, password must be longer than or equal to 8 characters, email must be an email')    
            done();
        })
    })

    it('property not present in dto => should be error', (done) => {
        req = {
            body: {
                username: 'dummyUsername',
                password: 'dummyPassword',
                email: 'dummy@test.com',
                salt: '123'
            }
        }

        requestHandlerFn(req as Request, res as Response, next as NextFunction).then(message => {
            expect(message).toEqual('property salt should not exist')
            done()
        })
    })

    it('invalid status => error message is undefined', (done) => {
        let testQuery: any = {
            page: '1',
            itemsPerPage: '10',
            status: 'unexpectedStatus',
            auctionWinner: '1',
            date: new Date().toISOString(),
            itemOwner: '1',
            itemTitle: 'something'
        }
        req = {
            query: testQuery
        }

        queryAuctionValidator(req as Request, res as Response, next as NextFunction).then(message => {
            expect(message).toEqual("status must be one of the following values: UPCOMING, STARTED, DONE")          
            done()
        })
    })
    
})