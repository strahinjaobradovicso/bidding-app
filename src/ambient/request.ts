import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface TokenRequest extends Request {
    token: TokenRequestPayload;
}

export interface TokenRequestPayload extends JwtPayload {
    userId: number
    username: string
}