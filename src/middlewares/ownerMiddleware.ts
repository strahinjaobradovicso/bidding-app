import { NextFunction, Request, Response } from "express";
import { TokenRequest } from "../ambient/request";
import { HttpException } from "../exceptions/httpException";

export const isOwnerMiddleware = (model: any, modelIdParamName:string = 'id') => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const modelData = await model.findByPk(req.params[modelIdParamName]);
        if(!modelData){
            return next(new HttpException(404, 'resource not found'));
        }

        const token = (req as TokenRequest).token;
        if(!token){
            return next(new Error('request missing token'));
        }

        if(modelData.userId === token.userId){
            next();
        }
        else{
            next(new Error('not the owner'));
        }
    }
}

export const setOwnerMiddleware = (
    userFkName: string = 'userId',
    inside: 'body' | 'query' | 'params' = 'body',
  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = (req as TokenRequest).token;
        if(!token || !token.userId){
            throw new Error('missing user info');
        }
        if(inside === 'body'){
            req[inside][userFkName] = token.userId;
        }
        else{
            req[inside][userFkName] = token.userId.toString();
        }
        next();
    }
}