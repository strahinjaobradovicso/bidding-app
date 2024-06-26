import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";


const dtoValidationMiddleware = (
    type: any,
    inside: 'body' | 'query',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true
    ) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {

        const obj = plainToInstance(type, req[inside]);

        const errors:ValidationError[] = await validate(obj,
             { skipMissingProperties, whitelist, forbidNonWhitelisted });

        let message;

        if(errors.length > 0){
            message = errors.map((error: ValidationError) => {
                if(error.constraints){
                    return Object.values(error.constraints);
                }
                else{
                    return error;
                }
            }).join(', ')
            next(new HttpException(400, message));
        }
        else{
            next();
        }

        return message;
    }
}

export default dtoValidationMiddleware;