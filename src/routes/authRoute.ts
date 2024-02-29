import { Router } from "express";
import { Routes } from "./interfaces/route";
import { AuthController } from "../controllers/authController";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { CreateUserDto } from "../dtos/user";

export class AuthRoute implements Routes {
    
    public path = '/auth'
    public router = Router()

    private authController: AuthController;

    constructor(authController: AuthController){
        this.authController = authController;
        this.initRoutes();
    }

    private initRoutes(){
        this.router.post(`${this.path}/login`, dtoValidationMiddleware(CreateUserDto), this.authController.login);
    }

}