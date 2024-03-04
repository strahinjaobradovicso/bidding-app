import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {

    if(!error.status){
        error = new HttpException(500);
    }
    const status: number = error.status;
    const message: string = error.message;

    res.status(status).json({message});

}

export default errorMiddleware;