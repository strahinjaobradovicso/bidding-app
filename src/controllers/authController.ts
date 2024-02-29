import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { CreateUserDto } from "../dtos/user";

export class AuthController {

    private authService: AuthService

    constructor(authService: AuthService){
        this.authService = authService;
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDto = req.body;
            const token = await this.authService.login(userData);
            res.status(200).json({jwt: token});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

}