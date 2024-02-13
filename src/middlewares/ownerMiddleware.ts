import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

const isOwnerMiddleware = (model: any, modelIdParamName:string = 'id') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const modelData = await model.findByPk(req.params[modelIdParamName]);
        if(modelData.userId === req.userId){
            next();
        }
        else{
            next(new HttpException(500));
        }
    }
}

const setOwnerMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.userId){
            next(new HttpException(500));
        }
        else {
            req.body.userId = req.userId;
            next();
        }
    }
}

export const ownerMiddleware = {
    isOwnerMiddleware,
    setOwnerMiddleware
}