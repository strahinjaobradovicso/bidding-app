import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { TokenRequest, TokenRequestPayload } from "../ambient/request";

export const authMiddleware = () => {

    return (req: Request, res: Response, next: NextFunction) => {
        
        const authHeader = req.headers["authorization"];

        if(!authHeader){
            return next(new HttpException(401));
        }
        if(!JWT_SECRET){
            return next(new Error('undefined jwt secret key'));
        }

        const token = authHeader.split(' ')[1];

        let decodedToken;

        try {
            decodedToken = jwt.verify(token, JWT_SECRET)
        } catch (error) {
            return next(new HttpException(401, 'invalid token'));
        }

        (req as TokenRequest).token = (decodedToken as TokenRequestPayload);
       
        next();
    }
}