import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { CreateUserDto } from "../dtos/user";
import { UserModel } from "../database/models/user";

export class UserController {

    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
    }

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDto = req.body;
            const user: UserModel = await this.userService.createUser(userData);
            res.status(201).json({ data: user, message: 'user created' });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}