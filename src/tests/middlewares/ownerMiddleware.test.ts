import { NextFunction, Request, Response } from "express";
import { TokenRequest, TokenRequestPayload } from "../../ambient/request";
import { isOwnerMiddleware } from "../../middlewares/ownerMiddleware";
import { HttpException } from "../../exceptions/httpException";

const dbModel = {
    userId: 1,
    findByPk: async function(pk: any) {
        return this;
    }
}
const paramsOwnerMiddleware = isOwnerMiddleware(dbModel, 'params', 'dbModelId');
const bodyOwnerMiddleware = isOwnerMiddleware(dbModel, 'body', 'dbModelId');

let res: Partial<Response>;

let req: Partial<TokenRequest>;
let authData: Partial<TokenRequestPayload>;
let next: Partial<NextFunction>;

next = jest.fn((err: HttpException)=>{
    if(err)
        throw err.message;
    return 'done';
})

beforeEach(()=>{
    authData = {
        userId: 1,
        username: ''
    }

    req = {
        params: {
            dbModelId:'2'
        },
        body: {
            dbModelId:'2'
        },
        token: authData as TokenRequestPayload
    }
})

describe('owner middleware params', () => {

    it('auth missing => request missing token rejection', async () => {
        req.token = undefined;
        await expect(paramsOwnerMiddleware(req as Request, res as Response, next as NextFunction))
        .rejects.toMatch('request missing token');
    })
        
    it('user id does not match => not the owner rejection', async () => {
        authData.userId = 2;
        await expect(paramsOwnerMiddleware(req as Request, res as Response, next as NextFunction))
        .rejects.toMatch('not the owner');
    })

    it('user id does match => resolves with done', async () => {
        await expect(paramsOwnerMiddleware(req as Request, res as Response, next as NextFunction))
        .resolves.toBe('done');
    })
})

describe('owner middleware body', ()=>{
    
    it('auth missing => request missing token rejection', async () => {
        req.token = undefined;
        await expect(bodyOwnerMiddleware(req as Request, res as Response, next as NextFunction))
        .rejects.toMatch('request missing token');
    })
        
    it('user id does not match => not the owner rejection', async () => {
        authData.userId = 2;
        await expect(bodyOwnerMiddleware(req as Request, res as Response, next as NextFunction))
        .rejects.toMatch('not the owner');
    })

    it('user id does match => resolves with done', async () => {
        await expect(bodyOwnerMiddleware(req as Request, res as Response, next as NextFunction))
        .resolves.toBe('done');
    })

})

