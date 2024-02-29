import { Router } from "express";
import { Routes } from "./interfaces/route";
import { UserController } from "../controllers/userController";
import dtoValidationMiddleware from "../middlewares/dtoValidationMiddleware";
import { CreateUserDto } from "../dtos/user";

export class UserRoute implements Routes {
    public path = '/users'
    public router = Router()
    private userController; 

    constructor(userController: UserController){
        this.userController = userController;
        this.initRoutes();
    }

    private initRoutes(){
        this.router.post(`${this.path}/signup`, dtoValidationMiddleware(CreateUserDto), this.userController.signUp);
    }
}