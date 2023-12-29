import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next)=>{

    const status: number = error.status || 500;
    const message: string = error.message || '';

    res.status(status).json({message});

}

export default errorMiddleware;