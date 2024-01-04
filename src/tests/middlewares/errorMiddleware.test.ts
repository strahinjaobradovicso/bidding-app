import errorMiddleware from "../../middlewares/errorMiddleware"
import { Request, Response, NextFunction } from "express"

const DEFAULT_ERROR_CODE = 500
const DEFAULT_ERROR_MESSAGE = {message: ''}

describe('error middleware response', ()=>{

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: Partial<NextFunction>;
    let err:any = {}  

    beforeEach(()=>{
        res = {
            status: jest.fn(function(code:number) {
                res.statusCode = code;
                return this;
            }),
            json: jest.fn(function(message:any){
                res.statusMessage = message;
                return this;
            })
        }

        err = {}
    })
 
    it('should set response attributes to default', ()=>{
        errorMiddleware(err, req as Request, res as Response, next as NextFunction);
        expect(res.statusCode).toEqual(DEFAULT_ERROR_CODE)
        expect(res.statusMessage).toEqual(DEFAULT_ERROR_MESSAGE)

    })

    it('should set response attributes using error object', ()=>{
        err.status = 404
        err.message = "this is a custom message"

        errorMiddleware(err, req as Request, res as Response, next as NextFunction);
        expect(res.statusCode).toEqual(err.status)
        expect(res.statusMessage).toEqual({message: err.message})
    })

})