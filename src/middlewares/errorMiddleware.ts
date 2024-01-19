import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {

    const status: number = error.status;
    const message: string = error.message;

    res.status(status).json({message});

}

export default errorMiddleware;