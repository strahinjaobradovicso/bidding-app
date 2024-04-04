import { NextFunction, Request, Response } from "express";
import { TokenRequest } from "../ambient/request";
import { HttpException } from "../exceptions/httpException";

export const isOwnerMiddleware = (
    model: any,
    inside: 'params' | 'query' | 'body',
    modelIdKey: string = 'id'
    ) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const modelData = await model.findByPk(req[inside][modelIdKey]);
        if(!modelData){
            return next(new HttpException(404, 'resource not found'));
        }

        const token = (req as TokenRequest).token;
        if(!token){
            return next(new Error('request missing token'));
        }

        if(modelData.userId !== token.userId){
            return next(new Error('not the owner'));
        }

        return next();
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